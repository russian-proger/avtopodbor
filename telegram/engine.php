<?php
require_once "getToken.php";



function makeRequest($methodName, $params) {
  $token = getToken();
  return file_get_contents("https://api.telegram.org/bot" . $token . "/" . $methodName . "?" . http_build_query($params));
}

function getMySQLi() {
  return new mysqli("localhost", "admin", "123", "avtopodbor");
}

?>