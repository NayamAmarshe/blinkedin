import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import React, { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import HeaderLink from "./HeaderLink";
import Image from "next/image";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function Header() {
  const { setTheme, resolvedTheme, theme } = useTheme(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-around bg-white py-1.5 px-3 transition-colors duration-500 ease-in-out focus-within:shadow-lg dark:bg-black">
      <div className="flex w-full max-w-xs items-center space-x-2">
        {/* LEFT */}
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}
        <div className="flex w-full items-center space-x-1 rounded py-2.5 px-4 dark:md:bg-gray-700">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden flex-grow bg-transparent text-sm placeholder-black/70 focus:outline-none dark:placeholder-white/75 md:inline-flex"
          />
        </div>
        {/* RIGHT */}
      </div>
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
        {mounted && (
          <div
            className={`relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-500 px-0.5`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0.5">🌚</span>
            <motion.div
              className={`${
                resolvedTheme === "dark" ? "left-1" : "right-1"
              } absolute z-40 h-5 w-5 rounded-full bg-white`}
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">💡</span>
          </div>
        )}
      </div>
    </header>
  );
}
