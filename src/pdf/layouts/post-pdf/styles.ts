import { StyleSheet } from '@react-pdf/renderer';

export const useStyles = (hasLogo: boolean) =>
  StyleSheet.create({
    page: {
      padding: 24,
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.5,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    logo: {
      width: 100,
      height: 'auto',
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 10,
      color: '#666',
    },
    content: {
      flex: 1,
      marginBottom: 24,
    },
    postRow: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 12,
    },
    postCell: {
      flex: 1,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginRight: 8,
      textAlign: 'center',
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingTop: 12,
    },
    col8: {
      flex: 8,
    },
    col4: {
      flex: 4,
    },
    alignRight: {
      textAlign: 'right',
    },
    subtitle2: {
      fontSize: 10,
      fontWeight: 'bold',
    },
    anchor: {
      color: '#007bff',
      textDecoration: 'none',
    },
  });
