import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoadingPage({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-10 w-10",
    default: "h-15 w-15",
    lg: "h-20 w-20",
  };

  return (
    <div className={cn("flex items-center justify-center h-screen", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
    </div>
  );
}
