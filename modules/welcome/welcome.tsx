"use client";

import { Button } from "antd";
import { ChevronsDown } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-5xl lg:text-6xl">
        Welcome to My Portfolio!
      </h1>

      <h1 className="mb-4 text-2xl font-normal sm:text-2xl md:text-4xl lg:text-4xl">
        ยินดีต้อนรับเข้าสู่พอร์ตโฟลิโอของฉัน!
      </h1>
      <div className="animate-pop animate-duration-1000 animate-delay-300 animate-iteration-count-thrice">
        <Button
          type="primary"
          shape="round"
          className="m-6! h-auto! w-auto! border-[#6c5846]! bg-[#6c5846]! px-8! py-4! text-lg! text-white! transition-all duration-200 hover:-translate-y-1 hover:border-[#6c5846]! hover:bg-white! hover:text-[#6c5846]! sm:m-8! sm:px-10! sm:py-5! sm:text-xl! md:m-10! md:px-12! md:py-6! md:text-2xl!"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <span className="flex items-center">
            Explore My Work
            <ChevronsDown className="ml-2 h-6 w-6 sm:ml-3 sm:h-7 sm:w-7 md:h-9 md:w-9" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
