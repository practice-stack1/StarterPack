const slowmotion = (link, upSelector, topScrolling) => {
  const links = document.querySelectorAll(link);
  const upElem = document.querySelector(upSelector);


  for (let anchor of links){
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const blockID = anchor.getAttribute('href').substr(1);

          document.getElementById(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  }

  //! проявляє елемент при скролі до певної відстані
  window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > topScrolling) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });
};

export default slowmotion;