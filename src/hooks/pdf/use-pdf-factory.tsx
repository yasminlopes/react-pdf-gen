import TablePdf from '../../pdf/layouts/table-pdf/table-pdf';
import PostPdf from '../../pdf/layouts/post-pdf/post-pdf';
import { ExportData } from '../../models/export-data';

const layouts = {
  'table': TablePdf,
  'post': PostPdf,
};

/**
 * Hook para criar um documento PDF, levando em consideração o layout
 * Utiliza o padrão Factory Method para criar o documento, para facilitar a criação de novos layouts
 */
export function usePdfDocumentFactory() {
  const create = (exportData: ExportData) => {
    const { layout, ...props } = exportData;
    const LayoutComponent = layouts[layout];

    if (!LayoutComponent) throw new Error(`Layout desconhecido: ${layout}`);

    return () => <LayoutComponent {...props} />;
  };

  return { create };
}
