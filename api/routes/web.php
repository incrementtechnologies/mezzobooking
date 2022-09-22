<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
$route = env('PACKAGE_ROUTE', '');
Route::get('/', function () {
    return "heel";//view('welcome');
});
/*
  Accessing uploaded files
*/
Route::get($route.'/storage/profiles/{filename}', function ($filename)
{
    $path = storage_path('/app/profiles/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});
Route::get($route.'/storage/logo/{filename}', function ($filename)
{
    $path = storage_path('/app/logos/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

Route::get('/cache', function () {
    $exitCode = Artisan::call('config:cache');
    return 'hey'.$exitCode;

    //
});
Route::get('/clear', function () {
    $exitCode = Artisan::call('config:cache');
    return 'hey'.$exitCode;

    //
});
Route::get('/migrate', function () {
    $exitCode = Artisan::call('migrate');
    return 'hey'.$exitCode;

    //
});

/* Authentication Router */
$route = env('PACKAGE_ROUTE', '').'/authenticate';
Route::resource($route, 'AuthenticateController', ['only' => ['index']]);
Route::post($route, 'AuthenticateController@authenticate');
Route::post($route.'/user', 'AuthenticateController@getAuthenticatedUser');
Route::post($route.'/social-user', 'AuthenticateController@getSocialAuthenticatedUser');
Route::post($route.'/refresh', 'AuthenticateController@refreshToken');
Route::post($route.'/invalidate', 'AuthenticateController@deauthenticate');
Route::post($route.'/auth', function () {
    return true;
});

// Google Place
$route = env('PACKAGE_ROUTE', '').'/google_places/';
$controller = 'GooglePlaceController@';
Route::post($route.'search', $controller."search");

//Emails Controller
$route = env('PACKAGE_ROUTE', '').'/emails';
Route::post($route.'/create', "EmailController@create");
Route::post($route.'/retrieve', "EmailController@retrieve");
Route::post($route.'/update', "EmailController@update");
Route::post($route.'/delete', "EmailController@delete");
Route::post($route.'/reset_password', 'EmailController@resetPassword');
Route::post($route.'/verification', 'EmailController@verification');
Route::post($route.'/changed_password', 'EmailController@changedPassword');
Route::post($route.'/referral', 'EmailController@referral');
Route::post($route.'/trial', 'EmailController@trial');
Route::post($route.'/test_sms', 'EmailController@testSMS');
Route::post($route.'/test_temp', 'EmailController@sendTempPassword');

//Notification Settings Controller
$route = env('PACKAGE_ROUTE', '').'/notification_settings/';
$controller = 'NotificationSettingController@';
Route::post($route.'create', $controller."create");
Route::post($route.'retrieve', $controller."retrieve");
Route::post($route.'update_otp', $controller."generateOTP");
Route::post($route.'block_account', $controller."blockedAccount");
Route::post($route.'update', $controller."update");
Route::post($route.'delete', $controller."delete");
Route::get($route.'test', $controller.'test');

// Payments
$route = env('PACKAGE_ROUTE', '').'/payments/';
$controller = 'PaymentController@';
Route::post($route.'create', $controller."create");
Route::post($route.'retrieve', $controller."retrieve");
Route::post($route.'delete', $controller."delete");
Route::post($route.'update', $controller."update");

// TestController
$route = env('PACKAGE_ROUTE', '').'/testing/';
$controller = 'TestController@';
Route::get($route.'testing', $controller."testing");
Route::post($route.'create', $controller."create");
Route::post($route.'retrieve', $controller."retrieve");
Route::post($route.'delete', $controller."delete");
Route::post($route.'update', $controller."update");

// Account Card Controller
$route = env('PACKAGE_ROUTE', '').'/transfer_charges/';  
$controller = 'TransferChargeController@';
Route::post($route.'create', $controller."create");
Route::post($route.'retrieve', $controller."retrieve");
Route::post($route.'update', $controller."update");
Route::post($route.'delete', $controller."delete");

//Coupon Controller
$route = env('PACKAGE_ROUTE', '').'/room_coupon/';
$controller = 'CouponController@';
Route::post($route.'create', $controller."create");
Route::post($route.'retrieve', $controller."retrieve");
Route::post($route.'apply', $controller."apply");
Route::post($route.'retrieve_coupon', $controller."retrieveCoupon");
Route::post($route.'retrieve_general_sale', $controller."retrieveGeneralSale");
Route::post($route.'retrieve_by_reservation', $controller."retrieveByReservation");
Route::post($route.'validate', $controller."retrieveByValidation");
Route::post($route.'delete', $controller."delete");
Route::post($route.'update', $controller."update");


//Google Places Controller
$route = env('PACKAGE_ROUTE', '').'/google_places/';
$controller = 'GooglePlaceController@';
Route::post($route.'search', $controller."search");


//CommmentMember Controller
$route = env('PACKAGE_ROUTE', '').'/comment_members/';
$controller = 'CommentMemberController@';
Route::post($route.'create', $controller."create");


//Social Controller
$route = env('PACKAGE_ROUTE', '').'/social/';
$controller = 'SocialController@';
Route::post($route.'social-user', $controller.'getSocialAuthenticatedUser');

//Room Controller
$route = env('PACKAGE_ROUTE', '').'/customers/';
$controller = 'CustomerController@';
Route::post($route.'create', $controller.'create');
Route::post($route.'retrieve', $controller.'retrieve');
Route::post($route.'update', $controller.'update');
Route::post($route.'delete', $controller.'delete');


//Room Controller
$route = env('PACKAGE_ROUTE', '').'/dashboards/';
$controller = 'DashboardController@';
Route::post($route.'create', $controller.'create');
Route::post($route.'retrieve', $controller.'retrieve');
