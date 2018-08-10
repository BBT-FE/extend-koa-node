/*
 Navicat MySQL Data Transfer

 Source Server         : l-node
 Source Server Version : 80011
 Source Host           : localhost
 Source Database       : tour

 Target Server Version : 80011
 File Encoding         : utf-8

 Date: 07/01/2018 17:39:35 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `_mysql_session_store`
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `tour_admin`
-- ----------------------------
DROP TABLE IF EXISTS `tour_admin`;
CREATE TABLE `tour_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `create_time` mediumtext NOT NULL COMMENT '被创建时间',
  `creator` varchar(20) NOT NULL COMMENT '创建人',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `type` int(11) NOT NULL COMMENT '类型',
  `status` int(11) DEFAULT NULL COMMENT '状态，是否被删（404为被删，300为异常，200为正常）',
  `extra_info` varchar(300) NOT NULL DEFAULT '{}' COMMENT '一些额外信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `tour_admin`
-- ----------------------------
BEGIN;
INSERT INTO `tour_admin` VALUES ('1', '1234', '13312312321', '123456', '2018-09-09 12:12:12', 'abvc', 'aaa', '9999', '0', '{}'), ('5', '1', '34', '4', '2018-06-29 15:14:04', 'aaa', '2', '0', '404', '{}'), ('6', '1', '1', '1', '2018-06-29 15:16:36', 'aaa', '1', '0', '404', '{}'), ('7', '1', '1', '1', '2018-06-29 15:16:56', 'aaa', '1', '0', '404', '{}'), ('8', '1', '1', '1', '2018-06-29 15:17:23', 'aaa', '1', '0', '404', '{}'), ('9', '2', '2', '2', '2018-06-29 15:17:35', 'aaa', '2', '0', '404', '{}'), ('10', '3', '3', '3', '2018-06-29 15:18:38', 'aaa', '3', '0', '404', '{}'), ('11', '1', '1', '1', '2018-06-29 15:18:52', 'aaa', '1', '0', '404', '{}'), ('12', '1', '1', '1', '2018-06-29 15:19:16', 'aaa', '1', '0', '404', '{}'), ('13', '1', '1', '1', '2018-06-29 15:19:54', 'aaa', '1', '0', '404', '{}'), ('14', '1', '1', '1', '2018-06-29 15:20:03', 'aaa', '1', '0', '404', '{}'), ('15', '1', '1', '1', '2018-06-29 15:40:31', 'aaa', '1', '0', '404', '{}'), ('16', 'aaa', '111', '11', '2018-06-29 16:27:54', 'aaa', '111', '0', '404', '{}'), ('17', '123456788', '1', '1', '2018-06-29 16:29:25', 'aaa', '1', '1000', '0', '{}');
COMMIT;

-- ----------------------------
--  Table structure for `tour_comment`
-- ----------------------------
DROP TABLE IF EXISTS `tour_comment`;
CREATE TABLE `tour_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `extra_info` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `tour_guider`
-- ----------------------------
DROP TABLE IF EXISTS `tour_guider`;
CREATE TABLE `tour_guider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(16) NOT NULL,
  `address` varchar(200) DEFAULT '""',
  `balance` decimal(8,2) DEFAULT NULL,
  `create_time` mediumtext,
  `card_no` varchar(13) NOT NULL DEFAULT '""',
  `status` int(11) DEFAULT NULL,
  `extra_info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `tour_guider`
-- ----------------------------
BEGIN;
INSERT INTO `tour_guider` VALUES ('1', '12', '1212', '12', null, null, '2018-07-01 17:39:20', '\"\"', '404', null);
COMMIT;

-- ----------------------------
--  Table structure for `tour_order`
-- ----------------------------
DROP TABLE IF EXISTS `tour_order`;
CREATE TABLE `tour_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `user_id` varchar(10) NOT NULL COMMENT '用户编号',
  `guider_id` varchar(16) NOT NULL COMMENT '导游编号，自增',
  `total_money` decimal(8,2) NOT NULL,
  `order_time` mediumtext NOT NULL,
  `status` int(11) DEFAULT NULL,
  `extra_info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `tour_user`
-- ----------------------------
DROP TABLE IF EXISTS `tour_user`;
CREATE TABLE `tour_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(16) NOT NULL,
  `address` varchar(200) DEFAULT '',
  `create_time` mediumtext NOT NULL,
  `card_no` varchar(18) DEFAULT NULL,
  `balance` decimal(8,2) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `extra_info` varchar(300) DEFAULT '{}',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `tour_user`
-- ----------------------------
BEGIN;
INSERT INTO `tour_user` VALUES ('3', '1', '2', '11', '', '2018-07-01 13:11:30', null, null, '404', '{}'), ('4', '2', '2', '2', '', '2018-07-01 13:11:47', null, null, '0', '{}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
