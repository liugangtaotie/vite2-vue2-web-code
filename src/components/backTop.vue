<template>
    <section class="backTop">
        <article id="shape">
            <aside class="shapeColor">
                <div class="shapeFly"></div>
            </aside>
        </article>
    </section>
</template>
<script>
    export default {
        mounted () {
            var x = $(window);
            var e = $("#shape");
            var scrollbar = x.scrollTop();
            var isClick = 0;
            // (scrollbar<=0)?($("#shape").hide()):($("#shape").show());
            $(window).scroll(function(){
                scrollbar = x.scrollTop();
                (scrollbar <= 50) ? ($("#shape").hide()):($("#shape").show());
            })

            $("#shape").hover(()=>{
                $(".shapeColor").show()
            },()=>{
                $(".shapeColor").hide()
            })
            
            $(".shapeColor").click(()=>{
                $(".shapeFly").show();
                $("html,body").animate({scrollTop: 0},"slow");
                $("#shape").delay("200").animate({marginTop:"-1000px"},"slow",function(){
                    $("#shape").css("margin-top","-125px");
                    $(".shapeFly").hide();
                });
            })
        }
    }
</script>
<style>
  #shape {
    position: fixed;
    top: 80%;
    right: -35px;
    z-index: 12;
    display: block;
    width: 149px;
    height: 250px;
    margin: -125px 0 0;
    overflow: hidden;
    cursor: pointer;
    background: url("../assets/img/backTop/rocket.png") no-repeat scroll 0 0  transparent;
    border-color: red;
  }

  #shape .shapeColor {
    position: absolute;
    z-index: 11;
    display: none;
    width: 149px;
    height: 250px;
    overflow: hidden;
    background: url("../assets/img/backTop/rocket.png") no-repeat scroll -149px 0;
  }

  #shape .shapeColor .shapeFly {
    position: absolute;
    z-index: 10;
    display: none;
    width: 149px;
    height: 250px;
    overflow: hidden;
    background: url("../assets/img/backTop/rocketFly.gif") no-repeat;
  }
</style>

