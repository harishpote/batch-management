export interface Batch {
  batchName: string,
  items: BatchItem[]  
}

export interface BatchItem {
  partName: string;
  price: number;
  time: string;
  status: string
}

export interface Part {
  partName: string;
  price: number;
  status: string;
  time?: string;
}