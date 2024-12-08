
import { Link, Page, Text, View, Image, Document } from '@react-pdf/renderer';
import { getBase64Image } from '../../../utils/get-base64';
import { isImageUrl } from '../../../utils/image';
import { useStyles } from './styles';

interface Props {
  title: string;
  author: string;
  content: string;
  date: string;
  logo?: boolean;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}

const DEFAULT_LOGO = '../../../assets/logo.png';

export default async function PostPdf({
  title,
  author,
  content,
  date,
  logo = true,
  logoSrc,
  footerNote = 'Este documento foi gerado automaticamente pelo sistema.',
  poweredByText = 'PDFGen',
  poweredByLink = 'https://www.npmjs.com/package/react-pdf-gen',
}: Props) {
  let logoImageSrc = null;

  if (logo && logoSrc) {
    if (isImageUrl(logoSrc)) {
      logoImageSrc = await getBase64Image(logoSrc);
    } else {
      logoImageSrc = logoSrc;
    }
  } else if (logo) {
    logoImageSrc = DEFAULT_LOGO;
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
          <Text style={styles.body2}>{author}</Text>
          <Text style={styles.body2}>{new Date(date).toLocaleDateString()}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.body1}>{content}</Text>
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
