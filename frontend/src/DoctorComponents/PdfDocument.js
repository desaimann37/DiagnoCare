import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

const PdfDocument = (message) => {
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Recommendation</Text>
          <Text style={styles.text}>{message}</Text> {/* Include the message in PDF */}
        </View>
      </Page>
    </Document>
  );

  const blob = new Blob([MyDocument], { type: 'application/pdf' });
  const file = new File([blob], 'recommendation.pdf', { type: 'application/pdf' });

  return file;
};

export default PdfDocument;
