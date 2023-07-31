import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <header className="min-h-screen bg-blue-100 lg:p-14 p-4">
      <nav className="mb-24">
        <img
          src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
          alt="optimus_bank_logo"
        />
      </nav>

      {children}
    </header>
  );
}
