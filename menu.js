//mobile menu style switcher
jQuery(document).ready(function() {
	jQuery('.toggle-button').click(function(e) {
		jQuery(this).toggleClass('active');
		jQuery('.site-menu ul').toggleClass('active');

		e.preventDefault();
	});
});
