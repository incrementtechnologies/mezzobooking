<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ThankYou extends Mailable
{
    use Queueable, SerializesModels;
    public $data;
    public $ubject;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($params, $subject)
    {
        $this->data = $params;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Cancelled Bookin')->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.myBookingUpdate');
    }
}
