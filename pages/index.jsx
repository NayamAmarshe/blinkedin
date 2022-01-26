import { getSession, signOut, useSession } from "next-auth/react";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { connectToDatabase } from "../utils/mongodb";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import Feed from "../components/Feed";

export default function IndexPage({ posts }) {
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ IndexPage ~ posts", posts);
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="h-screen overflow-y-scroll bg-[#F3F2EF] transition-colors duration-500 ease-in-out dark:bg-black dark:text-white">
      <Header />
      {/* Hello! */}
      {/* <button onClick={signOut}>Sign Out</button> */}

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="mt-4 flex flex-col gap-x-5 md:flex-row">
          {/* Sidebar */}
          <Sidebar />
          {/* Feed */}
          <Feed posts={posts} />
        </div>
        {/* Widget */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Check if user authenticated on the server
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  //Get Posts via SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();
  // Get News API

  return {
    props: {
      session,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoURL: post.photoURL,
        username: post.username,
        email: post.email,
        userImage: post.userImage,
        createdAt: post.createdAt,
      })),
    },
  };
}
