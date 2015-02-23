

<?php
//Файлы
$files = array();
if ($handle = opendir('source')) {
    while (false !== ($file = readdir($handle))) {
        if (!in_array($file, array(".", "..")))
            $files[] = $file;
    }
    closedir($handle);
}

//var_dump($files);
//Изображения
$images = array();
foreach ($files as $key => $value)
   // if (($key < 4)|| ($key >= 32))
   if (($key > 13))
        {
        $im = imagecreatefrompng('source/' . $value);
        // $im = imagealphablending($im, false);
        //  imagesavealpha($im, true);
        $images[] = $im;
    }
$width = imagesx($images[0]);
$height = imagesy($images[0]);
$length = $width * count($images);
$is = imagecreate($length, $height);
imagealphablending($is, true);

foreach ($images as $key => $value) {
    imagecopy($is, $value, $width * $key, 0, 0, 0, imagesx($value), imagesy($value));
}


//
//
//
//
//imagecopy($is, $im, 500, 0, 0, 0, imagesx($im), imagesy($im));
////header ("Content-type: image/png");
imagepng($is, 'out.png');
imagedestroy($is);
?>
<img src="out.png" alt="">