(function(){
  document.body.className = document.body.className.replace('mflazyzoad-no-js', '');
  var jsSrc = 'path....'
  function loadScript(e,t){var a,n,r;n=!1,(a=document.createElement("script")).type="text/javascript",a.src=e,a.onload=a.onreadystatechange=function(){n||this.readyState&&"complete"!=this.readyState||(n=!0,t())},(r=document.getElementsByTagName("script")[0]).parentNode.insertBefore(a,r)}
  loadScript(jsSrc, function(){
      var lazyLoadConfig = {"elements_selector":"img,div","data_srcset":"originalset"};
      if (document.readyState !== 'loading') {
          var myLazyLoad = new LazyLoad(lazyLoadConfig);
          setTimeout(function(){
              new LazyLoad(lazyLoadConfig);
          }, 2000);
      } else {
          document.addEventListener("DOMContentLoaded", function() {
              var myLazyLoad = new LazyLoad(lazyLoadConfig);
              setTimeout(function(){
                  new LazyLoad(lazyLoadConfig);
              }, 2000);
          });
      }
      return true;
  });
})();