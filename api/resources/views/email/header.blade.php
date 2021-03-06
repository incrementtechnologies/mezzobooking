<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{env('APP_NAME')}}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="{{ asset('css/all.css') }}">

    <!-- Styles -->
    <style>
        html,
        body {
            background-color: #fff;
            font-family: 'Raleway', sans-serif;
            font-weight: 100;
            backgroun-color: #000033;
            height: 100vh;
            margin: 0;
        }

        .header{
            width: 100%;
            float: left;
            min-height: 10px;
            overflow-y: hidden;
            background-color: #000033;
            padding-top: 2%;
            padding-bottom: 2%;
        
        }

        .header img {
            margin-right: auto;
            margin-left: auto;
            display: flex;
        }

        .header span {
            font-size: 40px;
            font-weight: 600;
            float: left;
        }

        .text-primary {
            color: #005b96;
        }

        .text-secondary {
            color: #005b96;
        }

        .text {
            color: #555;
            font-size: 18px;
        }

        .holder {
            width: 100%;
            float: left;
            margin-top: 25px;
            margin-bottom: 50px;
            padding-left: 2%;
        }

        .holder .thank-you-header {
            height: 100%;
            width: 100%;
            float: left;
            background: #003;
            color: #fff;
            text-align: center;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            padding-top: 2%;
            padding-bottom: 2%;
        }

        .holder .thank-you-header h1,
        .holder .thank-you-header h2 {
            width: 100%;
            float: left;
        }

        .holder .thank-you-header label {
            float: left;
            width: 100%;
        }

        .thank-you-item {
            height: 50px;
            width: 100%;
            float: left;
            line-height: 50px;
            border-bottom: solid 1px #eee;
            padding-left: 10px;
        }

        .thank-you-item label {
            width: 25%;
            float: left;
        }

        .content {
            border-bottom: solid 1px #eee;
            line-height: 50px;
            padding-left: 10px;
        }

        .button {
            width: 300px;
            height: 50px;
            background: #005b96;
            border: none;
            color: #fff;
            font-size: 16px;
            margin-top: 25px;
            margin-bottom: 25px;
            border-radius: 5px;
        }

        .button:hover {
            cursor: pointer;
        }

        .contents {
            padding-left: 2%;
        }

        .subHeader {
            font-style: italic;
            font-size: 20px;
        }

        .footer {
            width: 100%;
            margin: 25px 0 25px 0;
            border-top: solid 1px #aaa;
            text-align: center;
            float: left;
        }

        .footer label {
            margin-top: 10px;
            color: #555;
        }

        p, span {
            font-family: Avenir,Helvetica,Arial,sans-serif;
        }

        #table {
            font-family: Avenir,Helvetica,Arial,sans-serif;
            border-collapse: collapse;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        .text-secondary{
            color: #CBAB58
        }

        #table td,
        #table th {
            padding-left: 50px;
        }
        tr {
            border-bottom: 2px solid #CBAB58;
            padding-left: 20px;
        }

    </style>
</head>

<body>
    <span class="header">
        <div class="thank-you-header">
            <img src="{{env('APP_URL')}}/public/{{env('PACKAGE_ROUTE')}}/storage/logo/logo.png" height="auto" width="200px">
        </div>
    </span>