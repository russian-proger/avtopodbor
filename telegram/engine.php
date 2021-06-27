<?php



function makeRequest($methodName, $params) {
  $token = "1788284086:AAHXDamwodUyyTt_Vj7wFERyCpfr3dYI6-E";
  return file_get_contents("https://api.telegram.org/bot" . $token . "/" . $methodName . "?" . http_build_query($params));
}

function getMySQLi() {
  return new mysqli("localhost", "admin", "123", "avtopodbor");
}

?>