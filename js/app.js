/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

$(document).ready(function(){
    var step = null;
    var rotate = {
        transform: "rotateY(180deg)",
        backgroundColor:"#02b3e4"
    };
    var backRotate = {
        transform: "rotateY(0deg)",
        backgroundColor:"#2e3d49"
    };
    
    var clickedCard = [];
    //卡片点击事件
    $(".card").click(function(){
        //判断点击的卡片是否为已经匹配成功的
        if($(this).hasClass("match")){
            return false
        }


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
        
        //TODO 根据步数改变星数
    });


    //比较函数，根据类名判断是否为同一图标
    function compare(){
        if(clickedCard[0]==clickedCard[1]){
            $(".open").css("backgroundColor","#02ccba").addClass("match").removeClass("open");
            clickedCard =[];
            if($(".match").length==16){
                //TODO 成功弹窗
                alert("sucess")
            }
        }else{
            $(".open").css(backRotate).removeClass("open");
            clickedCard =[]
            
        }
    }

    //初始化函数
    function init(){

    }
   
    //日志打印函数
    function log(name,obj){
        console.log(name)
        console.log(obj)
    }
  });