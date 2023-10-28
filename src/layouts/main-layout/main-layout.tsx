import { PropsWithChildren } from "react";

import { Navbar } from "@/components";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
