import {
  Button,
  Divider,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PencilSimpleLineIcon } from "@phosphor-icons/react";

type ItemHeaderProps = {
  title: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export const ItemHeader = ({
  title,
  price,
  createdAt,
  updatedAt,
}: ItemHeaderProps) => {
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);

    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");

    return `${date.toLocaleDateString()} в ${h}:${m}`;
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap="md" align="start">
          <Title order={2}>{title}</Title>
          <Button leftSection={<PencilSimpleLineIcon />}>Редактировать</Button>
        </Stack>
        <Stack gap={4} align="end">
          <Title order={2}>
            <NumberFormatter value={price} suffix=" ₽" thousandSeparator=" " />
          </Title>
          <Text c="gray" lh="xs" mt={4}>
            Опубликовано: {formatDateString(createdAt)}
          </Text>
          <Text c="gray" lh="xs">
            Изменено: {formatDateString(updatedAt)}
          </Text>
        </Stack>
      </Group>
      <Divider />
    </Stack>
  );
};
