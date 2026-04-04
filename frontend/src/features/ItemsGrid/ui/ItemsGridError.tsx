import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "@/app/router";
import { XCircleIcon } from "@phosphor-icons/react";

export const ItemsGridError = () => {
  const nav = useNavigate();

  return (
    <Center style={{ height: "100%" }}>
      <Stack align="center" gap={4}>
        <XCircleIcon color="red" weight="light" size={48} />
        <Title order={3} fw={500} mt={4}>
          Ошибка 500
        </Title>
        <Text ta={"center"} lh={"xs"}>
          Ошибка обращения к сервису.
          <br />
          Попробуйте обновить страницу через некоторое время
        </Text>
        <Button
          variant="subtle"
          color="gray"
          onClick={() => nav(ROUTES_NAMES.ADS_LIST)}
          mt={8}
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </Center>
  );
};
