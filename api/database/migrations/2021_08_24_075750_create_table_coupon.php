<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCoupon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('account_id');
            $table->string('code');
            $table->string('description');
            $table->string('currency');
            $table->string('country')->nullable();
            $table->string('locality')->nullable();
            $table->double('amount');
            $table->bigInteger('limit');
            $table->bigInteger('limit_per_customer');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('payload')->nullable();
            $table->string('payload_value')->nullable();
            $table->string('status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coupons');
    }
}
