"use client";
import { Input } from "@/components/ui/input";
import Dashboard from "../components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";

function ProfileSettings() {
  const inFirstNameRef = useRef<HTMLInputElement>(null);
  const inLastNameRef = useRef<HTMLInputElement>(null);
  const inEmailRef = useRef<HTMLInputElement>(null);
  const inPasswordRef = useRef<HTMLInputElement>(null);
  const inPhoneNumberRef = useRef<HTMLInputElement>(null);
  const inOrganizerNameRef = useRef<HTMLInputElement>(null);

  const onBtnUpdate = async () => {
    try {
      const res = await apiCall.patch("/");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    first_name,
    last_name,
    email,
    organizer_name,
    phone_number,
    referral_code,
    setUserProfile,
  } = useUserStore();

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    avatar: "",
    organizer_name: "",
    referral_code: "",
  });

  useEffect(() => {
    const userData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await apiCall.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.result;
        const organizer_name = res.data.result.organizer[0].organizer_name;
        console.log(data);

        setUserProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          referral_code: data.refferal_code,
          organizer_name,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (!first_name && !last_name && !email) {
      userData();
    }
  }, []);

  return (
    <section>
      <Dashboard>
        <form className="flex flex-col gap-y-2 lg:w-[70%]">
          <div>
            <label>First Name</label>
            <Input
              className="bg-white"
              defaultValue={first_name}
              ref={inFirstNameRef}
            ></Input>
          </div>
          <div>
            <label>Last Name</label>
            <Input
              className="bg-white"
              defaultValue={last_name}
              ref={inLastNameRef}
            ></Input>
          </div>
          <div>
            <label>Organizer Name</label>
            <Input
              className="bg-white"
              defaultValue={organizer_name}
              ref={inOrganizerNameRef}
            ></Input>
          </div>
          <div>
            <label>Email</label>
            <Input
              className="bg-white"
              defaultValue={email}
              ref={inEmailRef}
            ></Input>
          </div>
          <div>
            <label>Change Password</label>
            <Input
              type="password"
              className="bg-white"
              ref={inPasswordRef}
            ></Input>
          </div>
          <div>
            <label>Phone Number</label>
            <Input
              className="bg-white"
              defaultValue={phone_number}
              ref={inPhoneNumberRef}
            ></Input>
          </div>
          <div>
            <label>Change Avatar</label>
            <Input
              type="file"
              className="bg-white lg:w-[40%]"
              defaultValue={profile.avatar}
            ></Input>
          </div>
          <div>
            <label>Refferal Code</label>
            <Input
              className="bg-white"
              defaultValue={referral_code}
              disabled
            ></Input>
          </div>
          <div className="flex mt-10 gap-x-5">
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer hover:scale-105  transition-all duration-300 ease-in-out"
              onClick={onBtnUpdate}
            >
              Update Data
            </Button>
          </div>
        </form>
      </Dashboard>
    </section>
  );
}
export default ProfileSettings;
