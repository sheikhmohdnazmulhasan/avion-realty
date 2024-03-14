import Image from "next/image";
import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { PiKeyLight } from "react-icons/pi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { IoMdClose } from "react-icons/io";
import { CiCamera } from "react-icons/ci";

const UserProfile = ({ user, mutate }) => {
  const currentUser = user;
  const [editBio, setEditBio] = useState(false);
  const [editDesignation, setEditDesignation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bio, setBio] = useState("");
  const [designation, setDesignation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isHover, setIsHover] = useState(false);


  async function handleChangePassword(event) {
    event.preventDefault();
    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const confirmNewPassword = event.target.confirmNewPassword.value;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    setPasswordError("");

    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.",
        {
          style: {
            background: "#333",
            color: "#fff",
          },
        }
      );

      return;

    } else if (newPassword !== confirmNewPassword) {
      toast.error(" Password did not match!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      return;
    }

    try {
      const validCurrentPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      const checkSamePassword = await bcrypt.compare(
        newPassword,
        user.password
      );

      if (!validCurrentPassword) {
        setPasswordError("Wrong Password");
      } else if (checkSamePassword) {
        toast("New password is same as current password!", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        return;

      } else {
        const password = await bcrypt.hash(newPassword, 10);

        const dataWithNewPassword = { ...user, password };

        const serverResponse = await axios.put(
          `http://localhost:3000/api/users?email=${currentUser.email}`,
          dataWithNewPassword
        );

        if (serverResponse.data.success) {
          toast("Password Changed", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          setOpenModal(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeDesignation() {

    if (designation.length > 20) {

      toast.error("Write your Designation within 20 character.", {

        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return;

    } else {

      const dataWithDesignation = { ...user, designation };

      try {
        const serverResponse = await axios.put(
          `http://localhost:3000/api/users?email=${user?.email}`,
          dataWithDesignation
        );

        if (serverResponse.data.success) {
          setEditDesignation(false);

          toast.success("Designation Updated", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          mutate(`http://localhost:3000/api/users?email=${currentUser.email}`);
        }
      } catch (error) {
        console.log(error);
      }

    }



  }

  async function handleChangeBio() {

    if (bio.length > 150) {

      toast.error("Write your bio within 150 character.", {

        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return;

    } else {

      try {
        const dataWithBio = { ...user, bio };
        const serverResponse = await axios.put(
          `http://localhost:3000/api/users?email=${user?.email}`,
          dataWithBio
        );

        if (serverResponse.data.success) {
          setEditBio(false);

          toast.success("Bio Updated", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          mutate(`http://localhost:3000/api/users?email=${currentUser.email}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

  }

  async function handleChangeProfilePicture(data) {
    const image = new FormData();
    image.append('image', data);

    const toastId = toast.loading("Profile Picture Updating...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },

    });

    try {
      const imgBbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=10a0343a75c20fe85ce07c1d5561bfa1`, image);

      if (imgBbResponse.data.success) {
        const dataForBackend = { ...user, photo: imgBbResponse.data.data.display_url };

        const serverResponse = await axios.put(`http://localhost:3000/api/users?email=${user?.email}`, dataForBackend);

        if (serverResponse.data.success) {
          toast("Profile Picture Updated", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",

            }, id: toastId,

          },);

          mutate(`http://localhost:3000/api/users?email=${currentUser.email}`);
        }

      }


    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="bg-[#161616] p-8 rounded-2xl ">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold">My Profile</h2>

      {/* profile */}
      <div className="my-8 flex items-center gap-4">
        <div
          className="w-24 rounded-full hover:opacity-60 relative bg-black"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {currentUser?.photo ? (
            <Image
              width={96}
              height={96}
              src={currentUser?.photo}
              alt={currentUser?.name}
              className="rounded-full h-24 w-24 object-fill"
            />
          ) : (
            <FaUserCircle size={96} color="gray" />
          )}
          {/* upload profile */}
          {isHover && (
            <form className="absolute bottom-4 z-20 left-3">
              <input
                onChange={(event) => handleChangeProfilePicture(event.target.files[0])}
                type="file"
                accept="image/*"
                name="image"
                id="image-input"
                className="hidden"
              />
              <label for="image-input">
                <CiCamera size={24} className="w-2/3 mx-auto mb-1" />
                <p className="text-[10px] font-semibold">Upload Image</p>
              </label>
            </form>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
          {!editDesignation && (
            <p
              onClick={() => setEditDesignation(!editDesignation)}
              
            >
              {currentUser?.designation
                ? currentUser.designation
                : "Designation"}
            </p>
          )}
          {editDesignation && (
            <div className="">
              <input
                onChange={(event) => setDesignation(event.target.value)}
                type="text"
                name="whatsApp"
                defaultValue={currentUser?.designation || "Designation"}
                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
              />
              <button
                className="flex justify-end w-full hover:underline mt-2"
                onClick={handleChangeDesignation}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* bio */}
      <div>
        <div className="flex justify-between items-center my-1">
          <h3>Bio</h3>
          <button onClick={() => setEditBio(!editBio)}>
            <RiEditBoxFill />
          </button>
        </div>
        <div>
          <textarea
            onChange={(event) => setBio(event.target.value)}
            defaultValue={currentUser?.bio}
            disabled={!editBio}
            placeholder="Write your bio within 150 letters."
            className={`bg-black ${editBio && "border border-dotted"
              }  rounded-md text-xs w-full p-4`}
          />
          {editBio && (
            <button
              className="flex justify-end w-full hover:underline"
              onClick={handleChangeBio}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* other information */}
      <div className="my-4 space-y-4 text-sm">
        {currentUser?.role !== "admin" && (
          <div className="space-y-1">
            <h3>Specializes</h3>
            <p className="text-xs bg-black p-2 rounded-md">
              {currentUser?.specializes || "not included"}
            </p>
          </div>
        )}
        <div className="space-y-1">
          <h3>Email Address</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.email || "admin@avionrealty.ae"}
          </p>
        </div>
        <div className="space-y-1">
          <h3>WhatsApp Number</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.wpNum || "+xxx xx xxx xxxx"}
          </p>
        </div>
        <div className="space-y-1">
          <h3>Languages Speak</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.languagesSpeak || "English"}
          </p>
        </div>
      </div>

      {/* change password */}
      <div className="text-center">
        <button
          onClick={() => setOpenModal(!openModal)}
          className="text-xs hover:underline text-[#FFD167]"
        >
          Need to Change Password?{" "}
        </button>

        {openModal && (
          <div className="w-2/5 absolute top-1/4 left-1/3">
            <div className="text-right">
              <button onClick={() => setOpenModal(false)}>
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="bg-black p-12 rounded-lg shadow-md shadow-gray-800  text-left">
              <h2 className="mb-6 text-xl font-semibold">
                Change Your Password Here
              </h2>
              <form className=" space-y-3" onSubmit={handleChangePassword}>
                <div>
                  <label>Old Password</label>
                  <br />
                  <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                    <PiKeyLight className="text-xl rotate-180 ml-2" />
                    <input
                      type="text"
                      name="currentPassword"
                      placeholder="Old PassWord"
                      className="bg-black w-full p-2 outline-none"
                    />
                  </div>
                  <p className="text-red-600 mt-2">{passwordError}</p>
                </div>
                <div>
                  <label>New Password</label>
                  <br />
                  <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                    <PiKeyLight className="text-xl rotate-180 ml-2" />
                    <input
                      type="text"
                      name="newPassword"
                      placeholder="New PassWord"
                      className="bg-black w-full p-2 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label>Re-type New Password</label>
                  <br />
                  <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                    <PiKeyLight className="text-xl rotate-180 ml-2" />
                    <input
                      type="text"
                      name="confirmNewPassword"
                      placeholder="Re-type New Password"
                      className="bg-black w-full p-2 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setOpenModal(!openModal)}
                    className="bg-red-600 px-6 py-2 rounded-md font-semibold"
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Save Changes"
                    className="bg-[#835C00] px-8 py-2 rounded-md"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
