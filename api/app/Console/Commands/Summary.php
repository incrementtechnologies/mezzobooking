<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Increment\Finance\Report\Jobs\Generate;

class Summary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'summary:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        echo '[Summary Job Command] Start running ...';
        Generate::dispatch();
        echo "\n[Summary Job Command] Completed";
    }
}
