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
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

function ResetPassword() {
  // show and hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // input email ref
  const params = useParams();
  const inPasswordRef = useRef<HTMLInputElement>(null);
  const inConfirmPasswordRef = useRef<HTMLInputElement>(null);
  const route = useRouter();

  const onResetPassword = async () => {
    const password = inPasswordRef.current?.value;
    const confirmPassword = inConfirmPasswordRef.current?.value;
    try {
      if (!password || !confirmPassword) {
        toast.warn("Input tidak boleh kosong!", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password dan Konfirmasi Password Berbeda", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }

      const res = await apiCall.patch(
        "/auth/reset-password",
        {
          password: inPasswordRef.current?.value,
        },
        { headers: { Authorization: `Bearer ${params.token}` } }
      );
      console.log(res.data.message);

      toast.success("Reset Password Success!", {
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
              src="/reset-password.jpg"
              width={1000}
              height={1000}
              className="w-[80%] mx-auto"
              alt="verifimage"
            ></Image>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Please input your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="newpass" className="relative text-gray-500">
              <Input
                placeholder="Input New Password"
                className="mb-3"
                type={showPassword ? "text" : "password"}
                ref={inPasswordRef}
              ></Input>

              <button
                className="absolute top-1 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </button>
            </div>
            <div id="confirmpass" className="relative text-gray-500">
              <Input
                placeholder="Input Confirmation Password"
                className="mb-3"
                type={showConfirmPassword ? "text" : "password"}
                ref={inConfirmPasswordRef}
              ></Input>
              <button
                className="absolute top-1 right-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </button>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-md cursor-pointer"
              onClick={onResetPassword}
            >
              Reset Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ResetPassword;
