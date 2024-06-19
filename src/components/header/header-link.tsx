"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type HeaderLinkProps = {
  link: string;
  title: string;
};

export function HeaderLink({ link, title }: HeaderLinkProps) {
  const pathname = usePathname();
  const isCurrent = link.includes(pathname);
  return (
    <li>
      <Link
        href={link}
        className={clsx("block py-2 pr-4 pl-3", {
          "text-black rounded bg-primary-700": isCurrent,
          "text-gray-700 hover:bg-gray-300": !isCurrent,
        })}
        aria-current="page"
      >
        {title}
      </Link>
    </li>
  );
}
