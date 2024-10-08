export interface Block {
  number: number;
  hash: string;
  parent: string;
  state: string;
  events: number;
  extrinsics: number;
  timestamp: Date;
  status: "Processing" | "Success" | "Failed";
}
