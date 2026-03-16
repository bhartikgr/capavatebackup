-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2026 at 10:26 AM
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
-- Table structure for table `round_cap_table_items`
--

CREATE TABLE `round_cap_table_items` (
  `id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `cap_table_type` enum('pre','post') NOT NULL,
  `item_type` enum('founder','investor','option_pool','converted') NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `shares` int(11) NOT NULL DEFAULT 0,
  `new_shares` int(11) DEFAULT 0,
  `total_shares` int(11) DEFAULT NULL,
  `percentage_numeric` decimal(10,4) DEFAULT NULL,
  `percentage_formatted` varchar(20) DEFAULT NULL,
  `percentage` decimal(18,15) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `founder_code` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `investor_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`investor_details`)),
  `investment_amount` decimal(15,2) DEFAULT NULL,
  `share_price` decimal(15,4) DEFAULT NULL,
  `is_previous` tinyint(1) DEFAULT 0,
  `is_new_investment` tinyint(1) DEFAULT 0,
  `is_converted` tinyint(1) DEFAULT 0,
  `existing_shares` int(11) DEFAULT 0,
  `is_option_pool` tinyint(1) DEFAULT 0,
  `share_class_type` varchar(100) DEFAULT NULL,
  `instrument_type` varchar(100) DEFAULT NULL,
  `round_name` varchar(255) DEFAULT NULL,
  `round_id_ref` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `round_cap_table_items`
--

