<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/mailermg/Exception.php';
require 'src/mailermg/PHPMailer.php';
require 'src/mailermg/SMTP.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->Host = "smtp-pulse.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
$mail->Port = 465; // TLS only
$mail->SMTPSecure = 'ssl'; // ssl is depracated
$mail->SMTPAuth = true;
$mail->Username = 'trivita@qpard.com';
$mail->Password = 'HcsJdo26Bq';
$mail->setFrom('order@trivita.ua', 'Trivita');
#$mail->addAddress('order@trivita.ua', 'customer');
$mail->addAddress('ihor@magefan.com', 'customer');
$mail->Subject = 'Landing page submit form www.thewinners.com.ua';

$html = 'Прийшов новий запит з однієї з ландінг сторінок' . ' <br/>';


if (!empty($_GET)) {
	foreach ($_GET as $key => $value) {
		$html .= $key . ': ' . $value . '<br/>';
	}
}

if (!empty($_POST)) {
	foreach ($_POST as $key => $value) {
		$html .= $key . ': ' . $value . '<br/>';
	}
}

$mail->msgHTML($html); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
$mail->AltBody = '';
// $mail->addAttachment('images/phpmailer_mini.png'); //Attach an image file

if(!$mail->send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{

    echo "Message sent!";
}

header('Location:  ' . $_POST['redirect']);