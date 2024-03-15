import Sidebar from "@/components/dashboard/Sidebar";
import "../../globals.css";

export default function AdminLayout({ children }) {
  return (
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
