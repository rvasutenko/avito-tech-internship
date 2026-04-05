import { Card, Grid, Skeleton, Stack } from "@mantine/core";
import { GRID_TOTAL_COLS, IMG_HEIGHT } from "./config";

type ItemCardSkeletonProps = {
  onRow: number;
  horizontal?: boolean;
};

export const ItemCardSkeleton = ({
  onRow,
  horizontal,
}: ItemCardSkeletonProps) => {
  return (
    <Grid.Col span={horizontal ? GRID_TOTAL_COLS : GRID_TOTAL_COLS / onRow}>
      <Card
        shadow="sm"
        padding="md"
        orientation={horizontal ? "horizontal" : "vertical"}
      >
        <Card.Section>
          <Skeleton w={horizontal ? 280 : "100%"} height={IMG_HEIGHT} />
        </Card.Section>

        <Stack
          justify={horizontal ? "space-between" : "flex-start"}
          gap={8}
          ml={horizontal ? 20 : 0}
          mb={8}
          mt={horizontal ? 0 : 24}
          w={"100%"}
        >
          <Skeleton height={12} radius={"xl"}></Skeleton>
          <Skeleton height={12} width="70%" radius={"xl"}></Skeleton>
          <Skeleton mt={8} height={12} width="40%" radius={"xl"}></Skeleton>
        </Stack>
      </Card>
    </Grid.Col>
  );
};
