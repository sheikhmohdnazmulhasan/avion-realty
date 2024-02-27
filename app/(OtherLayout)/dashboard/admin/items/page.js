import Areas from "@/components/dashboard/admin/items/Areas";
import Developers from "@/components/dashboard/admin/items/Developers";
import Propertiy from "@/components/dashboard/admin/items/Propertiy";

const page = () => {
  return (
    <div>
      <h2>items</h2>
      <div className="py-8 px-12 grid grid-cols-3 gap-8">
        <Areas />
        <Propertiy />
        <Developers />
      </div>
    </div>
  );
};

export default page;
