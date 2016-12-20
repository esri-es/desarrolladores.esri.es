<?php
//header("Access-Control-Allow-Origin: *");
$param = "email";
$target_file = "./plataforma-arcgis.json";
if(isset($_POST[$param])){
  $value = $_POST[$param];

  // Read JSON file
  $json = file_get_contents($target_file);

  //Decode JSON
  $json_data = json_decode($json,true);

  if(in_array($value,$json_data["usernames"])){

    $res = array(
      'error' => true,
      'response' => 'El usuario ya existe'
    );

  }else{
    array_push($json_data["usernames"],$value);

    if(!file_put_contents($target_file,json_encode($json_data))){

      $res = array(
        'error' => true,
        'response' => 'Problemas al inscribir al usuario'
      );

    }else{

      $res = array(
        'error' => false,
        'response' => 'Usuario inscrito con éxito'
      );

    }
  }

}else{
  $res = array(
    'error' => true,
    'response' => 'No se ha recibido el valor: '.$param
  );
}
if(!defined("JSON_UNESCAPED_UNICODE")){
  $jsonEncodeConst = 128;
}else{
  $jsonEncodeConst = JSON_UNESCAPED_UNICODE;
}
echo json_encode($res, $jsonEncodeConst );
?>
