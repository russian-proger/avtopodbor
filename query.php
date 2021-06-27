<?php
ini_set("display_errors", 1);

require_once "./telegram/sendMessage.php";

sendMessage("
Новая заявка!\n
Имя: ${_GET['name']}
Номер телефона: ${_GET['phone']}
");

?>