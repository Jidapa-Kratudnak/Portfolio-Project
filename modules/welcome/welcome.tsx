import GradientButton from "@/components/gradientButton";
import { ChevronsDown } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-[69px]">
        Welcome to My Portfolio!
      </h1>

      <h1 className="mb-4 text-2xl font-normal sm:text-3xl md:text-4xl lg:text-[46px]">
        ยินดีต้อนรับเข้าสู่พอร์ตโฟลิโอของฉัน!
      </h1>

      <GradientButton
        width="clamp(260px, 60vw, 400px)"
        height="clamp(65px, 10vw, 100px)"
        fontSize="clamp(20px, 4vw, 36px)"
        className="m-6 sm:m-8 md:m-10"
      >
        Explore My Work
        <ChevronsDown className="ml-2 h-6 w-6 sm:ml-3 sm:h-7 sm:w-7 md:h-9 md:w-9" />
      </GradientButton>
    </div>
  );
};

export default Welcome;
