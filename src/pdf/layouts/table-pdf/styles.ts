import { Font, StyleSheet } from '@react-pdf/renderer';
import { useMemo } from 'react';

Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 700,
    },
  ],
});

export const useStyles = (hasLogo: boolean) =>
  useMemo(
    () =>
      StyleSheet.create({
        logo: {
            width: 120,
            height: 40,
            objectFit: 'contain'
    },
        header: {
          marginBottom: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderColor: '#DFE3E8',
          flexDirection: 'row',
          justifyContent: hasLogo ? 'space-between' : 'center',
          alignItems: 'center',
        },
        table: {
          display: 'flex',
          width: '100%',
          borderWidth: 1,
          borderColor: '#DFE3E8',
          borderRadius: 4,
          marginVertical: 10,
        },
        tableHeader: {
          backgroundColor: '#F9FAFB',
          paddingVertical: 8,
          paddingHorizontal: 4,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFE3E8',
        },
        tableRow: {
          paddingVertical: 8,
          paddingHorizontal: 4,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#DFE3E8',
        },
        tableCell_1: {
          flex: 1,
          padding: 4,
        },
        tableCell_2: {
          flex: 2,
          padding: 4,
        },
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        h3: { fontSize: 16, fontWeight: 700, textAlign: hasLogo ? 'left' : 'center' },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 120px 24px',
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
          justifyContent: 'space-between',
        },
        anchor: {
          textDecoration: 'none',
          color: '#2563EB',
        },
      }),
    [hasLogo]
  );
