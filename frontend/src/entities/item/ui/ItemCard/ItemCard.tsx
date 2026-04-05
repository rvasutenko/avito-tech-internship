import { GRID_TOTAL_COLS, IMG_HEIGHT } from "./config";
import {
  Badge,
  Card,
  Grid,
  Image,
  NumberFormatter,
  Stack,
  Text,
} from "@mantine/core";
import FallbackImage from "@/assets/fallback.webp";
import { CATEGORY_MAP, type CATEGORY } from "../../model/category";
import { CircleIcon } from "@phosphor-icons/react";
import { ITEM_IMG } from "@/shared/config/config";

type ItemCardProps = {
  onRow: number;
  title: string;
  price: number;
  category: CATEGORY;
  needsRevision?: boolean;
  onClick?: () => void;
};

export const ItemCard = ({
  title,
  price,
  category,
  onRow,
  needsRevision = false,
  onClick,
}: ItemCardProps) => {
  return (
    <Grid.Col span={GRID_TOTAL_COLS / onRow}>
      <Card
        shadow="sm"
        padding="md"
        style={{ height: "100%", cursor: "pointer", overflow: "visible" }}
        onClick={onClick}
      >
        <Card.Section>
          <Image
            src={ITEM_IMG}
            height={IMG_HEIGHT}
            alt={title}
            fallbackSrc={FallbackImage}
            loading="lazy"
            radius={"md"}
          />
        </Card.Section>

        <Stack align="start" gap={4} mb={4}>
          <Badge
            mt={-10}
            variant="default"
            // styles={{ label: { textBoxEdge: "auto" } }}
          >
            {CATEGORY_MAP[category]}
          </Badge>
          <Text fw={500} mt={4} lh={"xs"}>
            {title}
          </Text>
          <Text fw={800} mt={4}>
            <NumberFormatter value={price} suffix=" ₽" thousandSeparator=" " />
          </Text>
          {needsRevision && (
            <Badge
              leftSection={<CircleIcon size={6} weight="fill" />}
              variant="light"
              color="orange"
              mt={8}
            >
              Требует доработок
            </Badge>
          )}
        </Stack>
      </Card>
    </Grid.Col>
  );
};
