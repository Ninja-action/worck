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
                overflow: hidden;
            }
            .game{
                width:100%;
                cursor: pointer;                
            }
            .conteiner{
                width:100%;
                float: left;
            }
            .info{
                color:#fff;
            }
            .comments{
                float: right;
                //width:400px;
                height: 500px;
                overflow: scroll;
            }
            .clear{
                clear: both;
            }
        </style>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript" src="buzz.min.js"></script>
        <script type="text/javascript" src="jquery.keyboard.js"></script>
        <script src="pixi.js"></script>   
        <script src="box2d.min.js"></script>

        <script src="classes/fons.js"></script>
        <script src="classes/player.js"></script>

        <script src="objects/level_1.js"></script>


        <script src="myminigame.js"></script>

    </head>

    <body>
        <!--        <div class="comments">
                     Put this script tag to the <head> of your page 
                    <script type="text/javascript" src="//vk.com/js/api/openapi.js?116"></script>
        
                    <script type="text/javascript">
                        VK.init({apiId: 4736921, onlyWidgets: true});
                    </script>
        
                     Put this div tag to the place, where the Comments block will be 
                    <div id="vk_comments"></div>
                    <script type="text/javascript">
                        VK.Widgets.Comments("vk_comments", {limit: 5, width: "400", attach: "*"});
                    </script>
                </div>-->
        <div class="conteiner">
            <div  class="game">
            </div>
            <div class="info">
                <button id="stop">Вырубить музыку</button>
                <button id="play">Врубить музыку</button>
                <p>Влево: A или стрелка</p>
                <p>Вправо: D или стрелка</p>
                <p>Удар: V</p>
                <p>Присесть: С</p>
                <p>Кувырок: X</p>
                <p>Забраться на стену: Space</p>
            </div>
        </div>
        <div class="clear"></div>


        <a target="_blank" href="http://www.youtube.com/id22066662">Ссылка на канал автора=)</a>



    </body>
</html>