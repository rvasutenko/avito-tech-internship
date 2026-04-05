import { ROUTES_NAMES } from "@/app/router";
import { useItem } from "@/entities";
import {
  Divider,
  Grid,
  Input,
  NumberInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound, ServerError } from "@/widgets";
import { CATEGORY, CATEGORY_MAP } from "@/entities/item/model/category";

export const ItemEdit = observer(() => {
  const params = useParams();
  const nav = useNavigate();

  const id = Number(params.id);
  const { data, isLoading, isError, error } = useItem(id);

  useEffect(() => {
    if (!id) nav(ROUTES_NAMES.ADS_LIST);
  }, [id]);

  if (isError && error?.status === 404) return <NotFound />;

  if (isError && error?.status === 500) return <ServerError />;

  return (
    <Grid columnGap={40} rowGap="xl">
      <Grid.Col span={12}>
        <Title order={2}>Редактирование объявления</Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          placeholder="Выберите категорию"
          // value={filters.sortValue}
          // onChange={(value) => filters.setSort(value!)}
          label="Категория"
          data={[
            { value: CATEGORY.AUTO, label: CATEGORY_MAP[CATEGORY.AUTO] },
            {
              value: CATEGORY.ELECTRONICS,
              label: CATEGORY_MAP[CATEGORY.ELECTRONICS],
            },
            {
              value: CATEGORY.REAL_ESTATE,
              label: CATEGORY_MAP[CATEGORY.REAL_ESTATE],
            },
          ]}
          allowDeselect={false}
        />
        <Divider mt="lg" mb="md" />
        <TextInput
          placeholder="Введите название"
          label="Название"
          value={data?.title}
          withAsterisk
        />
        <Divider mt="lg" mb="md" />
        <NumberInput
          placeholder="Введите цену"
          label="Цена"
          // value={data?.price}
          stepHoldDelay={500}
          stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
          // error={"wfdw"}
          thousandSeparator=" "
          allowNegative={false}
          max={999999999}
          suffix=" ₽"
          allowDecimal={false}
          trimLeadingZeroesOnBlur
          withAsterisk
        />
        <Divider mt="lg" mb="md" />
        <NumberInput
          placeholder="Введите название"
          label="Название"
          value={data?.title}
          withAsterisk
        />
      </Grid.Col>
    </Grid>
  );
});
