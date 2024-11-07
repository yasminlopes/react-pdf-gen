import React from 'react';

import { saveAs } from 'file-saver';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { usePdfDocumentFactory } from './use-pdf-factory';

type DataType = {
  [key: string]: any;
};

interface ExportData {
  columns: string[];
  data: DataType[];
  title?: string;
  layout: string;
}

export function usePdf() {
  const { create } = usePdfDocumentFactory();

  const generatePdfBlob = async ({ columns, data, title, layout }: ExportData) => {
    try {
      const PdfDocument = create(columns, data, layout, title);
     
      return pdf(<PdfDocument />).toBlob();
    } catch (error) {
      throw error;
    }
  };

  /* const getLink = async ({ columns, data, title, layout }: ExportData, fileName: string) => {
    try {
      const PdfDocument = create(columns, data, layout, title);
      if (!PdfDocument) {
        throw new Error('PdfDocument is undefined');
      }
      return (
        <PDFDownloadLink
          document={<PdfDocument />}
          fileName={`registradora-io_${fileName}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <React.Fragment>
              {loading ? 'Carregando...' : 'Baixar PDF'}
            </React.Fragment>
          )}
        </PDFDownloadLink>
      );
    } catch (error) {
      console.error('Error generating PDF link:', error);
      throw error;
    }
  }; */

  const save = async (exportData: ExportData, fileName: string) => {
    try {
      const blob = await generatePdfBlob(exportData);
      saveAs(blob, `${fileName}.pdf`);
    } catch (error) {
      throw error;
    }
  };

  const openInNewTab = async ({ columns, data, title, layout }: ExportData) => {
    try {
      const blob = await generatePdfBlob({ columns, data, title, layout });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  };

  const print = async ({ columns, data, title, layout }: ExportData) => {
    try {
      const blob = await generatePdfBlob({ columns, data, title, layout });
      const url = URL.createObjectURL(blob);
      const newTab = window.open(url, '_blank');
      newTab.print();
    } catch (error) {
      throw error;
    }
  };

  return {
    // getLink,
    save,
    openInNewTab,
    print
  };
}