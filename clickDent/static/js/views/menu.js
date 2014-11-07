clickDent.Views.Menu = Backbone.View.extend({
	el: $('#clickDent'),

	altoMenu: 0,

	events: {
		'click #btn-menu' : 'toogleMenu',
		'click #cerrar-menu' : 'toogleMenu',
		'click .itemMenu' : 'redireccionar',
		'click #agregarCita' : 'agregarCita',
				////VALIDACIONES DE FORMULARIOS////
		'blur .alfanumerico' : 'validarAlfanumerico',
		'blur .alfanumericonor' : 'validarAlfanumericoNoRequerido',
		'blur .validatelefono' : 'validarTelefono',
		'blur .validaCorreo' : 'validaCorreo',
		'blur .validaFecha' : 'validaFecha',
		'blur .validaCP' : 'validaCP',
		'blur .campoRequerido' : 'validaCampoRequerido',
		'blur .validaMoneda' : 'validaMoneda',
	},

	initialize: function() {
		console.log('Inicializada la vista del menu');
		this.altoMenu = $('#menu').height();
		templateSelect = _.template($('#option-template').html());
		templateEscuela = _.template($('#formacion-template').html());
		templateTratamiento = _.template($('#tratamientos-template').html());
		templatePaciente = _.template($('#optionList-template').html());
		templatePrincipal = _.template($('#principal-template').html());
		templateCalendario = _.template($('#calendario-template').html()); 
		templatePagos = _.template($('#pagos-template').html());
		templateBuscaPacienete = _.template($('#busca-pacientes-template').html());
		templateConsultarDatosPac = _.template($('#consultar-datospac-template').html());
		templateConsultarCitasPac = _.template($('#consultar-citas-template').html());
		templateConsultarTratamientosPac = _.template($('#consultar-tratamientos-template').html());
		templateCitasPendientes = _.template($('#cita-pendientes-template').html());
		templateDetallePagos = _.template($('#detalle-pagos-template').html());
		this.establearAncho();
	},

	render: function() {

	},

	toogleMenu: function() {
		console.log('click toogleMenu');
		var visibleBoton = $('#btn-menu').is(":visible");
		var visibleCerrar = $('#cerrar-menu').is(":visible");

		if(visibleBoton && !visibleCerrar){
			$('#menu').show();
			$('#btn-menu').hide();
		}else if(!visibleBoton && visibleCerrar){
			$('#menu').hide();
			$('#btn-menu').show();
		}
	},

	redireccionar: function(ev) {
		console.log('click redireccionar');
		var objEvento = $(ev.toElement);
		$('.itemMenu').removeClass('seleccion');
		objEvento.addClass('seleccion');
		this.toogleMenu();
		this.redireccionarRouter(objEvento.attr('id'));
	},

	establearAncho: function (){
		var heightMenu = this.altoMenu;
		var heightInteraccion = $('#interaccion').height();

		var heightContenido = heightInteraccion + 50;

		console.log(heightContenido);

		if (heightMenu > heightContenido){
			$('#contenido').height(heightMenu);
			$('#menu').height(heightMenu);
			$('#backpopup').height(heightMenu);
		}else{
			$('#menu').height(heightContenido);
			$('#backpopup').height(heightContenido);
		}
	},

	redireccionarRouter: function (id){

		if(id=='configuracion'){
			clickDent.app.navigate('configuracion/', {trigger : true });
			window.scroll(0,0)
		}else if(id=='miperfil'){
			clickDent.app.navigate('miperfil/', {trigger : true });
			window.scroll(0,0)
		}else if(id=='tratamientos'){
			clickDent.app.navigate('tratamientos/', {trigger : true });
			window.scroll(0,0)
		}else if(id=='pagos'){
			clickDent.app.navigate('pagos/', {trigger : true});
			window.scroll(0,0)
		}else if(id=='paciente'){
			clickDent.app.navigate('paciente/', {trigger : true});
			window.scroll(0,0)
		}else if(id=='calendario'){
			clickDent.app.navigate('calendario/', {trigger : true});
			window.scroll(0,0)
		}else if(id=='inicio'){
			clickDent.app.navigate('home/', {trigger : true});
			window.scroll(0,0)
		}else if(id=='buscarPaciente'){
			clickDent.app.navigate('buscarPaciente/', {trigger : true})
			window.scroll(0,0)
		}else if(id=='receta'){
			clickDent.app.navigate('receta/', {trigger : true})
			window.scroll(0,0)
		}

	},

	agregarCita: function () {
		app.Views.popup.render('popup-cita-template', 'cita');
		app.Views.popup.cargarPacientes();
	},

	validarAlfanumerico: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = toTitleCase($.trim(valor));
		if(validaAlfanumerico(valor) && validaRequerido(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	},

	validarAlfanumericoNoRequerido: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = toTitleCase($.trim(valor));
		if(validaAlfanumerico(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	},

	validarTelefono: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		if(validaTelefono(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
		
	},

	validaCorreo: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		if(validaCorreo(valor) && validaRequerido(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	},

	validaFecha: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		valor = valor.replace("/", "-").replace("/", "-");
		valor = valor.replace(".", "-").replace(".", "-");
		if(validaFecha(valor) && validaRequerido(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	},

	validaMoneda: function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		if(!valor){
			valor = "$0.00"
		}else{
			if(!isNaN(valor) && valor.indexOf(".") == -1){
				if(valor.length > 3){
					valor = valor.substring(0,valor.length-3) + "," + valor.substring((valor.length), (valor.length-3));
				}
				valor = "$" + valor + ".00"
			}

			if(valor.indexOf(".") == -1){
				valor = valor + ".00"
			}

			if(valor.indexOf("$") == -1){
				valor = "$" + valor;
			}
		}

		if(validaMoneda(valor) && validaRequerido(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
		
	},

	validaCP : function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		if(validaCP(valor) && validaRequerido(valor)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	},

	validaCampoRequerido : function(ev){
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		if(validaRequerido(valor,2)){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}
		campo.val(valor);
	}

});