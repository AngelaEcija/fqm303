(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/Users/AEcija/Documents/webs/fqm303/src/js/main":[function(require,module,exports){
function activeClass(url) {
  var urlWithoutSlash = url.split("grupos/FQM-303/");
  $("nav")
    .find("a[href='" + urlWithoutSlash[1] + "']")
    .parent()
    .addClass("active");
}

function openMod(id) {
  $(id).openModal();
}

$(function() {
  $(".modal").modal({
    dismisable: true
  });

  $("nav").load("components/header.html", function() {
    activeClass(window.location.pathname);
    $(".button-collapse").sideNav();
  });

  $("footer").load("components/footer.html");

  if (window.location.pathname.indexOf("instrumentation") >= 0) {
    /*
     * jQuery Succinct plugin
     * Version 1.1.0 (October 2014)
     */
    !(function(a) {
      "use strict";
      a.fn.succinct = function(b) {
        var c = a.extend({ size: 240, omission: "...", ignore: !0 }, b);
        return this.each(function() {
          var b,
            d,
            e = a(this),
            f = /[!-\/:-@\[-`{-~]$/,
            g = function() {
              e.each(function() {
                (b = a(this).html()),
                  b.length > c.size &&
                    ((d = a
                      .trim(b)
                      .substring(0, c.size)
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")),
                    c.ignore && (d = d.replace(f, "")),
                    a(this).html(d + c.omission));
              });
            };
          g();
        });
      };
    })(jQuery);

    $(".ellipsis-short").succinct({
      size: 190
    });
  }

  $(".card-action a").click(function() {
    var id = $(this).attr("href");
    openMod(id);
  });

  $(".miniatura").click(function() {
    $(".imgGaleria")[0].src = this.src;
    $(".pGaleria").text(this.title);
  });
});

},{}]},{},["/Users/AEcija/Documents/webs/fqm303/src/js/main"]);
