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
const dummyAttendance = [
  {
    id: 1,
    customer_name: "Bang Pandji",
    status: "CONFIRMED",
    details: <Button>View Details</Button>,
  },
  {
    id: 2,
    customer_name: "Bang Pandji",
    status: "CONFIRMED",
    details: <Button>View Details</Button>,
  },
  {
    id: 3,
    customer_name: "Bang Pandji",
    status: "CONFIRMED",
    details: <Button>View Details</Button>,
  },
  {
    id: 4,
    customer_name: "Bang Pandji",
    status: "CONFIRMED",
    details: <Button>View Details</Button>,
  },
];

function AttendanceList() {
  return (
    <Card className="p-6 w-full overflow-auto mt-5 lg:mt-20 h-75 ">
      <CardHeader className="text-center">
        <CardTitle>Attendance Management</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, magni.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Customer Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {dummyAttendance.map((data) => (
              <TableRow key={data.id} className="">
                <TableCell className="text-center">
                  {data.customer_name}
                </TableCell>
                <TableCell className="text-center">{data.status}</TableCell>
                <TableCell className="text-center">{data.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AttendanceList;
