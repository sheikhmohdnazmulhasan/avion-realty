import Sidebar from "@/components/dashboard/admin/Sidebar";
import "../../../globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen ">
      <div className="w-1/4 shadow-gray-500 shadow-xl">
        <Sidebar />
      </div>
      <div className="w-3/4">
        {/* dynamic content */}
        <div className="py-8 px-12">{children}</div>
      </div>
    </div>
  );
}