INSERT INTO `round_cap_table_items` (`id`, `round_id`, `company_id`, `cap_table_type`, `item_type`, `name`, `shares`, `new_shares`, `total_shares`, `percentage_numeric`, `percentage_formatted`, `percentage`, `value`, `founder_code`, `email`, `phone`, `investor_details`, `investment_amount`, `share_price`, `is_previous`, `is_new_investment`, `is_converted`, `existing_shares`, `is_option_pool`, `share_class_type`, `instrument_type`, `round_name`, `round_id_ref`, `created_at`) VALUES
(91, 810, 2, 'pre', 'founder', 'f1 f', 50000, 0, 50000, 45.0000, '45.00%', NULL, 3600.00, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 50000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(92, 810, 2, 'pre', 'founder', 'f2 2', 30000, 0, 30000, 27.0000, '27.00%', NULL, 2160.00, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 30000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(93, 810, 2, 'pre', 'founder', 'f3 Kumar', 20000, 0, 20000, 18.0000, '18.00%', NULL, 1440.00, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 20000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(94, 810, 2, 'pre', 'option_pool', 'Employee Option Pool', 11111, 11111, 11111, 9.9999, '10.00%', NULL, 799.99, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 0, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:34:24'),
(95, 810, 2, 'post', 'founder', 'f1 f', 50000, 0, 50000, 36.0000, '36.00%', NULL, 3600.00, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(96, 810, 2, 'post', 'founder', 'f2 2', 30000, 0, 30000, 21.6000, '21.60%', NULL, 2160.00, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(97, 810, 2, 'post', 'founder', 'f3 Kumar', 20000, 0, 20000, 14.4000, '14.40%', NULL, 1440.00, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:34:24'),
(98, 810, 2, 'post', 'investor', 'rtr rtrt', 13889, 13889, 13889, 10.0001, '10.00%', NULL, 1000.01, NULL, NULL, NULL, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 1000.00, 0.0720, 0, 1, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', NULL, '2026-02-28 08:34:24'),
(99, 810, 2, 'post', 'investor', 'uuu uuu', 13889, 13889, 13889, 10.0001, '10.00%', NULL, 1000.01, NULL, NULL, NULL, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 1000.00, 0.0720, 0, 1, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', NULL, '2026-02-28 08:34:24'),
(100, 810, 2, 'post', 'option_pool', 'Employee Option Pool', 11111, 0, 11111, 7.9999, '8.00%', NULL, 799.99, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 11111, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:34:24'),
(115, 811, 2, 'pre', 'founder', 'f1 f', 50000, 0, 50000, 36.0000, '36.00%', NULL, 16199.99, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 50000, 0, 'Common Shares', 'Common Stock', 'ssss', NULL, '2026-02-28 08:35:06'),
(116, 811, 2, 'pre', 'founder', 'f2 2', 30000, 0, 30000, 21.6000, '21.60%', NULL, 9719.99, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 30000, 0, 'Common Shares', 'Common Stock', 'ssss', NULL, '2026-02-28 08:35:06'),
(117, 811, 2, 'pre', 'founder', 'f3 Kumar', 20000, 0, 20000, 14.4000, '14.40%', NULL, 6479.99, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 20000, 0, 'Common Shares', 'Common Stock', 'ssss', NULL, '2026-02-28 08:35:06'),
(118, 811, 2, 'pre', 'option_pool', 'Employee Option Pool', 11111, 0, 11111, 7.9999, '8.00%', NULL, 3599.96, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 11111, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:35:06'),
(119, 811, 2, 'pre', 'investor', 'rtr rtrt', 13889, 0, 13889, 10.0001, '10.00%', NULL, 4500.03, NULL, NULL, NULL, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 1000.00, 0.0720, 1, 0, 0, 13889, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:35:06'),
(120, 811, 2, 'pre', 'investor', 'uuu uuu', 13889, 0, 13889, 10.0001, '10.00%', NULL, 4500.03, NULL, NULL, NULL, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 1000.00, 0.0720, 1, 0, 0, 13889, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:35:06'),
(121, 811, 2, 'post', 'founder', 'f1 f', 50000, 0, 50000, 21.5217, '21.52%', NULL, 12913.00, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:35:06'),
(122, 811, 2, 'post', 'founder', 'f2 2', 30000, 0, 30000, 12.9130, '12.91%', NULL, 7747.80, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:35:06'),
(123, 811, 2, 'post', 'founder', 'f3 Kumar', 20000, 0, 20000, 8.6087, '8.61%', NULL, 5165.20, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:35:06'),
(124, 811, 2, 'post', 'investor', 'rtr rtrt', 13889, 0, 13889, 5.9783, '5.98%', NULL, 3586.97, NULL, NULL, NULL, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 1000.00, 0.0720, 1, 0, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:35:06'),
(125, 811, 2, 'post', 'investor', 'uuu uuu', 13889, 0, 13889, 5.9783, '5.98%', NULL, 3586.97, NULL, NULL, NULL, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 1000.00, 0.0720, 1, 0, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:35:06'),
(126, 811, 2, 'post', 'investor', 'oo o', 29041, 29041, 29041, 12.5002, '12.50%', NULL, 7500.13, NULL, NULL, NULL, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 7500.00, 0.2583, 0, 1, 0, 0, 0, 'Series A', 'Common Stock', 'yu', NULL, '2026-02-28 08:35:06'),
(127, 811, 2, 'post', 'investor', 'p p', 29041, 29041, 29041, 12.5002, '12.50%', NULL, 7500.13, NULL, NULL, NULL, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', 7500.00, 0.2583, 0, 1, 0, 0, 0, 'Series A', 'Common Stock', 'yu', NULL, '2026-02-28 08:35:06'),
(128, 811, 2, 'post', 'option_pool', 'Employee Option Pool', 46465, 35354, 46465, 20.0001, '20.00%', NULL, 12000.05, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 11111, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:35:06'),
(147, 812, 2, 'pre', 'founder', 'f1 f', 50000, 0, 50000, 21.5217, '21.52%', NULL, 9684.75, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 50000, 0, 'Common Shares', 'Common Stock', 'yu', NULL, '2026-02-28 08:45:06'),
(148, 812, 2, 'pre', 'founder', 'f2 2', 30000, 0, 30000, 12.9130, '12.91%', NULL, 5810.85, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 30000, 0, 'Common Shares', 'Common Stock', 'yu', NULL, '2026-02-28 08:45:06'),
(149, 812, 2, 'pre', 'founder', 'f3 Kumar', 20000, 0, 20000, 8.6087, '8.61%', NULL, 3873.90, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 20000, 0, 'Common Shares', 'Common Stock', 'yu', NULL, '2026-02-28 08:45:06'),
(150, 812, 2, 'pre', 'option_pool', 'Employee Option Pool', 46465, 0, 46465, 20.0001, '20.00%', NULL, 9000.04, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 46465, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:45:06'),
(151, 812, 2, 'pre', 'investor', 'rtr rtrt', 13889, 0, 13889, 5.9783, '5.98%', NULL, 2690.23, NULL, NULL, NULL, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 1000.00, 0.0720, 1, 0, 0, 13889, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:45:06'),
(152, 812, 2, 'pre', 'investor', 'uuu uuu', 13889, 0, 13889, 5.9783, '5.98%', NULL, 2690.23, NULL, NULL, NULL, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 1000.00, 0.0720, 1, 0, 0, 13889, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:45:06'),
(153, 812, 2, 'pre', 'investor', 'oo o', 29041, 0, 29041, 12.5002, '12.50%', NULL, 5625.10, NULL, NULL, NULL, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 7500.00, 0.2583, 1, 0, 0, 29041, 0, 'Series A', 'Common Stock', 'yu', 811, '2026-02-28 08:45:06'),
(154, 812, 2, 'pre', 'investor', 'p p', 29041, 0, 29041, 12.5002, '12.50%', NULL, 5625.10, NULL, NULL, NULL, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', 7500.00, 0.2583, 1, 0, 0, 29041, 0, 'Series A', 'Common Stock', 'yu', 811, '2026-02-28 08:45:06'),
(155, 812, 2, 'post', 'founder', 'f1 f', 50000, 0, 50000, 12.1059, '12.11%', NULL, 7263.54, 'F1', 'test@gmail.com', '04334334343', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:45:06'),
(156, 812, 2, 'post', 'founder', 'f2 2', 30000, 0, 30000, 7.2635, '7.26%', NULL, 4358.12, 'F2', 'avinayquicktech@gmail.com', '09736244949', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:45:06'),
(157, 812, 2, 'post', 'founder', 'f3 Kumar', 20000, 0, 20000, 4.8424, '4.84%', NULL, 2905.41, 'F3', 'avinayquicktech@gmail.com', '4805555555', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 08:45:06'),
(158, 812, 2, 'post', 'investor', 'rtr rtrt', 13889, 0, 13889, 3.3628, '3.36%', NULL, 2017.66, NULL, NULL, NULL, '{\"firstName\":\"rtr\",\"lastName\":\"rtrt\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 1000.00, 0.0720, 1, 0, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:45:06'),
(159, 812, 2, 'post', 'investor', 'uuu uuu', 13889, 0, 13889, 3.3628, '3.36%', NULL, 2017.66, NULL, NULL, NULL, '{\"firstName\":\"uuu\",\"lastName\":\"uuu\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 1000.00, 0.0720, 1, 0, 0, 0, 0, 'Post-Seed', 'Common Stock', 'ssss', 810, '2026-02-28 08:45:06'),
(160, 812, 2, 'post', 'investor', 'oo o', 29041, 0, 29041, 7.0313, '7.03%', NULL, 4218.81, NULL, NULL, NULL, '{\"firstName\":\"oo\",\"lastName\":\"o\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 7500.00, 0.2583, 1, 0, 0, 0, 0, 'Series A', 'Common Stock', 'yu', 811, '2026-02-28 08:45:06'),
(161, 812, 2, 'post', 'investor', 'p p', 29041, 0, 29041, 7.0313, '7.03%', NULL, 4218.81, NULL, NULL, NULL, '{\"firstName\":\"p\",\"lastName\":\"p\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', 7500.00, 0.2583, 1, 0, 0, 0, 0, 'Series A', 'Common Stock', 'yu', 811, '2026-02-28 08:45:06'),
(162, 812, 2, 'post', 'investor', 'qwww ww', 51628, 51628, 51628, 12.5001, '12.50%', NULL, 7500.04, NULL, NULL, NULL, '{\"firstName\":\"qwww\",\"lastName\":\"ww\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 7500.00, 0.1453, 0, 1, 0, 0, 0, 'Series B', 'Common Stock', 'weee', NULL, '2026-02-28 08:45:06'),
(163, 812, 2, 'post', 'investor', 'qwww w', 51628, 51628, 51628, 12.5001, '12.50%', NULL, 7500.04, NULL, NULL, NULL, '{\"firstName\":\"qwww\",\"lastName\":\"w\",\"email\":\"test@gmail.com\",\"phone\":\"1212122222\"}', 7500.00, 0.1453, 0, 1, 0, 0, 0, 'Series B', 'Common Stock', 'weee', NULL, '2026-02-28 08:45:06'),
(164, 812, 2, 'post', 'option_pool', 'Employee Option Pool', 123907, 77442, 123907, 30.0001, '30.00%', NULL, 18000.06, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 46465, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 08:45:06'),
(215, 817, 1, 'pre', 'founder', 'f Kumar', 40000, 0, 40000, 38.6668, '38.67%', NULL, 290000.77, 'F1', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 40000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(216, 817, 1, 'pre', 'founder', 'fgt gf', 30000, 0, 30000, 29.0001, '29.00%', NULL, 217500.58, 'F2', 'ss@gmail.com', NULL, '{}', 0.00, 0.0000, 0, 0, 0, 30000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(217, 817, 1, 'pre', 'founder', 'd Kumar', 20000, 0, 20000, 19.3334, '19.33%', NULL, 145000.39, 'F3', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 20000, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(218, 817, 1, 'pre', 'option_pool', 'Employee Option Pool', 13448, 13448, 13448, 12.9998, '13.00%', NULL, 97498.26, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 0, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 09:23:35'),
(219, 817, 1, 'post', 'founder', 'f Kumar', 40000, 0, 40000, 23.2001, '23.20%', NULL, 290001.33, 'F1', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(220, 817, 1, 'post', 'founder', 'fgt gf', 30000, 0, 30000, 17.4001, '17.40%', NULL, 217501.00, 'F2', 'ss@gmail.com', NULL, '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(221, 817, 1, 'post', 'founder', 'd Kumar', 20000, 0, 20000, 11.6001, '11.60%', NULL, 145000.67, 'F3', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:23:35'),
(222, 817, 1, 'post', 'investor', 'v1 v1', 37241, 37241, 37241, 21.5999, '21.60%', NULL, 269998.49, NULL, NULL, NULL, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', 270000.00, 7.2501, 0, 1, 0, 0, 0, 'Series A', 'Common Stock', 's', NULL, '2026-02-28 09:23:35'),
(223, 817, 1, 'post', 'investor', 's s', 31724, 31724, 31724, 18.4000, '18.40%', NULL, 230000.06, NULL, NULL, NULL, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 230000.00, 7.2501, 0, 1, 0, 0, 0, 'Series A', 'Common Stock', 's', NULL, '2026-02-28 09:23:35'),
(224, 817, 1, 'post', 'option_pool', 'Employee Option Pool', 13448, 0, 13448, 7.7999, '7.80%', NULL, 97498.45, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 13448, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 09:23:35'),
(239, 818, 1, 'pre', 'founder', 'f Kumar', 40000, 0, 40000, 23.2001, '23.20%', NULL, 139200.64, 'F1', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 40000, 0, 'Common Shares', 'Common Stock', 's', NULL, '2026-02-28 09:25:40'),
(240, 818, 1, 'pre', 'founder', 'fgt gf', 30000, 0, 30000, 17.4001, '17.40%', NULL, 104400.48, 'F2', 'ss@gmail.com', NULL, '{}', 0.00, 0.0000, 0, 0, 0, 30000, 0, 'Common Shares', 'Common Stock', 's', NULL, '2026-02-28 09:25:40'),
(241, 818, 1, 'pre', 'founder', 'd Kumar', 20000, 0, 20000, 11.6001, '11.60%', NULL, 69600.32, 'F3', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 20000, 0, 'Common Shares', 'Common Stock', 's', NULL, '2026-02-28 09:25:40'),
(242, 818, 1, 'pre', 'option_pool', 'Employee Option Pool', 13448, 0, 13448, 7.7999, '7.80%', NULL, 46799.26, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 13448, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 09:25:40'),
(243, 818, 1, 'pre', 'investor', 'v1 v1', 37241, 0, 37241, 21.5999, '21.60%', NULL, 129599.28, NULL, NULL, NULL, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', 270000.00, 7.2501, 1, 0, 0, 37241, 0, 'Series A', 'Common Stock', 's', 817, '2026-02-28 09:25:40'),
(244, 818, 1, 'pre', 'investor', 's s', 31724, 0, 31724, 18.4000, '18.40%', NULL, 110400.03, NULL, NULL, NULL, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 230000.00, 7.2501, 1, 0, 0, 31724, 0, 'Series A', 'Common Stock', 's', 817, '2026-02-28 09:25:40'),
(245, 818, 1, 'post', 'founder', 'f Kumar', 40000, 0, 40000, 12.2459, '12.25%', NULL, 110213.08, 'F1', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:25:40'),
(246, 818, 1, 'post', 'founder', 'fgt gf', 30000, 0, 30000, 9.1844, '9.18%', NULL, 82659.81, 'F2', 'ss@gmail.com', NULL, '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:25:40'),
(247, 818, 1, 'post', 'founder', 'd Kumar', 20000, 0, 20000, 6.1229, '6.12%', NULL, 55106.54, 'F3', 'avinayquicktech@gmail.com', '1023654789', '{}', 0.00, 0.0000, 0, 0, 0, 0, 0, 'Common Shares', 'Common Stock', 'Round 0', NULL, '2026-02-28 09:25:40'),
(248, 818, 1, 'post', 'investor', 'v1 v1', 37241, 0, 37241, 11.4012, '11.40%', NULL, 102611.13, NULL, NULL, NULL, '{\"firstName\":\"v1\",\"lastName\":\"v1\",\"email\":\"\",\"phone\":\"\"}', 270000.00, 7.2501, 1, 0, 0, 0, 0, 'Series A', 'Common Stock', 's', 817, '2026-02-28 09:25:40'),
(249, 818, 1, 'post', 'investor', 's s', 31724, 0, 31724, 9.7122, '9.71%', NULL, 87409.99, NULL, NULL, NULL, '{\"firstName\":\"s\",\"lastName\":\"s\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 230000.00, 7.2501, 1, 0, 0, 0, 0, 'Series A', 'Common Stock', 's', 817, '2026-02-28 09:25:40'),
(250, 818, 1, 'post', 'investor', 'v3 Kumar', 18147, 18147, 18147, 5.5557, '5.56%', NULL, 50000.92, NULL, NULL, NULL, '{\"firstName\":\"v3\",\"lastName\":\"Kumar\",\"email\":\"test+001@gmail.com\",\"phone\":\"4334334343\"}', 50000.00, 2.7553, 0, 1, 0, 0, 0, 'Series A Extension', 'Common Stock', 'd', NULL, '2026-02-28 09:25:40'),
(251, 818, 1, 'post', 'investor', 'v4 terdb', 90733, 90733, 90733, 27.7777, '27.78%', NULL, 249999.08, NULL, NULL, NULL, '{\"firstName\":\"v4\",\"lastName\":\"terdb\",\"email\":\"dfb34@gmail.com\",\"phone\":\"01023654789\"}', 250000.00, 2.7553, 0, 1, 0, 0, 0, 'Series A Extension', 'Common Stock', 'd', NULL, '2026-02-28 09:25:40'),
(252, 818, 1, 'post', 'option_pool', 'Employee Option Pool', 58795, 45347, 58795, 17.9999, '18.00%', NULL, 161999.45, NULL, NULL, NULL, '{}', 0.00, 0.0000, 0, 0, 0, 13448, 1, 'Option Pool', 'Options', 'Option Pool', NULL, '2026-02-28 09:25:40');

-- --------------------------------------------------------

--
-- Table structure for table `round_conversions`
--

CREATE TABLE `round_conversions` (
  `id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `original_round_id` int(11) DEFAULT NULL,
  `instrument_type` varchar(100) DEFAULT NULL,
  `investment_amount` decimal(15,2) DEFAULT NULL,
  `converted_shares` int(11) DEFAULT NULL,
  `conversion_price` decimal(15,4) DEFAULT NULL,
  `principal_plus_interest` decimal(15,2) DEFAULT NULL,
  `discount_rate` decimal(10,4) DEFAULT NULL,
  `valuation_cap` decimal(15,2) DEFAULT NULL,
  `interest_rate` decimal(10,4) DEFAULT NULL,
  `investor_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `round_founders`
--

CREATE TABLE `round_founders` (
  `id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `cap_table_type` enum('pre','post') NOT NULL,
  `founder_code` varchar(50) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `shares` int(11) NOT NULL DEFAULT 0,
  `voting` varchar(50) DEFAULT NULL,
  `share_type` varchar(50) DEFAULT NULL,
  `share_class_type` varchar(100) DEFAULT NULL,
  `instrument_type` varchar(100) DEFAULT NULL,
  `round_name` varchar(255) DEFAULT NULL,
  `investment` decimal(15,2) DEFAULT 0.00,
  `share_price` decimal(15,4) DEFAULT 0.0000,
  `percentage_numeric` decimal(10,4) DEFAULT NULL,
  `percentage_formatted` varchar(20) DEFAULT NULL,
  `percentage` decimal(10,4) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `original_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`original_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `round_founders`
--

INSERT INTO `round_founders` (`id`, `round_id`, `company_id`, `cap_table_type`, `founder_code`, `first_name`, `last_name`, `email`, `phone`, `shares`, `voting`, `share_type`, `share_class_type`, `instrument_type`, `round_name`, `investment`, `share_price`, `percentage_numeric`, `percentage_formatted`, `percentage`, `value`, `original_data`, `created_at`) VALUES
(55, 810, 2, 'pre', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 45.0000, '45.00%', NULL, 3600.00, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:34:24'),
(56, 810, 2, 'pre', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 27.0000, '27.00%', NULL, 2160.00, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:34:24'),
(57, 810, 2, 'pre', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 18.0000, '18.00%', NULL, 1440.00, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:34:24'),
(58, 810, 2, 'post', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 36.0000, '36.00%', NULL, 3600.00, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:34:24'),
(59, 810, 2, 'post', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 21.6000, '21.60%', NULL, 2160.00, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:34:24'),
(60, 810, 2, 'post', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 14.4000, '14.40%', NULL, 1440.00, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:34:24'),
(67, 811, 2, 'pre', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 36.0000, '36.00%', NULL, 16199.99, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:35:06'),
(68, 811, 2, 'pre', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 21.6000, '21.60%', NULL, 9719.99, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:35:06'),
(69, 811, 2, 'pre', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'ssss', 0.00, 0.0000, 14.4000, '14.40%', NULL, 6479.99, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:35:06'),
(70, 811, 2, 'post', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 21.5217, '21.52%', NULL, 12913.00, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:35:06'),
(71, 811, 2, 'post', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 12.9130, '12.91%', NULL, 7747.80, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:35:06'),
(72, 811, 2, 'post', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 8.6087, '8.61%', NULL, 5165.20, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:35:06'),
(79, 812, 2, 'pre', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 21.5217, '21.52%', NULL, 9684.75, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:45:06'),
(80, 812, 2, 'pre', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 12.9130, '12.91%', NULL, 5810.85, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:45:06'),
(81, 812, 2, 'pre', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'yu', 0.00, 0.0000, 8.6087, '8.61%', NULL, 3873.90, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:45:06'),
(82, 812, 2, 'post', 'F1', 'f1', 'f', 'test@gmail.com', '04334334343', 50000, 'voting', 'common', 'Common Shares', 'Common Stock', 'weee', 0.00, 0.0000, 12.1059, '12.11%', NULL, 7263.54, '{\"shares\":\"50000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f1\",\"lastName\":\"f\",\"email\":\"test@gmail.com\",\"phone\":\"04334334343\"}', '2026-02-28 08:45:06'),
(83, 812, 2, 'post', 'F2', 'f2', '2', 'avinayquicktech@gmail.com', '09736244949', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'weee', 0.00, 0.0000, 7.2635, '7.26%', NULL, 4358.12, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f2\",\"lastName\":\"2\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"09736244949\"}', '2026-02-28 08:45:06'),
(84, 812, 2, 'post', 'F3', 'f3', 'Kumar', 'avinayquicktech@gmail.com', '4805555555', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'weee', 0.00, 0.0000, 4.8424, '4.84%', NULL, 2905.41, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f3\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"4805555555\"}', '2026-02-28 08:45:06'),
(91, 817, 1, 'pre', 'F1', 'f', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 40000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 38.6668, '38.67%', NULL, 290000.77, '{\"shares\":\"40000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:23:35'),
(92, 817, 1, 'pre', 'F2', 'fgt', 'gf', 'ss@gmail.com', '', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 29.0001, '29.00%', NULL, 217500.58, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"fgt\",\"lastName\":\"gf\",\"email\":\"ss@gmail.com\"}', '2026-02-28 09:23:35'),
(93, 817, 1, 'pre', 'F3', 'd', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'Round 0', 0.00, 0.0000, 19.3334, '19.33%', NULL, 145000.39, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"d\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:23:35'),
(94, 817, 1, 'post', 'F1', 'f', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 40000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 23.2001, '23.20%', NULL, 290001.33, '{\"shares\":\"40000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:23:35'),
(95, 817, 1, 'post', 'F2', 'fgt', 'gf', 'ss@gmail.com', '', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 17.4001, '17.40%', NULL, 217501.00, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"fgt\",\"lastName\":\"gf\",\"email\":\"ss@gmail.com\"}', '2026-02-28 09:23:35'),
(96, 817, 1, 'post', 'F3', 'd', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 11.6001, '11.60%', NULL, 145000.67, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"d\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:23:35'),
(103, 818, 1, 'pre', 'F1', 'f', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 40000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 23.2001, '23.20%', NULL, 139200.64, '{\"shares\":\"40000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:25:40'),
(104, 818, 1, 'pre', 'F2', 'fgt', 'gf', 'ss@gmail.com', '', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 17.4001, '17.40%', NULL, 104400.48, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"fgt\",\"lastName\":\"gf\",\"email\":\"ss@gmail.com\"}', '2026-02-28 09:25:40'),
(105, 818, 1, 'pre', 'F3', 'd', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 's', 0.00, 0.0000, 11.6001, '11.60%', NULL, 69600.32, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"d\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:25:40'),
(106, 818, 1, 'post', 'F1', 'f', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 40000, 'voting', 'common', 'Common Shares', 'Common Stock', 'd', 0.00, 0.0000, 12.2459, '12.25%', NULL, 110213.08, '{\"shares\":\"40000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"f\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:25:40'),
(107, 818, 1, 'post', 'F2', 'fgt', 'gf', 'ss@gmail.com', '', 30000, 'voting', 'common', 'Common Shares', 'Common Stock', 'd', 0.00, 0.0000, 9.1844, '9.18%', NULL, 82659.81, '{\"shares\":\"30000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"fgt\",\"lastName\":\"gf\",\"email\":\"ss@gmail.com\"}', '2026-02-28 09:25:40'),
(108, 818, 1, 'post', 'F3', 'd', 'Kumar', 'avinayquicktech@gmail.com', '1023654789', 20000, 'voting', 'common', 'Common Shares', 'Common Stock', 'd', 0.00, 0.0000, 6.1229, '6.12%', NULL, 55106.54, '{\"shares\":\"20000.00\",\"shareType\":\"common\",\"voting\":\"voting\",\"firstName\":\"d\",\"lastName\":\"Kumar\",\"email\":\"avinayquicktech@gmail.com\",\"phone\":\"1023654789\"}', '2026-02-28 09:25:40');

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

-- --------------------------------------------------------

--
-- Table structure for table `round_option_pools`
--

CREATE TABLE `round_option_pools` (
  `id` int(11) NOT NULL,
  `round_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `cap_table_type` enum('pre','post') NOT NULL,
  `shares` int(11) NOT NULL DEFAULT 0,
  `existing_shares` int(11) DEFAULT 0,
  `new_shares` int(11) DEFAULT 0,
  `total_shares` int(11) DEFAULT NULL,
  `percentage_numeric` decimal(10,4) DEFAULT NULL,
  `percentage_formatted` varchar(20) DEFAULT NULL,
  `percentage` decimal(10,4) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `share_class_type` varchar(100) DEFAULT NULL,
  `instrument_type` varchar(100) DEFAULT NULL,
  `round_name` varchar(255) DEFAULT NULL,
  `is_option_pool` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `round_option_pools`
--

INSERT INTO `round_option_pools` (`id`, `round_id`, `company_id`, `cap_table_type`, `shares`, `existing_shares`, `new_shares`, `total_shares`, `percentage_numeric`, `percentage_formatted`, `percentage`, `value`, `share_class_type`, `instrument_type`, `round_name`, `is_option_pool`, `created_at`) VALUES
(19, 810, 2, 'pre', 11111, 0, 11111, 11111, 9.9999, '10.00%', NULL, 799.99, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:34:24'),
(20, 810, 2, 'post', 11111, 11111, 0, 11111, 7.9999, '8.00%', NULL, 799.99, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:34:24'),
(23, 811, 2, 'pre', 11111, 11111, 0, 11111, 7.9999, '8.00%', NULL, 3599.96, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:35:06'),
(24, 811, 2, 'post', 46465, 11111, 35354, 46465, 20.0001, '20.00%', NULL, 12000.05, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:35:06'),
(27, 812, 2, 'pre', 46465, 46465, 0, 46465, 20.0001, '20.00%', NULL, 9000.04, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:45:06'),
(28, 812, 2, 'post', 123907, 46465, 77442, 123907, 30.0001, '30.00%', NULL, 18000.06, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 08:45:06'),
(51, 817, 1, 'pre', 13448, 0, 13448, 13448, 12.9998, '13.00%', NULL, 97498.26, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 09:23:35'),
(52, 817, 1, 'post', 13448, 13448, 0, 13448, 7.7999, '7.80%', NULL, 97498.45, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 09:23:35'),
(55, 818, 1, 'pre', 13448, 13448, 0, 13448, 7.7999, '7.80%', NULL, 46799.26, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 09:25:40'),
(56, 818, 1, 'post', 58795, 13448, 45347, 58795, 17.9999, '18.00%', NULL, 161999.45, 'Option Pool', 'Options', 'Option Pool', 1, '2026-02-28 09:25:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `round_cap_table_items`
--
ALTER TABLE `round_cap_table_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_items_round_type` (`round_id`,`cap_table_type`,`item_type`);

--
-- Indexes for table `round_conversions`
--
ALTER TABLE `round_conversions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_conversions` (`round_id`);

--
-- Indexes for table `round_founders`
--
ALTER TABLE `round_founders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_founders_round` (`round_id`,`cap_table_type`);

--
-- Indexes for table `round_investors`
--
ALTER TABLE `round_investors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_investors_round` (`round_id`,`cap_table_type`,`investor_type`);

--
-- Indexes for table `round_option_pools`
--
ALTER TABLE `round_option_pools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_option_round` (`round_id`,`cap_table_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `round_cap_table_items`
--
ALTER TABLE `round_cap_table_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `round_conversions`
--
ALTER TABLE `round_conversions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `round_founders`
--
ALTER TABLE `round_founders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `round_investors`
--
ALTER TABLE `round_investors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `round_option_pools`
--
ALTER TABLE `round_option_pools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `round_cap_table_items`
--
ALTER TABLE `round_cap_table_items`
  ADD CONSTRAINT `round_cap_table_items_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `round_conversions`
--
ALTER TABLE `round_conversions`
  ADD CONSTRAINT `round_conversions_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `round_founders`
--
ALTER TABLE `round_founders`
  ADD CONSTRAINT `round_founders_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `round_investors`
--
ALTER TABLE `round_investors`
  ADD CONSTRAINT `round_investors_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `round_option_pools`
--
ALTER TABLE `round_option_pools`
  ADD CONSTRAINT `round_option_pools_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
