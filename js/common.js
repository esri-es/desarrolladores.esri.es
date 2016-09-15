$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top-100)
        }, 1000);
        return false;
      }
    }
  });

  if(!localStorage.acceptedTos){
    $('#tos').show();
    $('#tos').addClass('animate-fade-in')
  }
  $('#tos .icon-ui-close').click(function(){
    $('#tos').hide();
    localStorage.acceptedTos = true;
  });
});
