clickDent.Router = Backbone.Router.extend({
	routes: {
    "home/": "home",
    "paciente/": "agregarPaciente"
  },

  initialize: function () {
  	app.Collections.pacientes = new clickDent.Collections.Pacientes();
	app.Views.menuView = new clickDent.Views.Menu();
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
	
  }

});
