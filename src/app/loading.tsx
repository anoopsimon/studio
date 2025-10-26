import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="container mx-auto grid h-full gap-8 md:grid-cols-2 lg:grid-cols-[1fr_550px]">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <Skeleton className="aspect-[5/7] w-full max-w-[500px] rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
