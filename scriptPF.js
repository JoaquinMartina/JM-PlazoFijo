window.onload = iniciar;

function iniciar(){
    let btnCalcular = document.getElementById("btnCalcular");
    btnCalcular.addEventListener("click", clickCalcular);
}

function clickCalcular(evento){
    evento.preventDefault();

    document.getElementById("errores").innerHTML="";
    document.getElementById("plazoFijo").innerHTML="";
    document.getElementById("plazoFijoTable").innerHTML="";

    const nombre = document.getElementById("txtNombre").value;
    const apellido = document.getElementById("txtApellido").value;
    const monto = parseFloat(document.getElementById("txtMonto").value);
    const dias = parseInt(document.getElementById("txtDias").value);
    const checkReinvertir = document.getElementById("siReinvertir").checked;

    const mensajeError = validarDatos(nombre, apellido, monto, dias);

    if(mensajeError.length !== 0){
        mostrarError(mensajeError);
        return;
    }

    if(checkReinvertir){
        calcularReinvertir(monto, dias);
    }else{
        let resultado = calcularMontoFinal(monto, dias);
        mostrarPlazoFijo(resultado);
    }
}

function validarDatos(nombre, apellido, monto, dias){

    const mensajeError = [];

    if(nombre.length == 0){
        mensajeError.push("Debe ingresar un Nombre");
    }

    if(apellido.length == 0){
        mensajeError.push("Debe ingresar un Apellido");
    }

    if(Number.isFinite(monto) == false){
        mensajeError.push("Debe ingresar un Monto en pesos/dolares");
    }

    if(monto<1000){
        mensajeError.push("Debe ingresar como mínimo un monto de $1000");
    }

    if(Number.isFinite(dias) == false){
        mensajeError.push("Debe ingresar una cantidad de días");
    }

    if(dias<30){
        mensajeError.push("Debe ingresar una cantidad de días superior a 30");
    }

    return mensajeError;
}

function mostrarError(mensajeError){
    for(const mensaje of mensajeError){
        const listaErrores = document.createElement("li");
        var contenido = document.createTextNode(mensaje);
    
        listaErrores.appendChild(contenido);
        document.getElementById("errores").appendChild(listaErrores);
    }

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
    return resultado;
}

function mostrarPlazoFijo(resultado){
    if(resultado){
        const parrafoResultado = document.createElement("p");
        let contenido = document.createTextNode("El Monto final es de $: " + resultado.toFixed(2));
    
        parrafoResultado.appendChild(contenido);
        document.getElementById("plazoFijo").appendChild(parrafoResultado);
    }
}

function calcularReinvertir(monto, dias){

    const tabla = document.createElement("table");
    const filaCabecera = document.createElement("tr");
    const cabeceraPeriodo = document.createElement("th");
    const cabeceraMonto = document.createElement("th");
    const cabeceraResultado = document.createElement("th");
    let cabPeriodo = document.createTextNode("Período");
    let cabMontoInicial = document.createTextNode("Monto Inicial");
    let cabResultadoFinal = document.createTextNode("Monto Final");

    cabeceraPeriodo.appendChild(cabPeriodo);
    cabeceraMonto.appendChild(cabMontoInicial);
    cabeceraResultado.appendChild(cabResultadoFinal);
    filaCabecera.appendChild(cabeceraPeriodo);
    filaCabecera.appendChild(cabeceraMonto);
    filaCabecera.appendChild(cabeceraResultado);
    tabla.appendChild(filaCabecera);

    for(let periodo=1; periodo<=4; periodo++){
        
        let resultado = calcularMontoFinal(monto, dias);

        const filaPeriodo = document.createElement("tr");
        const celdaPeriodo = document.createElement("td");
        const celdaMonto = document.createElement("td");
        const celdaResultado = document.createElement("td");
        let periodoFila = document.createTextNode(periodo);
        let montoInicial = document.createTextNode(monto.toFixed(2));
        let resultadoFinal = document.createTextNode(resultado.toFixed(2));
    
        celdaPeriodo.appendChild(periodoFila);
        celdaMonto.appendChild(montoInicial);
        celdaResultado.appendChild(resultadoFinal);
        filaPeriodo.appendChild(celdaPeriodo);
        filaPeriodo.appendChild(celdaMonto);
        filaPeriodo.appendChild(celdaResultado);
        tabla.appendChild(filaPeriodo);

        monto = resultado;
    }
    document.getElementById("plazoFijoTable").appendChild(tabla);
}

