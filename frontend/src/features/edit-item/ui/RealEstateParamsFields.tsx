import { Controller } from "react-hook-form";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { useEditItemForm } from "../model/useEditItemForm";
import {
  REAL_ESTATE_PARAMS_MAP,
  REAL_ESTATE_TYPE_MAP,
} from "@/entities/item/model/params";
import { ClearButton } from "./ClearButton";
import { getRevisionStyle } from "../model/getRevisionStyle";

const FIELD_MT = 12;

export const RealEstateParamsFields = ({
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
            placeholder="Выберите тип"
            label={REAL_ESTATE_PARAMS_MAP.type}
            data={Object.entries(REAL_ESTATE_TYPE_MAP).map(([key, val]) => ({
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
        name="params.address"
        render={({ field }) => (
          <TextInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите адрес"
            label={REAL_ESTATE_PARAMS_MAP.address}
            mt={FIELD_MT}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.area"
        render={({ field }) => (
          <NumberInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите площадь"
            label={REAL_ESTATE_PARAMS_MAP.area}
            max={999999999}
            min={1}
            allowDecimal={false}
            trimLeadingZeroesOnBlur
            mt={FIELD_MT}
            hideControls
            rightSectionWidth={34}
            styles={getRevisionStyle(field)}
          />
        )}
      />
      <Controller
        control={control}
        name="params.floor"
        render={({ field }) => (
          <NumberInput
            value={field.value ?? ""}
            onChange={field.onChange}
            rightSection={ClearButton({ field })}
            placeholder="Введите этаж"
            label={REAL_ESTATE_PARAMS_MAP.floor}
            max={999999}
            min={1}
            allowDecimal={false}
            trimLeadingZeroesOnBlur
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
