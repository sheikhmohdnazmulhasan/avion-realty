const EditProfile = ({ user }) => {
  const currentUser = user?.data?.user;

  return (
    <div className="bg-[#161616] p-12 rounded-2xl">
      <h2 className="text-2xl font-semibold">Edit Profile</h2>

      <form className="mt-4 text-sm">
        <div className="flex justify-between w-full gap-12 mb-6">
          <div className="w-1/2">
            <label>User Name</label>
            <br />
            <input
              type="text"
              name="name"
              defaultValue={currentUser?.name}
              placeholder="Write your name"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full"
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
              className="bg-black text-xs p-2 rounded-md mt-1 w-full"
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
              defaultValue={currentUser?.langs}
              placeholder="Write your language"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full"
            />
          </div>
          <div className="w-1/2">
            <label>WhatsApp Number</label>
            <br />
            <input
              type="phone"
              name="whatsApp"
              defaultValue={currentUser?.whatsApp}
              placeholder="Write your whatsapp number"
              className="bg-black text-xs p-2 rounded-md mt-2 w-full"
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
            className="bg-black text-xs p-2 rounded-md mt-1 w-full"
            rows={12}
          />
        </div>
        <div className="flex justify-end mt-6">
          <input
            type="submit"
            value="Save Changes"
            className="bg-[#835C00] px-8 py-2 rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
