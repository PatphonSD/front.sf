"use client";

import { cn } from "@/lib/utils";
import { currentStateAtom } from "@/store/atom";
import { useAtom } from "jotai";

export default function Status() {
  const [curentState] = useAtom(currentStateAtom);
  return (
    <div
      className={cn(
        "ring-4 flex transition-all flex-col items-center justify-center aspect-square rounded-full",
        { "ring-green-500": curentState == "on" },
        { "ring-blue-500": curentState == "auto" },
        { "ring-red-500": curentState == "off" },
      )}
    >
      <p className="text-5xl">{curentState}</p>
    </div>
  );
}
