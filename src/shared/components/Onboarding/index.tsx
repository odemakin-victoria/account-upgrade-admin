import GradientBg from "@/shared/assets/images/gradient-bg.png";
import optimusLogo from "@/shared/assets/images/optimus-logo.png";
import { ReactNode } from "react";
import PatternBg from "@/shared/assets/images/pattern-bg.png";

export function Header() {
  return (
    <div className="flex items-center mb-10">
      <div className="relative">
        <img src={GradientBg} alt="" />
        <img
          src={optimusLogo}
          alt="optimus-logo"
          className="flex absolute top-8 right-4"
        />
      </div>

      <div className="flex items-center">
      <h1 className="text-5xl mb-4 font-bold">Loan</h1>
      <span className="text-secondary text-5xl mb-4">.</span>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1" aria-label="page layout">
      <Header />

      <div className="">{children}</div>

      <img src={PatternBg} alt="" className="fixed bottom-0" />
    </div>
  );
}
