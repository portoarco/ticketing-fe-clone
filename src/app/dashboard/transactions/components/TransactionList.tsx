"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import CheckPayment from "./CheckPaymentDialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import ViewDetails from "./ViewDetails";
import { apiCall } from "@/helper/apiCall";

interface TransactionDetails {
  id: string;
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

function TransactionList() {
  // open dialog transaction
  const [openDialog, setOpenDialog] = useState(false);
  //   open details handler
  const [openDetails, setOpenDetails] = useState(false);
  // transaction state
  const [transaction, setTransaction] = useState<TransactionDetails[]>([]);

  // get Data Transaction from DB
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiCall.get("/transaction/detail", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      console.log("pemisah bos");
      console.log(res.data);
      console.log("pemisah bos");
      console.log(res.data.data);

      const transactionDetailsData = res.data.data;

      setTransaction(transactionDetailsData);
    } catch (error) {
      console.log(error);
    }
  };
  // open dialog handler
  const handlerOpenDialog = () => {
    setOpenDialog(true);
  };
  //   open details handler
  const detailsHandler = () => {
    setOpenDetails(true);
  };

  // payment status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   getData(); // fetch ulang tiap 5 MENIT
    // }, 300000);
    getData();
    // return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <section>
      <Card className="p-6 w-full">
        {/* <Button onClick={getData}>Testing Data</Button> */}
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xs md:text-lg xl:text-xl">
              Transaction Lists
            </CardTitle>
            <CardDescription className="text-xs md:text-md xl:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </CardDescription>
          </div>
          <div className="flex gap-x-2">
            {/* Filter Latest-Oldest */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest-first">Latest</SelectItem>
                <SelectItem value="oldest-first">Oldest</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Status */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Customer Name</TableHead>
                <TableHead className="text-center">Event</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Payment Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Check Payment</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.length > 0 ? (
                transaction.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="text-center">
                      {data.user.first_name} {data.user.last_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {data.detail_event.name}
                    </TableCell>
                    <TableCell className="text-center">
                      Rp. {data.amount}
                    </TableCell>
                    <TableCell className="text-center">
                      {data.paid_at
                        ? new Date(data.paid_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={getStatusColor(data.transaction_status)}
                      >
                        {data.transaction_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        className="cursor-pointer"
                        onClick={handlerOpenDialog}
                      >
                        Review Payment
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                        onClick={detailsHandler}
                      >
                        View Details
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button className="cursor-pointer">
                        <Trash2></Trash2>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* masukkan pagination disini */}
      </Card>

      {/* review payment dialog */}
      <CheckPayment open={openDialog} onOpenChange={setOpenDialog} />
      {/* view details dialog */}
      <ViewDetails open={openDetails} onOpenChange={setOpenDetails} />
    </section>
  );
}

export default TransactionList;
