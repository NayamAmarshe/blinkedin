import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      Hello!
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
