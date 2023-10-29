import {
  Input,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";

import { ThemeSwitcher } from "@/components";
import { AppLogo } from "@/icons/app-logo";
import { SearchIcon } from "@/icons/search-icon";
import Link from "next/link";

export const Navbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll isBordered>
      <NavbarBrand className="gap-3">
        <Link href="/" className="flex gap-4 items-center justify-center">
          <AppLogo className="h-10 w-fit" />
          <p className="font-bold text-inherit text-xl">RMDB</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[16rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
          }}
          placeholder="Searh movies"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
