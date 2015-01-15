$(function() {
	clickDent.app = new clickDent.Router();
})
.ajaxStart(function() {
 	$("#cargando").show(); 
})
.ajaxStop(function() {
	$("#cargando").hide();
	app.Views.menuView.establearAncho();
});
