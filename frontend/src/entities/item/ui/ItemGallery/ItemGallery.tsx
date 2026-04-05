import { Group, Image, Scroller, Stack } from "@mantine/core";
import { ItemGallerySkeleton } from "./ItemGallerySkeleton";
import { CURRENT_IMG_HEIGHT, SCROLL_IMG_SIDE } from "./config";
import { ITEM_IMG } from "@/shared/config/config";

export const ItemGallery = ({ isLoading }: { isLoading: boolean }) => {
  const images = new Array(5).fill(ITEM_IMG);

  if (isLoading) return <ItemGallerySkeleton />;

  return (
    <Stack gap={8}>
      <Stack gap={8}>
        <Image height={CURRENT_IMG_HEIGHT} radius="md" src={images[0]} />
        <Scroller draggable={false} edgeGradientColor="var(--bg-primary)">
          <Group gap={8} wrap="nowrap">
            {images.map((img) => (
              <Image
                w={SCROLL_IMG_SIDE}
                h={SCROLL_IMG_SIDE}
                radius="md"
                src={img}
              />
            ))}
          </Group>
        </Scroller>
      </Stack>
    </Stack>
  );
};
