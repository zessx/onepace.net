use `onepace`;
INSERT INTO `sagas` (`id`, `title`, `chapters`, `episodes`) VALUES
	(0, 'Baroque Works', '101-217', '62-130'),
	(1, 'East Blue', '1-100', '1-61');
INSERT INTO `arcs` (`id`, `title`, `chapters`, `episodes`, `nyaa_id`, `torrent_hash`, `resolution`, `completed`, `hidden`, `released`) VALUES
	(1, 'Impel Down', '525-548', '', NULL, 'c9743cf73e28a3e641335eade0ab9538e1c8bb1b', '720p', 1, 0, 1),
	(2, 'Zou', '801-822', '', NULL, '5c027631a28242814a6cf1fe24f455b70bca14bc', '720p', 1, 0, 1),
	(3, 'Dressrosa', '700-800', '', NULL, 'a031cac6baf81b804c4d034dfaef0e5e4a671145', '720p', 1, 0, 1),
	(4, 'Punk Hazard', '654-699', '', NULL, 'bcdff039cd7c01f2ffb78799b4082d91de25b2fb', '720p', 1, 0, 1),
	(5, 'Fishman Island', '603-653', '', NULL, 'fd204b5dc346f5458f7f04cf1ad98679aaf9586e', '720p', 1, 0, 1),
	(6, 'Romance Dawn', '1-7', '', NULL, 'bd581661e820488ffe5d459e76a9aba5f2b916e5', '480p', 1, 0, 1),
	(7, 'Orange Town', '8-21', '', NULL, '86d48b2b70e70e269ed7c9df78a8ed250584e53e', '480p', 1, 0, 1),
	(8, 'Loguetown', '96-100', '', NULL, 'aafb53e0c8a1264d7265f98ace92c007b13aa3bd', '480p', 1, 0, 1),
	(9, 'Reverse Mountain', '101-105', '', NULL, '1256a6742698eb00d1b9b94b268bbb34f0dc9f56', '480p', 1, 0, 1),
	(10, 'Long Ring Long Land', '304-321', '', NULL, '4f2b72009c25ec6c534a852ddfc3fd85ed10fdf5', '720p', 1, 0, 1),
	(11, 'Post-Enies Lobby', '431-441', '', NULL, '59497fc3d9a6dbcdbaced48eaa9f5ba2047614df', '720p', 1, 0, 1),
	(12, 'Thriller Bark', '442-489', '', NULL, 'cca27737d4340787c7b25d50df0f42ab2d9ab939', '720p', 1, 0, 1),
	(13, 'Sabaody Archipelago', '490-513', '', NULL, '2589926c8f90e8f031a6caeab93bcd5b79990c0e', '720p', 1, 0, 1),
	(14, 'Amazon Lily', '514-524', '', '801781', '1f62e2583956c412f8550672bc8066c5e96ab0a8', '720p', 1, 0, 1),
	(16, 'Return to Sabaody', '598-602', '', NULL, 'cfe12c7a0bc9f91aa1c2fe436955c1f5b1e16909', '720p', 1, 0, 1),
	(17, 'Skypiea', '237-303', '', NULL, '2140e49be7a2cef9bcb9109c1d797e17e7e2ff2b', '480p', 0, 0, 1),
	(18, 'Syrup Village', '23-41', '', NULL, '6c29dedaa9bef46c73a04ebe2c8c9761b92cb9eb', '480p', 1, 0, 1),
	(19, 'Whole Cake Island', '823-902', '', NULL, '', '720p', 0, 0, 1),
	(21, 'Specials', '', '', NULL, '', '', 1, 0, 1),
	(40, 'Enies Lobby', '375-430', '', NULL, '', '720p', 0, 0, 1),
	(41, 'Whiskey Peak', '106-114', '', NULL, 'd5af21f3f6ab66d20dda4b131b5eeb0e17a23b7a', '480p', 1, 0, 1),
	(42, 'Marineford', '549-580', '', NULL, '', '720p', 0, 0, 1),
	(43, 'Alabasta', '155-217', '', NULL, '', '480p', 0, 0, 0),
	(44, 'Water 7', '322-374', '', NULL, '', '720p', 0, 0, 0),
	(45, 'Post-War', '581-597', '', NULL, '', '720p', 0, 0, 0),
	(46, 'Baratie', '42-68', '', NULL, '', '480p', 0, 0, 0),
	(47, 'Arlong Park', '69-95', '', NULL, '', '480p', 0, 0, 0),
	(48, 'Jaya', '218-236', '', NULL, '', '480p', 0, 0, 0);
