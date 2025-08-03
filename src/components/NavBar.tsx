"use client";
import { Menu, PlusCircle, Search, ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helper/apiCall";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { email } from "zod";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "@/helper/updateProfile";

export default function Navbar() {
  // global state
  const initialize = useAuthStore((state) => state.initialize);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // get profile data from global state
  const {
    first_name,
    last_name,
    email,
    phone_number,
    avatar,
    isVerified,
    setUserProfile,
  } = useUserStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await apiCall.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.result;

        setUserProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          avatar: data.avatar,
          isVerified: data.isVerified,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (!email && !phone_number && !isVerified) {
      getUserData();
    }
  }, []);

  // state dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  // useRef
  const inOrganizerRef = useRef<HTMLInputElement>(null);

  // console.log(token);

  const route = useRouter();

  // register schema zod
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  });

  // update profile
  const onUpdateSubmit = async (formData: UpdateProfileSchema) => {
    setOpenEditProfile(true);
    try {
      // console.log("Data berhasil submit");

      const avatarInput = watch("avatar") as FileList;
      const avatarFile =
        avatarInput && avatarInput.length > 0 ? avatarInput[0] : null;

      const formDataToSend = new FormData();

      if (formData.first_name)
        formDataToSend.append("first_name", formData.first_name);
      if (formData.last_name)
        formDataToSend.append("last_name", formData.last_name);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.password)
        formDataToSend.append("password", formData.password);
      if (formData.phone_number)
        formDataToSend.append("phone_number", formData.phone_number);
      if (formData.organizer_name)
        formDataToSend.append("organizer_name", formData.organizer_name);

      if (avatarFile) formDataToSend.append("avatar", avatarFile);

      const res = await apiCall.patch("/user/profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Update Data Success!", {
        position: "top-center",
        autoClose: 1000,
      });

      setUserProfile({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
        phone_number: res.data.phone_number,
        avatar: res.data.avatar,
      });
      console.log(res.data);

      setOpenEditProfile(false);
      reset();
    } catch (error) {
      console.log(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  //useEffect when edit profile click
  useEffect(() => {
    if (openEditProfile) {
      reset({
        first_name,
        last_name,
        email,
        phone_number,
      });
    }
  }, [
    openEditProfile,
    first_name,
    last_name,
    email,
    phone_number,
    avatar,
    reset,
  ]);

  const handlerCreateEvent = async () => {
    try {
      // cek token
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You have to login first", {
          position: "top-center",
          autoClose: 2000,
        });
        route.replace("/login");
        return;
      }

      // check database in db
      const res = await apiCall.post(
        "/auth/check-organizer",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);

      if (res.data) {
        route.replace("/dashboard/eventspage");
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ status: number; isVerified: boolean }>;
      console.log(err);

      console.log(isVerified);
      if (isVerified === false) {
        toast.error("You have to verify your account, check email!", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }

      const status = err.response?.status;
      if (status === 404) {
        // route.replace("/dashboard/eventspage");
        setOpenDialog(true);
      }

      if (!err) {
        alert("There is something wrong!");
      }
    }
  };

  const createOrganizer = async () => {
    try {
      // check dialog input
      const organizer_name = inOrganizerRef.current?.value;
      if (!organizer_name) {
        alert("You have to input your organizer name!");
        return;
      }

      // if ok, save data organizer name
      const res = await apiCall.patch(
        "/auth/register-organizer",
        { organizer_name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenDialog(false);

      route.replace("/dashboard/eventspage");
    } catch (error) {
      console.log(error);
    }
  };

  const handlerLogout = () => {
    logout();
    route.replace("/");
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <nav className=" flex justify-center ">
      <div className="flex justify-between items-center mt-4 gap-10 w-[84%] max-w-7xl bg-white/60  h-16 rounded-full  drop-shadow-md  drop-shadow-black/7 px-5 fixed z-50 backdrop-blur-lg">
        <a
          href="#"
          className="font-display font-bold text-2xl tracking-wider flex-shrink-0"
        >
          <span className="text-prussian-blue ">Logoip</span>
          <span className="text-selective-orange">sum</span>
        </a>

        <div className="relative max-w-md hidden sm:block flex-grow transition-all">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
          <Input
            type="search"
            placeholder="Search for events..."
            className="
                pl-12 
                h-10 
                pr-4 
                rounded-full 
                bg-white/50 
                border-transparent 
                focus-visible:ring-2 
                focus-visible:!ring-blue-green/80 
                focus-visible:ring-offset-0  
                text-prussian-blue 
                placeholder:text-prussian-blue/50
                font-poppins
                placeholder:font-poppins
                placeholder:text-[16px]
                text-[16px]
                placeholder:font-[400]
                shadow-md shadow-black/5"
          />
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger>
              <div className=" max-w-md block sm:hidden  transition-all bg-white/10 backdrop-blur-lg rounded-full p-2 group shadow-md shadow-black/5 hover:bg-neutral-500">
                <Search className="text-muted-foreground h-5 w-5 group-hover:text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-4xl bg-white/60 w-fit shadow-md shadow-black/5 backdrop-blur-lg flex gap-2 flex-col sm:hidden mx-5 border-0 ">
              <div className="relative max-w-md block sm:hidden flex-grow transition-all">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
                <Input
                  type="search"
                  placeholder="Search for events..."
                  className="
                pl-12 
                h-10 
                pr-4 
                rounded-full 
                bg-white/50 
                border-transparent 
                focus-visible:ring-2 
                focus-visible:!ring-blue-green/80 
                focus-visible:ring-offset-0  
                text-prussian-blue 
                placeholder:text-prussian-blue/50
                font-poppins
                placeholder:font-poppins
                placeholder:text-[16px]
                text-[16px]
                placeholder:font-[400]"
                />
              </div>
              <PopoverArrow className="" />
            </PopoverContent>
          </Popover>

          {/* Drop Down */}
          <Popover>
            <PopoverTrigger className="bg-blue-green font-poppins text-white  font-semibold rounded-full flex-grow min-w-17 py-[10px] max-w-30 group relative flex justify-center items-center lg:hidden hover:bg-blue-green overflow-hidden cursor-pointer">
              <Menu className="h-4 w-4 " />
              {/* <span className="">Menu</span> */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors  mix-blend-overlay "></div>
            </PopoverTrigger>
            <PopoverContent className="rounded-4xl bg-white/60 w-fit backdrop-blur-lg flex gap-2 flex-col shadow-md shadow-black/5 lg:hidden mx-5 border-0">
              <Button
                className="bg-blue-green font-poppins font-semibold rounded-full w-37 group relative hover:bg-blue-green overflow-hidden cursor-pointer"
                onClick={handlerCreateEvent}
              >
                <PlusCircle className="h-5 w-5 z-10" />
                <span className="z-10">Create Event</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
              </Button>
              {/* Start */}
              {token ? (
                <div>
                  <Button
                    className="w-full font-poppins rounded-full cursor-pointer bg-red-500 hover:bg-red-400"
                    onClick={() => route.push("/login")}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant={"ghost"}
                    className="font-poppins rounded-full cursor-pointer"
                    onClick={() => route.push("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-ut-orange font-poppins rounded-full  group relative hover:bg-ut-orange overflow-hidden cursor-pointer"
                    onClick={() => route.push("/register")}
                  >
                    <span className="z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
                  </Button>
                </div>
              )}

              {/* End */}

              <PopoverArrow />
            </PopoverContent>
          </Popover>
        </div>

        {/* Normal */}

        <div className="hidden lg:block transition-all  ">
          <div className="flex gap-3 items-center ">
            <Button
              asChild
              className="bg-blue-green font-poppins font-semibold rounded-full w-37 group relative hover:bg-blue-green overflow-hidden cursor-pointer"
              onClick={handlerCreateEvent}
            >
              <div>
                <PlusCircle className="h-5 w-5 z-10" />
                <span className="z-10">Create Event</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
              </div>
            </Button>
            {token ? (
              <div className="flex gap-x-5 items-center">
                <div>
                  <Button
                    className="font-poppins rounded-full cursor-pointer bg-red-500 hover:bg-red-400"
                    onClick={handlerLogout}
                  >
                    Sign Out
                  </Button>
                </div>

                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => setOpenEditProfile(true)}
                    className="cursor-pointer shadow-xl rounded-full "
                  >
                    <Avatar>
                      <AvatarImage
                        src={avatar || "/default-avatar.png"}
                      ></AvatarImage>
                      <AvatarFallback>ID</AvatarFallback>
                    </Avatar>
                  </button>

                  {isVerified ? (
                    <div className="flex">
                      <HoverCard>
                        <HoverCardTrigger>
                          <button className="">
                            <ShieldCheck className="text-white size-6 shadow-md bg-blue-600 rounded-full p-1"></ShieldCheck>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>This account has been verified</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <HoverCard>
                        <HoverCardTrigger>
                          <button>
                            <ShieldX className="text-white size-6 shadow-md bg-orange-400 p-1 rounded-full "></ShieldX>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>Not Verified Yet</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Button
                  variant={"ghost"}
                  className="font-poppins rounded-full cursor-pointer"
                  onClick={() => route.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-ut-orange font-poppins rounded-full  group relative hover:bg-ut-orange overflow-hidden cursor-pointer"
                  onClick={() => route.push("/register")}
                >
                  <span className="z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Create Event Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Organizer Name</DialogTitle>
              <DialogDescription>Input Your Organizer Name</DialogDescription>
            </DialogHeader>
            {/* form */}
            <label>Organizer Name:</label>
            <Input type="text" ref={inOrganizerRef}></Input>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                onClick={createOrganizer}
              >
                Save Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      ;{/* Edit Profile Dialog */}
      <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogDescription>Edit Your Latest Profile</DialogDescription>
          </DialogHeader>
          {/* form */}
          <form onSubmit={handleSubmit(onUpdateSubmit)}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Input
                type="text"
                className="bg-white"
                id="first_name"
                {...register("first_name")}
                defaultValue={first_name}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <Input
                type="text"
                className="bg-white"
                id="last_name"
                {...register("last_name")}
                defaultValue={last_name}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="bg-white"
                id="email"
                {...register("email")}
                defaultValue={email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>Phone Number</label>
              <Input
                type="text"
                className="bg-white"
                id="phone_number"
                {...register("phone_number")}
                defaultValue={phone_number}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="avatar">Change Avatar</label>
              <Input
                type="file"
                className="bg-white"
                id="avatar"
                {...register("avatar")}
                // defaultValue={avatar}
              />
              {errors.avatar?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.avatar.message)}
                </p>
              )}
            </div>

            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-600 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving Data" : "Save Data"}
              </Button>
            </DialogFooter>
          </form>
          <Button
            className="absolute bottom-6 left-7"
            onClick={() => route.replace("/forget-password")}
          >
            Reset Password
          </Button>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
