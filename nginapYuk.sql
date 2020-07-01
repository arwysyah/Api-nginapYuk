-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 01, 2020 at 08:23 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nginapYuk`
--

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `id_room` varchar(80) NOT NULL,
  `id_owner` varchar(80) NOT NULL,
  `hotel_name` int(11) NOT NULL,
  `contact_number` varchar(14) DEFAULT NULL,
  `location` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `status` varchar(14) NOT NULL,
  `room_category` int(11) NOT NULL,
  `price` int(20) NOT NULL,
  `star` int(20) DEFAULT NULL,
  `created_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `id_owner` varchar(80) NOT NULL,
  `owner_Name` text NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `city` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `created_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `owner_image` varchar(80) NOT NULL,
  `status` varchar(12) NOT NULL,
  `deviceID` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id_owner`, `owner_Name`, `email`, `password`, `phoneNumber`, `city`, `latitude`, `longitude`, `created_At`, `owner_image`, `status`, `deviceID`) VALUES
('12313123123', 'kenzo', 'kenzoymc@gmail.com', '$2b$10$GSecljcTpzCDEnyjSHIiG.drObfnUMlB.l9GLoyN4hsEEaJ6/wfpS', '1234567', 'Medan', 23424232, 2312312, '2020-07-01 12:28:37', 'weerwer', 'aktif', 'jdsjjdasjsad\n'),
('123131231231', 'kenzo', 'kenzoymc3@gmail.com', '$2b$10$lZF/Iy700khKV6R/62XFNO0z0lSI.VXar/NYfHc2RzB9z0QyFbIXe', '1234567', 'Medan', 23424232, 2312312, '2020-07-01 12:33:15', 'weerwer', 'aktif', 'jdsjjdasjsad\n');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` varchar(80) NOT NULL,
  `id_hotel` varchar(80) NOT NULL,
  `id_room` varchar(80) NOT NULL,
  `id_owner` varchar(80) NOT NULL,
  `id_user` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `day_start` varchar(80) NOT NULL,
  `day_end` varchar(80) NOT NULL,
  `transaction_date` varchar(80) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id_transaction`, `id_hotel`, `id_room`, `id_owner`, `id_user`, `price`, `totalPrice`, `day_start`, `day_end`, `transaction_date`, `status`) VALUES
('ea790812-1bb8-47fe-b7f7-fa053b72038b', '8979a6fc-e666-463f-bad3-7f8ecf51a72d', '53af1a29-bf35-4834-a81b-6f3a45948e2d', '1234567', 'kenzo', 50000, 929928, '20-03-1997', '20-03-1998', '2020-07-01 23:54:14.726', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(80) NOT NULL,
  `email` text NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phoneNumber` varchar(15) NOT NULL,
  `city` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `user_image` varchar(80) NOT NULL,
  `deviceID` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `username`, `password`, `created_at`, `phoneNumber`, `city`, `latitude`, `longitude`, `user_image`, `deviceID`) VALUES
('ggasgdfasfdywqgweqtqwtetqwt-qwhehwheqw', 'kenzoymc5@gmail.com', 'kenzo', '$2b$10$RzXx9CmzEqRupijhluSPFuz0KEcRWa/.btefVA3xI6f7rDweTjPR.', '2020-07-01 11:53:13', '1234567', 'jakarta Selatan', 2313212, 2312312, 'jdkasjdkasdjaskdjasdas', '1231');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id_owner`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
