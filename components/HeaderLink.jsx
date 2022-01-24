import React from "react";

const HeaderLinks = ({ Icon, text, avatar, feed, active, hidden }) => {
  return (
    <div
      className={
        `${hidden && "hidden md:inline-flex"} ${
          feed
            ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
            : "text-gray-500 hover:text-gray-700"
        } ${active && "!text-black dark:!text-white"}` +
        "cursor-pointer flex flex-col justify-center items-center"
      }
    >
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" /> : <Icon />}
      <h4
        className={`text-sm ${
          feed && "hidden lg:flex justify-center w-full mx-auto"
        }`}
      >
        {text}
      </h4>
      {active && (
        <span className="hidden lg:block h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  );
};

export default HeaderLinks;
