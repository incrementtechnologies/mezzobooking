<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class EmailWithPDF extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $date;
    public $subject;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $user, $data, $timezone)
    {
        $this->user = $user;
        $this->data = $data;
        $this->date = Carbon::now()->copy()->tz($timezone)->format('F j, Y h:i A');
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->subject($this->subject)->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.emailwithPdf');
    }
}
