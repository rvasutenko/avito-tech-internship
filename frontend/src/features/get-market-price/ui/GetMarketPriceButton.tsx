import {
  Button,
  Group,
  Popover,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { type UseFormReturn } from "react-hook-form";
import type { ItemUpdateIn } from "@/entities/item/api/types";
import { useState } from "react";
import { ArrowClockwiseIcon, LightbulbIcon } from "@phosphor-icons/react";
import { useGetMarketPrice } from "../model/useGetMarketPrice";

export const GetMarketPriceButton = ({
  form,
}: {
  form: UseFormReturn<ItemUpdateIn>;
}) => {
  const { mutate, isPending } = useGetMarketPrice();

  const [opened, setOpened] = useState(false);
  const [generated, setGenerated] = useState("");
  const [clickedOnce, setClickedOnce] = useState(false);

  const handleGetMarketPriceClick = () => {
    const data = form.getValues();

    setOpened(true);
    setClickedOnce(true);

    mutate(
      { data },
      {
        onSuccess: (data) => setGenerated(data.text),
        onError: () => setOpened(false),
      }
    );
  };

  const handleAcceptClick = () => {
    const priceString = generated
      .split("\n")
      .map((l) => l.replaceAll(" ", "").replaceAll(" ", ""))
      .filter(Boolean)[2]
      .split("-")[0]
      .split("–")[0]
      .split("—")[0];

    const price = Number(priceString);
    console.log(priceString);
    console.log(price);

    form.setValue("price", price);
    setOpened(false);
  };

  const handleCancelClick = () => {
    setOpened(false);
  };

  return (
    <Popover
      width={320}
      opened={opened}
      position="right-start"
      offset={8}
      withArrow
      arrowOffset={12}
      arrowSize={8}
    >
      <Popover.Target>
        <Button
          variant="light"
          disabled={isPending}
          loading={isPending}
          onClick={handleGetMarketPriceClick}
          w={"fit-content"}
        >
          {clickedOnce ? (
            <Group gap={8}>
              <ArrowClockwiseIcon size={16} weight="bold" />
              Повторить запрос
            </Group>
          ) : (
            <Group gap={8}>
              <LightbulbIcon size={16} weight="bold" />
              Узнать рыночную цену
            </Group>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap={8}>
          <Title order={6}>Ответ AI</Title>
          {isPending ? (
            <>
              <Skeleton mt={4} height={12} />
              <Skeleton mb={8} height={12} width="40%" />
            </>
          ) : (
            <Stack gap={3} mb={4}>
              {generated
                .split("\n")
                .filter(Boolean)
                .map((line) => (
                  <Text size="xs">{line}</Text>
                ))}
            </Stack>
          )}
          <Group gap={8}>
            <Button
              disabled={isPending}
              loading={isPending}
              onClick={handleAcceptClick}
              size="xs"
            >
              Применить
            </Button>
            <Button variant="light" onClick={handleCancelClick} size="xs">
              Закрыть
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
