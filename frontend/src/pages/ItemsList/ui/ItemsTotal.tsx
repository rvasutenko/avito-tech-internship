import { useStores } from "@/app/providers";
import { useItems } from "@/entities";
import { pluralize } from "@/shared/utils";
import { Skeleton, Text } from "@mantine/core";

export const ItemsTotal = () => {
  const { filters } = useStores();
  const { data, isLoading } = useItems(filters.queryParams);

  if (isLoading) return <Skeleton mt={4.8} mb={4} height={16} width={128} />;

  const wordForm = pluralize(data?.total!, [
    "объявление",
    "объявления",
    "объявлений",
  ]);

  if (!data?.total) return <Text>Ничего не найдено</Text>;

  return (
    <Text>
      {data?.total} {wordForm}
    </Text>
  );
};
