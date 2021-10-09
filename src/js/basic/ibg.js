
document.querySelector('.wrapper').classList.add('loaded');

function ibg(){
    const ibgs = document.querySelectorAll('.ibg');
    ibgs.forEach(function(value){
        if(value.querySelector('img')){
            value.style.cssText = `background-image: url(${value.querySelector('img').getAttribute('src')})`;
        }
    });
}

ibg();