<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- BootStrap -->
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            .btn {
                margin-top: 40px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height"  id="app">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                        <a href="{{ route('logout') }}">Logout</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif

            <div class="content">
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif
                <div class="title m-b-md">
                    Laravel
                </div>

                <div class="links">
                    <a href="https://laravel.com/docs">Documentation</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
                <form action="/test" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="submit" value="Pusher Test" name="btn" class="btn btn-primary">
                </form>
                <form action="/pusher/test" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="my-channel" value="private-my-channel">
                    <input type="hidden" name="socket_id" value="" id="socketId">
                    <input type="submit" value="Pusher Private Test" name="btn" class="btn btn-primary">
                </form>
                <div class="container">
                    <div class="row">
                        <ul id="messages" class="list-group">
                        </ul>
                    </div>
                </div>

            </div>




        </div>

        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="{{ mix('/js/app.js') }}"></script>

        <script src="https://js.pusher.com/3.1/pusher.min.js"></script>
        <script>
            //instantiate a Pusher object with our Credential's key
            var pusher = new Pusher('bd49390d7cfc438fb299', {
                cluster: 'eu',
                encrypted: true
            });
            pusher.connection.bind('connected', function() {
                socketId = pusher.connection.socket_id;
                var element = document.getElementById("socketId");
                element.value = socketId;
            });

//
//            //Subscribe to the channel we specified in our Laravel Event
//            var channel = pusher.subscribe('private-my-channel');
//
//            //Bind a function to a Event (the full Laravel class)
//            channel.bind('App\\Events\\MessageSent', addMessage);
//
//            function addMessage(data) {
//                var listItem = $("<li class='list-group-item'></li>");
//                listItem.html(data.answer);
//                console.log(data);
//                $('#messages').prepend(listItem);
//            }
        </script>
    </body>
</html>
