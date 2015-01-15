clickDent.Views.Configuracion = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #agregarEscuela' : "agregarEscuela",
		'click .cerraEscuela' : 'quitarEscuela',
		'change #cp' : 'consultarColonia',
		'change #colonia' : 'consultarMunicipio',
		'change #municipio' : 'consultarEstado',
		'click .configuracion #guardar' : 'guardar',
		'submit #formularioConsultorio' : 'submit',
	},

	initialize: function() {
		
		optionsConsultorio = { 
	        beforeSubmit:   function(formData, jqForm) {
							        console.log(JSON.stringify(formData));
							        return true;
							    } , 
	        success:       function(responseText, statusText)  {
							       console.log(responseText);
							    } , 
	        url:       "/actualizarConsultorio/"        
	    }; 
	},

	submit :  function() {
	  $('#formularioConsultorio').ajaxSubmit(optionsConsultorio); 
        return false; 
	},

	render: function() {
		var recordatorio = $('#recordatorio').val();
		var rec = recordatorio.split(',');
		for( var i in rec ){
			console.log(rec[i]);
			$('input[id='+ rec[i] +']').prop('checked', true);
		}
	},

	agregarEscuela: function() {
		$('#datosEscuela').append(templateEscuela);
		return false;
	},

	quitarEscuela: function (ev) {
		$( ev.target ).parent().parent().parent().remove();
		return false;
	},

		
	consultarColonia : function(){
		var cp = $('#cp').val();
		app.Collections.colonias = new clickDent.Collections.Colonias();
		app.Collections.colonias.fetch({ data: { cp: cp, format: 'json'} ,
				success:function(data){
		        	console.log('colonias actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#colonia').html(template).trigger('change');
		        }
		    });

	},

	consultarMunicipio : function(){
		var id = $('#colonia').val();
		var colonia = app.Collections.colonias.get(id);
		app.Collections.municipios = new clickDent.Collections.Municipios();
		app.Collections.municipios.fetch({ data: { id: colonia.get('municipio'), format: 'json'} ,
				success:function(data){
		        	console.log('Municipios actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#municipio').html(template).trigger('change');
		        }
		    });

	},

	consultarEstado : function(){
		var id = $('#municipio').val();
		var municipio = app.Collections.municipios.get(id);
		app.Collections.estados = new clickDent.Collections.Estados();
		app.Collections.estados.fetch({ data: { id: municipio.get('estado'), format: 'json'} ,
				success:function(data){
		        	console.log('estados actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#estado').html(template);
		        }
		    });

	},

	guardar :function() {

		if(!this.validarDatos()){
			console.log("Ocurrio error en la validacion");
			return false;
		}
		app.Models.medico = formToModel(this.$el, this.model);
		app.Models.medico.sync("update", app.Models.medico, {
  			beforeSend: sendAuthentication 
 		});

 		app.Models.configuracion = formToModel(this.$el, app.Models.configuracion, 'configuracion',  ['id']);
 		app.Collections.configuraciones = new clickDent.Collections.Configuraciones();
 		app.Collections.configuraciones.add(app.Models.configuracion);
 		app.Models.configuracion.sync("update", app.Models.configuracion, {
  			beforeSend: sendAuthentication 
 		});

 		app.Models.direccion = new clickDent.Models.Direccion();
 		app.Models.direccion = formToModel(this.$el, app.Models.direccion, 'direccion',  ['id']);
 		app.Collections.direcciones = new clickDent.Collections.Direcciones();
 		app.Collections.direcciones.add(app.Models.direccion);
 		app.Models.direccion.sync("update", app.Models.direccion, {
  			beforeSend: sendAuthentication 
 		});

 		app.Models.consultorio = formToModel(this.$el, app.Models.consultorio, 'consultorio',  ['id','nombre']);
 		app.Models.consultorio.set('direccion', app.Models.direccion.get('id'));
 		app.Collections.consultorios = new clickDent.Collections.Consultorios();
 		app.Collections.consultorios.add(app.Models.consultorio);
 		app.Models.consultorio.sync("update", app.Models.consultorio, {
  			beforeSend: sendAuthentication,
  			success: function(data){
  				console.log(data);
  				$('#formularioConsultorio').submit();
  			}
 		});

 		app.Collections.formaciones = new clickDent.Collections.Formaciones();

 		$('.datoEscuela').each(function(index, element){
	 		app.Collections.formaciones.add( {
					escuela : $(this).find('input[name=escuela]').val(),
					titulo : $(this).find('input[name=titulo]').val(),
				}
			);
 		});

 		app.Collections.formaciones.sync('create', app.Collections.formaciones, {
  			beforeSend: sendAuthentication 
 		});

 		

 		console.log(app.Collections.formaciones.toJSON());



	},

	validarDatos : function(){
		var campo = this.$el.find('input[name=nombre]');
		var resultado = true;
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val(), 2))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=ape_paterno]');
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val(), 2))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=ape_materno]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=num_cedula]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('textarea[name=declaracion]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=consultorio-nombre]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=cp]');
		if(validaCP(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=calle]');
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=num_interior]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=num_exterior]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('textarea[name=referencias]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}


		return resultado;
	},
});