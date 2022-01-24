import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar } from "@mui/material";
import HeaderLink from "./HeaderLink";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-around bg-white dark:bg-black py-1.5 px-3 focus-within:shadow-lg">
      <div className="flex items-center w-full max-w-xs space-x-2">
        {/* LEFT */}
        <Image src="https://rb.gy/bizvqj" width={45} height={45} />
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow hidden text-sm bg-transparent md:inline-flex focus:outline-none placeholder-black/70 dark:placeholder-white/75"
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
        <div
          className={`bg-gray-300 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative`}
        >
          <span className="absolute left-0.5">🌚</span>
          {/* <motion.div></motion.div> */}
          <span className="absolute right-0.5">💡</span>
        </div>
      </div>
    </header>
  );
}
