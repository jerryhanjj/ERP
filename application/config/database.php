<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------
| DATABASE CONNECTIVITY SETTINGS
| -------------------------------------------------------------------
| This file will contain the settings needed to access your database.
|
| For complete instructions please consult the 'Database Connection'
| page of the User Guide.
|
| -------------------------------------------------------------------
| EXPLANATION OF VARIABLES
| -------------------------------------------------------------------
|
|	['hostname'] The hostname of your database server.
|	['username'] The username used to connect to the database
|	['password'] The password used to connect to the database
|	['database'] The name of the database you want to connect to
|	['dbdriver'] The database type. ie: mysql.  Currently supported:
				 mysql, mysqli, postgre, odbc, mssql, sqlite, oci8
|	['dbprefix'] You can add an optional prefix, which will be added
|				 to the table name when using the  Active Record class
|	['pconnect'] TRUE/FALSE - Whether to use a persistent connection
|	['db_debug'] TRUE/FALSE - Whether database errors should be displayed.
|	['cache_on'] TRUE/FALSE - Enables/disables query caching
|	['cachedir'] The path to the folder where cache files should be stored
|	['char_set'] The character set used in communicating with the database
|	['dbcollat'] The character collation used in communicating with the database
|				 NOTE: For MySQL and MySQLi databases, this setting is only used
| 				 as a backup if your server is running PHP < 5.2.3 or MySQL < 5.0.7
|				 (and in table creation queries made with DB Forge).
| 				 There is an incompatibility in PHP with mysql_real_escape_string() which
| 				 can make your site vulnerable to SQL injection if you are using a
| 				 multi-byte character set and are running versions lower than these.
| 				 Sites using Latin-1 or UTF-8 database character set and collation are unaffected.
|	['swap_pre'] A default table prefix that should be swapped with the dbprefix
|	['autoinit'] Whether or not to automatically initialize the database.
|	['stricton'] TRUE/FALSE - forces 'Strict Mode' connections
|							- good for ensuring strict SQL while developing
|
| The $active_group variable lets you choose which connection group to
| make active.  By default there is only one group (the 'default' group).
|
| The $active_record variables lets you determine whether or not to load
| the active record class
*/
define('LOG','ci_log');  
define('ROLE','ci_role');             
define('MENU','ci_menu');   
define('CONTACT','ci_contact');  
define('GOODS','ci_goods'); 
define('GOODS_IMG','ci_goods_img');  
define('STAFF','ci_staff'); 
define('ASSISTINGPROP','ci_assistingprop');
define('RECEIPT_INFO','ci_receipt_info');
define('PAYMENT_INFO','ci_payment_info');
define('ACCOUNT','ci_account');
define('STORAGE','ci_storage');     
define('ADMIN','ci_admin'); 
define('SETTLEMENT','ci_settlement'); 
define('CATEGORY','ci_category'); 
define('UNIT','ci_unit');   
define('UNITTYPE','ci_unittype');  
define('ADDRESS','ci_address');
define('ASSISTSKU','ci_assistsku');
define('INVPS','ci_invps'); 
define('INVPS_INFO','ci_invps_info'); 
define('INVOICE','ci_invoice');    
define('INVOICE_INFO','ci_invoice_info'); 
define('INVOICE_TYPE','ci_invoice_type'); 
define('ACCOUNT_INFO','ci_account_info'); 
define('OPTIONS','ci_options');
define('PRINTTEMPLATES','ci_printtemplates');
$active_group = 'default';
$active_record = TRUE;
$db['default']['hostname'] = 'localhost';   //数据库地址
$db['default']['username'] = 'root';        //数据库用户名
$db['default']['password'] = 'root';            //数据库密码
$db['default']['database'] = 'webtest';   //数据库名称
$db['default']['dbdriver'] = 'mysql';
$db['default']['dbprefix'] = '';
$db['default']['pconnect'] = TRUE;
$db['default']['db_debug'] = FALSE;
$db['default']['cache_on'] = FALSE;
$db['default']['cachedir'] = '';
$db['default']['char_set'] = 'utf8';
$db['default']['dbcollat'] = 'utf8_unicode_ci';
$db['default']['swap_pre'] = '';
$db['default']['autoinit'] = TRUE;
$db['default']['stricton'] = FALSE;
/* End of file database.php */
/* Location: ./application/config/database.php */
