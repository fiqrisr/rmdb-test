import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";

import { ThemeSwitcher } from "@/components";
import { AppLogo } from "@/icons/AppLogo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll isBordered>
      <Link href="/">
        <NavbarBrand className="gap-3">
          <AppLogo className="h-10 w-fit" />
          <p className="font-bold text-inherit text-xl">RMDB</p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
