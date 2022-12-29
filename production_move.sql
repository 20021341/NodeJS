CREATE DATABASE  IF NOT EXISTS `production_move` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `production_move`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: production_move
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `bill_id` int NOT NULL,
  `product_id` varchar(45) DEFAULT NULL,
  `customer_id` varchar(45) DEFAULT NULL,
  `buy_date` date DEFAULT NULL,
  `buy_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `product_id` (`product_id`),
  KEY `customer_id` (`customer_id`),
  KEY `buy_at` (`buy_at`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`buy_at`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (15,'Alien37','20021343','2022-12-29','agent327'),(33,'ROG199','20021341','2022-01-04','agent327'),(260,'Alien441','20021343','2022-12-29','agent327'),(405,'ROG638','20021341','2022-01-25','agent327'),(456,'Alien402','20021342','2022-12-26','agent327'),(463,'Alien118','20021342','2022-12-26','agent327'),(637,'TUF651','20021341','2022-01-04','agent327'),(668,'Nitro590','20021341','2022-01-06','agent327'),(868,'Alpha889','20021341','2022-12-28','agent327'),(943,'Alien435','20021342','2022-12-26','agent327'),(1058,'Alien315','20021342','2022-12-26','agent327'),(1238,'Nitro310','20021341','2022-01-06','agent327'),(1269,'Alien162','20021342','2022-12-26','agent327'),(1368,'Alpha227','20021341','2022-12-28','agent327'),(1493,'Alpha684','20021341','2022-12-28','agent327'),(1630,'TUF742','20021341','2022-01-04','agent327'),(1837,'TUF339','20021341','2022-01-04','agent327'),(2045,'Alien307','20021342','2022-12-29','agent327'),(2054,'Alien113','20021342','2022-12-29','agent327'),(2076,'Alien241','20021342','2022-12-29','agent327'),(2133,'Alien148','20021342','2022-12-29','agent327'),(2203,'Alpha426','20021341','2022-02-25','agent327'),(2825,'TUF273','20021341','2022-02-25','agent327'),(2842,'Nitro465','20021341','2022-02-06','agent327'),(3046,'Nitro97','20021341','2022-02-06','agent327'),(3105,'Alien408','20021343','2022-12-29','agent327'),(3140,'Alpha356','20021341','2022-12-28','agent327'),(3181,'Nitro645','20021341','2022-02-06','agent327'),(3325,'Nitro775','20021341','2022-02-06','agent327'),(3349,'ROG621','20021341','2022-02-04','agent327'),(3497,'Nitro105','20021341','2022-03-06','agent327'),(3631,'Alien164','20021342','2022-12-29','agent327'),(3756,'TUF235','20021341','2022-03-24','agent327'),(3803,'Nitro636','20021341','2022-03-06','agent327'),(3868,'TUF354','20021342','2022-03-25','agent327'),(4137,'Nitro540','20021341','2022-03-06','agent327'),(4261,'Alien530','20021343','2022-12-29','agent327'),(4292,'Nitro74','20021341','2022-03-06','agent327'),(4415,'TUF487','20021341','2022-03-04','agent327'),(4456,'Alien14','20021342','2022-12-29','agent327'),(4465,'Alien41','20021342','2022-12-26','agent327'),(4468,'TUF240','20021341','2022-04-04','agent327'),(4621,'Alien472','20021342','2022-12-26','agent327'),(4657,'Alien106','20021342','2022-12-26','agent327'),(4816,'Alien492','20021342','2022-12-26','agent327'),(4854,'Nitro242','20021341','2022-04-06','agent327'),(5086,'ROG310','20021341','2022-04-04','agent327'),(5117,'Alpha613','20021341','2022-04-25','agent327'),(5176,'Alien144','20021342','2022-12-26','agent327'),(5297,'ROG392','20021341','2022-04-04','agent327'),(5420,'TUF248','20021341','2022-04-24','agent327'),(5657,'TUF299','20021341','2022-04-04','agent327'),(5729,'Alien34','20021343','2022-12-29','agent327'),(5876,'Alien53','20021343','2022-12-29','agent327'),(5921,'Zephyrus1','20021341','2022-12-26','agent327'),(6185,'Alien311','20021343','2022-12-29','agent327'),(6216,'Alien130','20021342','2022-12-29','agent327'),(6246,'Alien131','20021342','2022-12-26','agent327'),(6351,'Nitro899','20021341','2022-05-06','agent327'),(6364,'Alien303','20021342','2022-12-26','agent327'),(6520,'Nitro678','20021341','2022-05-06','agent327'),(6631,'Alpha391','20021341','2022-05-25','agent327'),(6790,'Alien506','20021342','2022-12-26','agent327'),(6869,'Alien411','20021342','2022-12-26','agent327'),(6938,'Alpha766','20021341','2022-05-25','agent327'),(7014,'Nitro345','20021341','2022-05-06','agent327'),(7203,'Alien527','20021343','2022-12-29','agent327'),(7322,'Nitro81','20021341','2022-05-06','agent327'),(7387,'Alpha790','20021341','2022-05-25','agent327'),(7476,'TUF280','20021341','2022-06-24','agent327'),(7487,'Alien256','20021342','2022-12-26','agent327'),(7530,'TUF821','20021341','2022-06-04','agent327'),(7734,'TUF133','20021341','2022-07-04','agent327'),(7784,'Alien349','20021342','2022-12-26','agent327'),(7968,'Nitro39','20021341','2022-07-06','agent327'),(8145,'Nitro185','20021341','2022-08-06','agent327'),(8337,'TUF667','20021341','2022-08-04','agent327'),(8372,'TUF635','20021341','2022-09-04','agent327'),(8394,'Alien261','20021342','2022-12-29','agent327'),(8626,'Alien189','20021342','2022-12-26','agent327'),(8755,'Nitro405','20021341','2022-09-06','agent327'),(8849,'Alien422','20021342','2022-12-26','agent327'),(8873,'Alien166','20021342','2022-12-26','agent327'),(8930,'TUF429','20021341','2022-10-04','agent327'),(9129,'Alpha941','20021341','2022-10-25','agent327'),(9263,'Alpha905','20021341','2022-11-25','agent327'),(9299,'Alien351','20021342','2022-12-26','agent327'),(9302,'Alien470','20021343','2022-12-29','agent327'),(9483,'Alien138','20021342','2022-12-29','agent327'),(9786,'Nitro996','20021341','2022-12-06','agent327'),(9822,'Alien101','20021342','2022-12-29','agent327'),(9971,'Zephyrus112','20021341','2022-12-26','agent327'),(9978,'Nitro880','20021341','2022-12-06','agent327'),(9986,'Alien344','20021343','2022-12-29','agent327');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` varchar(45) NOT NULL,
  `fullname` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('20021341','Do Hoang Ha','0343566921'),('20021342','Thân Hùng Cường','0343566921'),('20021343','Cao Xuân Tuyên','0343566921');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `facility_id` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `facility_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
INSERT INTO `facilities` VALUES ('admin','123456','BigCorp Headquarter',NULL,NULL,'admin'),('agent327','123456','BigCorp Agent Hai Phong','0343566921','Hai Phong','agent'),('agent403','123456','BigCorp Agent Bình Dương','0343566921','Bình Dương','agent'),('agent634','123456','BigCorp Agent TP.HCM','0343566921','TP  HCM','agent'),('agent692','123456','BigCorp Agent Ha Noi','0343566921','Ha Noi','agent'),('agent734','123456','BigCorp Agent An Giang','0343566921','An Giang','agent'),('center428','123456','BigCorp Maintainance Center Hai Phong','0343566921','Hai Phong','center'),('center760','123456','BigCorp Maintainance Center Bình Dương','0343566921','Bình Dương','center'),('center847','123456','BigCorp Maintainance Center Ha Noi','0343566921','Ha Noi','center'),('factory153','123456','BigCorp Factory Ha Noi','0343566921','Ha Noi','factory'),('factory391','123456','BigCorp Factory Binh Duong','0343566921','Bình Dương','factory'),('factory695','123456','BigCorp Factory Thai Binh','0343566921','Thái Bình','factory'),('factory749','123456','BigCorp Factory TP.HCM','0343566921','TP  HCM','factory'),('factory803','123456','BigCorp Factory Hai Phong','0343566921','Hai Phong','factory');
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `months`
--

DROP TABLE IF EXISTS `months`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `months` (
  `month` int NOT NULL,
  PRIMARY KEY (`month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `months`
