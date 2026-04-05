import { Controller } from "react-hook-form";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { useEditItemForm } from "../model/useEditItemForm";
import {
  AUTO_PARAMS_MAP,
  TRANSMISSION_MAP,
} from "@/entities/item/model/params";
import { ClearButton } from "./ClearButton";
import { getRevisionStyle } from "../model/getRevisionStyle";

const FIELD_MT = 12;

export const AutoParamsFields = ({
  form,
}: {
  form: ReturnType<typeof useEditItemForm>;
}) => {
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name="params.brand"
        render={({ field }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите бренд"
            label={AUTO_PARAMS_MAP.brand}
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
            label={AUTO_PARAMS_MAP.model}
            mt={FIELD_MT}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.yearOfManufacture"
        render={({ field }) => (
          <NumberInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите год выпуска"
            label={AUTO_PARAMS_MAP.yearOfManufacture}
            mt={FIELD_MT}
            max={new Date().getFullYear()}
            min={1900}
            allowDecimal={false}
            trimLeadingZeroesOnBlur
            hideControls
            rightSectionWidth={34}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.transmission"
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Выберите трансмиссию"
            label={AUTO_PARAMS_MAP.transmission}
            data={Object.entries(TRANSMISSION_MAP).map(([key, val]) => ({
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
        name="params.mileage"
        render={({ field }) => (
          <NumberInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите пробег"
            label={AUTO_PARAMS_MAP.mileage}
            max={999999999}
            allowDecimal={false}
            trimLeadingZeroesOnBlur
            thousandSeparator=" "
            allowNegative={false}
            mt={FIELD_MT}
            hideControls
            rightSectionWidth={34}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.enginePower"
        render={({ field }) => (
          <NumberInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите мощность двигателя"
            label={AUTO_PARAMS_MAP.enginePower}
            max={999999999}
            allowDecimal={false}
            trimLeadingZeroesOnBlur
            thousandSeparator=" "
            allowNegative={false}
            mt={FIELD_MT}
            hideControls
            rightSectionWidth={34}
            styles={getRevisionStyle(field)}
          />
        )}
      />
    </>
  );
};
