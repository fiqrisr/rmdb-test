import { FormEvent } from "react";
import Link from "next/link";
import { atom, useAtom } from "jotai";
import {
  Input,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";

import { ThemeSwitcher } from "@/components";
import { AppLogo } from "@/icons/app-logo";
import { SearchIcon } from "@/icons/search-icon";
import { useRouter } from "next/router";

export const searchAtom = atom("");

export const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useAtom(searchAtom);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        q: search
      }
    });
  };

  return (
    <NextUINavbar shouldHideOnScroll isBordered>
      <NavbarBrand className="gap-3">
        <Link href="/" className="flex gap-4 items-center justify-center">
          <AppLogo className="h-10 w-fit" />
          <p className="font-bold text-inherit text-xl">RMDB</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <form onSubmit={handleSearch}>
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
            value={search}
            onValueChange={setSearch}
          />
        </form>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
