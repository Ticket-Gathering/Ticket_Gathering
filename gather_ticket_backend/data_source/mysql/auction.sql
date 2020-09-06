/*
 Navicat Premium Data Transfer

 Source Server         : joshua
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : ticket_demo

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 06/09/2020 18:36:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auction
-- ----------------------------
DROP TABLE IF EXISTS `auction`;
CREATE TABLE `auction`  (
  `auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `show_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_price` double NULL DEFAULT NULL,
  `step_price` decimal(10, 2) NULL DEFAULT NULL,
  `start_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `end_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `highest_price` double NULL DEFAULT NULL,
  `highest_user_id` int(11) NULL DEFAULT NULL,
  `highest_user_name` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`auction_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auction
-- ----------------------------
INSERT INTO `auction` VALUES (1, '1_1_592527005054', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 1730, 2, NULL);
INSERT INTO `auction` VALUES (2, '1_1_605015724655', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (3, '1_1_606617772821', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (4, '1_1_620967962521', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (5, '1_1_620996253820', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (6, '1_1_607255467046', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (7, '1_1_619792315041', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (8, '1_1_620114953331', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (9, '1_1_620140747602', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);
INSERT INTO `auction` VALUES (10, '1_1_626331486335', 100, 10.00, '2020-09-01 12:00:00', '2020-09-10 13:00:00', 100, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
