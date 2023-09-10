window.addEventListener('scroll', scrollFunc);

function scrollFunc() {
    var windowScroll = this.scrollY; 

    var $logo = document.getElementsByClassName('logo')[0];
    $logo.style.transform = 'translateY(' + windowScroll/2 + '%)';

    var $backBird = document.getElementsByClassName('back-bird')[0];
    $backBird.style.transform = 'translateY(' + windowScroll/4 + '%)';

    var $foreBird = document.getElementsByClassName('fore-bird')[0];
    $foreBird.style.transform = 'translateY(-' + windowScroll/100 + '%)';
	
	
    var $content = document.getElementsByClassName('layered-wrapper')[0];
    $content.style.transform = 'translateY(' + windowScroll/2 + '%)';

    var $crystalMiddle = document.getElementsByClassName('crystal-middle')[0];
    $crystalMiddle.style.transform = 'translateY(' + windowScroll/4 + '%)';

    var $crystalFront = document.getElementsByClassName('crystal-front')[0];
    $crystalFront.style.transform = 'translateY(-' + windowScroll/100 + '%)';


}