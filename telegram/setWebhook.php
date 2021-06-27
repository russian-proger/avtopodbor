<?php
ini_set("display_errors", 1);
require_once "engine.php";

function setWebhook() {
  $config = array(
    "url" => "https://avtopodbor-orenburg.ru/telegram/update.php"
  );

  return makeRequest("setWebhook", $config);
}

echo setWebhook();









?>