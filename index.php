<?php
error_reporting(0);
ob_start();
session_start();
//print "<pre>";
//print_r($_SESSION);
//print "</pre>";
if(
    !empty($_SESSION['facebook']) ||
    !empty($_SESSION['twitter']) ||
    !empty($_SESSION['googleplus']) ||
    !empty($_SESSION['youtube']) ||
    !empty($_SESSION['linkedin'])
) {
    require_once ('index-org.php');
} else {

    if($_GET['logout123'] == 'logout now') {
        session_destroy();
        // unset cookies
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach ($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time() - 1000);
                setcookie($name, '', time() - 1000, '/');
            }
        }
    }

    define('BASEDIR', dirname(__FILE__));
    set_include_path(
        BASEDIR . '/library/' . PATH_SEPARATOR .
        get_include_path()
    );

    require_once('AuthAny/Config/AuthAny.php');
    $AuthAny->handleRequest();

    require_once ('index-ui-login.php');
}
require_once ('print_debug.php.php');