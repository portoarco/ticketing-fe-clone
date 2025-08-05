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

const dummyEvents = [
  {
    id: 1,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
  {
    id: 2,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
  {
    id: 3,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
  {
    id: 4,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
  {
    id: 5,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
  {
    id: 6,
    event_name: "Pandji Serigala",
    date: "20 Januari 2025",
    category: "Hewan",
    location: "Jl. Polisi Jakarta",
    price: 50000,
    promo_code: "PANDJI",
  },
];

function EventListTable() {
  return (
    <Card className="p-6 w-full overflow-auto mt-2 h-80">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, magni.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Event Name</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Location</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Promo Code</TableHead>
              <TableHead className="text-center">Edit Event</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyEvents.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.event_name}</TableCell>
                <TableCell className="text-center">{data.date}</TableCell>
                <TableCell className="text-center">{data.category}</TableCell>
                <TableCell className="text-center">{data.location}</TableCell>
                <TableCell className="text-center">Rp. {data.price}</TableCell>
                <TableCell className="text-center">{data.promo_code}</TableCell>
                <TableCell className="text-center">
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default EventListTable;
