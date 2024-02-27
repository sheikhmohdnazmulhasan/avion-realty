import Areas from "@/components/dashboard/admin/items/Areas";

const page = () => {
  return (
    <div>
      <h2>items</h2>
      <div className="py-8 px-12 grid grid-cols-3 gap-8">
        <Areas />
        <Areas />
        <Areas />
      </div>
    </div>
  );
};

export default page;
