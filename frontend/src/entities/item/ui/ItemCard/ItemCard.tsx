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
  horizontal?: boolean;
};

export const ItemCard = ({
  title,
  price,
  category,
  onRow,
  needsRevision = false,
  onClick,
  horizontal,
}: ItemCardProps) => {
  return (
    <Grid.Col span={horizontal ? GRID_TOTAL_COLS : GRID_TOTAL_COLS / onRow}>
      <Card
        shadow="sm"
        padding="md"
        style={{ height: "100%", cursor: "pointer", overflow: "visible" }}
        onClick={onClick}
        orientation={horizontal ? "horizontal" : "vertical"}
      >
        <Card.Section style={{ flexShrink: 0 }}>
          <Image
            src={ITEM_IMG}
            height={IMG_HEIGHT}
            alt={title}
            fallbackSrc={FallbackImage}
            loading="lazy"
            radius={"md"}
          />
        </Card.Section>

        <Stack
          align="start"
          justify={horizontal ? "space-between" : "flex-start"}
          gap={4}
          mb={4}
          ml={horizontal ? 20 : 0}
        >
          <Badge mt={horizontal ? 0 : -10} variant="default">
            {CATEGORY_MAP[category]}
          </Badge>
          <Text fw={500} mt={4} lh={"xs"} style={{ wordBreak: "break-word" }} lineClamp={2}>
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
