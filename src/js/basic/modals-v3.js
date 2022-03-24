//! метод для взаємодії із усіма модальними вікнами на сайті
const modals = () => {
  let btnPressed = false;
  function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false, closeClickOverlay = true) {
    //! для оптимізації коду ми в метод передаватимемо посилання на необхідні селектори, а в методі знаходитимемо їх
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          window = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if(e.target){
          e.preventDefault();
        }

        if(destroy) { //! елемент, який провокує виклик модального вікна видаляється, якщо ми на нього клікаємо
          item.remove();
        }

        btnPressed = true; //! дає нам знати, що користувач не нажав по жодній із кнопок із модальними вікнами

        window.forEach(item => { //! метод для закриття усіх модальних вікон навипадок наявності двох послідовно відкриваємих модальних вікон
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn'); //? добавляємо класи із анімацією
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener('click', () => {

      window.forEach(item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeOut');
      });

      modal.style.display ="none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      // document.body.classList.remove('modal-open');
    });

    //? закриття вікна при кліку на затемнений фон
    modal.addEventListener('click', (e) => {
      if(e.target === modal && closeClickOverlay) { //! клікаємо на підлошку для модального вікна для закриття і забороняємо це робити при виконанні певних операцій в

        window.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeDown');
        });

        modal.style.display ="none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        // document.body.classList.remove('modal-open');
      }
    });
  }

  function showModalByTime(selector, time){
    setTimeout(function() {
      let display;

      //! перевірку чи відкриті сторонні вікна при відкритті поточного
      document.querySelectorAll('[data-modal]').forEach(item => {
        if(getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if(!display) { //! якщо в даний момент жодне вікно не показується, дане вікно покажеться
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  //! фіксить пошарпування відображення модального вікна через зникнення скролу
  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  //? мето для відкриття модалки по сролу до кінця сторінки
  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); //! визначення висоти сторніки для нових і старших браузерів
      if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight + 1>= scrollHeight)) {
          document.querySelector(selector).click();
      }
    });
  }


  bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true); //? при передачі 4 параметра ми видаляємо елемент, який є трігером
  openByScroll('.fixed-gift');

  showModalByTime('.popup-consultation', 60000);
}

export default modals;