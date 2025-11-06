-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2025 at 12:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `access_logs_company_round`
--

CREATE TABLE `access_logs_company_round` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_role` varchar(100) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `target_table` varchar(100) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_logs_company_round`
--

INSERT INTO `access_logs_company_round` (`id`, `user_id`, `user_role`, `company_id`, `action`, `target_table`, `target_id`, `description`, `ip_address`, `created_at`) VALUES
(1, 1, 'owner', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Articles of Incorporation', '223.178.211.161', '2025-10-07 06:08:03'),
(2, 1, 'owner', 2, 'CREATE', 'roundrecord', 2, 'Created round record: Founding Share Allocation', '223.178.211.161', '2025-10-07 06:12:04'),
(3, 1, 'owner', 2, 'CREATE', 'roundrecord', 3, 'Created round record: SAFE ', '223.178.211.161', '2025-10-07 06:14:56'),
(4, 1, 'owner', 2, 'CREATE', 'roundrecord', 4, 'Created round record: Convertible Debt', '223.178.211.161', '2025-10-07 06:19:01'),
(5, 1, 'owner', 2, 'CREATE', 'roundrecord', 5, 'Created round record: Series A + Debt Conversion', '223.178.211.161', '2025-10-07 06:27:03'),
(6, 1, 'owner', 2, 'CREATE', 'roundrecord', 6, 'Created round record: Preferred', '223.178.211.161', '2025-10-07 06:29:41'),
(7, 1, 'owner', 2, 'UPDATE', 'roundrecord', 6, 'Updated round record: Preferred', '223.178.211.161', '2025-10-07 07:24:53'),
(8, 1, 'owner', 2, 'UPDATE', 'roundrecord', 6, 'Updated round record: Preferred', '223.178.211.161', '2025-10-07 08:22:21'),
(9, 1, 'signatory', 2, 'CREATE', 'roundrecord', 7, 'Created round record: Founding Share Allocation', '223.178.209.117', '2025-10-09 07:00:02'),
(10, 2, 'signatory', 2, 'CREATE', 'roundrecord', 8, 'Created round record: Founding Share Allocation', '223.178.209.117', '2025-10-09 07:52:00'),
(11, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Initial', '223.178.209.117', '2025-10-09 10:32:51'),
(12, 2, 'signatory', 2, 'CREATE', 'roundrecord', 2, 'Created round record: SAFE', '223.178.209.117', '2025-10-09 10:38:40'),
(13, 2, 'signatory', 2, 'CREATE', 'roundrecord', 3, 'Created round record: Safe', '223.178.209.85', '2025-10-13 04:55:16'),
(14, 2, 'signatory', 2, 'CREATE', 'roundrecord', 4, 'Created round record: Volun', '223.178.209.85', '2025-10-13 04:58:47'),
(15, 2, 'signatory', 2, 'CREATE', 'roundrecord', 5, 'Created round record: Safe Post Money', '223.178.209.85', '2025-10-13 08:42:02'),
(16, 2, 'signatory', 2, 'CREATE', 'roundrecord', 6, 'Created round record: Next', '223.178.209.85', '2025-10-13 09:29:35'),
(17, 2, 'signatory', 2, 'CREATE', 'roundrecord', 7, 'Created round record: Preffered', '223.178.209.85', '2025-10-13 11:16:56'),
(18, 2, 'signatory', 2, 'UPDATE', 'roundrecord', 7, 'Updated round record: Preffered', '223.178.209.85', '2025-10-13 11:19:28'),
(19, 2, 'signatory', 2, 'CREATE', 'roundrecord', 8, 'Created round record: Convertible Note', '223.178.209.85', '2025-10-13 11:40:57'),
(20, 1, 'signatory', 1, 'CREATE', 'roundrecord', 9, 'Created round record: Safe', '223.178.209.6', '2025-10-18 06:05:01'),
(21, 1, 'signatory', 1, 'CREATE', 'roundrecord', 10, 'Created round record: Safe', '223.178.209.6', '2025-10-18 06:20:53'),
(22, 1, 'signatory', 1, 'CREATE', 'roundrecord', 11, 'Created round record: Round 0', '223.178.212.111', '2025-10-24 06:25:37'),
(23, 1, 'signatory', 1, 'CREATE', 'roundrecord', 12, 'Created round record: Founding Share Allocation', '223.178.212.111', '2025-10-24 07:05:19'),
(24, 1, 'signatory', 1, 'CREATE', 'roundrecord', 13, 'Created round record: Pre', '223.178.212.111', '2025-10-24 07:14:47'),
(25, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 08:44:26'),
(26, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 08:46:32'),
(27, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 08:52:30'),
(28, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 08:53:41'),
(29, 2, 'signatory', 2, 'UPDATE', 'roundrecord', 1, 'Updated round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 09:16:27'),
(30, 2, 'signatory', 2, 'CREATE', 'roundrecord', 2, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 09:50:13'),
(31, 2, 'signatory', 2, 'CREATE', 'roundrecord', 3, 'Created round record: Seed Round', '223.178.210.26', '2025-11-05 10:24:40'),
(32, 2, 'signatory', 2, 'CREATE', 'roundrecord', 4, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 11:10:03'),
(33, 2, 'signatory', 2, 'CREATE', 'roundrecord', 5, 'Created round record: Founding Share Allocation', '223.178.210.26', '2025-11-05 11:11:46'),
(34, 2, 'signatory', 2, 'CREATE', 'roundrecord', 1, 'Created round record: Founding Share Allocation', '223.178.211.217', '2025-11-06 04:29:29'),
(35, 2, 'signatory', 2, 'UPDATE', 'roundrecord', 1, 'Updated round record: Founding Share Allocation', '223.178.211.217', '2025-11-06 04:30:12'),
(36, 2, 'signatory', 2, 'CREATE', 'roundrecord', 2, 'Created round record: Founding Share Allocation', '223.178.211.217', '2025-11-06 04:33:37'),
(37, 2, 'signatory', 2, 'UPDATE', 'roundrecord', 2, 'Updated round record: Founding Share Allocation', '223.178.211.217', '2025-11-06 04:39:37');

-- --------------------------------------------------------

--
-- Table structure for table `access_logs_investor`
--

CREATE TABLE `access_logs_investor` (
  `id` int(11) NOT NULL,
  `investor_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `extra_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_logs_investor`
--

INSERT INTO `access_logs_investor` (`id`, `investor_id`, `user_id`, `company_id`, `company_name`, `action`, `module`, `description`, `ip_address`, `extra_data`, `created_at`) VALUES
(1, 2, 1, 2, 'Neuo', 'REGISTER', NULL, 'New investor Test Kumar registered.', '223.178.211.133', '{\"email\":\"avinayquicktech@gmail.com\"}', '2025-10-03 10:15:06'),
(2, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 1 shares for 100', NULL, '{\"requestId\":4}', '2025-10-07 06:49:23'),
(3, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 1 shares for 250', NULL, '{\"requestId\":5}', '2025-10-07 06:50:42'),
(4, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 1 shares for 500', NULL, '{\"requestId\":6}', '2025-10-07 07:32:37'),
(5, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 2 shares for 1000', NULL, '{\"requestId\":7}', '2025-10-07 07:40:10'),
(6, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 2 shares for 1000', NULL, '{\"requestId\":8}', '2025-10-07 07:51:52'),
(7, 3, 1, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 2.68 shares for 1000', NULL, '{\"requestId\":9}', '2025-10-07 07:57:27'),
(8, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 20 shares for 20', NULL, '{\"requestId\":10}', '2025-10-13 06:42:57'),
(9, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 0 shares for 1000', NULL, '{\"requestId\":11}', '2025-10-13 06:44:26'),
(10, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 500 shares for 500', NULL, '{\"requestId\":12}', '2025-10-13 06:45:28'),
(11, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 83333.33 shares for 100', NULL, '{\"requestId\":13}', '2025-10-13 08:57:42'),
(12, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 76923.07 shares for 100', NULL, '{\"requestId\":14}', '2025-10-13 09:03:09'),
(13, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":15}', '2025-10-13 09:24:02'),
(14, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":16}', '2025-10-13 10:34:38'),
(15, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":17}', '2025-10-13 10:38:39'),
(16, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 100 shares for 80', NULL, '{\"requestId\":18}', '2025-10-13 10:39:58'),
(17, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 25 shares for 20', NULL, '{\"requestId\":19}', '2025-10-13 10:41:11'),
(18, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 4178.33 shares for 230', NULL, '{\"requestId\":20}', '2025-10-13 12:17:52'),
(19, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 250 shares for 200', NULL, '{\"requestId\":21}', '2025-10-16 09:07:13'),
(20, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 60 shares for 100000', NULL, '{\"requestId\":22}', '2025-10-16 09:08:15'),
(21, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":23}', '2025-10-16 10:23:07'),
(22, 3, 2, 2, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":24}', '2025-10-16 10:40:04'),
(23, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":25}', '2025-10-18 06:07:18'),
(24, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 125 shares for 100', NULL, '{\"requestId\":26}', '2025-10-18 06:22:52'),
(25, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 2.6 shares for 260', NULL, '{\"requestId\":27}', '2025-10-24 06:26:54'),
(26, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 25 shares for 2500', NULL, '{\"requestId\":28}', '2025-10-24 06:34:06'),
(27, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 25 shares for 2500', NULL, '{\"requestId\":29}', '2025-10-24 06:40:05'),
(28, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 39 shares for 4500', NULL, '{\"requestId\":30}', '2025-10-24 07:05:56'),
(29, 1, 1, 1, NULL, 'INVESTMENT_REQUEST', 'Capital Round', 'Investor requested 22.59 shares for 230', NULL, '{\"requestId\":31}', '2025-10-24 07:15:29');

-- --------------------------------------------------------

--
-- Table structure for table `access_logs_sigantory_last_login`
--

CREATE TABLE `access_logs_sigantory_last_login` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `signatory_email` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_logs_sigantory_last_login`
--

INSERT INTO `access_logs_sigantory_last_login` (`id`, `company_id`, `signatory_email`, `ip_address`, `created_at`) VALUES
(1, 2, 'avinayquicktech+02@gmail.com', '223.178.211.217', '2025-11-06 09:52:37'),
(7, 1, 'avinayquicktech+03@gmail.com', '223.178.209.117', '2025-10-09 17:50:56'),
(15, 1, 'avinayquicktech+02@gmail.com', '223.178.212.111', '2025-10-24 12:29:54'),
(17, 3, 'avinayquicktech+02@gmail.com', '223.178.212.111', '2025-10-24 11:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '$2a$12$8h48WxVud1SFngxaa5jGL.Y40d4d4IC1.0OMBAoyER5nndOpEN1he');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by_role` enum('signatory','owner') DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `module` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `entity_type` varchar(100) DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`)),
  `ip_address` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `user_id`, `created_by_role`, `company_id`, `module`, `action`, `entity_id`, `entity_type`, `details`, `ip_address`, `created_at`) VALUES
(1, 2, 'signatory', 2, 'Investor Reports', 'Share', 8, 'investor_updates', '\"Shared investor reports (1) with 1 investor(s).\"', '::1', '2025-10-10 05:51:18'),
(2, 2, NULL, 2, 'capital_round', 'CREATE', 3, 'roundrecord', '{\"nameOfRound\":\"Safe\",\"roundsize\":\"2000000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 04:55:16'),
(3, 2, NULL, 2, 'capital_round', 'CREATE', 4, 'roundrecord', '{\"nameOfRound\":\"Volun\",\"roundsize\":\"5000000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 04:58:47'),
(4, 2, NULL, 2, 'capital_round', 'CREATE', 5, 'roundrecord', '{\"nameOfRound\":\"Safe Post Money\",\"roundsize\":\"120000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 08:42:02'),
(5, 2, NULL, 2, 'capital_round', 'CREATE', 6, 'roundrecord', '{\"nameOfRound\":\"Next\",\"roundsize\":\"450000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 09:29:35'),
(6, 2, NULL, 2, 'capital_round', 'CREATE', 7, 'roundrecord', '{\"nameOfRound\":\"Preffered\",\"roundsize\":\"450000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 11:16:56'),
(7, 2, NULL, 2, 'capital_round', 'CREATE', 8, 'roundrecord', '{\"nameOfRound\":\"Convertible Note\",\"roundsize\":\"250000.00\",\"currency\":\"CAD $\"}', '223.178.209.85', '2025-10-13 11:40:57'),
(8, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"pi_3SIQmaAx6rm2q3py4MWZcdT4_secret_a16cChvnDUag9mncMfmNluyOk\",\"PayidOnetime\":\"\",\"payment_status\":\"succeeded\",\"discount\":\"\",\"ip_address\":\"223.178.211.111\"}', '223.178.211.111', '2025-10-15 09:14:09'),
(9, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":195,\"clientSecret\":\"pi_3SIj93Ax6rm2q3py4P1Oksu4_secret_zSkZIFQEAmZQdQEQ0bfBMDP6v\",\"PayidOnetime\":\"\",\"payment_status\":\"succeeded\",\"discount\":\"25\",\"ip_address\":\"223.178.212.99\"}', '223.178.212.99', '2025-10-16 04:50:34'),
(10, 2, NULL, 2, 'package-subscription', 'CREATE', 2, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"pi_3SIkEmAx6rm2q3py3Bcm3sUM_secret_qnHHcJSZEqWolcDQtRYcleDiF\",\"PayidOnetime\":\"\",\"payment_status\":\"succeeded\",\"ip_address\":\"223.178.212.99\"}', '223.178.212.99', '2025-10-16 06:00:32'),
(11, 2, NULL, 2, 'package-subscription', 'CREATE', 3, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"discount\":\"100\",\"ip_address\":\"223.178.212.99\"}', '223.178.212.99', '2025-10-16 08:42:09'),
(12, 2, NULL, 2, 'package-subscription', 'CREATE', 4, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"ip_address\":\"223.178.212.99\"}', '223.178.212.99', '2025-10-16 08:43:36'),
(13, 2, NULL, 2, 'package-subscription', 'CREATE', 5, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":0,\"clientSecret\":\"pi_3SImoCAx6rm2q3py4f2ApGEz_secret_RTOqTejGImiLKBF8QBxhr15xk\",\"PayidOnetime\":\"\",\"payment_status\":\"succeeded\",\"ip_address\":\"223.178.212.99\"}', '223.178.212.99', '2025-10-16 08:45:17'),
(14, 1, NULL, 3, 'company-profile', 'UPDATE', 3, 'company', '{\"company_id\":\"3\",\"ip_address\":\"223.178.211.174\",\"id\":\"3\",\"user_id\":\"1\",\"company_email\":\"test@gmail.com\",\"company_logo\":\"\",\"company_color_code\":\"#68C63B\",\"phone\":\"+919736244949\",\"company_street_address\":\"vbcbc\",\"company_name\":\"LookUp\",\"year_registration\":\"2000\",\"company_website\":\"https://test.com\",\"employee_number\":\"1-10\",\"company_linkedin\":\"\",\"formally_legally\":\"No\",\"company_wechat\":\"\",\"company_mail_address\":\"\",\"company_state\":\"Jammu and Kashmir\",\"company_city\":\"Gho Brahmanan de\",\"company_postal_code\":\"12123\",\"company_country\":\"India\",\"country_code\":\"IN\",\"state_code\":\"JK\",\"city_code\":\"\",\"gross_revenue\":\"\",\"descriptionStep4\":\"dfs\",\"problemStep4\":\"sdf\",\"solutionStep4\":\"sdfds\",\"company_industory\":\"Data Storage & Management\",\"access_token\":\"\",\"mailing_address\":\"ssss\",\"created_by_type\":\"Admin\",\"created_at\":\"2025-10-01T04:23:02.000Z\",\"articles\":\"articles_1760680100815.jpg\",\"entity_name\":\"dfgdf\",\"business_number\":\"45\",\"jurisdiction_country\":\"Argentina\",\"entity_type\":\"SA (Sociedad Anónima)\",\"date_of_incorporation\":\"2025-10-25\",\"entity_structure\":\"public\",\"office_address\":\"sss\"}', '223.178.211.174', '2025-10-17 05:48:20'),
(15, 2, NULL, 2, 'package-subscription', 'CREATE', 6, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"pi_3SJ6v3Ax6rm2q3py1c1vgccr_secret_Wxj0ZYBqT3OPi2k1pwVWzYoSd\",\"PayidOnetime\":\"\",\"payment_status\":\"succeeded\",\"discount\":\"\",\"ip_address\":\"223.178.211.174\"}', '223.178.211.174', '2025-10-17 06:13:42'),
(16, 1, NULL, 1, 'package-subscription', 'CREATE', 7, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":1,\"created_by_id\":1,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"discount\":\"100\",\"ip_address\":\"223.178.209.6\"}', '223.178.209.6', '2025-10-18 06:00:28'),
(17, 1, NULL, 1, 'package-subscription', 'CREATE', 8, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":1,\"created_by_id\":1,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"discount\":\"100\",\"ip_address\":\"223.178.209.6\"}', '223.178.209.6', '2025-10-18 06:03:33'),
(18, 1, NULL, 1, 'capital_round', 'CREATE', 9, 'roundrecord', '{\"nameOfRound\":\"Safe\",\"roundsize\":\"150000.00\",\"currency\":\"CAD $\"}', '223.178.209.6', '2025-10-18 06:05:01'),
(19, 1, NULL, 1, 'package-subscription', 'CREATE', 9, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":1,\"created_by_id\":1,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"discount\":\"100\",\"ip_address\":\"223.178.209.6\"}', '223.178.209.6', '2025-10-18 06:13:07'),
(20, 1, NULL, 1, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"1\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.209.6\",\"manual\":\"<p>New user</p>\"}', '223.178.209.6', '2025-10-18 06:17:57'),
(21, 1, NULL, 1, 'package-subscription', 'CREATE', 10, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":1,\"created_by_id\":1,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":\"\",\"payment_status\":\"free\",\"discount\":\"100\",\"ip_address\":\"223.178.209.6\"}', '223.178.209.6', '2025-10-18 06:19:50'),
(22, 1, NULL, 1, 'capital_round', 'CREATE', 10, 'roundrecord', '{\"nameOfRound\":\"Safe\",\"roundsize\":\"150000.00\",\"currency\":\"CAD $\"}', '223.178.209.6', '2025-10-18 06:20:53'),
(23, 1, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p>ss</p>\"}', '223.178.212.47', '2025-10-22 05:02:25'),
(24, 1, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p>w</p>\"}', '223.178.212.47', '2025-10-22 05:03:36'),
(25, 1, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p>ss</p>\"}', '223.178.212.47', '2025-10-22 05:07:01'),
(26, 1, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"pad\",\"company_id\":\"2\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"signature_pad\":\"data:image/png;base64,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\"}', '223.178.212.47', '2025-10-22 05:11:04'),
(27, 2, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"2\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p>iii</p>\"}', '223.178.212.47', '2025-10-22 06:19:30'),
(28, 2, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"2\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p><em>ddd</em></p>\"}', '223.178.212.47', '2025-10-22 06:19:54'),
(29, 1, NULL, 1, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"1\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p><em>ss</em></p>\"}', '223.178.212.47', '2025-10-22 06:20:21'),
(30, 2, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"2\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p><em>ddd</em></p>\"}', '223.178.212.47', '2025-10-22 06:24:30'),
(31, 1, NULL, 1, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"1\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p><em>fff</em></p>\"}', '223.178.212.47', '2025-10-22 06:24:58'),
(32, 2, NULL, 2, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"manual\",\"company_id\":\"2\",\"signatory_id\":\"2\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"manual\":\"<p><em>ddddd</em></p>\"}', '223.178.212.47', '2025-10-22 06:32:51'),
(33, 1, NULL, 1, 'Authorized Signature', 'Create', NULL, 'authorized_signature', '{\"method\":\"pad\",\"company_id\":\"1\",\"signatory_id\":\"1\",\"email\":\"avinayquicktech+02@gmail.com\",\"ip_address\":\"223.178.212.47\",\"signature_pad\":\"data:image/png;base64,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\"}', '223.178.212.47', '2025-10-22 06:35:18'),
(34, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Dataroom Management + Investor Reporting', '{\"code\":null,\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":null,\"PayidOnetime\":\"int_hkdmcft45hc9il44xjm\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 07:31:59'),
(35, 2, NULL, 2, 'package-subscription', 'CREATE', 2, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":null,\"PayidOnetime\":\"int_hkdmcft45hc9iof65hg\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 07:35:19'),
(36, 2, NULL, 2, 'package-subscription', 'CREATE', 3, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1jZnQ0NWhjOWlxZHVjcGkiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTExODYzNywiZXhwIjoxNzYxMTIyMjM3fQ.cbGEHjM9Rx-G61s50T0MaZI9Nbn9X6mHPD993tX_khM\",\"PayidOnetime\":\"int_hkdmcft45hc9iqducpi\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 07:37:18'),
(37, 2, NULL, 2, 'package-subscription', 'CREATE', 4, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zbmQyZGhjOWo2ZzliOGciLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTExOTYwOCwiZXhwIjoxNzYxMTIzMjA4fQ.jCAPdg_UeXx38qXHU6NI3b6XejkaQEPDq1Atkuo0ASA\",\"PayidOnetime\":\"int_hkdmsnd2dhc9j6g9b8g\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 07:53:29'),
(38, 2, NULL, 2, 'package-subscription', 'CREATE', 5, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zbmQyZGhjOWo4N2J3M3IiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTExOTcxNCwiZXhwIjoxNzYxMTIzMzE0fQ.NOBgueYOUMgs8du1GwUuj2Xrv4npIf2HnvMyt1wkkG4\",\"PayidOnetime\":\"int_hkdmsnd2dhc9j87bw3r\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 07:55:15'),
(39, 2, NULL, 2, 'package-subscription', 'CREATE', 6, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zbmQyZGhjOWs4NXk1ZHgiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyMTg4OSwiZXhwIjoxNzYxMTI1NDg5fQ.jK3mDmWOhnLBOOuavA7ItqDYORtzPSM78o4v6IArp0o\",\"PayidOnetime\":\"int_hkdmsnd2dhc9k85y5dx\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 08:31:30'),
(40, 2, NULL, 2, 'package-subscription', 'CREATE', 7, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":0,\"clientSecret\":null,\"PayidOnetime\":null,\"payment_status\":\"succeeded\",\"discount\":\"100\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 08:48:49'),
(41, 2, NULL, 2, 'package-subscription', 'CREATE', 8, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":231.4,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zbmQyZGhjOWtyOWQ3amoiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyMzA0MywiZXhwIjoxNzYxMTI2NjQzfQ.88obHFspz02ZWs_IYiyuaG8-0tcs6Q8t_XRM-iDMWI0\",\"PayidOnetime\":\"int_hkdmsnd2dhc9kr9d7jj\",\"payment_status\":\"succeeded\",\"discount\":\"11\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 08:50:45'),
(42, 2, NULL, 2, 'package-subscription', 'CREATE', 9, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":231.4,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zbmQyZGhjOWt0NXp6enAiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyMzE1OCwiZXhwIjoxNzYxMTI2NzU4fQ.idQjKN5jw5S7dFhFNIR1kgHFQtfrEriQnRViCslDHM4\",\"PayidOnetime\":\"int_hkdmsnd2dhc9kt5zzzp\",\"payment_status\":\"succeeded\",\"discount\":\"11\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 08:52:40'),
(43, 2, NULL, 2, 'package-subscription', 'CREATE', 10, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":231.4,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1kanBqYmhjOWwzbWs2dDciLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyMzc5MSwiZXhwIjoxNzYxMTI3MzkxfQ.pJEZP3rC-oHOshCx-HUClOYYWSK5DmJpRVj1RdR7404\",\"PayidOnetime\":\"int_hkdmdjpjbhc9l3mk6t7\",\"payment_status\":\"succeeded\",\"discount\":\"11\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:03:12'),
(44, 2, NULL, 2, 'package-subscription', 'CREATE', 11, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":231.4,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOWw2OWl0NXYiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyMzk1MCwiZXhwIjoxNzYxMTI3NTUwfQ.qOOaaB17Za4_V2FVc41AS8RD3IN9k9QknCCflAKZVgc\",\"PayidOnetime\":\"int_hkdmhzj44hc9l69it5v\",\"payment_status\":\"succeeded\",\"discount\":\"11\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:05:51'),
(45, 2, NULL, 2, 'package-subscription', 'CREATE', 12, 'Dataroom Management + Investor Reporting', '{\"code\":\"SNNNMT\",\"company_id\":2,\"created_by_id\":2,\"amount\":231.4,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1kanBqYmhjOWw5NmNncTIiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNDEyNywiZXhwIjoxNzYxMTI3NzI3fQ.q-YsEviFBVaIx1TiGp1Nk8_9ByLOhyfnpk5OlgQxxuc\",\"PayidOnetime\":\"int_hkdmdjpjbhc9l96cgq2\",\"payment_status\":\"succeeded\",\"discount\":\"11\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:08:48'),
(46, 2, NULL, 2, 'package-subscription', 'CREATE', 13, 'Dataroom Management + Investor Reporting', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOWxyYXZ5cDQiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNTIyMywiZXhwIjoxNzYxMTI4ODIzfQ.rGIeowYX_xsguM_wF5yDL1HQphd2MGJH6AkRjLc12aw\",\"PayidOnetime\":\"int_hkdmhzj44hc9lravyp4\",\"payment_status\":\"succeeded\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:27:04'),
(47, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Instance payment', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1kanBqYmhjOW01aGJnMm4iLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjA4MCwiZXhwIjoxNzYxMTI5NjgwfQ.9P9TKJQNH2O0r2g6el6Ve6uWhJw198Y_f3g1t2A8nCU\",\"PayidOnetime\":\"int_hkdmdjpjbhc9m5hbg2n\",\"payment_status\":\"succeeded\",\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:41:21'),
(48, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Instance payment', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1kanBqYmhjOW1jOWlnbWsiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjQ5MCwiZXhwIjoxNzYxMTMwMDkwfQ.BIkdKcSAuJgXscxfG45xvc-x3dwZN96QgcFNM8UasPI\",\"PayidOnetime\":\"int_hkdmdjpjbhc9mc9igmk\",\"payment_status\":\"succeeded\",\"payid\":13,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:48:11'),
(49, 2, NULL, 2, 'package-subscription', 'CREATE', 2, 'Instance payment', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1kanBqYmhjOW1kYzY5bHUiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjU1NSwiZXhwIjoxNzYxMTMwMTU1fQ.GVZ0Oxzzl4Byg9lWMsI0DX6_uBkEFamW-U_3W-5tlD4\",\"PayidOnetime\":\"int_hkdmdjpjbhc9mdc69lu\",\"payment_status\":\"succeeded\",\"payid\":13,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:49:16'),
(50, 2, NULL, 2, 'package-subscription', 'CREATE', 3, 'Instance payment', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOW1nenJmM28iLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjc3NiwiZXhwIjoxNzYxMTMwMzc2fQ.K86RwzzUtYVhKnuhKHOGBiqb277ljeDTcJXxxZ--WqA\",\"PayidOnetime\":\"int_hkdmhzj44hc9mgzrf3o\",\"payment_status\":\"succeeded\",\"usersubscriptiondataroomone_time_id\":13,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:52:57'),
(51, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":2,\"created_by_id\":2,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOW1pMmdvamUiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjg0MSwiZXhwIjoxNzYxMTMwNDQxfQ.75oY-t8sG6AogMs7_TGlJO7aNTIhiGo8g89brLVVDQ0\",\"PayidOnetime\":\"int_hkdmhzj44hc9mi2goje\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:54:02'),
(52, 2, NULL, 2, 'package-subscription', 'CREATE', 1, 'Instance payment', '{\"company_id\":2,\"created_by_id\":2,\"amount\":100,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOW1sOWFodDAiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNzAzNCwiZXhwIjoxNzYxMTMwNjM0fQ.ChBl79eWp3QTy1KUtirGDg10BjNOMYzy3TGx4dkszWs\",\"PayidOnetime\":\"int_hkdmhzj44hc9ml9aht0\",\"payment_status\":\"succeeded\",\"usersubscriptiondataroomone_time_id\":1,\"ip_address\":\"223.178.212.47\"}', '223.178.212.47', '2025-10-22 09:57:15'),
(53, 1, NULL, 1, 'package-subscription', 'CREATE', 2, 'Dataroom Management + Investor Reporting', '{\"code\":\"\",\"company_id\":1,\"created_by_id\":1,\"amount\":260,\"clientSecret\":\"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zMng3bWhjYm8yc2F0YmYiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTI4Njk5OSwiZXhwIjoxNzYxMjkwNTk5fQ.gfxRWzuArtwqaKI25QU2u9IWJNFyKLywulHYjOA9TYI\",\"PayidOnetime\":\"int_hkdms2x7mhcbo2satbf\",\"payment_status\":\"succeeded\",\"discount\":0,\"ip_address\":\"223.178.212.111\"}', '223.178.212.111', '2025-10-24 06:23:19'),
(54, 1, NULL, 1, 'capital_round', 'CREATE', 11, 'roundrecord', '{\"nameOfRound\":\"Round 0\",\"roundsize\":\"250000.00\",\"currency\":\"CAD $\"}', '223.178.212.111', '2025-10-24 06:25:37'),
(55, 1, NULL, 1, 'capital_round', 'CREATE', 12, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"750000.00\",\"currency\":\"CAD $\"}', '223.178.212.111', '2025-10-24 07:05:19'),
(56, 1, NULL, 1, 'capital_round', 'CREATE', 13, 'roundrecord', '{\"nameOfRound\":\"Pre\",\"roundsize\":\"650000.00\",\"currency\":\"CAD $\"}', '223.178.212.111', '2025-10-24 07:14:47'),
(57, 2, NULL, 2, 'capital_round', 'CREATE', 1, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 08:44:26'),
(58, 2, NULL, 2, 'capital_round', 'CREATE', 1, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 08:46:32'),
(59, 2, NULL, 2, 'capital_round', 'CREATE', 1, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 08:52:30'),
(60, 2, NULL, 2, 'capital_round', 'CREATE', 1, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 08:53:41'),
(61, 2, NULL, 2, 'capital_round', 'CREATE', 2, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 09:50:13'),
(62, 2, NULL, 2, 'capital_round', 'CREATE', 3, 'roundrecord', '{\"nameOfRound\":\"Seed Round\",\"roundsize\":\"2000.00\",\"currency\":\"CAD $\",\"round_type\":\"Investment\",\"total_founder_shares\":null,\"founder_count\":null}', '223.178.210.26', '2025-11-05 10:24:40'),
(63, 2, NULL, 2, 'capital_round', 'CREATE', 4, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.210.26', '2025-11-05 11:10:03'),
(64, 2, NULL, 2, 'capital_round', 'CREATE', 5, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"1000.00\",\"currency\":\"CAD $\",\"round_type\":\"Investment\",\"total_founder_shares\":null,\"founder_count\":null}', '223.178.210.26', '2025-11-05 11:11:46'),
(65, 2, NULL, 2, 'capital_round', 'CREATE', 1, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"\",\"currency\":\"CAD $\",\"round_type\":\"Round 0\",\"total_founder_shares\":1000,\"founder_count\":3}', '223.178.211.217', '2025-11-06 04:29:29'),
(66, 2, NULL, 2, 'capital_round', 'CREATE', 2, 'roundrecord', '{\"nameOfRound\":\"Founding Share Allocation\",\"roundsize\":\"2000.00\",\"currency\":\"CAD $\",\"round_type\":\"Investment\",\"total_founder_shares\":null,\"founder_count\":null}', '223.178.211.217', '2025-11-06 04:33:37');

-- --------------------------------------------------------

--
-- Table structure for table `authorized_signature`
--

CREATE TABLE `authorized_signature` (
  `id` int(11) NOT NULL,
  `company_signatories_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `type` enum('upload','manual','pad','auto') NOT NULL,
  `signature` text DEFAULT NULL,
  `approve` enum('No','Yes') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authorized_signature`
--

INSERT INTO `authorized_signature` (`id`, `company_signatories_id`, `user_id`, `company_id`, `type`, `signature`, `approve`, `created_at`) VALUES
(1, 2, 1, 2, 'manual', '<p><em>ddddd</em></p>', 'Yes', '2025-10-22 12:02:51'),
(2, 1, 1, 1, 'pad', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAADICAYAAAAeGRPoAAAQAElEQVR4AezdC7T1aT0H8DelVdGFSCW3WEmshCRLhHQhIlpFF0qiEqKLLppVJikVZrpMlmbSJJkumsgSKWIpcmmRkpSkNGNShGHWNCbf73TOzHve95wz57L/+/wvn1nP7zz/vfd/P/t5Ps+75rf/1/0Jx/xHgAABAgQITF5AQp/8FBoAAQIECBA4dmzYhE6YAAECBAgQWIuAhL4WZh9CgAABAgSGFZhyQh9WRusECBAgQGBCAhL6hCZLVwkQIECAwE4CEvpOMp4nQIAAAQITEpDQJzRZukqAAAECBHYSkNB3khn2ea0TIECAAIGVCkjoK+XUGAECBAgQOBoBCf1o3If9VK0TIECAwOIEJPTFTbkBEyBAgMAcBST0Oc7qsGPSOgECBAiMUEBCH+Gk6BIBAgQIENivgIS+XzHrDyugdQIECBA4kICEfiA2byJAgAABAuMSkNDHNR96M6yA1gkQIDBbAQl9tlNrYAQIECCwJAEJfUmzbazDCmidAAECRyggoR8hvo8mQIAAAQKrEpDQVyWpHQLDCmidAAECuwpI6LvyeJEAAQIECExDQEKfxjzpJYFhBbROgMDkBST0yU+hARAgQIAAgWPHJHT/CggQGFpA+wQIrEFAQl8Dso8gQIAAAQJDC0joQwtrnwCBYQW0ToDAZQIS+mUM/hAgQIAAgWkLSOjTnj+9J0BgWAGtE5iMgIQ+manSUQIECBAgsLOAhL6zjVcIECAwrIDWCaxQQEJfIaamCBAgQIDAUQlI6Ecl73MJECAwrIDWFyYgoS9swg2XAAECBOYpIKHPc16NigABAsMKaH10AhL66KZEhwgQIECAwP4FJPT9m3kHAQIECAwroPUDCEjoB0DzFgIECBAgMDYBCX1sM6I/BAgQIDCswExbl9BnOrGGRYAAAQLLEpDQlzXfRkuAAAECwwocWesS+pHR+2ACBAgQILA6AQl9dZZaIkCAAAECwwrs0rqEvguOlwgQIECAwFQEJPSpzJR+EiBAgACBXQRWkNB3ad1LBAgQIECAwFoEJPS1MPsQAgQIECAwrMDoE/qww9c6AQIECBCYh4CEPo95NAoCBAgQWLjAwhP6wmff8AkQIEBgNgIS+mym0kAIECBAYMkCEvqAs69pAgQIECCwLgEJfV3SPocAAQIECAwoIKEPiDts01onQIAAAQJXCEjoV1hYIkCAAAECkxWQ0Cc7dcN2XOsECBAgMC0BCX1a86W3BAgQIEBgWwEJfVsWTw4roHUCixF4Ykb6sY34h9QPTigEBhGQ0Adh1SgBAgSO3SsG90g8KXF24gsSz058b0IhsHIBCX3lpBo8agGfT2AkAhenH/dMdCv9+1LfO3HVxC8lHpBQCKxUQEJfKafGCBBYuMDPHDf+V2b57YnN8pIs3D1xaeKsxJ0TCoGVCUjoK6PU0DIEjJLA5QKflaU7JV6QaPL+6tSfltitnJsXH5NoeX7+3DChEFiJgIS+EkaNECAwc4FrZXw3S3xXolvXTeCPz/IdE69LdMv7Tal/KHFl5Yys8NrETRKnJBQCKxGQ0FfCqBECqxHQyqgEPie9+Y5Ed6P/YerfSzSh/3PqRyV6xnrrX83yfsolWbmJ/0OpH5LoyXKpFAKHE5DQD+fn3QQIzEegCfy+GU53hfcSs7/LcrfC/zX1DyRuneiJbT3J7V1ZPkx5T978ikTLT/SPIHBYAQn9sILeT2AyAjp6gsA187hb4M9K3eT9T6l/PPHhxI8mejz8K1OfnvibxL8lVlnOTGMfTfQM+E9OrRA4lICEfig+byZAYEICTeDdwn5h+tzd5/+TupeQXTt1rxW/fuqvSDw68TuJvp5qsPKXabm773t8/puzrBA4lICEfig+byZAYFNgpHUvDfuV9O01iSboF6f+3MRvJW6a+IzE/RO/nuiWeaq1lf/LJ70j0dKb0LQWBA4sIKEfmM4bCRAYmUAvAesu8qekXz1G3QTeRN7n3pjnelnZVVLfPtHd7F0ni0da+mXjf9ODuyU+KaEQOLCAhH5gOm8kQGB9Att+0qfn2Z7Edk7qP0mcl3hz4msS3aX+LambwL849U8n/jQxtvJn6VAPBXxi6ib1VAqBgwlI6Adz8y4CBNYvcIt8ZE9a+93UTd4XpH5R4rqJXtf9Pal7PLpb4L0srJea5alRl/eld5t7Cu6TZYXAgQUk9APTeSMBAgMKfFHa/sFEj3m/P/UHEm9L9DKyXr/du619Qx737PC7pO6lZD0O3t3Xebi/csRrv37j83u8v4cNNh6qCOxPQELfn5e1CRBYvUBvrPJtabZnl78q9b8neg/0Hgtvwv6FPO7r3X3eS8k2z1TvFviFeW3qpcf5O4ar5U/3LKRSCOxfQELfv5l3ECBwMIFPydt6VvkDUz8u0Z8SfUvq3sTltNS9ZOzPU/fnRXsGepP3t+fxMxO9xCvVFMuV9rmXyH1kY62eE3D1jWUVgX0JSOj74rIyAQJ7FPj8rNebtjR5Py3L3W3ee5j3GvDuHu+13z2Brctdtwm8l249Oev2krLN48p5OPvSvQx/sDHK7q3ooYSNhyoCexeQ0PduZU0CBLYX+Ow8fddEj2+/OnWPd/fWqN1Vfts8/s9EE/dDUzdp91fKHpvlsxPdxf6PqZde/uI4gH6pOe7h7oteJbApIKFvSqgJELgygRtlhZsneiOWbmn3Vqnd8n5vnmsi7+7xLvdM9C/Mc5+XeFCiP27S+6P3xi2bu5bztHKcQH3+e+Nx7xnfcwY2HqoI7E1AQt+bk7UILEmg10X3Zizdoj41A+/1272Pebe8e8/z/v53f8ikl4z11qnflHV6wtptUv9woteFvzO1sneB/gDM8Wbfv/e3DrmmtqckIKFPabbm39feKKQnRvU64yaPf8mQu0XXa3WbJF6Zxz0juK//fpb7a1U/m7o3Dfnu1N3t20uYevJVHiq7CHxJXrtVoj/f2fuYd9d3bf8rz/UOaz2+/ZwsPzxxUeLcxD0SX59o8m79hCw34b8utXJ4gVr2p1XbUs8/uFkXBIG9Ckjoe5Wy3lACf5uGGz0JqjcK6bHEO+W57t69cerrJG6SuGei/5Prtbp9/Q55/J2JXo/cxPKSLHe3b88Y7q7dj+Vx469S94vAI1J367FJqcdw226eml1pEug13N1t29/r7pibsF+WkfYXw3o8u7t235rHPcP8ualPSfS2qNdI/bzEwxI9MatGPXmtybs/H9ovUG/Ia8owAv3SdPz5BD3PYJhPGkmrurFaAQl9tZ5a259AT5TqbTkb/cGM/b17b2t/WVbrF4FnpO5lUk1s/YWrbvk3sXVLtDf26O7jbqU2afVkrd/M+r206pGpH5X4yUSvk27d53o3sia9frHoF4xb5vVVll5/3ZPNene0Xr7V5W5N9wtJk3TvAd69Fu13r8duIuh4/j6d6DXcvfyrZ5V3zE3YX57n+0WnX3B6slrH0v43WXeL+wZ5vcsda7fM22a31vO0skaBfjnd/Lieq9AvtpuP1QR2FZDQd+Xx4sACTei9+1ejJ1it+1rj/hhGjxU3sfX6395Lu1v998u4e1JST+Z6epZ/LvHURC+/at3nmvD6RaC7/nsI4K/zeu9S1r0Cx0e3iLvl9Ud5vZcm9Ral3Yvw23ncM8F7bLp7JhofzHN93C8cPbmsUZvuCm+S7tZ0f5u7d1Brn3vL0+6i7Zb2b+S9/dLS495N+n29hy+arBu9NKwJu9GksTkGW9yBG1HpXqaeaLjZpX553FxW70tgeStL6Mub87GNuMdyGz0juruJu7Xerc/ebKRJrImuCW6Ifnc3fxNsE20T207RO5ft5fO7y/rE9brLumd/f21eaDLtCWQ9zt8fDmmSvX6e77kDjd5QpIcf3p3nzkp0b0C3xpugexJad6X3MMSX5rU+bjsPyHLPKu//+PsFqVvl3cvQLxzdGs/LyoQEev7Cmcf1t3PfH2457imLBLYXkNC3d/Hs0Qk0iTdJ9Vhwk3vvLNbk1a3MRpPe16V73QLdb9wu7+u/+bbT6M1Murv8G/N8k+1O8al5veufGN2NvVsfeiy6x6+71b/Tet2dvtlut7jbh67bXd/dM9Ct8u696P3LN387O91RZizQhN49Ox1iD7X40ZZKjCzG2J3+z22M/dInAjsJfDQv/HGiW6D7jf7EZneH5+0rKd3VvVsfeiy6W809KW+n9ZqoV9IZjcxGoFd19DDN5oBcwrYpod5VQELflceLBAgQOBKBHna6dOOTe7imN+rZeKiav8DBRiihH8zNuwgQIDCkQPdCvSkfsLlHqfdZyEOFwM4CEvrONl4hQIDAUQn06oUX58N7fkWqY72ngJPjKiF2FNhrQt+xAS8QIECAwCAC3e1+3kbLN0zdOyGmUghsLyChb+/iWQIECBy1QO9r0PsLbPajd+vbXFYTOElgHAn9pG55ggABAgQi0PsRbB5H730Her+CPK0QOFlAQj/ZxDMECBAYi0BvDtRbEveM96umU72LYSqFwMkCS0joJ4/aMwQIEJiOQO9j0F+8a48f2D+CwHYCEvp2Kp4jQIDAeASa0M/f6E5/rOeOG8sqAlsEJPQtHAd44C0ECBAYVqC/evfkfMSFiZb+6l5rQWCLgIS+hcMDAgQIjFLgpelVf4kv1bH+EqCT4yohtghI6Fs4RvdAhwgQIFCBbp2f3oXE1RIPTSgEtghI6Fs4PCBAgMBoBX4xPetZ76mOPSh/rpVQCFwuIKFfTrHABUMmQGBKAr107bSNDn9m6u56T6UQ+LiAhP5xB38JECAwBYGz08m3Jloe0T+CwKaAhL4poV61gPYIEBhG4Ckbzd4q9e0SCoHLBCT0yxj8IUCAwGQEzklPX5vor6/dJ7VC4DIBCf0yBn8mJ6DDBJYr0Hu7PzzDb92T43rWex4qSxeQ0Jf+L8D4CRCYosDb0+nueu/93V+YZYXAMQndPwICJwt4hsAUBM5MJ9+buEPilgll4QIS+sL/ARg+AQKTFXhPev7yxA0ST0ooCxeQ0Bf+D8Dwj0DARxJYnUCvS79KmvvWxO0TyoIFJPQFT76hEyAweYH3ZQQ/n+iJcU9NrSxYQEJf8OQb+iwFDGp5Ao/NkM9P3DbR4+mplCUKSOhLnHVjJkBgTgIXZzBPS1ySeG7imgllgQIS+gIn3ZAJHFjAG8cq8Lx0rGe83yz1QxLKAgUk9AVOuiETIDA7gYsyosckWp6QP9dJKAsTkNAXNuGGS2DEArp2OIFX5O1vSFwv8fSEsjABCX1hE264BAjMVqC3gn10Rtet9fundhlbEJZUJPQlzbaxEliywDLG/uYM8/mJqyd6glx/wCWLyhIEJPQlzLIxEiCwJIFTM9h3J26RcIJcEJZSJPSlzLRxEiAwpMCY2r4gnXlYoqWXs924C2L+AhL6/OfYCAkQWJ7AazLk/njLNVKfkVAWICChL2CSDZEAgYkLHKz7j8vb3p+4W+LeCWXmAhL6zCfY8AgQhxM1vQAABatJREFUWKxAd70/cmP0z0h93YQyYwEJfcaTa2gECCxe4KUR6K73G6V+YmK74rmZCEjoM5lIwyBAgMA2ApvXpp+X1x6YuHNCmamAhD7TiTUsAgQIbAh8OPWPJa6d+JHEeq9Nzwcq6xGQ0Nfj7FMIECBwlAIvy4efm7hr4l4JZYYCEvoMJ9WQCBAgsI3AffPchYlnJuZSjOM4AQn9OAyLBAgQmLFAk3lvOHODjPGchDIzAQl9ZhNqOAQIENhF4Nfy2hsT90x0iz2VsqPAxF6Q0Cc2YbpLgACBQwhcnPd2K/0jqX850R9xSaXMQUBCn8MsGgMBAgT2LvCWrHp6oreFfUFq5WgEVv6pEvrKSTVIgACB0Qs8Kz18V6K3hL1LamUGAhL6DCbREAgQILBPgQ9m/ccmWp6TP1dLKBMX2JLQJz4W3SdAgACBvQu8Oqu+PHHTxE8llIkLSOgTn0DdJ0CAwAEFLsr7Hp/4j8SjE7dOKBMWWGNCn7CSrhMgQGCeAu/MsE5J9HawL0p9vYQyUQEJfaITp9sECBBYkcAZaadnvt889akJZaICs0noE/XXbQIECBy1wCXpwAMS5yd6jfr9UisTFJDQJzhpukyAAIEVC7wt7T04cWni2YmvSigTE5DQ9zRhViJAgMDsBV6VEZ6VuE6iN565YWplQgIS+oQmS1cJECAwsMBj0n7v9X6b1KclrppQJiIgoY9gonSBAAECIxH4UPpx98QHEv0Bl+unViYiIKFPZKJ0kwABAmsSuCCfc4eN6HIWlSkISOhTmKVD9dGbCRAgsG+Bd+Qdr08oExKQ0Cc0WbpKgAABAgR2EpDQd5Lx/J4ErESAAAEC4xCQ0McxD3pBgAABAgQOJSChH4rPm4cV0DoBAgQI7FVAQt+rlPUIECBAgMCIBST0EU+Org0roHUCBAjMSUBCn9NsGgsBAgQILFZAQl/s1Bv4sAJaJ0CAwHoFJPT1evs0AgQIECAwiICEPgirRgkMK6B1AgQInCggoZ8o4jEBAgQIEJiggIQ+wUnTZQLDCmidAIEpCkjoU5w1fSZAgAABAicISOgngHhIgMCwAlonQGAYAQl9GFetEiBAgACBtQpI6Gvl9mEECAwroHUCyxWQ0Jc790ZOgAABAjMSkNBnNJmGQoDAsAJaJzBmAQl9zLOjbwQIECBAYI8CEvoeoaxGgACBYQW0TuBwAhL64fy8mwABAgQIjEJAQh/FNOgEAQIEhhXQ+vwFJPT5z7EREiBAgMACBCT0BUyyIRIgQGBYAa2PQUBCH8Ms6AMBAgQIEDikgIR+SEBvJ0CAAIFhBbS+NwEJfW9O1iJAgAABAqMWkNBHPT06R4AAAQLDCsyndQl9PnNpJAQIECCwYAEJfcGTb+gECBAgMKzAOluX0Nep7bMIECBAgMBAAhL6QLCaJUCAAAECwwpsbV1C3+rhEQECBAgQmKSAhD7JadNpAgQIECCwVWDVCX1r6x4RIECAAAECaxGQ0NfC7EMIECBAgMCwAtNK6MNaaJ0AAQIECExWQEKf7NTpOAECBAgQuEJAQr/CwhIBAgQIEJisgIQ+2anTcQIECBAgcIWAhH6FxbBLWidAgAABAgMKSOgD4mqaAAECBAisS0BCX5f0sJ+jdQIECBBYuICEvvB/AIZPgAABAvMQkNDnMY/DjkLrBAgQIDB6AQl99FOkgwQIECBA4MoFJPQrN7LGsAJaJ0CAAIEVCEjoK0DUBAECBAgQOGoBCf2oZ8DnDyugdQIECCxEQEJfyEQbJgECBAjMW0BCn/f8Gt2wAlonQIDAaAQk9NFMhY4QIECAAIGDC0joB7fzTgLDCmidAAEC+xCQ0PeBZVUCBAgQIDBWAQl9rDOjXwSGFdA6AQIzE5DQZzahhkOAAAECyxSQ0Jc570ZNYFgBrRMgsHYBCX3t5D6QAAECBAisXuD/AQAA//9gllkQAAAABklEQVQDAG5e7aA2v8atAAAAAElFTkSuQmCC', 'Yes', '2025-10-22 12:05:18'),
(5, 5, 1, 3, 'manual', 'Test kumar', 'Yes', '2025-10-22 12:07:25');

-- --------------------------------------------------------

--
-- Table structure for table `broadcastesession`
--

CREATE TABLE `broadcastesession` (
  `id` int(11) NOT NULL,
  `unique_code` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `topic` text DEFAULT NULL,
  `meetingLink` text DEFAULT NULL,
  `module_id` int(11) DEFAULT 0,
  `access_token` text DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL,
  `status` enum('No','Yes') NOT NULL,
  `meeting_date` date DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `meeting_date_time` datetime DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `company_email` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_color_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company_street_address` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `year_registration` varchar(255) DEFAULT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `employee_number` varchar(255) DEFAULT NULL,
  `company_linkedin` varchar(255) DEFAULT NULL,
  `formally_legally` varchar(255) DEFAULT NULL,
  `company_wechat` varchar(255) DEFAULT NULL,
  `company_mail_address` varchar(255) DEFAULT NULL,
  `company_state` varchar(255) DEFAULT NULL,
  `company_city` varchar(255) DEFAULT NULL,
  `company_postal_code` varchar(255) DEFAULT NULL,
  `company_country` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `state_code` varchar(255) DEFAULT NULL,
  `city_code` varchar(255) DEFAULT NULL,
  `gross_revenue` varchar(255) DEFAULT NULL,
  `descriptionStep4` text DEFAULT NULL,
  `problemStep4` text DEFAULT NULL,
  `solutionStep4` text DEFAULT NULL,
  `company_industory` varchar(255) DEFAULT NULL,
  `access_token` varchar(100) DEFAULT NULL,
  `mailing_address` text DEFAULT NULL,
  `created_by_type` enum('Admin','Company') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `user_id`, `company_email`, `company_logo`, `company_color_code`, `phone`, `company_street_address`, `company_name`, `year_registration`, `company_website`, `employee_number`, `company_linkedin`, `formally_legally`, `company_wechat`, `company_mail_address`, `company_state`, `company_city`, `company_postal_code`, `company_country`, `country_code`, `state_code`, `city_code`, `gross_revenue`, `descriptionStep4`, `problemStep4`, `solutionStep4`, `company_industory`, `access_token`, `mailing_address`, `created_by_type`, `created_at`) VALUES
(1, 1, 'avinayquicktech@gmail.com', NULL, '#13961C', '+14334334343', 'gdfg', 'My corp', '2000', 'http://test.com', '1-10', NULL, 'No', NULL, NULL, 'Haryana', 'Dharuhera', '456456456', 'India', 'IN', 'HR', NULL, NULL, 'xcvdfv', 'dfgdgf', 'dfgdfg', 'Data Storage & Management', NULL, NULL, 'Admin', '2025-09-24 05:30:27'),
(2, 1, 'avinayquicktech+011@gmail.com', NULL, '#8E320B', '+14334334343', 'sss', 'Neuo', '2000', 'http://test.com', '1-10', NULL, 'No', NULL, NULL, 'Gjirokastër County', NULL, '435345', 'Albania', 'AL', '05', NULL, NULL, 'fdghgfh', 'gfgg', 'gggg', 'Data Storage & Management', NULL, NULL, 'Admin', '2025-09-24 05:50:30'),
(3, 1, 'test@gmail.com', NULL, '#68C63B', '+919736244949', 'vbcbc', 'LookUp', '2000', 'https://test.com', '1-10', NULL, 'No', NULL, NULL, 'Jammu and Kashmir', 'Gho Brahmanan de', '12123', 'India', 'IN', 'JK', NULL, NULL, 'dfs', 'sdf', 'sdfds', 'Data Storage & Management', NULL, NULL, 'Admin', '2025-10-01 04:23:02'),
(6, 3, NULL, NULL, '#98E22D', '+14805555555', 's', 'Test', '2000', 'https://test.com', '11-50', NULL, 'No', NULL, NULL, 'Jowzjan', 'Darzāb', '176208', 'Afghanistan', 'AF', 'JOW', NULL, NULL, 'fggf', 'fgfg', 'fgfgf', 'Cybersecurity', NULL, NULL, 'Admin', '2025-10-09 12:19:11'),
(7, 1, NULL, NULL, '#6ED8F0', '+1212122222', 'f', 'ddd', '2222', 'http://test.com', '1-10', NULL, 'Yes', NULL, NULL, 'Béjaïa', 'Seddouk', '12123', 'Algeria', 'DZ', '06', NULL, NULL, 'df', 'df', 'df', 'Electric Vehicles & Sustainable Transportation', NULL, NULL, 'Admin', '2025-10-21 07:14:57'),
(8, 1, NULL, NULL, '#03A727', '+1212122222', 'ss', 'ss@gmail.com', '2006', 'http://test.com', '11-50', NULL, 'Yes', NULL, NULL, 'Berat County', NULL, '12123', 'Albania', 'AL', '01', NULL, NULL, 'sws', 's', 's', 'Agriculture & Farming', NULL, NULL, 'Admin', '2025-10-21 07:18:20'),
(9, 1, NULL, NULL, '#650E75', '+1212122222', 'ss', 'y', '2006', 'http://test.com', '11-50', NULL, 'Yes', NULL, NULL, 'Berat County', NULL, '12123', 'Albania', 'AL', '01', NULL, NULL, 'sws', 's', 's', 'Agriculture & Farming', NULL, NULL, 'Admin', '2025-10-21 07:18:20'),
(10, 1, 'tts@gmail.com', NULL, '#694FFB', '+14334334343', 'dsfd', 'tts@gmail.com', '2000', 'http://test.com', '1-10', NULL, 'Yes', NULL, NULL, 'Haryana', 'Faridabad', '12123', 'India', 'IN', 'HR', NULL, NULL, 'dsf', 'sdf', 'sdf', 'Consumer Goods', NULL, NULL, 'Admin', '2025-10-21 07:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `company_exchanges_data`
--

CREATE TABLE `company_exchanges_data` (
  `id` int(11) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `exchange` varchar(255) DEFAULT NULL,
  `full_form` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_exchange_world_details`
--

CREATE TABLE `company_exchange_world_details` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `uniqcode` varchar(255) DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT 0,
  `canada_TSX` text DEFAULT NULL,
  `usa_NASDAQ` text DEFAULT NULL,
  `usa_NYSE` text DEFAULT NULL,
  `england_FTSE` text DEFAULT NULL,
  `australia_ASX` text DEFAULT NULL,
  `EU` text DEFAULT NULL,
  `china_HKEX` text DEFAULT NULL,
  `china_SSE` text DEFAULT NULL,
  `singapore_SGX` text DEFAULT NULL,
  `india_NSE` text DEFAULT NULL,
  `press_public_reaction` text DEFAULT NULL,
  `miscUploads` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_exchange_world_details`
--

INSERT INTO `company_exchange_world_details` (`id`, `company_id`, `uniqcode`, `version`, `canada_TSX`, `usa_NASDAQ`, `usa_NYSE`, `england_FTSE`, `australia_ASX`, `EU`, `china_HKEX`, `china_SSE`, `singapore_SGX`, `india_NSE`, `press_public_reaction`, `miscUploads`, `created_at`) VALUES
(1, 2, 'TEQCHp', 1, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-03 08:43:43'),
(2, 2, '0XpCHi', 2, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-08 05:58:47'),
(3, 2, '0XpCHi', 3, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-08 06:41:56'),
(4, 2, '0XpCHi', 4, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-08 06:44:32'),
(5, 2, '0XpCHi', 5, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-08 06:47:23'),
(6, 2, '0XpCHi', 6, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-08 06:48:55'),
(7, 2, 'CJck9E', 7, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-22 09:26:31'),
(8, 2, 'TKkYK2', 8, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-22 09:40:50'),
(9, 2, 'g0hmjM', 9, '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[]', 'N/A', '[]', '2025-10-22 09:56:57');

-- --------------------------------------------------------

--
-- Table structure for table `company_investor`
--

CREATE TABLE `company_investor` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `investor_id` int(11) NOT NULL DEFAULT 0,
  `investorType` varchar(255) DEFAULT NULL,
  `investmentPreference` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_investor`
--

INSERT INTO `company_investor` (`id`, `company_id`, `created_by_id`, `created_by_role`, `investor_id`, `investorType`, `investmentPreference`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(5, 2, 1, 'signatory', 3, NULL, NULL, NULL, NULL, '2025-09-25 10:06:14', '0000-00-00 00:00:00'),
(6, 1, 1, 'signatory', 1, NULL, NULL, NULL, NULL, '2025-10-04 13:13:29', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `company_legal_information`
--

CREATE TABLE `company_legal_information` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT 0,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `articles` varchar(255) DEFAULT NULL,
  `entity_name` varchar(255) DEFAULT NULL,
  `business_number` varchar(255) DEFAULT NULL,
  `jurisdiction_country` varchar(255) DEFAULT NULL,
  `entity_type` varchar(255) DEFAULT NULL,
  `date_of_incorporation` varchar(255) DEFAULT NULL,
  `entity_structure` varchar(255) DEFAULT NULL,
  `office_address` text DEFAULT NULL,
  `mailing_address` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_legal_information`
--

INSERT INTO `company_legal_information` (`id`, `user_id`, `company_id`, `articles`, `entity_name`, `business_number`, `jurisdiction_country`, `entity_type`, `date_of_incorporation`, `entity_structure`, `office_address`, `mailing_address`, `created_at`) VALUES
(1, 1, 3, 'articles_1760680100815.jpg', 'dfgdf', '45', 'Argentina', 'SA (Sociedad Anónima)', '2025-10-25', 'public', 'sss', 'ssss', '2025-10-17 11:29:30');

-- --------------------------------------------------------

--
-- Table structure for table `company_logo`
--

CREATE TABLE `company_logo` (
  `id` int(11) NOT NULL,
  `dataroomdocuments_id` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_logo`
--

INSERT INTO `company_logo` (`id`, `dataroomdocuments_id`, `created_at`) VALUES
(1, 5, '2025-10-08 10:37:44'),
(2, 6, '2025-10-08 10:38:04');

-- --------------------------------------------------------

--
-- Table structure for table `company_shares_investment`
--

CREATE TABLE `company_shares_investment` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `investor_id` int(11) NOT NULL DEFAULT 0,
  `roundrecord_id` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_shares_investment`
--

INSERT INTO `company_shares_investment` (`id`, `company_id`, `investor_id`, `roundrecord_id`, `created_at`) VALUES
(1, 2, 1, 1, '2025-09-24 15:20:55');

-- --------------------------------------------------------

--
-- Table structure for table `company_signatories`
--

CREATE TABLE `company_signatories` (
  `id` int(11) NOT NULL,
  `unique_code` varchar(255) DEFAULT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `signatory_email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `viewpassword` varchar(255) DEFAULT NULL,
  `linked_in` varchar(255) DEFAULT NULL,
  `signatory_phone` varchar(255) DEFAULT NULL,
  `signature_role` varchar(255) DEFAULT NULL,
  `access_status` enum('pending','active') NOT NULL,
  `invited_by` int(11) NOT NULL DEFAULT 0,
  `invited_at` datetime DEFAULT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_signatories`
--

INSERT INTO `company_signatories` (`id`, `unique_code`, `company_id`, `user_id`, `first_name`, `last_name`, `signatory_email`, `password`, `viewpassword`, `linked_in`, `signatory_phone`, `signature_role`, `access_status`, `invited_by`, `invited_at`, `accepted_at`, `last_login`) VALUES
(1, 'ZAR1758691827729134', 1, 1, 'Test', 'kk', 'avinayquicktech+02@gmail.com', '$2b$12$uU2JNi94qY07H.dtQ3QiZ.X9LxBjbU.5y02r.D9wgsnu3q.Iq6v7a', 'Code@2025#', 'Test', '+14805555555', 'Advisory Board Member – Expert advisor guiding strategy, growth, and investor relations', 'active', 1, '2025-09-24 11:00:27', '2025-09-24 11:24:44', '2025-10-24 12:29:54'),
(2, 'FYX1758693030310796', 2, 1, 'Testttg', 'test', 'avinayquicktech+02@gmail.com', '$2b$12$uU2JNi94qY07H.dtQ3QiZ.X9LxBjbU.5y02r.D9wgsnu3q.Iq6v7a', 'Code@2025#', 'testt', '+14805555555', 'Advisory Board Member – Expert advisor guiding strategy, growth, and investor relations', 'active', 1, '2025-09-24 11:20:30', '2025-10-10 14:12:38', '2025-11-06 09:52:37'),
(3, '5AN1758693030310582', 2, 1, 'fgfg', 'fgfhg', 'avinayquicktech+03@gmail.com', '$2b$12$ybfKGujzuUrWCUYjKOKA5eqpEmmW/mFDMLb/ORcwwdAX/q4AqbcCS', 'Code@2026#', 'http://test.com', '+14334334343', 'Chief People Officer (CPO) – Builds company culture and HR strategy', 'active', 1, '2025-09-24 11:20:30', '2025-10-15 12:25:20', NULL),
(4, '2F51758698961092614', 1, 1, 'Hi', 'hh', 'avinayquicktech+03@gmail.com', '$2b$12$ybfKGujzuUrWCUYjKOKA5eqpEmmW/mFDMLb/ORcwwdAX/q4AqbcCS', 'Code@2026#', 'tgtgfg', '+14805555555', 'Advisory Board Member – Expert advisor guiding strategy, growth, and investor relations', 'active', 1, '2025-09-24 12:59:21', '2025-09-24 13:00:02', '2025-10-10 14:12:11'),
(5, '9F01759292582473261', 3, 1, 'Test', 'kumar', 'avinayquicktech+02@gmail.com', '$2b$12$uU2JNi94qY07H.dtQ3QiZ.X9LxBjbU.5y02r.D9wgsnu3q.Iq6v7a', 'Code@2025#', 'fdgf', '+91565556656', 'Chief Investment Officer (CIO) – Manages engagements with investors and shareholders', 'active', 1, '2025-10-01 09:53:02', '2025-10-10 14:12:42', '2025-10-24 11:24:30'),
(10, 'T7P1760082178918226', 3, 1, 't', 'r', 'avinayquicktech+099@gmail.com', '$2b$12$O2S.LCD3S45Xv4KRjPBqcOZpqUp2LlyjDSIvK/8qzrItmLA.gLbiC', 'Code@2027#', 'df', '+919736244949', 'Other', 'active', 1, '2025-10-10 13:12:58', '2025-10-10 13:13:46', '2025-10-10 14:12:16'),
(11, 'R3S1761030897032843', 7, 1, 'Avinay', 'Kumar', 'avinayquicktech@gmail.com', NULL, NULL, NULL, '+14805555555', 'Founder and Chief Executive Officer (CEO) – Visionary and strategic leader', 'pending', 1, '2025-10-21 12:44:57', NULL, NULL),
(12, 'L0C1761031100536162', 8, 1, 'Avinay', 'Kumar', 'avinayquicktech@gmail.com', NULL, NULL, NULL, '+14805555555', 'Founder and Chief Executive Officer (CEO) – Visionary and strategic leader', 'pending', 1, '2025-10-21 12:48:20', NULL, NULL),
(13, 'N2C1761031100610298', 9, 1, 'Avinay', 'Kumar', 'avinayquicktech@gmail.com', NULL, NULL, NULL, '+14805555555', 'Founder and Chief Executive Officer (CEO) – Visionary and strategic leader', 'pending', 1, '2025-10-21 12:48:20', NULL, NULL),
(14, '4W11761031165074392', 10, 1, 'Avinay', 'Kumar', 'avinayquicktech@gmail.com', NULL, NULL, NULL, '+14805555555', 'Founder and Chief Executive Officer (CEO) – Visionary and strategic leader', 'pending', 1, '2025-10-21 12:49:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `code`) VALUES
(1, 'Afghanistan', 'AF'),
(2, 'Albania', 'AL'),
(3, 'Algeria', 'DZ'),
(4, 'American Samoa', 'AS'),
(5, 'Andorra', 'AD'),
(6, 'Angola', 'AO'),
(7, 'Anguilla', 'AI'),
(8, 'Antarctica', 'AQ'),
(9, 'Antigua and Barbuda', 'AG'),
(10, 'Argentina', 'AR'),
(11, 'Armenia', 'AM'),
(12, 'Aruba', 'AW'),
(13, 'Australia', 'AU'),
(14, 'Austria', 'AT'),
(15, 'Azerbaijan', 'AZ'),
(16, 'Bahamas (the)', 'BS'),
(17, 'Bahrain', 'BH'),
(18, 'Bangladesh', 'BD'),
(19, 'Barbados', 'BB'),
(20, 'Belarus', 'BY'),
(21, 'Belgium', 'BE'),
(22, 'Belize', 'BZ'),
(23, 'Benin', 'BJ'),
(24, 'Bermuda', 'BM'),
(25, 'Bhutan', 'BT'),
(26, 'Bolivia (Plurinational State of)', 'BO'),
(27, 'Bonaire, Sint Eustatius and Saba', 'BQ'),
(28, 'Bosnia and Herzegovina', 'BA'),
(29, 'Botswana', 'BW'),
(30, 'Bouvet Island', 'BV'),
(31, 'Brazil', 'BR'),
(32, 'British Indian Ocean Territory (the)', 'IO'),
(33, 'Brunei Darussalam', 'BN'),
(34, 'Bulgaria', 'BG'),
(35, 'Burkina Faso', 'BF'),
(36, 'Burundi', 'BI'),
(37, 'Cabo Verde', 'CV'),
(38, 'Cambodia', 'KH'),
(39, 'Cameroon', 'CM'),
(40, 'Canada', 'CA'),
(41, 'Cayman Islands (the)', 'KY'),
(42, 'Central African Republic (the)', 'CF'),
(43, 'Chad', 'TD'),
(44, 'Chile', 'CL'),
(45, 'China', 'CN'),
(46, 'Christmas Island', 'CX'),
(47, 'Cocos (Keeling) Islands (the)', 'CC'),
(48, 'Colombia', 'CO'),
(49, 'Comoros (the)', 'KM'),
(50, 'Congo (the Democratic Republic of the)', 'CD'),
(51, 'Congo (the)', 'CG'),
(52, 'Cook Islands (the)', 'CK'),
(53, 'Costa Rica', 'CR'),
(54, 'Croatia', 'HR'),
(55, 'Cuba', 'CU'),
(56, 'Curaçao', 'CW'),
(57, 'Cyprus', 'CY'),
(58, 'Czechia', 'CZ'),
(59, 'Denmark', 'DK'),
(60, 'Djibouti', 'DJ'),
(61, 'Dominica', 'DM'),
(62, 'Dominican Republic (the)', 'DO'),
(63, 'Ecuador', 'EC'),
(64, 'Egypt', 'EG'),
(65, 'El Salvador', 'SV'),
(66, 'Equatorial Guinea', 'GQ'),
(67, 'Eritrea', 'ER'),
(68, 'Estonia', 'EE'),
(69, 'Eswatini', 'SZ'),
(70, 'Ethiopia', 'ET'),
(71, 'Falkland Islands (the) [Malvinas]', 'FK'),
(72, 'Faroe Islands (the)', 'FO'),
(73, 'Fiji', 'FJ'),
(74, 'Finland', 'FI'),
(75, 'France', 'FR'),
(76, 'French Guiana', 'GF'),
(77, 'French Polynesia', 'PF'),
(78, 'French Southern Territories (the)', 'TF'),
(79, 'Gabon', 'GA'),
(80, 'Gambia (the)', 'GM'),
(81, 'Georgia', 'GE'),
(82, 'Germany', 'DE'),
(83, 'Ghana', 'GH'),
(84, 'Gibraltar', 'GI'),
(85, 'Greece', 'GR'),
(86, 'Greenland', 'GL'),
(87, 'Grenada', 'GD'),
(88, 'Guadeloupe', 'GP'),
(89, 'Guam', 'GU'),
(90, 'Guatemala', 'GT'),
(91, 'Guernsey', 'GG'),
(92, 'Guinea', 'GN'),
(93, 'Guinea-Bissau', 'GW'),
(94, 'Guyana', 'GY'),
(95, 'Haiti', 'HT'),
(96, 'Heard Island and McDonald Islands', 'HM'),
(97, 'Holy See (the)', 'VA'),
(98, 'Honduras', 'HN'),
(99, 'Hong Kong', 'HK'),
(100, 'Hungary', 'HU'),
(101, 'Iceland', 'IS'),
(102, 'India', 'IN'),
(103, 'Indonesia', 'ID'),
(104, 'Iran (Islamic Republic of)', 'IR'),
(105, 'Iraq', 'IQ'),
(106, 'Ireland', 'IE'),
(107, 'Isle of Man', 'IM'),
(108, 'Israel', 'IL'),
(109, 'Italy', 'IT'),
(110, 'Jamaica', 'JM'),
(111, 'Japan', 'JP'),
(112, 'Jersey', 'JE'),
(113, 'Jordan', 'JO'),
(114, 'Kazakhstan', 'KZ'),
(115, 'Kenya', 'KE'),
(116, 'Kiribati', 'KI'),
(117, 'Korea (the Republic of)', 'KR'),
(118, 'Kuwait', 'KW'),
(119, 'Kyrgyzstan', 'KG'),
(120, 'Latvia', 'LV'),
(121, 'Lebanon', 'LB'),
(122, 'Lesotho', 'LS'),
(123, 'Liberia', 'LR'),
(124, 'Libya', 'LY'),
(125, 'Liechtenstein', 'LI'),
(126, 'Lithuania', 'LT'),
(127, 'Luxembourg', 'LU'),
(128, 'Macao', 'MO'),
(129, 'Madagascar', 'MG'),
(130, 'Malawi', 'MW'),
(131, 'Malaysia', 'MY'),
(132, 'Maldives', 'MV'),
(133, 'Mali', 'ML'),
(134, 'Malta', 'MT'),
(135, 'Marshall Islands (the)', 'MH'),
(136, 'Martinique', 'MQ'),
(137, 'Mauritania', 'MR'),
(138, 'Mauritius', 'MU'),
(139, 'Mayotte', 'YT'),
(140, 'Mexico', 'MX'),
(141, 'Micronesia (Federated States of)', 'FM'),
(142, 'Moldova (the Republic of)', 'MD'),
(143, 'Monaco', 'MC'),
(144, 'Mongolia', 'MN'),
(145, 'Montenegro', 'ME'),
(146, 'Montserrat', 'MS'),
(147, 'Morocco', 'MA'),
(148, 'Mozambique', 'MZ'),
(149, 'Myanmar', 'MM'),
(150, 'Namibia', 'NA'),
(151, 'Nauru', 'NR'),
(152, 'Nepal', 'NP'),
(153, 'Netherlands', 'NL'),
(154, 'New Caledonia', 'NC'),
(155, 'New Zealand', 'NZ'),
(156, 'Nicaragua', 'NI'),
(157, 'Niger (the)', 'NE'),
(158, 'Nigeria', 'NG'),
(159, 'Niue', 'NU'),
(160, 'Norfolk Island', 'NF'),
(161, 'Northern Mariana Islands (the)', 'MP'),
(162, 'Norway', 'NO'),
(163, 'Oman', 'OM'),
(164, 'Pakistan', 'PK'),
(165, 'Palau', 'PW'),
(166, 'Palestine, State of', 'PS'),
(167, 'Panama', 'PA'),
(168, 'Papua New Guinea', 'PG'),
(169, 'Paraguay', 'PY'),
(170, 'Peru', 'PE'),
(171, 'Philippines', 'PH'),
(172, 'Pitcairn', 'PN'),
(173, 'Poland', 'PL'),
(174, 'Portugal', 'PT'),
(175, 'Puerto Rico', 'PR'),
(176, 'Qatar', 'QA'),
(177, 'Republic of North Macedonia', 'MK'),
(178, 'Romania', 'RO'),
(179, 'Russia', 'RU'),
(180, 'Rwanda', 'RW'),
(181, 'Réunion', 'RE'),
(182, 'Saint Barthélemy', 'BL'),
(183, 'Saint Helena, Ascension and Tristan da Cunha', 'SH'),
(184, 'Saint Kitts and Nevis', 'KN'),
(185, 'Saint Lucia', 'LC'),
(186, 'Saint Martin (French part)', 'MF'),
(187, 'Saint Pierre and Miquelon', 'PM'),
(188, 'Saint Vincent and the Grenadines', 'VC'),
(189, 'Samoa', 'WS'),
(190, 'San Marino', 'SM'),
(191, 'Sao Tome and Principe', 'ST'),
(192, 'Saudi Arabia', 'SA'),
(193, 'Senegal', 'SN'),
(194, 'Serbia', 'RS'),
(195, 'Seychelles', 'SC'),
(196, 'Sierra Leone', 'SL'),
(197, 'Singapore', 'SG'),
(198, 'Sint Maarten (Dutch part)', 'SX'),
(199, 'Slovakia', 'SK'),
(200, 'Slovenia', 'SI'),
(201, 'Solomon Islands', 'SB'),
(202, 'Somalia', 'SO'),
(203, 'South Africa', 'ZA'),
(204, 'South Georgia and the South Sandwich Islands', 'GS'),
(205, 'South Sudan', 'SS'),
(206, 'Spain', 'ES'),
(207, 'Sri Lanka', 'LK'),
(208, 'Sudan (the)', 'SD'),
(209, 'Suriname', 'SR'),
(210, 'Svalbard and Jan Mayen', 'SJ'),
(211, 'Sweden', 'SE'),
(212, 'Switzerland', 'CH'),
(213, 'Syrian Arab Republic', 'SY'),
(214, 'Taiwan', 'TW'),
(215, 'Tajikistan', 'TJ'),
(216, 'Tanzania, United Republic of', 'TZ'),
(217, 'Thailand', 'TH'),
(218, 'Timor-Leste', 'TL'),
(219, 'Togo', 'TG'),
(220, 'Tokelau', 'TK'),
(221, 'Tonga', 'TO'),
(222, 'Trinidad and Tobago', 'TT'),
(223, 'Tunisia', 'TN'),
(224, 'Turkey', 'TR'),
(225, 'Turkmenistan', 'TM'),
(226, 'Turks and Caicos Islands (the)', 'TC'),
(227, 'Tuvalu', 'TV'),
(228, 'Uganda', 'UG'),
(229, 'Ukraine', 'UA'),
(230, 'United Arab Emirates', 'AE'),
(231, 'United Kingdom', 'GB'),
(232, 'United States Minor Outlying Islands (the)', 'UM'),
(233, 'United States', 'US'),
(234, 'Uruguay', 'UY'),
(235, 'Uzbekistan', 'UZ'),
(236, 'Vanuatu', 'VU'),
(237, 'Venezuela (Bolivarian Republic of)', 'VE'),
(238, 'Viet Nam', 'VN'),
(239, 'Virgin Islands (British)', 'VG'),
(240, 'Virgin Islands (U.S.)', 'VI'),
(241, 'Wallis and Futuna', 'WF'),
(242, 'Western Sahara', 'EH'),
(243, 'Yemen', 'YE'),
(244, 'Zambia', 'ZM'),
(245, 'Zimbabwe', 'ZW'),
(246, 'Åland Islands', 'AX'),
(247, 'South Korea', 'KR'),
(248, 'Czech Republic', 'CZ');

-- --------------------------------------------------------

--
-- Table structure for table `country_symbol`
--

CREATE TABLE `country_symbol` (
  `id` int(11) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `currency_code` varchar(10) NOT NULL,
  `currency_symbol` varchar(10) NOT NULL,
  `currency_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country_symbol`
--

INSERT INTO `country_symbol` (`id`, `code`, `name`, `currency_code`, `currency_symbol`, `currency_name`) VALUES
(1, 'AF', 'Afghanistan', 'AFN', '؋', 'Afghan afghani'),
(2, 'AX', 'Åland Islands', 'EUR', '€', 'Euro'),
(3, 'AL', 'Albania', 'ALL', 'Lek', 'Albanian lek'),
(4, 'DZ', 'Algeria', 'DZD', 'دج', 'Algerian dinar'),
(5, 'AS', 'American Samoa', 'USD', '$', 'United States dollar'),
(6, 'AD', 'Andorra', 'EUR', '€', 'Euro'),
(7, 'AO', 'Angola', 'AOA', 'Kz', 'Angolan kwanza'),
(8, 'AI', 'Anguilla', 'XCD', '$', 'East Caribbean dollar'),
(9, 'AQ', 'Antarctica', 'AAD', '$', 'US dollar, Euro'),
(10, 'AG', 'Antigua and Barbuda', 'XCD', '$', 'East Caribbean dollar'),
(11, 'AR', 'Argentina', 'ARS', '$', 'Argentine peso'),
(12, 'AM', 'Armenia', 'AMD', '֏', 'Armenian dram'),
(13, 'AW', 'Aruba', 'AWG', 'ƒ', 'Aruban florin'),
(14, 'AU', 'Australia', 'AUD', '$', 'Australian dollar'),
(15, 'AT', 'Austria', 'EUR', '€', 'Euro'),
(16, 'AZ', 'Azerbaijan', 'AZN', 'm', 'Azerbaijani manat'),
(17, 'BS', 'Bahamas', 'BSD', 'B$', 'Bahamian dollar'),
(18, 'BH', 'Bahrain', 'BHD', '.د.ب', 'Bahraini dinar'),
(19, 'BD', 'Bangladesh', 'BDT', '৳', 'Bangladeshi taka'),
(20, 'BB', 'Barbados', 'BBD', 'Bds$', 'Barbadian dollar'),
(21, 'BY', 'Belarus', 'BYN', 'Br', 'Belarusian ruble'),
(22, 'BE', 'Belgium', 'EUR', '€', 'Euro'),
(23, 'BZ', 'Belize', 'BZD', '$', 'Belize dollar'),
(24, 'BJ', 'Benin', 'XOF', 'CFA', 'West African CFA franc'),
(25, 'BM', 'Bermuda', 'BMD', '$', 'Bermudian dollar'),
(26, 'BT', 'Bhutan', 'BTN', 'Nu.', 'Bhutanese ngultrum'),
(27, 'BO', 'Bolivia (Plurinational State of)', 'BOB', 'Bs.', 'Bolivian boliviano'),
(28, 'BA', 'Bosnia and Herzegovina', 'BAM', 'KM', 'Bosnia and Herzegovina convertible mark'),
(29, 'BW', 'Botswana', 'BWP', 'P', 'Botswana pula'),
(30, 'BV', 'Bouvet Island', 'NOK', 'kr', 'Norwegian krone'),
(31, 'BR', 'Brazil', 'BRL', 'R$', 'Brazilian real'),
(32, 'IO', 'British Indian Ocean Territory', 'USD', '$', 'United States dollar'),
(33, 'BN', 'Brunei Darussalam', 'BND', 'B$', 'Brunei dollar'),
(34, 'BG', 'Bulgaria', 'BGN', 'Лв.', 'Bulgarian lev'),
(35, 'BF', 'Burkina Faso', 'XOF', 'CFA', 'West African CFA franc'),
(36, 'BI', 'Burundi', 'BIF', 'FBu', 'Burundian franc'),
(37, 'CV', 'Cabo Verde', 'CVE', '$', 'Cape Verdean escudo'),
(38, 'KH', 'Cambodia', 'KHR', 'KHR', 'Cambodian riel'),
(39, 'CM', 'Cameroon', 'XAF', 'FCFA', 'Central African CFA franc'),
(40, 'CA', 'Canada', 'CAD', '$', 'Canadian dollar'),
(41, 'BQ', 'Caribbean Netherlands', 'USD', '$', 'United States dollar'),
(42, 'KY', 'Cayman Islands', 'KYD', '$', 'Cayman Islands dollar'),
(43, 'CF', 'Central African Republic', 'XAF', 'FCFA', 'Central African CFA franc'),
(44, 'TD', 'Chad', 'XAF', 'FCFA', 'Central African CFA franc'),
(45, 'CL', 'Chile', 'CLP', '$', 'Chilean peso'),
(46, 'CN', 'China', 'CNY', '¥', 'Chinese yuan'),
(47, 'CX', 'Christmas Island', 'AUD', '$', 'Australian dollar'),
(48, 'CC', 'Cocos (Keeling) Islands', 'AUD', '$', 'Australian dollar'),
(49, 'CO', 'Colombia', 'COP', '$', 'Colombian peso'),
(50, 'KM', 'Comoros', 'KMF', 'CF', 'Comorian franc'),
(51, 'CG', 'Congo', 'XAF', 'FC', 'Central African CFA franc'),
(52, 'CD', 'Congo, Democratic Republic of the', 'CDF', 'FC', 'Congolese franc'),
(53, 'CK', 'Cook Islands', 'NZD', '$', 'New Zealand dollar'),
(54, 'CR', 'Costa Rica', 'CRC', '₡', 'Costa Rican colón'),
(55, 'HR', 'Croatia', 'HRK', 'kn', 'Croatian kuna'),
(56, 'CU', 'Cuba', 'CUP', '$', 'Cuban peso'),
(57, 'CW', 'Curaçao', 'ANG', 'ƒ', 'Netherlands Antillean guilder'),
(58, 'CY', 'Cyprus', 'EUR', '€', 'Euro'),
(59, 'CZ', 'Czech Republic', 'CZK', 'Kč', 'Czech koruna'),
(60, 'CI', 'Côte d\'Ivoire', 'XOF', 'CFA', 'West African CFA franc'),
(61, 'DK', 'Denmark', 'DKK', 'Kr.', 'Danish krone'),
(62, 'DJ', 'Djibouti', 'DJF', 'Fdj', 'Djiboutian franc'),
(63, 'DM', 'Dominica', 'XCD', '$', 'East Caribbean dollar'),
(64, 'DO', 'Dominican Republic', 'DOP', '$', 'Dominican peso'),
(65, 'EC', 'Ecuador', 'USD', '$', 'United States dollar'),
(66, 'EG', 'Egypt', 'EGP', 'ج.م', 'Egyptian pound'),
(67, 'SV', 'El Salvador', 'USD', '$', 'United States dollar'),
(68, 'GQ', 'Equatorial Guinea', 'XAF', 'FCFA', 'Central African CFA franc'),
(69, 'ER', 'Eritrea', 'ERN', 'Nfk', 'Eritrean nakfa'),
(70, 'EE', 'Estonia', 'EUR', '€', 'Euro'),
(71, 'SZ', 'Eswatini (Swaziland)', 'SZL', 'E', 'Swazi lilangeni'),
(72, 'ET', 'Ethiopia', 'ETB', 'Nkf', 'Ethiopian birr'),
(73, 'FK', 'Falkland Islands (Malvinas)', 'FKP', '£', 'Falkland Islands pound'),
(74, 'FO', 'Faroe Islands', 'DKK', 'Kr.', 'Danish krone'),
(75, 'FJ', 'Fiji', 'FJD', 'FJ$', 'Fijian dollar'),
(76, 'FI', 'Finland', 'EUR', '€', 'Euro'),
(77, 'FR', 'France', 'EUR', '€', 'Euro'),
(78, 'GF', 'French Guiana', 'EUR', '€', 'Euro'),
(79, 'PF', 'French Polynesia', 'XPF', '₣', 'CFP franc'),
(80, 'TF', 'French Southern Territories', 'EUR', '€', 'Euro'),
(81, 'GA', 'Gabon', 'XAF', 'FCFA', 'Central African CFA franc'),
(82, 'GM', 'Gambia', 'GMD', 'D', 'Gambian dalasi'),
(83, 'GE', 'Georgia', 'GEL', 'ლ', 'Georgian lari'),
(84, 'DE', 'Germany', 'EUR', '€', 'Euro'),
(85, 'GH', 'Ghana', 'GHS', 'GH₵', 'Ghanaian cedi'),
(86, 'GI', 'Gibraltar', 'GIP', '£', 'Gibraltar pound'),
(87, 'GR', 'Greece', 'EUR', '€', 'Euro'),
(88, 'GL', 'Greenland', 'DKK', 'Kr.', 'Danish krone'),
(89, 'GD', 'Grenada', 'XCD', '$', 'East Caribbean dollar'),
(90, 'GP', 'Guadeloupe', 'EUR', '€', 'Euro'),
(91, 'GU', 'Guam', 'USD', '$', 'United States dollar'),
(92, 'GT', 'Guatemala', 'GTQ', 'Q', 'Guatemalan quetzal'),
(93, 'GG', 'Guernsey', 'GBP', '£', 'British pound'),
(94, 'GN', 'Guinea', 'GNF', 'FG', 'Guinean franc'),
(95, 'GW', 'Guinea-Bissau', 'XOF', 'CFA', 'West African CFA franc'),
(96, 'GY', 'Guyana', 'GYD', '$', 'Guyanese dollar'),
(97, 'HT', 'Haiti', 'HTG', 'G', 'Haitian gourde'),
(98, 'HM', 'Heard Island and Mcdonald Islands', 'AUD', '$', 'Australian dollar'),
(99, 'HN', 'Honduras', 'HNL', 'L', 'Honduran lempira'),
(100, 'HK', 'Hong Kong', 'HKD', '$', 'Hong Kong dollar'),
(101, 'HU', 'Hungary', 'HUF', 'Ft', 'Hungarian forint'),
(102, 'IS', 'Iceland', 'ISK', 'kr', 'Icelandic króna'),
(103, 'IN', 'India', 'INR', '₹', 'Indian rupee'),
(104, 'ID', 'Indonesia', 'IDR', 'Rp', 'Indonesian rupiah'),
(105, 'IR', 'Iran', 'IRR', '﷼', 'Iranian rial'),
(106, 'IQ', 'Iraq', 'IQD', 'د.ع', 'Iraqi dinar'),
(107, 'IE', 'Ireland', 'EUR', '€', 'Euro'),
(108, 'IM', 'Isle of Man', 'GBP', '£', 'British pound'),
(109, 'IL', 'Israel', 'ILS', '₪', 'Israeli new shekel'),
(110, 'IT', 'Italy', 'EUR', '€', 'Euro'),
(111, 'JM', 'Jamaica', 'JMD', 'J$', 'Jamaican dollar'),
(112, 'JP', 'Japan', 'JPY', '¥', 'Japanese yen'),
(113, 'JE', 'Jersey', 'GBP', '£', 'British pound'),
(114, 'JO', 'Jordan', 'JOD', 'ا.د', 'Jordanian dinar'),
(115, 'KZ', 'Kazakhstan', 'KZT', 'лв', 'Kazakhstani tenge'),
(116, 'KE', 'Kenya', 'KES', 'KSh', 'Kenyan shilling'),
(117, 'KI', 'Kiribati', 'AUD', '$', 'Australian dollar'),
(118, 'KP', 'Korea, North', 'KPW', '₩', 'North Korean won'),
(119, 'KR', 'Korea, South', 'KRW', '₩', 'South Korean won'),
(120, 'XK', 'Kosovo', 'EUR', '€', 'Euro'),
(121, 'KW', 'Kuwait', 'KWD', 'ك.د', 'Kuwaiti dinar'),
(122, 'KG', 'Kyrgyzstan', 'KGS', 'лв', 'Kyrgyzstani som'),
(123, 'LA', 'Lao People\'s Democratic Republic', 'LAK', '₭', 'Lao kip'),
(124, 'LV', 'Lativia', 'EUR', '€', 'Euro'),
(125, 'LB', 'Lebanon', 'LBP', '£', 'Lebanese pound'),
(126, 'LS', 'Lesotho', 'LSL', 'L', 'Lesotho loti'),
(127, 'LR', 'Liberia', 'LRD', '$', 'Liberian dollar'),
(128, 'LY', 'Libya', 'LYD', 'د.ل', 'Libyan dinar'),
(129, 'LI', 'Liechtenstein', 'CHF', 'CHf', 'Swiss franc'),
(130, 'LT', 'Lithuania', 'EUR', '€', 'Euro'),
(131, 'LU', 'Luxembourg', 'EUR', '€', 'Euro'),
(132, 'MO', 'Macao', 'MOP', '$', 'Macanese pataca'),
(133, 'MK', 'Macedonia North', 'MKD', 'ден', 'Macedonian denar'),
(134, 'MG', 'Madagascar', 'MGA', 'Ar', 'Malagasy ariary'),
(135, 'MW', 'Malawi', 'MWK', 'MK', 'Malawian kwacha'),
(136, 'MY', 'Malaysia', 'MYR', 'RM', 'Malaysian ringgit'),
(137, 'MV', 'Maldives', 'MVR', 'Rf', 'Maldivian rufiyaa'),
(138, 'ML', 'Mali', 'XOF', 'CFA', 'West African CFA franc'),
(139, 'MT', 'Malta', 'EUR', '€', 'Euro'),
(140, 'MH', 'Marshall Islands', 'USD', '$', 'United States dollar'),
(141, 'MQ', 'Martinique', 'EUR', '€', 'Euro'),
(142, 'MR', 'Mauritania', 'MRO', 'MRU', 'Mauritanian ouguiya'),
(143, 'MU', 'Mauritius', 'MUR', '₨', 'Mauritian rupee'),
(144, 'YT', 'Mayotte', 'EUR', '€', 'Euro'),
(145, 'MX', 'Mexico', 'MXN', '$', 'Mexican peso'),
(146, 'FM', 'Micronesia', 'USD', '$', 'United States dollar'),
(147, 'MD', 'Moldova', 'MDL', 'L', 'Moldovan leu'),
(148, 'MC', 'Monaco', 'EUR', '€', 'Euro'),
(149, 'MC', 'Monaco', 'EUR', '€', 'Euro'),
(150, 'MN', 'Mongolia', 'MNT', '₮', 'Mongolian tögrög'),
(151, 'ME', 'Montenegro', 'EUR', '€', 'Euro'),
(152, 'MS', 'Montserrat', 'XCD', '$', 'East Caribbean dollar'),
(153, 'MA', 'Morocco', 'MAD', 'DH', 'Moroccan dirham'),
(154, 'MZ', 'Mozambique', 'MZN', 'MT', 'Mozambican metical'),
(155, 'MM', 'Myanmar (Burma)', 'MMK', 'K', 'Burmese kyat'),
(156, 'NA', 'Namibia', 'NAD', '$', 'Namibian dollar'),
(157, 'NR', 'Nauru', 'AUD', '$', 'Australian dollar'),
(158, 'NP', 'Nepal', 'NPR', '₨', 'Nepalese rupee'),
(159, 'NL', 'Netherlands', 'EUR', '€', 'Euro'),
(160, 'NC', 'New Caledonia', 'XPF', '₣', 'CFP franc'),
(161, 'NZ', 'New Zealand', 'NZD', '$', 'New Zealand dollar'),
(162, 'NI', 'Nicaragua', 'NIO', 'C$', 'Nicaraguan córdoba'),
(163, 'NE', 'Niger', 'XOF', 'CFA', 'West African CFA franc'),
(164, 'NG', 'Nigeria', 'NGN', '₦', 'Nigerian naira'),
(165, 'NU', 'Niue', 'NZD', '$', 'New Zealand dollar'),
(166, 'NF', 'Norfolk Island', 'AUD', '$', 'Australian dollar'),
(167, 'MP', 'Northern Mariana Islands', 'USD', '$', 'United States dollar'),
(168, 'NO', 'Norway', 'NOK', 'kr', 'Norwegian krone'),
(169, 'OM', 'Oman', 'OMR', '.ع.ر', 'Omani rial'),
(170, 'PK', 'Pakistan', 'PKR', '₨', 'Pakistani rupee'),
(171, 'PW', 'Palau', 'USD', '$', 'United States dollar'),
(172, 'PS', 'Palestine', 'ILS', '₪', 'Israeli new shekel'),
(173, 'PA', 'Panama', 'PAB', 'B/.', 'Panamanian balboa'),
(174, 'PG', 'Papua New Guinea', 'PGK', 'K', 'Papua New Guinean kina'),
(175, 'PY', 'Paraguay', 'PYG', '₲', 'Paraguayan guaraní'),
(176, 'PE', 'Peru', 'PEN', 'S/.', 'Peruvian sol'),
(177, 'PH', 'Philippines', 'PHP', '₱', 'Philippine peso'),
(178, 'PN', 'Pitcairn Islands', 'NZD', '$', 'New Zealand dollar'),
(179, 'PL', 'Poland', 'PLN', 'zł', 'Polish złoty'),
(180, 'PT', 'Portugal', 'EUR', '€', 'Euro'),
(181, 'PR', 'Puerto Rico', 'USD', '$', 'United States dollar'),
(182, 'QA', 'Qatar', 'QAR', 'ق.ر', 'Qatari riyal'),
(183, 'RE', 'Reunion', 'EUR', '€', 'Euro'),
(184, 'RO', 'Romania', 'RON', 'lei', 'Romanian leu'),
(185, 'RU', 'Russian Federation', 'RUB', '₽', 'Russian ruble'),
(186, 'RW', 'Rwanda', 'RWF', 'FRw', 'Rwandan franc'),
(187, 'BL', 'Saint Barthelemy', 'EUR', '€', 'Euro'),
(188, 'SH', 'Saint Helena', 'SHP', '£', 'Saint Helena pound'),
(189, 'KN', 'Saint Kitts and Nevis', 'XCD', '$', 'East Caribbean dollar'),
(190, 'LC', 'Saint Lucia', 'XCD', '$', 'East Caribbean dollar'),
(191, 'MF', 'Saint Martin', 'EUR', '€', 'Euro'),
(192, 'PM', 'Saint Pierre and Miquelon', 'EUR', '€', 'Euro'),
(193, 'VC', 'Saint Vincent and the Grenadines', 'XCD', '$', 'East Caribbean dollar'),
(194, 'WS', 'Samoa', 'WST', 'SAT', 'Samoan tālā'),
(195, 'SM', 'San Marino', 'EUR', '€', 'Euro'),
(196, 'ST', 'Sao Tome and Principe', 'STD', 'Db', 'São Tomé and Príncipe dobra'),
(197, 'SA', 'Saudi Arabia', 'SAR', '﷼', 'Saudi riyal'),
(198, 'SN', 'Senegal', 'XOF', 'CFA', 'West African CFA franc'),
(199, 'RS', 'Serbia', 'RSD', 'din', 'Serbian dinar'),
(200, 'SC', 'Seychelles', 'SCR', 'SRe', 'Seychellois rupee'),
(201, 'SL', 'Sierra Leone', 'SLL', 'Le', 'Sierra Leonean leone'),
(202, 'SG', 'Singapore', 'SGD', '$', 'Singapore dollar'),
(203, 'SX', 'Sint Maarten', 'ANG', 'ƒ', 'Netherlands Antillean guilder'),
(204, 'SK', 'Slovakia', 'EUR', '€', 'Euro'),
(205, 'SI', 'Slovenia', 'EUR', '€', 'Euro'),
(206, 'SB', 'Solomon Islands', 'SBD', 'Si$', 'Solomon Islands dollar'),
(207, 'SO', 'Somalia', 'SOS', 'Sh.so.', 'Somali shilling'),
(208, 'ZA', 'South Africa', 'ZAR', 'R', 'South African rand'),
(209, 'GS', 'South Georgia and the South Sandwich Islands', 'GBP', '£', 'British pound'),
(210, 'SS', 'South Sudan', 'SSP', '£', 'South Sudanese pound'),
(211, 'ES', 'Spain', 'EUR', '€', 'Euro'),
(212, 'LK', 'Sri Lanka', 'LKR', 'Rs', 'Sri Lankan rupee'),
(213, 'SD', 'Sudan', 'SDG', '.س.ج', 'Sudanese pound'),
(214, 'SR', 'Suriname', 'SRD', '$', 'Surinamese dollar'),
(215, 'SJ', 'Svalbard and Jan Mayen', 'NOK', 'kr', 'Norwegian krone'),
(216, 'SE', 'Sweden', 'SEK', 'kr', 'Swedish krona'),
(217, 'CH', 'Switzerland', 'CHF', 'CHf', 'Swish franc'),
(218, 'SY', 'Syria', 'SYP', 'LS', 'Syrian pound'),
(219, 'TW', 'Taiwan', 'TWD', '$', 'New Taiwan dollar'),
(220, 'TJ', 'Tajikistan', 'TJS', 'SM', 'Tajikistani somoni'),
(221, 'TZ', 'Tanzania', 'TZS', 'TSh', 'Tanzanian shilling'),
(222, 'TH', 'Thailand', 'THB', '฿', 'Thai baht'),
(223, 'TL', 'Timor-Leste', 'USD', '$', 'United States dollar'),
(224, 'TG', 'Togo', 'XOF', 'CFA', 'West African CFA franc'),
(225, 'TK', 'Tokelau', 'NZD', '$', 'New Zealand dollar'),
(226, 'TO', 'Tonga', 'TOP', '$', 'Tongan paʻanga'),
(227, 'TT', 'Trinidad and Tobago', 'TTD', '$', 'Trinidad and Tobago dollar'),
(228, 'TN', 'Tunisia', 'TND', 'ت.د', 'Tunisian dinar'),
(229, 'TR', 'Turkey (Türkiye)', 'TRY', '₺', 'Turkish lira'),
(230, 'TM', 'Turkmenistan', 'TMT', 'T', 'Turkmenistani manat'),
(231, 'TC', 'Turks and Caicos Islands', 'USD', '$', 'United States dollar'),
(232, 'TV', 'Tuvalu', 'AUD', '$', 'Australian dollar'),
(233, 'UM', 'U.S. Outlying Islands', 'USD', '$', 'United States dollar'),
(234, 'UG', 'Uganda', 'UGX', 'USh', 'Ugandan shilling'),
(235, 'UA', 'Ukraine', 'UAH', '₴', 'Ukrainian hryvnia'),
(236, 'AE', 'United Arab Emirates', 'AED', 'إ.د', 'United Arab Emirates dirham'),
(237, 'GB', 'United Kingdom', 'GBP', '£', 'British pound'),
(238, 'US', 'United States', 'USD', '$', 'United States dollar'),
(239, 'UY', 'Uruguay', 'UYU', '$', 'Uruguayan peso'),
(240, 'UZ', 'Uzbekistan', 'UZS', 'лв', 'Uzbekistani som'),
(241, 'VU', 'Vanuatu', 'VUV', 'VT', 'Vanuatu vatu'),
(242, 'VA', 'Vatican City Holy See', 'EUR', '€', 'Euro'),
(243, 'VE', 'Venezuela', 'VEF', 'Bs', 'Venezuelan bolívar'),
(244, 'VN', 'Vietnam', 'VND', '₫', 'Vietnamese đồng'),
(245, 'VG', 'Virgin Islands, British', 'USD', '$', 'United States dollar'),
(246, 'VI', 'Virgin Islands, U.S', 'USD', '$', 'United States dollar'),
(247, 'WF', 'Wallis and Futuna', 'XPF', '₣', 'CFP franc'),
(248, 'EH', 'Western Sahara', 'MAD', 'MAD', 'Moroccan dirham'),
(249, 'YE', 'Yemen', 'YER', '﷼', 'Yemeni rial'),
(250, 'ZM', 'Zambia', 'ZMW', 'ZK', 'Zambian kwacha'),
(251, 'ZW', 'Zimbabwe', 'ZWL', '$', 'Zimbabwean dollar');

-- --------------------------------------------------------

--
-- Table structure for table `dataroomai_executive_summary`
--

CREATE TABLE `dataroomai_executive_summary` (
  `id` int(11) NOT NULL,
  `uniqcode` varchar(255) DEFAULT NULL,
  `usersubscriptiondataroomone_time_id` int(11) NOT NULL DEFAULT 0,
  `company_id` int(11) DEFAULT NULL,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomai_executive_summary`
--

INSERT INTO `dataroomai_executive_summary` (`id`, `uniqcode`, `usersubscriptiondataroomone_time_id`, `company_id`, `created_by_id`, `created_by_role`, `updated_by_id`, `updated_by_role`, `summary`, `created_at`) VALUES
(1, 'TKkYK2', 13, 2, 2, 'signatory', 0, NULL, 'The investment management system facilitates secure and private interactions between investors and multiple companies. Investors create personal profiles to access and sign critical financial documents such as Term Sheets and Subscription Documents, which upon signing, reserve shares for them pending financial transactions. Each company must individually manage document sharing and investor relations, ensuring privacy, as they cannot view each other’s investor details or edit funding rounds post-sharing. However, amendments or cancellations of funding rounds are possible, subject to potential legal consequences. Investor authentication is crucial for the initiation and closure of funding rounds, with the system supporting stringent privacy and data management protocols including self-managed input of sensitive information like Tax ID and compliance data.', '2025-10-22 15:10:27'),
(2, 'g0hmjM', 1, 2, 2, 'signatory', 0, NULL, 'This executive summary addresses the protocols and processes concerning investor management and document security for a company during investment rounds:\n\n1. **Investor Document Access and Sharing**: Investment-related documents are accessible exclusively to registered investors who receive personalized links, with shares reserved upon signing but only allocated post-transaction confirmation.\n\n2. **Investor Registration and Profile Management**: Investors are registered in the Investor Information CRM via email, and manage private profiles used across multiple investments without exposing their broader financial associations to individual companies.\n\n3. **Funding Round Procedures**: Companies control the closure of funding rounds, which remain open for additional subscriptions even after partial investor signatures. Specific attention is required for any amendments post-round opening to avoid legal issues.\n\n4. **Security and Privacy Protocols**: Investor documents are securely shared and locked, with access strictly through personal invitations, ensuring confidentiality and privacy across different investment ventures.\n\n5. **Document Integrity Issues**: There are significant issues with document organization and clarity, with some documents appearing corrupted or unreadable. This impacts the due diligence process, indicating a need for systematic review and reorganization of digital file management.\n', '2025-10-22 15:26:51');

-- --------------------------------------------------------

--
-- Table structure for table `dataroomai_response`
--

CREATE TABLE `dataroomai_response` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `dataroomai_summary_id` int(11) NOT NULL DEFAULT 0,
  `uniqcode` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `questions` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomai_response`
--

INSERT INTO `dataroomai_response` (`id`, `company_id`, `created_by_role`, `created_by_id`, `updated_by_id`, `updated_by_role`, `dataroomai_summary_id`, `uniqcode`, `category_id`, `questions`, `answer`, `created_at`, `updated_at`) VALUES
(1, 2, 'signatory', 2, 0, NULL, 1, 'TKkYK2', 1, 'How does the system ensure the security and confidentiality of investor data, especially considering the sensitivity of personal information such as Tax IDs and compliance with KYC/AML regulations?', NULL, '2025-10-22 15:08:13', NULL),
(2, 2, 'signatory', 2, 0, NULL, 1, 'TKkYK2', 1, 'Can you describe the protocols or technologies used to prevent unauthorized access or breaches in the system, particularly when handling multiple companies and investors\' profiles?', NULL, '2025-10-22 15:08:13', NULL),
(3, 2, 'signatory', 2, 0, NULL, 1, 'TKkYK2', 1, 'What are the mechanisms in place for resolving disputes or addressing investor grievances, especially in scenarios involving amendments or cancellations of funding rounds?', NULL, '2025-10-22 15:08:13', NULL),
(4, 2, 'signatory', 2, 0, NULL, 2, 'TKkYK2', 12, 'Could you please provide more details or context for the summary to better understand the key points of discussion?', NULL, '2025-10-22 15:10:18', NULL),
(5, 2, 'signatory', 2, 0, NULL, 2, 'TKkYK2', 12, 'What specific aspects or sectors are being analyzed in this report, and who are the primary stakeholders involved?', NULL, '2025-10-22 15:10:18', NULL),
(6, 2, 'signatory', 2, 0, NULL, 2, 'TKkYK2', 12, 'Are there any specific challenges or risks highlighted that need further investigation or clarification?', NULL, '2025-10-22 15:10:18', NULL),
(7, 2, 'signatory', 2, 0, NULL, 3, 'TKkYK2', 13, 'Can you provide a detailed summary or overview of the subject in question?', NULL, '2025-10-22 15:10:23', NULL),
(8, 2, 'signatory', 2, 0, NULL, 3, 'TKkYK2', 13, 'What specific aspects or elements are intended for analysis or need detailed due diligence?', NULL, '2025-10-22 15:10:23', NULL),
(9, 2, 'signatory', 2, 0, NULL, 3, 'TKkYK2', 13, 'Could you clarify the objectives or expected outcomes from this due diligence process?', NULL, '2025-10-22 15:10:23', NULL),
(10, 2, 'signatory', 2, 0, NULL, 4, 'g0hmjM', 1, 'How does the company ensure the security and integrity of the Investor Information CRM, including protection against unauthorized access and data breaches?', NULL, '2025-10-22 15:24:27', NULL),
(11, 2, 'signatory', 2, 0, NULL, 4, 'g0hmjM', 1, 'What are the specific legal frameworks and compliance checks in place for amending terms during a funding round after documents have been shared with investors?', NULL, '2025-10-22 15:24:27', NULL),
(12, 2, 'signatory', 2, 0, NULL, 4, 'g0hmjM', 1, 'Can you provide details on the encryption methods or security protocols used for the transmission and storage of sensitive investment documents and personal investor information?', NULL, '2025-10-22 15:24:27', NULL),
(13, 2, 'signatory', 2, 0, NULL, 5, 'g0hmjM', 12, 'Can you provide the context or purpose behind the compilation of these documents, and explain why they contain such disorganized and fragmented content?', NULL, '2025-10-22 15:26:35', NULL),
(14, 2, 'signatory', 2, 0, NULL, 5, 'g0hmjM', 12, 'Are there any specific sources or authors for these documents, and how were these texts acquired or generated?', NULL, '2025-10-22 15:26:35', NULL),
(15, 2, 'signatory', 2, 0, NULL, 5, 'g0hmjM', 12, 'What methods have been used to verify the accuracy and relevance of the content within these documents? Is there a process in place for organizing or deciphering the incoherent and multilingual fragments?', NULL, '2025-10-22 15:26:35', NULL),
(16, 2, 'signatory', 2, 0, NULL, 6, 'g0hmjM', 13, 'Can you please confirm if the file \'download (2).jpg\' was intended to contain important textual information for our analysis, and if so, could you kindly provide a new, accessible version of the document?', NULL, '2025-10-22 15:26:43', NULL),
(17, 2, 'signatory', 2, 0, NULL, 6, 'g0hmjM', 13, 'Is there an alternative source or document that contains the information expected in \'download (2).jpg\', and could you provide access or redirect us to that source?', NULL, '2025-10-22 15:26:43', NULL),
(18, 2, 'signatory', 2, 0, NULL, 6, 'g0hmjM', 13, 'Could you provide details on the process of how the document \'download (2).jpg\' was created and handled to determine if the corruption occurred at source or during the transfer?', NULL, '2025-10-22 15:26:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dataroomai_summary`
--

CREATE TABLE `dataroomai_summary` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `uniqcode` varchar(255) DEFAULT NULL,
  `usersubscriptiondataroomone_time_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `subcategory_id` int(11) NOT NULL DEFAULT 0,
  `summary` longtext DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomai_summary`
--

INSERT INTO `dataroomai_summary` (`id`, `company_id`, `created_by_id`, `created_by_role`, `updated_by_id`, `updated_by_role`, `uniqcode`, `usersubscriptiondataroomone_time_id`, `category_id`, `subcategory_id`, `summary`, `status`, `created_at`) VALUES
(1, 2, 2, 'signatory', 0, NULL, 'TKkYK2', 13, 1, 3, 'Investor Report Sharing Process\nCompanies must individually share each report with investors, ensuring privacy. Reports are accessible through a unique link sent via email after the investor is invited to register and complete their profile on the system. Multiple companies can add the same investor without seeing each other’s information.\n\nInvestor Profile and Document Access\nInvestors create profiles using their email and can access documents like Term Sheets and Subscription Documents. Once they review these documents and signify investment intent by signing, the system reserves shares, awaiting financial transfer to formalize share allocation. This process updates the cap table.\n\nHandling Multiple Companies and One Investor\nAn investor can be associated with multiple companies. However, each company must share reports and documents with the investor separately. Investors\' privacy is maintained as they cannot see other investors associated with the company.\n\nFunding Rounds and Investor Authorization\nWhen a company initiates a funding round, it must share details with its investors. Investors authenticate the transaction by signing the term sheet and subscription documents. The closure of the funding round relies on company discretion, not solely on investor signatures.\n\nAmendments and Cancellations of Funding Rounds\nWhile funding rounds cannot be edited after sharing with investors, companies can issue amendments or fully cancel a round, with potential legal implications. Rounds must be locked before being shared externally.\n\nPrivacy and Data Management\nInvestor privacy is a priority, with companies not able to view each other’s investor lists or their other investments. Investors input personal data such as Tax ID or KYC/AML into the system themselves.\n\n', 'Active', '2025-10-22 15:08:00'),
(2, 2, 2, 'signatory', 0, NULL, 'TKkYK2', 13, 12, 67, '', 'Active', '2025-10-22 15:08:00'),
(3, 2, 2, 'signatory', 0, NULL, 'TKkYK2', 13, 13, 52, '', 'Active', '2025-10-22 15:08:00'),
(4, 2, 2, 'signatory', 0, NULL, 'g0hmjM', 1, 1, 3, 'Investor Document Access and Sharing\nInvestment-related documents such as term sheets, subscription documents, and data room summaries are only accessible to investors after the company shares these individually. Each investor must log in through a unique link sent via email to view the reports and documents. Registered investors can sign the documents indicating their investment and thereby reserve shares, but shares are not fully allocated until the transaction is confirmed by the company.\n\nInvestor Registration and Profile Management\nInvestors are added to the Investor Information CRM by the company using their email. Investors can thereafter create profiles which remain private across different investments. Their profiles are used for multiple investments across different companies, yet companies do not have access to view other investments or associations an investor might have.\n\nFunding Round Procedures\nDuring a funding round, only the included investors can view and sign the term sheet and subscription documents. A round is not automatically closed when only part of the investors sign; rather, it can be declared closed by the company or extended for over-subscription. Amendments to the round can be made, but it must be handled carefully to avoid legal consequences. A round cannot be edited after investors have viewed it unless no invitations have been sent.\n\nSecurity and Privacy Protocols\nDocuments are securely locked and shared individually with investors to maintain confidentiality. Investors receive personalized email invitations to access these documents, ensuring privacy regarding their investment activities. The company cannot access or view details of investors\' other investments, safeguarding investor privacy across different ventures.\n\n', 'Active', '2025-10-22 15:24:13'),
(5, 2, 2, 'signatory', 0, NULL, 'g0hmjM', 1, 12, 67, 'Document Overview\nThe content across the documents appears to be highly disorganized, featuring fragments of text in various languages, including what appears to be Devanagari script. There are recurrent instances of words, characters, alphanumeric codes, and possibly phrases without evident logical connections or coherence. The provided texts contain repeated nonsensical sequences, intermixed with some readable fragments that do not form comprehensive sentences or sections.\n\n', 'Active', '2025-10-22 15:24:13'),
(6, 2, 2, 'signatory', 0, NULL, 'g0hmjM', 1, 13, 52, 'Document Analysis\nThe document \'download (2).jpg\' appears to be either corrupted or mislabeled, displaying only incoherent characters such as \'a\', \'v\', and \'«sip\'. It is not possible to extract meaningful information or identify any sections/topics from the content provided in this file for due diligence purposes. It\'s recommended to check the file for errors, consider re-downloading or requesting a clear and readable version of this document.\n\n', 'Active', '2025-10-22 15:24:13');

-- --------------------------------------------------------

--
-- Table structure for table `dataroomai_summary_files`
--

CREATE TABLE `dataroomai_summary_files` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `usersubscriptiondataroomone_time_id` int(11) DEFAULT NULL,
  `uniqcode` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `doc_name` varchar(255) DEFAULT NULL,
  `folder_name` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dataroomai_summary_subcategory`
--

CREATE TABLE `dataroomai_summary_subcategory` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `uniqcode` varchar(255) DEFAULT NULL,
  `usersubscriptiondataroomone_time_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `subcategory_id` int(11) NOT NULL DEFAULT 0,
  `filename` varchar(255) DEFAULT NULL,
  `summary` longtext DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dataroomcategories`
--

CREATE TABLE `dataroomcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_tips` text DEFAULT NULL,
  `document_tips` text DEFAULT NULL,
  `exits_tips` text DEFAULT NULL,
  `do_not_exits` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomcategories`
--

INSERT INTO `dataroomcategories` (`id`, `name`, `category_tips`, `document_tips`, `exits_tips`, `do_not_exits`) VALUES
(1, 'Management Team', NULL, NULL, 'This option allows your company to acknowledge the existence of the document while specifying that it is not available for inclusion in the due diligence report. Please note that you may be asked for these documents by investors as they perform their review.', 'Upon document upload, the entry should update to reflect the file name. If multiple documents are uploaded for a single line item, each file name should be listed separately on a new line.'),
(2, 'Product or Service Offering', NULL, 'Upon document upload, the entry should update to reflect the file name. If multiple documents are uploaded for a single line item, each file name should be listed separately on a new line', 'This option allows your company to acknowledge the existence of the document while specifying that it is not available for inclusion in the due diligence report. Please note that you may be asked for these documents by investors as they perform their review.', NULL),
(3, 'Sales and Marketing', NULL, NULL, NULL, NULL),
(4, 'Technology Infrastructure', NULL, NULL, NULL, NULL),
(5, 'Operations', NULL, NULL, NULL, NULL),
(6, 'Regulatory Compliance', NULL, NULL, NULL, NULL),
(7, 'Risk Management', NULL, NULL, NULL, NULL),
(8, 'Financial Information', NULL, NULL, NULL, NULL),
(11, 'Press and Public Relations', '<p><strong style=\"color: rgb(192, 0, 0);\">Upload the latest version of your Subscription Agreement.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">subscription agreement document</strong><span style=\"color: black;\"> is a </span><strong style=\"color: rgb(192, 0, 0);\">formal contract </strong><span style=\"color: black;\">between an investor and a company that outlines the terms for purchasing shares or securities. It\'s typically used in </span><strong style=\"color: black;\">private placements</strong><span style=\"color: black;\"> or </span><strong style=\"color: black;\">venture capital investments</strong><span style=\"color: black;\">, where a company raises funds without going through a public stock offering.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">This agreement ensures both parties understand their responsibilities and the financial arrangement. </span></p><p><span style=\"color: black;\">It usually includes:</span></p><p><span style=\"color: black;\">.The number of shares being purchased</span></p><p><span style=\"color: black;\">.The price per share</span></p><p><span style=\"color: black;\">.Investor qualifications</span></p><p><span style=\"color: black;\">.Payment terms and conditions</span></p><p><span style=\"color: black;\">Legal warranties and representations</span></p>', NULL, NULL, NULL),
(12, 'Miscellaneous', NULL, NULL, NULL, NULL),
(13, 'Term Sheet', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dataroomdocuments`
--

CREATE TABLE `dataroomdocuments` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `subcategory_id` int(11) NOT NULL DEFAULT 0,
  `folder_name` varchar(255) DEFAULT NULL,
  `doc_name` longtext DEFAULT NULL,
  `summary_txt` longtext DEFAULT NULL,
  `status` enum('No','Yes') NOT NULL,
  `locked` enum('No','Yes') NOT NULL,
  `Ai_generate` enum('No','Yes') NOT NULL,
  `docs_generate` enum('No','Yes') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomdocuments`
--

INSERT INTO `dataroomdocuments` (`id`, `company_id`, `created_by_id`, `created_by_role`, `updated_by_id`, `updated_by_role`, `category_id`, `subcategory_id`, `folder_name`, `doc_name`, `summary_txt`, `status`, `locked`, `Ai_generate`, `docs_generate`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'signatory', 0, NULL, 1, 3, 'Management Team', 'capvarteClientReply.docx', NULL, 'Yes', 'Yes', 'Yes', 'Yes', '2025-10-03 13:23:15', NULL),
(2, 2, 1, 'signatory', 0, NULL, 13, 52, 'Term Sheet', 'download (2).jpg', NULL, 'Yes', 'Yes', 'Yes', 'Yes', '2025-10-03 13:23:33', NULL),
(5, 2, 1, 'owner', 0, NULL, 12, 67, 'Miscellaneous', 'download(1).png', NULL, 'Yes', 'Yes', 'Yes', 'Yes', '2025-10-08 10:37:44', NULL),
(6, 2, 1, 'owner', 0, NULL, 12, 67, 'Miscellaneous', 'download (2).jpg', NULL, 'Yes', 'Yes', 'Yes', 'Yes', '2025-10-08 10:38:04', NULL),
(7, 2, 1, 'owner', 0, NULL, 12, 47, 'Miscellaneous', '133948674177367938.jpg', NULL, 'Yes', 'Yes', 'Yes', 'Yes', '2025-10-08 10:39:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dataroomsub_categories`
--

CREATE TABLE `dataroomsub_categories` (
  `id` int(11) NOT NULL,
  `dataroom_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `tips` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroomsub_categories`
--

INSERT INTO `dataroomsub_categories` (`id`, `dataroom_id`, `name`, `tips`) VALUES
(1, 1, 'Detailed Bios And Resumes', '<p>Provide the resume (CV) of each member of the company\'s management team</p>'),
(2, 1, 'Organizational Chart', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide a list of all employees and positions.</strong></p><p><br></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Organizational Chart document</strong><span style=\"color: black;\"> visually represents the company\'s structure, showing key roles, reporting relationships, and departmental divisions. It helps founders, employees, and investors understand how responsibilities are distributed within the startup.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An organizational chart typically includes:</span></p><p><strong style=\"color: black;\">.Founders &amp; Leadership</strong><span style=\"color: black;\">: CEO, COO, and other key executives.</span></p><p><strong style=\"color: black;\">.Core Teams</strong><span style=\"color: black;\">: Product development, marketing, sales, and operations.</span></p><p><strong style=\"color: black;\">.Reporting Lines</strong><span style=\"color: black;\">: Who reports to whom, ensuring clarity in decision-making.</span></p><p><strong style=\"color: black;\">.Flexible Structure</strong><span style=\"color: black;\">: Startups often have overlapping roles, so the chart may evolve as the company grows.</span></p>'),
(3, 1, 'Advisory Board Information', '<p><br></p><p><strong style=\"color: rgb(192, 0, 0);\">Provide information on each advisory board member</strong></p><p><br></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Advisory Board Information document</strong><span style=\"color: black;\"> typically provides details about the structure, purpose, and operational guidelines of an advisory board. It serves as a reference for both board members and the organization, ensuring clarity on expectations and best practices.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">This document may include:</span></p><p><strong style=\"color: black;\">.Purpose &amp; Scope</strong><span style=\"color: black;\">: Defines the advisory board’s role in supporting the organization.</span></p><p><strong style=\"color: black;\">.Membership &amp; Responsibilities</strong><span style=\"color: black;\">: Outlines the qualifications, duties, and expectations of board members.</span></p><p><strong style=\"color: black;\">.Compensation: </strong><span style=\"color: black;\">Specifies whether the advisor will be paid or receive other benefits. </span></p><p><strong style=\"color: black;\">.Meeting Structure</strong><span style=\"color: black;\">: Specifies how often the board meets and the format of discussions.</span></p><p><strong style=\"color: black;\">.Decision-Making Process</strong><span style=\"color: black;\">: Clarifies whether the board provides recommendations or has any formal authority.</span></p><p><strong style=\"color: black;\">.Confidentiality &amp; Compliance</strong><span style=\"color: black;\">: Ensures adherence to legal and ethical standards.</span></p>'),
(4, 2, 'Product Description And Specifications', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide a detailed description of each product and service your company offers customers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">product description and specifications document</strong><span style=\"color: black;\"> outlines the key details of a product, including its features, functionality, and requirements. It is a blueprint for designing, developing, and testing the product. This document is essential for ensuring team alignment, improving efficiency, and maintaining quality control throughout product development.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Product Description</strong><span style=\"color: black;\">: A clear overview of what the product is and its intended purpose.</span></p><p><strong style=\"color: black;\">.Specifications</strong><span style=\"color: black;\">: Detailed technical and functional requirements, such as dimensions, materials, performance standards, and compliance regulations.</span></p><p><strong style=\"color: black;\">.Design Elements</strong><span style=\"color: black;\">: Information on the product’s appearance, usability, and any user interface considerations.</span></p><p><strong style=\"color: black;\">.Testing &amp; Quality Control</strong><span style=\"color: black;\">: Guidelines for evaluating the product’s performance and ensuring it meets industry standards.</span></p><p><strong style=\"color: black;\">.Regulatory Compliance</strong><span style=\"color: black;\">: Any legal or safety requirements the product must adhere to.</span></p>'),
(5, 2, 'Product Development Roadmaps', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide a roadmap outlining your future product development strategy.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Product Development Roadmap </strong><span style=\"color: black;\">document is a strategic plan that outlines the vision, timeline, and key milestones for developing a product. It helps teams align on goals, prioritize features, and track progress over time.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a product development roadmap include:</span></p><p><strong style=\"color: black;\">.Vision &amp; Objectives</strong><span style=\"color: black;\">: Defines the product’s purpose and long-term goals.</span></p><p><strong style=\"color: black;\">.Phases &amp; Milestones</strong><span style=\"color: black;\">: Breaks down development into stages, such as research, prototyping, testing, and launch.</span></p><p><strong style=\"color: black;\">.Feature Prioritization</strong><span style=\"color: black;\">: Lists core functionalities and enhancements planned for future releases.</span></p><p><strong style=\"color: black;\">.Timeline &amp; Deadlines</strong><span style=\"color: black;\">: Establishes estimated completion dates for each phase.</span></p><p><strong style=\"color: black;\">Stakeholder Alignment</strong><span style=\"color: black;\">: Ensures teams, investors, and customers understand the product’s direction.</span></p>'),
(6, 2, 'Intellectual Property (patents, trademarks, copyrights)', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide IP (Intellectual Property) documents or roadmap/strategy.</strong></p><p><span style=\"color: black;\"> </span></p><p><strong style=\"color: black;\">IP (Intellectual Property) </strong><span style=\"color: black;\">documents refer to legal records that protect creations of the mind, such as inventions, artistic works, brand names, and designs. These documents establish ownership rights and prevent unauthorized use.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Common types of IP documents include:</span></p><p><strong style=\"color: black;\">.Patents</strong><span style=\"color: black;\">: Protect inventions and grant exclusive rights to the creator.</span></p><p><strong style=\"color: black;\">.Trademarks</strong><span style=\"color: black;\">: Secure brand names, logos, and symbols used in commerce.</span></p><p><strong style=\"color: black;\">.Copyrights</strong><span style=\"color: black;\">: Safeguard literary, artistic, and musical works.</span></p><p><strong style=\"color: black;\">.Industrial Designs</strong><span style=\"color: black;\">: Protect the visual appearance of products.</span></p><p><strong style=\"color: black;\">Trade Secrets</strong><span style=\"color: black;\">: Secure confidential business information.</span></p>'),
(7, 2, 'R&D Documentation', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide information on your R&amp;D (Research and Development) initiatives.</strong></p><p><span style=\"color: black;\"> </span></p><p><strong style=\"color: black;\">R&amp;D Documentation </strong><span style=\"color: black;\">refers to the records and materials that track research and development activities within a company. It ensures compliance, supports tax credits, and helps maintain a structured approach to innovation.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of R&amp;D documentation include:</span></p><p><strong style=\"color: black;\">.Project Plans &amp; Objectives</strong><span style=\"color: black;\">: Defines the purpose and scope of research efforts.</span></p><p><strong style=\"color: black;\">.Experimentation Records</strong><span style=\"color: black;\">: Details methodologies, tests, and results.</span></p><p><strong style=\"color: black;\">.Technical Reports</strong><span style=\"color: black;\">: Summarizes findings, challenges, and breakthroughs.</span></p><p><strong style=\"color: black;\">.Financial Records</strong><span style=\"color: black;\">: Tracks expenses related to R&amp;D for tax credit eligibility.</span></p><p><strong style=\"color: black;\">Compliance &amp; Regulatory Documents</strong><span style=\"color: black;\">: Ensures adherence to industry standards and legal requirements.</span></p>'),
(8, 3, 'Major Customer Contracts', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide contracts used with your primary customers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Major Customer Contracts document</strong><span style=\"color: black;\"> outlines the agreements between a company and its key customers, detailing terms, obligations, and expectations. It ensures clarity in business relationships and helps manage risks.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Contract Scope: </strong><span style=\"color: black;\">Defines the products, services, and deliverables covered.</span></p><p><strong style=\"color: black;\">.Pricing &amp; Payment Terms:</strong><span style=\"color: black;\"> Specifies costs, billing schedules, and payment conditions.</span></p><p><strong style=\"color: black;\">.Service Level Agreements (SLAs):</strong><span style=\"color: black;\"> Establishes performance standards and response times.</span></p><p><strong style=\"color: black;\">.Renewal &amp; Termination Clauses</strong><span style=\"color: black;\"> : Outlines contract duration, renewal terms, and exit conditions.</span></p><p><strong style=\"color: black;\">Confidentiality &amp; Compliance:</strong><span style=\"color: black;\"> Ensures data protection and regulatory adherence.</span></p>'),
(9, 3, 'Vendor And Supplier Agreements', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide agreements used with your vendors and suppliers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Vendor and Supplier Agreement document</strong><span style=\"color: black;\"> is a legally binding contract that outlines the terms and conditions between a business and its vendors or suppliers. It ensures clarity in expectations, responsibilities, and obligations, helping both parties maintain a smooth working relationship.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Scope of Work: </strong><span style=\"color: black;\">Defines the goods or services the vendor or supplier will provide.</span></p><p><strong style=\"color: black;\">.Pricing &amp; Payment Terms: </strong><span style=\"color: black;\">Specifies costs, payment schedules, and conditions for price adjustments.</span></p><p><strong style=\"color: black;\">.Delivery &amp; Performance Standards:</strong><span style=\"color: black;\"> Establishes timelines, quality expectations, and delay penalties.</span></p><p><strong style=\"color: black;\">.Confidentiality &amp; Data Protection:</strong><span style=\"color: black;\"> Protects sensitive business information from unauthorized disclosure.</span></p><p><strong style=\"color: black;\">Termination Clauses:</strong><span style=\"color: black;\"> Outlines conditions under which the agreement can be ended.</span></p>'),
(10, 3, 'Sales Reports And Forecasts', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide a description of your company\'s sales performance and future projections to guide strategic decisions.</strong></p><p><strong style=\"color: rgb(192, 0, 0);\"> </strong></p><p><span style=\"color: black;\">A Sales Reports and Forecasts document tracks past sales performance and predicts future revenue trends, helping businesses refine their strategies and optimize growth.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Historical Sales Data</strong><span style=\"color: black;\">: Summarizes past revenue, customer trends, and product performance.</span></p><p><strong style=\"color: black;\">.Sales Forecasting</strong><span style=\"color: black;\">: Estimates future sales based on market conditions and historical data.</span></p><p><strong style=\"color: black;\">.Revenue Growth Analysis</strong><span style=\"color: black;\">: Tracks progress toward financial goals.</span></p><p><strong style=\"color: black;\">.Customer &amp; Market Insights</strong><span style=\"color: black;\">: Identifies demand shifts and competitive positioning.</span></p><p><strong style=\"color: black;\">Performance Metrics</strong><span style=\"color: black;\">: Measures conversion rates, lead generation, and sales efficiency.</span></p>'),
(11, 3, 'Marketing Strategies And Campaigns', '<p><strong style=\"color: rgb(192, 0, 0);\">Outline the company\'s strategy for marketing its products and services to target customers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Marketing Strategies and Campaigns document</strong><span style=\"color: black;\"> outlines a company\'s approach to promoting its products or services, detailing the tactics used to reach target audiences and achieve business goals. It serves as a roadmap for marketing efforts, ensuring consistency and effectiveness.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Marketing Objectives</strong><span style=\"color: black;\">: Defines the goals of the strategy (e.g., brand awareness, lead generation, customer retention).</span></p><p><strong style=\"color: black;\">.Target Audience</strong><span style=\"color: black;\">: Identifies customer demographics, preferences, and behaviours.</span></p><p><strong style=\"color: black;\">.Competitive Analysis</strong><span style=\"color: black;\">: Evaluates market positioning and competitor strategies.</span></p><p><strong style=\"color: black;\">.Marketing Channels</strong><span style=\"color: black;\">: Specifies platforms used (e.g., social media, email, paid ads, events).</span></p><p><strong style=\"color: black;\">.Campaign Timeline</strong><span style=\"color: black;\">: Establishes key milestones and execution dates.</span></p><p><strong style=\"color: black;\">.Budget Allocation</strong><span style=\"color: black;\">: Breaks down costs for different marketing activities.</span></p><p><strong style=\"color: black;\">Performance Metrics</strong><span style=\"color: black;\">: Defines KPIs to measure success (e.g., conversion rates, engagement levels).</span></p>'),
(12, 3, 'Customer Acquisition Costs', '<p><strong style=\"color: rgb(192, 0, 0);\">Break down the costs of acquiring a new target customer, including marketing, sales, and operational expenses.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Customer Acquisition Cost (CAC) document</strong><span style=\"color: black;\"> outlines the expenses of gaining new customers. Businesses use this document to track and analyze their marketing and sales investments, ensuring efficient spending and profitability.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a CAC document include:</span></p><p><strong style=\"color: black;\">.Marketing &amp; Sales Expenses</strong><span style=\"color: black;\">: Advertising costs, salaries, commissions, and promotional efforts.</span></p><p><strong style=\"color: black;\">.Customer Acquisition Formula</strong><span style=\"color: black;\">: Typically calculated as total marketing and sales expenses divided by the number of new customers.</span></p><p><strong style=\"color: black;\">.Channel Performance Analysis</strong><span style=\"color: black;\">: Evaluates which marketing channels (social media, paid ads, events) yield the best return on investment.</span></p><p><strong style=\"color: black;\">.Cost Optimization Strategies</strong><span style=\"color: black;\">: Identifies ways to reduce CAC while maintaining customer growth.</span></p><p><strong style=\"color: black;\">.Benchmarking &amp; Industry Comparisons</strong><span style=\"color: black;\">: Helps businesses assess their CAC against competitors.</span></p>'),
(13, 3, 'Customer Testimonials And Case Studies', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide a list of testimonials from your existing customers. </strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Customer Testimonials and Case Study document</strong><span style=\"color: black;\"> showcases real customer experiences to build trust and credibility for a business. It highlights success stories, demonstrating how a product or service has positively impacted customers.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Customer Testimonials</strong><span style=\"color: black;\">: Short, direct quotes from satisfied customers expressing their experience.</span></p><p><strong style=\"color: black;\">.Case Studies</strong><span style=\"color: black;\">: In-depth narratives detailing a customer\'s challenge, the solution provided, and measurable results.</span></p><p><strong style=\"color: black;\">.Problem-Solution Approach</strong><span style=\"color: black;\">: Explains how the business addressed a specific customer need.</span></p><p><strong style=\"color: black;\">.Data &amp; Metrics</strong><span style=\"color: black;\">: Includes statistics or performance improvements to validate success.</span></p><p><strong style=\"color: black;\">Visuals &amp; Quotes</strong><span style=\"color: black;\">: Uses images, graphs, or direct customer statements to enhance authenticity.</span></p>'),
(14, 3, 'Market Size And Growth Trends', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide an overview of your target market.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Market Size and Growth document</strong><span style=\"color: black;\"> provides an analysis of a product or service\'s total market potential and projections for future expansion. Businesses use this document to assess opportunities, make strategic decisions, and attract investors.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a market size and growth document include:</span></p><p><strong style=\"color: black;\">.Total Addressable Market (TAM)</strong><span style=\"color: black;\">: Estimates the overall revenue potential of the market.</span></p><p><strong style=\"color: black;\">.Serviceable Available Market (SAM)</strong><span style=\"color: black;\">: Defines the portion of the market a company can realistically target.</span></p><p><strong style=\"color: black;\">.Market Growth Trends</strong><span style=\"color: black;\">: Analyzes historical data and forecasts future expansion.</span></p><p><strong style=\"color: black;\">.Competitive Landscape</strong><span style=\"color: black;\">: Evaluates market share distribution among key players.</span></p><p><strong style=\"color: black;\">.Customer Demand &amp; Adoption Rates</strong><span style=\"color: black;\">: Tracks consumer interest and purchasing behaviour.</span></p><p><strong style=\"color: black;\">Economic &amp; Industry Influences</strong><span style=\"color: black;\">: Identifies external factors affecting market growth.</span></p>'),
(15, 3, 'Competitor Analysis', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide an overview of your competition.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Competitor Analysis document</strong><span style=\"color: black;\"> is a strategic report that evaluates the strengths, weaknesses, opportunities, and threats posed by competitors in a given market. It helps businesses understand their competitive landscape and refine their strategies to gain an edge.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a competitor analysis document include:</span></p><p><strong style=\"color: black;\">.Competitor Identification</strong><span style=\"color: black;\">: Lists direct and indirect competitors.</span></p><p><strong style=\"color: black;\">.Market Positioning</strong><span style=\"color: black;\">: Analyzes how competitors differentiate themselves.</span></p><p><strong style=\"color: black;\">.Product &amp; Service Comparison</strong><span style=\"color: black;\">: Evaluates features, pricing, and customer appeal.</span></p><p><strong style=\"color: black;\">.Marketing Strategies</strong><span style=\"color: black;\">: Reviews advertising, branding, and outreach efforts.</span></p><p><strong style=\"color: black;\">.Strengths &amp; Weaknesses</strong><span style=\"color: black;\">: Identifies areas where competitors excel or fall short.</span></p><p><strong style=\"color: black;\">Opportunities &amp; Threats</strong><span style=\"color: black;\">: Highlights potential market gaps and risks.</span></p>'),
(16, 3, 'Customer Demographics', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide an overview of your target customers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Customer Demographics document</strong><span style=\"color: black;\"> outlines key characteristics of a company\'s target audience, helping businesses tailor their marketing strategies and product offerings. It provides insights into customer preferences, behaviours, and purchasing patterns.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Typical elements of a customer demographics document include:</span></p><p><strong style=\"color: black;\">.Age Groups</strong><span style=\"color: black;\">: Identifies the age range of customers (e.g., 18-24, 25-34, etc.).</span></p><p><strong style=\"color: black;\">.Gender</strong><span style=\"color: black;\">: Tracks gender distribution among customers.</span></p><p><strong style=\"color: black;\">.Location</strong><span style=\"color: black;\">: Specifies geographic regions where customers are concentrated.</span></p><p><strong style=\"color: black;\">.Income Levels</strong><span style=\"color: black;\">: Helps determine purchasing power and spending habits.</span></p><p><strong style=\"color: black;\">.Education &amp; Occupation</strong><span style=\"color: black;\">: Provides insights into customer backgrounds and professions.</span></p><p><strong style=\"color: black;\">Buying Behaviour</strong><span style=\"color: black;\">: Analyzes shopping habits, preferred channels, and frequency of purchases.</span></p>'),
(17, 3, 'Market Entry Strategies', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide details on your company\'s strategy for entering new markets.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Market Entry Strategy document</strong><span style=\"color: black;\"> outlines a company\'s plan for introducing its products or services into a new market. It helps businesses navigate challenges, assess opportunities, and establish a competitive presence.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a market entry strategy document include:</span></p><p><strong style=\"color: black;\">.Market Research</strong><span style=\"color: black;\">: Analyzes customer needs, competition, and industry trends.</span></p><p><strong style=\"color: black;\">.Entry Mode</strong><span style=\"color: black;\">: Defines how the company will enter the market (e.g., partnerships, direct sales, franchising).</span></p><p><strong style=\"color: black;\">.Regulatory Considerations</strong><span style=\"color: black;\">: Identifies legal and compliance requirements.</span></p><p><strong style=\"color: black;\">.Pricing &amp; Positioning</strong><span style=\"color: black;\">: Establishes pricing strategies and brand positioning.</span></p><p><strong style=\"color: black;\">.Marketing &amp; Distribution Plan</strong><span style=\"color: black;\">: Details promotional activities and supply chain logistics.</span></p><p><strong style=\"color: black;\">Financial Projections</strong><span style=\"color: black;\">: Estimates costs, revenue potential, and return on investment.</span></p>'),
(18, 4, 'IT Systems And Software Structure', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide documentation outlining your IT infrastructure overview.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">IT Systems and Software Structure Document </strong><span style=\"color: black;\">defines how an organization\'s technology infrastructure is designed and </span></p><p><span style=\"color: black;\">organized. It outlines system architecture, software frameworks, integration points, and security measures to ensure </span></p><p><span style=\"color: black;\">efficient operations and scalability.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.System Architecture: </strong><span style=\"color: black;\">Overview of hardware, networks, databases, and cloud environments.</span></p><p><strong style=\"color: black;\">.Software Frameworks: </strong><span style=\"color: black;\">Programming languages, tools, and platforms used for development.</span></p><p><strong style=\"color: black;\">.Data Management &amp; Storage: </strong><span style=\"color: black;\">Policies for data security, backups, and retrieval.</span></p><p><strong style=\"color: black;\">.Integration &amp; APIs: </strong><span style=\"color: black;\">How different systems and applications interact.</span></p><p><strong style=\"color: black;\">.User Access &amp; Security: </strong><span style=\"color: black;\">Authentication, authorization, and cybersecurity policies.</span></p><p><strong style=\"color: black;\">Performance &amp; Scalability Considerations: </strong><span style=\"color: black;\">Optimization strategies for future growth.</span></p>'),
(19, 4, 'Security Protocols', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide information on how your company will enforce its data security protocols.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Security Protocols Document </strong><span style=\"color: black;\">is a formal guideline that outlines the rules, procedures, and best practices for </span></p><p><span style=\"color: black;\">maintaining security in an organization or system. It typically defines how to protect sensitive data, safeguard digital </span></p><p><span style=\"color: black;\">and physical assets and mitigate risks from cyber threats and unauthorized access.</span></p><p><strong style=\"color: black;\"> </strong></p><p><span style=\"color: black;\">These documents often include:</span></p><p><strong style=\"color: black;\">.Access Control Policies: </strong><span style=\"color: black;\">Who can access specific data or systems and how permissions are managed.</span></p><p><strong style=\"color: black;\">.Data Protection Measures: </strong><span style=\"color: black;\">Encryption, backup policies, and handling of confidential information.</span></p><p><strong style=\"color: black;\">.Incident Response Plans: </strong><span style=\"color: black;\">Steps to take in case of a security breach or cyberattack.</span></p><p><strong style=\"color: black;\">.Authentication and Authorization Procedures: </strong><span style=\"color: black;\">Guidelines for passwords, multi-factor authentication, and identity verification.</span></p><p><strong style=\"color: black;\">.Network Security Standards</strong><span style=\"color: black;\">: Firewall rules, intrusion detection systems, and monitoring protocols.</span></p><p><strong style=\"color: black;\">.Compliance and Legal Requirements</strong><span style=\"color: black;\">: Adherence to government and industry regulations, like GDPR, HIPAA, or SOC 2.</span></p>'),
(20, 4, 'Disaster Recovery Plans', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide information on how your business will ensure continuity and protect operations from disruptions.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Disaster Recovery Plan (DRP) document</strong><span style=\"color: black;\"> is a formal strategy outlining how an organization can restore its operations </span></p><p><span style=\"color: black;\">after a disruptive event, such as cyberattacks, natural disasters, or system failures. It serves as a roadmap to ensure </span></p><p><span style=\"color: black;\">business continuity and minimize downtime.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components of a DRP:</span><strong style=\"color: black;\"> </strong></p><p><strong style=\"color: black;\">.Risk Assessment:</strong><span style=\"color: black;\"> Identifies potential threats and vulnerabilities.</span></p><p><strong style=\"color: black;\">.Recovery Objectives:</strong><span style=\"color: black;\"> Establishes recovery time and recovery point goals.</span></p><p><strong style=\"color: black;\">.Backup Strategies:</strong><span style=\"color: black;\"> Specifies data storage and recovery methods.</span></p><p><strong style=\"color: black;\">.Emergency Response Procedures:</strong><span style=\"color: black;\"> Defines immediate actions to take when a disaster occurs.</span></p><p><strong style=\"color: black;\">.Roles &amp; Responsibilities:</strong><span style=\"color: black;\"> Assigns tasks to key personnel during recovery.</span></p><p><strong style=\"color: black;\">.Testing &amp; Maintenance:</strong><span style=\"color: black;\"> Ensures the plan remains effective through regular updates and simulations.</span></p>'),
(21, 4, 'Data Privacy Policies', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide how your company will secure customer privacy and compliance to build trust. </strong><span style=\"color: rgb(192, 0, 0);\"> </span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Data Privacy Policy document</strong><span style=\"color: black;\"> outlines how a company collects, stores, and protects personal and business data. By clearly defining data handling practices, it ensures compliance with privacy laws and builds trust with customers.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key Components:</span></p><p><strong style=\"color: black;\">.Data Collection</strong><span style=\"color: black;\"> – Specifies what personal information is gathered and why.</span></p><p><strong style=\"color: black;\">.Usage &amp; Processing</strong><span style=\"color: black;\"> – Explains how collected data is used and shared.</span></p><p><strong style=\"color: black;\">.Security Measures</strong><span style=\"color: black;\"> – Details of protections in place to prevent unauthorized access.</span></p><p><strong style=\"color: black;\">.User Rights &amp; Consent</strong><span style=\"color: black;\"> – Defines customer rights regarding their data and how they can manage it.</span></p><p><strong style=\"color: black;\">.Compliance &amp; Legal Requirements</strong><span style=\"color: black;\"> – Ensures adherence to relevant privacy laws and regulations.</span></p>'),
(22, 5, 'Supply Chain', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any supply chain documentation relevant to your operations.</strong><span style=\"color: red;\"> </span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Supply Chain Document</strong><span style=\"color: black;\"> outlines the processes, logistics, and coordination involved in sourcing, producing, and </span></p><p><span style=\"color: black;\">delivering goods or services. It ensures efficiency, transparency, and compliance within the supply chain.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Common components include:</span></p><p><strong style=\"color: black;\">.Procurement &amp; Sourcing:</strong><span style=\"color: black;\"> Supplier selection, contracts, and material acquisition.</span></p><p><strong style=\"color: black;\">.Production &amp; Inventory Management:</strong><span style=\"color: black;\"> Tracking raw materials, production timelines, and stock levels.</span></p><p><strong style=\"color: black;\">.Logistics &amp; Distribution:</strong><span style=\"color: black;\"> Transportation methods, warehousing, and delivery routes.</span></p><p><strong style=\"color: black;\">.Risk Management &amp; Compliance:</strong><span style=\"color: black;\"> Contingency planning, regulations, and quality standards.</span></p><p><strong style=\"color: black;\">.Performance Metrics &amp; Optimization:</strong><span style=\"color: black;\"> Strategies for improving efficiency and reducing costs.</span></p>'),
(23, 5, 'Production Processes', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any production process documentation relevant to your operations.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Production Processes Document</strong><span style=\"color: black;\"> details the step-by-step procedures and guidelines for manufacturing or service </span></p><p><span style=\"color: black;\">operations. It ensures efficiency, consistency, and quality control across production activities.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Typical components include:</span></p><p><strong style=\"color: black;\">.Process Flow &amp; Workflow:</strong><span style=\"color: black;\"> Outlines the sequence of operations.</span></p><p><strong style=\"color: black;\">.Material &amp; Resource Management:</strong><span style=\"color: black;\"> Handling raw materials, tools, and workforce allocation.</span></p><p><strong style=\"color: black;\">.Quality Assurance &amp; Control:</strong><span style=\"color: black;\"> Measures for maintaining product standards.</span></p><p><strong style=\"color: black;\">.Safety &amp; Compliance Guidelines:</strong><span style=\"color: black;\"> Workplace safety regulations and industry standards.</span></p><p><strong style=\"color: black;\">Performance Metrics &amp; Optimization:</strong><span style=\"color: black;\"> Efficiency tracking and continuous improvement strategies.</span></p>'),
(24, 5, 'Quality Control Measures', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any quality control documentation relevant to your operations.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Quality Control Measures Document </strong><span style=\"color: black;\">outlines the standards, procedures, and checks used to ensure products or services meet </span></p><p><span style=\"color: black;\">defined quality requirements. It helps maintain consistency, minimize defects, and uphold industry compliance.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key elements often include:</span></p><p><strong style=\"color: black;\">.Inspection &amp; Testing Protocols: </strong><span style=\"color: black;\">Methods for verifying quality at various stages.</span></p><p><strong style=\"color: black;\">.Standard Operating Procedures (SOPs): </strong><span style=\"color: black;\">Guidelines for consistency in processes.</span></p><p><strong style=\"color: black;\">.Compliance &amp; Regulations: </strong><span style=\"color: black;\">Alignment with industry standards like ISO, FDA, or others.</span></p><p><strong style=\"color: black;\">.Performance Metrics: </strong><span style=\"color: black;\">Benchmarks for measuring quality effectiveness.</span></p><p><strong style=\"color: black;\">Corrective Action Plans: </strong><span style=\"color: black;\">Steps for addressing defects or deviations.</span></p>'),
(25, 6, 'Licenses And Permits', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide details about licensing and permit requirements applicable to your company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Licenses and Permits Document</strong><span style=\"color: black;\"> outlines the legal authorizations a business or individual needs to operate </span></p><p><span style=\"color: black;\">within regulatory requirements. It ensures compliance with local, state, and federal laws.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Business Licenses:</strong><span style=\"color: black;\"> Official permissions required to conduct operations.</span></p><p><strong style=\"color: black;\">.Industry-Specific Permits:</strong><span style=\"color: black;\"> Certifications for regulated activities (e.g., construction, healthcare, food services).</span></p><p><strong style=\"color: black;\">.Environmental &amp; Safety Approvals:</strong><span style=\"color: black;\"> Compliance with zoning, emissions, and workplace safety laws.</span></p><p><strong style=\"color: black;\">.Renewal &amp; Expiration Details:</strong><span style=\"color: black;\"> Deadlines for maintaining valid licenses.</span></p><p><strong style=\"color: black;\">.Regulatory Authorities:</strong><span style=\"color: black;\"> Agencies overseeing the issuance and enforcement of permits.</span></p>'),
(26, 6, 'Industry-Specific Regulations', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide details about the regulatory requirements applicable to your company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Industry-Specific Regulations Document</strong><span style=\"color: black;\"> outlines the laws, standards, and compliance requirements </span></p><p><span style=\"color: black;\">relevant to a particular sector. It helps businesses adhere to legal mandates, maintain ethical operations, and </span></p><p><span style=\"color: black;\">avoid regulatory penalties.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Typical components include:</span></p><p><strong style=\"color: black;\">.Legal &amp; Compliance Requirements:</strong><span style=\"color: black;\"> Industry laws, government regulations, and licensing mandates.</span></p><p><strong style=\"color: black;\">.Operational Standards:</strong><span style=\"color: black;\"> Best practices for safety, quality control, and efficiency.</span></p><p><strong style=\"color: black;\">.Environmental &amp; Social Responsibility:</strong><span style=\"color: black;\"> Sustainability measures and corporate social responsibility guidelines.</span></p><p><strong style=\"color: black;\">.Risk Management &amp; Audits:</strong><span style=\"color: black;\"> Procedures for maintaining compliance and addressing violations.</span></p><p><strong style=\"color: black;\">Reporting &amp; Documentation:</strong><span style=\"color: black;\"> Record-keeping requirements for inspections, certifications, and disclosures.</span></p>'),
(27, 6, 'Environmental Compliance Documents', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any environmental compliance requirements for your company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Environmental Compliance Document</strong><span style=\"color: black;\"> outlines how an organization adheres to environmental laws, regulations, and </span></p><p><span style=\"color: black;\">sustainability standards. It ensures responsible environmental practices and minimizes ecological impact.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Regulatory Compliance:</strong><span style=\"color: black;\"> Documentation aligning with environmental laws and permits.</span></p><p><strong style=\"color: black;\">.Emissions &amp; Waste Management:</strong><span style=\"color: black;\"> Monitoring pollution levels, hazardous materials, and disposal methods.</span></p><p><strong style=\"color: black;\">.Sustainability Initiatives:</strong><span style=\"color: black;\"> Conservation efforts, resource efficiency, and renewable energy use.</span></p><p><strong style=\"color: black;\">.Environmental Risk Assessments:</strong><span style=\"color: black;\"> Identifying and mitigating ecological hazards.</span></p><p><strong style=\"color: black;\">Reporting &amp; Audits:</strong><span style=\"color: black;\"> Records of inspections, performance tracking, and compliance verification</span></p>'),
(28, 6, 'Health And Safety Records', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any health and safety assessment and the necessary compliance requirements for your company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Health and Safety Records Document</strong><span style=\"color: black;\"> tracks an organization\'s compliance with safety regulations and records incidents, </span></p><p><span style=\"color: black;\">inspections, and preventative measures. It ensures workplace safety, legal adherence, and continuous improvement in health </span></p><p><span style=\"color: black;\">protocols.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Incident Reports:</strong><span style=\"color: black;\"> Documentation of workplace accidents or hazards.</span></p><p><strong style=\"color: black;\">.Safety Inspections &amp; Audits:</strong><span style=\"color: black;\"> Records of routine checks and compliance reviews.</span></p><p><strong style=\"color: black;\">.Employee Training &amp; Certifications:</strong><span style=\"color: black;\"> Logs of safety training and qualifications.</span></p><p><strong style=\"color: black;\">.Risk Assessments:</strong><span style=\"color: black;\"> Identifying potential hazards and mitigation strategies.</span></p><p><strong style=\"color: black;\">Regulatory Compliance Records:</strong><span style=\"color: black;\"> Documentation aligning with legal safety standards.</span></p>'),
(29, 6, 'ESG (Environmental, Social, Governance) Reports', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide environmental governance and the necessary compliance requirements for your company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">ESG (Environmental, Social, Governance) Reports Document</strong><span style=\"color: black;\"> outlines an organization\'s sustainability efforts, </span></p><p><span style=\"color: black;\">ethical practices, and corporate governance standards. It demonstrates accountability to stakeholders and helps </span></p><p><span style=\"color: black;\">track progress on ESG goals.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Environmental Impact:</strong><span style=\"color: black;\"> Energy use, carbon footprint, waste management, and sustainability initiatives.</span></p><p><strong style=\"color: black;\">.Social Responsibility:</strong><span style=\"color: black;\"> Employee welfare, diversity and inclusion, community engagement, and ethical labor practices.</span></p><p><strong style=\"color: black;\">.Governance &amp; Compliance:</strong><span style=\"color: black;\"> Leadership transparency, corporate ethics, risk management, and adherence to regulations.</span></p>'),
(30, 7, 'Articles Of Incorporation And bylaws', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide your business registration documents.</strong></p><p><span style=\"color: red;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Articles of Incorporation and Bylaws Document </strong><span style=\"color: black;\">establishes the foundation and governance of a corporation. It outlines legal requirements, operational structure, and decision-making protocols.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Articles of Incorporation: </strong><span style=\"color: black;\">Legal document filed with the government to officially create the corporation, including its name, purpose, structure, and registered agent.</span></p><p><strong style=\"color: black;\">.Corporate Bylaws: </strong><span style=\"color: black;\">Internal rules governing the organization, covering leadership roles, voting procedures, shareholder rights, and operational guidelines.</span></p><p><strong style=\"color: black;\">.Board of Directors &amp; Officers: </strong><span style=\"color: black;\">Roles, responsibilities, and processes for appointing leadership.</span></p><p><strong style=\"color: black;\">.Meetings &amp; Voting Procedures: </strong><span style=\"color: black;\">Guidelines for board and shareholder meetings.</span></p><p><strong style=\"color: black;\">Amendment Policies</strong><span style=\"color: black;\">: Rules for modifying bylaws or incorporation details.</span></p>'),
(31, 7, 'Insurance Policies', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide information on the company\'s different insurance policies.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Insurance Policies Document</strong><span style=\"color: black;\"> outlines the terms, coverage, and conditions of an insurance agreement between an insurer and a policyholder. It serves as a reference for understanding protection, claims procedures, and legal obligations.</span></p><p><span style=\"color: black;\">&nbsp;</span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Policy Coverage:</strong><span style=\"color: black;\"> Details of what is insured, including health, property, liability, or business risks.</span></p><p><strong style=\"color: black;\">.Premiums &amp; Payments:</strong><span style=\"color: black;\"> Cost of the policy and payment schedules.</span></p><p><strong style=\"color: black;\">.Exclusions &amp; Limitations:</strong><span style=\"color: black;\"> Specific cases or scenarios not covered by the insurance.</span></p><p><strong style=\"color: black;\">.Claims Process:</strong><span style=\"color: black;\"> Steps for reporting losses, filing claims, and receiving payouts.</span></p><p><strong style=\"color: black;\">.Legal &amp; Regulatory Compliance:</strong><span style=\"color: black;\"> Terms that align with insurance laws and industry regulations.</span></p>');
INSERT INTO `dataroomsub_categories` (`id`, `dataroom_id`, `name`, `tips`) VALUES
(32, 7, 'Litigation History', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide details regarding any legal disputes involving the company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Litigation History Document</strong><span style=\"color: black;\"> records an organization’s or individual’s legal disputes, lawsuits, and court cases. It provides </span></p><p><span style=\"color: black;\">a comprehensive view of past legal challenges and resolutions, often used for due diligence, risk assessment, and </span></p><p><span style=\"color: black;\">regulatory compliance.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Case Details:</strong><span style=\"color: black;\"> Names of involved parties, case numbers, and court jurisdiction.</span></p><p><strong style=\"color: black;\">.Nature of Litigation:</strong><span style=\"color: black;\"> Type of dispute, such as contract breaches, intellectual property claims, or regulatory violations.</span></p><p><strong style=\"color: black;\">.Outcomes &amp; Resolutions:</strong><span style=\"color: black;\"> Verdicts, settlements, fines, or ongoing legal proceedings.</span></p><p><strong style=\"color: black;\">.Dates &amp; Timelines:</strong><span style=\"color: black;\"> Filing, court hearings, and resolution dates.</span></p><p><strong style=\"color: black;\">Regulatory &amp; Compliance Impact:</strong><span style=\"color: black;\"> How legal actions affect business operations or reputational standing.</span></p>'),
(33, 7, 'Risk Assessment Reports', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide information on possible risks related to your company or industry.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Risk Assessment Reports Document</strong><span style=\"color: black;\"> evaluates potential hazards, vulnerabilities, and threats within an organization, </span></p><p><span style=\"color: black;\">project, or process. It helps identify risks, assess their impact, and outline mitigation strategies to enhance safety and </span></p><p><span style=\"color: black;\">compliance.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Risk Identification:</strong><span style=\"color: black;\"> Listing potential threats, from financial risks to cybersecurity vulnerabilities.</span></p><p><strong style=\"color: black;\">.Impact Analysis:</strong><span style=\"color: black;\"> Evaluating the severity and likelihood of each risk.</span></p><p><strong style=\"color: black;\">.Mitigation Strategies:</strong><span style=\"color: black;\"> Preventive measures and contingency plans to reduce risk exposure.</span></p><p><strong style=\"color: black;\">.Regulatory Compliance:</strong><span style=\"color: black;\"> Ensuring alignment with legal and industry standards.</span></p><p><strong style=\"color: black;\">Monitoring &amp; Review:</strong><span style=\"color: black;\"> Procedures for continuous risk assessment and updates.</span></p>'),
(34, 8, 'Historical Financial Statements (income statements, balance sheets, cash flow statements)', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide documentation on your PAST financials and budgets.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Historical Financial Statements Document</strong><span style=\"color: black;\"> provides a record of an organization\'s past financial performance, </span></p><p><span style=\"color: black;\">helping stakeholders analyze trends, assess stability, and make informed decisions.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Income Statements:</strong><span style=\"color: black;\"> Reports revenue, expenses, and net profit over a specific period.</span></p><p><strong style=\"color: black;\">.Balance Sheets:</strong><span style=\"color: black;\"> Shows assets, liabilities, and equity at a given point in time.</span></p><p><strong style=\"color: black;\">Cash Flow Statements:</strong><span style=\"color: black;\"> Tracks the movement of cash, including operations, investments, and financing activities.</span></p>'),
(35, 8, 'Financial Projections And Budgets', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide documentation on your FUTURE financials and budget forecasts.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Financial Projections and Budgets Document</strong><span style=\"color: black;\"> outlines a company’s expected revenues, expenses, and financial performance over a specific period. It helps with strategic planning, investment decisions, and financial stability.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Revenue Forecasting:</strong><span style=\"color: black;\"> Estimated income from sales, investments, or funding sources.</span></p><p><strong style=\"color: black;\">.Expense Planning:</strong><span style=\"color: black;\"> Breakdown of operational costs, salaries, marketing, and other expenditures.</span></p><p><strong style=\"color: black;\">.Profitability Analysis:</strong><span style=\"color: black;\"> Expected profit margins and financial growth projections.</span></p><p><strong style=\"color: black;\">.Cash Flow Management:</strong><span style=\"color: black;\"> Monitoring inflows and outflows to ensure liquidity.</span></p><p><strong style=\"color: black;\">Budget Allocation:</strong><span style=\"color: black;\"> Setting limits for departments or projects based on financial goals.</span></p>'),
(36, 8, 'Accounts Receivable And Payable Aging Reports', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide details regarding outstanding payments owed to the company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Accounts Receivable and Payable Aging Reports Document</strong><span style=\"color: black;\"> tracks outstanding invoices—both owed to and by </span></p><p><span style=\"color: black;\">a company—based on their due dates. It helps businesses manage cash flow, assess overdue payments, and evaluate </span></p><p><span style=\"color: black;\">financial health.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components include:</span></p><p><strong style=\"color: black;\">.Accounts Receivable Aging:</strong><span style=\"color: black;\"> Lists unpaid customer invoices by aging categories (e.g., 30, 60, 90+ days overdue).</span></p><p><strong style=\"color: black;\">.Accounts Payable Aging:</strong><span style=\"color: black;\"> Tracks outstanding bills the company owes to vendors and suppliers.</span></p><p><strong style=\"color: black;\">.Due Dates &amp; Payment Terms:</strong><span style=\"color: black;\"> Helps prioritize collections and avoid late fees.</span></p><p><strong style=\"color: black;\">.Risk &amp; Collection Strategies:</strong><span style=\"color: black;\"> Identifies high-risk overdue accounts and outlines action plans.</span></p><p><strong style=\"color: black;\">Financial Impact Assessment:</strong><span style=\"color: black;\"> Evaluates how outstanding balances affect cash flow.</span></p>'),
(37, 8, 'Audit Reports', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide financial audits of the company.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Audit Reports Document</strong><span style=\"color: black;\"> provides a detailed assessment of an organization’s financial records, operational processes, or regulatory compliance. It helps ensure accuracy, transparency, and adherence to industry standards.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Scope &amp; Objectives:</strong><span style=\"color: black;\"> Defines the purpose and areas audited.</span></p><p><strong style=\"color: black;\">.Findings &amp; Analysis:</strong><span style=\"color: black;\"> Summarizes discrepancies, risks, and improvements.</span></p><p><strong style=\"color: black;\">.Financial &amp; Compliance Review:</strong><span style=\"color: black;\"> Evaluates records against legal and regulatory requirements.</span></p><p><strong style=\"color: black;\">.Recommendations:</strong><span style=\"color: black;\"> Suggested corrective actions or best practices.</span></p><p><strong style=\"color: black;\">Auditor\'s Statement:</strong><span style=\"color: black;\"> Formal conclusions and certifications from the auditing entity.</span></p>'),
(38, 8, 'Capitalization Table', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide the most up-to-date equity holdings/positions in the company. </strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Capitalization Table (Cap Table) Document</strong><span style=\"color: black;\"> is a detailed record of a company\'s ownership structure, listing equity </span></p><p><span style=\"color: black;\">stakes, shareholder percentages, and financial instruments such as shares, convertible securities, and options. </span></p><p><span style=\"color: black;\">It is essential for tracking ownership distribution and making informed financial decisions.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Shareholder Information:</strong><span style=\"color: black;\"> Names and ownership percentages of investors, founders, and employees.</span></p><p><strong style=\"color: black;\">.Equity Breakdown:</strong><span style=\"color: black;\"> Common stock, preferred stock, options, warrants, and convertible securities.</span></p><p><strong style=\"color: black;\">.Funding Rounds:</strong><span style=\"color: black;\"> Details on investments, valuations, and dilution effects over time.</span></p><p><strong style=\"color: black;\">.Debt &amp; Convertible Instruments:</strong><span style=\"color: black;\"> Loans or securities that can convert into equity.</span></p><p><strong style=\"color: black;\">Exit &amp; Liquidity Scenarios:</strong><span style=\"color: black;\"> Potential impacts of mergers, acquisitions, or public offerings.</span></p>'),
(41, 11, 'Media Coverage', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide instances of your published media coverage.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Media Coverage Document</strong><span style=\"color: black;\"> compiles and tracks news articles, interviews, broadcasts, and other media mentions related to an organization, individual, or event. It helps monitor public perception, assess outreach efforts, and analyze press impact.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.List of Media Mentions:</strong><span style=\"color: black;\"> Articles, TV segments, radio interviews, and online publications.</span></p><p><strong style=\"color: black;\">.Source &amp; Date:</strong><span style=\"color: black;\"> Identifying where and when each coverage appeared.</span></p><p><strong style=\"color: black;\">.Headline &amp; Summary:</strong><span style=\"color: black;\"> Brief descriptions of the media content.</span></p><p><strong style=\"color: black;\">.Sentiment Analysis:</strong><span style=\"color: black;\"> Assessing whether coverage is positive, neutral, or negative.</span></p><p><strong style=\"color: black;\">.Impact &amp; Reach Metrics:</strong><span style=\"color: black;\"> Evaluating audience engagement, publication credibility, and potential influence.</span></p><p><strong style=\"color: black;\">Archived Links &amp; Clippings:</strong><span style=\"color: black;\"> Storing references for future use.</span></p>'),
(42, 11, 'Press Releases', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide examples of your press releases used to promote your products and communicate updates to your customers.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Press Releases Document</strong><span style=\"color: black;\"> is an official statement issued to media outlets, providing information about a company, event, or announcement. It helps organizations share news in a structured and engaging format.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Headline &amp; Summary:</strong><span style=\"color: black;\"> A compelling title and brief overview of the announcement.</span></p><p><strong style=\"color: black;\">.Body Content:</strong><span style=\"color: black;\"> Details about the news, including why it\'s significant and relevant.</span></p><p><strong style=\"color: black;\">.Quotes from Key Figures:</strong><span style=\"color: black;\"> Statements from executives, employees, or stakeholders to add credibility.</span></p><p><strong style=\"color: black;\">.Supporting Facts &amp; Data:</strong><span style=\"color: black;\"> Statistics, research, or background information reinforcing the message.</span></p><p><strong style=\"color: black;\">Contact Information:</strong><span style=\"color: black;\"> Company representatives for media inquiries or further details.</span></p>'),
(43, 11, 'Awards And Recognitions', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide any awards or recognitions for your company and/or products.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">An </span><strong style=\"color: black;\">Awards and Recognitions Document</strong><span style=\"color: black;\"> records the honors, achievements, and accolades received by an organization or individual. </span></p><p><span style=\"color: black;\">It helps showcase accomplishments, build credibility, and strengthen reputation.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Award Titles &amp; Categories:</strong><span style=\"color: black;\"> Names of awards and distinctions earned.</span></p><p><strong style=\"color: black;\">.Issuing Organizations:</strong><span style=\"color: black;\"> Entities or institutions granting the recognition.</span></p><p><strong style=\"color: black;\">.Dates &amp; Milestones:</strong><span style=\"color: black;\"> Timeline of achievements and significant recognitions.</span></p><p><strong style=\"color: black;\">.Criteria &amp; Significance:</strong><span style=\"color: black;\"> Reasons for receiving the awards and their impact.</span></p><p><strong style=\"color: black;\">Media &amp; Publicity Mentions:</strong><span style=\"color: black;\"> Press coverage, announcements, and promotional materials.</span></p>'),
(44, 11, 'Social Media Presence', '<p><strong style=\"color: rgb(192, 0, 0);\">Provide your social media strategy documentation.</strong></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">A </span><strong style=\"color: black;\">Social Media Presence Document</strong><span style=\"color: black;\"> outlines an organization\'s strategy, guidelines, and branding approach for maintaining a cohesive and effective presence across social media platforms. It helps ensure consistency, engagement, and alignment with business goals.</span></p><p><span style=\"color: black;\"> </span></p><p><span style=\"color: black;\">Key components typically include:</span></p><p><strong style=\"color: black;\">.Platform Strategy:</strong><span style=\"color: black;\"> Goals, target audience, and content plans for each platform.</span></p><p><strong style=\"color: black;\">.Brand Guidelines:</strong><span style=\"color: black;\"> Voice, tone, visual identity, and messaging consistency.</span></p><p><strong style=\"color: black;\">.Engagement &amp; Community Management:</strong><span style=\"color: black;\"> Interaction policies, response times, and customer service approach.</span></p><p><strong style=\"color: black;\">.Posting Schedule &amp; Content Types:</strong><span style=\"color: black;\"> Frequency, formats, and themes for content creation.</span></p><p><strong style=\"color: black;\">.Analytics &amp; Performance Metrics:</strong><span style=\"color: black;\"> Tracking success through engagement, reach, and conversion rates.</span></p><p><strong style=\"color: black;\">Crisis &amp; Risk Management:</strong><span style=\"color: black;\"> Guidelines for handling negative publicity or social media incidents.</span></p>'),
(45, 12, 'Any Ether Pertinent Information Not Covered Above', NULL),
(46, 12, 'FAQs', NULL),
(47, 12, 'Glossary Of Terms', NULL),
(48, 5, 'General Operations Review Documents', NULL),
(49, 6, 'General Regulatory Review Documents', NULL),
(50, 8, 'General Financial Review Documents', NULL),
(52, 13, 'Term Sheets And Investment Agreements', NULL),
(54, 17, 'eeerer', '<p>werwer</p>'),
(55, 17, 'rtrt5 66', '<p>fff</p>'),
(56, 17, 'dferere', '<p>sdfsdf</p>'),
(57, 17, 'ewwww', '<p>www</p>'),
(66, 4, 'General Technology Review Documents', ''),
(67, 12, 'Upload Company Logo', '');

-- --------------------------------------------------------

--
-- Table structure for table `dataroom_generatedocument`
--

CREATE TABLE `dataroom_generatedocument` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT 0,
  `usersubscriptiondataroomone_time_id` int(11) NOT NULL DEFAULT 0,
  `document_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataroom_generatedocument`
--

INSERT INTO `dataroom_generatedocument` (`id`, `company_id`, `created_by_id`, `created_by_role`, `updated_by_id`, `updated_by_role`, `version`, `usersubscriptiondataroomone_time_id`, `document_name`, `created_at`) VALUES
(1, 2, 0, NULL, 0, NULL, 8, 13, 'Neuo_Diligence_2025-10-22_v8.docx', '2025-10-22 15:10:50'),
(2, 2, 0, NULL, 0, NULL, 9, 1, 'Neuo_Diligence_2025-10-22_v9.docx', '2025-10-22 15:26:58');

-- --------------------------------------------------------

--
-- Table structure for table `discount_code`
--

CREATE TABLE `discount_code` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `type` text DEFAULT NULL,
  `percentage` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `usage_limit` int(11) NOT NULL DEFAULT 0,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `shared` enum('No','Yes') NOT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount_code`
--

INSERT INTO `discount_code` (`id`, `code`, `type`, `percentage`, `status`, `usage_limit`, `used_count`, `shared`, `payment_type`, `exp_date`, `created_at`) VALUES
(1, 'X0P8DQ', '[\"Dataroom_Plus_Investor_Report\"]', '10', 'Active', 8, 0, 'No', NULL, '2025-10-10', '2025-10-03 11:47:57'),
(2, 'SNNNMT', '[\"Dataroom_Plus_Investor_Report\"]', '11', 'Active', 125, 16, 'Yes', NULL, '2025-11-08', '2025-10-03 11:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `name`, `type`, `subject`, `body`) VALUES
(3, 'Confirmation', 'confirmation', 'Confirmation Email', 'Hi {{user_name}}, Topic {{meeting_topic}} your event is scheduled on {{event_time}}. Join using {{zoom_link}}'),
(4, 'Reminder 48', 'reminder_48hr', 'Reminder 48 Hours', '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>Meeting Reminder</title>\n  </head>\n  <body style=\"margin: 0; padding: 0; background-color: #f4f4f4;\">\n    <table\n      align=\"center\"\n      border=\"0\"\n      cellpadding=\"0\"\n      cellspacing=\"0\"\n      width=\"600\"\n      style=\"border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif;\"\n    >\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px 10px 30px;\">\n          <h2 style=\"color: #333333;\">Hello {{user_name}},</h2>\n          <p style=\"font-size: 16px; color: #555555;\">\n            This is a reminder for your upcoming Zoom meeting.\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"left\" style=\"padding: 10px 30px;\">\n          <p style=\"font-size: 16px; color: #333;\">\n            <strong>📝 Module Name:</strong> {{module_name}}<br />\n            <strong>📝 Topic:</strong> {{meeting_topic}}<br />\n            <strong>📅 When:</strong> {{event_time}}<br />\n            <strong>🔗 Zoom Link:</strong>\n            <a\n              href=\"{{zoom_link}}\"\n              style=\"color: #007bff; text-decoration: none;\"\n              target=\"_blank\"\n              >Join Meeting</a\n            >\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px;\">\n          <a\n            href=\"{{zoom_link}}\"\n            style=\"\n              background-color: #007bff;\n              color: white;\n              padding: 12px 24px;\n              text-decoration: none;\n              border-radius: 6px;\n              display: inline-block;\n              font-size: 16px;\n            \"\n            target=\"_blank\"\n            >Join Zoom Meeting</a\n          >\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px; color: #888888; font-size: 14px;\">\n          — Company Team\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>\n'),
(5, 'Reminder 24 Hour', 'reminder_24hr', 'Reminder 24 Hour', '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>Meeting Reminder</title>\n  </head>\n  <body style=\"margin: 0; padding: 0; background-color: #f4f4f4;\">\n    <table\n      align=\"center\"\n      border=\"0\"\n      cellpadding=\"0\"\n      cellspacing=\"0\"\n      width=\"600\"\n      style=\"border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif;\"\n    >\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px 10px 30px;\">\n          <h2 style=\"color: #333333;\">Hello {{user_name}},</h2>\n          <p style=\"font-size: 16px; color: #555555;\">\n            This is a reminder for your upcoming Zoom meeting.\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"left\" style=\"padding: 10px 30px;\">\n          <p style=\"font-size: 16px; color: #333;\">\n            <strong>📝 Module Name:</strong> {{module_name}}<br />\n            <strong>📝 Topic:</strong> {{meeting_topic}}<br />\n            <strong>📅 When:</strong> {{event_time}}<br />\n            <strong>🔗 Zoom Link:</strong>\n            <a\n              href=\"{{zoom_link}}\"\n              style=\"color: #007bff; text-decoration: none;\"\n              target=\"_blank\"\n              >Join Meeting</a\n            >\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px;\">\n          <a\n            href=\"{{zoom_link}}\"\n            style=\"\n              background-color: #007bff;\n              color: white;\n              padding: 12px 24px;\n              text-decoration: none;\n              border-radius: 6px;\n              display: inline-block;\n              font-size: 16px;\n            \"\n            target=\"_blank\"\n            >Join Zoom Meeting</a\n          >\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px; color: #888888; font-size: 14px;\">\n          — Company Team\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>\n'),
(6, 'Reminder 1', 'reminder_1hr', 'Reminder 1', '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>Meeting Reminder</title>\n  </head>\n  <body style=\"margin: 0; padding: 0; background-color: #f4f4f4;\">\n    <table\n      align=\"center\"\n      border=\"0\"\n      cellpadding=\"0\"\n      cellspacing=\"0\"\n      width=\"600\"\n      style=\"border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif;\"\n    >\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px 10px 30px;\">\n          <h2 style=\"color: #333333;\">Hello {{user_name}},</h2>\n          <p style=\"font-size: 16px; color: #555555;\">\n            This is a reminder for your upcoming Zoom meeting.\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"left\" style=\"padding: 10px 30px;\">\n          <p style=\"font-size: 16px; color: #333;\">\n            <strong>📝 Module Name:</strong> {{module_name}}<br />\n            <strong>📝 Topic:</strong> {{meeting_topic}}<br />\n            <strong>📅 When:</strong> {{event_time}}<br />\n            <strong>🔗 Zoom Link:</strong>\n            <a\n              href=\"{{zoom_link}}\"\n              style=\"color: #007bff; text-decoration: none;\"\n              target=\"_blank\"\n              >Join Meeting</a\n            >\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px;\">\n          <a\n            href=\"{{zoom_link}}\"\n            style=\"\n              background-color: #007bff;\n              color: white;\n              padding: 12px 24px;\n              text-decoration: none;\n              border-radius: 6px;\n              display: inline-block;\n              font-size: 16px;\n            \"\n            target=\"_blank\"\n            >Join Zoom Meeting</a\n          >\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding: 20px 30px; color: #888888; font-size: 14px;\">\n          — Company Team\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>\n');

-- --------------------------------------------------------

--
-- Table structure for table `entrepreneurs`
--

CREATE TABLE `entrepreneurs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `zoom_link` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `investorrequest_company`
--

CREATE TABLE `investorrequest_company` (
  `id` int(11) NOT NULL,
  `roundrecord_id` int(11) NOT NULL DEFAULT 0,
  `next_round_id` int(11) DEFAULT 0,
  `investor_id` int(11) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `shares` varchar(255) DEFAULT NULL,
  `investment_amount` varchar(255) DEFAULT NULL,
  `request_confirm` enum('No','Yes') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `investor_information`
--

CREATE TABLE `investor_information` (
  `id` int(11) NOT NULL,
  `unique_code` varchar(255) DEFAULT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `viewpassword` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `type_of_investor` varchar(255) DEFAULT NULL,
  `full_address` text DEFAULT NULL,
  `country_tax` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `kyc_document` text DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `is_register` enum('No','Yes') NOT NULL,
  `expired_at` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `accredited_status` varchar(255) DEFAULT NULL,
  `linkedIn_profile` text DEFAULT NULL,
  `industry_expertise` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investor_information`
--

INSERT INTO `investor_information` (`id`, `unique_code`, `company_id`, `created_by_id`, `created_by_role`, `first_name`, `last_name`, `email`, `viewpassword`, `password`, `phone`, `city`, `country`, `type_of_investor`, `full_address`, `country_tax`, `tax_id`, `kyc_document`, `ip_address`, `is_register`, `expired_at`, `created_at`, `updated_at`, `accredited_status`, `linkedIn_profile`, `industry_expertise`) VALUES
(1, '4868e8cab84992e022522332edd1bdcb', 2, 1, 'signatory', 'Investor', 'Kumar', 'avinayquicktech+001@gmail.com', 'S-OyK$|3', '$2b$12$h2M9nJdsXpCRJzc/aSAgR.Umc/6gENZm9XoYrydTcmB19hDS4Awma', '+1 55555666666', 'dfg', 'IN', 'Government/Grant', 'fh', 'fhg', '34543', '[\"1758705747202-720513004.jpg\"]', '223.178.209.49', 'Yes', '2025-10-24', '2025-09-24 13:16:47', '2025-09-24 14:52:29', 'Accredited Investor', 'fdgh', 'dfgdf'),
(2, 'e831b14778ad4d6abbce81a6aa8d4834', 2, 1, 'signatory', 'Test', 'Kumar', 'avinayquicktech@gmail.com', 'du@8X>S)', '$2b$12$ASVQ5C5ca77LBa4yuk0dCuWtvDs46YVVnSZzDlTAFVOoqHLFkhmbe', '+14334334343', 'Kangra', 'AL', 'Other', 'Test', 'sss', '', '[]', '223.178.211.133', 'Yes', '2025-10-24', '2025-09-24 13:19:33', '2025-10-03 15:45:06', 'Accredited Investor', '', 'Energy & Utilities'),
(3, '6d407b52dbd805dc248ee6466963dfec', 2, 1, 'signatory', 'Inesvtro 2sss', 'Kumar', 'avinayquicktech+05@gmail.com', '.|nh8(<X', '$2b$12$ErBUwEQsuOGAA/fG2TM2j.co1PKWH2mCsqHfoel5WJDWeUQ8MDtXS', '+14805555555', 'hhfg', 'HU', 'Bank/Financial Institution', 'abc', '546t4re', 'gdg', '[\"1758775040716-752599709.png\"]', '223.178.212.151', 'Yes', '2025-10-25', '2025-09-25 10:06:14', '2025-09-25 10:07:22', '4rt', 'dfg', 'dffgg');

-- --------------------------------------------------------

--
-- Table structure for table `investor_updates`
--

CREATE TABLE `investor_updates` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `type` enum('Investor updates','Due Diligence Document','Term Sheet','Subscription Document','Dataroom') NOT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `financial_performance` text DEFAULT NULL,
  `operational_updates` text DEFAULT NULL,
  `market_competitive` text DEFAULT NULL,
  `customer_product` text DEFAULT NULL,
  `fundraising_financial` text DEFAULT NULL,
  `future_outlook` text DEFAULT NULL,
  `executive_summary` text DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT NULL,
  `is_shared` enum('No','Yes') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investor_updates`
--

INSERT INTO `investor_updates` (`id`, `company_id`, `created_by_id`, `created_by_role`, `version`, `type`, `document_name`, `update_date`, `financial_performance`, `operational_updates`, `market_competitive`, `customer_product`, `fundraising_financial`, `future_outlook`, `executive_summary`, `is_locked`, `is_shared`, `created_at`, `updated_at`) VALUES
(1, 2, 0, NULL, '1', 'Investor updates', 'Neuo_investor_update_v1_September_24th_2025.pdf', '2025-09-24 14:21:17', 'What are the key financial trends or concerns?', 'How has the team grown or changed', 'How has the team grown or changed', 'What new developments or launches are planned', 'How are financial resources being allocated for growth', 'How can investors support the company’s success', '**Executive Summary: Investor Update**\n\nIn our recent evaluation of financial performance, we have noted consistent growth in revenue, though margins have been pressured by increased operational costs. Key financial concerns include managing these costs and improving cash flow.\n\nOperationally, our team has expanded by 20% in the past quarter, with significant enhancements in our R&D and customer support divisions. This expansion supports our strategic focus on innovation and superior customer service.\n\nThe market and competitive landscape analysis reveals a robust position despite new entrants. Our ongoing investment in technology and market research has been pivotal in maintaining a competitive edge.\n\nFrom a product perspective, we are excited about the upcoming launch of two new product lines which are expected to cater to previously untapped market segments. These launches are backed by extensive market research and pilot testing, ensuring alignment with customer needs and expectations.\n\nRegarding fundraising and financial strategy, recent efforts have successfully secured an additional round of funding, which is earmarked for scaling our production capabilities and enhancing our marketing efforts.\n\nLooking forward, we believe strategic investor support is crucial. Continued financial backing and expertise in international markets would be invaluable as we aim to expand our footprint globally. We encourage our investors to engage actively with us in shaping the future strategy to maximize shareholder value.\n\nThank you for your ongoing support and belief in our vision. We are committed to delivering on our promises and achieving the benchmarks we have set for ourselves.', 1, 'Yes', '2025-09-24 14:21:17', '2025-09-24 14:21:17'),
(2, 2, 0, NULL, '1', 'Due Diligence Document', 'Neuo_Diligence_2025-10-03_v1.docx', '2025-10-03 14:13:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-03 14:13:43', '2025-10-03 14:13:43'),
(3, 2, 0, NULL, '2', 'Due Diligence Document', 'Neuo_Diligence_2025-10-08_v2.docx', '2025-10-08 11:28:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-08 11:28:48', '2025-10-08 11:28:48'),
(4, 2, 0, NULL, '3', 'Due Diligence Document', 'Neuo_Diligence_2025-10-08_v3.docx', '2025-10-08 12:11:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-08 12:11:56', '2025-10-08 12:11:56'),
(5, 2, 0, NULL, '4', 'Due Diligence Document', 'Neuo_Diligence_2025-10-08_v4.docx', '2025-10-08 12:14:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-08 12:14:33', '2025-10-08 12:14:33'),
(6, 2, 0, NULL, '5', 'Due Diligence Document', 'Neuo_Diligence_2025-10-08_v5.docx', '2025-10-08 12:17:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-08 12:17:23', '2025-10-08 12:17:23'),
(7, 2, 0, NULL, '6', 'Due Diligence Document', 'Neuo_Diligence_2025-10-08_v6.docx', '2025-10-08 12:18:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-08 12:18:57', '2025-10-08 12:18:57'),
(8, 2, 2, 'signatory', '2', 'Investor updates', 'Neuo_investor_update_v2_October_10th_2025.pdf', '2025-10-10 10:12:01', 'What are the key financial trends or concerns', 'How has the team grown or changed?', 'How has the market evolved, and what trends are emerging?', 'How has the product or service improved?', 'What is the current cash runway and burn rate?', 'What are the company’s goals for the next quarter?', '**Executive Summary of Investor Update Comparisons**\n\nThe latest investor update presents several key changes and continuities in comparison to the previous report, reflecting progress and shifts in company strategy and market dynamics.\n\n**Financial**: The structure of reporting on financial trends and concerns remains consistent, maintaining a focus on critical financial metrics. However, any specific changes in trends such as revenue growth, cost management, or profitability concerns are not detailed in the comparison provided.\n\n**Operational**: The previous update\'s focus on team growth has been retained, suggesting ongoing importance in team expansion or restructuring. Specific details on changes such as new hires, department expansions, or operational efficiencies would provide a clearer picture of operational progress.\n\n**Market**: There is a significant shift from discussing internal team growth to analyzing broader market evolution and emerging trends. This indicates a stronger external focus, aiming to align company strategies with market dynamics and opportunities.\n\n**Customer/Product**: Previously, the focus was on planned developments or launches. The current update shifts to improvements in existing products or services, highlighting a pivot towards enhancing and refining the current offerings rather than expanding them.\n\n**Fundraising**: The update has moved from a general discussion on the allocation of financial resources to more specific metrics of cash runway and burn rate, providing a clearer financial health indicator and future funding needs.\n\n**Outlook**: The outlook has transitioned from seeking investor support to defining specific company goals for the next quarter, suggesting a more targeted and measurable approach to strategic objectives.\n\nOverall, the updates reflect a maturation in operational focus, a strategic pivot in market and product strategies, and a more detailed financial scrutiny, all of which are crucial for informed investor decision-making.', 1, 'Yes', '2025-10-10 10:12:01', '2025-10-10 10:12:01'),
(9, 2, 0, NULL, '7', 'Due Diligence Document', 'Neuo_Diligence_2025-10-22_v7.docx', '2025-10-22 14:56:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-22 14:56:31', '2025-10-22 14:56:31'),
(10, 2, 0, NULL, '8', 'Due Diligence Document', 'Neuo_Diligence_2025-10-22_v8.docx', '2025-10-22 15:10:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-22 15:10:50', '2025-10-22 15:10:50'),
(11, 2, 0, NULL, '9', 'Due Diligence Document', 'Neuo_Diligence_2025-10-22_v9.docx', '2025-10-22 15:26:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'No', '2025-10-22 15:26:58', '2025-10-22 15:26:58');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `description` text DEFAULT NULL,
  `textt` text DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `annual_price` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `name`, `status`, `description`, `textt`, `price`, `annual_price`, `date`) VALUES
(9, 'LIVE: Presenting to Investors', 'Active', '<p>Keiretsu Forum has grown to be the worlds largest and most active early stage investor network (as ranked by Pitchbook!) with over 3.000 accredited investor members throughout chapters in countrjes on 4 continents The first step to participation es a 30 menute Deat Screening Session (via on online Zoom meeting). This is a no-obligation / no-cost opportunity for out Deol Screening Committeee</p>', 'The marketing description will go here. It will outline the \'Be The Investor\' module.', 0, 0, '2025-04-19 09:59:28'),
(10, 'LIVE: Term Sheets', 'Active', '<p>Keiretsu Forum has grown to be the worlds largest and most active early stage investor network (as ranked by Pitchbook!) with over 3.000 accredited investor members throughout chapters in countrjes on 4 continents The first step to participation es a 30 menute Deat Screening Session (via on online Zoom meeting). This is a no-obligation / no-cost opportunity for out Deol Screening Committeee</p>', 'The marketing description will go here. It will outline the \'Be The Investor\' module.', 60, 0, '2025-05-03 10:32:17'),
(13, 'LIVE: Valuation and Investment Structure', 'Active', '<p>Keiretsu Forum has grown to be the worlds largest and most active early stage investor network (as ranked by Pitchbook!) with over 3.000 accredited investor members throughout chapters in countrjes on 4 continents The first step to participation es a 30 menute Deat Screening Session (via on online Zoom meeting). This is a no-obligation / no-cost opportunity for out Deol Screening Committeee</p>', 'The marketing description will go here. It will outline the \'Be The Investor\' module.', 500, 70, '2025-05-21 14:20:13'),
(14, 'LIVE: Be the Investor', 'Active', '<p>Keiretsu Forum has grown to be the worlds largest and most active early stage investor network (as ranked by Pitchbook!) with over 3.000 accredited investor members throughout chapters in countrjes on 4 continents The first step to participation es a 30 menute Deat Screening Session (via on online Zoom meeting). This is a no-obligation / no-cost opportunity for out Deol Screening Committeee</p>', 'The marketing description will go here. It will outline the \'Be The Investor\' module.', 500, 70, '2025-05-21 14:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `referralusage`
--

CREATE TABLE `referralusage` (
  `id` int(11) NOT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `referred_by` enum('Admin','Company') NOT NULL,
  `referred_by_id` int(11) NOT NULL DEFAULT 0,
  `used_by_company_id` int(11) NOT NULL DEFAULT 0,
  `registered_on` date NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roundrecord`
--

CREATE TABLE `roundrecord` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `updated_by_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_role` enum('owner','signatory') DEFAULT NULL,
  `round_type` enum('Round 0','Investment') DEFAULT NULL,
  `nameOfRound` varchar(255) DEFAULT NULL,
  `shareClassType` text DEFAULT NULL,
  `shareclassother` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `instrumentType` text DEFAULT NULL,
  `instrument_type_data` text DEFAULT NULL,
  `customInstrument` varchar(255) DEFAULT NULL,
  `roundsize` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `issuedshares` varchar(255) DEFAULT NULL,
  `rights` text DEFAULT NULL,
  `liquidationpreferences` text DEFAULT NULL,
  `liquidation` text DEFAULT NULL,
  `liquidationOther` text DEFAULT NULL,
  `convertible` varchar(255) DEFAULT NULL,
  `convertibleType` varchar(255) DEFAULT NULL,
  `voting` varchar(255) DEFAULT NULL,
  `termsheetFile` text DEFAULT NULL,
  `subscriptiondocument` text DEFAULT NULL,
  `generalnotes` text DEFAULT NULL,
  `dateroundclosed` varchar(255) DEFAULT NULL,
  `roundStatus` varchar(255) DEFAULT NULL,
  `is_shared` enum('No','Yes') NOT NULL,
  `is_locked` enum('No','Yes') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `founder_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`founder_data`)),
  `total_founder_shares` int(11) DEFAULT NULL,
  `founder_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roundrecord`
--

INSERT INTO `roundrecord` (`id`, `company_id`, `created_by_id`, `created_by_role`, `updated_by_id`, `updated_by_role`, `round_type`, `nameOfRound`, `shareClassType`, `shareclassother`, `description`, `instrumentType`, `instrument_type_data`, `customInstrument`, `roundsize`, `currency`, `issuedshares`, `rights`, `liquidationpreferences`, `liquidation`, `liquidationOther`, `convertible`, `convertibleType`, `voting`, `termsheetFile`, `subscriptiondocument`, `generalnotes`, `dateroundclosed`, `roundStatus`, `is_shared`, `is_locked`, `created_at`, `founder_data`, `total_founder_shares`, `founder_count`) VALUES
(1, 2, 2, 'signatory', 2, 'signatory', 'Round 0', 'Founding Share Allocation', 'Common Shares', '', 'aaa', '', '{}', '', '', 'CAD $', '1100', 'sa', '', '', '', '', '', 'Yes', '[]', '[]', 'asd', NULL, '', 'No', 'No', '2025-11-06 09:59:29', '{\"founders\":[{\"shares\":\"500\",\"shareType\":\"common\",\"voting\":\"voting\"},{\"shares\":\"300\",\"shareType\":\"common\",\"voting\":\"voting\"},{\"shares\":\"300\",\"shareType\":\"common\",\"voting\":\"voting\"}],\"totalShares\":1100,\"totalValue\":\"11.00\",\"pricePerShare\":\"0.01\",\"ownershipBreakdown\":[{\"founder\":\"Founder 1\",\"percentage\":\"45.5\"},{\"founder\":\"Founder 2\",\"percentage\":\"27.3\"},{\"founder\":\"Founder 3\",\"percentage\":\"27.3\"}]}', 1100, 3),
(2, 2, 2, 'signatory', 2, 'signatory', 'Investment', 'Founding Share Allocation', 'Seed', '', 'test', 'Safe', '{\"valuationCap\":\"2000\",\"discountRate\":\"10\",\"safeType\":\"PRE_MONEY\"}', '', '2000.00', 'CAD $', '258.00', 'out dividend preferences, conversion rights, protective provisions', 's', '2x Investor Multiple Preference,Capped Participating', '', 'No', '', 'No', '[\"1762403617163-141705869.docx\"]', '[\"1762403617164-580559449.docx\"]', 'sdf', NULL, 'ACTIVE', 'No', 'No', '2025-11-06 10:03:37', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `session_link_shared`
--

CREATE TABLE `session_link_shared` (
  `id` int(11) NOT NULL,
  `broadcastesession_id` int(11) NOT NULL DEFAULT 0,
  `company_id` text DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shared_discount_code`
--

CREATE TABLE `shared_discount_code` (
  `id` int(11) NOT NULL,
  `shared_by` enum('Admin','Company') DEFAULT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `shared_id` int(11) NOT NULL DEFAULT 0,
  `discount_code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shared_discount_code`
--

INSERT INTO `shared_discount_code` (`id`, `shared_by`, `company_id`, `shared_id`, `discount_code`, `email`, `created_at`) VALUES
(2, 'Admin', 2, 2, 'SNNNMT', 'avinayquicktech+011@gmail.com', '2025-10-03 12:32:40'),
(8, 'Admin', 3, 2, 'SNNNMT', NULL, '2025-10-17 10:14:47'),
(9, 'Admin', 6, 2, 'SNNNMT', NULL, '2025-10-17 10:14:47'),
(13, 'Admin', 1, 2, 'SNNNMT', 'avinayquicktech@gmail.com', '2025-10-18 11:49:02');

-- --------------------------------------------------------

--
-- Table structure for table `sharerecordround`
--

CREATE TABLE `sharerecordround` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `investor_id` int(11) DEFAULT 0,
  `roundrecord_id` int(11) NOT NULL DEFAULT 0,
  `sent_date` date DEFAULT NULL,
  `expired_at` date DEFAULT NULL,
  `date_view` date DEFAULT NULL,
  `access_status` enum('Not View','Only View','Download') NOT NULL,
  `termsheet_status` enum('Not Download','Download') NOT NULL,
  `subscription_status` enum('Not Download','Download') NOT NULL,
  `signature` longtext DEFAULT NULL,
  `signature_status` enum('No','Yes') NOT NULL,
  `report_status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `activity_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sharereport`
--

CREATE TABLE `sharereport` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `created_by_id` int(11) NOT NULL DEFAULT 0,
  `created_by_role` enum('owner','signatory') DEFAULT NULL,
  `investor_updates_id` int(11) NOT NULL DEFAULT 0,
  `unique_code` varchar(255) DEFAULT NULL,
  `investor_email` varchar(255) DEFAULT NULL,
  `investor_id` int(11) NOT NULL DEFAULT 0,
  `sent_date` date DEFAULT NULL,
  `expired_at` date DEFAULT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `date_view` datetime DEFAULT NULL,
  `access_status` enum('Not View','Only View','Download') NOT NULL,
  `investor_ip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sharereport`
--

INSERT INTO `sharereport` (`id`, `company_id`, `created_by_id`, `created_by_role`, `investor_updates_id`, `unique_code`, `investor_email`, `investor_id`, `sent_date`, `expired_at`, `report_type`, `date_view`, `access_status`, `investor_ip`) VALUES
(5, 2, 2, 'signatory', 8, '6d407b52dbd805dc248ee6466963dfec', 'avinayquicktech+05@gmail.com', 3, '2025-10-10', '2025-11-09', 'Investor updates', NULL, 'Not View', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptiondataroom`
--

CREATE TABLE `subscriptiondataroom` (
  `id` int(11) NOT NULL,
  `onetime_Fee` int(11) NOT NULL,
  `perInstance_Fee` int(11) NOT NULL,
  `investorAnnual_Fee` int(11) DEFAULT 0,
  `academy_Fee` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptiondataroom`
--

INSERT INTO `subscriptiondataroom` (`id`, `onetime_Fee`, `perInstance_Fee`, `investorAnnual_Fee`, `academy_Fee`) VALUES
(1, 260, 100, 0, 1200);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_lockfile`
--

CREATE TABLE `subscription_lockfile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `clientSecret` text DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `module` varchar(255) NOT NULL,
  `period` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_statuslockfile`
--

CREATE TABLE `subscription_statuslockfile` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `upcomingmoduleemail`
--

CREATE TABLE `upcomingmoduleemail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `zoommeeting_id` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `used_referral_code`
--

CREATE TABLE `used_referral_code` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `discount_code_id` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discounts` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `table_type` varchar(255) DEFAULT NULL,
  `table_id` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `used_referral_code`
--

INSERT INTO `used_referral_code` (`id`, `company_id`, `discount_code_id`, `discount_code`, `discounts`, `payment_type`, `table_type`, `table_id`, `created_at`) VALUES
(1, 2, '2', 'SNNNMT', '100', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 7, '2025-10-22 14:18:49'),
(2, 2, '2', 'SNNNMT', '11', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 8, '2025-10-22 14:20:45'),
(3, 2, '2', 'SNNNMT', '11', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 9, '2025-10-22 14:22:40'),
(4, 2, '2', 'SNNNMT', '11', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 10, '2025-10-22 14:33:12'),
(5, 2, '2', 'SNNNMT', '11', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 11, '2025-10-22 14:35:51'),
(6, 2, '2', 'SNNNMT', '11', 'Dataroom_Plus_Investor_Report', 'usersubscriptiondataroomone_time', 12, '2025-10-22 14:38:48');

-- --------------------------------------------------------

--
-- Table structure for table `userdocuments`
--

CREATE TABLE `userdocuments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `sub_category_id` int(11) NOT NULL DEFAULT 0,
  `file_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userinvestorreporting_subscription`
--

CREATE TABLE `userinvestorreporting_subscription` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `clientSecret` text DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `viewpassword` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `activate_account_code` varchar(255) DEFAULT NULL,
  `status` enum('Inactive','Active') DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `viewpassword`, `phone_number`, `activate_account_code`, `status`, `created_at`) VALUES
(1, 'Avinay', 'Kumar', 'avinayquicktech@gmail.com', '$2b$12$V0wIjlCxxSyBLTWerpVbSe75pkP0l66PRp6seHj4iK75IO2Q.zPgC', 'Test@123', '+1 480 555 5555', '45b0330b687c2bfa9c96d1eb313f4db84239a91d', 'Active', '2025-09-22'),
(3, 's', 's', 'test1@gmail.com', '$2b$12$VtWj5K.FNSZ4MKOaK9PKHeIPeax8aj96aB5JZn/yDZE5f83L1y8Xe', 'Abcd@123', '+14805555555', '8abede78816432d0544af657cba5bd6e1247abaa', 'Active', '2025-10-09');

-- --------------------------------------------------------

--
-- Table structure for table `usersubscriptiondataroomone_time`
--

CREATE TABLE `usersubscriptiondataroomone_time` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `unique_code` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `price` int(11) DEFAULT NULL,
  `clientSecret` text DEFAULT NULL,
  `payid` text DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersubscriptiondataroomone_time`
--

INSERT INTO `usersubscriptiondataroomone_time` (`id`, `company_id`, `unique_code`, `status`, `price`, `clientSecret`, `payid`, `payment_status`, `start_date`, `end_date`, `created_at`) VALUES
(1, 2, 'g0hmjM', 'Inactive', 260, 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOW1pMmdvamUiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNjg0MSwiZXhwIjoxNzYxMTMwNDQxfQ.75oY-t8sG6AogMs7_TGlJO7aNTIhiGo8g89brLVVDQ0', 'int_hkdmhzj44hc9mi2goje', 'succeeded', '2025-10-22', '2026-10-22', '2025-10-22'),
(2, 1, NULL, 'Active', 260, 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1zMng3bWhjYm8yc2F0YmYiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTI4Njk5OSwiZXhwIjoxNzYxMjkwNTk5fQ.gfxRWzuArtwqaKI25QU2u9IWJNFyKLywulHYjOA9TYI', 'int_hkdms2x7mhcbo2satbf', 'succeeded', '2025-10-24', '2026-10-24', '2025-10-24');

-- --------------------------------------------------------

--
-- Table structure for table `usersubscriptiondataroom_perinstance`
--

CREATE TABLE `usersubscriptiondataroom_perinstance` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `usersubscriptiondataroomone_time_id` int(11) NOT NULL DEFAULT 0,
  `clientSecret` text DEFAULT NULL,
  `payid` text DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `payment_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersubscriptiondataroom_perinstance`
--

INSERT INTO `usersubscriptiondataroom_perinstance` (`id`, `company_id`, `usersubscriptiondataroomone_time_id`, `clientSecret`, `payid`, `price`, `created_at`, `payment_status`) VALUES
(1, 2, 1, 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYzYxNzJmYzMtN2EzMS00Mjc5LWE3ZDYtYmI3MGU4MmU5YTIxIiwiaW50ZW50X2lkIjoiaW50X2hrZG1oemo0NGhjOW1sOWFodDAiLCJidXNpbmVzc19uYW1lIjoiQmx1ZVByaW50IENhdGFseXN0IERlbW8iLCJ0eXBlIjoiY2xpZW50LXNlY3JldCIsInBhZGMiOiJISyIsImlhdCI6MTc2MTEyNzAzNCwiZXhwIjoxNzYxMTMwNjM0fQ.ChBl79eWp3QTy1KUtirGDg10BjNOMYzy3TGx4dkszWs', 'int_hkdmhzj44hc9ml9aht0', 100, '2025-10-22', 'succeeded');

-- --------------------------------------------------------

--
-- Table structure for table `usersubscriptiondata_academy`
--

CREATE TABLE `usersubscriptiondata_academy` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `unique_code` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `price` int(11) DEFAULT NULL,
  `clientSecret` text DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_subscription`
--

CREATE TABLE `users_subscription` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 0,
  `module_id` int(11) DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `cardnumber` varchar(255) DEFAULT NULL,
  `expiry` varchar(255) DEFAULT NULL,
  `cvv` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uservideolimit`
--

CREATE TABLE `uservideolimit` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `video_id` int(11) DEFAULT 0,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videomanagement`
--

CREATE TABLE `videomanagement` (
  `id` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `max_limit` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zoommeeting`
--

CREATE TABLE `zoommeeting` (
  `id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL DEFAULT 0,
  `unique_code` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `topic` text DEFAULT NULL,
  `zoom_link` text DEFAULT NULL,
  `meeting_id` varchar(255) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL,
  `meeting_date` date DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `meeting_date_time` datetime DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zoommeeting_register`
--

CREATE TABLE `zoommeeting_register` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `registered_meeting_ids` text DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `reminder_48_sent` tinyint(4) DEFAULT 0,
  `reminder_24_sent` tinyint(4) DEFAULT 0,
  `reminder_1_sent` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_logs_company_round`
--
ALTER TABLE `access_logs_company_round`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `access_logs_investor`
--
ALTER TABLE `access_logs_investor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `access_logs_sigantory_last_login`
--
ALTER TABLE `access_logs_sigantory_last_login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_signatory_company` (`signatory_email`,`company_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authorized_signature`
--
ALTER TABLE `authorized_signature`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_company_signatory` (`company_signatories_id`,`company_id`);

--
-- Indexes for table `broadcastesession`
--
ALTER TABLE `broadcastesession`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_exchanges_data`
--
ALTER TABLE `company_exchanges_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_exchange_world_details`
--
ALTER TABLE `company_exchange_world_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_investor`
--
ALTER TABLE `company_investor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_legal_information`
--
ALTER TABLE `company_legal_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_logo`
--
ALTER TABLE `company_logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_shares_investment`
--
ALTER TABLE `company_shares_investment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_signatories`
--
ALTER TABLE `company_signatories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country_symbol`
--
ALTER TABLE `country_symbol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomai_executive_summary`
--
ALTER TABLE `dataroomai_executive_summary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomai_response`
--
ALTER TABLE `dataroomai_response`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomai_summary`
--
ALTER TABLE `dataroomai_summary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomai_summary_files`
--
ALTER TABLE `dataroomai_summary_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomai_summary_subcategory`
--
ALTER TABLE `dataroomai_summary_subcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomcategories`
--
ALTER TABLE `dataroomcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomdocuments`
--
ALTER TABLE `dataroomdocuments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroomsub_categories`
--
ALTER TABLE `dataroomsub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataroom_generatedocument`
--
ALTER TABLE `dataroom_generatedocument`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount_code`
--
ALTER TABLE `discount_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`type`);

--
-- Indexes for table `entrepreneurs`
--
ALTER TABLE `entrepreneurs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investorrequest_company`
--
ALTER TABLE `investorrequest_company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_information`
--
ALTER TABLE `investor_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_updates`
--
ALTER TABLE `investor_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referralusage`
--
ALTER TABLE `referralusage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roundrecord`
--
ALTER TABLE `roundrecord`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session_link_shared`
--
ALTER TABLE `session_link_shared`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_discount_code`
--
ALTER TABLE `shared_discount_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sharerecordround`
--
ALTER TABLE `sharerecordround`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sharereport`
--
ALTER TABLE `sharereport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptiondataroom`
--
ALTER TABLE `subscriptiondataroom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_lockfile`
--
ALTER TABLE `subscription_lockfile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_statuslockfile`
--
ALTER TABLE `subscription_statuslockfile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upcomingmoduleemail`
--
ALTER TABLE `upcomingmoduleemail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `used_referral_code`
--
ALTER TABLE `used_referral_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdocuments`
--
ALTER TABLE `userdocuments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinvestorreporting_subscription`
--
ALTER TABLE `userinvestorreporting_subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersubscriptiondataroomone_time`
--
ALTER TABLE `usersubscriptiondataroomone_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersubscriptiondataroom_perinstance`
--
ALTER TABLE `usersubscriptiondataroom_perinstance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersubscriptiondata_academy`
--
ALTER TABLE `usersubscriptiondata_academy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_subscription`
--
ALTER TABLE `users_subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uservideolimit`
--
ALTER TABLE `uservideolimit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videomanagement`
--
ALTER TABLE `videomanagement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zoommeeting`
--
ALTER TABLE `zoommeeting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zoommeeting_register`
--
ALTER TABLE `zoommeeting_register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_logs_company_round`
--
ALTER TABLE `access_logs_company_round`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `access_logs_investor`
--
ALTER TABLE `access_logs_investor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `access_logs_sigantory_last_login`
--
ALTER TABLE `access_logs_sigantory_last_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `authorized_signature`
--
ALTER TABLE `authorized_signature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `broadcastesession`
--
ALTER TABLE `broadcastesession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `company_exchanges_data`
--
ALTER TABLE `company_exchanges_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_exchange_world_details`
--
ALTER TABLE `company_exchange_world_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `company_investor`
--
ALTER TABLE `company_investor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company_legal_information`
--
ALTER TABLE `company_legal_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_logo`
--
ALTER TABLE `company_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `company_shares_investment`
--
ALTER TABLE `company_shares_investment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `company_signatories`
--
ALTER TABLE `company_signatories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- AUTO_INCREMENT for table `country_symbol`
--
ALTER TABLE `country_symbol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT for table `dataroomai_executive_summary`
--
ALTER TABLE `dataroomai_executive_summary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dataroomai_response`
--
ALTER TABLE `dataroomai_response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `dataroomai_summary`
--
ALTER TABLE `dataroomai_summary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dataroomai_summary_files`
--
ALTER TABLE `dataroomai_summary_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dataroomai_summary_subcategory`
--
ALTER TABLE `dataroomai_summary_subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dataroomcategories`
--
ALTER TABLE `dataroomcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `dataroomdocuments`
--
ALTER TABLE `dataroomdocuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dataroomsub_categories`
--
ALTER TABLE `dataroomsub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `dataroom_generatedocument`
--
ALTER TABLE `dataroom_generatedocument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `discount_code`
--
ALTER TABLE `discount_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `entrepreneurs`
--
ALTER TABLE `entrepreneurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `investorrequest_company`
--
ALTER TABLE `investorrequest_company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `investor_information`
--
ALTER TABLE `investor_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `investor_updates`
--
ALTER TABLE `investor_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `referralusage`
--
ALTER TABLE `referralusage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roundrecord`
--
ALTER TABLE `roundrecord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `session_link_shared`
--
ALTER TABLE `session_link_shared`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shared_discount_code`
--
ALTER TABLE `shared_discount_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sharerecordround`
--
ALTER TABLE `sharerecordround`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sharereport`
--
ALTER TABLE `sharereport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subscriptiondataroom`
--
ALTER TABLE `subscriptiondataroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscription_lockfile`
--
ALTER TABLE `subscription_lockfile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_statuslockfile`
--
ALTER TABLE `subscription_statuslockfile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `upcomingmoduleemail`
--
ALTER TABLE `upcomingmoduleemail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `used_referral_code`
--
ALTER TABLE `used_referral_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `userdocuments`
--
ALTER TABLE `userdocuments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userinvestorreporting_subscription`
--
ALTER TABLE `userinvestorreporting_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usersubscriptiondataroomone_time`
--
ALTER TABLE `usersubscriptiondataroomone_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usersubscriptiondataroom_perinstance`
--
ALTER TABLE `usersubscriptiondataroom_perinstance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usersubscriptiondata_academy`
--
ALTER TABLE `usersubscriptiondata_academy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_subscription`
--
ALTER TABLE `users_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uservideolimit`
--
ALTER TABLE `uservideolimit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videomanagement`
--
ALTER TABLE `videomanagement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zoommeeting`
--
ALTER TABLE `zoommeeting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zoommeeting_register`
--
ALTER TABLE `zoommeeting_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
