<?
$admin_email = 'telehausme@gmail.com';

$form_subject = 'Заявка з сайту Telehausme - ' . date('d.m.Y H:i:s');

$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
  if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
    if (is_array($value)) {
      $val_text = '';
      foreach ($value as $val) {
        if ($val && $val != '') {
          $val_text .= ($val_text==''?'':', ').$val;
        }
      }
      $value = $val_text;
    }
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
    <td style='padding: 10px; width: auto;'><b>$key:</b></td>
    <td style='padding: 10px;width: 100%;'>$value</td>
    </tr>
    ";
  }
}
$message = "<table style='width: 50%;'>$message</table>";

$headers  = "From: Telehausme <support@telehausme.com>\r\n";
$headers .= "Reply-To: noreply@telehausme.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
                 
mail($admin_email, $form_subject, $message, $headers);
?>
