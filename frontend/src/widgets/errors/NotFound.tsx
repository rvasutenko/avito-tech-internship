import { ROUTES_NAMES } from "@/app/router";
import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import { XCircleIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const nav = useNavigate();

  return (
    <ErrorState
      icon={<XCircleIcon color="red" weight="light" size={48} />}
      title="Ошибка 404"
      message="По вашему запросу ничего не найдено"
      actionText="На главную"
      onClick={() => nav(ROUTES_NAMES.ADS_LIST)}
    />
  );
};
