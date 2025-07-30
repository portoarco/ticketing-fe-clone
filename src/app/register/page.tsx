"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiCall } from "@/helper/apiCall";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GetCountries, GetPhonecodes } from "react-country-state-city";
import { Country, Phonecodes } from "react-country-state-city/dist/esm/types";
import { toast } from "react-toastify";

function RegisterPage() {
  // Country Selector
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [pickCountry, setPickCountry] = useState<Country | null>(null);
  // Phonecodes Seletor
  const [phoneCodeList, setPhoneCodeList] = useState<Phonecodes[]>([]);
  const [phoneCode, setPhoneCode] = useState<Phonecodes | null>(null);
  // Calendar Selector
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  // Show Password Selector
  const [showPassword, setShowPassword] = useState(false);
  // Router
  const route = useRouter();

  // Route protection
  useEffect(() => {
    if (localStorage.getItem("token")) {
      route.replace("/dashboard");
    }
  }, []);

  // Get Data (Ref)
  const inFirstNameRef = useRef<HTMLInputElement>(null);
  const inLastNameRef = useRef<HTMLInputElement>(null);
  const inEmailRef = useRef<HTMLInputElement>(null);
  const inPasswordRef = useRef<HTMLInputElement>(null);
  const inReffCodeRef = useRef<HTMLInputElement>(null);
  const inPhoneNumberRef = useRef<HTMLInputElement>(null);

  // Register Button
  const onBtnRegister = async () => {
    try {
      const first_name = inFirstNameRef.current?.value.toUpperCase();
      const last_name = inLastNameRef.current?.value.toUpperCase();
      const email = inEmailRef.current?.value;
      const password = inPasswordRef.current?.value;
      const referrer_code = inReffCodeRef.current?.value;
      const birthdate = date?.toISOString();
      const country = pickCountry?.name;

      const phone_number =
        "+" +
        (phoneCode?.phone_code ?? "") +
        (inPhoneNumberRef.current?.value ?? "");

      // validation
      if (
        !first_name ||
        !last_name ||
        !email ||
        !password ||
        !birthdate ||
        !phone_number ||
        !country
      ) {
        toast.warn("Isi semua data!", {
          autoClose: 3000,
        });
        return;
      }

      const response = await apiCall.post("/auth/register", {
        first_name,
        last_name,
        email,
        password,
        referrer_code,
        phone_number,
        country,
        birthdate,
      });

      console.log(response.data.result);

      // alert("Data Berhasil Disimpan");
      toast.success("Data Berhasil Disimpan", { autoClose: 1000 });
      route.replace("/login");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Country
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  // Phonecodes
  useEffect(() => {
    GetPhonecodes().then((result) => {
      const uniquePhonecodes = result.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.phone_code === item.phone_code)
      );
      setPhoneCodeList(uniquePhonecodes);
    });
  }, []);

  useEffect(() => {
    if (pickCountry && phoneCodeList.length > 0) {
      const matchedPhoneCode = phoneCodeList.find(
        (phonecode) => phonecode.id === pickCountry.id
      );
      setPhoneCode(matchedPhoneCode ?? null);
    }
  }, [pickCountry, phoneCodeList]);

  return (
    <section
      id="register-page"
      className="flex justify-center min-h-screen items-center "
    >
      <div className="w-[96vw] lg:h-[96vh] max-sm:my-5 lg:flex shadow-2xl rounded-xl overflow-hidden  max-lg:p-5  ">
        <div className="relative lg:w-full lg:h-full w-full h-40 flex justify-center max-lg:rounded-xl overflow-hidden shadow-md">
          <div className="absolute inset-0 z-10 bg-black/35 " />
          <Image
            src="/registerlogin2.jpg"
            fill
            className="object-cover"
            alt="register-login"
          />

          {/* Logo and branding */}
          <div className="absolute z-20 flex flex-col items-center h-[100%] justify-center lg:p-8 text-center p-2">
            <div className="lg:mb-6 lg:p-6">
              <Image
                src="/logo.svg"
                width={80}
                height={80}
                className="w-full max-sm:w-50"
                alt="logo"
              />
            </div>

            <p className="mt-3 text-sm  lg:max-w-md lg:text-lg text-white/90">
              Join thousands of users who trust us with their event ticketing
              needs
            </p>
          </div>
        </div>
        {/* Register Form */}
        <div
          id="register-form"
          className="lg:w-full lg:flex lg:items-center lg:justify-center xl:max-w-2xl lg:max-w-sm lg:bg-white  "
        >
          <form action="" className=" lg:p-5">
            <div
              id="card-header"
              className="text-center max-md:text-start my-2 "
            >
              <p className="text-2xl lg:text-3xl font-bold">
                Create an Account
              </p>
              <p className="text-gray-400 max-sm:text-sm lg:mt-2">
                Register now and start your journey!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="py-2">
                <label className="lg:text-lg">First Name</label>
                <Input
                  placeholder="First name"
                  className="bg-white shadow-md shadow-blue-200"
                  required
                  ref={inFirstNameRef}
                ></Input>
              </div>
              <div className="py-2">
                <label className="lg:text-lg">Last Name</label>
                <Input
                  placeholder="Last name"
                  className="bg-white shadow-md shadow-blue-200"
                  required
                  ref={inLastNameRef}
                ></Input>
              </div>
            </div>
            <div className="py-2">
              <label className="lg:text-lg">Email</label>
              <Input
                placeholder="Your Email"
                required
                type="email"
                className="bg-white shadow-md shadow-blue-200"
                ref={inEmailRef}
              ></Input>
            </div>
            <div className="py-2 relative">
              <label className="lg:text-lg">Password</label>
              <Input
                placeholder="Your Password"
                required
                type={showPassword ? "text" : "password"}
                className="bg-white shadow-md shadow-blue-200"
                ref={inPasswordRef}
              ></Input>
              <button
                className="absolute top-10 right-2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-blue-400"></EyeOff>
                ) : (
                  <Eye className="text-blue-400"></Eye>
                )}
              </button>
            </div>

            <div className="py-2">
              <label className="lg:text-lg">Referral Code</label>
              <Input
                placeholder="Referral Code (Optional)"
                type="text"
                className="bg-white shadow-md shadow-blue-200"
                ref={inReffCodeRef}
              ></Input>
            </div>

            <div id="birthdate" className="flex flex-col">
              <label className="lg:text-lg  ">Date of Birth</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="border-2 border-blue-200">
                  <Button
                    variant={"outline"}
                    id="date"
                    className="w-48 justify-between font-normal text-gray-500 bg-white"
                  >
                    {date ? date.toLocaleDateString() : "Select Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-x-5 max-xl:flex-col">
              <div id="country" className="py-2">
                <label className="lg:text-lg">Country</label>
                <Select
                  required
                  onValueChange={(value) => {
                    const selectedCountry = countriesList.find(
                      (c) => c.id.toString() === value
                    );
                    setPickCountry(selectedCountry ?? null);
                  }}
                >
                  <SelectTrigger className="bg-white shadow-md shadow-blue-200">
                    <SelectValue placeholder="Select Your Country"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countriesList.map((value) => (
                      <SelectItem
                        key={`${value.id}-${value.name}`}
                        value={value.id.toString()}
                      >
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div id="phonecode" className="py-2">
                <label className="lg:text-lg">Phone Number</label>
                <div className="flex gap-x-2">
                  <div id="phonecodelist">
                    <Select
                      required
                      value={phoneCode?.phone_code ?? ""}
                      onValueChange={(value) => {
                        const selectedPhone = phoneCodeList.find(
                          (c) => c.phone_code === value
                        );
                        setPhoneCode(selectedPhone ?? null);
                      }}
                    >
                      <SelectTrigger className="bg-white shadow-md shadow-blue-200">
                        <SelectValue placeholder="+"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {phoneCodeList.map((value) => (
                          <SelectItem
                            key={`${value.id}-${value.phone_code}`}
                            value={value.phone_code}
                          >
                            +{value.phone_code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    type="tel"
                    required
                    placeholder="Select Country First"
                    className="bg-white shadow-md shadow-blue-200"
                    ref={inPhoneNumberRef}
                  ></Input>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button
                type="button"
                className="lg:text-xl w-full p-5 cursor-pointer hover:bg-orange-600 bg-orange-500  shadow-xl"
                onClick={onBtnRegister}
              >
                Create Account
              </Button>
            </div>

            {/* Already Account */}
            <p className="lg:text-lg mt-5 text-center max-sm:text-sm">
              Already have an account?
              <span className="text-blue-600 hover:text-blue-700">
                {" "}
                <Link href={"/login"}>Sign In</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      {/* End of Register Form */}
    </section>
  );
}

export default RegisterPage;
