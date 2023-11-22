-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: dev_cwms
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airline`
--

DROP TABLE IF EXISTS `airline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airline` (
  `flight_no` varchar(255) NOT NULL,
  `airline_code` varchar(255) DEFAULT NULL,
  `airline_desc` varchar(255) DEFAULT NULL,
  `airline_name` varchar(255) DEFAULT NULL,
  `airline_short_name` varchar(255) DEFAULT NULL,
  `approved_by` varchar(255) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `branch_id` varchar(255) DEFAULT NULL,
  `company_id` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `edited_by` varchar(255) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`flight_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline`
--

LOCK TABLES `airline` WRITE;
/*!40000 ALTER TABLE `airline` DISABLE KEYS */;
INSERT INTO `airline` VALUES ('34645637','SD-100','Going to Goa','Emirates','EMRTS','Sanket','2023-08-30 12:08:55.486000','B00001','C00001','Sanket','2023-08-30 12:08:55.486000','Sanket','2023-08-30 12:08:55.486000','N'),('6526452','1313','Air ','Air India','AI','Sanket G','2023-08-09 15:11:43.509000','B00001','C00001','Sanket G','2023-08-09 15:11:43.509000','Sanket G','2023-08-09 15:11:43.509000','N'),('75375','Mahesh','Mahesh ','EY express','Sanket13','Sanket G','2023-08-10 16:59:33.556000','B00001','C00001','Sanket G','2023-08-10 16:59:33.556000','Sanket G','2023-08-10 16:59:33.556000','N');
/*!40000 ALTER TABLE `airline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `address_1` varchar(30) DEFAULT NULL,
  `address_2` varchar(30) DEFAULT NULL,
  `address_3` varchar(30) DEFAULT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `base_currency` varchar(6) NOT NULL,
  `biz_centre_type` char(1) DEFAULT NULL,
  `branch_name` varchar(35) NOT NULL,
  `city` varchar(15) DEFAULT NULL,
  `comments` varchar(150) DEFAULT NULL,
  `country` varchar(15) DEFAULT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `foreign_currency` varchar(6) DEFAULT NULL,
  `phone_no` varchar(12) DEFAULT NULL,
  `pin` varchar(6) DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `status` char(1) NOT NULL,
  `std_code` varchar(5) DEFAULT NULL,
  `tan_no` varchar(25) DEFAULT NULL,
  `tds_ac_code` varchar(10) DEFAULT NULL,
  `tds_range` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('B00001','C00001','C49, G Block Rd, ','G Block BKC, ','Bandra Kurla Complex, Bandra',NULL,NULL,'INR',NULL,'Seepz Mumbai','Mumbai',NULL,'India','Shivraj','2000-12-13 14:29:23.000000',NULL,NULL,'rappoe@gmail.com','$','7845694589',NULL,'MH','Y',NULL,NULL,NULL,NULL),('B00002','C00001','C49, G Block Rd, ','G Block BKC, ','Bandra Kurla Complex, Bandra',NULL,NULL,'INR',NULL,'Surat Bose','Mumbai',NULL,'India','Shivraj','2001-12-13 14:29:23.000000',NULL,NULL,'rappow@gmail.com','$','7845694588',NULL,'MH','Y',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfstdtrf`
--

DROP TABLE IF EXISTS `cfstdtrf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfstdtrf` (
  `branch_id` varchar(6) NOT NULL,
  `cfs_amnd_no` varchar(3) NOT NULL,
  `cfs_tariff_no` varchar(10) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `party_id` varchar(6) NOT NULL,
  `approved_by` varchar(30) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `cargo_movement` varchar(1) DEFAULT NULL,
  `cfs_doc_ref_no` varchar(35) NOT NULL,
  `cfs_tariff_date` datetime(6) DEFAULT NULL,
  `cfs_validate_date` datetime(6) DEFAULT NULL,
  `comments` varchar(150) DEFAULT NULL,
  `created_by` varchar(30) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `edited_by` varchar(30) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `party_name` varchar(50) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `type_of_shipment` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`cfs_amnd_no`,`cfs_tariff_no`,`company_id`,`party_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfstdtrf`
--

LOCK TABLES `cfstdtrf` WRITE;
/*!40000 ALTER TABLE `cfstdtrf` DISABLE KEYS */;
INSERT INTO `cfstdtrf` VALUES ('B00001','000','CFST000001','C00001','M00006','Sanket','2023-08-21 15:44:17.539000','','DOC101','2023-08-21 12:28:35.610000','2023-08-31 00:00:00.000000','','Sanket','2023-08-21 12:28:35.610000','',NULL,'RapportSoft Consultancy & Technology Pvt Ltd','A',NULL),('B00001','000','CFST000040','C00001','M00016','Sanket','2023-08-28 17:05:31.613000','','123','2023-08-28 17:05:09.917000','2023-08-29 00:00:00.000000','','Sanket','2023-08-28 17:05:09.917000','',NULL,'All','A',NULL),('B00001','000','CFST000041','C00001','M00014','',NULL,'','ss','2023-08-28 17:12:32.167000','2023-08-29 00:00:00.000000','','Sanket','2023-08-28 17:12:32.167000','',NULL,'TCS','N',NULL);
/*!40000 ALTER TABLE `cfstdtrf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfstdtrfrng`
--

DROP TABLE IF EXISTS `cfstdtrfrng`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfstdtrfrng` (
  `branch_id` varchar(6) NOT NULL,
  `cfs_amnd_no` varchar(3) NOT NULL,
  `cfs_tariff_no` varchar(10) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `party_id` varchar(6) NOT NULL,
  `service_id` varchar(10) NOT NULL,
  `srl_no` int NOT NULL,
  `approved_by` varchar(30) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `billing_party` varchar(6) DEFAULT NULL,
  `cfs_doc_ref_no` varchar(35) NOT NULL,
  `commodity` varchar(10) DEFAULT NULL,
  `created_by` varchar(30) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `currency_id` varchar(6) NOT NULL,
  `edited_by` varchar(30) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `forwarder_id` varchar(6) DEFAULT NULL,
  `importer_id` varchar(10) DEFAULT NULL,
  `on_account_of` varchar(6) DEFAULT NULL,
  `pay_party` varchar(6) DEFAULT NULL,
  `range_from` decimal(18,2) NOT NULL,
  `range_rate` decimal(18,2) NOT NULL,
  `range_to` decimal(18,2) NOT NULL,
  `range_type` varchar(10) DEFAULT NULL,
  `rate` decimal(18,5) DEFAULT NULL,
  `status` varchar(1) NOT NULL,
  `tax_applicable` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`cfs_amnd_no`,`cfs_tariff_no`,`company_id`,`party_id`,`service_id`,`srl_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfstdtrfrng`
--

LOCK TABLES `cfstdtrfrng` WRITE;
/*!40000 ALTER TABLE `cfstdtrfrng` DISABLE KEYS */;
INSERT INTO `cfstdtrfrng` VALUES ('B00001','000','CFST000001','C00001','M00006','S00005',1,'',NULL,NULL,'DOC101',NULL,'Sanket','2023-08-21 12:41:21.117000','INR',NULL,NULL,NULL,NULL,NULL,NULL,0.00,20000.00,20.00,NULL,NULL,'U',NULL),('B00001','000','CFST000001','C00001','M00006','S00005',2,'',NULL,NULL,'DOC101',NULL,'Sanket','2023-08-21 12:41:21.117000','INR',NULL,NULL,NULL,NULL,NULL,NULL,20.00,30000.00,40.00,NULL,NULL,'U',NULL),('B00001','000','CFST000001','C00001','M00006','S00006',1,'',NULL,NULL,'DOC101',NULL,'Sanket','2023-08-21 12:29:50.678000','INR','Sanket','2023-08-21 12:30:16.110000',NULL,NULL,NULL,NULL,0.00,5000.00,10.00,NULL,NULL,'D',NULL),('B00001','000','CFST000001','C00001','M00006','S00006',2,'',NULL,NULL,'DOC101',NULL,'Sanket','2023-08-21 12:30:16.120000','INR','Sanket','2023-08-21 12:41:21.105000',NULL,NULL,NULL,NULL,10.00,6000.00,20.00,NULL,NULL,'D',NULL);
/*!40000 ALTER TABLE `cfstdtrfrng` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfstdtrfsrv`
--

DROP TABLE IF EXISTS `cfstdtrfsrv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cfstdtrfsrv` (
  `branch_id` varchar(6) NOT NULL,
  `cfs_amnd_no` varchar(3) NOT NULL,
  `cfs_tariff_no` varchar(10) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `party_id` varchar(10) NOT NULL,
  `service_id` varchar(10) NOT NULL,
  `sr_no` int NOT NULL,
  `approved_by` varchar(30) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `billing_party` varchar(6) DEFAULT NULL,
  `cargo_movement` varchar(1) DEFAULT NULL,
  `cargo_type` varchar(100) DEFAULT NULL,
  `cfs_doc_ref_no` varchar(35) NOT NULL,
  `cfs_validate_date` datetime(6) DEFAULT NULL,
  `commodity` varchar(150) DEFAULT NULL,
  `container_size` varchar(10) DEFAULT NULL,
  `container_status` varchar(1) DEFAULT NULL,
  `container_type` varchar(10) DEFAULT NULL,
  `created_by` varchar(30) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `criteria` varchar(4) DEFAULT NULL,
  `currency_id` varchar(3) DEFAULT NULL,
  `discount_amt` decimal(18,2) DEFAULT NULL,
  `discount_days` varchar(4) DEFAULT NULL,
  `discount_perc` decimal(4,2) DEFAULT NULL,
  `edited_by` varchar(255) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `forwarder_id` varchar(6) DEFAULT NULL,
  `hazardous` varchar(1) DEFAULT NULL,
  `importer_id` varchar(10) DEFAULT NULL,
  `minimum_amt` decimal(18,2) DEFAULT NULL,
  `movement_code_from` varchar(6) DEFAULT NULL,
  `movement_code_to` varchar(6) DEFAULT NULL,
  `negeotiable` varchar(3) DEFAULT NULL,
  `on_account_of` varchar(6) DEFAULT NULL,
  `pay_party` varchar(50) NOT NULL,
  `pol` varchar(6) DEFAULT NULL,
  `range_type` varchar(10) DEFAULT NULL,
  `rate` decimal(18,5) DEFAULT NULL,
  `rate_calculation` varchar(255) DEFAULT NULL,
  `service_name` varchar(30) DEFAULT NULL,
  `service_unit` varchar(10) DEFAULT NULL,
  `service_unit1` varchar(10) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `tax_applicable` varchar(1) DEFAULT NULL,
  `type_of_charges` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`cfs_amnd_no`,`cfs_tariff_no`,`company_id`,`party_id`,`service_id`,`sr_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfstdtrfsrv`
--

LOCK TABLES `cfstdtrfsrv` WRITE;
/*!40000 ALTER TABLE `cfstdtrfsrv` DISABLE KEYS */;
/*!40000 ALTER TABLE `cfstdtrfsrv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmenu`
--

DROP TABLE IF EXISTS `cmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cmenu` (
  `child_menu_id` varchar(5) NOT NULL,
  `child_menu_name` varchar(30) NOT NULL,
  `child_page_links` varchar(50) DEFAULT NULL,
  `cicons` varchar(30) DEFAULT NULL,
  `pmenu_id_pmenu_id` varchar(5) DEFAULT NULL,
  `process_id` varchar(6) DEFAULT NULL,
  `pprocess_id` varchar(6) DEFAULT NULL,
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `pmenu_id_branch_id` varchar(6) DEFAULT NULL,
  `pmenu_id_company_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`child_menu_id`),
  KEY `FKlp9qhlwip6o99ikfvcsbqu8mp` (`pmenu_id_pmenu_id`),
  CONSTRAINT `FKlp9qhlwip6o99ikfvcsbqu8mp` FOREIGN KEY (`pmenu_id_pmenu_id`) REFERENCES `pmenu` (`pmenu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmenu`
--

LOCK TABLES `cmenu` WRITE;
/*!40000 ALTER TABLE `cmenu` DISABLE KEYS */;
INSERT INTO `cmenu` VALUES ('20001','Carting Agent','/child/carting-agent',NULL,'10006','P00601','P00600','B00001','C00001',NULL,NULL),('20002','Common','/child/common',NULL,'10006','P00602','P00600','B00001','C00001',NULL,NULL),('20003','Export Personal Gate Pass','/child/export-personal-gate-pass',NULL,'10006','P00603','P00600','B00001','C00001',NULL,NULL),('20004','Forward Parcel','/child/forward-parcel',NULL,'10007','P00701','P00700','B00001','C00001',NULL,NULL),('20005','Heavy Parcel','/child/heavy-parcel',NULL,'10007','P00702','P00700','B00001','C00001',NULL,NULL),('20006','Update NSDL Status','/child/update-nsdl-status',NULL,'10007','P00703','P00700','B00001','C00001',NULL,NULL),('20007','Print Tag','/child/print-tag',NULL,'10007','P00704','P00700','B00001','C00001',NULL,NULL),('20008','Generate AWB & SER','/child/generate-awb-ser',NULL,'10007','P00705','P00700','B00001','C00001',NULL,NULL),('20009','Scan Personal BE','/child/scan-personal-be',NULL,'10007','P00706','P00700','B00001','C00001',NULL,NULL),('20010','NIPT BE Scan','/child/nipt-be-scan',NULL,'10007','P00707','P00700','B00001','C00001',NULL,NULL),('20011','Scan BE QR Code','/child/scan-be-qr-code',NULL,'10007','P00708','P00700','B00001','C00001',NULL,NULL),('20012','Import TP','/child/import-tp',NULL,'10010','P01001','P01000','B00001','C00001',NULL,NULL),('20013','Export TP','/child/export-tp',NULL,'10010','P01002','P01000','B00001','C00001',NULL,NULL),('20014','Import PCTM','/child/import-pctm',NULL,'10010','P01003','P01000','B00001','C00001',NULL,NULL),('20015','Export PCTM','/child/export-pctm',NULL,'10010','P01004','P01000','B00001','C00001',NULL,NULL),('20016','Export Register','/child/export-register',NULL,'10010','P01005','P01000','B00001','C00001',NULL,NULL),('20017','Import Register','/child/import-register',NULL,'10010','P01006','P01000','B00001','C00001',NULL,NULL),('20018','Carting Sheet','/child/carting-sheet',NULL,'10010','P01007','P01000','B00001','C00001',NULL,NULL),('20019','Export Transaction','/child/export-transaction',NULL,'10010','P01008','P01000','B00001','C00001',NULL,NULL),('20020','Import Transaction','/child/import-transaction',NULL,'10010','P01009','P01000','B00001','C00001',NULL,NULL),('20021','Delivery Order','/child/delivery-order',NULL,'10010','P01010','P01000','B00001','C00001',NULL,NULL),('20022','Stock at vault','/child/stock-at-vault',NULL,'10010','P01011','P01000','B00001','C00001',NULL,NULL),('20023','Subcontract Report','/child/subcontract-report',NULL,'10010','P01012','P01000','B00001','C00001',NULL,NULL),('20024','Party Bill Summary','/child/party-bill-summary',NULL,'10010','P01013','P01000','B00001','C00001',NULL,NULL),('20025','Sub. Import Transaction','/child/sub-import-transaction',NULL,'10010','P01014','P01000','B00001','C00001',NULL,NULL),('20026','User','/child/user','','10013','P01301','P01300','B00001','C00001',NULL,NULL),('20027','UserRights','/child/userRights',NULL,'10013','P01302','P01300','B00001','C00001',NULL,NULL),('20028','Package Content Type','/child/package-content-type',NULL,'10017','P01701','P01700','B00001','C00001',NULL,NULL),('20029','Airline','/child/Airline',NULL,'10017','P01702','P01700','B00001','C00001',NULL,NULL),('20030','Generate Bill','/child/generate-bill',NULL,'10017','P01703','P01700','B00001','C00001',NULL,NULL),('20031','Service Master','/child/service-master',NULL,'10017','P01704','P01700','B00001','C00001',NULL,NULL),('20032','Sub. Export Transaction','/child/subcontract-export',NULL,'10010','P01015','P01000','B00001','C00001',NULL,NULL),('20033','GST Reports','/child/GST-reports',NULL,'10010','P01016','P01000','B00001','C00001',NULL,NULL),('20034','New GST Reports','/child/New-GST-reports',NULL,'10010','P01017','P01000','B00001','C00001',NULL,NULL),('20035','Party Bill Payments Reports','/child/Party-bill-payments-reports',NULL,'10010','P01018','P01000','B00001','C00001',NULL,NULL),('20036','TDS Reports','/child/TDS_reports',NULL,'10010','P01019','P01000','B00001','C00001',NULL,NULL),('20037','Import Register 1','/child/Import-Register1',NULL,'10010','P01020','P01000','B00001','C00001',NULL,NULL),('20038','Jar','/child/Jar',NULL,'10017','P01705','P01700','B00001','C00001',NULL,NULL);
/*!40000 ALTER TABLE `cmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `company_id` varchar(6) NOT NULL DEFAULT '',
  `address_1` varchar(40) NOT NULL DEFAULT '',
  `address_2` varchar(40) DEFAULT NULL,
  `address_3` varchar(40) DEFAULT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `cin_no` varchar(30) NOT NULL DEFAULT '',
  `city` varchar(6) NOT NULL DEFAULT '',
  `city_name` varchar(35) NOT NULL DEFAULT '',
  `company_short_name` varchar(15) DEFAULT NULL,
  `company_name` varchar(50) NOT NULL DEFAULT '',
  `contact_email` varchar(40) DEFAULT NULL,
  `contact_fax_no` varchar(15) DEFAULT NULL,
  `contact_person` varchar(35) DEFAULT NULL,
  `contact_phone_no` varchar(15) DEFAULT NULL,
  `country` varchar(6) NOT NULL DEFAULT '',
  `created_by` varchar(10) NOT NULL DEFAULT '',
  `created_date` datetime(6) NOT NULL,
  `currency_id` varchar(6) DEFAULT NULL,
  `designation` varchar(35) DEFAULT NULL,
  `ei_pin` varchar(8) NOT NULL DEFAULT '',
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `fa_db_ac_code` varchar(10) DEFAULT NULL,
  `fa_writeoff_ac_code` varchar(10) DEFAULT NULL,
  `fax_no` varchar(15) DEFAULT NULL,
  `gst_no` varchar(30) NOT NULL DEFAULT '',
  `pin` varchar(10) DEFAULT NULL,
  `pan_no` varchar(25) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `state` varchar(6) NOT NULL DEFAULT '',
  `state_code` char(2) NOT NULL DEFAULT '',
  `status` char(1) NOT NULL DEFAULT '',
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('C00001','C49, G Block Rd, ','G Block BKC, Bandra Kurla Complex,',' Bandra East, Mumbai, ',NULL,NULL,'CIN1010','Mumbai','Mumbai','Rappo','RapportSoft Consulting & Technology Pvt Ltd',NULL,NULL,NULL,NULL,'India','Shivraj','2000-12-13 14:29:23.000000','INR',NULL,'EI10010',NULL,NULL,NULL,NULL,NULL,'27AAFCA6034J1ZO','400051','CPVPG5490W','9834795651','MH','MH','Y');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_info`
--

DROP TABLE IF EXISTS `email_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_info` (
  `mail_trans_id` varchar(10) NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `body_mail` text NOT NULL,
  `branch_id` varchar(6) NOT NULL DEFAULT '',
  `cc_mail` text NOT NULL,
  `company_id` varchar(6) NOT NULL DEFAULT '',
  `file_created_date` datetime(6) NOT NULL,
  `from_email` varchar(255) DEFAULT NULL,
  `mail_status` varchar(20) NOT NULL DEFAULT '',
  `sent_date` datetime(6) NOT NULL,
  `sent_status` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `recipient_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mail_trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_info`
--

LOCK TABLES `email_info` WRITE;
/*!40000 ALTER TABLE `email_info` DISABLE KEYS */;
INSERT INTO `email_info` VALUES ('MAIL000001','C:\\Users\\Sanket\\AppData\\Local\\Temp\\\\party_data.xlsx','<html><body style=\"background-color: #f2f2f2; padding: 20px;\"><h2 style=\"color: #ff9900;\">New Party Added</h2><p>You have been registered at our Software on Date :Fri Aug 18 11:15:38 IST 2023<p> with the following details :</p></p><table border=\"1\" cellpadding=\"10\"><tr><th><strong>Party Name </strong></th><th><strong>Party ID </strong></th><th><strong>Pan No </strong></th><th><strong>GST No </strong></th><th><strong>Contact No </strong></th></tr><tr><td> Wipro</td><td>M00015</td><td>CPVPG5490Q</td><td>27FHFNFNHJ</td><td>9834795651</td></tr></table><p>Please find the document attached </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Thanks a lot for your co-operation.</p><p>Thanks & Regards,</p><p>E-Warehouse System.</p></body></html>','B00001','bhondemahesh2022@gmail.com','C00001','2023-08-18 11:15:38.970000','rushikeshnirmal88@gmail.com','Send Successfully','2023-08-18 11:16:43.654000','Y','New Party Added','sanketghodake316@gmail.com'),('MAIL000002','C:\\Users\\Sanket\\AppData\\Local\\Temp\\\\party_data.xlsx','<html><body style=\"background-color: #f2f2f2; padding: 20px;\"><h2 style=\"color: #ff9900;\">New Party Added</h2><p>You have been registered at our Software on Date :Mon Aug 21 12:25:51 IST 2023<p> with the following details :</p></p><table border=\"1\" cellpadding=\"10\"><tr><th><strong>Party Name </strong></th><th><strong>Party ID </strong></th><th><strong>Pan No </strong></th><th><strong>GST No </strong></th><th><strong>Contact No </strong></th></tr><tr><td> All</td><td>M00016</td><td>CPVPG5490Q</td><td>27FHFNFNHJ</td><td>9096225561</td></tr></table><p>Please find the document attached </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Thanks a lot for your co-operation.</p><p>Thanks & Regards,</p><p>E-Warehouse System.</p></body></html>','B00001','bhondemahesh2022@gmail.com','C00001','2023-08-21 12:25:51.868000','rushikeshnirmal88@gmail.com','Send Successfully','2023-08-21 12:26:56.643000','Y','New Party Added','sanketghodake316@gmail.com');
/*!40000 ALTER TABLE `email_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export`
--

DROP TABLE IF EXISTS `export`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export` (
  `sb_request_id` varchar(20) NOT NULL,
  `sb_number` varchar(15) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `branch_id` varchar(6) NOT NULL,
  `airway_bill_no` varchar(25) DEFAULT NULL,
  `approved_by` varchar(255) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `chaname` varchar(50) DEFAULT NULL,
  `chano` varchar(20) DEFAULT NULL,
  `console_agent` varchar(25) DEFAULT NULL,
  `country_of_destination` varchar(25) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `description_of_goods` varchar(40) DEFAULT NULL,
  `dgdc_status` varchar(50) DEFAULT NULL,
  `edited_by` varchar(255) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `entity_id` varchar(20) DEFAULT NULL,
  `fobvalue_ininr` double DEFAULT NULL,
  `gross_weight` double DEFAULT NULL,
  `iec_code` varchar(25) DEFAULT NULL,
  `exporter_name` varchar(50) DEFAULT NULL,
  `no_of_packages` int DEFAULT NULL,
  `nsdl_status` varchar(50) DEFAULT NULL,
  `port_of_destination` varchar(25) DEFAULT NULL,
  `sb_date` datetime(6) DEFAULT NULL,
  `ser_no` varchar(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `uomgross_weight` varchar(255) DEFAULT NULL,
  `uomof_packages` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`sb_number`,`sb_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export`
--

LOCK TABLES `export` WRITE;
/*!40000 ALTER TABLE `export` DISABLE KEYS */;
INSERT INTO `export` VALUES ('252302394525','4034523','C00001','B00001',NULL,'Sanket Ghodake','2023-08-30 12:07:57.941000','SELF','SELF',NULL,'UNITED STATES','Sanket Ghodake','2023-08-30 00:00:00.000000','SHIPPING BILL FOR OUTRIGHT SALE','Handed over to DGDC SEEPZ','Sanket Ghodake','2023-08-30 00:00:00.000000','155',6418027,1701,'2796000079','SEEPZ Special Economic Zone',1,'Allow Export','New York','2023-06-27 00:00:00.000000','EX000001','A','GRAMS','PACKAGES');
/*!40000 ALTER TABLE `export` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday_master`
--

DROP TABLE IF EXISTS `holiday_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday_master` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `holiday_id` varchar(6) NOT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `holiday_date` datetime(6) NOT NULL,
  `holiday_day` varchar(15) NOT NULL,
  `holiday_name` varchar(60) NOT NULL,
  `status` char(1) NOT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`holiday_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday_master`
--

LOCK TABLES `holiday_master` WRITE;
/*!40000 ALTER TABLE `holiday_master` DISABLE KEYS */;
INSERT INTO `holiday_master` VALUES ('','','H00001','','2023-08-09 17:25:24.732000','','2023-08-09 17:25:24.732000','',NULL,'2023-07-31 05:30:00.000000','Tuesday','Independence Day','\0'),('','','H00002','','2023-08-09 17:25:39.884000','','2023-08-09 17:25:39.884000','',NULL,'2023-08-01 05:30:00.000000','Tuesday','Diwali','\0'),('','','H00006','','2023-08-10 10:34:31.164000','','2023-08-10 10:34:31.164000','','2023-08-10 10:34:43.796000','2023-08-13 05:30:00.000000','Wednesday','Holi','\0'),('','','H00007','Sanket','2023-08-17 17:36:34.453000','Sanket','2023-08-17 17:36:34.453000','Sanket',NULL,'2024-01-13 05:30:00.000000','Wednesday','Makar Sankranti','\0');
/*!40000 ALTER TABLE `holiday_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import`
--

DROP TABLE IF EXISTS `import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `hawb` varchar(10) NOT NULL,
  `imp_trans_id` varchar(10) NOT NULL,
  `mawb` varchar(12) NOT NULL,
  `sir_no` varchar(10) NOT NULL,
  `airline_name` varchar(255) DEFAULT NULL,
  `approved_by` varchar(255) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `assessable_value` varchar(255) DEFAULT NULL,
  `be_date` date DEFAULT NULL,
  `be_no` varchar(255) DEFAULT NULL,
  `be_request_id` varchar(255) DEFAULT NULL,
  `cha_cde` varchar(255) DEFAULT NULL,
  `console` varchar(30) DEFAULT NULL,
  `country_origin` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `description_of_goods` varchar(255) DEFAULT NULL,
  `edited_by` varchar(255) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `flight_date` date DEFAULT NULL,
  `flight_no` varchar(255) DEFAULT NULL,
  `gross_weight` decimal(38,2) DEFAULT NULL,
  `iec` varchar(255) DEFAULT NULL,
  `igm_date` date DEFAULT NULL,
  `igm_no` varchar(10) DEFAULT NULL,
  `imp_trans_date` datetime(6) DEFAULT NULL,
  `import_address` varchar(255) DEFAULT NULL,
  `import_remarks` varchar(255) DEFAULT NULL,
  `importer_id` varchar(255) DEFAULT NULL,
  `nop` int DEFAULT NULL,
  `package_content_type` varchar(255) DEFAULT NULL,
  `parcel_type` varchar(255) DEFAULT NULL,
  `pctm_no` varchar(255) DEFAULT NULL,
  `port_origin` varchar(255) DEFAULT NULL,
  `sez_entity_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tp_date` date DEFAULT NULL,
  `tp_no` varchar(255) DEFAULT NULL,
  `uom_packages` varchar(255) DEFAULT NULL,
  `sir_date` date DEFAULT NULL,
  `console_name` varchar(255) DEFAULT NULL,
  `dgdc_status` varchar(255) DEFAULT NULL,
  `nsdl_status` varchar(255) DEFAULT NULL,
  `uom_weight` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`hawb`,`imp_trans_id`,`mawb`,`sir_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import`
--

LOCK TABLES `import` WRITE;
/*!40000 ALTER TABLE `import` DISABLE KEYS */;
INSERT INTO `import` VALUES ('B00001','C00001','HAWB1','IMPT0001','MAWB101','IM000001','Air India','Sanket','2023-08-31 16:17:14.058000','','2023-08-31','','101','',NULL,'UK','Sanket','2023-08-31 16:17:14.058000','','Sanket','2023-08-31 16:17:14.058000','2023-08-31','6526452',NULL,'FHNBC743','2023-08-31','IGM101','2023-08-31 16:17:14.058000','','','M00011',1,'LAB GROWN DIAMONDS(LGD)','','','UK','EUHHY566','A',NULL,'','KGS','2023-08-31','BVC','Handed over to DGDC Cargo','',NULL);
/*!40000 ALTER TABLE `import` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_history`
--

DROP TABLE IF EXISTS `import_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_history` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `hawb` varchar(10) NOT NULL,
  `mawb` varchar(12) NOT NULL,
  `sir_no` varchar(255) NOT NULL,
  `new_status` varchar(30) DEFAULT NULL,
  `old_status` varchar(30) DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  `transport_date` datetime(6) DEFAULT NULL,
  `updated_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`hawb`,`mawb`,`sir_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_history`
--

LOCK TABLES `import_history` WRITE;
/*!40000 ALTER TABLE `import_history` DISABLE KEYS */;
INSERT INTO `import_history` VALUES ('B00001','C00001','5959995','348678','IM000001','Handed over to DGDC Cargo','Pending',NULL,'2023-08-29 15:43:29.158000','Sanket'),('B00001','C00001','HAWB1','MAWB101','IM000001','Handed over to DGDC Cargo','Pending',NULL,'2023-08-31 16:17:14.058000','Sanket');
/*!40000 ALTER TABLE `import_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importsub`
--

DROP TABLE IF EXISTS `importsub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importsub` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `imp_sub_id` varchar(10) NOT NULL,
  `request_id` varchar(30) NOT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `challan_date` date NOT NULL,
  `challan_no` varchar(30) NOT NULL,
  `created_by` varchar(10) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `currency` varchar(15) NOT NULL,
  `dgdc_status` varchar(30) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `exporter` varchar(80) NOT NULL,
  `import_type` varchar(20) NOT NULL,
  `invoice_date` date NOT NULL,
  `invoice_no` varchar(30) NOT NULL,
  `net_weight` decimal(15,3) NOT NULL,
  `net_weight_unit` varchar(20) NOT NULL,
  `nop` int NOT NULL DEFAULT '0',
  `nsdl_status` varchar(30) NOT NULL,
  `product_value` decimal(15,3) NOT NULL,
  `reentry_date` date NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `sir_date` date NOT NULL,
  `sir_no` varchar(20) NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`imp_sub_id`,`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importsub`
--

LOCK TABLES `importsub` WRITE;
/*!40000 ALTER TABLE `importsub` DISABLE KEYS */;
INSERT INTO `importsub` VALUES ('B00001','C00001','SIM00001','4667','',NULL,'2023-08-27','657657','undefined','2023-08-30 23:28:54.284000','INR','Handed over to DGDC SEEPZ','Sanket',NULL,'Infosys','Type 1 ','2023-08-27','67657',12.325,'KGS',132445,'pending',65465.000,'2023-08-30','demo entry','2023-08-30','D-IM000001','N'),('B00001','C00001','SIM00004','466756','',NULL,'2023-08-30','6576','undefined','2023-08-30 23:29:44.273000','INR','Handed over to DGDC SEEPZ','',NULL,'Apple','Type 1 ','2023-08-05','6765',12.320,'KGS',18,'pending',6546.000,'2023-08-30','','2023-08-30','D-IM000004','N'),('B00001','C00001','SIM00005','4667564','',NULL,'2023-08-10','6576435','undefined','2023-08-30 23:30:06.768000','$','Handed over to DGDC SEEPZ','',NULL,'All','Type 1 ','2023-08-16','67654366',188.000,'KGS',183,'pending',654688.000,'2023-08-30','','2023-08-30','D-IM000005','N'),('B00001','C00001','SIM00006','66785996','',NULL,'2023-08-23','45656','undefined','2023-08-31 13:44:12.403000','INR','Handed over to DGDC SEEPZ','',NULL,'Apple','Type 2','2023-08-15','43662',12.300,'KGS',4,'pending',65465345600.000,'2023-08-31','','2023-08-31','D-IM000006','N'),('B00001','C00001','SIM00007','5673465','',NULL,'2023-08-23','34243','undefined','2023-08-31 15:32:12.012000','INR','Handed over to DGDC SEEPZ','',NULL,'RapportSoft Consultancy & Technology Pvt Ltd','Import','2023-08-29','34234',12.450,'KGS',3,'pending',6546564.000,'2023-08-31','for demo','2023-08-31','D-IM000007','N');
/*!40000 ALTER TABLE `importsub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jar`
--

DROP TABLE IF EXISTS `jar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jar` (
  `jar_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `approved_by` varchar(20) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `comments` varchar(150) DEFAULT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `detail_auto_flag` varchar(1) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `import_appl` varchar(1) DEFAULT NULL,
  `jar_desc` varchar(60) NOT NULL,
  `jar_type` varchar(20) NOT NULL,
  `process_id` varchar(6) DEFAULT NULL,
  `reference_1` varchar(6) DEFAULT NULL,
  `reference_2` varchar(6) DEFAULT NULL,
  `soundex_desc` varchar(25) DEFAULT NULL,
  `status` varchar(1) NOT NULL,
  `workflow_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`company_id`,`jar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jar`
--

LOCK TABLES `jar` WRITE;
/*!40000 ALTER TABLE `jar` DISABLE KEYS */;
INSERT INTO `jar` VALUES ('J00002','C00001','Sanket','2023-08-18 15:13:12.589000','All cities','Sanket','2023-08-18 15:13:12.589000','','Sanket','2023-08-18 15:13:12.589000',' ','CITY',' CTY',' ',' ',' ',' ','A',' '),('J00003','C00001','Sanket','2023-08-18 18:09:23.929000',' ','Sanket','2023-08-18 18:09:23.929000','','Sanket','2023-08-18 18:09:23.929000',' ','State',' STE',' ',' ',' ',' ','A',' '),('J00007','C00001','Sanket','2023-08-25 11:45:22.807000',' ','Sanket','2023-08-25 11:45:22.807000','','Sanket','2023-08-25 11:45:22.807000',' ','Console names For Import',' CNSL',' ',' ',' ',' ','A',' '),('J00008','C00001','Sanket','2023-08-25 11:46:58.710000',' ','Sanket','2023-08-25 11:46:58.710000','','Sanket','2023-08-25 11:46:58.710000',' ','PACkage Content Type',' PCK_TYP',' ',' ',' ',' ','A',' '),('J00009','C00001','Sanket','2023-08-25 14:41:44.356000',' ','Sanket','2023-08-25 14:41:44.356000','','Sanket','2023-08-25 14:41:44.356000',' ','DGDC Status',' DGDC',' ',' ',' ',' ','A',' '),('J00010','C00001','Sanket','2023-08-25 14:43:53.176000',' ','Sanket','2023-08-25 14:43:53.176000','','Sanket','2023-08-25 14:43:53.176000',' ','NSDL Status',' NSDL',' ',' ',' ',' ','A',' ');
/*!40000 ALTER TABLE `jar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jar_detail`
--

DROP TABLE IF EXISTS `jar_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jar_detail` (
  `jar_id` varchar(255) NOT NULL,
  `jar_dtl_id` varchar(255) NOT NULL,
  `company_id` varchar(255) NOT NULL,
  `approved_by` varchar(20) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `edited_by` varchar(255) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `jar_dtl_desc` varchar(255) DEFAULT NULL,
  `percentage` decimal(38,2) DEFAULT NULL,
  `process_id` varchar(255) DEFAULT NULL,
  `ref_attribute` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `workflow_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`,`jar_dtl_id`,`jar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jar_detail`
--

LOCK TABLES `jar_detail` WRITE;
/*!40000 ALTER TABLE `jar_detail` DISABLE KEYS */;
INSERT INTO `jar_detail` VALUES ('J00007','AFFRRI','C00001','Sanket Ghodake','2023-08-25 14:24:39.860000','','Sanket Ghodake','2023-08-25 14:24:39.860000','Sanket Ghodake','2023-08-25 14:24:39.860000','AF Ferrari',NULL,'','','A',''),('J00008','ALY','C00001','Sanket Ghodake','2023-08-25 14:33:15.873000','','Sanket Ghodake','2023-08-25 14:33:15.873000','Sanket Ghodake','2023-08-25 14:33:15.873000','ALLOY(ALY)',NULL,'','','A',''),('J00008','ALY2','C00001','Sanket Ghodake','2023-08-25 14:33:39.972000','','Sanket Ghodake','2023-08-25 14:33:39.972000','Sanket Ghodake','2023-08-25 14:33:39.972000','ALLOY(ALY)2',NULL,'','','A',''),('J00007','BVC','C00001','Sanket Ghodake','2023-08-25 14:24:54.965000','','Sanket Ghodake','2023-08-25 14:24:54.965000','Sanket Ghodake','2023-08-25 14:24:54.965000','BVC',NULL,'','','A',''),('J00008','CHN','C00001','Sanket Ghodake','2023-08-25 14:34:09.922000','','Sanket Ghodake','2023-08-25 14:34:09.922000','Sanket Ghodake','2023-08-25 14:34:09.922000','CHAINS(CHN)',NULL,'','','A',''),('J00008','COIN','C00001','Sanket Ghodake','2023-08-25 14:34:37.515000','','Sanket Ghodake','2023-08-25 14:34:37.515000','Sanket Ghodake','2023-08-25 14:34:37.515000','COINS(COIN)',NULL,'','','A',''),('J00008','CPD','C00001','Sanket Ghodake','2023-08-25 15:29:56.221000','CUT N POLISH DIAMOND (CPD)','Sanket Ghodake','2023-08-25 15:29:56.221000','Sanket Ghodake','2023-08-25 15:29:56.221000','CUT N POLISH DIAMOND (CPD)',NULL,'','','A',''),('J00008','CS','C00001','Sanket Ghodake','2023-08-25 14:34:57.682000','','Sanket Ghodake','2023-08-25 14:34:57.682000','Sanket Ghodake','2023-08-25 14:34:57.682000','COLOUR STONES(CS)',NULL,'','','A',''),('J00009','DGDCAIRHND','C00001','Sanket Ghodake','2023-08-25 15:10:31.393000','On selection and updation of handover to airline from Action menu','Sanket Ghodake','2023-08-25 15:10:31.393000','Sanket Ghodake','2023-08-25 15:10:31.393000','Handed over to Airline',NULL,'','','A',''),('J00009','DGDCCANCL','C00001','Sanket Ghodake','2023-08-25 15:12:26.380000','Cancel parcel with reason','Sanket Ghodake','2023-08-25 15:12:26.380000','Sanket Ghodake','2023-08-25 15:12:26.380000','Cancel Parcel',NULL,'','','A',''),('J00009','DGDCCARGOHND','C00001','Sanket Ghodake','2023-08-25 15:09:36.073000','Airport Office','Sanket Ghodake','2023-08-25 15:09:36.073000','Sanket Ghodake','2023-08-25 15:09:36.073000','Handed over to DGDC Cargo',NULL,'','','A',''),('J00009','DGDCCARGOIN','C00001','Sanket Ghodake','2023-08-25 15:07:40.526000','Gate in post OTP verification','Sanket Ghodake','2023-08-25 15:07:40.526000','Sanket Ghodake','2023-08-25 15:07:40.526000','Entry at DGDC Cargo GATE',NULL,'','','A',''),('J00009','DGDCCARGOOUT','C00001','Sanket Ghodake','2023-08-25 15:14:02.829000','Gate Pass Generation on OTP verification','Sanket Ghodake','2023-08-25 15:14:02.829000','Sanket Ghodake','2023-08-25 15:14:02.829000','Exit from DGDC Cargo Gate',NULL,'','','A',''),('J00009','DGDCCART','C00001','Sanket Ghodake','2023-08-25 14:59:48.997000','SEEPZ Counter on scanning barcode ','Sanket Ghodake','2023-08-25 14:59:48.997000','Sanket Ghodake','2023-08-25 14:59:48.997000','Handed over to Carting Agent',NULL,'','','A',''),('J00009','DGDCHNDPRTY','C00001','Sanket Ghodake','2023-08-25 15:15:50.301000','Gate Pass Generation on OTP verification','Sanket Ghodake','2023-08-25 15:15:50.301000','Sanket Ghodake','2023-08-25 15:15:50.301000','Handed over to Party/CHA',NULL,'','','A',''),('J00009','DGDCHOLD','C00001','Sanket Ghodake','2023-08-25 15:11:02.899000','on hold','Sanket Ghodake','2023-08-25 15:11:02.899000','Sanket Ghodake','2023-08-25 15:11:02.899000','Hold',NULL,'','','A',''),('J00009','DGDCRELSE','C00001','Sanket Ghodake','2023-08-25 15:11:37.045000','on elease','Sanket Ghodake','2023-08-25 15:11:37.045000','Sanket Ghodake','2023-08-25 15:11:37.045000','Release',NULL,'','','A',''),('J00009','DGDCSEEPZHND','C00001','Sanket Ghodake','2023-08-25 14:57:34.275000','SEEPZ Counter on EIR generation and priniting','Sanket Ghodake','2023-08-25 14:57:34.275000','Sanket Ghodake','2023-08-25 14:57:34.275000','Handed over to DGDC SEEPZ',NULL,'','','A',''),('J00009','DGDCSEEPZIN','C00001','Sanket Ghodake','2023-08-25 14:43:21.362000','SEEPZ Counter on scanning barcode ','Sanket Ghodake','2023-08-25 14:43:21.362000','Sanket Ghodake','2023-08-25 14:43:21.362000','Entry at  DGDC SEEPZ Gate',NULL,'','','A',''),('J00009','DGDCSEEPZOUT','C00001','Sanket Ghodake','2023-08-25 15:01:05.996000','Gate Pass Generation on OTP verification','Sanket Ghodake','2023-08-25 15:01:05.996000','Sanket Ghodake','2023-08-25 15:01:05.996000','Exit from DGDC SEEPZ Gate',NULL,'','','A',''),('J00007','DHLEXP','C00001','Sanket Ghodake','2023-08-25 14:25:10.526000','','Sanket Ghodake','2023-08-25 14:25:10.526000','Sanket Ghodake','2023-08-25 14:25:10.526000','DHL Express',NULL,'','','A',''),('J00008','DIAM','C00001','Sanket Ghodake','2023-08-25 15:30:18.994000','DIAMONDS(DIAM)','Sanket Ghodake','2023-08-25 15:30:18.994000','Sanket Ghodake','2023-08-25 15:30:18.994000','DIAMONDS(DIAM)',NULL,'','','A',''),('J00010','EXPALLOW','C00001','Sanket Ghodake','2023-08-25 14:44:27.776000','Allow handing over to carting agent','Sanket Ghodake','2023-08-25 14:44:27.776000','Sanket Ghodake','2023-08-25 14:44:27.776000','Allow Export',NULL,'','','A',''),('J00010','EXPLETALLOW','C00001','Sanket Ghodake','2023-08-25 14:44:59.412000','Allow handing over to carting agent','Sanket Ghodake','2023-08-25 14:44:59.412000','Sanket Ghodake','2023-08-25 14:44:59.412000','Let Export',NULL,'','','A',''),('J00007','FDX','C00001','Sanket Ghodake','2023-08-25 14:25:27.962000','','Sanket Ghodake','2023-08-25 14:25:27.962000','Sanket Ghodake','2023-08-25 14:25:27.962000','FEDEX',NULL,'','','A',''),('J00008','FG','C00001','Sanket Ghodake','2023-08-25 15:30:40.131000','Fine Gold(FG)','Sanket Ghodake','2023-08-25 15:30:40.131000','Sanket Ghodake','2023-08-25 15:30:40.131000','Fine Gold(FG)',NULL,'','','A',''),('J00008','G GRN','C00001','Sanket Ghodake','2023-08-25 15:32:57.857000','GOLD GRAINS (G GRN)','Sanket Ghodake','2023-08-25 15:32:57.857000','Sanket Ghodake','2023-08-25 15:32:57.857000','GOLD GRAINS (G GRN)',NULL,'','','A',''),('J00008','GC','C00001','Sanket Ghodake','2023-08-25 15:32:07.132000','GOLD CHAIN(GC)','Sanket Ghodake','2023-08-25 15:32:07.132000','Sanket Ghodake','2023-08-25 15:32:07.132000','GOLD CHAIN(GC)',NULL,'','','A',''),('J00008','GDJ','C00001','Sanket Ghodake','2023-08-25 15:31:00.143000','GOLD AND DIAMOND JEWELLERY (GDJ)','Sanket Ghodake','2023-08-25 15:31:00.143000','Sanket Ghodake','2023-08-25 15:31:00.143000','GOLD AND DIAMOND JEWELLERY (GDJ)',NULL,'','','A',''),('J00008','GLB','C00001','Sanket Ghodake','2023-08-25 15:31:31.416000','GOLD BARS (GLB)','Sanket Ghodake','2023-08-25 15:31:31.416000','Sanket Ghodake','2023-08-25 15:31:31.416000','GOLD BARS (GLB)',NULL,'','','A',''),('J00008','GLJ','C00001','Sanket Ghodake','2023-08-25 15:33:09.941000','GOLD JEWELLERY (GLJ)','Sanket Ghodake','2023-08-25 15:33:09.941000','Sanket Ghodake','2023-08-25 15:33:09.941000','GOLD JEWELLERY (GLJ)',NULL,'','','A',''),('J00008','GM','C00001','Sanket Ghodake','2023-08-25 15:33:27.838000','GOLD MOUNTING(GM)','Sanket Ghodake','2023-08-25 15:33:27.838000','Sanket Ghodake','2023-08-25 15:33:27.838000','GOLD MOUNTING(GM)',NULL,'','','A',''),('J00008','GOLD','C00001','Sanket Ghodake','2023-08-25 15:33:52.603000','GOLD(GOLD)','Sanket Ghodake','2023-08-25 15:33:52.603000','Sanket Ghodake','2023-08-25 15:33:52.603000','GOLD(GOLD)',NULL,'','','A',''),('J00008','GOLD F','C00001','Sanket Ghodake','2023-08-25 15:32:27.377000','GOLD FINDINGS(GOLD F)','Sanket Ghodake','2023-08-25 15:32:27.377000','Sanket Ghodake','2023-08-25 15:32:27.377000','GOLD FINDINGS(GOLD F)',NULL,'','','A',''),('J00008','GRAINS','C00001','Sanket Ghodake','2023-08-25 15:34:07.433000','GRAINS(GRAINS)','Sanket Ghodake','2023-08-25 15:34:07.433000','Sanket Ghodake','2023-08-25 15:34:07.433000','GRAINS(GRAINS)',NULL,'','','A',''),('J00008','GSJ','C00001','Sanket Ghodake','2023-08-25 15:31:16.262000','GOLD AND SILVER JEWELLERY(GSJ)','Sanket Ghodake','2023-08-25 15:31:16.262000','Sanket Ghodake','2023-08-25 15:31:16.262000','GOLD AND SILVER JEWELLERY(GSJ)',NULL,'','','A',''),('J00010','IMPAPPOOC','C00001','Sanket Ghodake','2023-08-25 14:45:52.587000','Allow Gate Out','Sanket Ghodake','2023-08-25 14:45:52.587000','Sanket Ghodake','2023-08-25 14:45:52.587000','Approve And Out Of Charge Without Duty',NULL,'','','A',''),('J00010','IMPOOC','C00001','Sanket Ghodake','2023-08-25 14:45:29.377000','Allow Gate Out','Sanket Ghodake','2023-08-25 14:45:29.377000','Sanket Ghodake','2023-08-25 14:45:29.377000','Out Of Charge',NULL,'','','A',''),('J00007','JAYAN','C00001','Sanket Ghodake','2023-08-25 14:25:46.249000','','Sanket Ghodake','2023-08-25 14:25:46.249000','Sanket Ghodake','2023-08-25 14:25:46.249000','Jayan',NULL,'','','A',''),('J00008','JEW','C00001','Sanket Ghodake','2023-08-25 15:34:27.217000','JEWELLERY(JEW)','Sanket Ghodake','2023-08-25 15:34:27.217000','Sanket Ghodake','2023-08-25 15:34:27.217000','JEWELLERY(JEW)',NULL,'','','A',''),('J00008','LGD','C00001','Sanket Ghodake','2023-08-25 15:34:59.240000','LAB GROWN DIAMOND(LGD)','Sanket Ghodake','2023-08-25 15:34:59.240000','Sanket Ghodake','2023-08-25 15:34:59.240000','LAB GROWN DIAMOND(LGD)',NULL,'','','A',''),('J00007','MALKAAMIT','C00001','Sanket Ghodake','2023-08-25 14:26:23.465000','','Sanket Ghodake','2023-08-25 14:26:23.465000','Sanket Ghodake','2023-08-25 14:26:23.465000','MALKA AMIT',NULL,'','','A',''),('J00008','PD','C00001','Sanket Ghodake','2023-08-25 15:35:53.332000','POLISHED DIAMOND(PD)','Sanket Ghodake','2023-08-25 15:35:53.332000','Sanket Ghodake','2023-08-25 15:35:53.332000','POLISHED DIAMOND(PD)',NULL,'','','A',''),('J00008','PJ','C00001','Sanket Ghodake','2023-08-25 15:35:35.486000','PLATINUM JEWELLERY(PJ)','Sanket Ghodake','2023-08-25 15:35:35.486000','Sanket Ghodake','2023-08-25 15:35:35.486000','PLATINUM JEWELLERY(PJ)',NULL,'','','A',''),('J00008','PM','C00001','Sanket Ghodake','2023-08-25 15:36:10.417000','PRECIOUS METAL(PM)','Sanket Ghodake','2023-08-25 15:36:10.417000','Sanket Ghodake','2023-08-25 15:36:10.417000','PRECIOUS METAL(PM)',NULL,'','','A',''),('J00008','PS','C00001','Sanket Ghodake','2023-08-25 15:36:28.488000','PRECIOUS STONE(PS)','Sanket Ghodake','2023-08-25 15:36:28.488000','Sanket Ghodake','2023-08-25 15:36:28.488000','PRECIOUS STONE(PS)',NULL,'','','A',''),('J00008','PT','C00001','Sanket Ghodake','2023-08-25 15:35:18.823000','PLATINIUM (PT)','Sanket Ghodake','2023-08-25 15:35:18.823000','Sanket Ghodake','2023-08-25 15:35:18.823000','PLATINIUM (PT)',NULL,'','','A',''),('J00008','S STN','C00001','Sanket Ghodake','2023-08-25 15:39:23.371000','Synthetic Stones (S STN)','Sanket Ghodake','2023-08-25 15:39:23.371000','Sanket Ghodake','2023-08-25 15:39:23.371000','Synthetic Stones (S STN)',NULL,'','','A',''),('J00007','SANDEEP','C00001','Sanket Ghodake','2023-08-25 14:27:15.287000','','Sanket Ghodake','2023-08-25 14:27:15.287000','Sanket Ghodake','2023-08-25 14:27:15.287000','Sandeep',NULL,'','','A',''),('J00008','SC','C00001','Sanket Ghodake','2023-08-25 15:38:13.446000','SILVER CHAIN(SC)','Sanket Ghodake','2023-08-25 15:38:13.446000','Sanket Ghodake','2023-08-25 15:38:13.446000','SILVER CHAIN(SC)',NULL,'','','A',''),('J00007','SELDIR','C00001','Sanket Ghodake','2023-08-25 14:28:02.888000','','Sanket Ghodake','2023-08-25 14:28:02.888000','Sanket Ghodake','2023-08-25 14:28:02.888000','SELFDIRECT',NULL,'','','A',''),('J00007','SELF','C00001','Sanket Ghodake','2023-08-25 14:24:15.989000','','Sanket Ghodake','2023-08-25 14:24:15.989000','Sanket Ghodake','2023-08-25 14:24:15.989000','Self',NULL,'','','A',''),('J00008','SG','C00001','Sanket Ghodake','2023-08-25 15:38:28.717000','SILVER GRANULES( SG)','Sanket Ghodake','2023-08-25 15:38:28.717000','Sanket Ghodake','2023-08-25 15:38:28.717000','SILVER GRANULES( SG)',NULL,'','','A',''),('J00008','SGJ','C00001','Sanket Ghodake','2023-08-25 15:38:58.671000','STUDDED GOLD JEWELLERY (SGJ)','Sanket Ghodake','2023-08-25 15:38:58.671000','Sanket Ghodake','2023-08-25 15:38:58.671000','STUDDED GOLD JEWELLERY (SGJ)',NULL,'','','A',''),('J00007','SHRAIRCRG','C00001','Sanket Ghodake','2023-08-25 14:26:58.681000','','Sanket Ghodake','2023-08-25 14:26:58.681000','Sanket Ghodake','2023-08-25 14:26:58.681000','Shahar Air Cargo Agency',NULL,'','','A',''),('J00008','SLB','C00001','Sanket Ghodake','2023-08-25 15:37:52.234000','SILVER BAR (SLB)','Sanket Ghodake','2023-08-25 15:37:52.234000','Sanket Ghodake','2023-08-25 15:37:52.234000','SILVER BAR (SLB)',NULL,'','','A',''),('J00008','SLJ','C00001','Sanket Ghodake','2023-08-25 15:38:44.022000','SILVER JEWELLERY (SLJ)','Sanket Ghodake','2023-08-25 15:38:44.022000','Sanket Ghodake','2023-08-25 15:38:44.022000','SILVER JEWELLERY (SLJ)',NULL,'','','A',''),('J00008','SPD','C00001','Sanket Ghodake','2023-08-25 15:36:59.348000','SEMI POLISHED DIAMOND (SPD)','Sanket Ghodake','2023-08-25 15:36:59.348000','Sanket Ghodake','2023-08-25 15:36:59.348000','SEMI POLISHED DIAMOND (SPD)',NULL,'','','A',''),('J00008','SPS','C00001','Sanket Ghodake','2023-08-25 15:36:43.454000','SEMI POLISH STONES (SPS)','Sanket Ghodake','2023-08-25 15:36:43.454000','Sanket Ghodake','2023-08-25 15:36:43.454000','SEMI POLISH STONES (SPS)',NULL,'','','A',''),('J00007','SQL','C00001','Sanket Ghodake','2023-08-25 14:28:48.305000','','Sanket Ghodake','2023-08-25 14:28:48.305000','Sanket Ghodake','2023-08-25 14:28:48.305000','SEQUEL',NULL,'','','A',''),('J00007','UPS','C00001','Sanket Ghodake','2023-08-25 14:29:39.307000','','Sanket Ghodake','2023-08-25 14:29:39.307000','Sanket Ghodake','2023-08-25 14:29:39.307000','UPS',NULL,'','','A',''),('J00008','VAL-OTH','C00001','Sanket Ghodake','2023-08-25 15:39:40.011000','VAL OTHERS UNCLASSIFIED (VAL-OTH)','Sanket Ghodake','2023-08-25 15:39:40.011000','Sanket Ghodake','2023-08-25 15:39:40.011000','VAL OTHERS UNCLASSIFIED (VAL-OTH)',NULL,'','','A',''),('J00007','VISHBVC','C00001','Sanket Ghodake','2023-08-25 14:30:10.153000','','Sanket Ghodake','2023-08-25 14:30:10.153000','Sanket Ghodake','2023-08-25 14:30:10.153000','Vishal BVC',NULL,'','','A','');
/*!40000 ALTER TABLE `jar_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `party_id` varchar(6) NOT NULL,
  `address_1` varchar(35) NOT NULL,
  `address_2` varchar(35) DEFAULT NULL,
  `address_3` varchar(35) DEFAULT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `country` varchar(15) DEFAULT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `credit_limit` double DEFAULT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `entity_id` varchar(20) NOT NULL,
  `erp_code` varchar(15) DEFAULT NULL,
  `gst_no` varchar(30) NOT NULL,
  `iec_no` varchar(20) NOT NULL,
  `loa_expiry_date` datetime(6) NOT NULL,
  `loa_issue_date` datetime(6) NOT NULL,
  `loa_number` varchar(60) NOT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `pan_no` varchar(25) DEFAULT NULL,
  `party_code` varchar(15) DEFAULT NULL,
  `party_name` varchar(60) NOT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `pin` varchar(10) DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `status` varchar(1) NOT NULL,
  `unit_admin_name` varchar(60) NOT NULL,
  `unit_type` varchar(20) NOT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`party_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES ('','','M00014','128B','Near Jain Mandir','Hotgi Road','Sanket G','2023-08-11 13:27:35.081000','Mumbai','India','Sanket G','2023-08-11 13:27:35.081000',4535621,'','2023-08-28 11:48:53.054000','sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC743','2023-08-11 13:27:35.081000','2023-08-11 13:27:35.081000','3675','9834795651','CPVPG5490Q','34545','TCS','9096225561','413224','Maharashtra','E','Shivraj Gaikwad','Type 1'),('B00001','C00001','M00004','Hotgi Road','Kumathe','Hotgi Road','Sanket G','2023-08-09 17:28:34.199000','Mumbai','India','Sanket G','2023-08-09 17:28:34.199000',9090,'',NULL,'sanketghodake316@gmail.com','EUHHY566','413251','27FHFNFNHJ','FHNBC743','2023-08-09 17:28:34.199000','2023-08-09 17:28:34.199000','3675','9999999999','CPVPG5490Q','34545','ASHOK KUMAR GANDHI COMPANY','9999999999','413224','Maharashtra','A','Shivraj Gaikwad','Type 1'),('B00001','C00001','M00006','Hotgi Road','Kumathe','Hotgi Road','Sanket G','2023-08-09 17:29:55.872000','Mumbai','India','Sanket G','2023-08-09 17:29:55.872000',9090,'','2023-08-24 19:06:50.247000','sanketghodake316@gmail.com','EUHHY566','413251','27FHFNFNHJ','FHNBC7434','2023-08-09 17:29:55.872000','2023-08-09 17:29:55.872000','3675','9999999999','CPVPG5490Q','34545','RapportSoft Consultancy & Technology Pvt Ltd','9999999999','413224','Maharashtra','E','Shivraj Gaikwad','Type 2'),('B00001','C00001','M00011','128B','Near Jain Mandir','Hotgi Road','Sanket G','2023-08-09 22:06:14.686000','Mumbai','India','Sanket G','2023-08-09 22:06:14.686000',4535624,'',NULL,'sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC743','2023-08-09 22:06:14.686000','2023-08-09 22:06:14.686000','3675','9096225561','CPVPG5490Q','34545','Infosys','9096225561','413224','Maharashtra','A','Shivraj Gaikwad','Type 2'),('B00001','C00001','M00015','128B','Near Jain Mandir','Hotgi Road','Sanket','2023-08-18 11:15:38.438000','Mumbai','India','Sanket','2023-08-18 11:15:38.438000',4535624,'','2023-08-21 15:58:23.916000','sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC743','2023-08-18 11:15:38.438000','2023-08-18 11:15:38.438000','3675','9834795651','CPVPG5490Q','34545','Wipro','9096225561','413224','Maharashtra','A','Shivraj Gaikwad','Type 2'),('B00001','C00001','M00016','128B','Near Jain Mandir','Hotgi Road','Sanket','2023-08-21 12:25:51.364000','Mumbai','India','Sanket','2023-08-21 12:25:51.364000',4535624,'','2023-08-28 12:07:13.844000','sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC743','2023-08-21 12:25:51.364000','2023-08-21 12:25:51.364000','3675','9096225561','CPVPG5490Q','34545','All','9096225561','413224','Maharashtra','E','Shivraj Gaikwad','Type 2'),('B00001','C00001','M00017','138B','Near Jain Mandir','Hotgi Road','Sanket','2023-08-21 18:11:51.757000','Mumbai','India','Sanket','2023-08-21 18:11:51.757000',4535624,'','2023-08-21 18:12:10.913000','sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC743','2023-08-21 18:11:51.757000','2023-08-21 18:11:51.757000','3675','9096225561','CPVPG5490Q','34545','Apple','9096225561','413224','Maharashtra','E','Shivraj Gaikwad','Type 1'),('B00001','C00001','M00018','128C','Near Jain Mandir','Hotgi Road','Sanket','2023-08-21 18:21:40.754000','Mumbai','India','Sanket','2023-08-21 18:21:40.754000',4535624,'','2023-08-28 12:24:47.854000','sanketghodake316@gmail.com','EUHHY566','413224','27FHFNFNHJ','FHNBC74337575','2023-08-21 18:21:40.754000','2023-08-21 18:21:40.754000','3675','9096225561','CPVPG5490Q','34545','Akshay Electronics','9096225561','413224','Maharashtra','E','Shivraj Gaikwad','Type 2');
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_representative`
--

DROP TABLE IF EXISTS `party_representative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_representative` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `party_id` varchar(6) NOT NULL,
  `representative_id` varchar(6) NOT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `contact_name` varchar(30) NOT NULL,
  `contact_status` varchar(10) NOT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `image_path` tinytext NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `party_name` varchar(60) NOT NULL,
  `status` varchar(7) NOT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`party_id`,`representative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_representative`
--

LOCK TABLES `party_representative` WRITE;
/*!40000 ALTER TABLE `party_representative` DISABLE KEYS */;
/*!40000 ALTER TABLE `party_representative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pmenu`
--

DROP TABLE IF EXISTS `pmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pmenu` (
  `pmenu_id` varchar(5) NOT NULL,
  `child_menu_status` char(1) NOT NULL,
  `pmenu_name` varchar(30) NOT NULL,
  `page_status` char(1) NOT NULL,
  `parent_page_links` varchar(30) DEFAULT NULL,
  `picons` varchar(50) DEFAULT NULL,
  `tpmenu_id_tpmenu_id` varchar(5) DEFAULT NULL,
  `process_id` varchar(6) DEFAULT NULL,
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  PRIMARY KEY (`pmenu_id`),
  KEY `FKr7uklai2w5qelwjpyaokpieg5` (`tpmenu_id_tpmenu_id`),
  CONSTRAINT `FKr7uklai2w5qelwjpyaokpieg5` FOREIGN KEY (`tpmenu_id_tpmenu_id`) REFERENCES `tpmenu` (`tpmenu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pmenu`
--

LOCK TABLES `pmenu` WRITE;
/*!40000 ALTER TABLE `pmenu` DISABLE KEYS */;
INSERT INTO `pmenu` VALUES ('10001','N','Export','Y','/parent/export','bi bi-arrow-up-right-square-fill',NULL,'P00100','B00001','C00001'),('10002','N','Import','Y','/parent/import','bi bi-arrow-down-left-square-fill',NULL,'P00200','B00001','C00001'),('10003','N','Import Unidentified','Y','/parent/import-unidentified','bi bi-arrow-down-left-square-fill',NULL,'P00300','B00001','C00001'),('10004','N','Subcontract Export','Y','/parent/subcontract-export','bi bi-arrow-right-square',NULL,'P00400','B00001','C00001'),('10005','N','Subcontract Import','Y','/parent/subcontract-import','bi bi-arrow-left-square',NULL,'P00500','B00001','C00001'),('10006','Y','Gate Pass','N',NULL,'bi bi-person-check',NULL,'P00600','B00001','C00001'),('10007','Y','Scanning','N',NULL,'bi bi-qr-code-scan',NULL,'P00700','B00001','C00001'),('10008','N','Detention List','Y','/parent/detention-list','bi bi-card-list',NULL,'P00800','B00001','C00001'),('10009','N','Payments and Bill','Y','/parent/payment-bill','bi bi-credit-card',NULL,'P00900','B00001','C00001'),('10010','Y','Reports','N',NULL,'bi bi-graph-up-arrow',NULL,'P01000','B00001','C00001'),('10011','N','Rate Charts','Y','/parent/rate-chart','bi bi-clipboard-data',NULL,'P01100','B00001','C00001'),('10012','N','Holiday List','Y','/parent/holiday-list','bi bi-umbrella-fill',NULL,'P01200','B00001','C00001'),('10013','Y','Securities','N',NULL,'bi bi-shield-lock-fill',NULL,'P01300','B00001','C00001'),('10014','N','Manage External User','Y','/parent/manage-e-user','bi bi-person-video3',NULL,'P01400','B00001','C00001'),('10015','N','Manage Internal User','Y','/parent/manage-i-user','bi bi-person-workspace',NULL,'P01500','B00001','C00001'),('10016','N','Manage Party','Y','/parent/manage-party','bi bi-people-fill',NULL,'P01600','B00001','C00001'),('10017','Y','Master','N',NULL,'bi bi-menu-up',NULL,'P01700','B00001','C00001'),('10018','N','Representative Details','Y','/parent/representative-details','bi bi-people',NULL,'P01800','B00001','C00001');
/*!40000 ALTER TABLE `pmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pmenu_cm`
--

DROP TABLE IF EXISTS `pmenu_cm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pmenu_cm` (
  `parent_menu_pmenu_id` varchar(5) NOT NULL,
  `cm_child_menu_id` varchar(5) NOT NULL,
  UNIQUE KEY `UK_ir22fx7ndcgtnri2gxriskqwl` (`cm_child_menu_id`),
  KEY `FKs1c6c8r819ov7pfvcn4684qye` (`parent_menu_pmenu_id`),
  CONSTRAINT `FKfje3rxlckk1bn9h8p4a5tqcew` FOREIGN KEY (`cm_child_menu_id`) REFERENCES `cmenu` (`child_menu_id`),
  CONSTRAINT `FKs1c6c8r819ov7pfvcn4684qye` FOREIGN KEY (`parent_menu_pmenu_id`) REFERENCES `pmenu` (`pmenu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pmenu_cm`
--

LOCK TABLES `pmenu_cm` WRITE;
/*!40000 ALTER TABLE `pmenu_cm` DISABLE KEYS */;
/*!40000 ALTER TABLE `pmenu_cm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processnextid`
--

DROP TABLE IF EXISTS `processnextid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processnextid` (
  `fin_year` varchar(4) NOT NULL,
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `process_id` varchar(6) NOT NULL,
  `next_id` varchar(16) NOT NULL,
  PRIMARY KEY (`fin_year`,`branch_id`,`company_id`,`process_id`,`next_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processnextid`
--

LOCK TABLES `processnextid` WRITE;
/*!40000 ALTER TABLE `processnextid` DISABLE KEYS */;
INSERT INTO `processnextid` VALUES ('2006','B00001','C00001','P00001','JD0000'),('2006','B00037','C00001','P00011','M00026'),('2006','B00038','C00011','P00012','H00013'),('2007','B00001','C00001','P00015','IM000001'),('2007','B00001','C00001','P00016','IMPT0001'),('2007','B00039','C00012','P00013','S00010'),('2007','B00040','C00013','P00014','CFST000041'),('2007','B00090','C00090','P00009','MAIL000002'),('2009','B00099','C00099','P00099','R00000'),('2010','B00001','C00001','P00015','EX000000'),('2111','B00001','C00001','P00100','D-IM000007'),('2222','B00001','C00001','P00200','SIM00007');
/*!40000 ALTER TABLE `processnextid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `service_id` varchar(6) NOT NULL,
  `approved_by` varchar(15) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `discount_amt` varchar(1) DEFAULT NULL,
  `discount_days` varchar(1) DEFAULT NULL,
  `discount_percentage` varchar(1) DEFAULT NULL,
  `edited_by` varchar(15) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `rate_calculation` varchar(255) DEFAULT NULL,
  `sac_code` varchar(7) NOT NULL,
  `service_change_date` datetime(6) NOT NULL,
  `service_group` varchar(1) NOT NULL,
  `service_long_desc` varchar(150) NOT NULL,
  `service_new_desc` varchar(50) NOT NULL,
  `service_short_desc` varchar(75) NOT NULL,
  `service_type` varchar(15) NOT NULL,
  `service_unit` varchar(15) NOT NULL,
  `service_unit1` varchar(15) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `tax_applicable` varchar(1) NOT NULL,
  `tax_perc` varchar(6) NOT NULL,
  `type_of_charges` varchar(6) NOT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES ('B00001','C00001','S00004','Sanket Ghodake',NULL,'sads','2023-08-21 12:13:10.865000',NULL,NULL,NULL,NULL,'2023-08-26 15:57:02.620000','Plain','1234567','2023-08-26 15:57:02.620000','0','Custodian Charges Import','ServiceNewDescription','Custodian Charges Import','Rec','ACT','','A','N','','N'),('B00001','C00001','S00005','Sanket',NULL,'Sanket','2023-08-21 12:14:25.981000',NULL,NULL,NULL,NULL,'2023-08-21 12:14:27.805000','Slab','1234567','2023-08-21 12:14:27.805000','0','Holiday & Special Carting Charges','ServiceNewDescription','Holiday & Special Carting Charges','Rec','Quantity','','A','Y','12','N'),('B00001','C00001','S00006','Sanket',NULL,'Sanket','2023-08-21 12:15:10.251000',NULL,NULL,NULL,NULL,'2023-08-21 12:15:10.830000','Slab','1234567','2023-08-21 12:15:10.830000','0','Personal Carriage Charges','ServiceNewDescription','Personal Carriage Charges','Rec','Parcel','','A','Y','12','N'),('B00001','C00001','S00007','Sanket',NULL,'Sanket','2023-08-21 12:15:55.059000',NULL,NULL,NULL,NULL,'2023-08-21 12:15:55.750000','Slab','1234567','2023-08-21 12:15:55.750000','0','Demmurage Charges','ServiceNewDescription','Demmurage Charges','Rec','Per Day','','A','Y','12','N'),('B00001','C00001','S00008','Sanket',NULL,'Sanket','2023-08-21 12:16:19.531000',NULL,NULL,NULL,NULL,'2023-08-21 12:16:24.711000','Range','1234567','2023-08-21 12:16:24.711000','0','Heavy Parcel Rate','ServiceNewDescription','Heavy Parcel Rate','Rec','Per Kg','','A','Y','20','N'),('B00001','C00001','S00009','Sanket',NULL,'Sanket','2023-08-21 12:17:44.193000',NULL,NULL,NULL,NULL,'2023-08-21 12:17:45.192000','Plain','1234567','2023-08-21 12:17:45.192000','0','Custodian Charges Export','ServiceNewDescription','Custodian Charges Export','Rec','ACT','','A','N','','N'),('B00001','C00001','S00010','Sanket Ghodake',NULL,'Sanket Ghodake','2023-08-26 15:51:49.374000',NULL,NULL,NULL,NULL,'2023-08-26 16:11:04.007000','Range','123','2023-08-26 16:11:04.007000','0','12313','ServiceNewDescription','123','Rec','ACT','ACT','D','Y','5','N');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_details`
--

DROP TABLE IF EXISTS `shipping_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_details` (
  `serial_id` int NOT NULL AUTO_INCREMENT,
  `assessment_date` varchar(255) DEFAULT NULL,
  `cargo_details` varchar(255) DEFAULT NULL,
  `consignment_details` varchar(255) DEFAULT NULL,
  `country_of_destination` varchar(255) DEFAULT NULL,
  `custom_house_agent_name_code` varchar(255) DEFAULT NULL,
  `dc_office` varchar(255) DEFAULT NULL,
  `import_export_code` varchar(255) DEFAULT NULL,
  `net_realisable_value_in_rs` varchar(255) DEFAULT NULL,
  `port_of_destination` varchar(255) DEFAULT NULL,
  `port_of_loading` varchar(255) DEFAULT NULL,
  `request_details` varchar(255) DEFAULT NULL,
  `request_id` varchar(255) DEFAULT NULL,
  `request_status` varchar(255) DEFAULT NULL,
  `rotation_number_date` varchar(255) DEFAULT NULL,
  `sb_no_date` varchar(255) DEFAULT NULL,
  `sez_name` varchar(255) DEFAULT NULL,
  `sez_unit_developer_co_developer` varchar(255) DEFAULT NULL,
  `entity_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serial_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_details`
--

LOCK TABLES `shipping_details` WRITE;
/*!40000 ALTER TABLE `shipping_details` DISABLE KEYS */;
INSERT INTO `shipping_details` VALUES (1,'18-Jul-2023','Weight: 19500.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','Shivaay Jewels - AABCB7286RCH003','Kandla Special Economic Zone','ADMFS9785R','10708718.00','Groton','Mumbai (Ex Bombay)','SHIPPING BILL FOR OTHERS','252302666011','Let Export','','4005141, 17/07/2023','Surat Special Economic Zone','SHIVAAY JEWELS','7344'),(2,'27-Jun-2023','Weight: 1700.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','SELF','DC SEEPZ SEZ Mumbai','2796000079','6418027.00','New York','Mumbai (Ex Bombay)','SHIPPING BILL FOR OUTRIGHT SALE','252302394525','Allow Export','','4034523, 27/06/2023','SEEPZ Special Economic Zone','ELEGANT COLLECTION','155'),(3,'18-Jul-2023','Weight: 19500.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','Shivaay Jewels - AABCB7286RCH003','Kandla Special Economic Zone','ADMFS9785R','10708718.00','Groton','Mumbai (Ex Bombay)','SHIPPING BILL FOR OTHERS','252302666011','Let Export','','4005141, 17/07/2023','Surat Special Economic Zone','SHIVAAY JEWELS','7344'),(4,'27-Jun-2023','Weight: 1700.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','SELF','DC SEEPZ SEZ Mumbai','2796000079','6418027.00','New York','Mumbai (Ex Bombay)','SHIPPING BILL FOR OUTRIGHT SALE','252302394525','Allow Export','','4034523, 27/06/2023','SEEPZ Special Economic Zone','ELEGANT COLLECTION','155'),(5,'27-Jun-2023','Weight: 1700.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','SELF','DC SEEPZ SEZ Mumbai','2796000079','6418027.00','New York','Mumbai (Ex Bombay)','SHIPPING BILL FOR OUTRIGHT SALE','252302394525','Allow Export','','4034523, 27/06/2023','SEEPZ Special Economic Zone','ELEGANT COLLECTION','155'),(6,'27-Jun-2023','Weight: 1700.0000 GRAMS, Packets: 1 PACKAGES','','UNITED STATES','SELF','DC SEEPZ SEZ Mumbai','2796000079','6418027.00','New York','Mumbai (Ex Bombay)','SHIPPING BILL FOR OUTRIGHT SALE','252302394525','Allow Export','','4034523, 27/06/2023','SEEPZ Special Economic Zone','ELEGANT COLLECTION','155');
/*!40000 ALTER TABLE `shipping_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpmenu`
--

DROP TABLE IF EXISTS `tpmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpmenu` (
  `tpmenu_id` varchar(5) NOT NULL,
  `tpmenu_name` varchar(30) NOT NULL,
  PRIMARY KEY (`tpmenu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpmenu`
--

LOCK TABLES `tpmenu` WRITE;
/*!40000 ALTER TABLE `tpmenu` DISABLE KEYS */;
INSERT INTO `tpmenu` VALUES ('00000','Rapport');
/*!40000 ALTER TABLE `tpmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_creation`
--

DROP TABLE IF EXISTS `user_creation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_creation` (
  `user_id` varchar(255) NOT NULL,
  `branch_id` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `stop_trans` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_types` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_creation`
--

LOCK TABLES `user_creation` WRITE;
/*!40000 ALTER TABLE `user_creation` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_creation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `company_id` varchar(6) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `approved_by` varchar(30) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `branch_id` varchar(6) NOT NULL,
  `comments` varchar(150) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `edited_by` varchar(30) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `mapped_user` varchar(50) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `stop_trans` char(1) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `role` varchar(30) DEFAULT NULL,
  `user_type` varchar(200) NOT NULL,
  PRIMARY KEY (`company_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('C00001',' Akashpatil','Sanket Ghodake','2023-08-26 11:34:45.279000','B00001','','Sanket Ghodake','2023-08-26 11:34:45.279000',NULL,NULL,NULL,'D','N','akashpatil@gmail.com','Akashpatil','$2a$10$zKCE/j2Aj3t6D55mPSctiOhvg/Tdp6fOiIZqObXEpO9nUgaPAfqxW','ROLE_USER','Carting Agent'),('C00001','Ajit',NULL,'2023-08-18 16:26:21.936000','B00001','',NULL,'2023-08-18 16:26:21.936000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Ajit Pawar','$2a$12$hgK85Q.RvqhgWibuO1thgOY02u0yaA72eztexT0xzaOnZKFF8DrzK','ROLE_USER','Carting Agent'),('C00001','Akash','Sanket Ghodake','2023-08-25 16:17:12.494000','B00001','','Sanket Ghodake','2023-08-25 16:17:12.494000',NULL,NULL,NULL,'D','N','akash@gmail.com','Akash','$2a$10$QYzkLVWALzJl3eylHX5lKeBd6Y7nw5SUY9gr0jXpuha/5yF8LpQvu','ROLE_USER','CHA'),('C00001','Akashp','Sanket Ghodake','2023-08-25 17:39:19.852000','B00001','','Sanket Ghodake','2023-08-25 17:39:19.852000',NULL,NULL,NULL,'D','N','akashp@gmail.com','Akashp','$2a$10$j7KiAMfjHshkEajfueMB9eqwrFcIXtz9WP5amU95u71Krt.IEnTS.','ROLE_USER',''),('C00001','Akashpa','Sanket Ghodake','2023-08-25 17:55:26.355000','B00001','','Sanket Ghodake','2023-08-25 17:55:26.355000',NULL,NULL,NULL,'D','N','akashpa@gmail.com','Akashpa','$2a$10$u0zofbB8fjmv6/dT9OYfAeVDExgoq8C5jVMwvvl.4aDR7jEVZiVoi','ROLE_USER','Carting Agent'),('C00001','Akashpat','Sanket Ghodake','2023-08-25 18:33:47.514000','B00001','','Sanket Ghodake','2023-08-25 18:33:47.514000',NULL,NULL,NULL,'D','N','akashpat@gmail.com','Akashpat','$2a$10$Ntj0eX3dtvGgriu0/d3OZuwCLrWjxz539QO5EY1lHj2rJqDX.n1lm','ROLE_USER','Carting Agent'),('C00001','Akashpati','Sanket Ghodake','2023-08-25 18:38:12.048000','B00001','','Sanket Ghodake','2023-08-25 18:38:12.048000',NULL,NULL,NULL,'D','N','akashpati@gmail.com','Akashpati','$2a$10$tDCu6CD7/Nts7hmztUzgCuVm7AgIb1BNsSe07FEjGxcGH6..D0PmS','ROLE_USER','Carting Agent'),('C00001','Amit','Sanket','2023-08-19 01:14:12.851000','B00001','','Sanket','2023-08-19 01:14:12.851000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Amit Bhosale','$2a$12$7Dfx/FuE30S92BZiQy.J1Of96PBTrmx7xCkvrYHVONmkls/EM0S12','ROLE_USER','CHA'),('C00001','Aniket','Sanket G','2023-08-11 15:23:12.575000','B00001','','Sanket G','2023-08-11 15:23:12.575000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Aniket Bachute','$2a$10$nlilJ0XLUcTfhA8.aDEBDugLxwb7O.Vhzwqp2rVL0.umm59B4imae','ROLE_USER','Internal User'),('C00001','Aniketp',NULL,'2023-08-28 16:04:29.967000','B00001','',NULL,'2023-08-28 16:04:29.967000',NULL,NULL,NULL,'D','N','Aniketp@gmail.com','Aniketp','$2a$10$Bmky7FqA87Ah1tRSokGfuOfCAP/pK7dqg62fQ7Th0uE./QDQGS0o.','ROLE_USER','CHA'),('C00001','ewert',NULL,'2023-08-26 11:48:42.052000','B00001','',NULL,'2023-08-26 11:48:42.052000',NULL,NULL,NULL,'D','N','tytty@gmail.com','tytry','$2a$10$PQyefcxPltYJQOnsHnVy5uJMH86Ys.qjrQLnsdp.dyiNf/syVeneW','ROLE_USER','Carting Agent'),('C00001','Mahesh','Sanket','2023-08-17 13:40:55.718000','B00001','','Sanket','2023-08-17 13:40:55.718000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Mahesh','$2a$10$1CzQfwrLnSya6yGuuW5J.OjS0S8oTuH1CFVSIdtdy2tjAO1UGw2be','ROLE_USER','CHA'),('C00001','Rahul','Sanket','2023-08-19 01:25:41.772000','B00001','','Sanket','2023-08-19 01:25:41.772000',NULL,NULL,NULL,'D','N','sanketghodake316@gmail.com','Rahul Mule','$2a$10$m.tY8j1mzCg4kQE4VV/buufsGvOFUCFo1ZfsqJB7sG.T818xfcIGi','ROLE_USER','Carting Agent'),('C00001','Ravikiran','Sanket','2023-08-19 14:09:09.655000','B00001','','Sanket','2023-08-19 14:09:09.655000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Ravikiran Mhetre','$2a$10$IoFgl9oNdKmBoiIWVubLoePDLODRZc3cyJag6VL2tkhGSleCrK0J6','ROLE_USER','CHA'),('C00001','Rohan','Sanket','2023-08-19 01:27:23.606000','B00001','','Sanket','2023-08-19 01:27:23.606000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Rohan Pawar','$2a$10$W2yGRapLpKfc4q4MYs/WSOLAHkE6swOCPwEJ5GA0sq6E/Yl7h2tNW','ROLE_USER','CHA'),('C00001','Rohit','Sanket','2023-08-19 13:49:29.872000','B00001','','Sanket','2023-08-19 13:49:29.872000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Rohit Shingare','$2a$10$vzEQCyX8m1SL9mmrccRniO5OovHwL/cwbc/flW31Mk8O0r5BXhamu','ROLE_USER','CHA'),('C00001','Sam',NULL,'2023-08-26 12:00:59.562000','B00001','',NULL,'2023-08-26 12:00:59.562000',NULL,NULL,NULL,'D','N','sanketghodake316@gmail.com','Sam','$2a$10$XOHNbYly8sWHNRoI/1nNQ.fyDs3bWk2tC0DLyOJx.HwetFomaJERy','ROLE_USER','Carting Agent'),('C00001','Samarth','Sanket','2023-08-19 13:45:05.811000','B00001','','Sanket','2023-08-19 13:45:05.811000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Samarth Ghodake','$2a$10$LkSbKW8NYwde.k4pMZEV9.Fa5LcqZwmzTpU65H/9R3um3gSNGPoWq','ROLE_USER','Carting Agent'),('C00001','San',NULL,'2023-08-26 12:04:09.673000','B00001','',NULL,'2023-08-26 12:04:09.673000',NULL,NULL,NULL,'D','N','sanketghodake316@gmail.com','San','$2a$10$9NeqfaZqFQc61zxVHFoW6OHY7KCWG0CLvZ5nPF1/Zi9sSzbATW68q','ROLE_USER','Carting Agent'),('C00001','Sanket','Ronaldo','2023-08-03 18:17:40.455000','B00001',NULL,'Ronaldo','2000-12-13 14:29:23.000000',NULL,NULL,NULL,'A','N',NULL,'Sanket Ghodake','$2a$12$c./sUNEoWUlswghXnC5gm.dd8v3/1dRGt3Jp0COpZTQZoSabG7MNi','ROLE_ADMIN','Y'),('C00001','Shiv',NULL,'2023-08-18 12:07:36.518000','B00001','',NULL,'2023-08-18 12:07:36.518000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Shivshankar','$2a$10$fP62N6blUWMlPjkqJ3sofO7OsZCb0UfiIkOLpQxDZ/38DZM8C14K2','ROLE_USER','CHA'),('C00001','Shubham','Sanket G','2023-08-11 15:07:48.005000','B00001','','Sanket G','2023-08-11 15:07:48.005000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Shubham Deshmukh','$2a$10$Lg4BXLajp4cFHRcW2D1Q1eU69t9gFkJ1Vb8DVgWmz8oy8K8StyiTe','ROLE_USER','CHA'),('C00001','Sumit','Sanket','2023-08-18 19:08:01.559000','B00001','','Sanket','2023-08-18 19:08:01.559000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Sumit Dada','$2a$10$gMI0GBonA7kDBdZnve8nfOiy9wSOR/1cGs/szoOoPJ9HQmkpUS9WO','ROLE_USER','Consolidator'),('C00001','Sushant',NULL,'2023-08-18 11:58:56.999000','B00001','',NULL,'2023-08-18 11:58:56.999000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Sushant Mhetre','$2a$10$OJ.iLuevBge0PsH.uk5kke96F265FOk.LIEcJa4xYyH5zYf88PH0q','ROLE_USER','Consolidator'),('C00001','Tejas','Sanket','2023-08-19 12:15:23.935000','B00001','','Sanket','2023-08-19 12:15:23.935000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Tejas Sarade','$2a$12$FVJ1j6AXf3uxkNQ.18EeU.Ogvb4ltDAxCPfwXgNuJU9k5kVHBjLDW','ROLE_USER','CHA'),('C00001','Tuka',NULL,'2023-08-26 11:44:33.589000','B00001','',NULL,'2023-08-26 11:44:33.589000',NULL,NULL,NULL,'D','N','tuka@gmail.com','Tuka','$2a$10$Pxlgh9hb67GU.zkHyGcawO.MA.RZ8wJmr7NnGpsfnl/pMpoCNsowq','ROLE_USER','Carting Agent'),('C00001','Tukar',NULL,'2023-08-26 11:58:23.046000','B00001','',NULL,'2023-08-26 11:58:23.046000',NULL,NULL,NULL,'D','N','Tukar@gmail.com','Tukar','$2a$10$mWHFIDViRTt98oJb/NWbSOD5S1dC84rUPqo5aMvn8Ij9OyWUnfeSe','ROLE_USER','Carting Agent'),('C00001','Tukara',NULL,'2023-08-26 12:05:55.025000','B00001','',NULL,'2023-08-26 12:05:55.025000',NULL,NULL,NULL,'D','N','Tukara@gmail.com','Tukara','$2a$10$9kSAjQJDKKUJAT.erM1ONOgI7sVwSIX6n/al7VP5wNKjziT4rA7e6','ROLE_USER','Carting Agent'),('C00001','Tukaram','Sanket','2023-08-19 15:59:16.443000','B00001','','Sanket','2023-08-19 15:59:16.443000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Tukaram Gurav','$2a$10$s.hdYKiip18/Ue.gJlA1JORDGn8mz2lyBwQQQjUqO8072r37LI6Z2','ROLE_USER','Consolidator'),('C00001','Vaibhav','Sanket','2023-08-20 23:35:04.573000','B00001','','Sanket','2023-08-20 23:35:04.573000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Vaibhav Bachute','$2a$10$DMN3wOeuyraFM8w0l.9Wbu0JLmejpO2KmYLcHM1he6Pr73POMDKe.','ROLE_USER','Consolidator'),('C00001','Vaishnav','Sanket','2023-08-21 17:14:34.477000','B00001','','Sanket','2023-08-21 17:14:34.477000',NULL,NULL,NULL,'A','N','sanketghodake316@gmail.com','Vaishnav Bachute','$2a$10$NHudDJgCrv4.k/gCIiA9yOKfZpZ3UL1jwyOWL7XfSpF6EZN2jzTBG','ROLE_USER','CHA');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrights`
--

DROP TABLE IF EXISTS `userrights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrights` (
  `branch_id` varchar(6) NOT NULL,
  `company_id` varchar(6) NOT NULL,
  `process_id` varchar(6) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `allow_approve` varchar(1) DEFAULT NULL,
  `allow_close` varchar(1) DEFAULT NULL,
  `allow_create` varchar(1) DEFAULT NULL,
  `allow_delete` varchar(1) DEFAULT NULL,
  `allow_post` varchar(1) DEFAULT NULL,
  `allow_read` varchar(1) DEFAULT NULL,
  `allow_unclose` varchar(1) DEFAULT NULL,
  `allow_unpost` varchar(1) DEFAULT NULL,
  `allow_update` varchar(1) DEFAULT NULL,
  `approved_by` varchar(10) DEFAULT NULL,
  `approved_date` datetime(6) DEFAULT NULL,
  `created_by` varchar(10) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `edited_by` varchar(10) DEFAULT NULL,
  `edited_date` datetime(6) DEFAULT NULL,
  `favorite` varchar(1) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`branch_id`,`company_id`,`process_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrights`
--

LOCK TABLES `userrights` WRITE;
/*!40000 ALTER TABLE `userrights` DISABLE KEYS */;
INSERT INTO `userrights` VALUES ('B00001','C00001','P00100','Ajit','N',NULL,'N','N',NULL,'Y',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.659000','Sanket','2023-08-28 15:51:27.105000','Sanket','2023-08-28 15:51:51.900000',NULL,'A'),('B00001','C00001','P00100','Aniketp','N',NULL,'N','Y',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.746000','Sanket','2023-08-28 16:07:10.750000',NULL,NULL,NULL,'A'),('B00001','C00001','P00200','Ajit','N',NULL,'Y','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.671000','Sanket','2023-08-28 15:51:27.130000','Sanket','2023-08-28 15:51:51.930000',NULL,'A'),('B00001','C00001','P00200','Aniketp','N',NULL,'N','N',NULL,'Y',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.799000','Sanket','2023-08-28 16:07:10.768000',NULL,NULL,NULL,'A'),('B00001','C00001','P00300','Ajit','N',NULL,'Y','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.681000','Sanket','2023-08-28 15:51:27.144000','Sanket','2023-08-28 15:51:51.941000',NULL,'A'),('B00001','C00001','P00300','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.810000','Sanket','2023-08-28 16:07:10.780000',NULL,NULL,NULL,'A'),('B00001','C00001','P00400','Ajit','N',NULL,'Y','N',NULL,'N',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.691000','Sanket','2023-08-28 15:51:27.159000','Sanket','2023-08-28 15:51:51.951000',NULL,'A'),('B00001','C00001','P00400','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.821000','Sanket','2023-08-28 16:07:10.790000',NULL,NULL,NULL,'A'),('B00001','C00001','P00500','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.700000','Sanket','2023-08-28 15:51:27.173000',NULL,NULL,NULL,'A'),('B00001','C00001','P00500','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.841000','Sanket','2023-08-28 16:07:10.800000',NULL,NULL,NULL,'A'),('B00001','C00001','P00600','Ajit','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.711000','Sanket','2023-08-28 15:51:27.187000','Sanket','2023-08-28 15:51:51.965000',NULL,'A'),('B00001','C00001','P00600','Aniketp','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:10:30.854000','Sanket','2023-08-28 16:07:10.810000',NULL,NULL,NULL,'A'),('B00001','C00001','P00601','Ajit','N',NULL,'N','N',NULL,'Y',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.856000','Sanket','2023-08-28 15:51:27.388000',NULL,NULL,NULL,'A'),('B00001','C00001','P00601','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.996000','Sanket','2023-08-28 16:07:10.962000',NULL,NULL,NULL,'A'),('B00001','C00001','P00602','Ajit','N',NULL,'N','N',NULL,'Y',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.868000','Sanket','2023-08-28 15:51:27.405000',NULL,NULL,NULL,'A'),('B00001','C00001','P00602','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.006000','Sanket','2023-08-28 16:07:10.972000',NULL,NULL,NULL,'A'),('B00001','C00001','P00603','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.879000','Sanket','2023-08-28 15:51:27.419000',NULL,NULL,NULL,'A'),('B00001','C00001','P00603','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.016000','Sanket','2023-08-28 16:07:10.983000',NULL,NULL,NULL,'A'),('B00001','C00001','P00700','Ajit','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.721000','Sanket','2023-08-28 15:51:27.202000','Sanket','2023-08-28 15:51:51.977000',NULL,'A'),('B00001','C00001','P00700','Aniketp','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:10:30.869000','Sanket','2023-08-28 16:07:10.825000',NULL,NULL,NULL,'A'),('B00001','C00001','P00701','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.890000','Sanket','2023-08-28 15:51:27.433000',NULL,NULL,NULL,'A'),('B00001','C00001','P00701','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.027000','Sanket','2023-08-28 16:07:10.995000',NULL,NULL,NULL,'A'),('B00001','C00001','P00702','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.901000','Sanket','2023-08-28 15:51:27.445000',NULL,NULL,NULL,'A'),('B00001','C00001','P00702','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.037000','Sanket','2023-08-28 16:07:11.007000',NULL,NULL,NULL,'A'),('B00001','C00001','P00703','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.912000','Sanket','2023-08-28 15:51:27.459000',NULL,NULL,NULL,'A'),('B00001','C00001','P00703','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.047000','Sanket','2023-08-28 16:07:11.019000',NULL,NULL,NULL,'A'),('B00001','C00001','P00704','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.925000','Sanket','2023-08-28 15:51:27.473000',NULL,NULL,NULL,'A'),('B00001','C00001','P00704','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.057000','Sanket','2023-08-28 16:07:11.031000',NULL,NULL,NULL,'A'),('B00001','C00001','P00705','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.937000','Sanket','2023-08-28 15:51:27.494000',NULL,NULL,NULL,'A'),('B00001','C00001','P00705','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.066000','Sanket','2023-08-28 16:07:11.055000',NULL,NULL,NULL,'A'),('B00001','C00001','P00706','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.947000','Sanket','2023-08-28 15:51:27.505000',NULL,NULL,NULL,'A'),('B00001','C00001','P00706','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.076000','Sanket','2023-08-28 16:07:11.077000',NULL,NULL,NULL,'A'),('B00001','C00001','P00707','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.957000','Sanket','2023-08-28 15:51:27.519000',NULL,NULL,NULL,'A'),('B00001','C00001','P00707','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.086000','Sanket','2023-08-28 16:07:11.091000',NULL,NULL,NULL,'A'),('B00001','C00001','P00708','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.969000','Sanket','2023-08-28 15:51:27.532000',NULL,NULL,NULL,'A'),('B00001','C00001','P00708','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.096000','Sanket','2023-08-28 16:07:11.107000',NULL,NULL,NULL,'A'),('B00001','C00001','P00800','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.730000','Sanket','2023-08-28 15:51:27.219000',NULL,NULL,NULL,'A'),('B00001','C00001','P00800','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.879000','Sanket','2023-08-28 16:07:10.837000',NULL,NULL,NULL,'A'),('B00001','C00001','P00900','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.739000','Sanket','2023-08-28 15:51:27.239000',NULL,NULL,NULL,'A'),('B00001','C00001','P00900','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.889000','Sanket','2023-08-28 16:07:10.850000',NULL,NULL,NULL,'A'),('B00001','C00001','P01000','Ajit','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.749000','Sanket','2023-08-28 15:51:27.256000','Sanket','2023-08-28 15:51:51.998000',NULL,'A'),('B00001','C00001','P01000','Aniketp','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:10:30.900000','Sanket','2023-08-28 16:07:10.861000',NULL,NULL,NULL,'A'),('B00001','C00001','P01001','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.978000','Sanket','2023-08-28 15:51:27.544000',NULL,NULL,NULL,'A'),('B00001','C00001','P01001','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.106000','Sanket','2023-08-28 16:07:11.124000',NULL,NULL,NULL,'A'),('B00001','C00001','P01002','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.989000','Sanket','2023-08-28 15:51:27.559000',NULL,NULL,NULL,'A'),('B00001','C00001','P01002','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.115000','Sanket','2023-08-28 16:07:11.138000',NULL,NULL,NULL,'A'),('B00001','C00001','P01003','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.000000','Sanket','2023-08-28 15:51:27.571000',NULL,NULL,NULL,'A'),('B00001','C00001','P01003','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.125000','Sanket','2023-08-28 16:07:11.151000',NULL,NULL,NULL,'A'),('B00001','C00001','P01004','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.009000','Sanket','2023-08-28 15:51:27.583000',NULL,NULL,NULL,'A'),('B00001','C00001','P01004','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.135000','Sanket','2023-08-28 16:07:11.168000',NULL,NULL,NULL,'A'),('B00001','C00001','P01005','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.018000','Sanket','2023-08-28 15:51:27.597000',NULL,NULL,NULL,'A'),('B00001','C00001','P01005','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.145000','Sanket','2023-08-28 16:07:11.181000',NULL,NULL,NULL,'A'),('B00001','C00001','P01006','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.027000','Sanket','2023-08-28 15:51:27.611000',NULL,NULL,NULL,'A'),('B00001','C00001','P01006','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.154000','Sanket','2023-08-28 16:07:11.194000',NULL,NULL,NULL,'A'),('B00001','C00001','P01007','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.036000','Sanket','2023-08-28 15:51:27.626000',NULL,NULL,NULL,'A'),('B00001','C00001','P01007','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.162000','Sanket','2023-08-28 16:07:11.207000',NULL,NULL,NULL,'A'),('B00001','C00001','P01008','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.045000','Sanket','2023-08-28 15:51:27.640000',NULL,NULL,NULL,'A'),('B00001','C00001','P01008','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.171000','Sanket','2023-08-28 16:07:11.220000',NULL,NULL,NULL,'A'),('B00001','C00001','P01009','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.054000','Sanket','2023-08-28 15:51:27.653000',NULL,NULL,NULL,'A'),('B00001','C00001','P01009','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.180000','Sanket','2023-08-28 16:07:11.231000',NULL,NULL,NULL,'A'),('B00001','C00001','P01010','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.063000','Sanket','2023-08-28 15:51:27.665000',NULL,NULL,NULL,'A'),('B00001','C00001','P01010','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.188000','Sanket','2023-08-28 16:07:11.243000',NULL,NULL,NULL,'A'),('B00001','C00001','P01011','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.077000','Sanket','2023-08-28 15:51:27.679000',NULL,NULL,NULL,'A'),('B00001','C00001','P01011','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.198000','Sanket','2023-08-28 16:07:11.256000',NULL,NULL,NULL,'A'),('B00001','C00001','P01012','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.090000','Sanket','2023-08-28 15:51:27.689000',NULL,NULL,NULL,'A'),('B00001','C00001','P01012','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.205000','Sanket','2023-08-28 16:07:11.267000',NULL,NULL,NULL,'A'),('B00001','C00001','P01013','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.111000','Sanket','2023-08-28 15:51:27.702000',NULL,NULL,NULL,'A'),('B00001','C00001','P01013','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.215000','Sanket','2023-08-28 16:07:11.279000',NULL,NULL,NULL,'A'),('B00001','C00001','P01014','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.128000','Sanket','2023-08-28 15:51:27.713000',NULL,NULL,NULL,'A'),('B00001','C00001','P01014','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.223000','Sanket','2023-08-28 16:07:11.294000',NULL,NULL,NULL,'A'),('B00001','C00001','P01015','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.423000','Sanket','2023-08-28 15:51:27.799000',NULL,NULL,NULL,'A'),('B00001','C00001','P01015','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.290000','Sanket','2023-08-28 16:07:11.384000',NULL,NULL,NULL,'A'),('B00001','C00001','P01016','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.437000','Sanket','2023-08-28 15:51:27.811000',NULL,NULL,NULL,'A'),('B00001','C00001','P01016','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.299000','Sanket','2023-08-28 16:07:11.396000',NULL,NULL,NULL,'A'),('B00001','C00001','P01017','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.455000','Sanket','2023-08-28 15:51:27.824000',NULL,NULL,NULL,'A'),('B00001','C00001','P01017','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.310000','Sanket','2023-08-28 16:07:11.408000',NULL,NULL,NULL,'A'),('B00001','C00001','P01018','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.480000','Sanket','2023-08-28 15:51:27.838000',NULL,NULL,NULL,'A'),('B00001','C00001','P01018','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.319000','Sanket','2023-08-28 16:07:11.419000',NULL,NULL,NULL,'A'),('B00001','C00001','P01019','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.493000','Sanket','2023-08-28 15:51:27.850000',NULL,NULL,NULL,'A'),('B00001','C00001','P01019','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.330000','Sanket','2023-08-28 16:07:11.431000',NULL,NULL,NULL,'A'),('B00001','C00001','P01020','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.507000','Sanket','2023-08-28 15:51:27.862000',NULL,NULL,NULL,'A'),('B00001','C00001','P01020','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.340000','Sanket','2023-08-28 16:07:11.443000',NULL,NULL,NULL,'A'),('B00001','C00001','P01100','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.758000','Sanket','2023-08-28 15:51:27.271000',NULL,NULL,NULL,'A'),('B00001','C00001','P01100','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.911000','Sanket','2023-08-28 16:07:10.872000',NULL,NULL,NULL,'A'),('B00001','C00001','P01200','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.769000','Sanket','2023-08-28 15:51:27.285000',NULL,NULL,NULL,'A'),('B00001','C00001','P01200','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.922000','Sanket','2023-08-28 16:07:10.882000',NULL,NULL,NULL,'A'),('B00001','C00001','P01300','Ajit','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.779000','Sanket','2023-08-28 15:51:27.300000','Sanket','2023-08-28 15:51:52.015000',NULL,'A'),('B00001','C00001','P01300','Aniketp','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:10:30.932000','Sanket','2023-08-28 16:07:10.895000',NULL,NULL,NULL,'A'),('B00001','C00001','P01301','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.350000','Sanket','2023-08-28 15:51:27.725000',NULL,NULL,NULL,'A'),('B00001','C00001','P01301','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.233000','Sanket','2023-08-28 16:07:11.314000',NULL,NULL,NULL,'A'),('B00001','C00001','P01302','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.362000','Sanket','2023-08-28 15:51:27.737000',NULL,NULL,NULL,'A'),('B00001','C00001','P01302','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.241000','Sanket','2023-08-28 16:07:11.325000',NULL,NULL,NULL,'A'),('B00001','C00001','P01400','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.789000','Sanket','2023-08-28 15:51:27.314000',NULL,NULL,NULL,'A'),('B00001','C00001','P01400','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.941000','Sanket','2023-08-28 16:07:10.905000',NULL,NULL,NULL,'A'),('B00001','C00001','P01500','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.804000','Sanket','2023-08-28 15:51:27.329000',NULL,NULL,NULL,'A'),('B00001','C00001','P01500','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.953000','Sanket','2023-08-28 16:07:10.916000',NULL,NULL,NULL,'A'),('B00001','C00001','P01600','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.818000','Sanket','2023-08-28 15:51:27.344000',NULL,NULL,NULL,'A'),('B00001','C00001','P01600','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.964000','Sanket','2023-08-28 16:07:10.926000',NULL,NULL,NULL,'A'),('B00001','C00001','P01700','Ajit','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:02:04.832000','Sanket','2023-08-28 15:51:27.361000','Sanket','2023-08-28 15:51:52.041000',NULL,'A'),('B00001','C00001','P01700','Aniketp','Y',NULL,'Y','Y',NULL,'Y',NULL,NULL,'Y','Sanket','2023-08-28 16:10:30.975000','Sanket','2023-08-28 16:07:10.938000',NULL,NULL,NULL,'A'),('B00001','C00001','P01701','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.374000','Sanket','2023-08-28 15:51:27.749000',NULL,NULL,NULL,'A'),('B00001','C00001','P01701','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.250000','Sanket','2023-08-28 16:07:11.339000',NULL,NULL,NULL,'A'),('B00001','C00001','P01702','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.386000','Sanket','2023-08-28 15:51:27.761000',NULL,NULL,NULL,'A'),('B00001','C00001','P01702','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.260000','Sanket','2023-08-28 16:07:11.351000',NULL,NULL,NULL,'A'),('B00001','C00001','P01703','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.399000','Sanket','2023-08-28 15:51:27.772000',NULL,NULL,NULL,'A'),('B00001','C00001','P01703','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.270000','Sanket','2023-08-28 16:07:11.362000',NULL,NULL,NULL,'A'),('B00001','C00001','P01704','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.412000','Sanket','2023-08-28 15:51:27.786000',NULL,NULL,NULL,'A'),('B00001','C00001','P01704','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.280000','Sanket','2023-08-28 16:07:11.375000',NULL,NULL,NULL,'A'),('B00001','C00001','P01705','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:05.521000','Sanket','2023-08-28 15:51:27.882000',NULL,NULL,NULL,'A'),('B00001','C00001','P01705','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:31.351000','Sanket','2023-08-28 16:07:11.455000',NULL,NULL,NULL,'A'),('B00001','C00001','P01800','Ajit','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:02:04.846000','Sanket','2023-08-28 15:51:27.374000',NULL,NULL,NULL,'A'),('B00001','C00001','P01800','Aniketp','N',NULL,'N','N',NULL,'N',NULL,NULL,'N','Sanket','2023-08-28 16:10:30.985000','Sanket','2023-08-28 16:07:10.950000',NULL,NULL,NULL,'A');
/*!40000 ALTER TABLE `userrights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-31 18:16:04
