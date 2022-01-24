import { signOut } from "next-auth/react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      {/* Hello! */}
      {/* <button onClick={signOut}>Sign Out</button> */}
    </div>
  );
}
