"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CheckPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionDetails | null;
}

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
  };
  user: {
    first_name: string;
    last_name: string;
  };
}

function CheckPayment({ open, onOpenChange, transaction }: CheckPaymentProps) {
  // proof url
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  // handler confirm payment
  const handlerConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await apiCall.patch(
        `/transaction/confirm/${transaction?.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Confirmation Success");
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed Confirmation");
    }
  };
  const rejectConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await apiCall.patch(
        `/transaction/reject/${transaction?.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rejected Success");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed Confirmation");
    }
  };
  const revertConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await apiCall.patch(
        `/transaction/revert/${transaction?.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Revert Success");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed Confirmation");
    }
  };

  useEffect(() => {
    if (transaction?.proof) {
      setProofUrl(transaction.proof);
    }
  }, [transaction]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-w-fit p-6">
        <DialogHeader>
          <DialogTitle>Review Payment</DialogTitle>
          <DialogDescription>
            Review Customer Payment and Send Email Notifications
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-[400px] h-[450px] mb-4">
          {proofUrl ? (
            <Image
              src={proofUrl}
              alt="payment-proof"
              fill
              className="object-contain"
            />
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No payment proof uploaded
            </p>
          )}
        </div>

        <DialogFooter>
          <div id="sendnotif" className="flex gap-x-5">
            <DialogClose asChild>
              <Button
                className="bg-green-700 hover:bg-green-600 cursor-pointer"
                onClick={handlerConfirm}
              >
                Confirm Payment
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"destructive"}
                className="cursor-pointer"
                onClick={rejectConfirm}
              >
                Rejected
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="cursor-pointer" onClick={revertConfirm}>
                Revert Pending
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CheckPayment;
