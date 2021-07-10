<?php
ini_set("display_errors", 1);
require_once "engine.php";

function phpWebhook() {
  $config = array(
  );

  return makeRequest("getWebhookInfo", $config);
}

echo phpWebhook();









?>