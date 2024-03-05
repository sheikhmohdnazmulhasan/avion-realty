import Sidebar from "@/components/dashboard/Sidebar";
import "../../globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex max-h-screen overflow-hidden ">
      <div className="w-1/4 shadow-gray-500 shadow-xl">
        <Sidebar />
      </div>
      <div className="w-3/4 max-h-screen overflow-y-scroll">
        {/* dynamic content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
