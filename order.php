<?php
ini_set("display_errors", 1);

require_once "./telegram/sendMessage.php";

sendMessage("
Заявка на услугу!\n
Имя: ${_GET['name']}
Номер телефона: ${_GET['phone']}
Услуга: ${_GET['service']}
");

?>