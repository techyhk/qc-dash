import React from "react";
import { Navbar, Button, Link, Text, useTheme, Avatar, Dropdown } from "@nextui-org/react";
import { useUser } from "../../lib/hooks";
import { icons } from "../icons/Icons.js";
import { ThemeSwitch } from "./ThemeSwitch";
import { useRouter } from "next/router";

export function NavBar() {
  const user = useUser();
  const router = useRouter();

  const { isDark } = useTheme();

  const collapseItems = [
    { name: "Profile", href: "/profile" },
    { name: "AdsTxt", href: "/dashboard/adsTxt" },
    { name: "Video Player", href: "/dashboard/videoPlayer" },
    // { name: "Header Bidding", href: "/dashboard/headerBidding" },
    { name: "Log Out", href: "/api/logout" },
  ];

  const menuItems = [
    {
      key: "Ads Txt",
      name: "Ads Txt",
      description: "UB Ads Txt",
      href: "/dashboard/adsTxt",
      icon: icons.server,
    },
    {
      key: "Video Player",
      name: "Video Player",
      description: "UB Video Player",
      href: "/dashboard/videoPlayer",
      icon: icons.server,
    },
    // {
    //   key: "Header Bidding",
    //   name: "Header Bidding",
    //   description: "UB Header Bidding",
    //   href: "/dashboard/headerBidding",
    //   icon: icons.activity,
    // },
  ];

  const selectMenuItem = select => {
    router.push(menuItems.find(item => select.has(item.key)).href);
  };

  return (
    <>
      <Navbar variant="floating">
        <Navbar.Toggle showIn="md" />
        <Navbar.Brand>
          <Link href="/">
            <Text h2 b color="inherit" hideIn="md">
              Unibots
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          isCursorHighlightRounded
          enableCursorHighlight
          activeColor="primary"
          hideIn="md"
          variant="underline"
        >
          <Navbar.Link isActive={router.pathname === "/"} href="\">
            Home
          </Navbar.Link>
        </Navbar.Content>
        {!user ? (
          <Navbar.Content>
            <Navbar.Item>
              <ThemeSwitch />
            </Navbar.Item>
            <Navbar.Link color="inherit" href="/login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto ghost as={Link} color="gradient" href="/signup">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Navbar.Item>
              <ThemeSwitch />
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="/profile">
                <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e25056704b" color="gradient" bordered />
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <a href="/api/logout">
                <Button auto ghost color="gradient">
                  Logout
                </Button>
              </a>
            </Navbar.Item>
          </Navbar.Content>
        )}
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item.name}
              activeColor="primary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.href}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}