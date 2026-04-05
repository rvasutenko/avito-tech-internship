import { Divider, Group, Skeleton, Stack } from "@mantine/core";

export const ItemHeaderSkeleton = () => {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap="md" align="start">
          <Skeleton h={27} mt={4} mb={4} w={250} />
          <Skeleton h={36} w={160} />
        </Stack>
        <Stack gap={4} align="end">
          <Skeleton h={27} mt={4} mb={4} w={150} />
          <Skeleton h={22.4} w={260} mt={4} />
          <Skeleton h={22.4} w={220} />
        </Stack>
      </Group>
      <Divider />
    </Stack>
  );
};
