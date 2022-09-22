<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;
class CreateTicket extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $date;
    public $dataCreateTicket;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $data, $timezone)
    {
        $this->user = $user;
        $this->dataCreateTicket = $data;
        $this->date = Carbon::now()->copy()->tz($timezone)->format('F j, Y h:i A');
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()
    {
        return $this->subject('PayHiram Support Center')->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))->view('email.createTicket');
    }
}
