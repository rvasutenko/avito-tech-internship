import { ROUTES_NAMES } from "@/app/router";
import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import { XCircleIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const ServerError = () => {
  const nav = useNavigate();

  return (
    <ErrorState
      icon={<XCircleIcon color="red" weight="light" size={48} />}
      title="Ошибка 500"
      message={
        <>
          Ошибка обращения к сервису.
          <br />
          Попробуйте обновить страницу через некоторое время
        </>
      }
      actionText="На главную"
      onClick={() => nav(ROUTES_NAMES.ADS_LIST)}
    />
  );
};
