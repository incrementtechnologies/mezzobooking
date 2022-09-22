<?php

use Illuminate\Database\Seeder;
use Increment\Common\Payload\Models\Payload;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //   DB:: table('modules') -> insert(array(
      //   array('id' => 1, 'parent_id' => 0,  'description'=>'Dashboard', 'icon' => 'fa fa-tachometer', 'path' => 'dashboard', 'rank' => 1),
      //   array('id' => 2, 'parent_id' => 0,  'description'=>'Form Management', 'icon' => 'fa fa-address-card-o', 'path' => 'queue_form_management', 'rank' => 2),
      //   array('id' => 3, 'parent_id' => 0,  'description'=>'Counter', 'icon' => 'fa fa-bell',  'path' => 'counter', 'rank' => 3),
      //   array('id' => 4, 'parent_id' => 0,  'description'=>'Account Management', 'icon' => 'fa fa-users',  'path' => 'account_management', 'rank' => 4)
      // ));
      $lastId = Payload::orderBy('created_at', 'desc')->first();
      DB:: table('payloads') -> insert(array(
        array('id' => $lastId === null ? 1 : $lastId['id'] + 1,  'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Store Payments",
          "description" =>  "<p>Manage your store payments with PayHiram’s store payment management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/store_payments"
          )
        ))),
        array('id' => $lastId === null ? 2 : $lastId['id'] + 2, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Salary Management",
          "description" =>  "<p>Automate the salary of your employees with PayHiram’s salary management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/salary_management"
          )
        ))),
        array('id' => $lastId === null ? 3 : $lastId['id'] + 3, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Transportations",
          "description" =>  "<p>Go with cashless fare and manage your own transportation business and your team.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/transportations"
          )
        ))),
        array('id' => $lastId === null ? 4 : $lastId['id'] + 4, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Remittance",
          "description" =>  "<p>Go with cashless fare and manage your own transportation business and your team.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/remittances"
          )
        ))),
        array('id' => $lastId === null ? 5 : $lastId['id'] + 5, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Withdrawals",
          "description" =>  "<p>Manage your store payments with PayHiram’s store payment management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/withdrawals"
          )
        ))),
        array('id' => $lastId === null ? 6 : $lastId['id'] + 6, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Cash Ins",
          "description" =>  "<p>Automate the salary of your employees with PayHiram’s salary management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/cashins"
          )
        ))),
        array('id' => $lastId === null ? 7 : $lastId['id'] + 7, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Lending(Coming soon)",
          "description" =>  "<p>Go with cashless fare and manage your own transportation business and your team.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/lending"
          )
        ))),
        array('id' => $lastId === null ? 8 : $lastId['id'] + 8, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Cryptocurrency(Coming soon)",
          "description" =>  "<p>Go with cashless fare and manage your own transportation business and your team.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/cryptocurrency"
          )
        ))),
        array('id' => $lastId === null ? 9 : $lastId['id'] + 9, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Invoices Selling(Coming soon)",
          "description" =>  "<p>Manage your store payments with PayHiram’s store payment management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/invoice_selling"
          )
        ))),
        array('id' => $lastId === null ? 10 : $lastId['id'] + 10, 'account_id' => 1, 'payload'=>'subscription', 'payload_value' => json_encode(array(
          "title" => "Developers(Coming soon)",
          "description" =>  "<p>Manage your store payments with PayHiram’s store payment management system.</p><p>Subscribe your account now!</p>",
          "btn" => array(
            "title" => "Subscribe",
            "style" => "btn-secondary",
            "route"=> "/feature/developers"
          )
        )) )
      ));
    }
}
