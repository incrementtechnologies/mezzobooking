<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Increment\Finance\Models\Ledger;
use App\Summary;
use Carbon\Carbon;

class SummarySender implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $temp = Ledger::select('id', 'account_id')->get();
        $ledgers = $temp->groupBy('account_id');
        $currDate = Carbon::now();
        if(sizeOf($ledgers) > 0){
            foreach($ledgers as $key => $value){
                $exist = Summary::where('account_id', '=', $key)->orderBy('end_date', 'desc')->first();
                if($exist !== null){
                    if($exist['end_date'] === $currDate->toDateString()){
                        $params = array(
                            'account_id' => $item['account_id'],
                            'payload' => 'ledger',
                            'payload_value' => $value[$key]['id'],
                            'start_date' => $exist['end_date'],
                            'end_date' => $currDate->subDays(30)->toDateString(),
                            'status' => 'send'
                        );
                        Summary::create($params);
                    }
                }else{
                    $params = array(
                        'account_id' => $key,
                        'payload' => 'ledger',
                        'payload_value' => $value[$key]['id'],
                        'start_date' => $currDate,
                        'end_date' => $currDate->subDays(30)->toDateString(),
                        'status' => 'send'
                    );
                    Summary::create($params);
                }
            }
        }
    }
}
