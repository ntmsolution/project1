-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2021 at 06:57 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realstir`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_furnishing`
--

CREATE TABLE `additional_furnishing` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `additional_furnishing`
--

INSERT INTO `additional_furnishing` (`id`, `name`, `image`, `created_date`) VALUES
(3, 'Sofa', '0/787-sofa.png', '2019-12-23 12:12:25'),
(4, 'Refrigerator', '0/456-Refrigerator.png', '2019-12-23 12:12:38'),
(5, 'Dining Table', '0/151-DiningTable.png', '2019-12-23 12:12:56'),
(8, 'Wifi Connection', '0/315-WifiConnection.png', '2019-12-23 12:13:53'),
(9, 'Microwave', '0/31-Microwave.png', '2019-12-23 12:14:09'),
(11, 'test', 'img.jpg', '2021-02-16 11:34:44'),
(12, 't', 'img.jpg', '2021-02-17 03:50:16');

-- --------------------------------------------------------

--
-- Table structure for table `additional_rooms`
--

CREATE TABLE `additional_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `additional_rooms`
--

INSERT INTO `additional_rooms` (`id`, `name`, `image`, `created_date`) VALUES
(1, 'Prayer Room', '0/770-Islamic.png', '2019-12-23 09:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `user_name`, `password`, `first_name`, `last_name`, `email`, `created_date`) VALUES
(1, 'admin1', 'hi', 'admin', 'admin', 'admin@admin.com', '2021-02-15 08:51:15');

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`id`, `name`, `image`, `created_date`) VALUES
(1, 'Car Parking', '0/377-parking.png', '2019-12-23 09:52:49'),
(4, 'Lift', '0/992-lift.png', '2019-12-23 09:53:37'),
(5, 'Swimming Pool', '0/348-swimmingpool.png', '2019-12-23 09:53:52'),
(6, 'Landscaped Gardens', '0/874-landscapedgardens.png', '2019-12-23 09:54:07'),
(7, 'Gym', '0/960-gym.png', '2019-12-23 09:54:20'),
(8, 'Childrens play area', '0/593-childrenplayarea.png', '2019-12-23 09:54:47'),
(9, 'Club House', '0/98-clubhouse.png', '2019-12-23 09:55:09');

-- --------------------------------------------------------

--
-- Table structure for table `cms`
--

CREATE TABLE `cms` (
  `id` int(10) NOT NULL,
  `page_name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cms`
--

INSERT INTO `cms` (`id`, `page_name`, `content`, `created_date`, `updated_date`) VALUES
(1, 'About Us', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n\r\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n\r\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n', '2018-07-19 17:19:32', '2019-12-24 23:47:14'),
(2, 'Terms and Conditions', '<p><span style=\\\"font-size:28px\\\"><span style=\\\"font-family:Lucida Sans Unicode,Lucida Grande,sans-serif\\\"><strong>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of</strong> classical Latin literature from 45 BC</span><span style=\\\"font-family:Times New Roman,Times,serif\\\">, making it over 2000 years old. Richard McClintock, a </span></span><span style=\\\"font-size:48px\\\"><span style=\\\"font-family:Times New Roman,Times,serif\\\">Latin</span></span><span style=\\\"font-size:28px\\\"><span style=\\\"font-family:Times New Roman,Times,serif\\\"> professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</span></span><span style=\\\"font-size:16px\\\"><span style=\\\"font-family:Times New Roman,Times,serif\\\">, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &quot;</span></span><span style=\\\"font-family:Courier New,Courier,monospace\\\"><span style=\\\"font-size:26px\\\">Lorem ipsum dolor sit amet.</span></span><span style=\\\"font-size:16px\\\"><span style=\\\"font-family:Times New Roman,Times,serif\\\">.&quot;, comes from a line in section 1.10.32.</span></span></p>\r\n', '2018-07-19 17:19:32', '2019-03-22 08:13:31'),
(3, 'Privacy Policy', '<p><span style=\\\"font-size:20px\\\">making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites <strong><em>Contrary</em></strong> to popular belief</span>, <span style=\\\"font-size:22px\\\"><span style=\\\"font-family:Courier New,Courier,monospace\\\">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in section 1.10.32</span></span>.</p>\r\n', '2018-08-11 10:08:36', '2019-03-29 03:45:28');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `property_id`, `created_date`) VALUES
(71, 4, 10, '2020-03-06 12:12:43'),
(72, 4, 9, '2020-03-06 12:14:38'),
(73, 18, 13, '2020-10-31 06:22:47'),
(74, 18, 9, '2020-10-31 06:22:50');

-- --------------------------------------------------------

--
-- Table structure for table `overlooking`
--

CREATE TABLE `overlooking` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `overlooking`
--

INSERT INTO `overlooking` (`id`, `name`, `image`, `created_date`) VALUES
(6, 'Corner Property', '0/131-230533.png', '2019-12-23 10:19:21');

-- --------------------------------------------------------

--
-- Table structure for table `propertys`
--

CREATE TABLE `propertys` (
  `id` int(11) NOT NULL,
  `property_type_id` int(11) NOT NULL,
  `property_sub_type` int(10) NOT NULL DEFAULT 0 COMMENT '0->Buy , 1->rent',
  `property_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `balconies` int(11) NOT NULL,
  `additional_rooms_id` text NOT NULL,
  `saleable_area` int(11) NOT NULL,
  `carpet_area` int(11) NOT NULL,
  `amount` float(10,2) NOT NULL,
  `negotiable` int(1) NOT NULL DEFAULT 0 COMMENT '0->No,1->Yes',
  `security_deposit` float(10,2) NOT NULL,
  `maintenance_charge` float(10,2) NOT NULL,
  `nosecurity_deposit` int(1) NOT NULL COMMENT '0->yes,1->no',
  `available_from` date NOT NULL,
  `booking_amount` float(10,2) NOT NULL,
  `property_status` int(1) NOT NULL DEFAULT 0 COMMENT '1->Ready To Move In,2->Under Construction',
  `age_property` varchar(255) NOT NULL,
  `possession_date` date NOT NULL,
  `transaction_type` int(1) NOT NULL DEFAULT 0 COMMENT '1->New,2->Resale',
  `description` text NOT NULL,
  `furnishing_status` int(1) NOT NULL DEFAULT 0 COMMENT '1->Unfurnished,2->Semi Furnished,3-> Fully Furnished',
  `amenities_id` text NOT NULL,
  `additional_furnishing_id` text NOT NULL,
  `floor_no` int(11) NOT NULL,
  `total_floor` int(11) NOT NULL,
  `open_side` int(11) NOT NULL,
  `facing` varchar(255) NOT NULL,
  `facing_road_width` varchar(255) NOT NULL,
  `overlooking_id` text NOT NULL,
  `latitude` varchar(55) NOT NULL,
  `longitude` varchar(55) NOT NULL,
  `preferred_tenants` int(1) NOT NULL DEFAULT 0 COMMENT '1-Family,2->Bachelors,3->All',
  `gender_preference` int(1) NOT NULL DEFAULT 0 COMMENT '1->Only Men,2->Only Women,3->All',
  `maximum_tentants_allowed` int(1) NOT NULL DEFAULT 0 COMMENT '1->1-2, 2->3-4,3->More Than 4',
  `work_preference` int(1) NOT NULL DEFAULT 0 COMMENT '1->Salaried,2->Student,3->Businessmen,4->All',
  `dietary_food_preference` int(1) NOT NULL DEFAULT 0 COMMENT '1->Only Vegetarians,2->Non-Veg Allowed,3->No Preference',
  `expected_duration` int(1) NOT NULL COMMENT '1->Atleast 6 Months,2->Atleast 1 Year,3->Atleast 2 Years,4->No Preference',
  `special_requirements` text NOT NULL,
  `property_owner_name` varchar(255) NOT NULL,
  `property_owner_number` varchar(255) NOT NULL,
  `inquiry_time` varchar(255) NOT NULL,
  `added_by` int(1) NOT NULL DEFAULT 0 COMMENT '0->Admin,1->User',
  `is_verified` int(1) NOT NULL COMMENT '0->unverified,1->verified',
  `status` int(1) NOT NULL COMMENT '0-pending,1-completed',
  `added_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `propertys`
--

INSERT INTO `propertys` (`id`, `property_type_id`, `property_sub_type`, `property_name`, `address`, `bedrooms`, `bathrooms`, `balconies`, `additional_rooms_id`, `saleable_area`, `carpet_area`, `amount`, `negotiable`, `security_deposit`, `maintenance_charge`, `nosecurity_deposit`, `available_from`, `booking_amount`, `property_status`, `age_property`, `possession_date`, `transaction_type`, `description`, `furnishing_status`, `amenities_id`, `additional_furnishing_id`, `floor_no`, `total_floor`, `open_side`, `facing`, `facing_road_width`, `overlooking_id`, `latitude`, `longitude`, `preferred_tenants`, `gender_preference`, `maximum_tentants_allowed`, `work_preference`, `dietary_food_preference`, `expected_duration`, `special_requirements`, `property_owner_name`, `property_owner_number`, `inquiry_time`, `added_by`, `is_verified`, `status`, `added_date`) VALUES
(9, 1, 0, '1 BHK Independent Floor', '150 Feet Ring Road, Circle, near Mavdi, Rajkot, Gujarat', 1, 3, 2, '1,4,2', 2000, 1950, 6000000.00, 1, 0.00, 0.00, 0, '0000-00-00', 200000.00, 2, '15 Year', '2020-01-26', 1, 'Office or Room for rent For office use or employee/job workers only. Address: Near big bazar, 150 feet ring road, Chandra park, block no 87 corner, street no 7, In front of RMC Office, Rajkot.', 3, '3,10,7,4', '6,9,10', 7, 10, 4, 'South', '200', '3,4,5', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Rajesh Jadav', '9978789985', '8 pm to 12 pm', 0, 1, 0, '2020-03-04 14:22:17'),
(10, 1, 1, '2 BHK Apartment', 'Munjka, Rajkot, Gujarat, India', 2, 2, 2, '4,2', 1560, 1450, 6000.00, 1, 6000.00, 500.00, 1, '2019-12-22', 0.00, 0, '0', '0000-00-00', 0, 'A spacious 2 bhk multistorey apartment is available for rental in New Jagnath Plot, Rajkot. It has a built-up area of 615 sqft and is available for rent at Rs. 20,000 per month . It is a furnished property. It is on the 1st floor of the building (total number of floors are 5). It is facing south...', 2, '1,8', '6', 3, 5, 4, 'West', '300', '', '22.3675', '70.7951', 2, 2, 3, 3, 2, 2, 'good Women only', 'Vidhi Patel', '9878585878', '8pm - to 6 pm', 0, 1, 0, '2020-01-01 14:00:51'),
(11, 3, 1, '5 BHK Independent House', 'Saurashtra University, Saurashtra University Campus, Munjka, Rajkot, Gujarat, India', 5, 7, 3, '4,3,2', 2500, 2420, 30000.00, 1, 10000.00, 500.00, 0, '2020-01-25', 0.00, 0, '0', '0000-00-00', 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, '3,10,1,8,9,7,6,4,2,5', '5,6,9,10,4,3,7,8', 0, 3, 4, 'South', '300', '6,3,4,5', '22.2908034', '70.74298599999997', 1, 0, 0, 1, 1, 1, '', 'Sachin Gohel', '9978587859', '10 PM to 9 Am', 0, 1, 0, '2020-03-04 13:20:44'),
(12, 1, 1, '3 BHK Apartment', 'Mota Mava, Rajkot, Gujarat, India', 3, 4, 2, '4,2', 1000, 980, 16000.00, 0, 3000.00, 500.00, 1, '2020-01-31', 0.00, 0, '0', '0000-00-00', 0, 'It’s a 3 bhk multistorey apartment situated in Real Enterprise Prime, Mota Mava, Rajkot. It has a built-up area of 980 sqft and is available for rent at Rs. 16,000 per month . This residential property is ready-to-move-in. It is made in way to provide a comfortable living for the residents.', 1, '3,7,4', '5,6', 3, 5, 2, 'NorthEast', '100', '3,4,5', '22.2606432', '70.7626295', 3, 0, 0, 4, 3, 4, '', 'Jahn Smith', '9858574585', '10 PM to 9 Am', 0, 1, 0, '2020-03-04 14:16:27'),
(13, 3, 1, '2 BHK Residential House 750 sqft', 'Kalawad Road, Harihar Society, Nutan Nagar, Kotecha Nagar, Rajkot, Gujarat, India', 2, 5, 2, '1,4,3,2', 750, 700, 15000.00, 1, 6000.00, 500.00, 0, '2020-06-28', 0.00, 0, '0', '0000-00-00', 0, 'Loretta Lynn is an American country music singer songwriter with multiple gold albums in a career spanning 60 years.', 3, '3,1,2', '5,6,9,10,4,3,7,8', 0, 1, 2, 'NorthEast', '120', '6,3,5', '22.2922046', '70.781745', 1, 0, 0, 3, 3, 4, '', 'Rajesh Jadav', '9978789985', '10 Am to  5 Pm', 0, 1, 0, '2020-06-10 12:14:24'),
(14, 1, 1, '2 BHK Residential House 750 sqft', '1 Main Sreet San Jose', 2, 1, 1, '1,4,2', 20000, 1200, 12500.00, 0, 0.00, 0.00, 0, '2020-10-31', 0.00, 0, '0', '0000-00-00', 0, 'Lorum ipsum', 1, '3,10,7,4', '6,9,10', 1, 2, 4, 'South', '300', '3,4,5', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Andrew Symond', '9998887770', '', 16, 1, 0, '2020-10-17 06:32:37'),
(22, 1, 1, '2 BHK Residential House 750 sqft', '1 Main Sreet San Jose', 2, 1, 1, '1,4,2', 20000, 1200, 12500.00, 0, 0.00, 0.00, 0, '2020-10-31', 0.00, 0, '0', '0000-00-00', 0, 'Lorum ipsum', 1, '3,10,7,4', '6,9,10', 1, 2, 4, 'South', '300', '3,4,5', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Andrew Symond', '9998887770', '', 18, 0, 0, '2020-10-22 12:23:48'),
(23, 1, 1, '2 BHK Residential House 750 sqft', '1 Main Sreet San Jose', 2, 1, 1, '1,4,2', 20000, 1200, 12500.00, 0, 0.00, 0.00, 0, '2020-10-31', 0.00, 0, '0', '0000-00-00', 0, 'Lorum ipsum', 1, '3,10,7,4', '6,9,10', 1, 2, 4, 'South', '300', '3,4,5', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Andrew Symond', '9998887770', '', 16, 1, 0, '2020-10-23 07:03:51'),
(24, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '3,1', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 2, '10,1', '7', 3, 3, 0, '', '', '3', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali Buddhadev', '9723033356', '8 Am to 7 Pm', 18, 0, 0, '2020-10-23 07:10:43'),
(25, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '3,1', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 2, '', '', 3, 3, 0, '', '', '', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali Buddhadev', '9723066685', '9 Am to 7 Pm', 18, 1, 0, '2020-10-23 07:15:13'),
(26, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '3,1', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 2, '', '', 3, 3, 0, '', '', '', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali Patel', '975689230', '9 am to 8 pm', 18, 0, 0, '2020-10-23 07:16:23'),
(27, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '1,3', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 2, '10,1', '9,10', 3, 3, 0, '', '', '3,4', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali', '97230555596', '10 am to 5 pm', 18, 0, 0, '2020-10-23 07:17:48'),
(28, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '1,3', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 0, '10', '', 3, 3, 0, '', '', '', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali', '97230555596', '10 am to 5 pm', 18, 0, 0, '2020-10-26 06:05:34'),
(29, 4, 0, 'Alap avenue', 'Rajkot', 3, 3, 3, '1,3', 1200, 1200, 50000000.00, 0, 0.00, 0.00, 0, '0000-00-00', 5000000.00, 1, '1', '0000-00-00', 1, 'Lorem ipsum dummy text of things that you have received this email and the other side of the year and the rest of the year and the other.', 0, '1,10', '', 3, 3, 0, '', '', '', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali', '97230555596', '10 am to 5 pm', 18, 0, 0, '2020-10-26 06:17:12'),
(30, 4, 0, '2 BHK Appartment/Flats', 'University Road Rajkot Gujarat', 3, 3, 2, '3', 1200, 1200, 7500000.00, 0, 0.00, 0.00, 0, '0000-00-00', 500000.00, 2, '', '0000-00-00', 1, 'Lorem Ipsum Dummy Text.', 2, '1', '6,9', 3, 5, 3, 'South', '30', '', '22.368393', '70.799477', 0, 0, 0, 0, 0, 0, '', 'Dipali Buddhadev', '9723033356', '8 AM to 5 PM', 18, 0, 0, '2020-10-31 05:09:05');

-- --------------------------------------------------------

--
-- Table structure for table `propertys_image`
--

CREATE TABLE `propertys_image` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `propertys_image`
--

INSERT INTO `propertys_image` (`id`, `property_id`, `image`, `created_date`) VALUES
(2, 9, '0/423-91481398.jpg', '2019-12-31 13:58:52'),
(3, 9, '0/145-Project-Photo-19-Global-Apartment-Phase-II-Patna-50937033451366310462.jpg', '2019-12-31 13:58:52'),
(4, 10, '0/510-images1.jpeg', '2019-12-31 14:03:44'),
(5, 10, '0/239-silver-oakwood-apartment-elevation-24763349.jpeg', '2019-12-31 14:03:44'),
(7, 10, '0/933-image.jpeg', '2020-01-01 07:24:28'),
(8, 10, '0/1068-contemporary-exterior.jpg', '2020-01-01 07:29:32'),
(9, 9, '0/758-image.jpeg', '2020-01-01 07:48:09'),
(10, 9, '0/91-contemporary-exterior.jpg', '2020-01-01 07:48:09'),
(11, 9, '0/828-house-kVq--621x414LiveMint.jpg', '2020-01-01 07:48:10'),
(12, 11, '0/206-image.jpeg', '2020-01-01 09:52:48'),
(13, 11, '0/363-contemporary-exterior.jpg', '2020-01-01 09:52:49'),
(14, 11, '0/116-house-kVq--621x414LiveMint.jpg', '2020-01-01 09:52:49'),
(15, 11, '0/171-91481398.jpg', '2020-01-01 09:52:49'),
(16, 12, '0/590-91481398.jpg', '2020-01-02 05:27:17'),
(17, 13, '0/607-Screen-Shot-2017-05-22-at-3_37_09-AM.png', '2020-06-10 12:14:01'),
(18, 14, '0/689-lion-2-qu-1920x1080.jpg', '2020-10-17 07:00:50'),
(19, 14, '0/885-lion-2-qu-1920x1080.jpg', '2020-10-17 07:01:23'),
(20, 14, '0/952-lion-2-qu-1920x1080.jpg', '2020-10-17 07:01:52'),
(21, 14, '0/193-lion-2-qu-1920x1080.jpg', '2020-10-17 07:02:26'),
(22, 26, '0/24-image-48ebf071-6f1d-4a0d-a898-daddaef6c83c.jpg', '2020-10-23 07:16:24'),
(23, 27, '0/58-image-33d755b3-0b07-43d2-8043-9cb732c1b03f.jpg', '2020-10-23 07:17:49'),
(24, 27, '0/514-image-1e6af161-dc50-48b9-8491-851fff7498f5.jpg', '2020-10-23 07:17:50'),
(25, 27, '0/698-Screenshot2020-10-12-18-54-36-95.png', '2020-10-26 06:40:38'),
(26, 27, '0/24-IMG20201009112130.jpeg', '2020-10-26 06:48:49'),
(27, 30, '0/87-83001274-de42-4f9f-ae15-a00aca06bccc.jpg', '2020-10-31 05:09:07');

-- --------------------------------------------------------

--
-- Table structure for table `property_types`
--

CREATE TABLE `property_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `property_types`
--

