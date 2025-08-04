import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from "../components/DashboardLayout";
import { BadgeCheck, BadgeDollarSign, CircleX, FileClock } from "lucide-react";

const transactionCard = [
  {
    id: 1,
    icon: <BadgeDollarSign></BadgeDollarSign>,
    name: "Transactions",
    content: 90,
  },
  {
    id: 2,
    icon: <FileClock></FileClock>,
    name: "Pending",
    content: 90,
  },
  {
    id: 3,
    icon: <BadgeCheck></BadgeCheck>,
    name: "Success",
    content: 90,
  },
  {
    id: 4,
    icon: <CircleX></CircleX>,
    name: "Rejected",
    content: 90,
  },
];

function ManageTransactions() {
  return (
    <section>
      <Dashboard>
        {/*  */}
        <div
          id="transaction-card"
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4"
        >
          {transactionCard.map((e) => (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex gap-x-1 items-center justify-center font-semibold">
                  {e.icon}
                  <p className="text-md xl:text-xl">{e.name}</p>
                </div>
              </CardHeader>
              <CardContent className="text-center text-2xl md:text-4xl xl:text-5xl font-semibold">
                {e.content}
              </CardContent>
            </Card>
          ))}
        </div>
        {/*  */}
        <div>{/*  */}</div>
      </Dashboard>
    </section>
  );
}

export default ManageTransactions;
