import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";

const EditProfile = ({ user}) => {
  const currentUser = user;

  const handleProfileEdit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const languagesSpeak = form.langs.value;
    const wpNum = form.whatsApp.value;
    const about = form.about.value;

    let updatedData = {};

    if (currentUser.role !== 'admin') {
      const reraID = form.reraID.value;
      const specializes = form.specializes.value;

      updatedData = {
        email: currentUser.email,
        wpNum,
        name,
        reraID,
        specializes,
        languagesSpeak,
        about,
      };
    } else {
      updatedData = {
        email: currentUser.email,
        wpNum,
        name,
        languagesSpeak,
        about,
      };
    }



    try {
      const res = await axios.put(
        `https://avion-realty.vercel.app/api/users?email=${currentUser.email}`,
        updatedData
      );

      if (res.data.success) {
        toast.success("Profile Info Updated", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        mutate(`https://avion-realty.vercel.app/api/users?email=${currentUser.email}`);
      } else {
        alert("Something wrong, check console");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#161616] px-12 py-8 rounded-2xl">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold">Edit Profile</h2>

      <form className="mt-8 text-sm" onSubmit={handleProfileEdit}>
        <div className="flex justify-between w-full gap-12 mb-6">
          <div className="w-1/2">
            <label>User Name</label>
            <br />
            <input
              type="text"
              name="name"
              defaultValue={currentUser?.name}
              placeholder="Write your name"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
          <div className="w-1/2">
            <label>Email Address</label>
            <br />
            <input
              type="email"
              name="email"
              disabled
              defaultValue={currentUser?.email}
              placeholder="Write your email address"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-12 mb-6">
          <div className="w-1/2">
            <label>Languages</label>
            <br />
            <input
              type="text"
              name="langs"
              defaultValue={currentUser?.languagesSpeak}
              placeholder="Write your language"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            />
          </div>
          <div className="w-1/2">
            <label>WhatsApp Number</label>
            <br />
            <input
              type="text"
              name="whatsApp"
              defaultValue={currentUser?.wpNum}
              placeholder="Write your whatsapp number"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
            />
          </div>
        </div>
        {/* for agent only  */}
        {currentUser?.role !== "admin" && (
          <div className="flex justify-between w-full gap-12 mb-6">
            <div className="w-1/2">
              <label>RERA ID</label>
              <br />
              <input
                type="text"
                name="reraID"
                defaultValue={currentUser?.reraID}
                placeholder="Write RERA number"
                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
              />
            </div>
            <div className="w-1/2">
              <label>Specializes</label>
              <br />
              <input
                type="text"
                name="specializes"
                defaultValue={currentUser?.specializes}
                placeholder="Write your specializes"
                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <label>About Me</label>
          <br />
          <textarea
            name="about"
            defaultValue={currentUser?.about}
            placeholder="Write about you (max 600 character)"
            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted "
            rows={12}
          />
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

export default EditProfile;
