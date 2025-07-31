"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

function ForgetPassword() {
  // input email ref
  const inEmailRef = useRef<HTMLInputElement>(null);
  const route = useRouter();

  const onForgetPassword = async () => {
    const email = inEmailRef.current?.value;
    try {
      if (!email) {
        toast.warn("Input tidak boleh kosong!", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }

      await apiCall.post("/auth/forget-password", {
        email,
      });

      toast.success("Check Your Email Inbox", {
        position: "top-center",
        autoClose: 1000,
      });

      route.replace("/login");

      // console.log(res.data);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;

      const status = err.response?.data.message;
      toast.error(status, {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <section className=" min-h-screen">
      <div
        id="verify-page"
        className=" flex justify-center items-center min-h-screen p-4  "
      >
        <Card className="max-lg:w-full w-1/4 flex text-center shadow-md ">
          <CardHeader>
            <Image
              src="/forgetpass.jpg"
              width={1000}
              height={1000}
              className="w-full"
              alt="verifimage"
            ></Image>
            <CardTitle className="text-2xl font-bold">
              Forget Password
            </CardTitle>
            <CardDescription>
              Please input your registered email to reset password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Input Registered Email"
              className="mb-3"
              type="email"
              ref={inEmailRef}
            ></Input>

            <Button
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-md cursor-pointer"
              onClick={onForgetPassword}
            >
              Reset Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ForgetPassword;
