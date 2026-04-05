import {
  ActionIcon,
  Button,
  Divider,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ArrowLeftIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { ItemHeaderSkeleton } from "./ItemHeaderSkeleton";
import type { ItemGetOut } from "../../api/types";

type ItemHeaderProps = {
  data: ItemGetOut;
  isLoading: boolean;
  onEdit: () => void;
  onBack: () => void;
};

export const ItemHeader = ({
  data,
  isLoading,
  onEdit,
  onBack,
}: ItemHeaderProps) => {
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);

    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");

    return `${date.toLocaleDateString()} в ${h}:${m}`;
  };

  if (isLoading) return <ItemHeaderSkeleton />;

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap="md" align="start">
          <Group align="center">
            <ActionIcon color={"gray"} variant="subtle" onClick={onBack} size="lg">
              <ArrowLeftIcon size={20} weight="bold" />
            </ActionIcon>
            <Title order={2}>{data?.title}</Title>
          </Group>
          <Button
            onClick={onEdit}
            variant="outline"
            leftSection={<PencilSimpleLineIcon />}
          >
            Редактировать
          </Button>
        </Stack>
        <Stack gap={4} align="end">
          <Title order={2}>
            <NumberFormatter
              value={data?.price}
              suffix=" ₽"
              thousandSeparator=" "
            />
          </Title>
          <Text c="gray" lh="xs" mt={4}>
            Опубликовано: {formatDateString(data?.createdAt)}
          </Text>
          <Text c="gray" lh="xs">
            Изменено: {formatDateString(data?.updatedAt)}
          </Text>
        </Stack>
      </Group>
      <Divider />
    </Stack>
  );
};
