import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center space-y-6 text-center">
        <div className="bg-muted rounded-full p-6">
          <FileQuestion className="text-muted-foreground h-16 w-16" />
        </div>

        <div className="space-y-2">
          <h1 className="font-outfit text-4xl font-bold tracking-tighter sm:text-5xl">
            404 - Not Found
          </h1>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 flex-1 justify-center",
            )}
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 flex-1 justify-center",
            )}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
