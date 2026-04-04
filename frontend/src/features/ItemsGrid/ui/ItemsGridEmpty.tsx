import { Center, Stack, Title } from "@mantine/core";
import { CardsThreeIcon } from "@phosphor-icons/react";

export const ItemsGridEmpty = () => {
  return (
    <Center style={{ height: "100%" }}>
      <Stack align="center" gap={4}>
        <CardsThreeIcon color="gray" weight="light" size={48} />
        <Title order={4} fw={500}>
          Ничего не найдено
        </Title>
      </Stack>
    </Center>
  );
};
