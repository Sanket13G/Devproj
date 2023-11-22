import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
  },
});

const MyPDFDocument = (tpdata) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>My PDF Document</Text>
        <Text style={styles.content}>
          This is the content of my PDF document. You can add more text and
          components here.
          {tpdata.sir_No}
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
