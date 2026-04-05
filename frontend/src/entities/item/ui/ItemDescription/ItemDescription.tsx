import { Stack, Text, Title } from "@mantine/core";

export const ItemDescription = ({
  description,
}: {
  description: string | undefined;
}) => {
  if (!description) return null;

  return (
    <Stack>
      <Title order={4} mt="lg">
        Описание
      </Title>
      <Text style={{ wordBreak: "break-word" }}>{description}</Text>
    </Stack>
  );
};
