import Sidebar from "@/components/dashboard/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex max-h-screen">
      <div className=" shadow-white shadow-lg">
        <Sidebar />
      </div>
      <div>
        {/* dynamic content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
