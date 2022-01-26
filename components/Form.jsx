import { handlePostState } from "../atoms/postAtom";
import { modalState } from "../atoms/modalAtom";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Form = () => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const [input, setInput] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input,
        photoURL,
        username: session?.user?.name,
        email: session?.user?.email,
        userImage: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(
      "🚀 ~ file: Form.jsx ~ line 29 ~ uploadPost ~ responseData ",
      responseData
    );

    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="relative flex flex-col text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="Post about something..."
        className="w-full bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="max-w-xs truncate bg-transparent focus:outline-none dark:placeholder-white/75 md:max-w-sm"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />

      <button
        className="absolute bottom-0 right-0 rounded-full bg-blue-400 py-1 px-3.5 font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/75 disabled:text-black/40"
        disabled={!input.trim() && !photoURL.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
};

export default Form;
