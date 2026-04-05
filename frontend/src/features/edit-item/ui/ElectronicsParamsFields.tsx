import { Controller } from "react-hook-form";
import { Select, TextInput } from "@mantine/core";
import { useEditItemForm } from "../model/useEditItemForm";
import {
  ELECTRONICS_CONDITION_MAP,
  ELECTRONICS_PARAMS_MAP,
  ELECTRONICS_TYPE_MAP,
} from "@/entities/item/model/params";
import { ClearButton } from "./ClearButton";
import { getRevisionStyle } from "../model/getRevisionStyle";

const FIELD_MT = 12;

export const ElectronicsParamsFields = ({
  form,
}: {
  form: ReturnType<typeof useEditItemForm>;
}) => {
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name="params.type"
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите категорию"
            label={ELECTRONICS_PARAMS_MAP.type}
            data={Object.entries(ELECTRONICS_TYPE_MAP).map(([key, val]) => ({
              value: key,
              label: val,
            }))}
            allowDeselect={false}
            mt={FIELD_MT}
            rightSection={ClearButton({ field })}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.brand"
        render={({ field }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите бренд"
            label={ELECTRONICS_PARAMS_MAP.brand}
            mt={FIELD_MT}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.model"
        render={({ field }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите модель"
            label={ELECTRONICS_PARAMS_MAP.model}
            mt={FIELD_MT}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.color"
        render={({ field }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите цвет"
            label={ELECTRONICS_PARAMS_MAP.color}
            mt={FIELD_MT}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.condition"
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите"
            label={ELECTRONICS_PARAMS_MAP.condition}
            data={Object.entries(ELECTRONICS_CONDITION_MAP).map(
              ([key, val]) => ({
                value: key,
                label: val,
              })
            )}
            allowDeselect={false}
            mt={FIELD_MT}
            rightSection={ClearButton({ field })}
            styles={getRevisionStyle(field)}
          />
        )}
      />
    </>
  );
};
