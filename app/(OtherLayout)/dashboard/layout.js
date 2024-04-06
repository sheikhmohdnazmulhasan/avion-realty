'use client'

import Sidebar from "@/components/dashboard/Sidebar";
import "../../globals.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

export default function AdminLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader
          color="#3e143e"
          size={60}
        />
      </div>
    )
  };

  if (status === 'unauthenticated') return router.push('/login');

  if (status === 'authenticated') return (
    <div className="flex max-h-screen overflow-hidden ">
      <div className="w-1/4 bg-black ">
        <Sidebar />
      </div>
      <div className="w-3/4 max-h-screen overflow-y-scroll bg-[#0A0909] shadow-gray-700 shadow-xl">
        {/* dynamic content */}
        <div className="px-12 py-12">{children}</div>
      </div>
    </div>
  );
}
