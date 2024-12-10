import { Link, Page, Text, View, Image, Document } from '@react-pdf/renderer';
import { useStyles } from './styles';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  logo?: boolean;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}

const DEFAULT_LOGO = '/assets/logo.png';

const PostPdf = ({
  title,
  subtitle,
  description,
  imageSrc,
  logo = true,
  logoSrc,
  footerNote,
  poweredByText = 'React PDF Gen',
  poweredByLink = 'https://www.npmjs.com/package/react-pdf-gen',
}: Props) => {
  const styles = useStyles(!!logoSrc);

  const renderLogo = () => {
    if (!logo) return null;
    const isImageUrl = (url: string) => /\.(jpeg|jpg|gif|png)$/.test(url);
    const imageSource = logoSrc && isImageUrl(logoSrc) ? logoSrc : DEFAULT_LOGO;
    return <Image src={imageSource} style={styles.logo} />;
  };

  const renderFooter = () => {
    if (!footerNote) return null;
    return (
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
    );
  };

  const renderContent = () => {
    if (imageSrc) {
      return <Image src={imageSrc} style={styles.image} />;
    } else {
      return (
        <Text style={styles.description}>
          {description.split('\n').map((line, index) => (
            <Text key={index}>{line}{'\n'}</Text>
          ))}
        </Text>
      );
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {renderLogo()}
        </View>
        <Text style={styles.h3}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {renderContent()}
        {!imageSrc && (
          <Text style={styles.description}>
            {description.split('\n').map((line, index) => (
              <Text key={index}>{line}{'\n'}</Text>
            ))}
          </Text>
        )}
        <Text style={styles.body2}>{new Date().toLocaleDateString()}</Text>
        {renderFooter()}
      </Page>
    </Document>
  );
};

export default PostPdf;