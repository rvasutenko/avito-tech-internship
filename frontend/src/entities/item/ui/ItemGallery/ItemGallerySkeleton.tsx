import { Group, Scroller, Skeleton, Stack } from "@mantine/core";
import { CURRENT_IMG_HEIGHT, SCROLL_IMG_SIDE } from "./config";

export const ItemGallerySkeleton = () => {
  return (
    <Stack gap={8}>
      <Stack gap={8}>
        <Skeleton h={CURRENT_IMG_HEIGHT} />
        <Scroller draggable={false} edgeGradientColor="var(--bg-primary)">
          <Group gap={8} wrap="nowrap">
            <Skeleton h={SCROLL_IMG_SIDE} w={SCROLL_IMG_SIDE} />
            <Skeleton h={SCROLL_IMG_SIDE} w={SCROLL_IMG_SIDE} />
            <Skeleton h={SCROLL_IMG_SIDE} w={SCROLL_IMG_SIDE} />
            <Skeleton h={SCROLL_IMG_SIDE} w={SCROLL_IMG_SIDE} />
            <Skeleton h={SCROLL_IMG_SIDE} w={SCROLL_IMG_SIDE} />
          </Group>
        </Scroller>
      </Stack>
    </Stack>
  );
};
