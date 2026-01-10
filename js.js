function initSlider(sliderElem) {
    const slidesContainer = sliderElem.querySelector(".slides");
    const slides = slidesContainer.querySelectorAll(".slide");

    let nowSlide = 0;
    const swipeThreshold = 50; 
    let startX = 0;
    let startY = 0;
    let isHorizontal = false;

    function showSlide(index) {
        const slideWidth = sliderElem.clientWidth;
        slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function touchStart(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        isHorizontal = false;
    }

    function touchMove(e) {
        const currentX = e.touches[0].pageX;
        const currentY = e.touches[0].pageY;

        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);

        if (diffX > 5 || diffY > 5) {
            if (diffX > diffY) {
                isHorizontal = true;
            }
        }

        if (isHorizontal) {
            if (e.cancelable) e.preventDefault();
        }
    }

    function touchEnd(e) {
        if (!isHorizontal) return;

        const endX = e.changedTouches[0].pageX;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && nowSlide < slides.length - 1) nowSlide++;
            else if (diff < 0 && nowSlide > 0) nowSlide--;
        }

        showSlide(nowSlide);
    }

    function touchCancel() {
        showSlide(nowSlide);
    }

    slidesContainer.addEventListener("touchstart", touchStart, { passive: true });
    slidesContainer.addEventListener("touchmove", touchMove, { passive: false });
    slidesContainer.addEventListener("touchend", touchEnd, { passive: true });
    slidesContainer.addEventListener("touchcancel", touchCancel, { passive: true });
    
    window.addEventListener("resize", () => showSlide(nowSlide));
    
    showSlide(nowSlide);
}
console.log("text");

document.querySelectorAll(".slider").forEach(initSlider);
