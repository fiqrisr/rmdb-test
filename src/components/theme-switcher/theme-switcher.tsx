import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/moon-icon";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      size="lg"
      color="secondary"
      isSelected={theme === "dark"}
      onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    />
  );
};
