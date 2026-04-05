import type { ItemGetOut, ItemUpdateIn } from "@/entities/item/api/types";
import { useDebouncedCallback, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type EditItemFormValues = ItemUpdateIn;

export const useEditItemForm = (initialData?: ItemGetOut) => {
  const storageKey = initialData?.id ? `edit-item-${initialData?.id}` : null;

  const [storedValues, setStoredValues, removeStoredValues] =
    useLocalStorage<EditItemFormValues | null>({
      key: storageKey || "edit-item",
      defaultValue: null,
    });

  const form = useForm<EditItemFormValues>({
    values: initialData,
    mode: "onChange",
  });

  const { watch, reset } = form;

  useEffect(() => {
    if (storedValues) {
      reset(storedValues);
    } else if (initialData) {
      reset(initialData);
    }
  }, [storedValues, initialData]);

  const setStoredValuesDebounced = useDebouncedCallback((values) => {
    setStoredValues(values);
  }, 300);

  useEffect(() => {
    const sub = watch((values) => {
      setStoredValuesDebounced(values);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return {
    ...form,
    clearStorage: removeStoredValues,
  };
};
