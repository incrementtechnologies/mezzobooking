<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class PreVerifyEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $date;
    public $code;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email, $code, $timezone)
    {
        $this->email = $email;
        $this->date = Carbon::now()->copy()->tz($timezone)->format('F j, Y h:i A');
        $this->code = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Email address verification')->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.preverifyemail');
    }
}
