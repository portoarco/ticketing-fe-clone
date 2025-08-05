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

const dummySeat = [
  {
    id: 1,
    event_name: "Pandji Beruang",
    total_seats: 20,
    available_seats: 15,
    booked: 5,
  },
  {
    id: 2,
    event_name: "Pandji Beruang",
    total_seats: 20,
    available_seats: 15,
    booked: 5,
  },
  {
    id: 3,
    event_name: "Pandji Beruang",
    total_seats: 20,
    available_seats: 15,
    booked: 5,
  },
  {
    id: 4,
    event_name: "Pandji Beruang",
    total_seats: 20,
    available_seats: 15,
    booked: 5,
  },
  {
    id: 5,
    event_name: "Pandji Beruang",
    total_seats: 20,
    available_seats: 15,
    booked: 5,
  },
];

function SeatList() {
  return (
    <Card className=" w-full overflow-auto mt-5 lg:mt-20 h-75">
      <CardHeader className="text-center mt-2">
        <CardTitle>Seat Management</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, magni.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Event Name</TableHead>
              <TableHead className="text-center">Total Seats</TableHead>
              <TableHead className="text-center">Available Seats</TableHead>
              <TableHead className="text-center">Booked</TableHead>
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummySeat.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.event_name}</TableCell>
                <TableCell className="text-center">
                  {data.total_seats}
                </TableCell>
                <TableCell className="text-center">
                  {data.available_seats}
                </TableCell>
                <TableCell className="text-center">{data.booked}</TableCell>
                <TableCell className="text-center">
                  <Button>Edit Seats</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SeatList;
