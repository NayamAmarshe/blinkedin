import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { handlePostState, getPostState } from "../atoms/postAtom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { Avatar, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import TimeAgo from "timeago-react";
import { useState } from "react";

const Post = ({ post, modalPost }) => {
  const { data: session } = useSession();

  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "... See More" : string;

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 border border-gray-300 py-2.5 dark:border-none`}
    >
      <div className="flex cursor-pointer items-center px-2.5">
        <Avatar src={post.userImage} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm opacity-80 dark:text-white/75">{post.email}</p>
          {/* Timestamp */}
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs opacity-80 dark:text-white/75"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="h-7 w-7 dark:text-white/75" />
          </IconButton>
        )}
      </div>
      {post.input && (
        <div className="break-all px-2.5 md:break-normal">
          {modalPost || showInput ? (
            <p>
              {post.input}{" "}
              <button className="block" onClick={() => setShowInput(false)}>
                See Less
              </button>
            </p>
          ) : (
            <p onClick={() => setShowInput(true)} className="cursor-pointer">
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoURL && !modalPost && (
        <img
          src={post.photoURL}
          alt="Post"
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}

      <div className="mx-2.5 flex items-center justify-evenly border-gray-600/80 pt-2 text-black/60 dark:border-t dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button className="postButton" onClick={() => setLiked(!liked)}>
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}
            <AnimatePresence>
              <motion.h4 className="transition-all ease-out">
                {liked ? "Unlike" : "Like"}
              </motion.h4>
            </AnimatePresence>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}
          >
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
