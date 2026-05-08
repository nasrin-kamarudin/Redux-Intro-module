import type { ReactNode } from "react";

export interface Column<T> {
  id: keyof T;
  label: string;
  width?: number;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
}

export interface CustomTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  rows: T[];

  page: number;
  rowsPerPage: number;
  totalCount: number;

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;

  onRowClick?: (row: T) => void;
}

export interface tableData {
  id: number;
  applicationNo: string;
  appliedSa: string;
  annualPremium: number;
  productType: string;
  drc: string;
  ptlr: string;
  isMedical: string;
  breDecision:string;
  channel:string;
  munichReMedicalDecision:string;
  hniFlag:string;
  roleType:string;
  poolTAT?: string;
  dateAndTimeStamp?: string;
}

export type PoolProps = {
  onSelectPool: (pool: string) => void;
  selectedPool: string;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Order = "asc" | "desc";
export type SortableFields = "appliedSa" | "annualPremium";
