"use client";
import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import useGetAmenities from "@/hooks/useGetAmenities";
import useGetAreas from "@/hooks/useGetAreas";
import useGetDevelopers from "@/hooks/useGetDevelopers";
import useGetProperties from "@/hooks/useGetProperties";
import useUser from "@/hooks/useUser";

const AddOffPlan = () => {
  document.title = 'Avion Realty | Dashboard | Add-Off-Plan';
  const properties = useGetProperties();
  const areas = useGetAreas();
  const developers = useGetDevelopers();
  const agents = useAgents();
  const amenities = useGetAmenities();
  const user = useUser();


  return (
    <div>
      <Navbar title="Add Off-Plan Property" />
      {/* add off plan form */}
      <form className="mt-16 space-y-8 mr-8 ">
        <div className="flex justify-between w-full gap-12 ">
          {/* title */}
          <div className="w-3/5">
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="write listing title"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
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
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
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
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-400 my-2"
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
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-400 my-2"
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
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-400 my-2"
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

          {/* bedroom */}
          <div>
            <label>Bedrooms</label>
            <br />
            <div className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 flex justify-between">
              <span>BR</span>
              <input
                type="number"
                min="1"
                max="7"
                defaultValue="1"
                name="bedroom"
                className="bg-transparent outline-none w-12"
              />
            </div>
          </div>

          {/* Starting Area Sq.ft. */}
          <div>
            <label>Starting Area Sq.ft.</label>
            <br />
            <input
              type="number"
              name="areaSqFt"
              placeholder="write property area (sq.ft.)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
            />
          </div>

          {/* Estimated Completion */}
          <div>
            <label>Estimated Completion</label>
            <br />
            <input
              type="text"
              name="completion"
              placeholder="write completion"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
            />
          </div>

          {/* Views */}
          <div>
            <label>Views</label>
            <br />
            <input
              type="text"
              name="views"
              placeholder="Eg. (Sea View)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
            />
          </div>

          {/* only for admin role to select agent*/}
          {user?.data?.role === "admin" && (
            <div>
              <label>Select Agent</label>
              <br />
              <select
                name="agent"
                placeholder="Select agent"
                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
              >
                <option value="" disabled selected>
                  Select agent
                </option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent.email}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/* description */}
        <div>
          <label>Description</label>
          <textarea
              name="description"
              placeholder="write description"
              rows={12}
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
            />
        </div>
        {/* location input field */}
        <div>
            <label>Location</label>
            <br />
            <input
              type="text"
              name="location"
              placeholder="write location (eg. Address downtown, Burj Khalifa)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-400 "
            />
        </div>

        {/* amenities */}
        <div>
            <label className="text-xl">Amenities</label>
            <br />
            <div className="grid grid-cols-3 gap-6 mt-3">
              {
                amenities.map(amenity => (
                <div key={amenity._id} amenity={amenity} className="flex items-center gap-4">
                  <input type="checkbox" value={amenity.name} name="amenity" className="toggle bg-[#FFD673] border-4 border-[#CB9107]" />
                  <label>{amenity.name}</label>
                </div>
                )
                )
              }
            </div>
          </div>

        {/* <div className="flex justify-end mt-6">
          <input
            type="submit"
            value="Save Changes"
            className="bg-[#835C00] hover:cursor-pointer px-8 py-2 rounded-md"
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddOffPlan;
