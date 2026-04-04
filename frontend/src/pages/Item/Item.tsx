import { ItemHeader, useItem } from "@/entities";
import {
  Grid,
  Group,
  Image,
  Scroller,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const Item = observer(() => {
  const params = useParams();

  const { data } = useItem(Number(params.id));

  return (
    <Grid columnGap={40} rowGap="xl">
      <Grid.Col span={12}>
        <ItemHeader
          title={data?.title!}
          price={data?.price!}
          createdAt={data?.createdAt!}
          updatedAt={data?.updatedAt!}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack gap={8}>
          <Stack gap={8}>
            <Image
              height={320}
              radius="md"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            />
            <Scroller draggable={false} edgeGradientColor="var(--bg-primary)">
              <Group gap={8} wrap="nowrap">
                <Image
                  style={{ height: 96, width: 96 }}
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                />
                <Image
                  style={{ height: 96, width: 96 }}
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                />
                <Image
                  style={{ height: 96, width: 96 }}
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                />
                <Image
                  style={{ height: 96, width: 96 }}
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                />
                <Image
                  style={{ height: 96, width: 96 }}
                  radius="md"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                />
              </Group>
            </Scroller>
          </Stack>
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack gap="xs">
          <Title order={3}>Характеристики</Title>
          <Table withRowBorders={false} horizontalSpacing={0} fz="md" w={400}>
            <Table.Tbody>
              {Object.entries(data?.params || {})?.map(([key, val]) => (
                <Table.Tr key={key}>
                  <Table.Td c="gray" fw={700}>
                    {key}
                  </Table.Td>
                  <Table.Td>{val}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Grid.Col>
      <Stack>
        <Title order={4} mt="lg">
          Описание
        </Title>
        <Text>
          Продаю свой MacBook Pro 16" (2021) на чипе M1 Pro. Состояние отличное,
          работал бережно. Мощности хватает на всё: от сложного монтажа до кода,
          при этом ноутбук почти не греется.
        </Text>
      </Stack>
    </Grid>
  );
});
