import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/components";

export const Navbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">RMDB</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
