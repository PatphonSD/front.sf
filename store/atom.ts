import { atom } from "jotai";

export type Tstate = "on" | "off" | "auto"

export const currentStateAtom = atom<Tstate>("off");
