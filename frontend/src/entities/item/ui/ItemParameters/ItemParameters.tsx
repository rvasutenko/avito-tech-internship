import { Stack, Table, Text, Title } from "@mantine/core";
import {
  mapItemParamKey,
  mapItemParamVal,
  type ItemParams,
} from "../../model/params";
import { ItemParametersSkeleton } from "./ItemParametersSkeleton";
import { CATEGORY } from "../../model/category";

type ItemParametersProps = {
  category: CATEGORY;
  params: ItemParams;
  isLoading: boolean;
};

export const ItemParameters = ({
  category,
  params,
  isLoading,
}: ItemParametersProps) => {
  if (isLoading) return <ItemParametersSkeleton />;

  return (
    <Stack gap="xs">
      <Title order={3}>Характеристики</Title>
      <Table withRowBorders={false} horizontalSpacing={0} fz="md" >
        <Table.Tbody>
          {Object.entries(params || {})?.map(([key, val]) => (
            <Table.Tr key={key}>
              <Table.Td c="gray" fw={700}>
                {mapItemParamKey(category, key as keyof ItemParams)}
              </Table.Td>
              <Table.Td>
                <Text ml={20} style={{ wordBreak: "break-word" }} lineClamp={4}>{mapItemParamVal(category, key as keyof ItemParams, val)}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
