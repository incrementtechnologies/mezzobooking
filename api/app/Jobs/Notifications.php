<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Events\Notifications as EventNotifications;
use App\Events\Message;
use App\Events\MessageGroup;
use App\Events\SystemNotification;
use App\Http\Controllers\FirebaseController;
use Pusher\Pusher;
use App\Jobs\Firebase;
class Notifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $type;
    public $data;
    public $pusher;
    public function __construct($type, $data)
    // public function __construct($type, $data)
    {
      $this->type = $type;
      $this->data = $data;
      new FirebaseController();
      // if(env('PUSHER_TYPE') != 'self'){
      //     $options = array(
      //         'cluster' => env('OTHER_PUSHER_CLUSTER'),
      //         'useTLS' => true
      //     );
      //     $this->pusher = new Pusher(
      //         env('OTHER_PUSHER_APP_KEY'),
      //         env('OTHER_PUSHER_APP_SECRET'),
      //         env('OTHER_PUSHER_APP_ID'),
      //         $options
      //     );
      // }
    }
    
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      if(!env('FCM')){
        // switch ($this->data['payload']) {
        switch ($this->type) {
          case 'message_group':
              broadcast(new MessageGroup($this->data));
              break;
          case 'notifications':
              broadcast(new EventNotifications($this->data));
              break;
          case 'message':
              broadcast(new Message($this->data));
              break;
          case 'system_notification':
              broadcast(new SystemNotification($this->data));
              break;
          default:
              # code...
              break;
        }            
      }else{
        $data = array(
          'topic' => env('APP_NAME').'-'.$this->data['to'],
          'data'  => array(
            'data' => json_encode($this->data)
          ),
          'notification' => array(
            'title' => ucfirst($this->data['title']),
            'body'  => $this->data['message'],
            'imageUrl' => env('APP_URL').'/storage/logo/logo.png'
          )
        );
        Firebase::dispatch($data);
      }
    }
}
