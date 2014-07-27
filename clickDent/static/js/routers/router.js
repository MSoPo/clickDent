clickDent.Router = Backbone.Router.extend({
	routes: {
    "home/": "home",
    "paciente/": "agregarPaciente",
    'configuracion/': 'configuracion',
    'miperfil/' : 'miperfil',
    'tratamientos/' : 'tratamientos',
    'cita/' : 'cita',
  },

  initialize: function () {
    app.Collections.pacientes = new clickDent.Collections.Pacientes();
    app.Collections.pacientes.fetch({ data: {} ,
      success:function(data){
        console.log("Pacientes obtenidos");
      }
    });

    app.Views.popup = new clickDent.Views.Popup();
	  app.Views.menuView = new clickDent.Views.Menu();
    app.Collections.medicos = new clickDent.Collections.Medicos();
    app.Collections.medicos.fetch({ data: { usuario: '1', format: 'json'} ,
      success:function(data){
        app.Models.medico = app.Collections.medicos.at(0);
      }
    });
  	Backbone.history.start();
  },

  home: function () {
  	self = this;
  	console.log('HOme');
    var html = $('#interaccion').load('/home/', function(data){
		app.Views.menuView.establearAncho();
		app.Views.home = new clickDent.Views.Home();
	});
	
  },

  agregarPaciente: function() {
  	self = this;
  	$('#interaccion').load('/paciente/', function(data){
		app.Views.menuView.establearAncho();
		var paciente = new clickDent.Models.Paciente();
		app.Views.pacienteView = new clickDent.Views.Paciente({model : paciente});
	});
	
  },

  configuracion: function(){
    self = this;
    $('#interaccion').load('/configuracion/', function(data){
      app.Views.menuView.establearAncho();
      app.Views.configuracionView = new clickDent.Views.Configuracion({ model : app.Models.medico });
    });

  },

  miperfil : function(){
    self = this;
    $('#interaccion').load('/miperfil/', function(data){
      app.Views.menuView.establearAncho();
      app.Views.miperfilView = new clickDent.Views.Miperfil();
    });

  },

  tratamientos : function(){
    self = this;
    $('#interaccion').load('/tratamientos/', function(data){
      app.Views.menuView.establearAncho();
      app.Collections.precioTratamientos = new clickDent.Collections.PrecioTratamientos();
      app.Views.tratamientosView = new clickDent.Views.Tratamientos({ collection : app.Collections.precioTratamientos });
    });

  },

  cita : function() {
    self = this;
    app.Views.popup.render('popup-cita-template');
    app.Views.popup.cargarPacientes();
  },

});
