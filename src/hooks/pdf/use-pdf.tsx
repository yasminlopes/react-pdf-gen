import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { usePdfDocumentFactory } from './use-pdf-factory';
import { ExportData } from '../../models/export-data';

export function usePdf() {
  const { create } = usePdfDocumentFactory();

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

  const generatePdfBlob = async ({
    columns,
    data,
    title,
    layout,
    logoSrc,
    logo,
    footerNote,
    poweredByLink,
    poweredByText,
  }: ExportData) => {
    try {
      const PdfDocument = create(
        columns,
        data,
        layout,
        title,
        logo,
        logoSrc,
        footerNote,
        poweredByLink,
        poweredByText
      );
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
