import Navbar from "@/components/dashboard/Navbar";
import Areas from "@/components/dashboard/admin/items/Areas";
import Developers from "@/components/dashboard/admin/items/Developers";
import Propertiy from "@/components/dashboard/admin/items/Propertiy";

const page = () => {
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

export default page;