INSERT INTO `episodes` (`id`, `crc32`, `arc_id`, `resolution`, `chapters`, `episodes`, `torrent_hash`, `released_date`, `title`, `status`, `part`) VALUES
	(1, '021A8886', 4, '720p', '698-699', '624-626, 628', '', '2013-03-01 00:00:00', '', '', 22),
	(2, '04186119', 3, '720p', '754-755', '691-693', '9191339751bd5b5188f02471160e70eb41ec16f5', '2017-12-01 00:00:00', '', '', 28),
	(3, '0429451F', 3, '720p', '774-775', '', '6c99fbcb1c59f6c8792a1ff990398ab1a9441285', '2017-03-12 03:22:00', '', '', 38),
	(4, '04C7B716', 5, '720p', '627-629', '', '', '2013-03-01 00:00:00', '', '', 13),
	(5, '05BE81E6', 21, '720p', '236-262', '', '2cbbeef2c6c5597ef09c8659ee8d541e6d2be371', '2013-08-01 00:00:00', 'Wapol\'s Omnivorous Hurrah', '', NULL),
	(6, '066FD68B', 13, '720p', '490-491', '385-386', '', '2017-12-01 00:00:00', '', '', 1),
	(7, '06BF070D', 14, '720p', '514-515', '408-409', '', '2017-12-01 00:00:00', '', '', 1),
	(8, '0880B38F', 2, '720p', '818-819', '769-772', 'bbfd3354a2eb1f2d820025cab358e29254adb764', '2017-01-27 21:44:00', 'Momonosuke, Heir of the Kozuki Family', '', 9),
	(9, '099FB95D', 12, '720p', '480-482', '373-374', '', '2017-12-01 00:00:00', '', '', 19),
	(10, '0A2624D5', 4, '720p', '687-688', '613-614', '', '2013-03-01 00:00:00', '', '', 17),
	(11, '0CA47011', 3, '720p', '766-767', '', 'd11be2626940b7cfa2cbb99ecbf7946825da9849', '2016-12-02 09:40:00', '', '', 34),
	(12, '0CB32BF6', 6, '480p', '2', 'Episode of Luffy, 2', 'f5d5229f2ba960b829df92d7723f9143d0dd7dab', '2017-12-01 00:00:00', '', '', 2),
	(13, '0CBF5258', 4, '720p', '696-697', '622-623', '', '2013-03-01 00:00:00', '', '', 21),
	(14, '0E0C5A82', 13, '720p', '507-508', '400-401', '', '2017-12-01 00:00:00', '', '', 9),
	(15, '0F8517DC', 14, '720p', '523-524', '417-421', '', '2017-12-01 00:00:00', '', '', 5),
	(16, '11DA7BCB', 3, '720p', '746-747', '681-683', '', '2017-12-01 00:00:00', '', '', 24),
	(18, '1306F53D', 13, '720p', '512-513', '404-405', '', '2017-12-01 00:00:00', '', '', 11),
	(19, '15344804', 3, '720p', '791-793', '', 'c97c68ec836629c9eed1755d004988e1fbb58189', '2017-06-10 08:45:00', '', '', 45),
	(20, '174F92DD', 3, '720p', '732-733', '664-665', '', '2017-12-01 00:00:00', '', '', 17),
	(22, '19D3B6A3', 12, '720p', '459-460', '353-355', '', '2017-12-01 00:00:00', '', '', 9),
	(23, '1A833587', 17, '480p', '239-240', '154', '', '2017-12-01 00:00:00', '', '', 2),
	(24, '1B5DC33C', 3, '720p', '768-769', '', '97e5b5d476a58bdd78e9526e83599f989a6f06cb', '2016-12-17 23:49:00', '', '', 35),
	(25, '1CADC5DC', 3, '720p', '748-749', '683-686', '', '2017-12-01 00:00:00', '', '', 25),
	(26, '1E847368', 12, '720p', '455-456', '349-350', '', '2017-12-01 00:00:00', '', '', 7),
	(27, '20ADEE90', 13, '720p', '509-511', '402-404', '', '2017-12-01 00:00:00', '', '', 10),
	(28, '216595EE', 11, '720p', '431-432', '313-314', '', '2017-12-01 00:00:00', '', '', 1),
	(29, '2295F0A1', 12, '720p', '477-479', '371-372', '', '2017-12-01 00:00:00', '', '', 18),
	(30, '22E58F96', 12, '720p', '486-487', '378-380', '', '2017-12-01 00:00:00', '', '', 21),
	(31, '234CBFDC', 13, '720p', '501-502', '395-396', '', '2017-12-01 00:00:00', '', '', 6),
	(32, '24351CC0', 10, '720p', '310-312', '211-212', '', '2017-12-01 00:00:00', '', '', 3),
	(33, '29A10280', 5, '720p', '614-615', '', '', '2013-03-01 00:00:00', '', '', 7),
	(34, '2A35B710', 3, '720p', '700-701', '628-631', '', '2017-12-01 00:00:00', '', '', 1),
	(36, '2C30BB7A', 6, '480p', '3-4', '2', 'f0be9c55c8fe1e7990cee1a7db60f2b23e970755', '2017-12-01 00:00:00', '', '', 3),
	(37, '2C843A0F', 11, '720p', '436-437', '321-322', '', '2017-12-01 00:00:00', '', '', 3),
	(38, '30D0916C', 12, '720p', '442-443', '326, 337-339', '', '2017-12-01 00:00:00', '', '', 1),
	(39, '31682943', 4, '720p', '679-680', '604-606', '', '2013-03-01 00:00:00', '', '', 13),
	(40, '32150FF4', 2, '720p', '804-805', '753-754', '3fdd7b9829ed63ad0e035fde57555b73051f7bab', '2017-12-01 00:00:00', 'The Mink Tribe', '', 2),
	(41, '344EA844', 11, '720p', '433-435', '315-316, 319-320, 325', '', '2017-12-01 00:00:00', '', '', 2),
	(42, '35A189E2', 5, '720p', '630-631', '', '', '2013-03-01 00:00:00', '', '', 14),
	(43, '38BBF05C', 12, '720p', '461-462', '356-357', '', '2017-12-01 00:00:00', '', '', 10),
	(44, '38C7B3F3', 1, '720p', '532-533', '433-435', '1304facb679a379c55162128438a14f01332b42c', '2017-12-01 00:00:00', '', '', 4),
	(45, '398915C6', 4, '720p', '675-676', '601-602', '', '2013-03-01 00:00:00', '', '', 11),
	(46, '3AEE90B8', 12, '720p', '467-468', '362-363', '', '2017-12-01 00:00:00', '', '', 13),
	(47, '3D7957D8', 7, '480p', '11-16', '6-7', '', '2017-12-01 00:00:00', '', '', 2),
	(48, '3E9F11F9', 3, '720p', '782-783', '', '3a975b66728ec2e3a960601cf3367dab59f583c3', '2017-04-27 01:07:00', '', '', 41),
	(49, '415455AE', 21, '720p', '', '', 'ddbca2961dab0ad1e2a1d362ca7e03f7db3c7484', '2013-08-01 00:00:00', 'Straw Hat Theatre', '', NULL),
	(50, 'FD399699', 18, '480p', '31-34', '13-14', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-12-01 00:00:00', '', '', 4),
	(51, '43A88918', 9, '480p', '101-103', '55, 61-62', '', '2017-12-01 00:00:00', '', '', 1),
	(52, '4A52B138', 2, '720p', '820-822', '772-774, 776', '750129892ce38e644b7e4a9f0b9af82949f67581', '2017-03-03 23:23:00', 'Understood', '', 10),
	(53, '4CD92CFC', 4, '720p', '685-686', '611-612', '', '2013-03-01 00:00:00', '', '', 16),
	(54, '4D166AAD', 8, '480p', '98-100', '51-53', '', '2017-12-01 00:00:00', '', '', 2),
	(55, '4DDF4C07', 3, '720p', '788-790', '', '6c0b23fe28f52e494e091dcd46bf7d775be4841d', '2017-05-28 17:34:00', '', '', 44),
	(56, '4F16C5DC', 3, '720p', '758-759', '694, 696-698', 'ac10baaa3fe0336b2c8e578904162e2ecf1e1838', '2017-12-01 00:00:00', '', '', 30),
	(57, '5012E091', 4, '720p', '693-695', '619-621', '', '2013-03-01 00:00:00', '', '', 20),
	(58, '50143351', 3, '720p', '718-719', '648-649', '', '2017-12-01 00:00:00', '', '', 10),
	(59, '51873DC4', 19, '720p', '823-824', '777-779, 783', 'e52639097843201a457bba3f72e6e55af94274aa', '2017-09-01 00:00:00', 'A World Abuzz', '', 1),
	(60, '53AEB13C', 3, '720p', '764-765', '703-704', '451260ac5a3846d6223542b786783457ba94ff1c', '2016-11-05 03:45:00', '', '', 33),
	(61, '540A9642', 1, '720p', '547-548', '450-451', '', '2017-12-01 00:00:00', '', '', 10),
	(62, '54AC1705', 4, '720p', '691-692', '617-618', '', '2013-03-01 00:00:00', '', '', 19),
	(63, '55292D1C', 3, '720p', '784-785', '', 'ee060d66952b028e8126386f3007c030abf72491', '2017-05-13 09:35:00', '', '', 42),
	(65, '5636E014', 5, '720p', '607-608', '', '', '2013-03-01 00:00:00', '', '', 3),
	(66, '57F75027', 10, '720p', '307-309', '209-210', '', '2017-12-01 00:00:00', '', '', 2),
	(67, '5A38EC3B', 3, '720p', '744-745', '678-680', '', '2017-12-01 00:00:00', '', '', 23),
	(68, '5A3CE523', 4, '720p', '656-658', '580-583', '', '2013-03-01 00:00:00', '', '', 2),
	(69, '5B2AAFBF', 2, '720p', '816-817', '767-769', '3f6548281750c6efbaf802bf395b074ae899c3e4', '2016-12-25 07:24:00', 'Raizo of the Mist', '', 8),
	(70, '5B4DF29D', 12, '720p', '451-452', '345-346', '', '2017-12-01 00:00:00', '', '', 5),
	(71, '5FC46535', 3, '720p', '742-743', '675-678', '', '2017-12-01 00:00:00', '', '', 22),
	(72, '605DF591', 7, '480p', '8-11', '4-5', '', '2017-12-01 00:00:00', '', '', 1),
	(73, '60E33665', 12, '720p', '453-454', '347-348', '', '2017-12-01 00:00:00', '', '', 6),
	(74, '63A829E4', 13, '720p', '503-504', '397-398', '', '2017-12-01 00:00:00', '', '', 7),
	(75, '64FB3990', 5, '720p', '613-614', '', '', '2013-03-01 00:00:00', '', '', 6),
	(76, '658D36CE', 4, '720p', '669-670', '595-596', '', '2013-03-01 00:00:00', '', '', 8),
	(77, '659EF70C', 11, '720p', '438-439', '323-324', '', '2017-12-01 00:00:00', '', '', 4),
	(78, '65BD682D', 5, '720p', '650-651', '', '', '2013-03-01 00:00:00', '', '', 23),
	(79, '666061E3', 4, '720p', '661-662', '585-587', '', '2013-03-01 00:00:00', '', '', 4),
	(80, '683EDC5C', 1, '720p', '541-543', '443-446', '', '2017-12-01 00:00:00', '', '', 8),
	(81, '694AD702', 12, '720p', '457-458', '351-353', '', '2017-12-01 00:00:00', '', '', 8),
	(82, '6A3CE0EA', 3, '720p', '728-729', '660-661', '', '2017-12-01 00:00:00', '', '', 15),
	(83, '6AAC9B33', 12, '720p', '475-476', '370-371', '', '2017-12-01 00:00:00', '', '', 17),
	(84, '6E92672D', 6, '480p', '5-7', '2-3', 'f0be9c55c8fe1e7990cee1a7db60f2b23e970755', '2017-12-01 00:00:00', '', '', 4),
	(85, '7073A62F', 3, '720p', '730-731', '657, 662-663', '', '2017-12-01 00:00:00', '', '', 16),
	(86, '710A0767', 1, '720p', '537-538', '438-440', 'a36cfe8bbb44c219b112984914352d68ac7ab00c', '2017-12-01 00:00:00', '', '', 6),
	(87, '7149D13F', 2, '720p', '810-811', '759-762', 'b9543dac01c4235fd9bd87d97bae5dbe46a98699', '2016-11-16 02:19:00', 'The Curly Hat Pirates Arrive', '', 5),
	(88, '71CA89FC', 3, '720p', '750-751', '685-688', '54fd3e82ace45321a3be48c208bd7bb71c83eb85', '2017-12-01 00:00:00', '', '', 26),
	(89, '72C0B595', 10, '720p', '313-316', '212, 215, 217-218', '', '2017-12-01 00:00:00', '', '', 4),
	(90, '72E3E794', 4, '720p', '673-674', '599-600', '', '2013-03-01 00:00:00', '', '', 10),
	(91, '7306EDA1', 1, '720p', '527-528', '424-425, 430', '5b600861637c2387e27133f7b6f427b148210526', '2016-12-30 17:00:00', '', '', 2),
	(92, '7391ECD4', 3, '720p', '776-778', '', 'aa6acacf8cb82e10b496a223449d5417ec15c7a4', '2017-03-20 06:52:00', '', '', 39),
	(93, '74DABFB2', 17, '480p', '237-238', '153', '', '2017-12-01 00:00:00', '', '', 1),
	(94, '75CC1F6E', 4, '720p', '681-682', '607-608', '', '2013-03-01 00:00:00', '', '', 14),
	(95, '76B2C869', 21, '480p', '0', '', 'a53c0691afa6adcffe74623f27be23da835a06be', '2013-08-01 00:00:00', 'Strong World', '', NULL),
	(96, '76D21468', 13, '720p', '496-497', '390-391', '', '2017-12-01 00:00:00', '', '', 4),
	(97, '77081AEE', 3, '720p', '736-737', '668-670', '', '2017-12-01 00:00:00', '', '', 19),
	(98, '775B819E', 9, '480p', '104-105', '63', '', '2017-12-01 00:00:00', '', '', 2),
	(99, '777A9A6A', 3, '720p', '772-773', '', 'a7461c0ae3813c9250613ab2af771d82cc77e922', '2017-02-24 16:49:00', '', '', 37),
	(100, '777DE97C', 3, '720p', '714-715', '643-645', '', '2017-12-01 00:00:00', '', '', 8),
	(101, '7916E751', 8, '480p', '96-97', '45, 48-49', '', '2017-12-01 00:00:00', '', '', 1),
	(102, '7926F9B5', 5, '720p', '623-624', '', '', '2013-03-01 00:00:00', '', '', 11),
	(104, '7CAE5640', 12, '720p', '469-470', '364-365', '', '2017-12-01 00:00:00', '', '', 14),
	(105, '7D6E8499', 13, '720p', '498-500', '392-394', '', '2017-12-01 00:00:00', '', '', 5),
	(106, '7DBBFA18', 5, '720p', '647-649', '', '', '2013-03-01 00:00:00', '', '', 22),
	(107, '7F73DB45', 2, '720p', '812-813', '762-764', '0d11d07bc3c4a83d1f2f762d242f4ed22f0d1702', '2016-12-24 04:17:00', 'Tea Party Invitation', '', 6),
	(108, '800263CF', 7, '480p', '17-21', '7-8', '', '2017-12-01 00:00:00', '', '', 3),
	(109, '8014A332', 5, '720p', '632-633', '', '', '2013-03-01 00:00:00', '', '', 15),
	(110, '81C4666C', 3, '720p', '794-795', '', '0a48f0ee50f1dcc7204f947e765b98826479bbd5', '2017-06-28 06:25:00', '', '', 46),
	(111, '85AD9C81', 5, '720p', '643-646', '', '', '2013-03-01 00:00:00', '', '', 21),
	(112, '873CB57E', 13, '720p', '505-506', '399-400', '', '2017-12-01 00:00:00', '', '', 8),
	(113, '8B836836', 12, '720p', '465-466', '360-362', '', '2017-12-01 00:00:00', '', '', 12),
	(114, '90015E67', 4, '720p', '654-655', '574, 579', '', '2013-03-01 00:00:00', '', '', 1),
	(115, '90034ECC', 3, '720p', '704-705', '633-635', '', '2017-12-01 00:00:00', '', '', 3),
	(116, '94E2099D', 5, '720p', '642-645', '', '', '2013-03-01 00:00:00', '', '', 20),
	(117, '95B9BB28', 16, '720p', '598-600', '517-520', '', '2015-01-01 00:00:00', '', '', 1),
	(118, '99A61805', 5, '720p', '652-653', '', '', '2013-03-01 00:00:00', '', '', 24),
	(119, '9C3360D6', 3, '720p', '760-761', '699-700', 'f32a27ae18c7cbe759ee902ef456bcf61ba90e94', '2016-10-13 20:41:00', '', '', 31),
	(120, '9CE5B9DD', 4, '720p', '683-684', '609-610', '', '2013-03-01 00:00:00', '', '', 15),
	(121, '9E0A91E9', 5, '720p', '609-610', '', '', '2013-03-01 00:00:00', '', '', 4),
	(122, '9FA5B2C2', 17, '480p', '243-244', '157-158', '', '2017-12-01 00:00:00', '', '', 4),
	(123, '9FE150E1', 6, '480p', '1', 'Episode of Luffy, 504', '10f11fdf5289716d7814eaed23375803897f90f5', '2017-12-01 00:00:00', '', '', 1),
	(124, 'A4F76B13', 2, '720p', '808-809', '757-760', '25ab1062bc8ab11e852e00cbf0ea9ac7535b9d86', '2016-10-23 01:48:00', 'Duke Inuarashi and Master Nekomamushi', '', 4),
	(125, 'A5F0A507', 14, '720p', '520-522', '414-417', '', '2017-12-01 00:00:00', '', '', 4),
	(126, 'A65C20C2', 10, '720p', '319-321', '227-228', '', '2017-12-01 00:00:00', '', '', 6),
	(128, 'A95DE47B', 3, '720p', '708-709', '637-638', '', '2017-12-01 00:00:00', '', '', 5),
	(129, 'A9784E2B', 12, '720p', '471-472', '365-367', '', '2017-12-01 00:00:00', '', '', 15),
	(130, 'ACC7852E', 3, '720p', '756-757', '693-696', '64437c3c182c81dd3654a37a3960491ca3cf1acf', '2017-12-01 00:00:00', '', '', 29),
	(131, 'ACF1C889', 4, '720p', '663-664', '588-589', '', '2013-03-01 00:00:00', '', '', 5),
	(132, 'AD2D4BCD', 12, '720p', '483-485', '375-377', '', '2017-12-01 00:00:00', '', '', 20),
	(133, 'AD550761', 4, '720p', '671-672', '597-598', '', '2013-03-01 00:00:00', '', '', 9),
	(134, 'E70913D9', 2, '720p', '801-803', '746-747, 751-753', 'b07e60a2d116cb83102845e79a4dd8c3b401e371', '2016-12-01 00:00:00', 'Zou', '', 1),
	(135, 'B19F374A', 18, '480p', '23-25', '9-10', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-12-01 00:00:00', '', '', 1),
	(136, '02C2E211', 18, '480p', '26-27', '10-11', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-12-01 00:00:00', '', '', 2),
	(137, 'B692FD08', 10, '720p', '304-306', '207-209', '', '2017-12-01 00:00:00', '', '', 1),
	(138, 'B6BD1A60', 5, '720p', '638-639', '', '', '2013-03-01 00:00:00', '', '', 18),
	(139, 'C2C0A86A', 18, '480p', '28-30', '12-13', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-12-01 00:00:00', '', '', 3),
	(140, 'BCF2E97B', 10, '720p', '317-318', '219, 226', '', '2017-12-01 00:00:00', '', '', 5),
	(141, 'BD7169C3', 5, '720p', '605-606', '', '', '2013-03-01 00:00:00', '', '', 2),
	(142, 'BE72EB0E', 3, '720p', '738-739', '670-672', '', '2017-12-01 00:00:00', '', '', 20),
	(143, 'C113A160', 2, '720p', '814-815', '764-766', '17a9e0d21aa12d9bea83c13b1a7dafd102bc5f04', '2016-12-12 03:20:00', 'Let\'s Go See Master Nekomamushi', '', 7),
	(144, 'C19CADF5', 13, '720p', '494-495', '388-389', '', '2017-12-01 00:00:00', '', '', 3),
	(145, 'C19D5680', 5, '720p', '640-641', '', '', '2013-03-01 00:00:00', '', '', 19),
	(146, '479D510C', 1, '720p', '525-526', '422-423, 454', '', '2017-12-01 00:00:00', 'The Underwater Prison - Impel Down', '', 1),
	(147, 'C21EC74A', 3, '720p', '740-741', '672-675', '', '2017-12-01 00:00:00', '', '', 21),
	(148, 'C2835057', 14, '720p', '518-519', '412-413', '', '2017-12-01 00:00:00', '', '', 3),
	(149, 'C29E5C35', 3, '720p', '724-725', '655-657', '', '2017-12-01 00:00:00', '', '', 13),
	(150, 'C2AAAAF7', 12, '720p', '446-448', '340-343', '', '2017-12-01 00:00:00', '', '', 3),
	(151, 'C2C37921', 3, '720p', '716-717', '646-647', '', '2017-12-01 00:00:00', '', '', 9),
	(152, 'C9362978', 3, '720p', '734-735', '666-667', '', '2017-12-01 00:00:00', '', '', 18),
	(153, 'CAA32C42', 3, '720p', '786-787', '', '2bc0d062b265db0f1b6c1bc2efd4f425adfa7f98', '2017-05-20 18:50:00', '', '', 43),
	(155, 'CC88315A', 4, '720p', '665-666', '591-592', '', '2013-03-01 00:00:00', '', '', 6),
	(156, 'CCB84D29', 1, '720p', '539-540', '440-443', '', '2017-12-01 00:00:00', '', '', 7),
	(157, 'CD83F1E9', 4, '720p', '677-678', '603-604', '', '2013-03-01 00:00:00', '', '', 12),
	(158, 'CEF78887', 11, '720p', '440-441', '324-325', '', '2017-12-01 00:00:00', '', '', 5),
	(159, 'D0E24355', 16, '720p', '601-602', '521-522', '', '2015-01-01 00:00:00', '', '', 2),
	(161, 'D538CFD7', 12, '720p', '463-464', '357-359', '', '2017-12-01 00:00:00', '', '', 11),
	(162, 'D56597BC', 4, '720p', '689-690', '615-616', '', '2013-03-01 00:00:00', '', '', 18),
	(163, 'D8E8370A', 3, '720p', '720-721', '650-651', '', '2017-12-01 00:00:00', '', '', 11),
	(164, 'DA5B5D04', 5, '720p', '611-612', '', '', '2013-03-01 00:00:00', '', '', 5),
	(165, 'DBA50B89', 5, '720p', '616-618', '', '', '2013-03-01 00:00:00', '', '', 8),
	(166, 'DC6C3C54', 3, '720p', '752-753', '688-691', '28be64e82a8117858a61919f5a54ff1aca90bbcf', '2017-12-01 00:00:00', '', '', 27),
	(167, 'DF100DE6', 17, '480p', '241-242', '155-156', '', '2017-12-01 00:00:00', '', '', 3),
	(168, 'DF3A7006', 5, '720p', '634-635', '', '', '2013-03-01 00:00:00', '', '', 16),
	(169, 'E058DEF9', 3, '720p', '702-703', '631-633', '', '2017-12-01 00:00:00', '', '', 2),
	(170, 'E1F39FF7', 17, '480p', '245-246', '159-160', '', '2017-12-01 00:00:00', '', '', 5),
	(171, 'E3C90B8B', 3, '720p', '726-727', '648, 657-659', '', '2017-12-01 00:00:00', '', '', 14),
	(172, 'E4B077F8', 2, '720p', '806-807', '755-757', 'e8bdd7395fe771bea30c9820ffad9af54396bf73', '2016-10-13 00:24:00', 'At Rightflank Fortress', '', 3),
	(173, 'E817809A', 14, '720p', '516-517', '410-411', '', '2017-12-01 00:00:00', '', '', 2),
	(174, 'E98F852E', 3, '720p', '762-763', '701-702', '0d1ac4f4bff95fd6b5365316b04b89e623206d46', '2016-10-16 01:00:00', '', '', 32),
	(175, 'E98FA912', 3, '720p', '706-707', '634-637', '', '2017-12-01 00:00:00', '', '', 4),
	(176, 'EA100F0C', 12, '720p', '444-445', '339-340', '', '2017-12-01 00:00:00', '', '', 2),
	(177, 'EA320238', 1, '720p', '534-536', '', '', '2017-12-01 00:00:00', '', '', 5),
	(178, 'EACE397D', 3, '720p', '712-713', '640-643', '', '2017-12-01 00:00:00', '', '', 7),
	(179, 'EB0BC95C', 5, '720p', '636-637', '', '', '2013-03-01 00:00:00', '', '', 17),
	(180, 'EB4DA5F4', 12, '720p', '449-450', '342-344', '', '2017-12-01 00:00:00', '', '', 4),
	(181, 'ECA0E5A1', 1, '720p', '529-531', '425, 430-432', '3e4cb1160426200f31fd2ff35b47ce9794238123', '2017-12-01 00:00:00', '', '', 3),
	(182, 'ECD80B22', 3, '720p', '779-781', '', '189767cea597c380fd87c39c39f4854556dfd8ae', '2017-03-26 20:10:00', '', '', 40),
	(183, 'EDB72EE5', 21, '720p', '', '', 'ff9a1b7755108450a6768ee5daba5ae69e53ab3c', '2013-08-01 00:00:00', 'Whole Cake Island 01 (April Fools)', '', NULL),
	(184, 'EF1D7B5F', 12, '720p', '473-474', '368-369', '', '2017-12-01 00:00:00', '', '', 16),
	(185, 'F0334710', 13, '720p', '492-493', '387-388', '', '2017-12-01 00:00:00', '', '', 2),
	(186, 'F0B1F815', 4, '720p', '667-668', '593-594', '', '2013-03-01 00:00:00', '', '', 7),
	(187, 'F0C33425', 1, '720p', '544-546', '446-450', '', '2017-12-01 00:00:00', '', '', 9),
	(188, 'F134C10A', 5, '720p', '625-626', '', '', '2013-03-01 00:00:00', '', '', 12),
	(189, 'F20B5423', 3, '720p', '722-723', '652-654', '', '2017-12-01 00:00:00', '', '', 12),
	(190, 'F218F0E4', 3, '720p', '770-771', '', 'd65c8550d5375291625d52a697f5d3e46c26d720', '2017-01-14 19:57:00', '', '', 36),
	(191, 'F23079ED', 12, '720p', '488-489', '380-381', '', '2017-12-01 00:00:00', '', '', 22),
	(192, 'F4BB17EB', 5, '720p', '621-622', '', '', '2013-03-01 00:00:00', '', '', 10),
	(194, 'F7CB97CD', 3, '720p', '710-711', '639-642', '', '2017-12-01 00:00:00', '', '', 6),
	(195, 'FBA08093', 5, '720p', '603-604', '', '', '2013-03-01 00:00:00', '', '', 1),
	(196, 'FCF7F7E4', 5, '720p', '619-620', '', '', '2013-03-01 00:00:00', '', '', 9),
	(197, 'FE661F6E', 4, '720p', '659-660', '583-585', '', '2013-03-01 00:00:00', '', '', 3),
	(198, '837E2CA1', 19, '720p', '825-826', '783-785', 'd80248fe269d6a0c4fd9f57dc1c364e66b0ceb2b', '2017-12-01 00:00:00', '0 and 4', '', 2),
	(199, 'B8A08E6D', 19, '720p', '827-828', '785-788', 'bb625cf977c39cd08200a90a1514d45e76b3983a', '2017-12-01 00:00:00', 'Totto Land', '', 3),
	(200, '4A6DFB78', 19, '720p', '843-844', '806-808', '0b630e2ca020dce6a8e7418e06dbcaa550a55a97', '2018-03-29 00:10:27', 'Luffy vs. Sanji', '', 11),
	(201, 'A0EEC801', 19, '720p', '829-830', '788-790', '85c160b7e8065c74588b3e0bc1d83fb994c0d418', '2017-12-01 00:00:00', 'Emperor of the Sea, Charlotte Linlin', '', 4),
	(202, 'DF6B6FEC', 19, '720p', '831-832', '791-793', '96e01b0147252454fa40d87388d6835f71a5e60d', '2017-12-01 00:00:00', 'Adventure in the Mysterious Forest', '', 5),
	(203, '7FC1F643', 19, '720p', '833-834', '793-795', '73012d6d88ffc99b4bfe1df44ac66f2b4dbd15ee', '2017-12-01 00:00:00', 'Vinsmoke Judge', '', 6),
	(204, '86CA1E99', 19, '720p', '845-846', '809-812', '0434db8b38f470f2a5c25ba89768fab335fa0122', '2017-12-01 00:00:00', 'Forces of Rage', '', 12),
	(205, '34772777', 19, '720p', '847-848', '812-815', '0c197f04d53221de88b189a24131ab8fde9d6373', '2018-03-09 07:16:00', 'Luffy and Big Mom', '', 13),
	(206, '0AF54CB5', 19, '720p', '849-850', '814-817', '7a232e0491309ed9d81dd3ec67ac0684544d9a55', '2018-03-27 01:18:00', 'A Ray of Light', '', 14),
	(207, 'B14EAABE', 40, '720p', '375-376', '263-265', '3a9516e9f12cbd4e473b9c73a4d838f1435ba71c', '2018-03-02 07:51:00', '', '', 1),
	(208, '6C9A99AD', 40, '720p', '377-378', '265-266', '624a7e2390da1a564b46cd8a1c3d02dcbefc730a', '2015-03-17 03:58:00', '', '', 2),
	(209, '5498C538', 18, '480p', '35-39', '15-17', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-10-21 06:40:00', '', '', 5),
	(210, 'D1742A98', 18, '480p', '40-41', '17', '8363770ec123cdccef45ac98098b866635e0b43d', '2017-10-21 08:08:00', '', '', 6),
	(211, '26D6F22A', 41, '480p', '106-109', '64-65', '', '2017-12-01 00:00:00', '', '', 1),
	(212, '3677DB27', 41, '480p', '110-114', '65-67', '', '2017-12-01 00:00:00', '', '', 2),
	(213, '01C40FA1', 3, '720p', '796-797', '', '', '2017-09-02 22:26:00', '', '', 47),
	(214, '5F035A13', 3, '720p', '798-800', '', '', '2017-09-10 09:48:00', '', '', 48),
	(215, 'F2E930C5', 40, '720p', '379-380', '266-267', '805a5a08c2a2bfe265ad2157b832d378c60edfe1', '2017-12-01 00:00:00', '', '', 3),
	(216, '', 17, '480p', '247-249', '', '', NULL, '', '', 6),
	(218, '', 17, '480p', '250-251', '', '', NULL, '', '', 7),
	(219, '', 17, '480p', '252-253', '', '', NULL, '', '', 8),
	(220, '', 17, '480p', '254-256', '', '', NULL, '', '', 9),
	(221, '', 17, '480p', '257-259', '', '', NULL, '', '', 10),
	(222, '', 17, '480p', '260-262', '', '', NULL, '', '', 11),
	(223, '', 17, '480p', '263-265', '', '', NULL, '', '', 12),
	(224, '', 17, '480p', '266-268', '', '', NULL, '', '', 13),
	(225, '', 17, '480p', '269-271', '', '', NULL, '', '', 14),
	(226, '', 17, '480p', '272-273', '', '', NULL, '', '', 15),
	(227, '', 17, '480p', '274-276', '', '', NULL, '', '', 16),
	(228, '', 17, '480p', '277-278', '', '', NULL, '', '', 17),
	(229, '', 17, '480p', '279-280', '', '', NULL, '', '', 18),
	(230, '', 17, '480p', '281-282', '', '', NULL, '', '', 19),
	(231, '', 17, '480p', '283-285', '', '', NULL, '', '', 20),
	(232, '', 17, '480p', '286-288', '', '', NULL, '', '', 21),
	(233, '', 17, '480p', '289-291', '', '', NULL, '', '', 22),
	(234, '', 17, '480p', '292-294', '', '', NULL, '', '', 23),
	(235, '', 17, '480p', '295-296', '', '', NULL, '', '', 24),
	(236, '', 17, '480p', '297-298', '', '', NULL, '', '', 25),
	(237, '', 17, '480p', '299-300', '', '', NULL, '', '', 26),
	(238, '', 17, '480p', '301-303', '', '', NULL, '', '', 27),
	(239, '37E1B3D1', 19, '720p', '835-836', '796-798', 'b9234d303a01f712af16249f343271ff16a4fb01', '2017-12-01 00:00:00', 'Lola\'s Vivre Card', '', 7),
	(240, '99396F83', 19, '720p', '837-838', '798-800', 'dafd52c21413911de1ae26cb03e593e6d4873b38', '2018-05-19 08:20:00', 'Luffy vs. Commander Cracker', '', 8),
	(241, '', 19, '720p', '839-840', '', '', NULL, 'Iron Mask', '', 9),
	(242, '', 19, '720p', '841-842', '', '', NULL, 'The Power of a Full Stomach', '', 10),
	(244, 'AC27E460', 19, '720p', '851-852', '817-820', 'b5d38c55eabce8d3b28811ff6cf92263a24aac69', '2018-05-10 16:41:00', 'Germa\'s Failure', '', 15),
	(245, '2CA58267', 19, '720p', '853-854', '820-822', '8adf31e86f5e7b0f75f163df3c94fc114082448d', '2018-05-27 00:45:00', 'Not Here', '', 16),
	(246, '', 19, '720p', '855-856', '', '', NULL, 'Liar', '', 17),
	(247, '980F3B2B', 42, '720p', '549-550', '452, 459', 'c73a8dd4a3d25e05eb6b6a72379ead1889318bec', '2018-04-22 00:31:00', 'Navy Headquarters', '', 1),
	(248, '', 19, '720p', '857-858', '', '', NULL, 'Rook', '', 18),
	(249, '', 19, '720p', '859-860', '', '', NULL, '10:00 Opening of the Banquet', '', 19),
	(250, '', 19, '720p', '861-862', '', '', NULL, 'Good Actor', '', 20),
	(251, '', 43, '480p', '155-156', '', '', NULL, '', '', 1),
	(254, '', 43, '480p', '157-158', '', '', NULL, '', '', 2),
	(255, '', 43, '480p', '159-162', '', '', NULL, '', '', 3),
	(256, '', 43, '480p', '163-165', '', '', NULL, '', '', 4),
	(257, '', 44, '720p', '322-323', '', '', NULL, '', '', 1),
	(258, '', 44, '720p', '324-325', '', '', NULL, '', '', 2),
	(259, '', 44, '720p', '326-327', '', '', NULL, '', '', 3),
	(260, '', 44, '720p', '328-329', '', '', NULL, '', '', 4),
	(261, '', 44, '720p', '330-331', '', '', NULL, '', '', 5),
	(262, '', 44, '720p', '332-333', '', '', NULL, '', '', 6),
	(263, '', 44, '720p', '334-335', '', '', NULL, '', '', 7),
	(264, '', 44, '720p', '336-337', '', '', NULL, '', '', 8),
	(265, '', 44, '720p', '338-339', '', '', NULL, '', '', 9),
	(266, '', 44, '720p', '340-341', '', '', NULL, '', '', 10),
	(267, '', 44, '720p', '342-343', '', '', NULL, '', '', 11),
	(268, '', 44, '720p', '344-345', '', '', NULL, '', '', 12),
	(269, '', 44, '720p', '346-347', '', '', NULL, '', '', 13),
	(270, '', 44, '720p', '348-349', '', '', NULL, '', '', 14),
	(271, '', 44, '720p', '350-351', '', '', NULL, '', '', 15),
	(272, '', 44, '720p', '352-353', '', '', NULL, '', '', 16),
	(273, '', 44, '720p', '354-355', '', '', NULL, '', '', 17),
	(274, '', 44, '720p', '356-357', '', '', NULL, '', '', 18),
	(275, '', 44, '720p', '358-359', '', '', NULL, '', '', 19),
	(276, '', 44, '720p', '360-361', '', '', NULL, '', '', 20),
	(277, '', 44, '720p', '362-363', '', '', NULL, '', '', 21),
	(278, '', 44, '720p', '364-365', '', '', NULL, '', '', 22),
	(279, '', 44, '720p', '366-367', '', '', NULL, '', '', 23),
	(280, '', 44, '720p', '368-370', '', '', NULL, '', '', 24),
	(281, '', 44, '720p', '371-372', '', '', NULL, '', '', 25),
	(282, '', 44, '720p', '373-374', '', '', NULL, '', '', 26),
	(283, '', 45, '720p', '581-582', '', '', NULL, '', '', 1),
	(284, '', 45, '720p', '583-584', '', '', NULL, '', '', 2),
	(285, '', 45, '720p', '585-586', '', '', NULL, '', '', 3),
	(286, '', 45, '720p', '587-588', '', '', NULL, '', '', 4),
	(287, '', 45, '720p', '589-590', '', '', NULL, '', '', 5),
	(288, '', 45, '720p', '591-592', '', '', NULL, '', '', 6),
	(289, '', 45, '720p', '593-594', '', '', NULL, '', '', 7),
	(290, '', 45, '720p', '595-597', '', '', NULL, '', '', 8),
	(291, '', 46, '480p', '42-43', '', '', NULL, '', '', 1),
	(292, '', 46, '480p', '44-46', '', '', NULL, '', '', 2),
	(293, '', 46, '480p', '47-49', '', '', NULL, '', '', 3),
	(294, '', 46, '480p', '50-52', '', '', NULL, '', '', 4),
	(295, '', 46, '480p', '53-55', '', '', NULL, '', '', 5),
	(296, '', 46, '480p', '56-58', '', '', NULL, '', '', 6),
	(297, '', 46, '480p', '59-62', '', '', NULL, '', '', 7),
	(298, '', 46, '480p', '63-66', '', '', NULL, '', '', 8),
	(299, '', 46, '480p', '67-68', '', '', NULL, '', '', 9),
	(300, '', 47, '480p', '69-72', '', '', NULL, '', '', 1),
	(301, '', 47, '480p', '73-76', '', '', NULL, '', '', 2),
	(302, '', 47, '480p', '77-78', '', '', NULL, '', '', 3),
	(303, '', 47, '480p', '79-81', '', '', NULL, '', '', 4),
	(304, '', 47, '480p', '82-85', '', '', NULL, '', '', 5),
	(305, '', 47, '480p', '86-89', '', '', NULL, '', '', 6),
	(306, '', 47, '480p', '90-93', '', '', NULL, '', '', 7),
	(307, '', 47, '480p', '94-95', '', '', NULL, '', '', 8),
	(308, '', 48, '480p', '218-219', '', '', NULL, '', '', 1),
	(309, '', 48, '480p', '220-221', '', '', NULL, '', '', 2),
	(310, '', 48, '480p', '222-223', '', '', NULL, '', '', 3),
	(311, '', 48, '480p', '224-225', '', '', NULL, '', '', 4),
	(312, '', 48, '480p', '226-227', '', '', NULL, '', '', 5),
	(313, '', 48, '480p', '228-230', '', '', NULL, '', '', 6),
	(314, '', 48, '480p', '231-232', '', '', NULL, '', '', 7),
	(315, '', 48, '480p', '233-234', '', '', NULL, '', '', 8),
	(316, '', 48, '480p', '235-236', '', '', NULL, '', '', 9),
	(317, '2ACA9B38', 42, '720p', '551-552', '', 'a8239ee0298000a03c790980c193f26cb8047a93', '2018-05-03 23:39:00', 'Ace and Whitebeard', '', 2),
	(318, '', 42, '720p', '553-556', '', '', '2018-05-30 20:00:00', '', '', 3),
	(319, '', 42, '720p', '557-558', '', '', NULL, '', '', 4),
	(320, '', 42, '720p', '559-560', '', '', NULL, '', '', 5),
	(321, '', 42, '720p', '561-562', '', '', NULL, '', '', 6),
	(322, '', 42, '720p', '563-564', '', '', NULL, '', '', 7),
	(323, '', 42, '720p', '565-566', '', '', NULL, '', '', 8),
	(324, '', 42, '720p', '567-569', '', '', NULL, '', '', 9),
	(325, '', 42, '720p', '570-571', '', '', NULL, '', '', 10),
	(326, '', 42, '720p', '572-573', '', '', NULL, '', '', 11),
	(327, '', 42, '720p', '574', '', '', NULL, '', '', 12),
	(328, '', 42, '720p', '575-576', '', '', NULL, '', '', 13),
	(329, '', 42, '720p', '577-578', '', '', NULL, '', '', 14),
	(330, '', 42, '720p', '579-580', '', '', NULL, '', '', 15),
	(331, '', 40, '720p', '381-382', '', '', NULL, '', '', 4),
	(332, '', 40, '720p', '383-384', '', '', NULL, '', '', 5),
	(333, '', 40, '720p', '385-387', '', '', NULL, '', '', 6),
	(334, '', 40, '720p', '388-390', '', '', NULL, '', '', 7);