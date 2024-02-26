import Sidebar from "@/components/dashboard/admin/Sidebar";
import "../../../globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen ">
      <div className=" shadow-gray-500 shadow-xl">
        <Sidebar />
      </div>
      <div className="w-4/5">
        {/* dynamic content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
