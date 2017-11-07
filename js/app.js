$(document).ready(function(){
    var step = 0,
        rotate = {
        transform: "rotateY(180deg)",
        backgroundColor:"#02b3e4"
        },
        backRotate = {
        transform: "rotateY(0deg)",
        backgroundColor:"#2e3d49"
        },
        clickedCard = [];
    //初始化页面
    init();

    //初始化按钮点击后初始化页面
    $(".restart").on("click",function () {
        init();
    })

    //排名弹窗确定按钮，点击后初始化页面
    $("#info-bottom").on("click",function () {
        init();
    })
    //卡片点击事件
    $(".card").click(function(){
        //判断点击的卡片是否为已经匹配成功的
        if($(this).hasClass("match")){
            return false
        }
        //根据点击展开后的卡片数量判断是否执行比较
        if($(".open").length==0){
            clickedCard.push($(this).find("i").attr("class"));
            $(this).css(rotate).addClass("open");
            step++;
            $(".moves").text(step);
        }else if($(".open").length==1){
            clickedCard.push($(this).find("i").attr("class"));            
            $(this).css(rotate).addClass("open");
            step++;
            $(".moves").text(step);          
            setTimeout(compare,400);
        }else{
            return false;
        }
        //星星等级，小于20步为三星，20-30为两星，30-40为一星，大于40为0颗星
        if(step<20){

        }else  if(step>=20&&step<30){
            $(".fa-star").eq(2).hide()
        }else  if(step>=30&&step<40){
            $(".fa-star").eq(1).hide()
        }else {
            $(".fa-star").eq(0).hide()
        }
    });


    //比较函数，根据类名判断是否为同一图标
    function compare(){
        if(clickedCard[0]==clickedCard[1]){
            $(".open").css("backgroundColor","#02ccba").addClass("match").removeClass("open");
            clickedCard =[];
            if($(".match").length==16){
                complete()
            }
        }else{
            $(".open").css(backRotate).removeClass("open");
            clickedCard =[];
        }
    }

    //完成后弹出得分榜，得分榜数据从localshortage中获得
    function complete() {
        var rankArr =[],
            rankStr = null;
        if(!localStorage.rank){
            rankArr.push(step)
            localStorage.rank=rankArr;
        }else if(localStorage.rank.split(",").length<5){
            rankArr=localStorage.rank.split(",");
            rankArr.push(step);
            rankArr=rankArr.map(function (t) { return Number(t) })
            rankArr.sort();
            localStorage.rank=rankArr;
        }else {
            rankArr=localStorage.rank.split(",");
            rankArr.push(step);
            rankArr=rankArr.map(function (t) { return Number(t) })
            rankArr.sort();
            rankArr.splice(5,1);
            localStorage.rank=rankArr
        }
        $(rankArr).each(function (k,v) {

            rankStr +="<li><span>"+k+" .</span><span>"+v+"步</span></li>"
        })
        $("#info-record ul").html(rankStr)
        $("#mask").css("display","block")
    }
    //初始化函数
    function init(){
        step=0;
        clickedCard=[];
        shuffle($(".card i"))
        $("#mask").css("display","none");
    }

    //把一组元素的类名随机重新排列
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex].className;
            array[currentIndex].className = array[randomIndex].className;
            array[randomIndex].className = temporaryValue;
        }

        return array;
    }
  });