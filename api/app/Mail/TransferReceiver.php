<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class TransferReceiver extends Mailable
{
    use Queueable, SerializesModels;
    public $receiver;
    public $code;
    public $details;
    public $subject;
    public $userInfo;
    public $mode;
    public $date;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($receiver, $code, $details, $subject, $userInfo, $mode, $timezone)
    {
        $this->receiver = $receiver;
        $this->code = $code;
        $this->details = $details;
        $this->subject = $subject;
        $this->userInfo = $userInfo;
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
        return $this->subject($this->subject)->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.transfer_receiver');
    }
}
