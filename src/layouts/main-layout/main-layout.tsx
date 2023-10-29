import { PropsWithChildren, useState, useEffect } from "react";

import { Navbar } from "@/components";

export const MainLayout = ({
  children,
  hero
}: PropsWithChildren<{ hero?: React.ReactNode }>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Navbar />
      <main className="px-6 overflow-x-hidden">
        {hero}
        <div className="mt-6 container mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
};
