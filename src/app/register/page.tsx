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
import { ChevronDownIcon } from "lucide-react";
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
      className="flex justify-center min-h-screen items-center bg-blue-50"
    >
      <div className="w-[96vw] lg:h-[96vh] my-5 lg:flex shadow-2xl rounded-xl overflow-hidden bg-white">
        <div className="relative lg:w-1/2 lg:h-full w-full h-35 flex justify-center">
          <div className="absolute inset-0 z-10 bg-black/35 " />
          <Image
            src="/registerlogin2.jpg"
            fill
            className="object-cover"
            alt="register-login"
          />

          {/* Logo and branding */}
          <div className="absolute z-20 flex flex-col items-center h-[100%] justify-center lg:p-8 text-center shadow-xl">
            <div className="lg:mb-6 lg:p-6">
              <Image
                src="/logo.svg"
                width={80}
                height={80}
                className="w-full max-sm:w-50 "
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
        <div id="register-form" className="lg:w-1/2 p-2">
          <form action="">
            <div id="card-header" className="text-center my-5">
              <p className="text-2xl font-semibold">Create an Account</p>
              <p>Register now and start your journey!</p>
            </div>
            <div className="py-2">
              <label htmlFor="">Fullname</label>
              <Input placeholder="Your name" required></Input>
            </div>
            <div className="py-2">
              <label htmlFor="">Email</label>
              <Input placeholder="Your Email" required type="email"></Input>
            </div>
            <div className="py-2">
              <label htmlFor="">Password</label>
              <Input
                placeholder="Your Password"
                required
                type="password"
              ></Input>
            </div>
            <div className="py-2">
              <label htmlFor="">Confirm Password</label>
              <Input
                placeholder="Confirm Your Password"
                required
                type="password"
              ></Input>
            </div>

            <div id="country" className="py-2">
              <label htmlFor="">Country</label>
              <Select
                onValueChange={(value) => {
                  const selectedCountry = countriesList.find(
                    (c) => c.id.toString() === value
                  );
                  setCountry(selectedCountry ?? null);
                }}
              >
                <SelectTrigger>
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
              <label htmlFor="">Phone Number</label>
              <div className="flex gap-x-2">
                <div id="phonecodelist">
                  <Select
                    value={phoneCode?.phone_code ?? ""}
                    onValueChange={(value) => {
                      const selectedPhone = phoneCodeList.find(
                        (c) => c.phone_code === value
                      );
                      setPhoneCode(selectedPhone ?? null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="1"></SelectValue>
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
                <Input type="tel" required></Input>
              </div>
            </div>

            <div id="birthdate" className="flex flex-col">
              <label htmlFor="">Date of Birth</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    id="date"
                    className="w-48 justify-between font-normal"
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

            <div className="mt-5">
              <Button type="button" className="w-full p-5">
                Create Account
              </Button>
            </div>

            {/* Already Account */}
            <p className="mt-5 text-center">
              Already have an account?
              <span className="text-blue-600 hover:text-blue-700">{" "}<Link href={"/"}>Sign In</Link></span>
            </p>
          </form>
        </div>
        {/* End of Register Form */}
      </div>
    </section>
  );
}

export default RegisterPage;
