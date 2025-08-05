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
import { apiCall } from "@/helper/apiCall";
import { Download, Mail, PhoneCall, Ticket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TransactionDetails {
  id: string;
  proof: string;
  quantity: number;
  amount: number;
  isConfirmed: boolean;
  paid_at: Date;
  transaction_status: string;
  detail_event: {
    name: string;
    start_date: string;
    end_date: string | null;
    location_Event: {
      city: string;
      address: string;
    };
    category_event: {
      name: string;
    };
  };
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    avatar: string;
  };
}

interface ViewDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionDetails | null;
}

// Helper untuk format tanggal
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-"; // Kalau null atau undefined
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function ViewDetails({ open, onOpenChange, transaction }: ViewDetailsProps) {
  const [paymentDetail, setPaymentDetail] = useState<TransactionDetails | null>(
    null
  );

  const getPaymentDetails = () => {
    // console.log(transaction);
    setPaymentDetail(transaction);
    console.log(paymentDetail);

    if (!transaction) {
      console.log("No Transaction");
      return;
    }
  };

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
      <DialogContent className="w-full max-w-fit p-6 bg-white">
        <DialogHeader>
          <div className="flex gap-x-2 items-center">
            <Ticket className="text-blue-600 size-7"></Ticket>
            <DialogTitle>Payment Details</DialogTitle>
          </div>
          <DialogDescription>
            Transaction ID : {transaction?.id.slice(0, 5).toUpperCase()}
          </DialogDescription>
        </DialogHeader>
        {/* Profile */}
        <div
          id="user-profile"
          className="flex items-center gap-x-5  bg-gray-100 rounded-lg p-2"
        >
          <div id="avatar">
            <Avatar className="size-11 border-3 border-blue-200">
              <AvatarImage src={transaction?.user.avatar}></AvatarImage>
              <AvatarFallback>ID</AvatarFallback>
            </Avatar>
          </div>
          <div id="user-details">
            <p className="font-bold">
              {transaction?.user.first_name} {transaction?.user.last_name}
            </p>
            <p>{transaction?.user.email}</p>
            <p>{transaction?.user.phone_number}</p>
          </div>
        </div>
        {/* Event Details */}
        <div id="event-details">
          <div id="name">
            <p className="text-md text-gray-500 font-semibold">Event</p>
            <p className="font-semibold">{transaction?.detail_event.name}</p>
          </div>
          <div id="date-time" className="flex gap-x-10 mt-3">
            <div>
              <p className="text-md text-gray-500 font-semibold">Date</p>
              <p>{formatDate(transaction?.detail_event.start_date || null)}</p>
            </div>
            <div>
              <p className="text-md text-gray-500 font-semibold">Time</p>
              <p>23.59</p>
            </div>
          </div>
          <div id="venue" className="mt-3">
            <p className="text-md text-gray-500 font-semibold">Venue</p>
            <p>{transaction?.detail_event.location_Event.city}</p>
            <p className="text-sm mt-1">
              {transaction?.detail_event.location_Event.address}
            </p>
          </div>
        </div>

        <div className=" w-full border-1 border-gray-300"></div>

        {/* Payment Summary */}
        <div id="payment-summary">
          <div id="purchase-date" className="flex justify-between">
            <p className="text-sm text-gray-500">Purchase Date</p>
            <p className="text-sm font-semibold">
              {formatDate(
                transaction?.paid_at ? transaction.paid_at.toString() : null
              )}
            </p>
          </div>
          <div id="quantity" className="flex justify-between mt-3">
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-sm font-semibold">
              {transaction?.quantity} Ticket(s)
            </p>
          </div>
          <div id="status" className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-500">Status</p>
            <Badge
              className={getStatusColor(transaction?.transaction_status || "")}
            >
              {transaction?.transaction_status}
            </Badge>
          </div>
        </div>
        {/* Total Amount */}
        <div className=" w-full border-1 border-gray-300"></div>

        <div id="total-amount" className="flex justify-between items-center">
          <p className="font-semibold">Total Amount</p>
          <p
            className={`text-xl font-bold bg-transparent p-2 rounded-lg ${getStatusColor(
              transaction?.transaction_status || ""
            )}`}
          >
            IDR {transaction?.amount}
          </p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDetails;
