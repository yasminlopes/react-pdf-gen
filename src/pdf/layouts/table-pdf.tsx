import React, { useMemo } from 'react';
import {
  Link,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font
} from '@react-pdf/renderer';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { 
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 700 
    }
  ]
});

const useStyles = () => useMemo(() =>
  StyleSheet.create({
    col4: { width: '25%' },
    col8: { width: '75%' },
    mb4: { marginBottom: 4 },
    mb8: { marginBottom: 8 },
    mb40: { marginBottom: 40 },
    h3: { fontSize: 16, fontWeight: 700 },
    h4: { fontSize: 13, fontWeight: 700 },
    body1: { fontSize: 10 },
    body2: { fontSize: 9 },
    subtitle1: { fontSize: 10, fontWeight: 700 },
    subtitle2: { fontSize: 9, fontWeight: 700 },
    alignRight: { textAlign: 'right' },
    page: {
      fontSize: 9,
      lineHeight: 1.6,
      fontFamily: 'Helvetica',
      backgroundColor: '#FFFFFF',
      padding: '40px 24px 120px 24px'
    },
    header: {
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderColor: '#DFE3E8',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footer: {
      left: 0,
      right: 0,
      bottom: 0,
      padding: 24,
      borderTopWidth: 1,
      borderStyle: 'solid',
      position: 'absolute',
      borderColor: '#DFE3E8',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    table: {
      display: 'flex',
      width: '100%',
      borderWidth: 1,
      borderColor: '#DFE3E8',
      borderRadius: 4,
      marginVertical: 10
    },
    tableHeader: {
      backgroundColor: '#F9FAFB',
      padding: '12px 8px',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#DFE3E8'
    },
    tableRow: {
      padding: '10px 8px',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#DFE3E8'
    },
    tableCell_1: {
      width: '8%',
      paddingHorizontal: 4
    },
    tableCell_2: {
      flex: 1,
      paddingHorizontal: 4
    },
    anchor: {
      color: '#2563EB',
      textDecoration: 'none'
    },
    logo: {
      width: 120,
      height: 40,
      objectFit: 'contain'
    }
  }),
[]);

interface TablePdfProps {
  title: string;
  columns: string[];
  data: Array<string[] | Record<string, string>>;
  logoSrc?: string;
  footerNote?: string;
  poweredByText?: string;
  poweredByLink?: string;
}

export default function TablePdf({
  columns,
  data,
  title,
  logoSrc = 'public/assets/logo.png',
  footerNote = 'Este documento foi gerado automaticamente pelo sistema.',
  poweredByText = 'Datamimos', // nome padrão para Powered by
  poweredByLink = 'https://www.npmjs.com/package/data-mimos'
}: TablePdfProps) {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoSrc && <Image src={logoSrc} style={styles.logo} />}
          <Text style={styles.h3}>{title}</Text>
          <Text style={styles.body2}>{new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableCell_1}>
              <Text style={styles.subtitle2}>#</Text>
            </View>
            {columns.map((column, index) => (
              <View key={index} style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{column}</Text>
              </View>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={[
              styles.tableRow,
              rowIndex === data.length - 1 && { borderBottomWidth: 0 }
            ]}>
              <View style={styles.tableCell_1}>
                <Text style={styles.body2}>{rowIndex + 1}</Text>
              </View>
              {Array.isArray(row) 
                ? row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.tableCell_2}>
                      <Text style={styles.body2}>{cell}</Text>
                    </View>
                  ))
                : columns.map((column, cellIndex) => (
                    <View key={cellIndex} style={styles.tableCell_2}>
                      <Text style={styles.body2}>{row[column]}</Text>
                    </View>
                  ))
              }
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
