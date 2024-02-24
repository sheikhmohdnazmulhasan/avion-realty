import AdminNav from "@/components/dashboard/admin/AdminNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminNav />
      </div>
      <div>
        {/* dynamic content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
