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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ISeatsProps {
  id: string;
  name: string;
  total_seat: number;
}

interface EditSeatsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seats: ISeatsProps | null;
}

function EditSeats({ open, onOpenChange, seats }: EditSeatsProps) {
  const [newQuantity, setNewQuantity] = useState<number>(0);

  // update seats data
  const updateSeats = async () => {
    if (!seats) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await apiCall.patch(
        `/events/seats/${seats.id}`, // pastikan backend route-nya sesuai
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      onOpenChange(false);
      setNewQuantity(res.data);
      toast.success("Update Seats Berhasil");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (seats) {
      setNewQuantity(seats.total_seat);
    }
  }, [seats]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white w-full max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit Seats</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloremque, voluptas!
          </DialogDescription>
        </DialogHeader>

        {/* Table */}
        <div className="">
          <Label htmlFor="edit-seats">Edit Total Seats</Label>
          <Input
            id="edit-seats"
            className="mt-5"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          ></Input>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={updateSeats}
          >
            Saving Data
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditSeats;
