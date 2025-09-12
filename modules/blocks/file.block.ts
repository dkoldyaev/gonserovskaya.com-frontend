import { TFile } from "@/types/api-response";

export type TFileBlock = {
  __component: "blocks.file";
  id: number;
  filename: string;
  file: TFile[];
};
