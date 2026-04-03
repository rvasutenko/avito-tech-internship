import { useItems } from "@/entities/item";
import { pluralize } from "@/shared/utils";
import { Skeleton, Text } from "@mantine/core";

export const ItemsTotal = () => {
  const { data, isLoading } = useItems({});

  if (isLoading) return <Skeleton mt={4.8} mb={4} height={16} width={128} />;

  const wordForm = pluralize(data?.total!, [
    "объявление",
    "объявления",
    "объявлений",
  ]);

  return (
    <Text>
      {data?.total} {wordForm}
    </Text>
  );
};
