"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeaderAnchor from "./headerAnchor";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#6c5846] p-3 text-[#F1EBE4] sm:p-4 md:p-5">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:ml-20 lg:px-0">
        <h1 className="text-[20px] font-bold sm:text-xl">
          Jidapa_Kra
        </h1>

        <button
          type="button"
          aria-label="เปิดเมนู"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-2 lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
    isMenuOpen
      ? "pointer-events-auto max-h-125 opacity-100"
      : "pointer-events-none max-h-0 opacity-0"
  }`}
>
  <div className="mt-3 border-t border-white/20 px-4 pt-3">
    <HeaderAnchor mobile />
  </div>
</div>
      )}
    </nav>
  );
};

export default Header;