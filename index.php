<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>

    <script src = "http://code.jquery.com/jquery-latest.min.js"></script>
    <script src = "js/common.js"></script>
</head>
<body>
    <?
        $images = scandir("img/test");
        foreach($images as $img) {
            if ($img[0] != '.')
                echo "<img src='img/test/{$img}'>";
        }
    ?>
</body>
</html>