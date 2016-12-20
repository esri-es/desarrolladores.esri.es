


$(document).ready(function(){
  $(".maxSize2.minSize2").each(function(){
      $(this).html($(this).html().replace(/&nbsp;/gi,''));
  });

  /******************************************************
          Capturamos el envío del formulario y
          lo bloqueamos para enviar una petición
          a un servidor y guardarla
  ******************************************************/
  $("#btnSubmit").attr("onclick", "webhook(this); return false;")

  window.webhook = function(el){
    var email;
    var emptyFields = 0;
    $("#clickdimensionsForm").serializeArray().forEach(function(elem,i){
      if(!elem.value){
        console.log("Vacío", elem);
        emptyFields++;
      }
      //si es el email
      if(elem.name==="f_671a06c5a1dfe51180ee00505687613c"){
        email = elem.value;
      }
    });
    if(emptyFields>2){
      console.log("No enviar form");
      SendForm(this, "clickdimensionsForm", "Form");
    }else{
      console.log("Guardar email: ", email);
      $.post( "http://desarrolladores.esri.es/upcoming/bin/enroll.php", { email: email})
        .done(function( data ) {
          console.log(data);
          console.log("Enviar form");
          data = JSON.parse(data);
          if(!data.error){
            SendForm(el, "clickdimensionsForm", "Form");
          }else {
            alert("Se ha producido un error: " + data.response);
          }
        });

    }

    return false;
  }
});

(function($) {
  if ($.fn.style) {
    return;
  }

  // Escape regex chars with \
  var escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // For those who need them (< IE 9), add support for CSS functions
  var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
  if (!isStyleFuncSupported) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
      return this.getAttribute(a);
    };
    CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
      this.setAttribute(styleName, value);
      var priority = typeof priority != 'undefined' ? priority : '';
      if (priority != '') {
        // Add priority manually
        var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
            '(\\s*;)?', 'gmi');
        this.cssText =
            this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
      }
    };
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
      return this.removeAttribute(a);
    };
    CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
      var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
          'gmi');
      return rule.test(this.cssText) ? 'important' : '';
    }
  }

  // The style function
  $.fn.style = function(styleName, value, priority) {
    // DOM node
    var node = this.get(0);
    // Ensure we have a DOM node
    if (typeof node == 'undefined') {
      return this;
    }
    // CSSStyleDeclaration
    var style = this.get(0).style;
    // Getter/Setter
    if (typeof styleName != 'undefined') {
      if (typeof value != 'undefined') {
        // Set style property
        priority = typeof priority != 'undefined' ? priority : '';
        style.setProperty(styleName, value, priority);
        return this;
      } else {
        // Get style property
        return style.getPropertyValue(styleName);
      }
    } else {
      // Get CSSStyleDeclaration
      return style;
    }
  };
})($);

$(".clickdform.mainDiv").style("padding-left","0", "important");

//Eliminando estilos del botón de submit
$("#btnSubmit").attr("style",null);
$("#btnSubmit").addClass("btn btn-fill btn-large");
b=$($(".responsiveRow")[$(".responsiveRow").length-1]).find(">div")[0]
$($(b).find(".buttonContainer")[0]).style("margin-right",0,"important")
$(b).css("width","100%")
