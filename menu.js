// https://inspirationalpixels.com/creating-a-responsive-menu-with-html-css-jquery/

jQuery(document).ready(function() {
	jQuery('.toggle-button').click(function(e) {
		jQuery(this).toggleClass('active');
		jQuery('.site-menu ul').toggleClass('active');

		e.preventDefault();
	});
});