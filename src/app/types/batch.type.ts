import { PART_STATUS } from "../constants/data.constant";

export interface Batch {
  id: number;
  batchName: string;
  items: Part[];
}

export interface Part {
  id: number;
  partName: string;
  price: number;
  status: PART_STATUS;
  time?: string;
  remark?: string;
}