"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeaderAnchor from "./headerAnchor";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
     <nav className="sticky top-0 z-50 w-screen bg-[#6c5846] p-3 text-[#F1EBE4] sm:p-4 md:p-5 ">
    <div className="relative flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-lg font-bold sm:text-xl">
          Jidapa_Kra
        </h1>

        <button
          type="button"
          aria-label="เปิดเมนู"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-2 xl:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
      <div className="absolute left-0 top-full w-full bg-[#6c5846] shadow-lg xl:hidden">
        <div className="border-t border-white/20 px-4 pt-3 pb-3 ">
          <HeaderAnchor mobile />
        </div>
      </div>
    )}
    </nav>
  );
};

export default Header;