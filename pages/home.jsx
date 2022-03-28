import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { getProviders, signIn } from "next-auth/react";
import ExploreIcon from "@mui/icons-material/Explore";
import HeaderLink from "../components/HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import Image from "next/image";

const HomePage = ({ providers }) => {
  console.log(providers);
  return (
    <div className="relative space-y-10">
      <header className="flex items-center justify-around py-4">
        <div className="relative h-10 w-36">
          <Image src="/logo.png" layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center divide-gray-300 sm:divide-x">
          <div className="hidden space-x-8 pr-4 sm:flex">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          <div className="pl-4">
            {Object.values(providers).map((provider, index) => {
              return (
                <div key={index}>
                  <div className="pl-4">
                    <button
                      className="rounded-full border border-blue-700 px-5 py-1.5 font-semibold text-blue-700 transition-all hover:-m-[1px] hover:border-2 hover:bg-blue-100"
                      onClick={() => {
                        signIn(provider.id, { callbackUrl: "/" });
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-screen-lg flex-col items-center xl:flex-row">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="max-w-xl pl-4 text-3xl !leading-snug text-amber-800/80 md:text-5xl xl:p-0">
            Welcome to BlinkedIn!
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative top-14 right-5 h-80 w-80 xl:absolute xl:h-[650px] xl:w-[650px]">
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
