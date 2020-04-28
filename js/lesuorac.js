const defaultSliderSettings = {
    slideWidth: 300,
    slideHeight: '',
    maxSlide: 1,
    loop: true,
    autoplay: true,
    timeout: 3000,
    navs: true,
    transitionDelay: 800,
    dots: true,
    stopOnHover: true,
    margin: 10
}

let arraySlider = document.querySelectorAll('.lesuorac_slider');

arraySlider.forEach(slider => {
    slider.timerAautoplay = undefined;

    slider.slider = function (sliderSettings = {}, slideActive = 0) {
        stopAutoPlay();

        for (key in defaultSliderSettings)
            if (sliderSettings[key] === undefined)
                sliderSettings[key] = defaultSliderSettings[key];

        const slidesOffset = sliderSettings.slideWidth + sliderSettings.margin /* * sliderSettings.maxSlide*/;

        createSlider(slider, sliderSettings);

        let nextSlideBtn = slider.querySelector('.next_slide');
        let prevSlideBtn = slider.querySelector('.prev_slide');
        let navs = slider.querySelector('.navs');
        let dotsBlock = slider.querySelector('.dots_block');


        nextSlideBtn.addEventListener('click', nextSlideClick);
        prevSlideBtn.addEventListener('click', prevSlideClick);

        if (!sliderSettings.navs) {
            navs.remove();
            sliderSettings.loop = true;
            sliderSettings.autoplay = true;
        } else {
            if (sliderSettings.dots) {
                setActiveDot(0);

                dotsBlock.addEventListener('click', (event) => {
                    event.preventDefault();

                    if (event.target.tagName == 'A') {
                        let numSlide = event.target.dataset.numSlide;
                        dotSlideClick(numSlide);
                    }
                });
            }
        }

        startAutoPlay();

        let innerContainer = slider.querySelector('.inner_container');

        if (sliderSettings.stopOnHover && sliderSettings.autoplay) {
            innerContainer.addEventListener('mouseover', stopAutoPlay);
            innerContainer.addEventListener('mouseout', () => { startAutoPlay(sliderSettings.transitionDelay) });
        }

        let slides = slider.querySelectorAll('div.one_slide');
        let slideCount = slides.length;
        let counter = 0;

        if (slideActive !== 0) {
            nextSlideClick(undefined, slideActive);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function startAutoPlay(timeout = sliderSettings.timeout) {
            if (sliderSettings.autoplay) {
                sliderSettings.loop = true;
                slider.timerAautoplay = setInterval(() => nextSlideClick(), timeout);
            }
        }

        function stopAutoPlay() {
            if (slider.timerAautoplay !== undefined)
                clearInterval(slider.timerAautoplay);
        }

        function firstSlide() {
            let curSlides = slider.querySelectorAll('div.one_slide');
            return curSlides[0];
        }

        function lastSlide() {
            let curSlides = slider.querySelectorAll('div.one_slide');
            return curSlides[curSlides.length - 1];
        }

        function getSlide(numSlide) {
            let curSlides = slider.querySelectorAll('div.one_slide');
            return curSlides[numSlide];
        }

        function getSlideCount() {
            return slider.querySelectorAll('div.one_slide').length;
        }

        function dotSlideClick(numClickSlide) {
            console.log('counter=', counter, ' click=', numClickSlide);
            if (numClickSlide > counter) {
                nextSlideClick(undefined, numClickSlide - counter);
            }

            if (numClickSlide < counter) {
                prevSlideClick(undefined, counter - numClickSlide);
            }
        }

        function setActiveDot(numDot) {
            for (const dotIt of dotsBlock.children) {
                dotIt.classList.remove('active');
            }

            dotsBlock.children[numDot].classList.add('active');
        }

        function nextSlideClick(event, numMoveSlides = 1) {
            if (event != undefined) event.preventDefault();

            if (!sliderSettings.loop && counter >= slideCount - sliderSettings.maxSlide) {
                return;
            }

            if (sliderSettings.loop && counter >= slideCount - 1) {
                counter = -1;
            }

            counter += numMoveSlides;
            if( sliderSettings.dots )
                setActiveDot(counter);

            stopAutoPlay();

            for (let i = 0; i < numMoveSlides; i++) {
                innerContainer.innerHTML += '\n' + getSlide(i).outerHTML;
            }

            innerContainer.classList.remove('no_transition');
            navs.classList.add('no_click');

            innerContainer.style.transform = `translate(${-slidesOffset * numMoveSlides}px, 0)`;

            setTimeout(() => {
                innerContainer.classList.add('no_transition');

                for (let i = 0; i < numMoveSlides; i++) {
                    firstSlide().remove();
                }

                innerContainer.style.transform = `translate(0, 0)`;
                navs.classList.remove('no_click');
            }, sliderSettings.transitionDelay);

            startAutoPlay();
        }

        function prevSlideClick(event, numMoveSlides = 1) {
            if (event != undefined) event.preventDefault();

            if (counter <= 0)
                if (sliderSettings.loop === false) {
                    return;
                } else {
                    counter = slideCount;
                }
            counter -= numMoveSlides

            if (sliderSettings.dots)
                setActiveDot(counter);

            stopAutoPlay();

            innerContainer.classList.add('no_transition');

            for (let i = 0; i < numMoveSlides; i++) {
                innerContainer.innerHTML = getSlide(getSlideCount() - i - 1).outerHTML + '\n' + innerContainer.innerHTML;
            }

            innerContainer.style.transform = `translate(${-slidesOffset * numMoveSlides}px, 0)`;

            setTimeout(() => {
                innerContainer.classList.remove('no_transition');
                navs.classList.add('no_click');
                innerContainer.style.transform = `translate(0, 0)`;

                setTimeout(() => {
                    for (let i = 0; i < numMoveSlides; i++) {
                        lastSlide().remove();
                    }
                    navs.classList.remove('no_click');
                }, sliderSettings.transitionDelay);
            });

            startAutoPlay();
        }
    }
});


function createSlider(slider, sliderSettings) {

    let oneSlideArr = slider.querySelectorAll('div');
    oneSlideArr.forEach(item => {
        item.classList.add('one_slide');
        item.style.width = `${sliderSettings.slideWidth}px`;
        item.style.height = `${sliderSettings.slideHeight}px`;
        item.style.marginRight = `${sliderSettings.margin}px`;
    });

    slider.innerHTML = `
        <div class="outer_container">
            <div class="inner_container">
                ${slider.innerHTML}
            </div>
        </div>
        <div class="navs">
            <a href="#" class="prev_slide"><</a>
            ${ sliderSettings.dots ? createDots() : ''}
            <a href="#" class="next_slide">></a>
        </div>
    `;

    let outerContainer = slider.querySelector('.outer_container');
    outerContainer.style.width = `${sliderSettings.slideWidth * sliderSettings.maxSlide}px`;
    let innerContainer = slider.querySelector('.inner_container');
    innerContainer.style.width = `${(sliderSettings.slideWidth * oneSlideArr.length + sliderSettings.margin) * 2}px`;

    innerContainer.style.transition = `transform ${sliderSettings.transitionDelay}ms`;

    function createDots() {
        let dotBlock = '';

        for (let i = 0; i < oneSlideArr.length; i++) {
            dotBlock += `<a href="#" class="dot" data-num-slide="${i}"></a>\n`
        }

        return `
            <div class="dots_block">
            ${dotBlock}
            </div>
        `;
    }
}