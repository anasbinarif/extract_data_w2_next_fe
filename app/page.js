import LoginPage from "@/components/LoginHeader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginPage />
      </div>
    </div>
  );
}
