"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const params = useParams();
  const route = useRouter();
  const onVerifyBtn = async () => {
    try {
      await apiCall.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${params.token} `,
        },
      });
      toast.success("Verification Success", {
        position: "top-center",
        autoClose: 1000,
      });
      route.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="">
    //   <p>Click Button to verify account</p>
    //   <Button type="button" onClick={onVerifyBtn}>
    //     Verify Account
    //   </Button>
    // </div>
    <section className=" min-h-screen">
      <div
        id="verify-page"
        className=" flex justify-center items-center min-h-screen p-5  "
      >
        <Card className="max-lg:w-full w-1/4 flex text-center shadow-md ">
          <CardHeader>
            <Image
              src="/verification.jpg"
              width={1000}
              height={1000}
              className="w-full"
              alt="verifimage"
            ></Image>
            <CardTitle className="my-2 text-2xl font-bold">
              Please Verify Account
            </CardTitle>
            <CardDescription>
              You need to verify your account for accessing the whole features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-md cursor-pointer"
              onClick={onVerifyBtn}
            >
              Verify Me
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default VerifyPage;
