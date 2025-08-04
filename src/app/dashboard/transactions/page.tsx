import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dashboard from "../components/DashboardLayout";
import { BadgeCheck, BadgeDollarSign, CircleX, FileClock } from "lucide-react";
import TransactionList from "./components/TransactionList";
import { apiCall } from "@/helper/apiCall";

const transactionCard = [
  // {
  //   id: 1,
  //   icon: <BadgeDollarSign></BadgeDollarSign>,
  //   name: "Transactions",
  //   content: 90,
  // },
  {
    id: 1,
    icon: <FileClock></FileClock>,
    name: "Pending",
    content: 90,
  },
  {
    id: 2,
    icon: <BadgeCheck></BadgeCheck>,
    name: "Success",
    content: 90,
  },
  {
    id: 3,
    icon: <CircleX></CircleX>,
    name: "Rejected",
    content: 90,
  },
];

function ManageTransactions() {
  // get Data Transaction from DB
  const getData = async () => {
    try {
      const res = await apiCall.get("/transaction/detail");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Dashboard>
        {/*  */}
        <div
          id="transaction-card"
          className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4"
        >
          {transactionCard.map((e) => (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex gap-x-1 items-center justify-center font-semibold text-center">
                  {e.icon}
                  <p className="text-sm  xl:text-2xl">{e.name}</p>
                </div>
              </CardHeader>
              <CardContent className="text-center text-3xl md:text-4xl xl:text-5xl font-semibold">
                {e.content}
              </CardContent>
            </Card>
          ))}
        </div>
        {/*  */}
        <div className="mt-5">
          <TransactionList />
        </div>
      </Dashboard>
    </section>
  );
}

export default ManageTransactions;
