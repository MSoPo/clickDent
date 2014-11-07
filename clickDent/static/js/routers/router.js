clickDent.Router = Backbone.Router.extend({
	routes: {
    "home/": "home",
    "paciente/": "agregarPaciente",
    'configuracion/': 'configuracion',
    'miperfil/' : 'miperfil',
    'tratamientos/' : 'tratamientos',
    'calendario/' : 'calendario',
    'pagos/' : 'pagos',
    'buscarPaciente/' : 'buscarPaciente',
    'receta/' : 'receta'
  },

  initialize: function () {

    var self = this;
    app.Views.popup = new clickDent.Views.Popup();
    app.Views.pacienteView = new clickDent.Views.Paciente({model : new clickDent.Models.Paciente()});
    app.Views.tratamientosView = new clickDent.Views.Tratamientos({ collection : new clickDent.Collections.PrecioTratamientos() });
    app.Views.menuView = new clickDent.Views.Menu();
    app.Views.miperfilView = new clickDent.Views.Miperfil();
    app.Views.receta = new clickDent.Views.Receta();

    app.Collections.pacientes = new clickDent.Collections.Pacientes();
    app.Collections.citas = new clickDent.Collections.Citas();
    app.Collections.medicos = new clickDent.Collections.Medicos();


    app.Collections.medicos.fetch({ data: { } ,
      success:function(data){
        app.Models.medico = app.Collections.medicos.at(0);
        app.Views.configuracionView = new clickDent.Views.Configuracion({ model : app.Models.medico });
         app.Collections.citas.fetch({ data: {estatus : utils.constantes.estatus.confirmada, fecha : consultaDate(new Date()), ordering : '-hora_fin' } ,
            success:function(data){
              app.Views.calendario = new clickDent.Views.Calendario();
              app.Views.home = new clickDent.Views.Home();
              Backbone.history.start();
              self.navigate('home/', {trigger : true});
            }
          });

         app.Collections.pacientes.fetch({ data: { medico : app.Models.medico.get('id') } ,
            success:function(data){
              app.Views.buscarPaciente = new clickDent.Views.BuscarPaciente();
              app.Views.pagos = new clickDent.Views.Pagos();
            }
          });
      }
    });

    app.Collections.estatus = new clickDent.Collections.Estatus();
    app.Collections.estatus.fetch()

  },


  home: function () {
  	self = this;
  	console.log('HOme');
    var html = $('#interaccion').load('/home/', function(data){
  		app.Views.home.actualizarCitas();
      app.Views.menuView.establearAncho();
	   });
	
  },

  agregarPaciente: function() {
  	self = this;
  	$('#interaccion').load('/paciente/', function(data){
    app.Views.pacienteView.render();
		app.Views.menuView.establearAncho();
	});
	
  },

  configuracion: function(){
    self = this;
    $('#interaccion').load('/configuracion/', function(data){
      app.Views.configuracionView.render();
      app.Views.menuView.establearAncho();
    });

  },

  miperfil : function(){
    self = this;
    $('#interaccion').load('/miperfil/', function(data){
      app.Views.miperfilView.render();
      app.Views.menuView.establearAncho();
    });

  },

  tratamientos : function(){
    self = this;
    $('#interaccion').load('/tratamientos/', function(data){
      app.Views.tratamientosView.render();
      app.Views.menuView.establearAncho();
    });

  },

  calendario : function() {
     self = this;
    $('#interaccion').load('/calendario/', function(data){
      app.Views.calendario.render();
      app.Views.menuView.establearAncho();
    });
  },

  pagos : function() {
     self = this;
    $('#interaccion').load('/pagosPendientes/', function(data){
      app.Views.pagos.render();
      app.Views.menuView.establearAncho();
    });
  },

  buscarPaciente : function() {
    self = this;
    $('#interaccion').load('/buscarPaciente/', function(data){
      app.Views.buscarPaciente.render();
      app.Views.menuView.establearAncho();
    });
  },

  receta : function() {
    self = this;
    $('#interaccion').load('/receta/', function(data){
      app.Views.receta.render();
      app.Views.menuView.establearAncho();
    });
  }

});
