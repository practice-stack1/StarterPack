(function(){
  let de = document.documentElement;
  let event = new CustomEvent("changedevice");


  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
          //
      } else {
          de.classList.add('safari');
      }
  }


  function calc() {
      //max screen width
      let msw = getComputedStyle(de).getPropertyValue('--msw');

      msw = parseInt(getComputedStyle(de).getPropertyValue('--msw'),10);
      var w = de.clientWidth;
      var c = msw;
      var wiw = window.innerWidth;

      if(w < msw) c = w;
      de.style.setProperty('--screenWidth', w + 'px');
      de.style.setProperty('--container', c + 'px');
      de.style.setProperty('--content', c - parseInt(getComputedStyle(de).getPropertyValue('--mainPadding'),10)*2 + 'px');

      let ev = 0;
      switch(true){
          case wiw < 375:
              setClass('mob', 'small');
              break;
          case wiw >= 375 && wiw < 480:
              setClass('mob', 'normal');
              break;
          case wiw >= 480 && wiw < 768:
              setClass('mob', 'large');
              break;
          case wiw >= 768 && wiw < 1025:
              setClass('mob', 'tablet');
              break;
          case wiw >= 1025 && wiw < 1280:
              setClass('desk', 'small');
              break;
          case wiw >= 1280 && wiw < 1440:
              setClass('desk', 'normal');
              break;
          case wiw >= 1440:
              setClass('desk', 'big');
              break;
      }

      function setClass(mode, type){
          if(mode == 'mob') {
              de.classList.remove('d_desktop');
              de.classList.remove('v_big_desktop');
              de.classList.remove('v_norm_desktop');
              de.classList.remove('v_small_desktop');

              de.classList.add('d_mobile');

              if(type != 'small') {
                  de.classList.remove('v_small_mobile');
              }else{
                  de.classList.add('v_small_mobile');
              }

              if(type != 'normal') {
                  de.classList.remove('v_norm_mobile');
              }else{
                  de.classList.add('v_norm_mobile');
              }

              if(type != 'large') {
                  de.classList.remove('v_large_mobile');
              }else{
                  de.classList.add('v_large_mobile');
              }

              if(type != 'tablet') {
                  de.classList.remove('v_tablet');
              }else{
                  de.classList.add('v_tablet');
              }
          }

          if(mode == 'desk') {
              de.classList.remove('d_mobile');
              de.classList.remove('v_small_mobile');
              de.classList.remove('v_norm_mobile');
              de.classList.remove('v_large_mobile');
              de.classList.remove('v_tablet');

              de.classList.add('d_desktop');

              if(type == 'small') {
                  de.classList.add('v_small_desktop');
              }else{
                  de.classList.remove('v_small_desktop');
              }

              if(type == 'normal') {
                  de.classList.add('v_norm_desktop');
              }else{
                  de.classList.remove('v_norm_desktop');
              }

              if(type == 'big') {
                  de.classList.add('v_big_desktop');
              }else{
                  de.classList.remove('v_big_desktop');
              }
          }
      }

      if(ev) de.dispatchEvent(event);
  }

  const OSdefinition = {
      init() {
          let userDeviceArray = [
              {device: 'Android', platform: /Android/},
              {device: 'iPhone', platform: /iPhone/},
              {device: 'iPad', platform: /iPad/},
              {device: 'Symbian', platform: /Symbian/},
              {device: 'Windows Phone', platform: /Windows Phone/},
              {device: 'Tablet OS', platform: /Tablet OS/},
              {device: 'Linux', platform: /Linux/},
              {device: 'Windows', platform: /Windows NT/},
              {device: 'Macintosh', platform: /Macintosh/}
          ];

          let platform = navigator.userAgent;

          function getPlatform() {
              for (let i in userDeviceArray) {
                  if (userDeviceArray[i].platform.test(platform)) {
                      return userDeviceArray[i].device;
                  }
              }
              return 'Неизвестная платформа!' + platform;
          }

          let p = getPlatform();


          if(p == 'Android') {
              de.classList.add('android');
          } else if(p == 'iPhone' || p == 'iPad') {
              de.classList.add('ios');
          } else if(p == 'Macintosh') {
              de.classList.add('macintosh');
          }
      }
  }
  OSdefinition.init();

  de.addEventListener('refresh', function(e) {calc()});
  window.addEventListener('resize', function(e) {calc()}, false);
  document.addEventListener("DOMContentLoaded", calc);
  calc();


  if('ontouchstart' in de)
      de.classList.add('touch');
  else
      de.classList.add('no-touch');

})();