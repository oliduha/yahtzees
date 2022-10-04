// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.

/**
 * The form attribute can be used to associate a submit button with a form, even
 * if the button is not a child of the <form> itself.
 * 
 * This polyfill uses a support check taken from Modernizr and polyfills the
 * functionality using jQuery.
 */
(function() {
    // Via Modernizr
    function formAttributeSupport() {
        var form = document.createElement( "form" ),
            input = document.createElement( "input" ),
            div = document.createElement( "div" ),
            id = "formtest"+ ( new Date().getTime() ),
            attr,
            bool = false;
        
            form.id = id;
        
        // IE6/7 confuses the form idl attribute and the form content attribute
        if ( document.createAttribute ) {
            attr = document.createAttribute("form");
            attr.nodeValue = id;
            input.setAttributeNode(attr);
            div.appendChild(form);
            div.appendChild(input);
        
            document.documentElement.appendChild(div);
        
            bool = form.elements.length === 1 && input.form == form;
        
            div.parentNode.removeChild(div);
        }
        
        return bool;
    };
    
    if ( !formAttributeSupport() ) {
        $( document )
            .on( "click", "[type=submit][form]", function( event ) {
                event.preventDefault();
                var formId = $( this ).attr( "form" ),
                $form = $( "#" + formId ).submit();
            })
            .on( "keypress", "form input", function( event ) {
                var $form;
                if ( event.keyCode == 13 ) {
                    $form = $( this ).parents( "form" );
                    if ( $form.find( "[type=submit]" ).length == 0 &&
                        $( "[type=submit][form=" + $( this ).attr( "form" ) + "]" ).length > 0 ) {
                        $form.submit();
                    }
                }
            });
    }
}());