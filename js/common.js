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

  if(location.search==="?enroll=%E2%9C%93"){
    $('#enroll-success').addClass('is-active');
  }
  $("#enroll-success .alert-close").click(function(){
    $(this).parent().removeClass("is-active");
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

  function redirect(relative){
    //var tmp = window.location.href.split("/");
    //absolute(window.location.href,relative)
    /*tmp.pop();tmp.pop();
    tmp.push(slug);*/

    window.location= absolute(window.location.href,relative);
  }
  function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}

  $("#rewind").click(function(){
    player.seekTo(player.getCurrentTime()-15);
  });
  $("#forward").click(function(){
    player.seekTo(player.getCurrentTime()+15);
  });

});
