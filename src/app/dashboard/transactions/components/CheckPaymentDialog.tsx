"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    const res = await apiCall.patch(`/auth`);
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

        <div className="relative w-[400px] h-[300px] mb-4">
          {proofUrl ? (
            <Image
              src={proofUrl}
              alt="payment-proof"
              fill
              className="object-contain"
            />
          ) : (
            <p className="text-gray-500 text-sm">No payment proof uploaded</p>
          )}
        </div>
        <div id="sendnotif" className="flex gap-x-5">
          <Button className="bg-green-700 hover:bg-green-600 cursor-pointer">
            Confirm Payment
          </Button>
          <Button variant={"destructive"} className="cursor-pointer">
            Rejected
          </Button>
          <Button className="cursor-pointer">Reset Data</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CheckPayment;
