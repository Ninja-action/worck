<?php
if(empty($_POST)){
?>
<form action="#" method="post">
	<p><label for="">Название анимации</label><input name="AnimationName" type="text"></p>
	<p><label for="">Количество кадров</label><input name="count_frames" type="text"></p>
	<p><label for="">Ширина кадра</label><input name="width" type="text"></p>
	<p><label for="">Высота кадра</label><input name="height" type="text"></p>
	<p><label for="">Название файла</label><input name="filename" type="text"></p>
	<p><label for="">Размер файла</label><input name="file_width" type="text"><input name="file_height" type="text"></p>
	<p><input type="submit"></p>
</form>
<?php 
}else{
 $obj =  array();
 $frame = array();
 	$count_frames = $_POST['count_frames'];
	$AnimationName = $_POST['AnimationName'];
	$width = $_POST['width'];
	$height = $_POST['height'];
	$filename = $_POST['filename'];
	$file_width = $_POST['file_width'];
	$file_height = $_POST['file_height'];
	//$count_frames
	$frame_width = 0;
 for ($i=0; $i < $count_frames ; $i++) { 
 	
 	$frame[$AnimationName.$i.'.png'] =  
 (object)array(
 		'frame'=>(object)array(
 			'x'=>$frame_width, //Смещаем по X
 			'y'=>0,
 			'w'=>(int)$width,
 			'h'=>(int)$height),
 		'rotated'=>false,
 		'trimmed'=>true,
 		'spriteSourceSize'=>(object)array('x'=>0,'y'=>0,'w'=>(int)$width ,'h'=>(int)$height),
 		'sourceSize'=>(object)array('w'=>(int)$width ,'h'=>(int)$height)
 		);

 	$obj['frames'] = $frame;
 	$obj['meta'] = array(
 		'app'=>"my",
 		'version'=>"1.0",
 		'image'=>$filename,
 		'format'=>"RGBA8888",
 		'size'=>(object)array('w'=>(int)$file_width,'h'=>(int)$file_height),
 		'scale'=>'1',
 		'smartupdate'=>'$TexturePacker:SmartUpdate:2f213a6b451f9f5719773418dfe80ae8$'
 		);
 $frame_width += $width; 	
 }
 $obj = json_encode($obj);
 file_put_contents($AnimationName.'.json', $obj);
 echo '<pre>';
 print_r($obj);
echo '</pre>';

}
?>