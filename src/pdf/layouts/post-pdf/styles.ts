import { StyleSheet } from '@react-pdf/renderer';

export const useStyles = (hasLogo: boolean) => StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 'auto',
    marginBottom: 10,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body2: {
    fontSize: 12,
    color: '#555',
  },
  content: {
    marginBottom: 20,
  },
  body1: {
    fontSize: 14,
    lineHeight: 1.5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 20,
  },
  col8: {
    width: '66.66%',
  },
  col4: {
    width: '33.33%',
  },
  alignRight: {
    textAlign: 'right',
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  anchor: {
    color: '#007bff',
    textDecoration: 'none',
  },
});
