import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import '../Components/Style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ipaddress from '../Components/IpAddress';
import { CardBody } from 'reactstrap';
import 'jspdf-autotable';
import { fillColor } from 'jspdf-autotable';
import DGDCimage from '../Images/DGDC.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faFileExcel, faFilePdf, faPrint } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import * as XLSX from "xlsx";
import jsPDF from 'jspdf';
import { Line, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal } from 'react-bootstrap';
import { PDFExport } from '@mikecousins/react-pdf';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, } from '@react-pdf/renderer'; import { BlobProvider } from '@react-pdf/renderer';
import { usePdf } from '@mikecousins/react-pdf';
import demo from './demo';

const styles = StyleSheet.create({
  page: {

    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    alignItems: 'center',

  },
  headingwithbox: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    alignItems: 'center',

    // Add padding for space between text and border

  },
  viewheadingwithbox: {
    border: '1px solid black',
    padding: 5,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
  headingwithborder: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    alignItems: 'center',
    borderBottom: '1px solid black'
    // Add padding for space between text and border

  },
  image: {
    width: 400,
    height: 80,
    marginBottom: 0,
    marginLeft: 55
  },
  dateSize: {
    fontSize: 8,
  },
  normaltext: {
    fontSize: 10,
    marginTop: 25,
    fontWeight: 'bold'
  },
  line: {
    width: '100%', // Adjust the width of the line
    marginTop: 10, // Adjust the space above the line
    marginBottom: 10, // Adjust the space below the line
    borderTop: '1pt solid black', // Style the line
  },
  table: {
    fontSize: 10,
    display: 'table',
    width: '100%',
    
    marginBottom: 0,
  },
  tableRow: {
    
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    borderRightColor: '#000',
  },
  tableCell: {
    width: '12.6%',
    borderRightWidth: 1,
    height: '1%',
    borderTopWidth:1,
    borderTopColor:'#000',

    borderLeftWidth: 1,
    borderLeftColor: '#000',
 
    fontSize: 10,
  },
});

