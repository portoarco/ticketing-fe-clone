"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface CheckPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CheckPayment({ open, onOpenChange }: CheckPaymentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-w-fit p-6">
        <DialogHeader>
          <DialogTitle>Review Payment</DialogTitle>
          <DialogDescription>
            Review Customer Payment and Send Email Notifications
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-100 mb-4">
          <Image
            src="/paymentproof.png"
            alt="payment-proof"
            fill
            className="object-contain"
          ></Image>
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
