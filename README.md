# lesuorac

*Carousel, but reverse*
 
### Example using

[Download](https://github.com/alexhruzd/lesuorac) and copy to the project folder.

Add to HTML in your `<body>`:

    <div class='lesuorac_slider'>
      <div><img src="..." alt=""></div>
      <div><img src="..." alt=""></div>
      <div><img src="..." alt=""></div>
    <div>
 
Just add a link to the css file in your `<head>`:

    <link rel="stylesheet" href="./lesuorac/css/lesuorac.css">
 
Then, before your closing <body> tag add:
  
    <script src="./lesuorac/js/lesuorac.js"></script>
 
  
Next, in the .JS file or in `<script></script>`, call the function to create a slider. Example:
    
    let slider = document.querySelector('.lesuorac_slider');
    slider.slider();

### Settings

To initialize the settings, use the object `sliderSettings` when calling the function `slider()`.

Exaple:

    slider.slider( sliderSettings = {
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
    });         
    
Option          | Type            |Default          |        Description                      |
:-------------: | :-------------: |:--------------: |:--------------------------------        |
slideWidth      | number          |300              | Set width slide.                        |
slideHeight     | number          |''(auto)         | Set height slide.                       |
maxSlide        | number          |1                | The number of slides that are displayed in the slider|
loop            | boolean         |true             | Enable/disable carousel mode.           |
autoplay        | boolean         |true             | Enable auto play of slides.             |
timeout         | number          |3000             | Auto play change interval.              |
navs            | boolean         |true             | Enable navigation buttons.              |
transitionDelay | number          |800              | Slide move speed                        |
dots            | boolean         |true             | Current slide indicator dots            |
stopOnHover     | boolean         |true             | Pause autoplay on hover.                |
margin          | number          | 10              | Spacing between slides                  |

### Examples of using

Gallery example:

[https://github.com/alexhruzd/gallery_lesourac](https://github.com/alexhruzd/gallery_lesourac)
