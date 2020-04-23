let moveNum = 0;
let timerAautoplay;

const defaultSliderSettings = {
    slideWidth: 300,
    slideHeight: '',
    maxSlide: 1,
    loop: true,
    autoplay: true,
    timeout: 3000,
    navs: true,
    transitionDelay: 800,
    dots: true
}

let arraySlider = document.querySelectorAll('.lesuorac_slider');

arraySlider.forEach(slider => {
    slider.slider = function (sliderSettings = {}) {

        for (key in defaultSliderSettings)
            if (sliderSettings[key] === undefined)
                sliderSettings[key] = defaultSliderSettings[key];

        const slidesOffset = sliderSettings.slideWidth /* * sliderSettings.maxSlide*/;

        createSlider(this, sliderSettings);

        let nextSlideBtn = slider.querySelector('.next_slide');
        let prevSlideBtn = slider.querySelector('.prev_slide');

        nextSlideBtn.addEventListener('click', nextSlideClick);
        prevSlideBtn.addEventListener('click', prevSlideClick);

        if (!sliderSettings.navs) {
            this.querySelector('.navs').remove();
            sliderSettings.loop = true;
            sliderSettings.autoplay = true;
        }

        if (sliderSettings.autoplay) {
            sliderSettings.loop = true;
            timerAautoplay = setInterval(() => nextSlideClick(), sliderSettings.timeout);
        }

        let slides = this.querySelectorAll('div.one_slide');
        let slideCount = slides.length;

        let counter = 0;

        let innerContainer = slider.querySelector('.inner_container');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function firstSlide() {
            let curSlides = slider.querySelectorAll('div.one_slide');
            return curSlides[0];
        }

        function lastSlide() {
            let curSlides = slider.querySelectorAll('div.one_slide');
            return curSlides[curSlides.length - 1];
        }

        function nextSlideClick(event) {
            if (event != undefined) event.preventDefault();                

            if (!sliderSettings.loop && counter >= slideCount - sliderSettings.maxSlide) {
                //nextSlideBtn.classList.add('disabled');
                return;
            }

            if (sliderSettings.loop && counter >= slideCount - 1) {
                counter = -1;
            }

            counter++;
            //console.log(counter);

            innerContainer.innerHTML = innerContainer.innerHTML + '\n' + firstSlide().outerHTML;

            innerContainer.classList.remove('no_transition');
            nextSlideBtn.classList.add('no_click');

            innerContainer.style.transform = `translate(${-slidesOffset}px, 0)`;

            setTimeout(() => {
                innerContainer.classList.add('no_transition');
                firstSlide().remove();
                innerContainer.style.transform = `translate(0, 0)`;
                nextSlideBtn.classList.remove('no_click');
            }, sliderSettings.transitionDelay);
        }

        function prevSlideClick(event) {
            if (event != undefined) event.preventDefault();

            if (counter <= 0)
                if (sliderSettings.loop === false) {
                    return;
                } else {
                    counter = slideCount;
                }
            counter--;
            //console.log(counter);

            innerContainer.classList.add('no_transition');
            innerContainer.innerHTML = lastSlide().outerHTML + '\n' + innerContainer.innerHTML;
            innerContainer.style.transform = `translate(${-slidesOffset}px, 0)`;

            setTimeout(() => {
                innerContainer.classList.remove('no_transition');

                prevSlideBtn.classList.add('no_click');

                innerContainer.style.transform = `translate(0, 0)`;

                setTimeout(() => {
                    lastSlide().remove();
                    prevSlideBtn.classList.remove('no_click');
                }, sliderSettings.transitionDelay);
            });

        }
    }
});

function createSlider(slider, sliderSettings) {

    let oneSlideArr = slider.querySelectorAll('div');
    oneSlideArr.forEach(item => {
        item.classList.add('one_slide');
        item.style.width = `${sliderSettings.slideWidth}px`;
        item.style.height = `${sliderSettings.slideHeight}px`;
    });

    slider.innerHTML = `
        <div class="outer_container">
            <div class="inner_container">
                ${slider.innerHTML}
            </div>
        </div>
        <div class="navs">
            <a href="#" class="prev_slide"><</a>
            <a href="#" class="next_slide">></a>
        </div>
    `;

    let outerContainer = slider.querySelector('.outer_container');
    outerContainer.style.width = `${sliderSettings.slideWidth * sliderSettings.maxSlide}px`;
    let innerContainer = slider.querySelector('.inner_container');
    innerContainer.style.width = `${sliderSettings.slideWidth * (oneSlideArr.length) + sliderSettings.slideWidth}px`;

    innerContainer.style.transition = `transform ${sliderSettings.transitionDelay}ms`;
}