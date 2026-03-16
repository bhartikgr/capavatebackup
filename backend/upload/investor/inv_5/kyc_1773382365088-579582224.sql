-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2026 at 10:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keiretsunew`
--

-- --------------------------------------------------------

--
-- Table structure for table `round_investors`
--

CREATE TABLE `round_investors` (
  `id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `cap_table_type` enum('pre','post') NOT NULL,
  `investor_type` enum('previous','current','converted') NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `shares` int(11) NOT NULL DEFAULT 0,
  `new_shares` int(11) DEFAULT 0,
  `total_shares` int(11) DEFAULT NULL,
  `investment_amount` decimal(15,2) DEFAULT NULL,
  `share_price` decimal(15,4) DEFAULT NULL,
  `percentage_numeric` decimal(10,4) DEFAULT NULL,
  `percentage_formatted` varchar(20) DEFAULT NULL,
  `share_class_type` varchar(100) DEFAULT NULL,
  `instrument_type` varchar(100) DEFAULT NULL,
  `round_name` varchar(255) DEFAULT NULL,
  `round_id_ref` int(11) DEFAULT NULL,
  `percentage` decimal(10,4) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `is_previous` tinyint(1) DEFAULT 0,
  `is_new_investment` tinyint(1) DEFAULT 0,
  `is_converted` tinyint(1) DEFAULT 0,
  `is_grouped` tinyint(1) DEFAULT 0,
  `investor_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`investor_details`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `round_investors`
--

INSERT INTO `round_investors` (`id`, `round_id`, `company_id`, `cap_table_type`, `investor_type`, `first_name`, `last_name`, `email`, `phone`, `shares`, `new_shares`, `total_shares`, `investment_amount`, `share_price`, `percentage_numeric`, `percentage_formatted`, `share_class_type`, `instrument_type`, `round_name`, `round_id_ref`, `percentage`, `value`, `is_previous`, `is_new_investment`, `is_converted`, `is_grouped`, `investor_details`, `created_at`) VALUES
(19, 810, 2, 'post', 'current', 'rtr', 'rtrt', 'test+001@gmail.com', '4334334343', 13889, 13889, 13889, 1000.00, 0.0720, 10.0001, '10.00%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 1000.01, 0, 1, 0, 0, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:34:24'),
(20, 810, 2, 'post', 'current', 'uuu', 'uuu', 'dfb34@gmail.com', '01023654789', 13889, 13889, 13889, 1000.00, 0.0720, 10.0001, '10.00%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 1000.01, 0, 1, 0, 0, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 08:34:24'),
(27, 811, 2, 'pre', 'previous', 'rtr', 'rtrt', 'test+001@gmail.com', '4334334343', 13889, 0, 13889, 1000.00, 0.0720, 10.0001, '10.00%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 4500.03, 1, 0, 0, 0, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:35:06'),
(28, 811, 2, 'pre', 'previous', 'uuu', 'uuu', 'dfb34@gmail.com', '01023654789', 13889, 0, 13889, 1000.00, 0.0720, 10.0001, '10.00%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 4500.03, 1, 0, 0, 0, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 08:35:06'),
(29, 811, 2, 'post', 'previous', 'rtr', 'rtrt', 'test+001@gmail.com', '4334334343', 13889, 0, 13889, 1000.00, 0.0720, 5.9783, '5.98%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 3586.97, 1, 0, 0, 0, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:35:06'),
(30, 811, 2, 'post', 'previous', 'uuu', 'uuu', 'dfb34@gmail.com', '01023654789', 13889, 0, 13889, 1000.00, 0.0720, 5.9783, '5.98%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 3586.97, 1, 0, 0, 0, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 08:35:06'),
(31, 811, 2, 'post', 'current', 'oo', 'o', 'test+001@gmail.com', '4334334343', 29041, 29041, 29041, 7500.00, 0.2583, 12.5002, '12.50%', 'Series A', 'Common Stock', 'yu', NULL, NULL, 7500.13, 0, 1, 0, 0, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:35:06'),
(32, 811, 2, 'post', 'current', 'p', 'p', 'test@gmail.com', '1212122222', 29041, 29041, 29041, 7500.00, 0.2583, 12.5002, '12.50%', 'Series A', 'Common Stock', 'yu', NULL, NULL, 7500.13, 0, 1, 0, 0, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', '2026-02-28 08:35:06'),
(43, 812, 2, 'pre', 'previous', 'rtr', 'rtrt', 'test+001@gmail.com', '4334334343', 13889, 0, 13889, 1000.00, 0.0720, 5.9783, '5.98%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 2690.23, 1, 0, 0, 0, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:45:06'),
(44, 812, 2, 'pre', 'previous', 'uuu', 'uuu', 'dfb34@gmail.com', '01023654789', 13889, 0, 13889, 1000.00, 0.0720, 5.9783, '5.98%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 2690.23, 1, 0, 0, 0, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 08:45:06'),
(45, 812, 2, 'pre', 'previous', 'oo', 'o', 'test+001@gmail.com', '4334334343', 29041, 0, 29041, 7500.00, 0.2583, 12.5002, '12.50%', 'Series A', 'Common Stock', 'yu', 811, NULL, 5625.10, 1, 0, 0, 0, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:45:06'),
(46, 812, 2, 'pre', 'previous', 'p', 'p', 'test@gmail.com', '1212122222', 29041, 0, 29041, 7500.00, 0.2583, 12.5002, '12.50%', 'Series A', 'Common Stock', 'yu', 811, NULL, 5625.10, 1, 0, 0, 0, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', '2026-02-28 08:45:06'),
(47, 812, 2, 'post', 'previous', 'rtr', 'rtrt', 'test+001@gmail.com', '4334334343', 13889, 0, 13889, 1000.00, 0.0720, 3.3628, '3.36%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 2017.66, 1, 0, 0, 0, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:45:06'),
(48, 812, 2, 'post', 'previous', 'uuu', 'uuu', 'dfb34@gmail.com', '01023654789', 13889, 0, 13889, 1000.00, 0.0720, 3.3628, '3.36%', 'Post-Seed', 'Common Stock', 'ssss', 810, NULL, 2017.66, 1, 0, 0, 0, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 08:45:06'),
(49, 812, 2, 'post', 'previous', 'oo', 'o', 'test+001@gmail.com', '4334334343', 29041, 0, 29041, 7500.00, 0.2583, 7.0313, '7.03%', 'Series A', 'Common Stock', 'yu', 811, NULL, 4218.81, 1, 0, 0, 0, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:45:06'),
(50, 812, 2, 'post', 'previous', 'p', 'p', 'test@gmail.com', '1212122222', 29041, 0, 29041, 7500.00, 0.2583, 7.0313, '7.03%', 'Series A', 'Common Stock', 'yu', 811, NULL, 4218.81, 1, 0, 0, 0, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', '2026-02-28 08:45:06'),
(51, 812, 2, 'post', 'current', 'qwww', 'ww', 'test+001@gmail.com', '4334334343', 51628, 51628, 51628, 7500.00, 0.1453, 12.5001, '12.50%', 'Series B', 'Common Stock', 'weee', NULL, NULL, 7500.04, 0, 1, 0, 0, '{\"firstName\":\"qwww\",\"lastName\":\"ww\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 08:45:06'),
(52, 812, 2, 'post', 'current', 'qwww', 'w', 'test@gmail.com', '1212122222', 51628, 51628, 51628, 7500.00, 0.1453, 12.5001, '12.50%', 'Series B', 'Common Stock', 'weee', NULL, NULL, 7500.04, 0, 1, 0, 0, '{\"firstName\":\"qwww\",\"lastName\":\"w\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', '2026-02-28 08:45:06'),
(75, 817, 1, 'post', 'current', 'v1', 'v1', '', '', 37241, 37241, 37241, 270000.00, 7.2501, 21.5999, '21.60%', 'Series A', 'Common Stock', 's', NULL, NULL, 269998.49, 0, 1, 0, 0, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', '2026-02-28 09:23:35'),
(76, 817, 1, 'post', 'current', 's', 's', 'test+001@gmail.com', '4334334343', 31724, 31724, 31724, 230000.00, 7.2501, 18.4000, '18.40%', 'Series A', 'Common Stock', 's', NULL, NULL, 230000.06, 0, 1, 0, 0, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 09:23:35'),
(83, 818, 1, 'pre', 'previous', 'v1', 'v1', '', '', 37241, 0, 37241, 270000.00, 7.2501, 21.5999, '21.60%', 'Series A', 'Common Stock', 's', 817, NULL, 129599.28, 1, 0, 0, 0, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', '2026-02-28 09:25:40'),
(84, 818, 1, 'pre', 'previous', 's', 's', 'test+001@gmail.com', '4334334343', 31724, 0, 31724, 230000.00, 7.2501, 18.4000, '18.40%', 'Series A', 'Common Stock', 's', 817, NULL, 110400.03, 1, 0, 0, 0, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 09:25:40'),
(85, 818, 1, 'post', 'previous', 'v1', 'v1', '', '', 37241, 0, 37241, 270000.00, 7.2501, 11.4012, '11.40%', 'Series A', 'Common Stock', 's', 817, NULL, 102611.13, 1, 0, 0, 0, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', '2026-02-28 09:25:40'),
(86, 818, 1, 'post', 'previous', 's', 's', 'test+001@gmail.com', '4334334343', 31724, 0, 31724, 230000.00, 7.2501, 9.7122, '9.71%', 'Series A', 'Common Stock', 's', 817, NULL, 87409.99, 1, 0, 0, 0, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 09:25:40'),
(87, 818, 1, 'post', 'current', 'v3', 'Kumar', 'test+001@gmail.com', '4334334343', 18147, 18147, 18147, 50000.00, 2.7553, 5.5557, '5.56%', 'Series A Extension', 'Common Stock', 'd', NULL, NULL, 50000.92, 0, 1, 0, 0, '{\"firstName\":\"v3\",\"lastName\":\"Kumar\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', '2026-02-28 09:25:40'),
(88, 818, 1, 'post', 'current', 'v4', 'terdb', 'dfb34@gmail.com', '01023654789', 90733, 90733, 90733, 250000.00, 2.7553, 27.7777, '27.78%', 'Series A Extension', 'Common Stock', 'd', NULL, NULL, 249999.08, 0, 1, 0, 0, '{\"firstName\":\"v4\",\"lastName\":\"terdb\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', '2026-02-28 09:25:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `round_investors`
--
ALTER TABLE `round_investors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_investors_round` (`round_id`,`cap_table_type`,`investor_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `round_investors`
--
ALTER TABLE `round_investors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `round_investors`
--
ALTER TABLE `round_investors`
  ADD CONSTRAINT `round_investors_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
