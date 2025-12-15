const buttonPrev = document.getElementById("butPrev");
const buttonNext = document.getElementById("butNext");
const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides")
// slides = список, который содержит все элементы с классом slide
let nowSlide = 0;
function showSlide(index){
   const slideWidth = slidesContainer.clientWidth;  //команда
   slidesContainer.style.transform = `translateX(-${index*slideWidth}px)`;  //шаблонная строка
}

showSlide(nowSlide)
function nextSlide(){
    if(nowSlide < slides.length-1){     //если текущий слайд меньше, чем длина списка(кол-во элементов) -1
        nowSlide++;
    }

    showSlide(nowSlide);
    // краткая форма записи
}

function prevSlide(){
    if(nowSlide > 0){
        nowSlide--;
    } 

    showSlide(nowSlide);
}

buttonNext.addEventListener("click", nextSlide);
buttonPrev.addEventListener("click", prevSlide);
