<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <!-- Latest compiled and minified CSS -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">-->

    <!-- Optional theme -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">-->

    <link rel="stylesheet" href="css/common.css" >

    <script src = "http://code.jquery.com/jquery-latest.min.js"></script>
    <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>-->
    <script src="js/howler.min.js"></script>
    <script src = "js/Helper.js"></script>
    <script src = "js/Modal.js"></script>
    <script src = "js/common.js"></script>
    <script>
        <?php
            $images = scandir("img/test/svg/");
            $arr = array();
            foreach($images as $img) {
                if (($img[0] != '.') && (count(explode('.', $img)) > 1))
                    $arr[] = "'img/test/svg/{$img}'";
            }
        ?>
        $(document).ready(function () {
            var test = new Test({
                images : [<?php echo implode(',', $arr)?>],
            });
        });
    </script>
</head>
<body id="levels">
<div id="pyvil_level_container">
    <div class="pyvil_level_list"></div>
    <div class="level_list_bg">
        <img src="img/levels.png" alt="">
    </div>
</div>
<div id="pyvil_remember_container">
    <p class="lead levelPrev">observe those items</p>
    <div class="pyvil_remember_list container"></div>
    <a class="start-test" href="javascript:void(0)">ok</a>
</div>
<div id="pyvil_images_container">
    <p class="lead allItems">find items from the previous screen</p>
    <div class="pyvil_images_list container"></div>
</div>
</body>
</html>