--

LOCK TABLES `months` WRITE;
/*!40000 ALTER TABLE `months` DISABLE KEYS */;
INSERT INTO `months` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12);
/*!40000 ALTER TABLE `months` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_lines`
--

DROP TABLE IF EXISTS `product_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_lines` (
  `product_line` varchar(45) NOT NULL,
  `cpu` varchar(45) DEFAULT NULL,
  `gpu` varchar(45) DEFAULT NULL,
  `ram` varchar(45) DEFAULT NULL,
  `memory` varchar(45) DEFAULT NULL,
  `display` varchar(45) DEFAULT NULL,
  `warranty_period` int DEFAULT NULL,
  PRIMARY KEY (`product_line`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_lines`
--

LOCK TABLES `product_lines` WRITE;
/*!40000 ALTER TABLE `product_lines` DISABLE KEYS */;
INSERT INTO `product_lines` VALUES ('Alien','AMD Ryzen 5 6600H','NVIDIA GeForce RTX 2060','8GB DDR4 2933MHz','512 GB SSD NVMe PCIe','15.6\" FullHD (1920 x 1080) 144Hz',36),('Alpha','Ryzen 5 5600H','GTX 1650 4GB','8GB DDR4 3200MHz','512 GB SSD NVMe PCIe','15.6\" Full HD (1920 x 1080) 144Hz',36),('Nitro','Ryzen 5 5600H','GTX 1650 4GB','8GB DDR4 3200MHz','512 GB SSD NVMe PCIe','15.6\" Full HD (1920 x 1080) 144Hz',36),('ROG','Ryzen 7 4800H','GTX 1650 4GB','8GB DDR4 3200MHz','512 GB SSD NVMe PCIe','15.6\" Full HD (1920 x 1080) 144Hz',36),('TUF','i5 10300H','GTX 1650 4GB','8GB DDR4 2933MHz','512 GB SSD NVMe PCIe','15.6\" Full HD (1920 x 1080) 144Hz',36),('VipPro','Intel Core i9-12900H','NVIDIA GeForce RTX 3090 Ti','32GB DDR5 5200MHz','2TB GB SSD NVMe PCIe','15.6\" WQHD (2160 x 1350) 240Hz',36),('Zephyrus','Intel Core i9-12900HK','NVIDIA GeForce RTX 3090 Ti','32GB DDR5 6000MHz','2TB GB SSD NVMe PCIe','15.6\" WQHD (2160 x 1350) 240Hz',36);
/*!40000 ALTER TABLE `product_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` varchar(45) NOT NULL,
  `product_line` varchar(45) DEFAULT NULL,
  `manufacture_date` date DEFAULT NULL,
  `manufacture_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_line` (`product_line`),
  KEY `manufacture_at` (`manufacture_at`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_line`) REFERENCES `product_lines` (`product_line`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`manufacture_at`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('Alien101','Alien','2022-12-29','factory153'),('Alien106','Alien','2022-12-25','factory153'),('Alien113','Alien','2022-12-29','factory153'),('Alien118','Alien','2022-12-26','factory153'),('Alien126','Alien','2022-12-25','factory153'),('Alien130','Alien','2022-12-29','factory153'),('Alien131','Alien','2022-12-26','factory153'),('Alien138','Alien','2022-12-29','factory153'),('Alien14','Alien','2022-12-29','factory153'),('Alien144','Alien','2022-12-25','factory153'),('Alien145','Alien','2022-12-25','factory153'),('Alien148','Alien','2022-12-29','factory153'),('Alien150','Alien','2022-12-16','factory153'),('Alien162','Alien','2022-12-26','factory153'),('Alien164','Alien','2022-12-29','factory153'),('Alien166','Alien','2022-12-26','factory153'),('Alien185','Alien','2022-12-25','factory153'),('Alien189','Alien','2022-12-26','factory153'),('Alien241','Alien','2022-12-29','factory153'),('Alien250','Alien','2022-12-25','factory153'),('Alien256','Alien','2022-12-25','factory153'),('Alien261','Alien','2022-12-29','factory153'),('Alien277','Alien','2022-12-26','factory153'),('Alien3','Alien','2022-12-16','factory153'),('Alien303','Alien','2022-12-25','factory153'),('Alien307','Alien','2022-12-29','factory153'),('Alien311','Alien','2022-12-29','factory153'),('Alien315','Alien','2022-12-26','factory153'),('Alien32','Alien','2022-12-25','factory153'),('Alien33','Alien','2022-12-25','factory153'),('Alien34','Alien','2022-12-29','factory153'),('Alien344','Alien','2022-12-29','factory153'),('Alien349','Alien','2022-12-25','factory153'),('Alien351','Alien','2022-12-26','factory153'),('Alien354','Alien','2022-12-25','factory153'),('Alien37','Alien','2022-12-29','factory153'),('Alien371','Alien','2022-12-16','factory153'),('Alien380','Alien','2022-12-26','factory153'),('Alien402','Alien','2022-12-26','factory153'),('Alien408','Alien','2022-12-29','factory153'),('Alien41','Alien','2022-12-26','factory153'),('Alien411','Alien','2022-12-26','factory153'),('Alien422','Alien','2022-12-25','factory153'),('Alien435','Alien','2022-12-26','factory153'),('Alien441','Alien','2022-12-29','factory153'),('Alien462','Alien','2022-12-25','factory153'),('Alien470','Alien','2022-12-29','factory153'),('Alien472','Alien','2022-12-26','factory153'),('Alien484','Alien','2022-12-16','factory153'),('Alien492','Alien','2022-12-25','factory153'),('Alien503','Alien','2022-12-16','factory153'),('Alien506','Alien','2022-12-26','factory153'),('Alien508','Alien','2022-12-26','factory153'),('Alien514','Alien','2022-12-25','factory153'),('Alien527','Alien','2022-12-29','factory153'),('Alien53','Alien','2022-12-29','factory153'),('Alien530','Alien','2022-12-29','factory153'),('Alien532','Alien','2022-12-25','factory153'),('Alien539','Alien','2022-12-29','factory153'),('Alien591','Alien','2022-12-26','factory153'),('Alien606','Alien','2022-12-29','factory153'),('Alien616','Alien','2022-12-29','factory153'),('Alien627','Alien','2022-12-29','factory153'),('Alien633','Alien','2022-12-25','factory153'),('Alien634','Alien','2022-12-16','factory153'),('Alien648','Alien','2022-12-25','factory153'),('Alien650','Alien','2022-12-26','factory153'),('Alien652','Alien','2022-12-16','factory153'),('Alien658','Alien','2022-12-29','factory153'),('Alien661','Alien','2022-12-26','factory153'),('Alien671','Alien','2022-12-26','factory153'),('Alien675','Alien','2022-12-16','factory153'),('Alien677','Alien','2022-12-29','factory153'),('Alien679','Alien','2022-12-29','factory153'),('Alien690','Alien','2022-12-25','factory153'),('Alien692','Alien','2022-12-25','factory153'),('Alien705','Alien','2022-12-25','factory153'),('Alien709','Alien','2022-12-29','factory153'),('Alien714','Alien','2022-12-26','factory153'),('Alien73','Alien','2022-12-29','factory153'),('Alien737','Alien','2022-12-25','factory153'),('Alien741','Alien','2022-12-16','factory153'),('Alien743','Alien','2022-12-29','factory153'),('Alien744','Alien','2022-12-29','factory153'),('Alien746','Alien','2022-12-26','factory153'),('Alien753','Alien','2022-12-26','factory153'),('Alien759','Alien','2022-12-25','factory153'),('Alien763','Alien','2022-12-26','factory153'),('Alien773','Alien','2022-12-25','factory153'),('Alien786','Alien','2022-12-25','factory153'),('Alien787','Alien','2022-12-26','factory153'),('Alien789','Alien','2022-12-29','factory153'),('Alien822','Alien','2022-12-29','factory153'),('Alien828','Alien','2022-12-26','factory153'),('Alien833','Alien','2022-12-29','factory153'),('Alien847','Alien','2022-12-25','factory153'),('Alien849','Alien','2022-12-29','factory153'),('Alien860','Alien','2022-12-25','factory153'),('Alien866','Alien','2022-12-29','factory153'),('Alien87','Alien','2022-12-26','factory153'),('Alien875','Alien','2022-12-29','factory153'),('Alien881','Alien','2022-12-29','factory153'),('Alien887','Alien','2022-12-16','factory153'),('Alien902','Alien','2022-12-25','factory153'),('Alien912','Alien','2022-12-26','factory153'),('Alien916','Alien','2022-12-26','factory153'),('Alien919','Alien','2022-12-26','factory153'),('Alien924','Alien','2022-12-25','factory153'),('Alien929','Alien','2022-12-29','factory153'),('Alien934','Alien','2022-12-25','factory153'),('Alien94','Alien','2022-12-26','factory153'),('Alien953','Alien','2022-12-26','factory153'),('Alien964','Alien','2022-12-26','factory153'),('Alien981','Alien','2022-12-29','factory153'),('Alien990','Alien','2022-12-26','factory153'),('Alien994','Alien','2022-12-26','factory153'),('Alien997','Alien','2022-12-25','factory153'),('Alpha124','Alpha','2022-12-05','factory803'),('Alpha185','Alpha','2022-12-26','factory153'),('Alpha192','Alpha','2022-12-26','factory153'),('Alpha197','Alpha','2022-12-05','factory803'),('Alpha204','Alpha','2022-12-05','factory803'),('Alpha205','Alpha','2022-12-26','factory153'),('Alpha223','Alpha','2022-12-05','factory803'),('Alpha227','Alpha','2022-12-05','factory153'),('Alpha236','Alpha','2022-12-05','factory803'),('Alpha25','Alpha','2022-12-05','factory803'),('Alpha26','Alpha','2022-12-05','factory803'),('Alpha266','Alpha','2022-12-05','factory803'),('Alpha280','Alpha','2022-12-05','factory803'),('Alpha281','Alpha','2022-12-05','factory803'),('Alpha300','Alpha','2022-12-05','factory803'),('Alpha316','Alpha','2022-12-05','factory803'),('Alpha328','Alpha','2022-12-05','factory803'),('Alpha350','Alpha','2022-12-05','factory803'),('Alpha356','Alpha','2022-12-05','factory153'),('Alpha358','Alpha','2022-12-05','factory803'),('Alpha375','Alpha','2022-12-26','factory153'),('Alpha381','Alpha','2022-12-05','factory803'),('Alpha384','Alpha','2022-12-05','factory803'),('Alpha391','Alpha','2022-12-05','factory803'),('Alpha415','Alpha','2022-12-05','factory803'),('Alpha424','Alpha','2022-12-05','factory803'),('Alpha426','Alpha','2022-12-05','factory803'),('Alpha498','Alpha','2022-12-05','factory803'),('Alpha502','Alpha','2022-12-05','factory803'),('Alpha53','Alpha','2022-12-05','factory803'),('Alpha530','Alpha','2022-12-05','factory803'),('Alpha541','Alpha','2022-12-05','factory803'),('Alpha566','Alpha','2022-12-05','factory803'),('Alpha579','Alpha','2022-12-05','factory803'),('Alpha601','Alpha','2022-12-26','factory153'),('Alpha613','Alpha','2022-12-05','factory803'),('Alpha626','Alpha','2022-12-05','factory803'),('Alpha632','Alpha','2022-12-05','factory803'),('Alpha669','Alpha','2022-12-26','factory153'),('Alpha679','Alpha','2022-12-05','factory803'),('Alpha684','Alpha','2022-12-05','factory153'),('Alpha716','Alpha','2022-12-05','factory803'),('Alpha722','Alpha','2022-12-05','factory803'),('Alpha723','Alpha','2022-12-05','factory803'),('Alpha733','Alpha','2022-12-05','factory803'),('Alpha766','Alpha','2022-12-05','factory803'),('Alpha767','Alpha','2022-12-05','factory803'),('Alpha768','Alpha','2022-12-05','factory803'),('Alpha790','Alpha','2022-12-05','factory803'),('Alpha797','Alpha','2022-12-05','factory803'),('Alpha846','Alpha','2022-12-05','factory803'),('Alpha870','Alpha','2022-12-05','factory803'),('Alpha889','Alpha','2022-12-05','factory153'),('Alpha905','Alpha','2022-12-05','factory803'),('Alpha909','Alpha','2022-12-05','factory803'),('Alpha922','Alpha','2022-12-05','factory153'),('Alpha93','Alpha','2022-12-05','factory803'),('Alpha941','Alpha','2022-12-05','factory803'),('Alpha954','Alpha','2022-12-05','factory803'),('Alpha979','Alpha','2022-12-05','factory803'),('Alpha990','Alpha','2022-12-05','factory803'),('Nitro105','Nitro','2022-12-05','factory803'),('Nitro185','Nitro','2022-12-05','factory803'),('Nitro242','Nitro','2022-12-05','factory803'),('Nitro310','Nitro','2022-12-05','factory803'),('Nitro345','Nitro','2022-12-05','factory803'),('Nitro39','Nitro','2022-12-05','factory803'),('Nitro405','Nitro','2022-12-05','factory803'),('Nitro465','Nitro','2022-12-05','factory803'),('Nitro540','Nitro','2022-12-05','factory803'),('Nitro590','Nitro','2022-12-05','factory803'),('Nitro636','Nitro','2022-12-05','factory803'),('Nitro645','Nitro','2022-12-05','factory803'),('Nitro678','Nitro','2022-12-05','factory803'),('Nitro74','Nitro','2022-12-05','factory803'),('Nitro775','Nitro','2022-12-05','factory803'),('Nitro81','Nitro','2022-12-05','factory803'),('Nitro880','Nitro','2022-12-05','factory803'),('Nitro899','Nitro','2022-12-05','factory803'),('Nitro97','Nitro','2022-12-05','factory803'),('Nitro996','Nitro','2022-12-05','factory803'),('ROG111','ROG','2022-12-26','factory153'),('ROG119','ROG','2022-12-05','factory803'),('ROG125','ROG','2022-12-05','factory803'),('ROG130','ROG','2022-12-26','factory153'),('ROG160','ROG','2022-12-26','factory153'),('ROG183','ROG','2022-12-26','factory153'),('ROG193','ROG','2022-12-05','factory803'),('ROG195','ROG','2022-12-05','factory803'),('ROG199','ROG','2022-11-24','factory153'),('ROG218','ROG','2022-12-26','factory153'),('ROG223','ROG','2022-12-05','factory803'),('ROG286','ROG','2022-12-05','factory803'),('ROG310','ROG','2022-11-24','factory153'),('ROG332','ROG','2022-12-26','factory153'),('ROG337','ROG','2022-12-26','factory153'),('ROG348','ROG','2022-12-26','factory153'),('ROG355','ROG','2022-12-26','factory153'),('ROG373','ROG','2022-12-26','factory153'),('ROG38','ROG','2022-12-26','factory153'),('ROG392','ROG','2022-11-24','factory153'),('ROG400','ROG','2022-12-26','factory153'),('ROG408','ROG','2022-12-26','factory153'),('ROG42','ROG','2022-12-05','factory803'),('ROG43','ROG','2022-12-05','factory803'),('ROG477','ROG','2022-12-26','factory153'),('ROG536','ROG','2022-12-26','factory153'),('ROG543','ROG','2022-12-05','factory803'),('ROG544','ROG','2022-12-05','factory803'),('ROG578','ROG','2022-12-05','factory803'),('ROG591','ROG','2022-12-26','factory153'),('ROG610','ROG','2022-12-05','factory803'),('ROG619','ROG','2022-12-05','factory803'),('ROG621','ROG','2022-11-24','factory153'),('ROG623','ROG','2022-12-05','factory803'),('ROG638','ROG','2022-11-24','factory153'),('ROG680','ROG','2022-12-05','factory803'),('ROG688','ROG','2022-12-05','factory803'),('ROG692','ROG','2022-12-05','factory803'),('ROG744','ROG','2022-12-05','factory803'),('ROG760','ROG','2022-11-24','factory153'),('ROG790','ROG','2022-11-24','factory153'),('ROG796','ROG','2022-11-24','factory153'),('ROG828','ROG','2022-12-05','factory803'),('ROG830','ROG','2022-12-05','factory803'),('ROG862','ROG','2022-12-05','factory803'),('ROG88','ROG','2022-12-26','factory153'),('ROG887','ROG','2022-12-26','factory153'),('ROG888','ROG','2022-12-26','factory153'),('ROG918','ROG','2022-12-05','factory803'),('ROG922','ROG','2022-12-05','factory803'),('ROG95','ROG','2022-11-24','factory153'),('ROG959','ROG','2022-11-24','factory153'),('ROG97','ROG','2022-12-05','factory803'),('ROG983','ROG','2022-12-05','factory803'),('ROG991','ROG','2022-12-26','factory153'),('TUF133','TUF','2022-12-04','factory153'),('TUF146','TUF','2022-12-04','factory153'),('TUF15','TUF','2022-12-05','factory803'),('TUF206','TUF','2022-12-04','factory153'),('TUF235','TUF','2022-11-24','factory153'),('TUF240','TUF','2022-12-04','factory153'),('TUF248','TUF','2022-11-24','factory153'),('TUF273','TUF','2022-12-04','factory153'),('TUF280','TUF','2022-11-24','factory153'),('TUF281','TUF','2022-12-04','factory153'),('TUF299','TUF','2022-11-24','factory153'),('TUF339','TUF','2022-12-04','factory153'),('TUF354','TUF','2022-11-24','factory153'),('TUF370','TUF','2022-11-24','factory153'),('TUF40','TUF','2022-12-04','factory153'),('TUF421','TUF','2022-12-04','factory153'),('TUF429','TUF','2022-12-04','factory153'),('TUF487','TUF','2022-12-04','factory153'),('TUF504','TUF','2022-11-24','factory153'),('TUF536','TUF','2022-12-05','factory803'),('TUF635','TUF','2022-12-04','factory153'),('TUF651','TUF','2022-12-04','factory153'),('TUF654','TUF','2022-11-24','factory153'),('TUF667','TUF','2022-12-04','factory153'),('TUF742','TUF','2022-12-04','factory153'),('TUF751','TUF','2022-11-24','factory153'),('TUF783','TUF','2022-12-04','factory153'),('TUF784','TUF','2022-12-04','factory153'),('TUF8','TUF','2022-12-05','factory803'),('TUF817','TUF','2022-12-05','factory803'),('TUF821','TUF','2022-12-04','factory153'),('TUF849','TUF','2022-11-24','factory153'),('TUF865','TUF','2022-12-05','factory803'),('TUF950','TUF','2022-12-04','factory153'),('TUF975','TUF','2022-12-04','factory153'),('Zephyrus1','Zephyrus','2022-12-26','factory153'),('Zephyrus112','Zephyrus','2022-12-26','factory153'),('Zephyrus120','Zephyrus','2022-12-26','factory153'),('Zephyrus14','Zephyrus','2022-12-26','factory153'),('Zephyrus262','Zephyrus','2022-12-26','factory153'),('Zephyrus266','Zephyrus','2022-12-26','factory153'),('Zephyrus324','Zephyrus','2022-12-26','factory153'),('Zephyrus362','Zephyrus','2022-12-26','factory153'),('Zephyrus427','Zephyrus','2022-12-26','factory153'),('Zephyrus48','Zephyrus','2022-12-26','factory153'),('Zephyrus522','Zephyrus','2022-12-26','factory153'),('Zephyrus567','Zephyrus','2022-12-26','factory153'),('Zephyrus596','Zephyrus','2022-12-26','factory153'),('Zephyrus672','Zephyrus','2022-12-26','factory153'),('Zephyrus733','Zephyrus','2022-12-26','factory153'),('Zephyrus751','Zephyrus','2022-12-26','factory153'),('Zephyrus843','Zephyrus','2022-12-26','factory153'),('Zephyrus869','Zephyrus','2022-12-26','factory153'),('Zephyrus955','Zephyrus','2022-12-26','factory153'),('Zephyrus984','Zephyrus','2022-12-26','factory153');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_track`
--

DROP TABLE IF EXISTS `products_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_track` (
  `product_id` varchar(45) NOT NULL,
  `current_at` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `current_at` (`current_at`),
  KEY `owner` (`owner`),
  CONSTRAINT `products_track_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_track_ibfk_2` FOREIGN KEY (`current_at`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_track_ibfk_3` FOREIGN KEY (`owner`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_track`
--

LOCK TABLES `products_track` WRITE;
/*!40000 ALTER TABLE `products_track` DISABLE KEYS */;
INSERT INTO `products_track` VALUES ('Alien101','agent327','20021342','Waiting to deliver'),('Alien106','agent327','20021342','Repair done'),('Alien113',NULL,'20021342','Defective'),('Alien118','factory153','20021342','Recycled'),('Alien126','factory153',NULL,'Recycled'),('Alien130',NULL,'20021342','Defective'),('Alien131','factory153','20021342','Recycled'),('Alien138',NULL,'20021342','Defective'),('Alien14',NULL,'20021342','Defective'),('Alien144','agent327','20021342','Repair done'),('Alien145','factory153',NULL,'Recycled'),('Alien148',NULL,'20021342','Defective'),('Alien150','factory153',NULL,'Recycled'),('Alien162','agent327','20021342','Repair done'),('Alien164',NULL,'20021342','Defective'),('Alien166','agent327','20021342','Repair done'),('Alien185','factory153',NULL,'Recycled'),('Alien189','agent327','20021342','Repair done'),('Alien241',NULL,'20021342','Defective'),('Alien250','factory153',NULL,'Recycled'),('Alien256','agent327','20021342','Repair done'),('Alien261',NULL,'20021342','Defective'),('Alien277','factory153',NULL,'Recycled'),('Alien3','factory153',NULL,'Recycled'),('Alien303','agent327','20021342','Repair done'),('Alien307',NULL,'20021342','Defective'),('Alien311',NULL,'20021343','Defective'),('Alien315','agent327','20021342','Repair done'),('Alien32','factory153',NULL,'Recycled'),('Alien33','factory153',NULL,'Recycled'),('Alien34',NULL,'20021343','Defective'),('Alien344',NULL,'20021343','Defective'),('Alien349','factory153','20021342','Recycled'),('Alien351','agent327','20021342','Repair done'),('Alien354','factory153',NULL,'Recycled'),('Alien37',NULL,'20021343','Defective'),('Alien371','factory153',NULL,'Recycled'),('Alien380','factory153',NULL,'Recycled'),('Alien402','agent327','20021342','Repair done'),('Alien408',NULL,'20021343','Defective'),('Alien41','factory153','20021342','Recycled'),('Alien411','agent327','20021342','Repair done'),('Alien422','factory153','20021342','Recycled'),('Alien435','agent327','20021342','Repair done'),('Alien441',NULL,'20021343','Defective'),('Alien462','factory153',NULL,'Recycled'),('Alien470',NULL,'20021343','Defective'),('Alien472','agent327','20021342','Repair done'),('Alien484','factory153',NULL,'Recycled'),('Alien492',NULL,'20021342','Defective'),('Alien503','factory153',NULL,'Recycled'),('Alien506',NULL,'20021342','Defective'),('Alien508','center760',NULL,'Repairing'),('Alien514','center760',NULL,'Repairing'),('Alien527',NULL,'20021343','Defective'),('Alien53',NULL,'20021343','Defective'),('Alien530',NULL,'20021343','Defective'),('Alien532','factory153',NULL,'Recycled'),('Alien539','agent327',NULL,'Ready to sell'),('Alien591','agent327',NULL,'Ready to sell'),('Alien606','agent327',NULL,'Ready to sell'),('Alien616','factory153',NULL,'Recycled'),('Alien627','factory153',NULL,'Recycled'),('Alien633','center760',NULL,'Repairing'),('Alien634','factory153',NULL,'Recycled'),('Alien648','factory153',NULL,'Recycled'),('Alien650','center760',NULL,'Repairing'),('Alien652','factory153',NULL,'Recycled'),('Alien658','agent327',NULL,'Ready to sell'),('Alien661','center760',NULL,'Repairing'),('Alien671','center760',NULL,'Repairing'),('Alien675','factory153',NULL,'Recycled'),('Alien677','agent327',NULL,'Ready to sell'),('Alien679','factory153',NULL,'Recycled'),('Alien690','factory153',NULL,'Recycled'),('Alien692','factory153',NULL,'Recycled'),('Alien705','factory153',NULL,'Recycled'),('Alien709','agent327',NULL,'Ready to sell'),('Alien714','center760',NULL,'Repairing'),('Alien73','agent327',NULL,'Ready to sell'),('Alien737','factory153',NULL,'Recycled'),('Alien741','factory153',NULL,'Recycled'),('Alien743','agent327',NULL,'Ready to sell'),('Alien744','agent327',NULL,'Ready to sell'),('Alien746','center760',NULL,'Repairing'),('Alien753','center760',NULL,'Repairing'),('Alien759','center760',NULL,'Repairing'),('Alien763','center760',NULL,'Repairing'),('Alien773','factory153',NULL,'Recycled'),('Alien786','factory153',NULL,'Recycled'),('Alien787','center760',NULL,'Repairing'),('Alien789','agent327',NULL,'Ready to sell'),('Alien822','factory153',NULL,'Recycled'),('Alien828','center760',NULL,'Repairing'),('Alien833','agent327',NULL,'Ready to sell'),('Alien847','center760',NULL,'Repairing'),('Alien849','factory153',NULL,'Recycled'),('Alien860','factory153',NULL,'Recycled'),('Alien866','factory153',NULL,'Recycled'),('Alien87','center760',NULL,'Repairing'),('Alien875','factory153',NULL,'Recycled'),('Alien881','agent327',NULL,'Ready to sell'),('Alien887','center760',NULL,'Repairing'),('Alien902','center760',NULL,'Repairing'),('Alien912','center760',NULL,'Repairing'),('Alien916','center760',NULL,'Repairing'),('Alien919','center760',NULL,'Repairing'),('Alien924','factory153',NULL,'Recycled'),('Alien929','agent327',NULL,'Ready to sell'),('Alien934','center760',NULL,'Repairing'),('Alien94','factory153',NULL,'Recycled'),('Alien953','center760',NULL,'Repairing'),('Alien964','factory153',NULL,'Recycled'),('Alien981','factory153',NULL,'Recycled'),('Alien990','center760',NULL,'Repairing'),('Alien994','center760',NULL,'Repairing'),('Alien997','factory153',NULL,'Recycled'),('Alpha124','factory803',NULL,'Recycled'),('Alpha185','factory153',NULL,'Recycled'),('Alpha192','factory153',NULL,'Ready to deliver'),('Alpha197','factory803',NULL,'Recycled'),('Alpha204','factory803',NULL,'Ready to deliver'),('Alpha205','factory153',NULL,'Ready to deliver'),('Alpha223','factory803',NULL,'Ready to deliver'),('Alpha227','center760','20021341','Repairing'),('Alpha236','factory803',NULL,'Ready to deliver'),('Alpha25','factory803',NULL,'Recycled'),('Alpha26','factory803',NULL,'Ready to deliver'),('Alpha266','factory803',NULL,'Recycled'),('Alpha280','factory803',NULL,'Recycled'),('Alpha281','factory803',NULL,'Recycled'),('Alpha300','factory803',NULL,'Recycled'),('Alpha316','factory803',NULL,'Recycled'),('Alpha328','factory803',NULL,'Recycled'),('Alpha356','factory153','20021341','Recycled'),('Alpha358','factory803',NULL,'Recycled'),('Alpha375','factory153',NULL,'Recycled'),('Alpha381','factory803',NULL,'Recycled'),('Alpha391','factory803','20021341','Need to be recycled'),('Alpha415','factory803',NULL,'Recycled'),('Alpha424','factory803',NULL,'Recycled'),('Alpha426','agent327','20021341','Repair done'),('Alpha498','factory803',NULL,'Recycled'),('Alpha502','factory803',NULL,'Ready to deliver'),('Alpha53','factory803',NULL,'Recycled'),('Alpha530','factory803',NULL,'Recycled'),('Alpha541','factory803',NULL,'Recycled'),('Alpha566','factory803',NULL,'Recycled'),('Alpha579','factory803',NULL,'Recycled'),('Alpha601','factory153',NULL,'Ready to deliver'),('Alpha613','factory803','20021341','Need to be recycled'),('Alpha626','factory803',NULL,'Ready to deliver'),('Alpha632','factory803',NULL,'Ready to deliver'),('Alpha669','factory153',NULL,'Recycled'),('Alpha679','factory803',NULL,'Recycled'),('Alpha684','agent327','20021341','Repair done'),('Alpha716','factory803',NULL,'Recycled'),('Alpha722','factory803',NULL,'Ready to deliver'),('Alpha723','factory803',NULL,'Recycled'),('Alpha733','factory803',NULL,'Recycled'),('Alpha766','agent327','20021341','Repair done'),('Alpha767','factory803',NULL,'Recycled'),('Alpha768','factory803',NULL,'Recycled'),('Alpha790','factory803','20021341','Need to be recycled'),('Alpha797','factory803',NULL,'Ready to deliver'),('Alpha846','factory803',NULL,'Ready to deliver'),('Alpha870','factory803',NULL,'Recycled'),('Alpha889',NULL,'20021341','Defective'),('Alpha905','agent327','20021341','Repair done'),('Alpha909','factory803',NULL,'Recycled'),('Alpha922','factory153',NULL,'Recycled'),('Alpha93','factory803',NULL,'Recycled'),('Alpha941','agent327','20021341','Repair done'),('Alpha954','factory803',NULL,'Ready to deliver'),('Alpha979','factory803',NULL,'Recycled'),('Alpha990','factory803',NULL,'Ready to deliver'),('Nitro105','factory803','20021341','Need to be recycled'),('Nitro185','factory803','20021341','Need to be recycled'),('Nitro242','center760','20021341','Repairing'),('Nitro310','factory803','20021341','Need to be recycled'),('Nitro345','agent327','20021341','Repair done'),('Nitro39','center760','20021341','Repairing'),('Nitro405','factory803','20021341','Need to be recycled'),('Nitro465','agent327','20021341','Repair done'),('Nitro540','factory803','20021341','Need to be recycled'),('Nitro590','agent327','20021341','Repair done'),('Nitro636','agent327','20021341','Repair done'),('Nitro645','factory803','20021341','Need to be recycled'),('Nitro678','center760','20021341','Repairing'),('Nitro74','agent327','20021341','Repair done'),('Nitro775','agent327','20021341','Repair done'),('Nitro81','agent327','20021341','Repair done'),('Nitro880','agent327','20021341','Repair done'),('Nitro899','agent327','20021341','Repair done'),('Nitro97','center760','20021341','Repairing'),('Nitro996','agent327','20021341','Repair done'),('ROG111','center760',NULL,'Repairing'),('ROG119','factory803',NULL,'Recycled'),('ROG125','factory803',NULL,'Recycled'),('ROG130','center760',NULL,'Repairing'),('ROG160','center760',NULL,'Repairing'),('ROG183','center760',NULL,'Repairing'),('ROG193','factory803',NULL,'Recycled'),('ROG195','factory803',NULL,'Recycled'),('ROG199','factory153','20021341','Recycled'),('ROG218','center760',NULL,'Repairing'),('ROG223','factory803',NULL,'Recycled'),('ROG286','factory803',NULL,'Recycled'),('ROG310','agent327','20021341','Repair done'),('ROG332','center760',NULL,'Repairing'),('ROG337','center760',NULL,'Repairing'),('ROG348','center760',NULL,'Repairing'),('ROG355','center760',NULL,'Repairing'),('ROG373','center760',NULL,'Repairing'),('ROG38','center760',NULL,'Repairing'),('ROG392','agent327','20021341','Repair done'),('ROG400','center760',NULL,'Repairing'),('ROG408','center760',NULL,'Repairing'),('ROG42','factory803',NULL,'Recycled'),('ROG43','factory803',NULL,'Recycled'),('ROG477','center760',NULL,'Repairing'),('ROG536','center760',NULL,'Repairing'),('ROG543','factory803',NULL,'Recycled'),('ROG544','factory803',NULL,'Recycled'),('ROG578','factory803',NULL,'Recycled'),('ROG591','center760',NULL,'Repairing'),('ROG610','factory803',NULL,'Recycled'),('ROG619','factory803',NULL,'Recycled'),('ROG621','agent327','20021341','Repair done'),('ROG623','factory803',NULL,'Recycled'),('ROG638','factory153','20021341','Recycled'),('ROG680','factory803',NULL,'Recycled'),('ROG688','factory803',NULL,'Recycled'),('ROG692','factory803',NULL,'Recycled'),('ROG744','factory803',NULL,'Recycled'),('ROG760','center760',NULL,'Repairing'),('ROG790','factory153',NULL,'Recycled'),('ROG796','center760',NULL,'Repairing'),('ROG828','factory803',NULL,'Recycled'),('ROG830','factory803',NULL,'Recycled'),('ROG862','factory803',NULL,'Recycled'),('ROG88','center760',NULL,'Repairing'),('ROG887','center760',NULL,'Repairing'),('ROG888','factory153',NULL,'Ready to deliver'),('ROG918','factory803',NULL,'Recycled'),('ROG922','factory803',NULL,'Recycled'),('ROG95','factory153',NULL,'Recycled'),('ROG959','factory153',NULL,'Recycled'),('ROG97','factory803',NULL,'Recycled'),('ROG983','factory803',NULL,'Recycled'),('ROG991','factory153',NULL,'Recycled'),('TUF133','agent327','20021341','Repair done'),('TUF146','factory153',NULL,'Recycled'),('TUF15','factory803',NULL,'Ready to deliver'),('TUF206','factory153',NULL,'Recycled'),('TUF235','agent327','20021341','Repair done'),('TUF240','factory153','20021341','Recycled'),('TUF248','agent327','20021341','Repair done'),('TUF273','factory153','20021341','Recycled'),('TUF280','agent327','20021341','Repair done'),('TUF281','factory153',NULL,'Recycled'),('TUF299','factory153','20021341','Recycled'),('TUF339','agent327','20021341','Repair done'),('TUF354',NULL,'20021342','Defective'),('TUF370','agent327',NULL,'Ready to sell'),('TUF40','factory153',NULL,'Recycled'),('TUF421','agent327',NULL,'Ready to sell'),('TUF429','factory153','20021341','Recycled'),('TUF487','agent327','20021341','Repair done'),('TUF504','factory153',NULL,'Recycled'),('TUF536','factory803',NULL,'Recycled'),('TUF635','agent327','20021341','Repair done'),('TUF651','factory153','20021341','Recycled'),('TUF654','agent327',NULL,'Ready to sell'),('TUF667','agent327','20021341','Repair done'),('TUF742','agent327','20021341','Repair done'),('TUF751','factory153',NULL,'Recycled'),('TUF783','factory153',NULL,'Recycled'),('TUF784','factory153',NULL,'Recycled'),('TUF8','factory803',NULL,'Ready to deliver'),('TUF817','factory803',NULL,'Recycled'),('TUF821','agent327','20021341','Repair done'),('TUF849','factory153',NULL,'Recycled'),('TUF865','factory803',NULL,'Ready to deliver'),('TUF950','factory153',NULL,'Recycled'),('TUF975','agent327',NULL,'Ready to sell'),('Zephyrus1','agent327','20021341','Repair done'),('Zephyrus112','agent327','20021341','Repair done'),('Zephyrus120','agent327',NULL,'Ready to sell'),('Zephyrus14','agent327',NULL,'Ready to sell'),('Zephyrus262','agent327',NULL,'Ready to sell'),('Zephyrus266','factory153',NULL,'Recycled'),('Zephyrus324','agent327',NULL,'Ready to sell'),('Zephyrus362','agent327',NULL,'Ready to sell'),('Zephyrus427','factory153',NULL,'Recycled'),('Zephyrus48','factory153',NULL,'Recycled'),('Zephyrus522','agent327',NULL,'Ready to sell'),('Zephyrus567','agent327',NULL,'Ready to sell'),('Zephyrus596','factory153',NULL,'Recycled'),('Zephyrus672','factory153',NULL,'Recycled'),('Zephyrus733','factory153',NULL,'Recycled'),('Zephyrus751','factory153',NULL,'Recycled'),('Zephyrus843','agent327',NULL,'Ready to sell'),('Zephyrus869','factory153',NULL,'Recycled'),('Zephyrus955','agent327',NULL,'Ready to sell'),('Zephyrus984','factory153',NULL,'Recycled');
/*!40000 ALTER TABLE `products_track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warranty_cards`
--

DROP TABLE IF EXISTS `warranty_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warranty_cards` (
  `card_id` int NOT NULL,
  `product_id` varchar(45) DEFAULT NULL,
  `create_at` varchar(45) DEFAULT NULL,
  `maintain_at` varchar(45) DEFAULT NULL,
  `customer_id` varchar(45) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `product_id` (`product_id`),
  KEY `customer_id` (`customer_id`),
  KEY `maintain_at` (`maintain_at`),
  KEY `create_at` (`create_at`),
  CONSTRAINT `warranty_cards_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `warranty_cards_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `warranty_cards_ibfk_3` FOREIGN KEY (`maintain_at`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `warranty_cards_ibfk_4` FOREIGN KEY (`create_at`) REFERENCES `facilities` (`facility_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warranty_cards`
--

LOCK TABLES `warranty_cards` WRITE;
/*!40000 ALTER TABLE `warranty_cards` DISABLE KEYS */;
INSERT INTO `warranty_cards` VALUES (16,'Alien87','agent327','center760',NULL,'2022-12-26','Repairing'),(134,'Alien101','agent327','center760','20021342','2022-12-29','Waiting to deliver'),(518,'Alien189','agent327','center428','20021342','2022-12-26','Done'),(555,'Alien351','agent327','center428','20021342','2022-12-26','Done'),(567,'TUF667','agent327','center428','20021341','2022-12-05','Done'),(846,'Nitro242','agent327','center760','20021341','2022-12-26','Repairing'),(901,'Alien828','agent327','center760',NULL,'2022-12-26','Repairing'),(1125,'Alien902','agent327','center760',NULL,'2022-12-26','Repairing'),(1222,'Alpha426','agent327','center428','20021341','2022-04-25','Done'),(1271,'Alien763','agent327','center760',NULL,'2022-12-26','Repairing'),(1320,'TUF248','agent327','center847','20021341','2022-10-24','Done'),(1351,'TUF339','agent327','center428','20021341','2022-08-04','Done'),(1531,'TUF487','agent327','center428','20021341','2022-12-04','Done'),(1615,'Alien106','agent327','center428','20021342','2022-12-26','Done'),(1704,'Alien714','agent327','center760',NULL,'2022-12-26','Repairing'),(1781,'ROG160','agent327','center760',NULL,'2022-12-26','Repairing'),(1846,'Alien514','agent327','center760',NULL,'2022-12-26','Repairing'),(1945,'Alien847','agent327','center760',NULL,'2022-12-26','Repairing'),(1953,'Nitro775','agent327','center428','20021341','2022-12-26','Done'),(2078,'Nitro540','agent327','center847','20021341','2022-12-26','Cannot repair'),(2377,'Alien753','agent327','center760',NULL,'2022-12-26','Repairing'),(2461,'Alien994','agent327','center760',NULL,'2022-12-26','Repairing'),(2546,'Nitro636','agent327','center428','20021341','2022-12-26','Done'),(2575,'Alien131','agent327','center428','20021342','2022-12-26','Cannot repair'),(2666,'ROG477','agent327','center760',NULL,'2022-12-26','Repairing'),(2737,'ROG621','agent327','center428','20021341','2022-08-04','Done'),(2738,'Alien650','agent327','center760',NULL,'2022-12-26','Repairing'),(2818,'Alien472','agent327','center428','20021342','2022-12-29','Done'),(2848,'Alien411','agent327','center428','20021342','2022-12-26','Done'),(2858,'ROG536','agent327','center760',NULL,'2022-12-26','Repairing'),(2867,'Alien41','agent327','center428','20021342','2022-12-26','Cannot repair'),(2936,'Nitro81','agent327','center428','20021341','2022-12-26','Done'),(2939,'Alien934','agent327','center760',NULL,'2022-12-26','Repairing'),(2942,'Alien162','agent327','center428','20021342','2022-12-26','Done'),(3220,'Alpha790','agent327','center428','20021341','2022-08-25','Cannot repair'),(3269,'Alien256','agent327','center428','20021342','2022-12-26','Done'),(3332,'Nitro880','agent327','center428','20021341','2022-12-26','Done'),(3385,'Nitro405','agent327','center428','20021341','2022-12-26','Cannot repair'),(3429,'Nitro345','agent327','center428','20021341','2022-12-26','Done'),(3444,'Nitro996','agent327','center428','20021341','2022-12-26','Done'),(3560,'Alien435','agent327','center428','20021342','2022-12-29','Done'),(3650,'ROG183','agent327','center760',NULL,'2022-12-26','Repairing'),(3827,'Nitro590','agent327','center428','20021341','2022-12-26','Done'),(3915,'ROG88','agent327','center760',NULL,'2022-12-26','Repairing'),(4130,'TUF133','agent327','center428','20021341','2022-09-04','Done'),(4354,'Alien508','agent327','center760',NULL,'2022-12-26','Repairing'),(4374,'Alien633','agent327','center760',NULL,'2022-12-26','Repairing'),(4408,'ROG887','agent327','center760',NULL,'2022-12-26','Repairing'),(4558,'TUF635','agent327','center428','20021341','2022-12-05','Done'),(4585,'Nitro899','agent327','center847','20021341','2022-12-26','Done'),(4637,'ROG111','agent327','center760',NULL,'2022-12-26','Repairing'),(4670,'Alien422','agent327','center428','20021342','2022-12-29','Cannot repair'),(4837,'ROG355','agent327','center760',NULL,'2022-12-26','Repairing'),(4910,'Alien912','agent327','center760',NULL,'2022-12-26','Repairing'),(4980,'Alpha356','agent327','center428','20021341','2022-12-29','Cannot repair'),(5020,'Alpha613','agent327','center428','20021341','2022-06-25','Cannot repair'),(5127,'ROG332','agent327','center760',NULL,'2022-12-26','Repairing'),(5316,'Alien303','agent327','center428','20021342','2022-12-26','Done'),(5547,'Alien916','agent327','center760',NULL,'2022-12-26','Repairing'),(5554,'Alien671','agent327','center760',NULL,'2022-12-26','Repairing'),(5570,'TUF280','agent327','center428','20021341','2022-07-04','Done'),(5976,'Nitro74','agent327','center428','20021341','2022-12-26','Done'),(6014,'Alien990','agent327','center760',NULL,'2022-12-26','Repairing'),(6211,'Alpha227','agent327','center760','20021341','2022-12-28','Repairing'),(6469,'Alien759','agent327','center760',NULL,'2022-12-26','Repairing'),(6522,'TUF273','agent327','center428','20021341','2022-06-25','Cannot repair'),(6581,'Alpha941','agent327','center428','20021341','2022-10-25','Done'),(6628,'Alien919','agent327','center760',NULL,'2022-12-26','Repairing'),(6815,'TUF235','agent327','center847','20021341','2022-11-24','Done'),(6902,'Alien953','agent327','center760',NULL,'2022-12-26','Repairing'),(6920,'TUF240','agent327','center428','20021341','2022-12-04','Cannot repair'),(7075,'ROG392','agent327','center428','20021341','2022-01-04','Done'),(7079,'TUF821','agent327','center847','20021341','2022-12-05','Done'),(7159,'ROG400','agent327','center760',NULL,'2022-12-26','Repairing'),(7257,'ROG796','agent327','center760',NULL,'2022-12-26','Repairing'),(7378,'Nitro97','agent327','center760','20021341','2022-12-26','Repairing'),(7419,'ROG348','agent327','center760',NULL,'2022-12-26','Repairing'),(7435,'Nitro39','agent327','center760','20021341','2022-12-26','Repairing'),(7603,'TUF429','agent327','center847','20021341','2022-02-04','Cannot repair'),(7716,'Alien661','agent327','center760',NULL,'2022-12-26','Repairing'),(7730,'Zephyrus112','agent327','center428','20021341','2022-12-26','Done'),(7791,'Alpha391','agent327','center428','20021341','2022-07-25','Cannot repair'),(7792,'ROG373','agent327','center760',NULL,'2022-12-26','Repairing'),(7808,'Alien402','agent327','center428','20021342','2022-12-26','Done'),(7817,'ROG337','agent327','center760',NULL,'2022-12-26','Repairing'),(7852,'Alien144','agent327','center428','20021342','2022-12-26','Done'),(7966,'Nitro465','agent327','center428','20021341','2022-12-26','Done'),(8001,'Alien787','agent327','center760',NULL,'2022-12-26','Repairing'),(8090,'ROG218','agent327','center760',NULL,'2022-12-26','Repairing'),(8170,'ROG199','agent327','center847','20021341','2022-12-04','Cannot repair'),(8261,'ROG38','agent327','center760',NULL,'2022-12-26','Repairing'),(8308,'TUF299','agent327','center847','20021341','2022-03-04','Cannot repair'),(8316,'Nitro645','agent327','center428','20021341','2022-12-26','Cannot repair'),(8338,'Alien315','agent327','center428','20021342','2022-12-26','Done'),(8387,'Nitro105','agent327','center428','20021341','2022-05-25','Cannot repair'),(8408,'TUF651','agent327','center428','20021341','2022-12-05','Cannot repair'),(8443,'Alpha766','agent327','center428','20021341','2022-07-25','Done'),(8549,'ROG310','agent327','center847','20021341','2022-05-04','Done'),(8553,'Alien746','agent327','center760',NULL,'2022-12-26','Repairing'),(8700,'ROG130','agent327','center760',NULL,'2022-12-26','Repairing'),(8819,'Nitro678','agent327','center760','20021341','2022-12-26','Repairing'),(8869,'Nitro310','agent327','center428','20021341','2022-12-26','Cannot repair'),(8986,'Nitro185','agent327','center428','20021341','2022-12-26','Cannot repair'),(9124,'Zephyrus1','agent327','center847','20021341','2022-12-26','Done'),(9309,'Alien166','agent327','center428','20021342','2022-12-26','Done'),(9364,'TUF742','agent327','center847','20021341','2022-12-05','Done'),(9386,'ROG638','agent327','center847','20021341','2022-12-26','Cannot repair'),(9560,'Alien349','agent327','center428','20021342','2022-12-26','Cannot repair'),(9611,'ROG591','agent327','center760',NULL,'2022-12-26','Repairing'),(9778,'Alpha905','agent327','center428','20021341','2022-11-25','Done'),(9867,'Alien887','agent327','center760',NULL,'2022-12-26','Repairing'),(9878,'ROG760','agent327','center760',NULL,'2022-12-26','Repairing'),(9942,'ROG408','agent327','center760',NULL,'2022-12-26','Repairing'),(9966,'Alien118','agent327','center428','20021342','2022-12-26','Cannot repair'),(9973,'Alpha684','agent327','center428','20021341','2022-12-29','Done');
/*!40000 ALTER TABLE `warranty_cards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-29 15:57:53
