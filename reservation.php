<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = $_POST['Name'];
    $email   = $_POST['email'];
    $number  = $_POST['Number'];
    $guests  = $_POST['Guests'];
    $date    = $_POST['Date'];
    $destination = $_POST['Destination'];

    $to = "sales@laderivetravel.com"; // Your team email
    $subject = "New Reservation from La Dérive Travel";
    $headers = "From: sales@laderivetravel.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "New reservation request:\n\n"
          . "Name: $name\n"
          . "Email: $email\n"
          . "Phone: $number\n"
          . "Guests: $guests\n"
          . "Check-in Date: $date\n"
          . "Destination: $destination\n";

    // Send confirmation to company
    mail($to, $subject, $body, $headers);

    // Send auto-reply to the user
    $user_subject = "Thank you for your reservation";
    $user_body = "Hi $name,\n\nThank you for booking with La Dérive Travel. A representative will contact you shortly.\n\nBest regards,\nLa Dérive Travel";
    $user_headers = "From: sales@laderivetravel.com\r\n";

    mail($email, $user_subject, $user_body, $user_headers);

    header("Location: thank-you.html"); // optional redirect
    exit();
}
?>
