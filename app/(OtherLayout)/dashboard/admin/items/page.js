'use client'
import Navbar from "@/components/dashboard/Navbar";
import Areas from "@/components/dashboard/admin/items/Areas";
import Developers from "@/components/dashboard/admin/items/Developers";
import Propertiy from "@/components/dashboard/admin/items/Propertiy";
import useUser from "@/hooks/useUser";

const Items = () => {
  const { data: user } = useUser();

  if (user.role !== 'admin') {

    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    )
  }

  return (
    <div>
      <Navbar title="Items" />
      <div className="mt-20 grid grid-cols-3 gap-8">
        <Areas />
        <Propertiy />
        <Developers />
      </div>
    </div>
  );
};

export default Items;
