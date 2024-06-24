"use client";

import { cn } from "@/lib/utils";
import { currentStateAtom, Tstate } from "@/store/atom";
import { useAtom } from "jotai";
import { Power, Bot, PowerOff } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

export default function Control({
  previousState,
}: {
  previousState: Tstate | undefined;
}) {
  const [curentState, setCurrentState] = useAtom(currentStateAtom);
  const debouncedState = useDebounce(curentState, 500);

  const triggerState = async (value: Tstate) => {
    setCurrentState(value);
    socket.emit("state", value);
  };

  useEffect(() => {
    if (previousState) {
      setCurrentState(previousState);
    }
  }, []);

  useEffect(() => {
    const updateState = async () =>
      await fetch("/api/state", {
        method: "POST",
        body: JSON.stringify({ state: curentState }),
      });

    updateState();
  }, [debouncedState]);

  return (
    <div className="bg-black/95 text-white flex gap-6 justify-between p-2 rounded-full">
      <div
        onClick={() => triggerState("on")}
        className={cn(
          "p-4 transition-all rounded-full w-full flex justify-center",
          curentState == "on"
            ? "bg-lime-500 w-auto"
            : "bg-muted-foreground/20 w-full"
        )}
      >
        <Power />
      </div>
      <div
        onClick={() => triggerState("auto")}
        className={cn(
          "p-4 transition-all rounded-full w-full flex justify-center",
          curentState == "auto"
            ? "bg-blue-500 w-auto"
            : "bg-muted-foreground/20 w-full"
        )}
      >
        <Bot />
      </div>
      <div
        onClick={() => triggerState("off")}
        className={cn(
          "p-4 transition-all rounded-full flex justify-center",
          curentState == "off"
            ? "bg-red-500 w-auto"
            : "bg-muted-foreground/20 w-full"
        )}
      >
        <PowerOff />
      </div>
    </div>
  );
}
