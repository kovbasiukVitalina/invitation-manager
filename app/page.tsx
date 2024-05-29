"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <BackgroundGradientAnimation>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <h1 className="dark:text-shadow-d text-shadow-l leading-[1.2] drop-shadow-2xl text-primary">
            Invitation Manager
          </h1>
          <h2 className="my-4 text-xl md:text-2xl lg:text-3xl text-white/70">
            This service solves the problem of managing your invitations.
          </h2>
        </div>
      </BackgroundGradientAnimation>
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[100px] inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full text-2xl !text-primary bg-black/80 px-3 py-1 font-medium text-white backdrop-blur-3xl"
          onClick={() => router.push("/create-invitation")}
        >
          Get start
        </span>
      </button>
    </main>
  );
}
