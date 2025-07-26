import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function EventCard() {
  return (
    <Card className="transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-green/40 ">
      <CardHeader>Image & Date here</CardHeader>
      <CardContent>Title & Description/location here</CardContent>
      <CardFooter>Price & attendees here</CardFooter>
    </Card>
  );
}
