<?php
$name    = strip_tags($_POST["name"]);
$email   = strip_tags($_POST["email"]);
$message = strip_tags($_POST["message"]);
$phone = strip_tags($_POST["phone"]);

// TODO: trim

$EmailTo = "streamlogol@gmail.com";
//$EmailTo = "streamlogol@gmail.com";

$Subject = "Message from streamlogol@gmail.com";

// prepare email body text
$Body  = '';
$Body .= "Email: " . $email;
$Body .= "\n";
$Body .= "From: "  . $name;
$Body .= "\n";

$Body .= "Message: ";
$Body .= "\n";
$Body .= $message;
$Body .= "\n";
$Body .= $phone;
$Body .= "\n";

if ( ! $email) {
    echo "No email. Email not sent";
    return;
}

$success = mail($EmailTo, $Subject, $Body);

if ($success) {
   echo "Email is sent";
} else {
    echo "Email not sent";
}