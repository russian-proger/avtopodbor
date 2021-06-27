<?php
  require_once "engine.php";
  require_once "sendMessage.php";

  ini_set("display_errors", 1);
  $file = fopen(__DIR__ . "/log.txt", "a+");
  fwrite($file, file_get_contents("php://input") . "\n");

  $input = json_decode(file_get_contents("php://input"), 1);
  if ($input["message"] != null && $input["message"]["from"] != null) {
    $mysqli = getMySQLi();
    $user = $input["message"]["from"];
    $t_id = $user["id"];
    $isAdmin = $mysqli->query("SELECT t_id FROM users WHERE t_id=" . $t_id)->num_rows != 0;
    if ($input["message"]["text"] == "command_28062002") {
      $f_name = $user["first_name"];
      $l_name = $user["last_name"] == null ? "NULL" : "'" . $user["last_name"] . "'";
      $is_bot = $user["user_bot"] ? 1 : 0;
      if (!$isAdmin) {
        fwrite($file, "INSERT INTO users (t_id, first_name, is_bot, last_name) VALUES (${t_id}, '${f_name}', ${is_bot}, ${l_name}\n");
        sendMessage("Ваш аккаунт был подвязан к боту!\n\nТеперь вы можете прослеживать заявки посетителей своего сайта", $t_id);
        $mysqli->query("INSERT INTO users (t_id, first_name, is_bot, last_name) VALUES (${t_id}, '${f_name}', ${is_bot}, ${l_name})");
      } else {
        sendMessage("Ваш аккаунт уже подвязан к боту!", $t_id);
      }
    } else if ($input["message"]["text"] == "unsubscribe" && $isAdmin) {
      sendMessage("Ваш аккаунт был отвязан от бота!", $t_id);
      $mysqli->query("DELETE FROM users WHERE t_id=${t_id}");
    }
    $mysqli->close();
  }

  

  fclose($file);
?>