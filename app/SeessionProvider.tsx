"use client";
import { SessionProvider as Provider } from "next-auth/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  children?: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider>{children}</Provider>
    </LocalizationProvider>
  );
}
