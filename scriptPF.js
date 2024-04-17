window.onload = iniciar;

function iniciar(){
    let btnCalcular = document.getElementById("btnCalcular");
    btnCalcular.addEventListener("click", clickCalcular);
}

function clickCalcular(evento){
    evento.preventDefault();
    validarDatos();
}

function validarDatos(){

    document.getElementById("plazoFijo").innerHTML="";

    let mensajeError="";
    let contErr = 0;

    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let dias = parseInt(document.getElementById("txtDias").value);

    if(nombre.length == 0){
        //alert ("Debe ingresar un Nombre");
        mensajeError += "Debe ingresar un Nombre";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(apellido.length == 0){
        //alert ("Debe ingresar un Apellido");
        mensajeError += "Debe ingresar un Apellido";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(Number.isFinite(monto) == false){
        //alert ("Debe ingresar un Monto en numero");
        mensajeError += "Debe ingresar un Monto en pesos/dolares";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(monto<1000){
        //alert ("Debe ingresar un Monto superior a $1000");
        mensajeError += "Debe ingresar como mínimo un monto de $1000";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(Number.isFinite(dias) == false){
        //alert ("Debe ingresar una cantidad de dias");
        mensajeError += "Debe ingresar una cantidad de días";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(dias<30){
        //alert ("Debe ingresar una cantidad de días superior a 30");
        mensajeError += "Debe ingresar una cantidad de días superior a 30";
        mostrarError(mensajeError);
        mensajeError = "";
        contErr++;
    }

    if(contErr == 0){
        //calcularMontoFinal(monto, dias);
        calcularReinvertir(monto, dias);
    }
}

function mostrarError(mensajeError){
    const parrafoError = document.createElement("p");
    var contenido = document.createTextNode(mensajeError);

    parrafoError.appendChild(contenido);
    document.getElementById("plazoFijo").appendChild(parrafoError);

}

function calcularPorcentaje(dias){
    let porcentaje = 0;

    if(dias>=30 && dias<=60){
        porcentaje = 40;
    }

    if(dias>=61 && dias<=120){
        porcentaje = 45;
    }

    if(dias>=121 && dias<=360){
        porcentaje = 50;
    }

    if(dias>360){
        porcentaje = 65;
    }

    return porcentaje;
}

function calcularMontoFinal(monto,dias){
    let porcentaje = calcularPorcentaje(dias);
    let resultado = monto + (monto * (dias/360) * (porcentaje/100));
    let resultadoFinal = resultado.toFixed(2);
    mostrarPlazoFijo(resultadoFinal);
}

function calcularReinvertir(monto,dias){
    document.getElementById("plazoFijo").innerHTML="";
    let porcentaje = calcularPorcentaje(dias);
    let resultado;
    encabezadoTabla();
    for(let i=1; i<=4; i++){
        resultado = monto + (monto * (dias/360) * (porcentaje/100));
        let resultadoFinal = resultado.toFixed(2);
        let montoRedondeado = monto.toFixed(2);
        mostrarTablaPlazoFijo(montoRedondeado, resultadoFinal, i);
        monto = resultado;
    }
}

function mostrarPlazoFijo(resultado){
    if(resultado){
        const parrafoResultado = document.createElement("p");
        let contenido = document.createTextNode("El Monto final es de $: " + resultado);
    
        parrafoResultado.appendChild(contenido);
        document.getElementById("plazoFijo").appendChild(parrafoResultado);
    }
}

function encabezadoTabla(){
    const filaPeriodo = document.createElement("tr");
    const celdaPeriodo = document.createElement("th");
    const celdaMonto = document.createElement("th");
    const celdaResultado = document.createElement("th");
    let periodo = document.createTextNode("Período");
    let montoInicial = document.createTextNode("Monto Inicial");
    let resultadoFinal = document.createTextNode("Monto Final");

    celdaPeriodo.appendChild(periodo);
    celdaMonto.appendChild(montoInicial);
    celdaResultado.appendChild(resultadoFinal);
    filaPeriodo.appendChild(celdaPeriodo);
    filaPeriodo.appendChild(celdaMonto);
    filaPeriodo.appendChild(celdaResultado);
    document.getElementById("plazoFijoTable").appendChild(filaPeriodo);
}

function mostrarTablaPlazoFijo(monto, resultado, periodo){
    if(resultado){
        const filaPeriodo = document.createElement("tr");
        const celdaPeriodo = document.createElement("td");
        const celdaMonto = document.createElement("td");
        const celdaResultado = document.createElement("td");
        let periodoFila = document.createTextNode(periodo);
        let montoInicial = document.createTextNode(monto);
        let resultadoFinal = document.createTextNode(resultado);
    
        celdaPeriodo.appendChild(periodoFila);
        celdaMonto.appendChild(montoInicial);
        celdaResultado.appendChild(resultadoFinal);
        filaPeriodo.appendChild(celdaPeriodo);
        filaPeriodo.appendChild(celdaMonto);
        filaPeriodo.appendChild(celdaResultado);
        document.getElementById("plazoFijoTable").appendChild(filaPeriodo);
    }
}

