export interface DataType {
  id?: string;
  name: string;
  status: "completed" | "inProgress" | "onHold";
  categories: string[];
}

export interface JobStatusCount {
  name: string;
  label: string;
  number: number;
  color: string;
}
