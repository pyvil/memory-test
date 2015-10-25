<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">

    <link rel="stylesheet" href="css/common.css" >

    <script src = "http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>
    <script src="js/howler.min.js"></script>
    <script src = "js/common.js"></script>
    <script>
        <?
            $images = scandir("img/test");
            $arr = [];
            foreach($images as $img) {
                if ($img[0] != '.')
                    $arr[] = "'img/test/{$img}'";
            }
        ?>
        $(document).ready(function () {
            $(document).ready(function () {
                var test = new Test({
                    images : [<?=implode(',', $arr)?>],
                });
            });
        });
    </script>
</head>
<body>

<div class="container">
    <div class="header clearfix">
        <nav>
            <ul class="nav nav-pills pull-right">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">About</a></li>
                <li role="presentation"><a href="#">Contact</a></li>
            </ul>
        </nav>
        <h3 class="text-muted">Memory</h3>
    </div>

    <h1>Memory test</h1>
    <!--<p><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>-->
    <div id="pyvil_level_container">
        <p class="lead">Choose one of the levels you see below</p>
        <div class="pyvil_level_list list-group"></div>
    </div>
    <div id="pyvil_remember_container">
        <p class="lead">You have to remember images below</p>
        <div class="pyvil_remember_list"></div>
        <a class="btn btn-primary start-test" href="javascript:void(0)">Go!</a>
    </div>
    <div id="pyvil_images_container">
        <p class="lead">Find images you've seen <span class="label label-default img-left"></span></p>
        <div class="pyvil_images_list"></div>
    </div>

    <div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">Congratulation!</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <p class="col-md-6">Yeah! You do it!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <footer class="footer">
        <p>&copy; Memory-test 2015 - All rights reserved</p>
    </footer>

</body>
</html>