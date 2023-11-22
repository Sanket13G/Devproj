import React, { useContext, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import dgdcimage from "../Images/DGDC.png";
import Import_PCTM from "./Import_PCTM";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  header: {
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    border: "1px solid #000",
    padding: 5,
  },
});
const hrStyle = {
    border: 'non',
    borderTop: '5px solid black', // Adjust the thickness and color as needed
  };

const PDFReport = ({ data, startDate, endDate, selectedAirline }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const formattedStartDate = `${startDate} 00:00`;
  const formattedEndDate = `${endDate} 23:59`;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>No data available for the selected criteria.</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <div>
    <Document>
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <div className="text-center">
    {/* Add an image with styles to center and adjust size */}
    <img 
      src={dgdcimage}
      alt="Image Description"
      style={{
        width: '990px', // Adjust the width as needed
        height: 'auto', // Maintain aspect ratio
        display: 'block', // Center horizontally
        margin: '0 auto',
      }}
    />
  </div>
  <h4 className="text-center">PCTM REPORT</h4>
  <p className="text-center">DGDC SEEPZ SEZ STRONG ROOM</p>
  <p className="text-center">
    MAIL LTD-CSI AIRPORT ,AIR CARGO COMPLEX,SAHAR MUMBAI-400099
  </p>
  <p className="text-center">
    <u>IMPORT - PRECIOUS CARGO TRANSFER MANIFEST</u>
  </p>
  <p className="text-center">
    From Date : {startDate} To Date :{endDate}
  </p>
</div>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
         <p> <Text>REPORT DATE : {startDate}</Text>
          <br />
          <Text>PCTM NO: {endDate}</Text>
          <br />
          <Text>IGM NO: {}</Text>
          <br /></p>
          <hr style={hrStyle} />
          <p>
  Received from <span style={{ fontWeight: "bold" }}>Flight -</span> {selectedAirline} on
  <span style={{ fontWeight: "bold" }}> Flight Date & Time -</span> EK04 {} at DGDC SEEPZ SEZ STRONG ROOM SAHAR in escort of
</p>

        </View>
        <View>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>Sr.No</th>
                <th style={styles.tableCell}>Airline Name</th>
                <th style={styles.tableCell}>MAWB</th>
                <th style={styles.tableCell}>Sir No</th>
                <th style={styles.tableCell}>Sir Date</th>
                <th style={styles.tableCell}>Parcel Type</th>
                <th style={styles.tableCell}>HAWB</th>
                <th style={styles.tableCell}>NOP</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{item.airlineName}</td>
                  <td style={styles.tableCell}>{item.mawb}</td>
                  <td style={styles.tableCell}>{item.sirNo}</td>
                  <td style={styles.tableCell}>{item.sirDate}</td>
                  <td style={styles.tableCell}>{item.parcelType}</td>
                  <td style={styles.tableCell}>{item.hawb}</td>
                  <td style={styles.tableCell}>{item.nop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      </Page>
    </Document>
    <hr style={hrStyle} />
    
    </div>
  );
};

export default PDFReport;