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
    <nav className="px-5 border-b mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
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
          </Flex>
          <Box>
            {status === "authenticated" ? (
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
                    <Text>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
