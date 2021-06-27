<?php
ini_set("display_errors", 1);

require_once "engine.php";



function sendMessage($text, $user_id="all") {
  if ($user_id == "all") {
    $mysqli = new mysqli("localhost", "admin", "123", "avtopodbor");
    if ($mysqli->connect_errno) {
      echo "Не удалось подключиться к MySQL";
    }
    
    $res = $mysqli->query("SELECT * FROM avtopodbor.users WHERE is_bot=0");
    for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) {
      $res->data_seek($row_no);
      $row = $res->fetch_assoc();
  
      makeRequest("sendMessage", array(
        "chat_id" => $row['t_id'],
        "text" => $text
      ));
    }
  } else {
    makeRequest("sendMessage", array(
      "chat_id" => $user_id,
      "text" => $text
    ));
  }

}


?>