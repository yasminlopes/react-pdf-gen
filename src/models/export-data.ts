export type DataType = {
  [key: string]: any;
};

export interface ExportData {
  columns: string[];
  data: DataType[];
  title?: string;
  layout: string;
  logo?: boolean;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}
