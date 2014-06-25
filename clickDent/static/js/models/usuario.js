clickDent.Models.Usuario = Backbone.Model.extend({
	validate: function(attrs, options) {
		if (attrs.val == 'login'){
	    	if(!attrs.password || !attrs.username){
	    		return "Faltan llenar campos";
	    	}
	    }else{
			if (this.changed.username != undefined && attrs.username.length < 3)
	     			return "usuario es demasiado corto (3)";
			if (this.changed.email != undefined && !validarEmail(attrs.email))
		     		return "correo es invalido";
			if (this.changed.password != undefined && attrs.password.length < 6) 
		     		return "password muy corto (6)";
			if (this.changed.password2 != undefined && attrs.password != attrs.password2) 
		     		return "password diferentes";    
		    if (attrs.val == 0){
		    	if(!attrs.password || !attrs.password2 || !attrs.email || !attrs.username)
		    		return "Faltan llenar campos";
		    }
	    }
  	}
});