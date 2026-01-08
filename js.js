function initSlider(sliderElem) {
    const slidesContainer = sliderElem.querySelector(".slides");
    const slides = slidesContainer.querySelectorAll(".slide");

    let nowSlide = 0;
    const swipe = 50;
    let startX = 0;

    function showSlide(index) {
        const slideWidth = sliderElem.clientWidth;
        console.log(sliderElem.clientWidth)
        slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function touchStart(e) {
        startX = e.touches[0].pageX;
    }

    function touchEnd(e) {
        const endX = e.changedTouches[0].pageX;
        const diff = startX - endX;
        if (Math.abs(diff) < swipe) return;

        if (diff > 0 && nowSlide < slides.length - 1) nowSlide++;
        else if (diff < 0 && nowSlide > 0) nowSlide--;

        showSlide(nowSlide);
    }

    slidesContainer.addEventListener("touchstart", touchStart, { passive: true });
    slidesContainer.addEventListener("touchend", touchEnd, { passive: true });
    
    showSlide(nowSlide);
}
document.querySelectorAll(".slider").forEach(initSlider);

const quiz = document.querySelector(".quiz");
const questions = document.querySelectorAll(".question");
let questionNumber = 0;
let points = 0;  

const result = document.querySelector(".result");

function nextQuestion() {
  questions[questionNumber].style.display = "none";
  questionNumber++;

  if (questionNumber < questions.length) {
    questions[questionNumber].style.display = "block";
  } else {
    result.style.display = "block";
  }
}

function checkAnswer(event){
    const clicked = event.target.closest('.option');
    
    if (!clicked) return;

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

const navBox = document.querySelector(".nav_box");
const menu = document.querySelector(".menu");
function openMenu(){
    navBox.style.right = "0";
}
menu.addEventListener("click", openMenu);
function closeMenu(event){
    if (event.target.classList.contains("link") || event.target.classList.contains("closeImg")){  //закрытие по клику на ссылку или кнопку закрытия
        navBox.style.right = "-100%";
    }
}
navBox.addEventListener("click", closeMenu);

const navTitle = document.querySelector('.nav-title');
const navSub = document.querySelector('.nav-sub');

if (navTitle && navSub) {
  navTitle.addEventListener('click', () => {
    navSub.classList.toggle('open');
  });
}
