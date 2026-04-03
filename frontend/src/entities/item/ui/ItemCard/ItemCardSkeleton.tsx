import { Card, Grid, Group, Skeleton } from "@mantine/core";
import { GRID_TOTAL_COLS, IMG_HEIGHT } from "./config";

type ItemCardSkeletonProps = {
  onRow: number;
};

export const ItemCardSkeleton = ({ onRow }: ItemCardSkeletonProps) => {
  return (
    <Grid.Col span={GRID_TOTAL_COLS / onRow}>
      <Card shadow="sm" padding="md">
        <Card.Section>
          <Skeleton height={IMG_HEIGHT}></Skeleton>
        </Card.Section>

        <Group justify="space-between" gap={8} mb={8} mt={24}>
          <Skeleton height={12} radius={"xl"}></Skeleton>
          <Skeleton height={12} width="70%" radius={"xl"}></Skeleton>
          <Skeleton mt={8} height={12} width="40%" radius={"xl"}></Skeleton>
        </Group>
      </Card>
    </Grid.Col>
  );
};
