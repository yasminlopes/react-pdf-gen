import { Link, Page, Text, View, Image, Document } from '@react-pdf/renderer';
import { useStyles } from './styles';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  columns: string[];
  data: Array<string[] | Record<string, string>>;
  logo?: boolean;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}

const DEFAULT_LOGO = '/assets/logo.png';

export default function PostPdf({
  title,
  subtitle,
  description,
  imageSrc,
  columns,
  data,
  logo = true,
  logoSrc,
  footerNote = 'Este documento foi gerado automaticamente pelo sistema.',
  poweredByText = 'React PDF Gen',
  poweredByLink = 'https://www.npmjs.com/package/react-pdf-gen',
}: Props) {
  const logoImageSrc = logo ? logoSrc || DEFAULT_LOGO : null;
  const styles = useStyles(!!logoImageSrc);

  const isImageUrl = (url: string) => /\.(jpeg|jpg|gif|png)$/.test(url);

  const imageSource = logoImageSrc && isImageUrl(logoImageSrc) ? logoImageSrc : DEFAULT_LOGO;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoImageSrc && (
            <Image src={imageSource} style={styles.logo} />
          )}
          <Text style={styles.h3}>{title}</Text>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Image src={imageSrc} style={styles.logo} />
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.body2}>{new Date().toLocaleDateString()}</Text>
        <View style={styles.content}>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.postRow}>
              {Array.isArray(row)
                ? row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.postCell}>
                      {isImageUrl(cell) ? (
                        <Image src={cell} style={{ width: '100%', height: 'auto' }} />
                      ) : (
                        <Text>{cell}</Text>
                      )}
                    </View>
                  ))
                : columns.map((column, cellIndex) => (
                    <View key={cellIndex} style={styles.postCell}>
                      {isImageUrl(row[column]) ? (
                        <Image src={row[column]} style={{ width: '100%', height: 'auto' }} />
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