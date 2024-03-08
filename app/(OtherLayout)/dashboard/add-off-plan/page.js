"use client";
import Navbar from "@/components/dashboard/Navbar";
import useGetAreas from "@/hooks/useGetAreas";
import useGetDevelopers from "@/hooks/useGetDevelopers";
import useGetProperties from "@/hooks/useGetProperties";

const AddOffPlan = () => {
  const properties = useGetProperties();
  const areas = useGetAreas();
  const developers = useGetDevelopers();
  return (
    <div>
      <Navbar title="Add Off-Plan Property" />
      {/* add off plan form */}
      <form className="mt-16 space-y-8 mr-8">
        <div className="flex justify-between w-full gap-12 ">
          {/* title */}
          <div className="w-3/5">
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="write listing title"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
          {/* starting price AED */}
          <div className="w-2/5">
            <label>Starting Price AED</label>
            <br />
            <input
              type="number"
              name="price"
              placeholder="write property price"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-12 ">
          {/* property type */}
          <div>
            <label>Property Type</label>
            <br />
            <select
              name="propertyType"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
                Select Property type
              </option>
              {properties.map((property) => (
                <option key={property._id} value={property.propertyName}>
                  {property.propertyName}
                </option>
              ))}
            </select>
          </div>
          {/* area */}
          <div>
            <label>Area</label>
            <br />
            <select
              name="area"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
                Select Property location
              </option>
              {areas.map((area) => (
                <option key={area._id} value={area.itemName}>
                  {area.itemName}
                </option>
              ))}
            </select>
          </div>
          {/* developer */}
          <div>
            <label>Developer</label>
            <br />
            <select
              name="developer"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted my-2"
            >
              <option value="" disabled selected>
                Developer name
              </option>
              {developers.map((developer) => (
                <option key={developer._id} value={developer.devName}>
                  {developer.devName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Languages</label>
            <br />
            <input
              type="text"
              name="langs"
              placeholder="Write your language"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
          <div>
            <label>Languages</label>
            <br />
            <input
              type="text"
              name="langs"
              placeholder="Write your language"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <input
            type="submit"
            value="Save Changes"
            className="bg-[#835C00] hover:cursor-pointer px-8 py-2 rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

export default AddOffPlan;
