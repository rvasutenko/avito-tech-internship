import { pluralize } from "@/shared";
import { Skeleton, Text } from "@mantine/core";

type ItemsTotalProps = {
  total: number;
  isLoading: boolean;
};

export const ItemsTotal = ({ total, isLoading }: ItemsTotalProps) => {
  if (isLoading) return <Skeleton mt={4.8} mb={4} height={16} width={128} />;

  const wordForm = pluralize(total, ["объявление", "объявления", "объявлений"]);

  if (!total) return <Text>Ничего не найдено</Text>;

  return (
    <Text>
      {total} {wordForm}
    </Text>
  );
};
