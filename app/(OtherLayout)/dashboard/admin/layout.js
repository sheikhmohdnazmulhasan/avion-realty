import Sidebar from "@/components/dashboard/admin/Sidebar";
import "../../../globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex max-h-screen">
      <div className=" shadow-gray-500 shadow-xl">
        <Sidebar />
      </div>
      <div>
        {/* dynamic content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
