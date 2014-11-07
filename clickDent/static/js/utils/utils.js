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
        // else if(atrAnterios != 'id' && atrAnterios != 'usuario')
        //    model.set(atrAnterios, val);
	}

	return model;
}

function modelToForm(form, model){

    for (var atr in model.attributes ){     
        var campo = form.find('input[name=' + (atr) + ']');
        if (campo.length > 0)
            campo.val(model.get(atr));
        else{
            campo = form.find('select[name=' + (atr) + ']').val(model.get(atr));
        }
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

function convertDate(date) {
    var d =date;
     if (!(date instanceof Date)){
        d = new Date(date);
     }
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function consultaDate(date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d =date;
  return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
}

function consultaHora(date){
    function pad(s) { return (s < 10) ? '0' + s : s;  }
    return [pad(date.getHours()), pad(date.getMinutes())].join(':');
}

function consultaDateYYYY(date){
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d =date;
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
}


function formatoHora(hora){
    var h = hora.split(':');
    if(h.length == 3){
        return h[0] + ":" + h[1];
    }
    return hora;
}

function formatoMoneda(cantidad){
    return this.formatNumber(cantidad, "$", true);

}

function formatNumber(value, preffix, isFixedPoint){
                preffix = preffix || "";
                var num = Number(value);
                var result = "";
                if(!isNaN(num)){
                    var numStr = isFixedPoint ? num.toFixed(2) : String(num);
                    var regExp = new RegExp("(\\d)(?=(\\d{3})+" + (numStr.indexOf(".") < 0 ? "$" : "\\.") + ")", "g");
                    result = preffix + numStr.replace(regExp, "$1,");
                }
                return result;
            }

function round(value, pivot){
                pivot = pivot != null ? pivot : 0.5;
                var result = 0;
                if(!isNaN(value)){
                    var intValue = parseInt(value);
                    if(value < 0){ 
                        pivot = -pivot;
                        result = (value > intValue + pivot) ? intValue : intValue - 1;
                    }else{
                        result = (value < intValue + pivot) ? intValue : intValue + 1;
                    }
                }
                return result;
            }

function comparaHora(hora_fin){
    var hf = hora_fin.replace(":","");

    var fechaActual = new Date();
    var horaAcutal = fechaActual.getHours();
    var minutoActual = fechaActual.getMinutes();

    hf = parseInt(hf);
    var ha = horaAcutal + "" + minutoActual;
    ha = parseInt(ha);

    if(hf > ha){
        return true;
    }

    return false;



}

function formatFecha(date){
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(); 
}

function  craerCita(hora){
    app.Views.popup.render('popup-cita-template', 'cita', hora);
    app.Views.popup.cargarPacientes();
    window.scroll(0,50)
    return false;    
}

function validaAlfanumerico(valor){
    if(valor){
        var regex=/^[0-9A-Za-z\sáéíóúñ.,\-]+$/;
        if(regex.test(valor)){
            return true;
        } 
        else {
            return false;
        }
    }else{
        return true;
    }
}

function validaTelefono(valor){
    if(valor){
        var regex=/^[0-9]{2,3}-? ?[0-9]{7,8}$/;
        if(regex.test(valor)){
            return true;
        } 
        else {
            return false;
        }
    }else{
        return true;
    }
}

function validaCorreo(valor){
    if(valor){
        var regex=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(regex.test(valor)){
            return true;
        } 
        else {
            return false;
        }
    }else{
        return true
    }
}

function validaMoneda(valor){
    if(valor){
        var regex=/^\$(((\d{1,3},)(\d{3},)*\d{3})|(\d{1,3}))\.\d{2}$/;
        if(regex.test(valor)){
            return true;
        } 
        else {
            return false;
        }
    }else{
        return true
    }
}

function validaCP(valor){
    if(!valor)
        return true;
    var regex = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
     if(regex.test(valor)){
        return true;
    } 
    else {
        return false;
    }
}

function validaFecha(valor){
    if(!valor)
        return true;
    var regex = /^\d{2,4}-\d{1,2}-\d{1,2}$/;
     if(regex.test(valor)){
        return true;
    } 
    else {
        return false;
    }
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function validaRequerido(valor, length){
    length = length ? length : 0;
    if(valor.length > length)
        return true;
    else
        return false;
}


//Formato a fechas crear metodo en underscore
_.template.formatdate = function (stamp) {
    
    if(!stamp)
        return ""

    var fecha = stamp;
    if(stamp.length <= 10){
        fecha = stamp + " 00:00"
    }
    var d = new Date(fecha), // or d = new Date(date)
        fragments = [
            d.getDate(),
            obtenerMes(d.getMonth()),
            d.getFullYear()
        ]; 
    return fragments.join('/');
};

_.template.formatdateHH = function (stamp) {
    
    if(!stamp)
        return ""

    var d = new Date(stamp), // or d = new Date(date)
        fragments = [
            d.getDate(),
            obtenerMes(d.getMonth()),
            d.getFullYear(),
            d.getHours(),
            d.getMinutes()
        ]; 
    return fragments[0] + "/" + fragments[1] + "/" + fragments[2] + " " + fragments[3] + ":" + fragments[4]; 
};

_.template.formatHora = function (stamp) {
    
    var hora = stamp.substring(0,5);
    return hora;
};


function obtenerMes(mes) {
    if(mes == 0){
        return "Ene";
    }else if(mes == 1){
        return "Feb";
    }else if(mes == 2){
        return "Mar";
    }else if(mes == 3){
        return "Abr";
    }else if(mes == 4){
        return "May";
    }else if(mes == 5){
        return "Jun";
    }else if(mes == 6){
        return "Jul";
    }else if(mes == 7){
        return "Ago";
    }else if(mes == 8){
        return "Sep";
    }else if(mes == 9){
        return "Oct";
    }else if(mes == 10){
        return "Nov";
    }else if(mes == 11){
        return "Dic";
    }
}

function rellenarCaracter(carater, cantidad, valor){
    valor = valor.toString();
    if(valor.length < cantidad){
        while(valor.length < cantidad){
            valor = carater + valor;
        }
        
    }

    return valor;
} 

function convertirADecimal(valor){
    valor = valor.replace('$','').replace(',','');
    valor = parseFloat(valor);
    return valor;
}

utils = {
    constantes :  {
        estatus : {
            confirmada : 1,
            pendiente : 2,
            realizada : 3,
            cancelada : 4,
            reprogramada : 5,
            pagos : 6,
            pagosPendiente : 7,
            contado : 8,
            pagada : 9,
            tratamientoActivo : 10,
            tratamientoFinalizado : 11,
            1 : "Confirmada",
            2 : "Pendiente",
            3 : "Realizada",
            4 : "Cancelada",
            5 : "Reprogramada",
            6 : "Pagos",
            7 : "Pagos pendientes",
            8 : "Pago de contado",
            9 : "Pagada",
            10 : "Tratamiento activo",
            11 : "Tratamineto finalizado",
        }

    }
}

