import { createContext, useContext } from "react";
import { RootStore } from "@/stores/RootStore";

const rootStore = new RootStore();

export const RootStoreContext = createContext<RootStore>(rootStore);

export const RootStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error("useStores must be used within a RootStoreProvider");
  }

  return context;
};
