"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme = {
    token: {
      colorPrimary: "#5800ff",
      colorError: "#F5222D",
    },
  };

  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
