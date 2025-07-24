import { PlusCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Navbar() {
    return (
        <nav className=" flex justify-center ">
            <div className="flex justify-center items-center mt-5 gap-10  bg-white/60 w-fit h-15 rounded-full  px-5 fixed z-50">
                <a href="#" className="font-display font-bold text-2xl tracking-wider flex-shrink-0"><span className="text-prussian-blue ">Logoip</span><span className="text-selective-orange">sum</span></a>

                <div className="relative max-w-md mx-4 w-full flex">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
                    <Input type="search" placeholder="Search..." className="
                pl-12 
                h-10 
                pr-4 
                rounded-full 
                bg-white/50 
                border-transparent 
                focus-visible:ring-2 
                focus-visible:!ring-blue-green/80 
                focus-visible:ring-offset-0  
                text-prussian-blue 
                placeholder-prussian-blue/50
                font-sans"/>

                </div>

                <div className="">
                    <div className="flex gap-2 items-center">
                        <Button className="bg-blue-green font-sans font-bold rounded-full">
                            <PlusCircle className="h-5 w-5" />
                            Create Event</Button>
                        <Button variant={"ghost"} className="font-sans ">Sign In</Button>
                        <Button className="bg-ut-orange font-sans rounded-full font-bold">Sign Up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}