function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false
    else
    	return true
}

function formToModel(form, model, nomenclatura, attri){
    var atrAnterios;
	for (var atr in model.attributes ){
    atrAnterios = atr;
        if (attri && nomenclatura){
            if($.inArray(atr,attri) != -1)
                atr = (nomenclatura ? (nomenclatura + "-") : "") + atr ;

        }else if(nomenclatura){
            atr = (nomenclatura ? (nomenclatura + "-") : "") + atr ;
        }

        
        var val = "";
		var valor =  form.find('input[name=' + (atr) + ']');
		if(valor.attr('type') == 'radio'){
			valor = form.find('input[name=' + atr + ']:checked');
		}
		if(valor.length == 0){
			valor = form.find('select[name=' + atr + ']')
		}
		if(valor.length == 0){
			valor = form.find('textarea[name=' + atr + ']')
		}
        if(valor.length == 0){
            valor = form.find('textarea[name=' + atr + ']')
        }
		if(valor.attr('type') == 'checkbox'){
            valor = form.find('input[name=' + atr + ']:checked').each(function (index) {
             val += $(this).val() + ',';
            });
        }

        if(val || valor.val())
			model.set(atrAnterios,val ? val : valor.val());
	}

	return model;
}

function modelToForm(form, model){

    for (var atr in model.attributes ){     

        form.find('input[name=' + (atr) + ']').val(model.get(atr));

    }
        
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendAuthentication (xhr) {
	var csrftoken = getCookie('csrftoken');
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
}