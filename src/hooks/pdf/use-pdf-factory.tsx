import TablePdf from '../../pdf/layouts/table-pdf/table-pdf';
import PostPdf from '../../pdf/layouts/post-pdf/post-pdf';
import { DataType } from '../../models/export-data';

const layouts = {
  'table': TablePdf,
  'post': PostPdf,
};

/**
 * Hook para criar um documento PDF, levando em consideração o layout
 * Utiliza o padrão Factory Method para criar o documento, para facilitar a criação de novos layouts
 */
export function usePdfDocumentFactory() {
  const create = (
    columns: string[],
    data: DataType[],
    layout: string,
    title: string = 'Dados exportados',
    logo?: boolean,
    logoSrc?: string,
    footerNote?: string,
    poweredByText?: string,
    poweredByLink?: string,
  ) => {
    const LayoutComponent = layouts[layout];

    if (!LayoutComponent) throw new Error(`Layout desconhecido: ${layout}`);

    return () => (
      <LayoutComponent
        columns={columns}
        data={data}
        title={title}
        logo={logo}
        logoSrc={logoSrc}
        footerNote={footerNote}
        poweredByText={poweredByText}
        poweredByLink={poweredByLink}
      />
    );
  };

  return { create };
}
