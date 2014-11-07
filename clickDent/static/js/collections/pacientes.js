clickDent.Collections.Pacientes = Backbone.Collection.extend({

  model: clickDent.Models.Paciente,

  url: '/api/paciente/',

  filtroNombre : function(cadena) {
    filtered = this.filter(function(paciente) {
    	var valor = false;

		valor =  paciente.get('nombre').indexOf(cadena) > -1;
		
		if(!valor) valor =  paciente.get('ape_paterno').toUpperCase().indexOf(cadena.toUpperCase()) > -1;
		if(!valor) valor =  String(paciente.get('id')).toUpperCase().indexOf(cadena.toUpperCase()) > -1;
		if(!valor) valor =  paciente.get('ape_materno').toUpperCase().indexOf(cadena.toUpperCase()) > -1;
		
		return valor;
      });
    return new clickDent.Collections.Pacientes(filtered);
  }

});