(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/rteran/Documents/webs/fqm303/src/js/main":[function(require,module,exports){
function activeClass(url) {
	var urlWithoutSlash = url.slice(1);
	$("nav").find("a[href='" + urlWithoutSlash + "']").parent().addClass('active');
}

$(function(){
	$( "nav" ).load( "components/header.html", function(){
		activeClass(window.location.pathname);
	} );

	$( "footer" ).load( "components/footer.html");
});

$(".button-collapse").sideNav();

},{}]},{},["/Users/rteran/Documents/webs/fqm303/src/js/main"]);
