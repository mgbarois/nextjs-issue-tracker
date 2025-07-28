"use client";
import { Avatar, Box, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const userName = session?.user?.name;
  const userImage = session?.user?.image;

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
      <Box>
        {status === "authenticated" ? (
          <Flex gap="3" align="center">
            <Link href="/api/auth/signout">Sign out</Link>
            <Avatar
              size="2"
              radius="full"
              variant="solid"
              src={userImage || undefined}
              fallback={userName ? userName.split(" ")[0][0] : "U"}
            />
          </Flex>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
