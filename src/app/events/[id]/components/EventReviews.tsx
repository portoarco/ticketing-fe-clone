import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventReviews() {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold text-prussian-blue">
          Reviews (12)
        </h2>
        <div className="flex items-center gap-1 text-selective-orange">
          <Star className="h-5 w-5" fill="currentColor" />
          <span className="font-bold text-prussian-blue text-lg">4.92</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex gap-4 items-start">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src="https://i.pravatar.cc/40?img=5"
              alt="Reviewer avatar"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold">Sarah K.</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-selective-orange">
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
              </div>
              <p className="text-xs text-prussian-blue/60">· 2 weeks ago</p>
            </div>
            <p className="text-prussian-blue/80 text-sm">
              Amazing energy! The band was incredible and the venue sounded
              fantastic. One of the best shows I've been to all year.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src="https://i.pravatar.cc/40?img=8"
              alt="Reviewer avatar"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold">Mark T.</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-selective-orange">
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" fill="currentColor" />
                <Star className="h-4 w-4" />
              </div>
              <p className="text-xs text-prussian-blue/60">· 1 month ago</p>
            </div>
            <p className="text-prussian-blue/80 text-sm">
              Great vibe and a solid lineup. The sound could have been a bit
              clearer, but overall a really fun night. Would go again!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="outline" className="w-full sm:w-auto">
          Show all 12 reviews
        </Button>
      </div>
    </section>
  );
}
