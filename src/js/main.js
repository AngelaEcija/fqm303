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
