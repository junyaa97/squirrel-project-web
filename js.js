function initSlider(sliderElem){
    const slidesContainer = sliderElem.querySelector(".slides");
    const slides = slidesContainer.querySelectorAll(".slide");  // slides = список, который содержит все элементы с классом slide

    let nowSlide = 0;
    const swipe = 50;  //how much px to scroll
    let startX = 0;
 
    function showSlide(index){
        const slideWidth = slidesContainer.clientWidth;  //команда
        slidesContainer.style.transform = `translateX(-${index*slideWidth}px)`;  //шаблонная строка
    }

    function touchStart(touch){
        startX = touch.touches[0].pageX;
    }
    function touchEnd(touch){
        const endX = touch.changedTouches[0].pageX;  //координаты по x касание
        const diff = startX - endX;
        if(Math.abs(diff) < swipe) return;  //return = выход из func

        if(diff > 0 && nowSlide < slides.length-1){
            nowSlide++;
        }
        else if(diff < 0 && nowSlide > 0){  //иначе -
            nowSlide--;
        }
        showSlide (nowSlide);
    }
    slidesContainer.addEventListener("touchstart", touchStart, {passive:true});
    slidesContainer.addEventListener("touchend", touchEnd, {passive:true});  //события активации
    
    showSlide (nowSlide);
}
document.querySelectorAll(".slider").forEach(initSlider);

const quiz = document.querySelector(".quiz");
const questions = document.querySelectorAll(".question");
let questionNumber = 0;
let points = 0;

function nextQuestion(){
    questions [questionNumber].style.display = "none";
    questionNumber++;
    questions [questionNumber].style.display = "block";
}
function checkAnswer(event){
    const clicked = event.target;
    const check = clicked.getAttribute("data-answer");
    if (check === "true"){
        points++;
        clicked.style.backgroundColor = "green";
    }
    else{
        clicked.style.backgroundColor = "red";
    }
    setTimeout (nextQuestion, 800);
}
quiz.addEventListener("click", checkAnswer);