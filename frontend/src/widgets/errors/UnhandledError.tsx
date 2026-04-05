import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import { XCircleIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const UnhandledError = () => {
  const nav = useNavigate();

  return (
    <ErrorState
      icon={<XCircleIcon color="red" weight="light" size={48} />}
      title="Что-то пошло не так"
      message={
        <>
          Ошибка обращения к сервису.
          <br />
          Попробуйте обновить страницу через некоторое время
        </>
      }
      actionText="Обновить страницу"
      onClick={() => nav(0)}
    />
  );
};
