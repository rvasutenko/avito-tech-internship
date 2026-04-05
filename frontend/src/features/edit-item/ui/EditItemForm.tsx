import { Controller, type SubmitHandler } from "react-hook-form";
import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { CATEGORY, CATEGORY_MAP } from "@/entities/item/model/category";
import { useEditItemForm } from "../model/useEditItemForm";
import { ElectronicsParamsFields } from "./ElectronicsParamsFields";
import { AutoParamsFields } from "./AutoParamsFields";
import { RealEstateParamsFields } from "./RealEstateParamsFields";
import type { ItemGetOut, ItemUpdateIn } from "@/entities/item/api/types";
import { ClearButton } from "./ClearButton";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "@/app/router";
import { useUpdateItem } from "@/entities";
import { GenerateDescriptionButton } from "@/features/generate-item-description/ui/GenerateDescriptionButton";
import { GetMarketPriceButton } from "@/features/get-market-price";

const CATEGORY_FIELDS_MAP: Record<
  CATEGORY,
  ({ form }: { form: ReturnType<typeof useEditItemForm> }) => any
> = {
  [CATEGORY.AUTO]: AutoParamsFields,
  [CATEGORY.ELECTRONICS]: ElectronicsParamsFields,
  [CATEGORY.REAL_ESTATE]: RealEstateParamsFields,
};

export const EditItemForm = ({
  data,
  isLoading,
}: {
  data: ItemGetOut;
  isLoading: boolean;
}) => {
  const nav = useNavigate();
  const { mutate, isPending } = useUpdateItem();

  const form = useEditItemForm(data);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    clearStorage,
  } = form;

  const onSuccess = () => {
    clearStorage();
    nav(ROUTES_NAMES.AD.replace(":id", String(data.id)));
  };

  const onSubmit: SubmitHandler<ItemUpdateIn> = (values) => {
    mutate({ id: data.id, data: values }, { onSuccess });
  };

  const category = watch("category");
  const FieldsComponent = category ? CATEGORY_FIELDS_MAP[category] : null;

  const handleCancelClick = () => {
    clearStorage();
    nav(ROUTES_NAMES.AD.replace(":id", String(data?.id)));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoadingOverlay visible={isLoading} zIndex={1000} />
      <Controller
        control={control}
        name="category"
        rules={{ required: "Обязательное поле" }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            placeholder="Выберите категорию"
            label={
              <Title display={"inline"} order={5}>
                Категория
              </Title>
            }
            data={Object.entries(CATEGORY_MAP).map(([key, val]) => ({
              value: key,
              label: val,
            }))}
            allowDeselect={false}
            withAsterisk
            error={fieldState.error?.message}
            rightSection={ClearButton({ field })}
          />
        )}
      />

      <Divider mt="lg" mb="md" />

      <Controller
        control={control}
        name="title"
        rules={{ required: "Обязательное поле" }}
        render={({ field, fieldState }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            placeholder="Введите название"
            label={
              <Title display={"inline"} order={5}>
                Название
              </Title>
            }
            // maxLength={50}
            withAsterisk
            error={fieldState.error?.message}
            rightSection={ClearButton({ field })}
          />
        )}
      />

      <Divider mt="lg" mb="md" />

      <Stack gap="xs">
        <Controller
          control={control}
          name="price"
          rules={{
            required: "Обязательное поле",
            min: {
              value: 1,
              message: "Цена должна быть больше 0 ₽",
            },
          }}
          render={({ field, fieldState }) => (
            <NumberInput
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder="Введите цену"
              label={
                <Title display={"inline"} order={5}>
                  Цена
                </Title>
              }
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              error={fieldState.error?.message}
              thousandSeparator=" "
              allowNegative={false}
              max={999999999}
              suffix=" ₽"
              allowDecimal={false}
              trimLeadingZeroesOnBlur
              withAsterisk
              hideControls
              rightSection={ClearButton({ field })}
              rightSectionWidth={34}
            />
          )}
        />
        <GetMarketPriceButton form={form} />
      </Stack>

      <Divider mt="lg" mb="md" />

      {FieldsComponent && (
        <>
          <Title order={5} mb={8}>
            Характеристики
          </Title>
          <FieldsComponent form={form} />
          <Divider mt="lg" mb="md" />
        </>
      )}

      <Stack gap="xs">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Введите описание"
              label="Описание"
              rows={6}
              rightSection={
                <Text size="xs" pb={2} pr={4} ml={"auto"} mt={"auto"}>
                  {field.value?.length ?? 0}/1000
                </Text>
              }
              rightSectionWidth={70}
              maxLength={1000}
            />
          )}
        />
        <GenerateDescriptionButton form={form} />
      </Stack>

      <Group mt="xl" gap="xs">
        <Button
          size="md"
          type="submit"
          disabled={!isValid || isPending}
          loading={isPending}
        >
          Сохранить
        </Button>
        <Button variant="light" size="md" onClick={handleCancelClick}>
          Отменить
        </Button>
      </Group>
    </form>
  );
};
