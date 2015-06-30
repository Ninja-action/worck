<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
<!--Меню-->        
         <link rel="stylesheet" type="text/css" href="css/menu.css">
         <link rel="stylesheet" type="text/css" href="css/help.css">
        <title>Ninja Action</title>
<!--Библиотеки-->        
         <script type="text/javascript" src="js/libs/jquery.min.js"></script>
         <script type="text/javascript" src="js/libs/buzz.min.js"></script>
         <script type="text/javascript" src="js/libs/jquery.keyboard.js"></script>
         <script src="js/libs/pixi.js"></script>   
         <script src="js/libs/box2d.min.js"></script>
<!--Меню-->          
         <script type="text/javascript" src="js/common/help.js"></script>>
<!--Разные-->
        <script src="classes/fons.js"></script>
        <script src="classes/player.js"></script>
<!--Уровни-->        
        <script src="js/levels/level_1.js"></script>

        <script src="myminigame.js"></script>
    </head>

    <body>
        <ul class="menu">
            <li><a id="play"><img src="images/common/muzikon.png"></a></li>
            <li><a id="stop"><img src="images/common/muzikoff.png"></a></li>    
            <li><a href="javascript:PopUpShow()"><img src="images/common/help.png"></a></li>
           <div class="b-popup" id="popup1">
               <div class="b-popup-content">
        <p>Руководство к игре</p>
        <p>Влево: A или стрелка</p>
                <p>Вправо: D или стрелка</p>
                <p>Удар: V</p>
                <p>Присесть: С</p>
                <p>Кувырок: X</p>
                <p>Забраться на стену: Space</p>
                <a href="javascript:PopUpHide()">Выход</a>
                </div>
           </div>
	    <li><a href="http://www.youtube.com/id22066662" target="_blank"><img src="images/common/youtubeicon.png"></a></li>
        </ul>

            <div  class="game"></div>
    
    </body>
</html>