INSERT INTO `property_types` (`id`, `name`, `image`, `created_date`) VALUES
(1, 'Apartment', '0/apartment.png', '2019-12-26 11:56:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` text CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `profile_picture` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(15) NOT NULL,
  `device_type` int(1) NOT NULL COMMENT '0-android, 1-iphone',
  `device_token` text NOT NULL,
  `status` int(1) NOT NULL COMMENT '0-active,1-deactive',
  `register_id` varchar(255) NOT NULL,
  `register_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-email,1-fb',
  `user_type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0-Buyer, 1-Seller',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `profile_picture`, `phone`, `device_type`, `device_token`, `status`, `register_id`, `register_type`, `user_type`, `created_at`) VALUES
(1, 'vidhi sagpariya', 'vidhi@gmail.com', '210a41803be427637c556d6790693624375562c0a35e0c01c62a129ee155730cd7a1a71f61b5a040c7b8a3491d236601a0185bab8b90eb3ce2cd5b6488373c68', '0/1074-3.jpg', '97244599344', 0, '', 1, '', 0, 0, '2019-12-26 05:52:49'),
(2, 'vidhi sagpariya', 'vidhi11@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/353-profile.jpeg', '9724453232', 0, '', 0, '', 0, 0, '2019-12-26 07:41:23'),
(3, 'jolmar', 'jolmar@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/703-profile.jpeg', '9856482598', 1, 'asdsadwe9eeewdsasjs', 1, '', 0, 0, '2019-12-26 10:09:31'),
(4, 'jenny shah', 'jenny@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/984-profile.jpeg', '9586415265', 0, '', 0, '', 0, 0, '2019-12-27 11:10:02'),
(6, 'Jay Guru', 'Jayguru@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/877-profile.jpeg', '8956471548', 1, 'jdfkdkgdfgge9eeewdsasjs', 0, '', 0, 0, '2020-01-01 06:07:52'),
(8, 'Vicky patel ', 'Vicky@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/695-profile.jpeg', '7562148555', 1, 'jdfkdkgdfgge9eeewdsasjs', 0, '', 0, 0, '2020-01-01 06:14:23'),
(9, 'jay viru ', 'jayviru@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/573-profile.jpeg', '9874523658', 0, '', 0, '', 0, 0, '2020-01-02 10:15:37'),
(12, 'Rajesh jadav', 'rajesh@gmail.com', 'b3f4388fc5c9c04df9cc4f526b9484ea11aecc6203a7a6f8b75ded926f37a1e23221f45945572d1fef0df2535336933cb811af2ec1f2a5d35b3119a9b05c1318', '', '9978787899', 0, '', 0, '', 0, 0, '2020-01-08 07:28:10'),
(14, 'vidhi Patel', 'vidhi12@gmail.com', 'b3f4388fc5c9c04df9cc4f526b9484ea11aecc6203a7a6f8b75ded926f37a1e23221f45945572d1fef0df2535336933cb811af2ec1f2a5d35b3119a9b05c1318', '', '998789858', 0, '', 0, '', 0, 0, '2020-01-08 10:45:51'),
(15, 'jay viru', 'jay@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '', '9978789985', 0, '', 0, '', 0, 0, '2020-01-09 09:41:57'),
(16, 'Sachin Gohel', 'swayam.test8@gmail.com', 'b3f4388fc5c9c04df9cc4f526b9484ea11aecc6203a7a6f8b75ded926f37a1e23221f45945572d1fef0df2535336933cb811af2ec1f2a5d35b3119a9b05c1318', '0/44-lion-2-qu-1920x1080.jpg', '9898787899', 0, 'asdsadwe9eeewdsasjs', 0, '0', 0, 1, '2020-10-17 04:11:06'),
(17, 'Dipali Buddhadev', 'dipali@swayaminfotech.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/722-profile.jpeg', '9723033356', 0, 'jdfkdkgdfgge9eeewdsasjs', 0, '', 0, 1, '2020-10-20 11:32:49'),
(18, 'Dipali Buddhadev', 'dipali@gmail.com', 'df9b332969cf7b0e044d0bf9992b1123510ab1a5e6e581b743d11363b5e6726504217025d85a6d4187c5cfe8a8d7b9a3ee7e557e6d4f275f307e9bd1b8b91a38', '0/433-profile.jpeg', '9723066658', 0, 'asdsadwe9eeewdsasjs', 0, '', 0, 1, '2020-10-20 11:37:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_furnishing`
--
ALTER TABLE `additional_furnishing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `additional_rooms`
--
ALTER TABLE `additional_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cms`
--
ALTER TABLE `cms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `overlooking`
--
ALTER TABLE `overlooking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `propertys`
--
ALTER TABLE `propertys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `propertys_image`
--
ALTER TABLE `propertys_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_types`
--
ALTER TABLE `property_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additional_furnishing`
--
ALTER TABLE `additional_furnishing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `additional_rooms`
--
ALTER TABLE `additional_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cms`
--
ALTER TABLE `cms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `overlooking`
--
ALTER TABLE `overlooking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `propertys`
--
ALTER TABLE `propertys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `propertys_image`
--
ALTER TABLE `propertys_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `property_types`
--
ALTER TABLE `property_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `propertys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
