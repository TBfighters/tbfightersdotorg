//mobile menu style switcher
jQuery(document).ready(function() {
	jQuery('.toggle-button').click(function(e) {
		jQuery(this).toggleClass('active');
		jQuery('.site-menu ul').toggleClass('active');

		e.preventDefault();
	});
});

//copy to clipboard functions
function copyPost1() {
  let textarea = document.getElementById("post-1");
  textarea.select();
  document.execCommand("copy");
}
function copyPost2() {
  let textarea = document.getElementById("post-2");
  textarea.select();
  document.execCommand("copy");
}
function copyPost3() {
  let textarea = document.getElementById("post-3");
  textarea.select();
  document.execCommand("copy");
}
