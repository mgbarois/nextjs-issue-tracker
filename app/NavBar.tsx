"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <nav className="flex space-x-6 px-5 border-b mb-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                // className={`
                //  ${
                //    currentPath === link.href ? "opacity-100" : "opacity-70"
                //  } hover:opacity-85 transition-opacity`}
                className={classNames({
                  "opacity-100": link.href === currentPath,
                  "opacity-70": link.href !== currentPath,
                  "hover:opacity-85 transition-opacity": true,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
