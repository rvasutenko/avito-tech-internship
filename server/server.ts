import Fastify from 'fastify';
import cors from '@fastify/cors';
import "dotenv/config";
import items from 'data/items.json' with { type: 'json' };
import { Item } from 'src/types.ts';
import { ItemsGetInQuerySchema, ItemUpdateInSchema } from 'src/validation.ts';
import { treeifyError, ZodError } from 'zod';
import { doesItemNeedRevision } from './src/utils.ts';

const ITEMS = items as Item[];

const fastify = Fastify({
  logger: true,
});

await fastify.register((await import('@fastify/middie')).default);

await fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Искуственная задержка ответов, чтобы можно было протестировать состояния загрузки
fastify.use((_, __, next) =>
  new Promise(res => setTimeout(res, 300 + Math.random() * 700)).then(next),
);

// Настройка CORS
fastify.use((_, reply, next) => {
  reply.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

interface ItemGetRequest extends Fastify.RequestGenericInterface {
  Params: {
    id: string;
  };
}

fastify.get<ItemGetRequest>('/items/:id', (request, reply) => {
  const itemId = Number(request.params.id);

  if (!Number.isFinite(itemId)) {
    reply
      .status(400)
      .send({ success: false, error: 'Item ID path param should be a number' });
    return;
  }

  const item = ITEMS.find(item => item.id === itemId);

  if (!item) {
    reply
      .status(404)
      .send({ success: false, error: "Item with requested id doesn't exist" });
    return;
  }

  return {
    ...item,
    needsRevision: doesItemNeedRevision(item),
  };
});

interface ItemsGetRequest extends Fastify.RequestGenericInterface {
  Querystring: {
    q?: string;
    limit?: string;
    skip?: string;
    categories?: string;
    needsRevision?: string;
  };
}

fastify.get<ItemsGetRequest>('/items', request => {
  const {
    q,
    limit,
    skip,
    needsRevision,
    categories,
    sortColumn,
    sortDirection,
  } = ItemsGetInQuerySchema.parse(request.query);

  const filteredItems = ITEMS.filter(item => {
    return (
      item.title.toLowerCase().includes(q.toLowerCase()) &&
      (!needsRevision || doesItemNeedRevision(item)) &&
      (!categories?.length ||
        categories.some(category => item.category === category))
    );
  });

  return {
    items: filteredItems
      .toSorted((item1, item2) => {
        let comparisonValue = 0;

        if (!sortDirection) return comparisonValue;

        if (sortColumn === 'title') {
          comparisonValue = item1.title.localeCompare(item2.title);
        } else if (sortColumn === 'createdAt') {
          comparisonValue =
            new Date(item1.createdAt).valueOf() -
            new Date(item2.createdAt).valueOf();
        }

        return (sortDirection === 'desc' ? -1 : 1) * comparisonValue;
      })
      .slice(skip, skip + limit)
      .map(item => ({
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        needsRevision: doesItemNeedRevision(item),
      })),
    total: filteredItems.length,
  };
});

interface ItemUpdateRequest extends Fastify.RequestGenericInterface {
  Params: {
    id: string;
  };
}

fastify.put<ItemUpdateRequest>('/items/:id', (request, reply) => {
  const itemId = Number(request.params.id);

  if (!Number.isFinite(itemId)) {
    reply
      .status(400)
      .send({ success: false, error: 'Item ID path param should be a number' });
    return;
  }

  const itemIndex = ITEMS.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    reply
      .status(404)
      .send({ success: false, error: "Item with requested id doesn't exist" });
    return;
  }

  try {
    const parsedData = ItemUpdateInSchema.parse({
      category: ITEMS[itemIndex].category,
      ...(request.body as {}),
    });

    ITEMS[itemIndex] = {
      id: ITEMS[itemIndex].id,
      createdAt: ITEMS[itemIndex].createdAt,
      updatedAt: new Date().toISOString(),
      ...parsedData,
    };

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ success: false, error: treeifyError(error) });
      return;
    }

    throw error;
  }
});

const port = Number(process.env.port) ?? 8080;

import axios from "axios";
import { getGigaChatToken } from 'src/tokenManager.ts';
import { httpsAgent } from 'src/httpsAgent.ts';

fastify.post('/ai/generate-description', async (request, reply) => {
  try {
    const { title, category, params, description } = request.body as {
      title: string;
      category: string;
      description?: string;
      params: Record<string, any>;
    };

    if (!title || !category) {
      return reply.status(400).send({
        success: false,
        error: 'title и category обязательны',
      }); 
    }

    const prompt = `
      Ты помогаешь писать продающие объявления на Avito.

      Сгенерируй описание товара, опираясь на следующую информацию о нем:
      Название: ${title}
      Категория: ${category}
      Характеристики: ${JSON.stringify(params, null, 2)}
      Описание, которое написал сам пользователь: ${description}

      Требования:
      - Коротко (5-8 предложений)
      - Продающий стиль
      - Без воды
      - На русском языке
      - Никакого md форматирования. Только текст содержащий буквы, цифры и знаки препинания.
    `;

    const token = await getGigaChatToken();

    const response = await axios.post(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      {
        model: 'GigaChat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        httpsAgent,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices?.[0]?.message?.content;

    return {
      success: true,
      text,
    };
  } catch (error: any) {
    fastify.log.error(error?.response?.data || error.message);
    console.error(error);

    return reply.status(500).send({
      success: false,
      error: 'Ошибка генерации описания',
    });
  }
});

fastify.post('/ai/get-market-price', async (request, reply) => {
  try {
    const { title, category, params, description } = request.body as {
      title: string;
      category: string;
      description?: string;
      params: Record<string, any>;
    };

    if (!title || !category) {
      return reply.status(400).send({
        success: false,
        error: 'title и category обязательны',
      }); 
    }

    const prompt = `
      Ты эксперт по оценке рыночной стоимости товаров на вторичном рынке.

      Твоя задача — на основе параметров товара оценить среднюю рыночную цену и дать диапазоны цен в зависимости от состояния.

      Входные данные:
      Название товара: ${title}
      Категория: ${category}
      Характеристики: ${JSON.stringify(params, null, 2)}
      Описание, которое написал сам пользователь: ${description}

      Сгенерируй ответ в следующем формате:

      1. Укажи название товара в начале.
      2. Затем укажи 3 диапазона цен:
        - Отличное состояние
        - Хорошее/среднее состояние
        - Плохое состояние / срочная продажа / дефекты

      3. Формат строго такой:

      Средняя цена на {название товара}:\n
      {диапазон} ₽ — отличное состояние.\n
      {диапазон} ₽ — хорошее состояние, небольшой износ.\n
      {диапазон} ₽ — срочно или с дефектами.

      Требования:
      - Используй реальные рыночные ориентиры (если точных данных нет — делай разумную оценку).
      - Не придумывай абстрактные объяснения — только итог.
      - Пиши кратко, без лишнего текста.
      - Валюта: ₽
      - Используй диапазоны цен (например: 100 000 – 120 000 ₽)
      - Пиши на русском языке.
      - Никакого md форматирования. Только текст содержащий буквы, цифры и знаки препинания.
    `;

    const token = await getGigaChatToken();

    const response = await axios.post(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      {
        model: 'GigaChat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        httpsAgent,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices?.[0]?.message?.content;

    return {
      success: true,
      text,
    };
  } catch (error: any) {
    fastify.log.error(error?.response?.data || error.message);
    console.error(error);

    return reply.status(500).send({
      success: false,
      error: 'Ошибка генерации описания',
    });
  }
});

fastify.listen({ port }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.debug(`Server is listening on port ${port}`);
});
