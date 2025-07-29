"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const NavBar = () => {
  return (
    <nav className="px-5 border-b mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              className={classNames({
                "nav-link": true,
                // Exclamation mark necessary to override
                // conflicting styling of nav-link class:
                "!opacity-100": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Sign in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            size="2"
            radius="full"
            variant="solid"
            src={userImage || undefined}
            fallback={userName ? userName.split(" ")[0][0] : "U"}
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
