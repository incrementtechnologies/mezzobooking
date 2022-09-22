<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class TransferSender extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $code;
    public $details;
    public $subject;
    public $receiverInfo;
    public $mode;
    public $date;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $code, $details, $subject, $receiverInfo, $mode, $timezone)
    {
        $this->user = $user;
        $this->code = $code;
        $this->details = $details;
        $this->subject = $subject;
        $this->receiverInfo = $receiverInfo;
        $this->mode = $mode;
        $this->date = Carbon::now()->copy()->tz($timezone)->format('F j, Y h:i A');
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->subject($this->subject)->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.transfer_sender');
    }
}
