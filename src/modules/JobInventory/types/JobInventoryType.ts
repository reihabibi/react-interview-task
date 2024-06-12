// types.ts
export interface CategoriesType {
    id: string;
    name: string;
  }
  
  export interface JobInventoryType {
    id: string;
    jobName: string;
    jobId: string;
    categories: CategoriesType[];
  }
  
  export interface InventoryItem {
    item: string;
    quantity: number;
    description: string;
    notes: string;
    id: string;
  }
  
  export interface JobInventoryItemType {
    id: string;
    item: string;
    quantity: number;
    description: string;
    notes: string;
  }
  