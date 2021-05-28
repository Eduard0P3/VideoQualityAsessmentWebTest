function todo() {
    getDatos();
    clear();
    DisableNextButton("btnEnviar");
}

function displayRadioValue() {
    document.getElementById("result").innerHTML = "";
    var ele = document.getElementsByTagName("input");
    
    for(var i = 0; i < ele.length; i++) {
        
        if(ele[i].getAttribute("type")=="radio") {
        
            if(ele[i].checked)
                document.getElementById("result").innerHTML
                        += ele[i].name + " Value: "
                        + ele[i].value + "<br>";
        }
    }
}

function clear() {
    clearRadioGroup("sequence1");
    clearRadioGroup("sequence2");
    clearRadioGroup("sequence3");
    clearRadioGroup("sequence4");
    clearRadioGroup("sequence5");
}

function clearRadioGroup(GroupName) {
    var ele = document.getElementsByName(GroupName);
	for(var i=0;i<ele.length;i++)
    ele[i].checked = false;
}

function DisableNextButton(btnId) {
    document.getElementById(btnId).disabled = 'true';
}

function getDatos() {
    var nombre = document.getElementsByTagName("source");
    var ev = document.getElementsByTagName("input");
    var evaluacion = new Array(new Array(),new Array(),new Array(),new Array(),new Array());
    var j = 0;
    for (var i = 0; i < ev.length; i++) {
        if(ev[i].getAttribute("type")=="radio") {
            if(ev[i].checked){
                evaluacion[j]['valor'] = ev[i].value;
                j = j + 1;
            }
        }
    }
    for (var i = 0; i < nombre.length; i++) {
        if(nombre[i].getAttribute("type")=="video/mp4") {
            evaluacion[i]['nombre'] = nombre[i].src;
        }
    }
    var secuencias = document.getElementsByTagName("h4");
    var evaluacion2 = {
        'nombre1': evaluacion[0]['nombre'],
        'nombre2': evaluacion[1]['nombre'],
        'nombre3': evaluacion[2]['nombre'],
        'nombre4': evaluacion[3]['nombre'],
        'nombre5': evaluacion[4]['nombre'],
        'valor1' : evaluacion[0]['valor'],
        'valor2' : evaluacion[1]['valor'],
        'valor3' : evaluacion[2]['valor'],
        'valor4' : evaluacion[3]['valor'],
        'valor5' : evaluacion[4]['valor'],
        'evaluador' : $('#evaluador').val(),
        'secuencia1' : secuencias[0].innerText,
        'secuencia2' : secuencias[1].innerText,
        'secuencia3' : secuencias[2].innerText,
        'secuencia4' : secuencias[3].innerText,
        'secuencia5' : secuencias[4].innerText
    }
    $.ajax({
        data: evaluacion2, //datos que se van a enviar al ajax
        url: './Controllers/evaluacion.C.php', //archivo php que recibe los datos
        type: 'POST', //método para enviar los datos
        dataType: 'json',//Recibe el array desde php
        success: function (respuesta) {
            alert(respuesta['respuesta']);
        }
    });
}