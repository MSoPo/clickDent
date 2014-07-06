function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false
    else
    	return true
}

function formToModel(form, model){
	for (var atr in model.attributes ){
		var valor =  form.find('input[name=' + atr + ']');
		if(valor.attr('type') == 'radio'){
			valor = form.find('input[name=' + atr + ']:checked');
		}
		if(valor.length == 0){
			valor = form.find('select[name=' + atr + ']')
		}
		model.set(atr,valor.val());
	}

	return model;
}