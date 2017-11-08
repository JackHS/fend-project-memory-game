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
        clickedCard = [],
        hour = 0,
        min = 0,
        sec = 0,
        timeInterv = null;
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
        if(!timeInterv){
            timeInterv = setInterval(timer,1000);
        }
        //判断点击的卡片是否为已经匹配成功的
        if($(this).hasClass("match")){
            return false
        }
        //根据点击展开后的卡片数量判断是否执行比较
        if($(".open").length==0){
            clickedCard.push($(this).find("i").attr("class"));
            $(this).css(rotate).addClass("open");
            $(".moves").text(step);
        }else if($(".open").length==1&&!$(this).hasClass("open")){
            clickedCard.push($(this).find("i").attr("class"));            
            $(this).css(rotate).addClass("open");
            step++;
            $(".moves").text(step);          
            setTimeout(compare,400);
        }else{
            return false;
        }
        //星星等级，小于16步为三星，16-28为两星,大于28为1颗星
        if(step>=16&&step<28){
            $(".stars .fa-star").eq(2).hide()
        }else  if(step>=28){
            $(".stars .fa-star").eq(1).hide()
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
            rankStr = "";
        clearInterval(timeInterv);
        timeInterv = null;
        if(!localStorage.rank){
            rankArr.push(step)
            localStorage.rank=rankArr;
        }else if(localStorage.rank.split(",").length<5){
            rankArr=localStorage.rank.split(",");
            rankArr.push(step);
            rankArr=rankArr.map(Number)
            rankArr.sort(function(x,y){
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            localStorage.rank=rankArr;
        }else {
            rankArr=localStorage.rank.split(",");
            rankArr.push(step);
            rankArr=rankArr.map(Number)
            rankArr.sort(function(x,y){
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            rankArr.splice(5,1);
            localStorage.rank=rankArr
        }
        $(rankArr).each(function (k,v) {
            var rankNum = k+1;
            rankStr +="<li><span>"+rankNum+" .</span><span>"+v+"步</span></li>"
        })
        if(step>=16&&step<28){
            $(".record-stars .fa-star").eq(2).hide()
        }else  if(step>=28){
            $(".record-stars .fa-star").eq(2).hide()
            $(".record-stars .fa-star").eq(1).hide()
        }
        $(".record-time").text($(".timer").text())
        $("#info-record ul").html(rankStr)
        $("#mask").css("display","block")
    }
    //初始化函数
    function init(){
        step=0;
        clickedCard=[];
        sec = 0;
        min = 0;
        hour = 0;
        shuffle($(".card i"));
        clearInterval(timeInterv);
        timeInterv = null;
        $(".timer").text("00:00:00")
        $(".fa-star").show();
        $(".moves").text(step);
        $("#mask").css("display","none");
        $(".open").css(backRotate).removeClass("open");
        $(".match").css(backRotate).removeClass("match");
    }

    //计时器
    function timer(){
        var h, m,s;
        sec++
        if(sec==60){
            min++
            sec=0
        }
        if(min==60){
            hour++
            min=0
        }
        h = hour<10?('0'+hour):(''+hour);
        m = min<10?(':0'+min):(':'+min);
        s = sec<10?(':0'+sec):(':'+sec);
        $(".timer").text("耗时:"+h+m+s)
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