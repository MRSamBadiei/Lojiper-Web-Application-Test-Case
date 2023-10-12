"use client";
import { SessionProvider as MyProvider } from "next-auth/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import store from "./features/store";
type Props = {
  children?: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <MyProvider>{children}</MyProvider>
      </Provider>
    </LocalizationProvider>
  );
}
