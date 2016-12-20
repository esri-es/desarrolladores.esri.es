<?php
include_once "config.php";

if(!empty($_POST)){
  require_once 'vendor/swiftmailer/swiftmailer/lib/swift_required.php';

  $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
    ->setUsername('in.mento')
    ->setPassword('3OjFcAzyuZ');

  $mailer = Swift_Mailer::newInstance($transport);

  $message = Swift_Message::newInstance('Nueva solicitud de startup')
    ->setFrom(array('aul.jimenez@esri.es' => 'Startups - Esri España'))
    ->setTo(array('raul.jimenez@esri.es'));

  $msg = "";
  $csv_headers = "";
  $csv_values = "";

  foreach ($_POST as $key => $value){
    $msg .= "$key: \n";
    $csv_headers .= "$key,";

    if(is_array($value)){
      foreach ($value as $v){
        $msg .= "$v, ";
        $csv_values .= "$v |";
      }
    }else{
      $msg .= "$value";
      $csv_values .= "$value";
    }
    $msg .= "\n\n";
    $csv_values .= ",";
  }

  $msg = wordwrap($msg,70);

  $msg .= "\n\n-------JSON VERSION------\n";

  if(!defined("JSON_UNESCAPED_UNICODE")){
    $jsonEncodeConst = 128;
  }else{
    $jsonEncodeConst = JSON_UNESCAPED_UNICODE;
  }

  $msg .= json_encode($_POST, $jsonEncodeConst);

  $msg .= "\n\n-------CSV VERSION-------\n";
  $msg .= "$csv_headers\n";
  $msg .= "$csv_values";

  // send email
  /*$headers = "From: Esri España<raul.jimenez@esri.es>\r\n";
  $headers .= "Reply-To: raul.jimenez@esri.es\r\n";
  if (!mail("raul.jimenez@esri.es","Solicitud nueva startup",$msg, $headers)){
    echo '{"error": true}';
  }else{
    echo json_encode($_POST, $jsonEncodeConst);
  }
  */
  $message->setBody($msg);
  $result = $mailer->send($message);
  if (!$result){
    echo '{"error": true}';
  }else{
    echo json_encode($_POST, $jsonEncodeConst);
  }

}else{
  echo '{"error": "Empty request"}';
}
?>
