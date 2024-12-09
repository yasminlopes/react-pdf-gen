export type DataType = {
  [key: string]: any;
};

export interface ExportData {
  columns?: string[];
  data?: DataType[];
  title?: string;
  subtitle?: string;
  description?: string;
  layout: string;
  logo?: boolean;
  logoSrc?: string;
  imageSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}
