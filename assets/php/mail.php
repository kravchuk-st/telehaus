<?php
if (empty($_POST)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Немає POST даних']);
    exit;
}

$admin_email = 'event@telehausme.com';
$from_email = 'vxksdniv@telehausme.com';  // Ваш новий email
$user_email = isset($_POST['E-mail']) ? htmlspecialchars($_POST['E-mail']) : '';

$c = true;
$body = '';
foreach ($_POST as $key => $value) {
    if ($value != "") {
        $body .= "
        " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>" . htmlspecialchars($value) . "</td>
        </tr>
        ";
    }
}

$message = "
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: Arial, sans-serif;'>
    <h2>Нова заявка з сайту Telehausme</h2>
    <table style='width: 100%; border-collapse: collapse;'>$body
    <tr style='background-color: #f8f8f8;'>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Дата</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>" . date('d.m.Y H:i:s') . "</td>
    </tr>
    </table>
</body>
</html>
";

$subject = 'Заявка з Telehausme - ' . date('d.m.Y H:i:s');

$headers  = "From: Telehausme <$from_email>\r\n";
$headers .= "Reply-To: $user_email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

$result = mail($admin_email, $subject, $message, $headers);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false]);
}
?>
