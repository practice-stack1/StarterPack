<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';


	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);
	$mail->isSMTP();
	$mail->SMTPDebug = SMTP :: DEBUG_SERVER;
	$mail->SMTPSecure = PHPMailer :: ENCRYPTION_STARTTLS;



	$mail->Host = 'ssl://smtp.gmail.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'improvemylife25@gmail.com';                 // Наш логин
	$mail->Password = 'vurasa2019';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;
	$mail->SMTPDebug = 3;
	//От кого письмо
	$mail->setFrom('improvemylife25@gmail.com', 'Grand Masteria');
	//Кому отправить
	$mail->addAddress('vadim3d2011@gmail.com');
	//Тема письма
	$mail->Subject = 'Лист від користувача Grand Masteria';


	//Тело письма
	$body = '<h1>Доброго дня! Потребую консультації стосовно гранітних пам`ятників</h1>';


	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Ім`я:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
	}


	$mail->Body = $body;


	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>