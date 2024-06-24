import { Tstate } from "@/store/atom";
import { kv } from "@/lib/kv";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Status = dynamic(() => import("./status"), {
  loading: () => <div className="aspect-square"><Skeleton className="rounded-full aspect-square w-full" /></div>,
  ssr: false,
});
const Control = dynamic(() => import("./control"), {
  loading: () => <div className="h-16"><Skeleton className="h-full w-full rounded-full" /></div>,
  ssr: false,
});

export default async function HomePage() {
  const previousState: Tstate | undefined = kv.get("state");

  return (
    <main className="p-4 flex flex-col h-dvh">
      <Status />
      <div className="flex-1 flex flex-col justify-end">
        <Control previousState={previousState} />
      </div>
    </main>
  );
}
