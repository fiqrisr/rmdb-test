import { PropsWithChildren, useState, useEffect } from "react";

import { Navbar } from "@/components";

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="container mx-auto px-6 max-w-5xl">{children}</main>
    </div>
  );
};
