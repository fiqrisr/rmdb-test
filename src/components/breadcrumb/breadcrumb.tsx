import NextLink from "next/link";
import { Link } from "@nextui-org/react";
import { MdKeyboardArrowRight } from "react-icons/md";

type BreadcrumbProps = {
  items: {
    isLink?: boolean;
    key: string;
    href?: string;
    label: string;
  }[];
};

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex gap-x items-center">
      {items.map((item, i, arr) => {
        const bullet =
          i + 1 !== arr.length ? (
            <MdKeyboardArrowRight className="mr-2" />
          ) : null;

        if (item.isLink && item.href) {
          return (
            <>
              <Link
                key={item.key}
                href={item.href}
                className="text-xl font-medium mr-2"
                as={NextLink}
              >
                {item.label}
              </Link>
              {bullet}
            </>
          );
        }

        return (
          <>
            <span className="text-xl font-medium mr-2" key={item.key}>
              {item.label}
            </span>
            {bullet}
          </>
        );
      })}
    </div>
  );
};
