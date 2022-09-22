<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class Ledger extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $title;
    public $date;
    public $transactionId;
    public $emailSubject;
    public $details;
    public $data;
    public $senderCode;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $details, $subject, $timezone)
    {
        $this->user = $user;
        $this->title = $details['broadcast_message'];
        $this->transactionId = $details['code'];
        $this->emailSubject = $subject;
        $this->details = $details['details'];
        $this->senderCode = substr($this->details['account']['code'], 24);
        $this->data = $details;
        $this->date = Carbon::now()->copy()->tz($timezone)->format('F j, Y h:i A');
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->subject($this->emailSubject)->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.ledger');
    }
}
