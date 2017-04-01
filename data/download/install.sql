#
# TABLE STRUCTURE FOR: ci_account
#

DROP TABLE IF EXISTS ci_account;

CREATE TABLE `ci_account` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `number` varchar(15) COLLATE utf8_unicode_ci DEFAULT '0',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `amount` double DEFAULT '0',
  `date` date DEFAULT NULL,
  `type` tinyint(1) DEFAULT '1',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `number` (`number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# TABLE STRUCTURE FOR: ci_account_info
#

DROP TABLE IF EXISTS ci_account_info;

CREATE TABLE `ci_account_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) DEFAULT '0' COMMENT '关联ID',
  `buId` smallint(6) DEFAULT '0' COMMENT '客户ID',
  `billNo` varchar(25) DEFAULT '' COMMENT '销售单号',
  `billType` varchar(20) DEFAULT '',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `accId` int(11) DEFAULT '0' COMMENT '结算账户ID',
  `payment` double DEFAULT '0' COMMENT '收款金额  采购退回为正',
  `wayId` int(11) DEFAULT '0' COMMENT '结算方式ID',
  `settlement` varchar(50) DEFAULT '' COMMENT '结算号',
  `remark` varchar(50) DEFAULT '' COMMENT '备注',
  `transType` int(11) DEFAULT '0',
  `transTypeName` varchar(50) DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `billdate` (`billDate`) USING BTREE,
  KEY `iid` (`iid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_address
#

DROP TABLE IF EXISTS ci_address;

CREATE TABLE `ci_address` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `shortName` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT ' ',
  `postalcode` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `province` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `city` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `area` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `address` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `linkman` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT '',
  `mobile` varchar(20) COLLATE utf8_unicode_ci DEFAULT '',
  `isdefault` tinyint(1) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `pid` (`postalcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# TABLE STRUCTURE FOR: ci_admin
#

DROP TABLE IF EXISTS ci_admin;

CREATE TABLE `ci_admin` (
  `uid` smallint(6) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '用户名称',
  `userpwd` varchar(32) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '密码',
  `status` tinyint(1) DEFAULT '1' COMMENT '是否锁定',
  `name` varchar(25) COLLATE utf8_unicode_ci DEFAULT '',
  `mobile` varchar(20) COLLATE utf8_unicode_ci DEFAULT '',
  `lever` text COLLATE utf8_unicode_ci COMMENT '权限',
  `roleid` tinyint(1) DEFAULT '1' COMMENT '角色ID',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO ci_admin (`uid`, `username`, `userpwd`, `status`, `name`, `mobile`, `lever`, `roleid`) VALUES (1, 'admin', 'd451119cf9093ecaa9a2b1190b7b2421', 1, '小阳', '13616216627', NULL, 0);
INSERT INTO ci_admin (`uid`, `username`, `userpwd`, `status`, `name`, `mobile`, `lever`, `roleid`) VALUES (2, 'admin123', 'd451119cf9093ecaa9a2b1190b7b2421', 1, '李明芳', '13616212121', '1,2,3,4,5,85,86,87,6,10,7,8,88,89,9,90', 1);


#
# TABLE STRUCTURE FOR: ci_assistingprop
#

DROP TABLE IF EXISTS ci_assistingprop;

CREATE TABLE `ci_assistingprop` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `disable` tinyint(1) DEFAULT '0' COMMENT '状态',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# TABLE STRUCTURE FOR: ci_assistsku
#

DROP TABLE IF EXISTS ci_assistsku;

CREATE TABLE `ci_assistsku` (
  `skuId` int(11) NOT NULL AUTO_INCREMENT,
  `skuClassId` int(11) DEFAULT '0',
  `skuAssistId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `skuName` varchar(100) COLLATE utf8_unicode_ci DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`skuId`),
  KEY `id` (`skuClassId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# TABLE STRUCTURE FOR: ci_category
#

DROP TABLE IF EXISTS ci_category;

CREATE TABLE `ci_category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `parentId` smallint(6) DEFAULT '0' COMMENT '上级栏目ID',
  `path` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目路径',
  `level` tinyint(2) DEFAULT '1' COMMENT '层次',
  `ordnum` int(11) DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `typeNumber` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '区别',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `detail` tinyint(4) DEFAULT '1',
  `sortIndex` smallint(6) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `parentId` (`parentId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_contact
#

DROP TABLE IF EXISTS ci_contact;

CREATE TABLE `ci_contact` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '客户名称',
  `number` varchar(50) DEFAULT '0' COMMENT '客户编号',
  `cCategory` smallint(6) DEFAULT '0' COMMENT '客户类别',
  `cCategoryName` varchar(50) DEFAULT '' COMMENT '分类名称',
  `taxRate` double DEFAULT '0' COMMENT '税率',
  `amount` double DEFAULT '0' COMMENT '期初应付款',
  `periodMoney` double DEFAULT '0' COMMENT '期初预付款',
  `difMoney` double DEFAULT '0' COMMENT '初期往来余额',
  `beginDate` date DEFAULT NULL COMMENT '余额日期',
  `remark` varchar(100) DEFAULT '' COMMENT '备注',
  `linkMans` text COMMENT '客户联系方式',
  `type` tinyint(1) DEFAULT '-10' COMMENT '-10客户  10供应商',
  `contact` varchar(255) DEFAULT '',
  `cLevel` smallint(5) DEFAULT '1' COMMENT '客户等级ID',
  `cLevelName` varchar(50) DEFAULT '' COMMENT '客户等级',
  `pinYin` varchar(50) DEFAULT '',
  `disable` tinyint(1) DEFAULT '0' COMMENT '0启用   1禁用',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '0正常 1删除',
  PRIMARY KEY (`id`),
  KEY `number` (`number`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_goods
#

DROP TABLE IF EXISTS ci_goods;

CREATE TABLE `ci_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '',
  `number` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '商品编号',
  `quantity` double DEFAULT '0' COMMENT '起初数量',
  `spec` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '规格',
  `baseUnitId` smallint(6) DEFAULT '0' COMMENT '单位ID',
  `unitName` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '单位名称',
  `categoryId` smallint(6) DEFAULT '0' COMMENT '商品分类ID',
  `categoryName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '分类名称',
  `purPrice` double DEFAULT '0' COMMENT '预计采购价',
  `salePrice` double DEFAULT '0' COMMENT '预计销售价',
  `unitCost` double DEFAULT '0' COMMENT '单位成本',
  `amount` double DEFAULT '0' COMMENT '期初总价',
  `remark` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `goods` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `propertys` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '初期设置',
  `vipPrice` double DEFAULT '0' COMMENT '会员价',
  `lowQty` double DEFAULT '0',
  `length` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `height` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `highQty` double DEFAULT '0',
  `isSerNum` double DEFAULT '0',
  `barCode` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `discountRate1` double DEFAULT '0' COMMENT '0',
  `discountRate2` double DEFAULT '0',
  `locationId` int(11) DEFAULT '0',
  `locationName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `wholesalePrice` double DEFAULT '0',
  `width` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `skuAssistId` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '辅助属性分类',
  `pinYin` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `unitId` smallint(6) DEFAULT '0',
  `files` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '图片路径',
  `disable` tinyint(1) DEFAULT '0' COMMENT '0启用   1禁用',
  `unitTypeId` int(11) DEFAULT '0',
  `assistIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `assistName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `assistUnit` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `jianxing` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `josl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `skuClassId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `property` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `safeDays` double DEFAULT '0',
  `advanceDay` double DEFAULT '0',
  `isWarranty` double DEFAULT '0',
  `delete` int(11) DEFAULT '0',
  `weight` double DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '0正常  1删除',
  PRIMARY KEY (`id`),
  KEY `number` (`number`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_goods_img
#

DROP TABLE IF EXISTS ci_goods_img;

CREATE TABLE `ci_goods_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '' COMMENT '名称',
  `invId` int(11) DEFAULT '0',
  `type` varchar(100) DEFAULT '',
  `url` varchar(255) DEFAULT '',
  `thumbnailUrl` varchar(255) DEFAULT '',
  `size` int(11) DEFAULT '0',
  `deleteUrl` varchar(255) DEFAULT '',
  `deleteType` varchar(50) DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `invId` (`invId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_invoice
#

DROP TABLE IF EXISTS ci_invoice;

CREATE TABLE `ci_invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buId` smallint(6) DEFAULT '0' COMMENT '供应商ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '单据编号',
  `uid` smallint(6) DEFAULT '0',
  `userName` varchar(50) DEFAULT '' COMMENT '制单人',
  `transType` int(11) DEFAULT '0' COMMENT '150501购货 150502退货 150601销售 150602退销 150706其他入库',
  `totalAmount` double DEFAULT '0' COMMENT '购货总金额',
  `amount` double DEFAULT '0' COMMENT '折扣后金额',
  `rpAmount` double DEFAULT '0' COMMENT '本次付款',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `description` varchar(100) DEFAULT '' COMMENT '备注',
  `arrears` double DEFAULT '0' COMMENT '本次欠款',
  `disRate` double DEFAULT '0' COMMENT '折扣率',
  `disAmount` double DEFAULT '0' COMMENT '折扣金额',
  `totalQty` double DEFAULT '0' COMMENT '总数量',
  `totalArrears` double DEFAULT '0',
  `billStatus` tinyint(1) DEFAULT '0' COMMENT '订单状态 ',
  `checkName` varchar(50) DEFAULT '' COMMENT '采购单审核人',
  `totalTax` double DEFAULT '0',
  `totalTaxAmount` double DEFAULT '0',
  `checked` tinyint(1) DEFAULT '0' COMMENT '采购单状态',
  `accId` tinyint(4) DEFAULT '0' COMMENT '结算账户ID',
  `billType` varchar(20) DEFAULT '' COMMENT 'PO采购订单 OI其他入库 PUR采购入库 BAL初期余额',
  `modifyTime` datetime DEFAULT NULL COMMENT '更新时间',
  `hxStateCode` tinyint(4) DEFAULT '0' COMMENT '0未付款  1部分付款  2全部付款',
  `transTypeName` varchar(20) DEFAULT '',
  `totalDiscount` double DEFAULT '0',
  `salesId` smallint(6) DEFAULT '0' COMMENT '销售人员ID',
  `customerFree` double DEFAULT '0' COMMENT '客户承担费用',
  `hxAmount` double DEFAULT '0' COMMENT '本次核销金额',
  `hasCheck` double DEFAULT '0' COMMENT '已核销',
  `notCheck` double DEFAULT '0' COMMENT '未核销',
  `nowCheck` double DEFAULT '0' COMMENT '本次核销',
  `payment` double DEFAULT '0' COMMENT '本次预收款',
  `discount` double DEFAULT '0' COMMENT '整单折扣',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '1删除  0正常',
  PRIMARY KEY (`id`),
  KEY `accId` (`accId`),
  KEY `buId` (`buId`),
  KEY `salesId` (`salesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_invoice_info
#

DROP TABLE IF EXISTS ci_invoice_info;

CREATE TABLE `ci_invoice_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) DEFAULT '0' COMMENT '关联ID',
  `buId` smallint(6) DEFAULT '0' COMMENT '供应商ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '单据编号',
  `transType` int(11) DEFAULT '0' COMMENT '150501采购 150502退货',
  `amount` double DEFAULT '0' COMMENT '购货金额',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `description` varchar(50) DEFAULT '' COMMENT '备注',
  `invId` int(11) DEFAULT '0' COMMENT '商品ID',
  `price` double DEFAULT '0' COMMENT '单价',
  `deduction` double DEFAULT '0' COMMENT '折扣额',
  `discountRate` double DEFAULT '0' COMMENT '折扣率',
  `qty` double DEFAULT '0' COMMENT '数量',
  `locationId` smallint(6) DEFAULT '0',
  `tax` double DEFAULT '0',
  `taxRate` double DEFAULT '0',
  `taxAmount` double DEFAULT '0',
  `unitId` smallint(6) DEFAULT '0',
  `skuId` int(11) DEFAULT '0',
  `entryId` tinyint(1) DEFAULT '1' COMMENT '区分调拨单  进和出',
  `transTypeName` varchar(25) DEFAULT '',
  `srcOrderEntryId` int(11) DEFAULT '0',
  `srcOrderId` int(11) DEFAULT '0',
  `srcOrderNo` varchar(25) DEFAULT '',
  `billType` varchar(20) DEFAULT '',
  `checked` tinyint(1) DEFAULT '0' COMMENT '0 1',
  `checkName` varchar(30) DEFAULT '',
  `salesId` smallint(6) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '1删除 0正常',
  PRIMARY KEY (`id`),
  KEY `type` (`transType`),
  KEY `billdate` (`billDate`),
  KEY `invId` (`invId`) USING BTREE,
  KEY `transType` (`transType`),
  KEY `iid` (`iid`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_invoice_type
#

DROP TABLE IF EXISTS ci_invoice_type;

CREATE TABLE `ci_invoice_type` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '' COMMENT '名称',
  `inout` tinyint(1) DEFAULT '1' COMMENT '1 入库  -1出库',
  `status` tinyint(1) DEFAULT '1',
  `type` varchar(10) DEFAULT '',
  `default` tinyint(1) DEFAULT '0',
  `number` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

INSERT INTO ci_invoice_type (`id`, `name`, `inout`, `status`, `type`, `default`, `number`) VALUES (1, '其他入库', 1, 1, 'in', 1, 150706);
INSERT INTO ci_invoice_type (`id`, `name`, `inout`, `status`, `type`, `default`, `number`) VALUES (2, '盘盈', 1, 1, 'in', 0, 150701);
INSERT INTO ci_invoice_type (`id`, `name`, `inout`, `status`, `type`, `default`, `number`) VALUES (3, '其他出库', -1, 1, 'out', 1, 150806);
INSERT INTO ci_invoice_type (`id`, `name`, `inout`, `status`, `type`, `default`, `number`) VALUES (4, '盘亏', -1, 1, 'out', 0, 150801);


#
# TABLE STRUCTURE FOR: ci_invps
#

DROP TABLE IF EXISTS ci_invps;

CREATE TABLE `ci_invps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buId` smallint(6) DEFAULT '0' COMMENT '供应商ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '单据编号',
  `uid` smallint(6) DEFAULT '0',
  `userName` varchar(50) DEFAULT '' COMMENT '制单人',
  `transType` int(11) DEFAULT '0' COMMENT '150501购货 150502退货 150601销售 150602退销 150706其他入库',
  `totalAmount` double DEFAULT '0' COMMENT '购货总金额',
  `amount` double DEFAULT '0' COMMENT '折扣后金额',
  `rpAmount` double DEFAULT '0' COMMENT '本次付款',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `description` varchar(100) DEFAULT '' COMMENT '备注',
  `arrears` double DEFAULT '0' COMMENT '本次欠款',
  `disRate` double DEFAULT '0' COMMENT '折扣率',
  `disAmount` double DEFAULT '0' COMMENT '折扣金额',
  `totalQty` double DEFAULT '0' COMMENT '总数量',
  `totalArrears` double DEFAULT '0',
  `billStatus` tinyint(1) DEFAULT '0' COMMENT '订单状态 0未入库  1 2全部入库',
  `checkName` varchar(50) DEFAULT '' COMMENT '采购单审核人',
  `totalTax` double DEFAULT '0',
  `totalTaxAmount` double DEFAULT '0',
  `checked` tinyint(1) DEFAULT '0' COMMENT '采购单状态',
  `accId` tinyint(4) DEFAULT '0' COMMENT '结算账户ID',
  `billType` varchar(20) DEFAULT '' COMMENT 'PO采购订单 OI其他入库 PUR采购入库 BAL初期余额',
  `modifyTime` datetime DEFAULT NULL COMMENT '更新时间',
  `hxStateCode` tinyint(4) DEFAULT '0' COMMENT '0未付款  1部分付款  2全部付款',
  `transTypeName` varchar(20) DEFAULT '',
  `totalDiscount` double DEFAULT '0',
  `salesId` smallint(6) DEFAULT '0' COMMENT '销售人员ID',
  `customerFree` double DEFAULT '0' COMMENT '客户承担费用',
  `hxAmount` double DEFAULT '0' COMMENT '本次核销金额',
  `hasCheck` double DEFAULT '0' COMMENT '已核销',
  `notCheck` double DEFAULT '0' COMMENT '未核销',
  `nowCheck` double DEFAULT '0' COMMENT '本次核销',
  `payment` double DEFAULT '0' COMMENT '本次预收款',
  `discount` double DEFAULT '0' COMMENT '整单折扣',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '1删除  0正常',
  `deliveryDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accId` (`accId`),
  KEY `buId` (`buId`),
  KEY `salesId` (`salesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_invps_info
#

DROP TABLE IF EXISTS ci_invps_info;

CREATE TABLE `ci_invps_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) DEFAULT '0' COMMENT '关联ID',
  `buId` smallint(6) DEFAULT '0' COMMENT '供应商ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '单据编号',
  `transType` int(11) DEFAULT '0' COMMENT '150501采购 150502退货',
  `amount` double DEFAULT '0' COMMENT '购货金额',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `description` varchar(50) DEFAULT '' COMMENT '备注',
  `invId` int(11) DEFAULT '0' COMMENT '商品ID',
  `price` double DEFAULT '0' COMMENT '单价',
  `deduction` double DEFAULT '0' COMMENT '折扣额',
  `discountRate` double DEFAULT '0' COMMENT '折扣率',
  `qty` double DEFAULT '0' COMMENT '数量',
  `locationId` smallint(6) DEFAULT '0',
  `tax` double DEFAULT '0',
  `taxRate` double DEFAULT '0',
  `taxAmount` double DEFAULT '0',
  `unitId` smallint(6) DEFAULT '0',
  `skuId` int(11) DEFAULT '0',
  `entryId` tinyint(1) DEFAULT '1' COMMENT '区分调拨单  进和出',
  `transTypeName` varchar(25) DEFAULT '',
  `srcOrderEntryId` int(11) DEFAULT '0',
  `srcOrderId` int(11) DEFAULT '0',
  `srcOrderNo` varchar(25) DEFAULT '',
  `billType` varchar(20) DEFAULT '',
  `checked` tinyint(1) DEFAULT '0' COMMENT '0 1',
  `checkName` varchar(30) DEFAULT '',
  `salesId` smallint(6) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0' COMMENT '1删除 0正常',
  PRIMARY KEY (`id`),
  KEY `type` (`transType`),
  KEY `billdate` (`billDate`),
  KEY `invId` (`invId`) USING BTREE,
  KEY `transType` (`transType`),
  KEY `iid` (`iid`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_log
#

DROP TABLE IF EXISTS ci_log;

CREATE TABLE `ci_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` smallint(6) DEFAULT '0' COMMENT '用户ID',
  `ip` varchar(25) DEFAULT '',
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '姓名',
  `log` text COMMENT '日志内容',
  `type` tinyint(1) DEFAULT '1' COMMENT ' ',
  `loginName` varchar(50) DEFAULT '' COMMENT '用户名',
  `modifyTime` datetime DEFAULT NULL COMMENT '写入日期',
  `operateTypeName` varchar(50) DEFAULT '',
  `adddate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `adddate` (`adddate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_menu
#

DROP TABLE IF EXISTS ci_menu;

CREATE TABLE `ci_menu` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `parentId` smallint(5) DEFAULT '0' COMMENT '上级栏目ID',
  `path` varchar(100) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目路径',
  `level` tinyint(2) DEFAULT '1' COMMENT '层次',
  `ordnum` smallint(6) DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `typeNumber` varchar(25) COLLATE utf8_unicode_ci DEFAULT '',
  `detail` tinyint(1) DEFAULT '1',
  `sortIndex` smallint(6) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0',
  `remark` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `parentId` (`parentId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (1, '购货单', 0, '1', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (2, '新增', 1, '1,2', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (3, '修改', 1, '1,3', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (4, '删除', 1, '1,4', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (5, '导出', 1, '1,5', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (6, '销货单', 0, '6', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (7, '新增', 6, '6,7', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (8, '修改', 6, '6,8', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (9, '删除', 6, '6,9', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (10, '导出', 6, '6,10', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (11, '盘点', 0, '11', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (12, '生成盘点记录', 11, '11,12', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (13, '导出', 11, '11,13', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (14, '其他入库单', 0, '14', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (15, '新增', 14, '14,15', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (16, '修改', 14, '14,16', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (17, '删除', 14, '14,17', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (18, '其他出库单', 0, '18', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (19, '新增', 18, '18,19', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (20, '修改', 18, '18,20', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (21, '删除', 18, '18,21', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (22, '采购明细表', 0, '22', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (23, '导出', 22, '22,23', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (24, '打印', 22, '22,24', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (25, '采购汇总表（按商品）', 0, '25', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (26, '导出', 25, '25,26', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (27, '打印', 25, '25,27', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (28, '采购汇总表（按供应商）', 0, '28', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (29, '导出', 28, '28,29', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (30, '打印', 28, '28,30', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (31, '销售明细表', 0, '31', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (32, '导出', 31, '31,32', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (33, '打印', 31, '31,33', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (34, '销售汇总表（按商品）', 0, '34', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (35, '导出', 34, '34,35', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (36, '打印', 34, '34,36', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (37, '销售汇总表（按客户）', 0, '37', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (38, '导出', 37, '37,38', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (39, '打印', 37, '37,39', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (40, '商品库存余额表', 0, '40', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (41, '导出', 40, '40,41', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (42, '打印', 40, '40,42', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (43, '商品收发明细表', 0, '43', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (44, '导出', 43, '43,44', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (45, '打印', 43, '43,45', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (46, '商品收发汇总表', 0, '46', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (47, '导出', 46, '46,47', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (48, '打印', 46, '46,48', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (49, '往来单位欠款表', 0, '49', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (50, '导出', 49, '49,50', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (51, '打印', 49, '49,51', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (52, '应付账款明细表', 0, '52', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (53, '导出', 52, '52,53', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (54, '打印', 52, '52,54', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (55, '应收账款明细表', 0, '55', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (56, '导出', 55, '55,56', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (57, '打印', 55, '55,57', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (58, '客户管理', 0, '58', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (59, '新增', 58, '58,59', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (60, '修改', 58, '58,60', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (61, '删除', 58, '58,61', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (62, '导出', 58, '58,62', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (63, '供应商管理', 0, '63', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (64, '新增', 63, '63,64', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (65, '修改', 63, '63,65', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (66, '删除', 63, '63,66', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (67, '导出', 63, '63,67', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (68, '商品管理', 0, '68', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (69, '新增', 68, '68,69', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (70, '修改', 68, '68,70', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (71, '删除', 68, '68,71', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (72, '导出', 68, '68,72', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (73, '客户类别', 0, '73', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (74, '新增', 73, '73,74', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (75, '修改', 73, '73,75', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (76, '删除', 73, '73,76', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (77, '计量单位', 0, '77', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (78, '新增', 77, '77,78', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (79, '修改', 77, '77,79', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (80, '删除', 77, '77,80', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (81, '系统参数', 0, '81', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (82, '权限设置', 0, '82', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (83, '操作日志', 0, '83', 1, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (84, '数据备份', 0, '84', 1, 99, 0, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (85, '打印', 1, '1,85', 2, 99, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (86, '审核', 1, '1,86', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (87, '反审核', 1, '1,87', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (88, '打印', 6, '6,88', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (89, '审核', 6, '6,89', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (90, '反审核', 6, '6,90', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (91, '禁用', 58, '58,91', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (92, '启用', 58, '58,92', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (93, '禁用', 63, '63,93', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (94, '启用', 63, '63,94', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (95, '禁用', 68, '68,95', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (96, '启用', 68, '68,96', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (97, '职员管理', 0, '97', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (98, '账号管理', 0, '98', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (99, '导入', 11, '11,99', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (100, '审核', 14, '14,100', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (101, '反审核', 14, '14,101', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (102, '导出', 14, '14,102', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (103, '审核', 18, '18,103', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (104, '反审核', 18, '18,104', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (105, '导出', 18, '18,105', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (106, '现金银行报表', 0, '106', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (107, '打印', 106, '106,107', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (108, '导出', 106, '106,108', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (109, '客户对账单', 0, '109', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (110, '打印', 109, '109,110', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (111, '导出', 109, '109,111', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (112, '供应商对账单', 0, '112', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (113, '打印', 112, '112,113', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (114, '导出', 112, '112,114', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (115, '其他收支明细表', 0, '115', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (116, '打印', 115, '115,116', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (117, '导出', 115, '115,117', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (118, '新增', 97, '97,118', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (119, '修改', 97, '97,119', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (120, '删除', 97, '97,120', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (121, '新增', 98, '98,121', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (122, '修改', 98, '98,122', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (123, '删除', 98, '98,123', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (124, '收款单', 0, '124', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (125, '新增', 124, '124,125', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (126, '修改', 124, '124,126', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (127, '删除', 124, '124,127', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (128, '导出', 124, '124,128', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (129, '付款单', 0, '129', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (130, '新增', 129, '129,130', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (131, '修改', 129, '129,131', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (132, '删除', 129, '129,132', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (133, '导出', 129, '129,133', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (134, '其他收入单', 0, '134', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (135, '新增', 134, '134,135', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (136, '修改', 134, '134,136', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (137, '删除', 134, '134,137', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (138, '导出', 134, '134,138', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (139, '其他支出单', 0, '139', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (140, '新增', 139, '139,140', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (141, '修改', 139, '139,141', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (142, '删除', 139, '139,142', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (143, '导出', 139, '139,143', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (144, '调拨单', 0, '144', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (145, '新增', 144, '144,145', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (146, '修改', 144, '144,146', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (147, '删除', 144, '144,147', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (148, '导出', 144, '144,148', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (149, '重新初始化', 0, '149', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (151, '成本调整单', 0, '151', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (152, '新增', 151, '151,152', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (153, '修改', 151, '151,153', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (154, '删除', 151, '151,154', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (155, '仓库管理', 0, '155', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (156, '新增', 155, '155,156', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (157, '修改', 155, '155,157', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (158, '删除', 155, '155,158', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (159, '结算方式', 0, '159', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (160, '新增', 159, '159,160', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (161, '修改', 159, '159,161', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (162, '删除', 159, '159,162', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (163, '供应商类别', 0, '163', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (164, '新增', 163, '163,164', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (165, '修改', 163, '163,165', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (166, '删除', 163, '163,166', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (167, '商品类别', 0, '167', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (168, '新增', 167, '167,168', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (169, '修改', 167, '167,169', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (170, '删除', 167, '167,170', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (171, '支出类别', 0, '171', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (172, '新增', 171, '171,172', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (173, '修改', 171, '171,173', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (174, '删除', 171, '171,174', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (175, '收入类别', 0, '175', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (176, '新增', 175, '175,176', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (177, '修改', 175, '175,177', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (178, '删除', 175, '175,178', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (179, '打印', 144, '144,179', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (180, '采购订单', 0, '180', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (181, '新增', 180, '180,181', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (182, '修改', 180, '180,182', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (183, '删除', 180, '180,183', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (184, '导出', 180, '180,184', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (185, '打印', 180, '180,185', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (186, '审核', 180, '180,186', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (187, '反审核', 180, '180,187', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (188, '销售订单', 0, '188', 1, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (189, '新增', 188, '188,189', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (190, '修改', 188, '188,190', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (191, '删除', 188, '188,191', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (192, '导出', 188, '188,192', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (193, '打印', 188, '188,193', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (194, '审核', 188, '188,194', 2, 0, 1, 'trade', 1, 0, 0, '');
INSERT INTO ci_menu (`id`, `name`, `parentId`, `path`, `level`, `ordnum`, `status`, `typeNumber`, `detail`, `sortIndex`, `isDelete`, `remark`) VALUES (195, '反审核', 188, '188,195', 2, 0, 1, 'trade', 1, 0, 0, '');


#
# TABLE STRUCTURE FOR: ci_options
#

DROP TABLE IF EXISTS ci_options;

CREATE TABLE `ci_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(64) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (1, 'system', 'a:10:{s:11:\"companyName\";s:18:\"某某集团公司\";s:11:\"companyAddr\";s:6:\"123213\";s:5:\"phone\";s:5:\"12312\";s:3:\"fax\";s:3:\"312\";s:8:\"postcode\";s:4:\"3123\";s:9:\"qtyPlaces\";s:1:\"1\";s:11:\"pricePlaces\";s:1:\"1\";s:12:\"amountPlaces\";s:1:\"2\";s:10:\"valMethods\";s:13:\"movingAverage\";s:18:\"requiredCheckStore\";s:1:\"1\";}', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (2, 'sales', 's:3893:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":60,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"nameExt\":\"<span id=\\\"barCodeInsert\\\">扫描枪录入</span>\",\"width\":300,\"classes\":\"goods\",\"editable\":true,\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"销售单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":1},\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"销售单价\",\"defhidden\":false},{\"name\":\"discountRate\",\"label\":\"折扣率(%)\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"integer\",\"editable\":true,\"defLabel\":\"折扣率(%)\",\"defhidden\":false},{\"name\":\"deduction\",\"label\":\"折扣额\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"折扣额\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"销售金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"销售金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"},{\"name\":\"srcOrderEntryId\",\"label\":\"源单分录ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单分录ID\",\"defhidden\":true},{\"name\":\"srcOrderId\",\"label\":\"源单ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单ID\",\"defhidden\":true},{\"name\":\"srcOrderNo\",\"label\":\"源单号\",\"width\":120,\"fixed\":true,\"hidden\":true,\"defLabel\":\"源单号\",\"defhidden\":true}],\"colModel\":[[\"operating\",\" \",null,60],[\"goods\",\"商品\",null,300],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"销售单价\",false,100],[\"discountRate\",\"折扣率(%)\",false,70],[\"deduction\",\"折扣额\",false,70],[\"amount\",\"销售金额\",false,100],[\"description\",\"备注\",null,150],[\"srcOrderEntryId\",\"源单分录ID\",true,0],[\"srcOrderId\",\"源单ID\",true,0],[\"srcOrderNo\",\"源单号\",true,120]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (3, 'purchase', 's:3824:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":60,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"nameExt\":\"<span id=\\\"barCodeInsert\\\">扫描枪录入</span>\",\"width\":300,\"classes\":\"goods\",\"editable\":true,\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"购货单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"购货单价\",\"defhidden\":false},{\"name\":\"discountRate\",\"label\":\"折扣率(%)\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"integer\",\"editable\":true,\"defLabel\":\"折扣率(%)\",\"defhidden\":false},{\"name\":\"deduction\",\"label\":\"折扣额\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"折扣额\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"购货金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"购货金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"},{\"name\":\"srcOrderEntryId\",\"label\":\"源单分录ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单分录ID\",\"defhidden\":true},{\"name\":\"srcOrderId\",\"label\":\"源单ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单ID\",\"defhidden\":true},{\"name\":\"srcOrderNo\",\"label\":\"源单号\",\"width\":120,\"fixed\":true,\"hidden\":true,\"defLabel\":\"源单号\",\"defhidden\":true}],\"colModel\":[[\"operating\",\" \",null,60],[\"goods\",\"商品\",null,300],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"购货单价\",false,100],[\"discountRate\",\"折扣率(%)\",false,70],[\"deduction\",\"折扣额\",false,70],[\"amount\",\"购货金额\",false,100],[\"description\",\"备注\",null,150],[\"srcOrderEntryId\",\"源单分录ID\",true,0],[\"srcOrderId\",\"源单ID\",true,0],[\"srcOrderNo\",\"源单号\",true,120]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (4, 'transfers', 's:2702:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":40,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"width\":318,\"title\":false,\"classes\":\"goods\",\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"outLocationName\",\"label\":\"调出仓库\",\"nameExt\":\"<small id=\\\"batch-storageA\\\">(批量)</small>\",\"sortable\":false,\"width\":100,\"title\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"调出仓库\"},{\"name\":\"inLocationName\",\"label\":\"调入仓库\",\"nameExt\":\"<small id=\\\"batch-storageB\\\">(批量)</small>\",\"width\":100,\"title\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"调入仓库\"},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"}],\"colModel\":[[\"operating\",\" \",null,40],[\"goods\",\"商品\",null,318],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"outLocationName\",\"调出仓库\",null,100],[\"inLocationName\",\"调入仓库\",null,100],[\"description\",\"备注\",null,150]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (5, 'otherWarehouse', 's:2906:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":40,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"width\":320,\"title\":true,\"classes\":\"goods\",\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"title\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"入库单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"入库单价\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"入库金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"入库金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"}],\"colModel\":[[\"operating\",\" \",null,40],[\"goods\",\"商品\",null,320],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"入库单价\",false,100],[\"amount\",\"入库金额\",false,100],[\"description\",\"备注\",null,150]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (6, 'adjustment', 's:1337:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":40,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"width\":320,\"title\":true,\"classes\":\"goods\",\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis disableSku\"},\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":60,\"defLabel\":\"单位\"},{\"name\":\"amount\",\"label\":\"调整金额\",\"hidden\":false,\"width\":100,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"调整金额\",\"defhidden\":false},{\"name\":\"locationName\",\"label\":\"仓库<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"title\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库<small id=\\\"batchStorage\\\">(批量)</small>\"},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"}],\"colModel\":[[\"operating\",\" \",null,40],[\"goods\",\"商品\",null,320],[\"skuId\",\"属性ID\",true,null],[\"mainUnit\",\"单位\",null,60],[\"amount\",\"调整金额\",false,100],[\"locationName\",\"仓库<small id=\\\"batchStorage\\\">(批量)</small>\",null,100],[\"description\",\"备注\",null,150]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (7, 'purchaseBack', 's:3824:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":60,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"nameExt\":\"<span id=\\\"barCodeInsert\\\">扫描枪录入</span>\",\"width\":300,\"classes\":\"goods\",\"editable\":true,\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"购货单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"购货单价\",\"defhidden\":false},{\"name\":\"discountRate\",\"label\":\"折扣率(%)\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"integer\",\"editable\":true,\"defLabel\":\"折扣率(%)\",\"defhidden\":false},{\"name\":\"deduction\",\"label\":\"折扣额\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"折扣额\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"购货金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"购货金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"},{\"name\":\"srcOrderEntryId\",\"label\":\"源单分录ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单分录ID\",\"defhidden\":true},{\"name\":\"srcOrderId\",\"label\":\"源单ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单ID\",\"defhidden\":true},{\"name\":\"srcOrderNo\",\"label\":\"源单号\",\"width\":120,\"fixed\":true,\"hidden\":true,\"defLabel\":\"源单号\",\"defhidden\":true}],\"colModel\":[[\"operating\",\" \",null,60],[\"goods\",\"商品\",null,300],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"购货单价\",false,100],[\"discountRate\",\"折扣率(%)\",false,70],[\"deduction\",\"折扣额\",false,70],[\"amount\",\"购货金额\",false,100],[\"description\",\"备注\",null,150],[\"srcOrderEntryId\",\"源单分录ID\",true,0],[\"srcOrderId\",\"源单ID\",true,0],[\"srcOrderNo\",\"源单号\",true,120]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (8, 'salesBack', 's:3893:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":60,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"nameExt\":\"<span id=\\\"barCodeInsert\\\">扫描枪录入</span>\",\"width\":300,\"classes\":\"goods\",\"editable\":true,\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"销售单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"销售单价\",\"defhidden\":false},{\"name\":\"discountRate\",\"label\":\"折扣率(%)\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"integer\",\"editable\":true,\"defLabel\":\"折扣率(%)\",\"defhidden\":false},{\"name\":\"deduction\",\"label\":\"折扣额\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"折扣额\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"销售金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"销售金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"},{\"name\":\"srcOrderEntryId\",\"label\":\"源单分录ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单分录ID\",\"defhidden\":true},{\"name\":\"srcOrderId\",\"label\":\"源单ID\",\"width\":0,\"hidden\":true,\"defLabel\":\"源单ID\",\"defhidden\":true},{\"name\":\"srcOrderNo\",\"label\":\"源单号\",\"width\":120,\"fixed\":true,\"hidden\":true,\"defLabel\":\"源单号\",\"defhidden\":true}],\"colModel\":[[\"operating\",\" \",null,60],[\"goods\",\"商品\",null,300],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"销售单价\",false,100],[\"discountRate\",\"折扣率(%)\",false,70],[\"deduction\",\"折扣额\",false,70],[\"amount\",\"销售金额\",false,100],[\"description\",\"备注\",null,150],[\"srcOrderEntryId\",\"源单分录ID\",true,0],[\"srcOrderId\",\"源单ID\",true,0],[\"srcOrderNo\",\"源单号\",true,120]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (9, 'otherOutbound', 's:2892:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":40,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"width\":320,\"title\":true,\"classes\":\"goods\",\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"title\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"batch\",\"label\":\"批次\",\"width\":90,\"classes\":\"ui-ellipsis batch\",\"hidden\":true,\"title\":false,\"editable\":true,\"align\":\"left\",\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-ellipsis\"},\"defLabel\":\"批次\",\"defhidden\":true},{\"name\":\"prodDate\",\"label\":\"生产日期\",\"width\":90,\"hidden\":true,\"title\":false,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{},\"defLabel\":\"生产日期\",\"defhidden\":true},{\"name\":\"safeDays\",\"label\":\"保质期(天)\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"保质期(天)\",\"defhidden\":true},{\"name\":\"validDate\",\"label\":\"有效期至\",\"width\":90,\"hidden\":true,\"title\":false,\"align\":\"left\",\"defLabel\":\"有效期至\",\"defhidden\":true},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"出库单位成本\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":1},\"defLabel\":\"出库单位成本\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"出库成本\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"defLabel\":\"出库成本\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"}],\"colModel\":[[\"operating\",\" \",null,40],[\"goods\",\"商品\",null,320],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"batch\",\"批次\",true,90],[\"prodDate\",\"生产日期\",true,90],[\"safeDays\",\"保质期(天)\",true,90],[\"validDate\",\"有效期至\",true,90],[\"qty\",\"数量\",null,80],[\"price\",\"出库单位成本\",false,100],[\"amount\",\"出库成本\",false,100],[\"description\",\"备注\",null,150]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (10, 'purchaseOrder', 's:2682:\"{\"grids\":{\"grid\":{\"defColModel\":[{\"name\":\"operating\",\"label\":\" \",\"width\":60,\"fixed\":true,\"align\":\"center\",\"defLabel\":\" \"},{\"name\":\"goods\",\"label\":\"商品\",\"nameExt\":\"<span id=\\\"barCodeInsert\\\">扫描枪录入</span>\",\"width\":300,\"classes\":\"goods\",\"editable\":true,\"defLabel\":\"商品\"},{\"name\":\"skuId\",\"label\":\"属性ID\",\"hidden\":true,\"defLabel\":\"属性ID\",\"defhidden\":true},{\"name\":\"skuName\",\"label\":\"属性\",\"width\":100,\"classes\":\"ui-ellipsis\",\"hidden\":true,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"属性\",\"defhidden\":true},{\"name\":\"mainUnit\",\"label\":\"单位\",\"width\":80,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"单位\"},{\"name\":\"unitId\",\"label\":\"单位Id\",\"hidden\":true,\"defLabel\":\"单位Id\",\"defhidden\":true},{\"name\":\"locationName\",\"label\":\"仓库\",\"nameExt\":\"<small id=\\\"batchStorage\\\">(批量)</small>\",\"width\":100,\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"仓库\"},{\"name\":\"qty\",\"label\":\"数量\",\"width\":80,\"align\":\"right\",\"formatter\":\"number\",\"formatoptions\":{\"decimalPlaces\":1},\"editable\":true,\"defLabel\":\"数量\"},{\"name\":\"price\",\"label\":\"购货单价\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":1},\"editable\":true,\"edittype\":\"custom\",\"editoptions\":{\"trigger\":\"ui-icon-triangle-1-s\"},\"defLabel\":\"购货单价\",\"defhidden\":false},{\"name\":\"discountRate\",\"label\":\"折扣率(%)\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"integer\",\"editable\":true,\"defLabel\":\"折扣率(%)\",\"defhidden\":false},{\"name\":\"deduction\",\"label\":\"折扣额\",\"hidden\":false,\"width\":70,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"折扣额\",\"defhidden\":false},{\"name\":\"amount\",\"label\":\"购货金额\",\"hidden\":false,\"width\":100,\"fixed\":true,\"align\":\"right\",\"formatter\":\"currency\",\"formatoptions\":{\"showZero\":true,\"decimalPlaces\":2},\"editable\":true,\"defLabel\":\"购货金额\",\"defhidden\":false},{\"name\":\"description\",\"label\":\"备注\",\"width\":150,\"title\":true,\"editable\":true,\"defLabel\":\"备注\"}],\"colModel\":[[\"operating\",\" \",null,60],[\"goods\",\"商品\",null,300],[\"skuId\",\"属性ID\",true,null],[\"skuName\",\"属性\",true,100],[\"mainUnit\",\"单位\",null,80],[\"unitId\",\"单位Id\",true,null],[\"locationName\",\"仓库\",null,100],[\"qty\",\"数量\",null,80],[\"price\",\"购货单价\",false,100],[\"discountRate\",\"折扣率(%)\",false,70],[\"deduction\",\"折扣额\",false,70],[\"amount\",\"购货金额\",false,100],[\"description\",\"备注\",null,150]],\"isReg\":true}}}\";', 'yes');
INSERT INTO ci_options (`option_id`, `option_name`, `option_value`, `autoload`) VALUES (11, 'salesOrderList', 's:606:\"{\"grids\":{\"grid\":{\"colModel\":[[\"operating\",\"操作\",null,60],[\"billDate\",\"订单日期\",null,100],[\"billNo\",\"订单编号\",null,120],[\"transType\",\"业务类别\",null,100],[\"salesName\",\"销售人员\",null,80],[\"contactName\",\"客户\",null,101],[\"totalAmount\",\"销售金额\",false,100],[\"totalQty\",\"数量\",null,57],[\"billStatusName\",\"订单状态\",null,71],[\"deliveryDate\",\"交货日期\",null,100],[\"userName\",\"制单人\",null,80],[\"checkName\",\"审核人\",false,44],[\"description\",\"备注\",null,200],[\"disEditable\",\"不可编辑\",true,null]],\"isReg\":true}},\"curTime\":1438079315000,\"modifyTime\":1438079315000}\";', 'yes');


#
# TABLE STRUCTURE FOR: ci_payment_info
#

DROP TABLE IF EXISTS ci_payment_info;

CREATE TABLE `ci_payment_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) DEFAULT '0' COMMENT '关联ID',
  `buId` smallint(6) DEFAULT '0' COMMENT '客户ID',
  `billId` int(11) DEFAULT '0' COMMENT '销售单号ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '销售单编号',
  `billType` varchar(20) DEFAULT '',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `billPrice` double DEFAULT '0' COMMENT '单据金额',
  `hasCheck` double DEFAULT '0' COMMENT '已收款',
  `notCheck` double DEFAULT '0' COMMENT '未收款',
  `nowCheck` double DEFAULT '0' COMMENT '本次收款',
  `transType` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `type,billdate` (`billDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_printtemplates
#

DROP TABLE IF EXISTS ci_printtemplates;

CREATE TABLE `ci_printtemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `info` text,
  `type` int(11) DEFAULT '0',
  `isDefault` tinyint(1) DEFAULT '0',
  `isSystem` tinyint(1) DEFAULT '0',
  `filePath` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT '0',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_receipt_info
#

DROP TABLE IF EXISTS ci_receipt_info;

CREATE TABLE `ci_receipt_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) DEFAULT '0' COMMENT '关联ID',
  `buId` smallint(6) DEFAULT '0' COMMENT '客户ID',
  `billId` int(11) DEFAULT '0' COMMENT '销售单号ID',
  `billNo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '销售单编号',
  `billType` varchar(20) DEFAULT '',
  `billDate` date DEFAULT NULL COMMENT '单据日期',
  `billPrice` double DEFAULT '0' COMMENT '单据金额',
  `hasCheck` double DEFAULT '0' COMMENT '已收款',
  `notCheck` double DEFAULT '0' COMMENT '未收款',
  `nowCheck` double DEFAULT '0' COMMENT '本次收款',
  `transType` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `type,billdate` (`billDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_staff
#

DROP TABLE IF EXISTS ci_staff;

CREATE TABLE `ci_staff` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `number` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0',
  `disable` tinyint(1) DEFAULT '0' COMMENT '0启用  1禁用',
  `allowsms` tinyint(4) DEFAULT '0',
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `commissionrate` tinyint(4) DEFAULT '0',
  `creatorId` int(11) DEFAULT '0',
  `deptId` int(11) DEFAULT '0',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `empId` int(11) DEFAULT '0',
  `empType` tinyint(4) DEFAULT '1',
  `fullId` int(11) DEFAULT '0',
  `leftDate` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `mobile` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `parentId` smallint(6) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `number` (`number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_storage
#

DROP TABLE IF EXISTS ci_storage;

CREATE TABLE `ci_storage` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '导航栏目',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '栏目名称',
  `locationNo` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0',
  `disable` tinyint(1) DEFAULT '0' COMMENT '状态 0正常  1锁定',
  `allowNeg` tinyint(4) DEFAULT '0',
  `deptId` int(11) DEFAULT '0',
  `empId` int(11) DEFAULT '0',
  `groupx` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` tinyint(4) DEFAULT '0',
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `isDelete` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `locationNo` (`locationNo`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_unit
#

DROP TABLE IF EXISTS ci_unit;

CREATE TABLE `ci_unit` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '客户名称',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `unitTypeId` smallint(6) DEFAULT '0',
  `default` tinyint(1) DEFAULT '0',
  `rate` tinyint(1) DEFAULT '0',
  `guid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: ci_unittype
#

DROP TABLE IF EXISTS ci_unittype;

CREATE TABLE `ci_unittype` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '' COMMENT '客户名称',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

