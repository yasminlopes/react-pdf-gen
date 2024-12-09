import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { usePdfDocumentFactory } from './use-pdf-factory';
import { ExportData } from '../../models/export-data';

export function usePdf() {
  const { create } = usePdfDocumentFactory();

  const generatePdfBlob = async (exportData: ExportData) => {
    try {
      const PdfDocument = create(exportData);
      return pdf(<PdfDocument />).toBlob();
    } catch (error) {
      throw error;
    }
  };

  const save = async (exportData: ExportData, fileName: string) => {
    try {
      const blob = await generatePdfBlob(exportData);
      saveAs(blob, `${fileName}.pdf`);
    } catch (error) {
      throw error;
    }
  };

  const openInNewTab = async (exportData: ExportData) => {
    try {
      const blob = await generatePdfBlob(exportData);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      throw error;
    }
  };

  const print = async (exportData: ExportData) => {
    try {
      const blob = await generatePdfBlob(exportData);
      const url = URL.createObjectURL(blob);
      const newTab = window.open(url, '_blank');
      newTab.print();
    } catch (error) {
      throw error;
    }
  };

  return {
    save,
    openInNewTab,
    print,
  };
}
