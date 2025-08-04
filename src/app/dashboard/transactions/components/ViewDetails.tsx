import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Mail, PhoneCall, Ticket } from "lucide-react";
import Image from "next/image";

interface ViewDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ViewDetails({ open, onOpenChange }: ViewDetailsProps) {
  // Badge color payment
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-w-fit p-6 bg-white">
        <DialogHeader>
          <div className="flex gap-x-2 items-center">
            <Ticket className="text-blue-600 size-7"></Ticket>
            <DialogTitle>Payment Details</DialogTitle>
          </div>
          <DialogDescription>Transaction TIX-505050</DialogDescription>
        </DialogHeader>
        {/* Profile */}
        <div
          id="user-profile"
          className="flex items-center gap-x-5  bg-gray-100 rounded-lg p-2"
        >
          <div id="avatar">
            <Avatar className="size-11 border-3 border-blue-200">
              <AvatarImage></AvatarImage>
              <AvatarFallback>ID</AvatarFallback>
            </Avatar>
          </div>
          <div id="user-details">
            <p className="font-bold">Ahmad Ramdani</p>
            <p>ahmadramdani@mail.com</p>
            <p>+6287788787</p>
          </div>
        </div>
        {/* Event Details */}
        <div id="event-details">
          <div id="name">
            <p className="text-md text-gray-500 font-semibold">Event</p>
            <p className="font-semibold">
              Jakartanensis - Pandji Manusia Udang
            </p>
          </div>
          <div id="date-time" className="flex gap-x-10 mt-3">
            <div>
              <p className="text-md text-gray-500 font-semibold">Date</p>
              <p>15 Januari 2025</p>
            </div>
            <div>
              <p className="text-md text-gray-500 font-semibold">Time</p>
              <p>23.59</p>
            </div>
          </div>
          <div id="venue" className="mt-3">
            <p className="text-md text-gray-500 font-semibold">Venue</p>
            <p>Gelora Bung Tomo Stadium - New York</p>
            <p className="text-sm mt-1">Jl.Polisi Istimewa No.5, USA</p>
          </div>
        </div>

        <div className=" w-full border-1 border-gray-300"></div>

        {/* Payment Summary */}
        <div id="payment-summary">
          <div id="purchase-date" className="flex justify-between">
            <p className="text-sm text-gray-500">Purchase Date</p>
            <p className="text-sm font-semibold">15 April 2025</p>
          </div>
          <div id="quantity" className="flex justify-between mt-3">
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-sm font-semibold">2 Ticket(s)</p>
          </div>
          <div id="status" className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-500">Status</p>
            <Badge className={getStatusColor("COMPLETED")}>Completed</Badge>
          </div>
        </div>
        {/* Total Amount */}
        <div className=" w-full border-1 border-gray-300"></div>

        <div id="total-amount" className="flex justify-between items-center">
          <p className="font-semibold">Total Amount</p>
          <p className="text-xl font-bold text-green-600">Rp 100.000</p>
        </div>

        <div id="sendnotif" className="flex gap-x-5">
          <div className="flex">
            <Button className="cursor-pointer bg-gray-600 hover:bg-gray-700 ">
              <Mail></Mail>
              Email
            </Button>
          </div>
          <Button className="cursor-pointer bg-gray-600 hover:bg-gray-700">
            <PhoneCall />
            Contact
          </Button>
          <Button className="cursor-pointer">
            <Download />
            Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetails;
