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

type ItemCardProps = {
  onRow: number;
  title: string;
  price: number;
  category: CATEGORY;
};

export const ItemCard = ({ title, price, category, onRow }: ItemCardProps) => {
  return (
    <Grid.Col span={GRID_TOTAL_COLS / onRow}>
      <Card shadow="sm" padding="md" style={{ height: "100%" }}>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={IMG_HEIGHT}
            alt={title}
            fallbackSrc={FallbackImage}
          />
        </Card.Section>

        <Stack align="start" gap={4} mb={4}>
          <Badge mt={-10} variant="default">
            {CATEGORY_MAP[category]}
          </Badge>
          <Text fw={500} mt={4} lh={"xs"}>
            {title}
          </Text>
          <Text fw={800} mt={4}>
            <NumberFormatter value={price} suffix=" ₽" thousandSeparator=" " />
          </Text>
        </Stack>
      </Card>
    </Grid.Col>
  );
};
