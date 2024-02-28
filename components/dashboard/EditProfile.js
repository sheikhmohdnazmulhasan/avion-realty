import axios from "axios";

const EditProfile = ({ user }) => {
  const currentUser = user

  const handleProfileEdit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const languagesSpeak = form.langs.value;
    const wpNum = form.whatsApp.value;
    const about = form.about.value;

    const updatedData = { email: currentUser.email, wpNum, name, languagesSpeak, about }

    try {
      const res = await axios.put(`http://localhost:3000/api/users?email=${currentUser.email}`, updatedData);

      if (res.data.success) {
        alert('Data updated');


      } else {
        alert('Something wrong, check console');
      }



    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="bg-[#161616] p-12 rounded-2xl">
      <h2 className="text-2xl font-semibold">Edit Profile</h2>

      <form className="mt-4 text-sm" onSubmit={handleProfileEdit}>
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
              type="number"
              name="whatsApp"
              defaultValue={currentUser?.wpNum}
              placeholder="Write your whatsapp number"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
            />
          </div>
        </div>
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
