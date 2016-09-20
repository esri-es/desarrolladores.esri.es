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

$(".enroll-btn").click(function(e){
  // Open modal
  document.getElementById('enrollCourse').click();
});

$(".js-modal .js-modal-toggle").click(function(e){
  var modal = $(this).data("click");
  if(modal){
    document.getElementById(modal).click();
  }
});

$(document).ready(function(){
  $('.video-index tbody tr').each(function(i, elem){
    //debugger;
    var el = $(elem).children()[0];

    $(el).parent().attr("data-seconds", parseToSeconds($(el).text()));
  });

  $('.video-index tbody tr').click(function(){
    player.seekTo($(this).data("seconds"));
  });

  $("#prev").click(function(){
    var el = $(".side-nav .is-active")[0];
    var prev = $(el).prev();
    if(!prev.attr("href")){
      prev = $(prev).prev();
    }
    redirect(prev.attr("href"));
  });
  $("#next").click(function(){
    var el = $(".side-nav .is-active")[0];
    var next = $(el).next();
    if(!next.attr("href")){
      next = $(next).next();
    }
    redirect(next.attr("href"));
  });

  function redirect(slug){
    var a=window.location.href.split("/")
    a.pop()
    a.push(slug)
    window.location= a.join("/");
  }

});