export default function Importtp() {
  const navigate = useNavigate();

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);

  const today = new Date().toISOString().split('T')[0];

  // State to store selected date
  const [selectedDate, setSelectedDate] = useState('');
  console.log("date2 ", selectedDate);
  const [pdfData, setPdfData] = useState(null);
  // State to store the Transhipment Permit No (replace with actual data)
  const [transhipmentPermitNo, setTranshipmentPermitNo] = useState('');
  const [generatedPDF, setGeneratedPDF] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [tpdata, setTpdata] = useState([]);
  const [error, setError] = useState(null);
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  // Function to format the selected date
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  // Function to handle the date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);

    // Replace this with your actual API call logic
    fetch(`http://${ipaddress}:8080/import/tpdate?date=${formattedDate}&cid=${companyid}&bid=${branchId}`)
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array containing Transhipment Permit No
        if (data && data.length > 0) {
          setResponseData(data); // Update responseData with fetched data
          console.log('dataaa ', data); // Log the updated data
        } else {
          setResponseData([]); // Update responseData to an empty array if no data available
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };




  const handleTPDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);

    try {
      const response = await fetch(`http://${ipaddress}:8080/import/getalldata?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setTpdata(data);
        console.log('dataaa ', data);
      }
      else {
        setTpdata([]);
      }

      setError(null); // Clear the error if data is successfully fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error); // Set the error state if there's an error
    }
  };


  const handleTranshipmentPermitNoChange = (value) => {
    setTranshipmentPermitNo(value);
    handleTPDateChange(selectedDate);
  };

  const handleShowButtonClick = () => {
    if (!selectedDate) {
      // Show an alert if the date is not selected
      alert('Please select a Transhipment Permit Date.');
      return;
    }

    handleTPDateChange(selectedDate);
  };


  const handleResetButtonClick = () => {
    setSelectedDate('');
    setTranshipmentPermitNo('');
    setTpdata([]);
    setResponseData([]);

  };


  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        year: '2-digit', // '2-digit' for short year format
        month: '2-digit', // '2-digit' for leading zeros
        day: '2-digit', // '2-digit' for leading zeros
        hour: '2-digit', // '2-digit' for leading zeros
        minute: '2-digit', // '2-digit' for leading zeros
      };
      const formattedDateTime = now.toLocaleString('en-US', options);
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  console.log('date ', currentDateTime);

  const handleExcelDownload = () => {
    // Create a subset of tpdata containing only the fields you want to export
    const excelData = tpdata.map(item => ({
      SIR_No: item.sir_No,
      Parcel_Type: item.parcelType,
      Pctm_No: item.pctmNo,
      NOP: item.nop,
      Description_Of_Goods: item.descriptionOfGoods,
      Gross_Weight: item.grossWeight,
      Port_of_Origin: item.portOrigin,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set custom column widths (change the numbers to adjust the widths)
    ws['!cols'] = [
      { wch: 10 }, // Column A width
      { wch: 15 }, // Column B width
      { wch: 15 }, // Column C width
      { wch: 10 }, // Column D width
      { wch: 20 }, // Column E width
      { wch: 12 }, // Column F width
      { wch: 20 }, // Column G width
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'TranshipmentData');

    const excelFileName = 'transhipment_data.xlsx';

    // Use the writeFile function to create and download the Excel file
    XLSX.writeFile(wb, excelFileName);
  };


  const handlePDFDownload = () => {
    // Generate the PDF Blob using MyPDFDocument
    const pdfBlob = MyPDFDocument({ tpdata });


    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'transhipment_data.pdf'; // Set the desired file name
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the URL to free up resources
    URL.revokeObjectURL(pdfUrl);
  };


  const handlePrintButtonClick = () => {
    const pdfContent = MyPDFDocument(); // Generate the PDF content
    const pdfBlob = pdfContent.toBlob(); // Convert PDF content to a Blob

    const blobUrl = URL.createObjectURL(pdfBlob);

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Wait for the iframe to load the PDF content
    iframe.onload = () => {
      // Print the iframe content
      iframe.contentWindow.print();

      // Remove the iframe after printing
      document.body.removeChild(iframe);

      // Revoke the blob URL
      URL.revokeObjectURL(blobUrl);
    };
  };


  function getCurrentDateTimeFormatted() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = String(minutes).padStart(2, '0');

    const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${period}`;

    return formattedDateTime;
  }

  const MyPDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.dateSize}>{getCurrentDateTimeFormatted()}</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.image} src={DGDCimage} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.heading}>IMPORT TP</Text>
          <Text style={styles.heading}>DGDC SEEPZ SEZ STRONG ROOM</Text>
          <Text style={styles.heading}>MIAL LTD - CSI AIRPORT , AIR CARGO COMPLEX, SAHAR MUMBAI - 400099</Text>
          <View style={styles.viewheadingwithbox}>
            <Text style={styles.headingwithbox}>TRANSHIPMENT PERMIT FOR IMPORT</Text>
          </View>
          <Text style={styles.headingwithborder}>CONSOLIDATED IMPORT PRECIOUS CARGO TRANSFER MANIFEST</Text>
        </View>
        <View>
          <Text style={styles.normaltext}>
            For Date :{selectedDate} to {selectedDate} Transhipment Permit No & Dt. {transhipmentPermitNo}
          </Text>
        </View>
        <Line style={styles.line} />
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Sr. No.</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>SIR No.</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>PCTM no.</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>No. of Packages</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Desc</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Weight</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Value</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Origin Airport</Text>
            </View>
            
          </View>
          </View>
          <View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Cell 1-1</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-2</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-3</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-1</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-2</Text>
            </View>
            <View style={styles.tableCell}>
              <Text >Cell 1-3</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-1</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Cell 1-2</Text>
            </View>
           
          </View>
          
          </View>
      </Page>
    </Document>
  );
  const [pdfBlob, setPdfBlob] = useState(null);
  const generatePdf = async () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(9);
      doc.text(getCurrentDateTimeFormatted(), 4, 5);
      // Add other PDF content here...
      doc.addImage(DGDCimage, 'PNG', 30, 4, 135, 28);
      doc.setFontSize(12);
      doc.setFont('times');

      doc.text("IMPORT TP", 91, 40);
      doc.setFontSize(10);
      doc.text("DGDC SEEPZ SEZ STRONG ROOM", 73, 45);
      doc.text("MIAL LTD - CSI AIRPORT , AIR CARGO COMPLEX, SAHAR MUMBAI - 400099", 43, 50);
      const textContent = 'TRANSHIPMENT PERMIT FOR IMPORT';
      const textX = 73;
      const textY = 54;
      const textWidth = doc.getTextWidth(textContent);
      const textHeight = 7; // Adjust as needed
      const borderWidth = 1; // Adjust border width
      doc.rect(textX - borderWidth, textY - borderWidth, textWidth + 2 * borderWidth, textHeight + 2 * borderWidth, 'S');
      doc.text(textContent, textX, textY + textHeight - 2);
      doc.setFontSize(10);
      doc.text("CONSOLIDATED IMPORT PRECIOUS CARGO TRANSFER MANIFEST", 50, 66)
      const lineHeight = 0.5; // Line thickness
      const lineX = 50;
      const lineY = 67;
      const lineWidth = 110; // Line length
      doc.setLineWidth(lineHeight);
      doc.line(lineX, lineY, lineX + lineWidth, lineY);
      doc.text(`For Date :${selectedDate} to ${selectedDate} Transhipment Permit No & Dt. ${transhipmentPermitNo}`, 14, 85);
      doc.autoTable({
        html: '#myTable', // Replace with the ID of the HTML table
        startY: 90,
      });
      doc.text("CONSOLIDATED IMPORT PRECIOUS CARGO TRANSFER MANIFEST", 50, 100)
      // Save the PDF temporarily
      const blob = doc.output('blob');
      setPdfBlob(blob);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const printPdf = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfWindow = window.open(pdfUrl);
      pdfWindow.onload = () => {
        pdfWindow.print();
      };
    }
  };


  // const handlePDFPrint = () => {
  //   const pdfWindow = exportPdf().Bl;
  //   if (pdfWindow) {
  //     pdfWindow.print();
  //   }
  // };



  console.log('dataaa2 ', responseData);
  console.log("alldata  ", tpdata);
  return (
    <div className="Container">
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>
          <Form>
            <Row>
              <Col >
                <Form.Group >
                  <Form.Label className="forlabel">Transhipment Permit Date</Form.Label>
                  <Form.Control
                    type="date"
                    max={today}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    placeholder=" "
                  />
                </Form.Group>
              </Col>
              <Col >
                <label className="forlabel">Transhipment Permit No</label>
                <select
                  name="company"
                  id="dw"
                  className=""
                  value={transhipmentPermitNo}
                  onChange={(e) => handleTranshipmentPermitNoChange(e.target.value)}
                >
                  {responseData.length > 0 && (

                    <option >Select</option>
                  )}
                  {responseData.length > 0 && responseData.map(item => (

                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </Col>
              <Col >
                <div style={{ marginTop: 30 }}>
                  <Button onClick={handleShowButtonClick} variant="outline-danger" style={{ marginRight: 20 }}>
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    SHOW
                  </Button>
                  <Button onClick={handleResetButtonClick} variant="outline-danger">
                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                    RESET
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <hr />
          <handlePDFDownload2 tpdata={tpdata} />

          <div hidden={!tpdata.length > 0}>
            <div style={{ float: 'right' }}>
              <BlobProvider document={<MyPDFDocument />}>
                {({ blob, url, loading, error }) => (

                  <a href={url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                    <Button
                      type="button"
                      variant="outline-danger"
                      style={{ marginRight: '10px', marginBottom: '15px', textDecoration: 'none' }}

                    >
                      <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                      PRINT

                    </Button>
                  </a>

                )}
              </BlobProvider>
              <Button
                type="button"
                variant="outline-success"
                style={{ marginRight: '10px', marginBottom: '15px' }}
                onClick={handleExcelDownload}
              >
                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                XLS
              </Button>
              <PDFDownloadLink className='buttton' document={<MyPDFDocument />} fileName="transhipment_data.pdf">
                {({ blob, url, loading, error }) =>
                  <Button
                    type="button"
                    variant="outline-danger"
                    className='buttton'
                    style={{ marginBottom: '15px' }}

                  >
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />

                    PDF

                  </Button>
                }
              </PDFDownloadLink>
            </div>
            <Table id='myTable' striped bordered hover >

              <thead >
                <tr >
                  <th style={{ backgroundColor: 'skyblue' }}>SIR No</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Parcel Type</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Pctm No</th>
                  <th style={{ backgroundColor: 'skyblue' }}>No. of Pkg</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Description</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Weight</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Value</th>
                  <th style={{ backgroundColor: 'skyblue' }}>Origin Airport</th>
                </tr>
              </thead>
              <tbody>
                {tpdata.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sir_No}</td>
                    <td>{item.parcelType}</td>
                    <td>{item.pctmNo}</td>
                    <td>{item.nop}</td>
                    <td>{item.descriptionOfGoods}</td>
                    <td>{item.grossWeight}</td>
                    <td>{ }</td>
                    <td>{item.portOrigin}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button onClick={generatePdf}>Generate PDF</button>

            {/* Button to print the generated PDF */}
            <button onClick={printPdf} disabled={!pdfBlob}>
              Print PDF
            </button>

          </div>



        </CardBody>
      </Card>

    </div>
  )


}







