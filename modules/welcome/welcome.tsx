import GradientButton from "@/components/gradientButton";
import { ChevronsDown } from "lucide-react";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-[69px] font-bold mb-4">Welcome to My Portfolio!</h1>
      <h1 className="text-[46px] font-regular mb-4">
        ยินดีต้อนรับเข้าสู่พอร์ตโฟลิโอของฉัน!
      </h1>
      <GradientButton
        width={400}
        height={100}
        fontSize={36}
        className="font-semibold m-10"
      >
        Explore My Work
        <ChevronsDown 
          size={36}
          className="ml-3 "
        />
      </GradientButton>
    </div>
  );
};

export default Welcome;
