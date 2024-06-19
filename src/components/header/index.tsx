import Link from "next/link";
import React from "react";
import { HeaderLink } from "./header-link";

export function Header() {
  return (
    <header className="bg-white">
      <div
        className="justify-between items-center flex w-auto"
        id="mobile-menu-2"
      >
        <ul className="flex flex-row my-4 font-medium space-x-2 ">
          <HeaderLink link="/task1" title="Task One" />
          <HeaderLink link="/task2" title="Task Two" />
          <HeaderLink link="/task3" title="Task Three" />
        </ul>
      </div>
    </header>
  );
}
