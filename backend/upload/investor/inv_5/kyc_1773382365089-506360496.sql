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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `round_founders`
--
ALTER TABLE `round_founders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_round_founders_round` (`round_id`,`cap_table_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `round_founders`
--
ALTER TABLE `round_founders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `round_founders`
--
ALTER TABLE `round_founders`
  ADD CONSTRAINT `round_founders_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `roundrecord` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
