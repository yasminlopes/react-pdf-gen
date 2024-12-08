import { Link, Page, Text, View, Image, Document } from '@react-pdf/renderer';
import { useStyles } from './styles';
// import logoImage from '../../../assets/logo.png';
import { getBase64Image } from '../../../utils/get-base64';
import { isImageUrl } from '../../../utils/image';

interface Props {
  title: string;
  columns: string[];
  data: Array<string[] | Record<string, string>>;
  logo?: boolean;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}

const DEFAULT_LOGO = '../../../assets/logo.png'

export default async function TablePdf({
  columns,
  data,
  title,
  logo = true,
  logoSrc,
  footerNote = 'Este documento foi gerado automaticamente pelo sistema.',
  poweredByText = 'PDFGen',
  poweredByLink = 'https://www.npmjs.com/package/react-pdf-gen',
}: Props) {
  // Logo Image: tenta pegar a imagem em Base64, ou usa o logo padrão
  let logoImageSrc = null;

  // Se o logo for true e logoSrc for passado (como URL ou caminho relativo)
  if (logo && logoSrc) {
    if (isImageUrl(logoSrc)) {
      logoImageSrc = await getBase64Image(logoSrc);  // Se for uma URL, converte para Base64
    } else {
      logoImageSrc = logoSrc;  // Caso contrário, usa o caminho relativo diretamente
    }
  } else if (logo) {
    logoImageSrc = DEFAULT_LOGO;  // Se logoSrc não for passado, usa o logo padrão
  }

  const styles = useStyles(!!logoImageSrc);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoImageSrc && (
            <Image src={logoImageSrc} style={styles.logo} />
          )}
          <Text style={styles.h3}>{title}</Text>
          <Text style={styles.body2}>{new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {columns.map((column, index) => (
              <View key={index} style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{column}</Text>
              </View>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.tableRow,
                rowIndex === data.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              {Array.isArray(row)
                ? row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.tableCell_2}>
                      {isImageUrl(cell) ? (
                        <Image src={cell} style={{ width: 36, height: 'auto' }} />
                      ) : (
                        <Text>{cell}</Text>
                      )}
                    </View>
                  ))
                : columns.map((column, cellIndex) => (
                    <View key={cellIndex} style={styles.tableCell_2}>
                      {isImageUrl(row[column]) ? (
                        <Image src={row[column]} style={{ width: 36, height: 'auto' }} />
                      ) : (
                        <Text>{row[column]}</Text>
                      )}
                    </View>
                  ))}
            </View>
          ))}
        </View>

        <View style={styles.footer} fixed>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>Observações</Text>
            <Text style={styles.body2}>{footerNote}</Text>
          </View>

          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Powered by</Text>
            <Link src={poweredByLink} style={styles.anchor}>
              <Text style={styles.body2}>{poweredByText}</Text>
            </Link>
          </View>
        </View>
      </Page>
    </Document>
  );
}


