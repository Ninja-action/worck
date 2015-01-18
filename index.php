<!DOCTYPE html>
<html>
    <head>
	<meta charset="utf-8" />
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
        <title>Ninja Action</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #000000;
            }
            .game{

                cursor: pointer;
            }
            .info{
                color:#fff;
            }
        </style>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script type="text/javascript" src="buzz.min.js"></script>
        <script type="text/javascript" src="jquery.keyboard.js"></script>
        <script src="pixi.js"></script>     
        <script src="myminigame.js"></script>

    </head>

    <body>
        <div  class="game"></div>
        <div class="info">
            <p>Влево: A или стрелка</p>
            <p>Вправо: D или стрелка</p>
            <p>Удар: V</p>
            <p>Присесть: С</p>
            <p>Кувырок: С+Space</p>
        </div>
        <a target="_blank" href="http://www.youtube.com/id22066662">Ссылка на канал автора=)</a>
        <div id="timer"></div>

        <div>
            <!-- Put this script tag to the <head> of your page -->
            <script type="text/javascript" src="//vk.com/js/api/openapi.js?116"></script>

            <script type="text/javascript">
                VK.init({apiId: 4736921, onlyWidgets: true});
            </script>

            <!-- Put this div tag to the place, where the Comments block will be -->
            <div id="vk_comments"></div>
            <script type="text/javascript">
                VK.Widgets.Comments("vk_comments", {limit: 20, width: "665", attach: "*"});
            </script>
        </div>
    </body>
</html>