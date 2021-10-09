let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE ");
function isIE() {
	ua = navigator.userAgent;
	let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}