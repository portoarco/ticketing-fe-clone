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
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCountries, GetPhonecodes } from "react-country-state-city";
import { Country, Phonecodes } from "react-country-state-city/dist/esm/types";

function RegisterPage() {
  // Country Selector
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  // Phonecodes Seletor
  const [phoneCodeList, setPhoneCodeList] = useState<Phonecodes[]>([]);
  const [phoneCode, setPhoneCode] = useState<Phonecodes | null>(null);
  // Calendar Selector
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  // Show Password Selector
  const [showPassword, setShowPassword] = useState(false);

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
    if (country && phoneCodeList.length > 0) {
      const matchedPhoneCode = phoneCodeList.find(
        (phonecode) => phonecode.id === country.id
      );
      setPhoneCode(matchedPhoneCode ?? null);
    }
  }, [country, phoneCodeList]);

  return (
    <section
      id="register-page"
      className="flex justify-center min-h-screen items-center "
    >
      <div className="w-[96vw] lg:h-[96vh] max-sm:my-5 lg:flex shadow-2xl rounded-xl overflow-hidden  max-lg:p-3  ">
        <div className="relative lg:w-full lg:h-full w-full h-40 flex justify-center max-lg:rounded-xl overflow-hidden shadow-md">
          <div className="absolute inset-0 z-10 bg-black/35 " />
          <Image
            src="/registerlogin2.jpg"
            fill
            className="object-cover"
            alt="register-login"
          />

          {/* Logo and branding */}
          <div className="absolute z-20 flex flex-col items-center h-[100%] justify-center lg:p-8 text-center">
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
          className="lg:w-full lg:flex lg:items-center lg:justify-center xl:max-w-2xl lg:max-w-sm  bg-white "
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
            <div className="py-2">
              <label className="lg:text-lg">Fullname</label>
              <Input
                placeholder="Your name"
                className="border-2 border-blue-200"
                required
              ></Input>
            </div>
            <div className="py-2">
              <label className="lg:text-lg">Email</label>
              <Input
                placeholder="Your Email"
                required
                type="email"
                className="border-2 border-blue-200"
              ></Input>
            </div>
            <div className="py-2 relative">
              <label className="lg:text-lg">Password</label>
              <Input
                placeholder="Your Password"
                required
                type={showPassword ? "text" : "password"}
                className="border-2 border-blue-200"
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
                required
                type="text"
                className="border-2 border-blue-200"
              ></Input>
            </div>

            <div id="birthdate" className="flex flex-col">
              <label className="lg:text-lg">Date of Birth</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="border-2 border-blue-200">
                  <Button
                    variant={"outline"}
                    id="date"
                    className="w-48 justify-between font-normal text-gray-500"
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
                    setCountry(selectedCountry ?? null);
                  }}
                >
                  <SelectTrigger className="border-2 border-blue-200">
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
                      <SelectTrigger className="border-2 border-blue-200">
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
                    className="border-2 border-blue-200"
                  ></Input>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button
                type="button"
                className="lg:text-xl w-full p-5 cursor-pointer hover:bg-orange-600 bg-orange-500  shadow-xl"
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
