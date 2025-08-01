"use client";
import { Input } from "@/components/ui/input";
import Dashboard from "../components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";

function ProfileSettings() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    organizer_name: "",
    email: "",
    phone_number: "",
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

        setProfile({
          first_name: data.first_name,
          last_name: data.last_name || "",
          organizer_name: data.organizer?.organizer_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);

  return (
    <section>
      <Dashboard>
        <p>This is fuck{profile.first_name}</p>
        <form>
          <div>
            <label>First Name</label>
            <Input
              className="bg-white"
              value={profile.first_name}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
            ></Input>
          </div>
          <div>
            <label>Last Name</label>
            <Input className="bg-white"></Input>
          </div>
          <div>
            <label>Organizer Name</label>
            <Input className="bg-white"></Input>
          </div>
          <div>
            <label>Email</label>
            <Input className="bg-white"></Input>
          </div>
          <div>
            <label>Phone Number</label>
            <Input className="bg-white"></Input>
          </div>
          <Button className="mt-10">Update Data</Button>
        </form>
      </Dashboard>
    </section>
  );
}
export default ProfileSettings;
