import { Skeleton, Stack, Table, Title } from "@mantine/core";

export const ItemParametersSkeleton = () => {
  const rows = [1, 2, 1.5, 2.5];

  return (
    <Stack gap="xs">
      <Title order={3}>Характеристики</Title>
      <Table withRowBorders={false} horizontalSpacing={0} fz="md" w={400}>
        <Table.Tbody>
          {rows.map((val) => (
            <Table.Tr key={val}>
              <Table.Td c="gray" fw={700}>
                <Skeleton mt={4} mb={4} h={16} w={40 + 30 * val} />
              </Table.Td>
              <Table.Td>
                <Skeleton mt={4} mb={4} h={16} w={250 - 100 * (val - 1)} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
