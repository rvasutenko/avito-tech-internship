import { ActionIcon, Affix } from "@mantine/core";
import { SunIcon } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";

export const Root = () => {

  return (
    <>
      {/* <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon
          size={"xl"}
          onClick={() => {}}
        >
          <SunIcon />
        </ActionIcon>
      </Affix> */}
      <Outlet />
    </>
  );
};
