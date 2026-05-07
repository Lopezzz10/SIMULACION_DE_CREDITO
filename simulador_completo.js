let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    let valorTasa = recuperarInt("tasaInteres");
    if (valorTasa > 20) {
        document.getElementById("mensajeTasa").innerText = "La tasa debe estar entre 10% y 20%";
    } else if (valorTasa < 10) {
        document.getElementById("mensajeTasa").innerText = "La tasa debe estar entre 10% y 20%";
    } else {
        tasaInteres = valorTasa;
        document.getElementById("mensajeTasa").innerText = "Tasa configurada correctamente: " + valorTasa + "%";
    }
}

function guardarCliente() {
    let cedula   = recuperarTexto("cedula");
    let nombre   = recuperarTexto("nombre");
    let apellido = recuperarTexto("apellido");
    let ingresos = recuperarFloat("ingresos");
    let egresos  = recuperarFloat("egresos");

    let existente = buscarCliente(cedula);

    if(existente === null){
        let cliente = {
            cedula:   cedula,
            nombre:   nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos:  egresos
        };
        clientes.push(cliente);
    } else {
        existente.nombre   = nombre;
        existente.apellido = apellido;
        existente.ingresos = ingresos;
        existente.egresos  = egresos;
    }

    pintarClientes();
}

function pintarClientes() {
    let tbody = document.getElementById("tablaClientes");
    tbody.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        let fila = "<tr>" +
            "<td>" + c.cedula   + "</td>" +
            "<td>" + c.nombre   + "</td>" +
            "<td>" + c.apellido + "</td>" +
            "<td>" + c.ingresos + "</td>" +
            "<td>" + c.egresos  + "</td>" +
            "<td><button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button></td>" +
        "</tr>";
        tbody.innerHTML += fila;
    }
}

function buscarCliente(cedula){
  for(let i = 0; i < clientes.length;i++){
    if(clientes[i].cedula== cedula ){
      return clientes[i]
    }
  }
  return null
}

function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);
    clienteSeleccionado = cliente;
    
    mostrarTextoEnCaja("cedula",   cliente.cedula);
    mostrarTextoEnCaja("nombre",   cliente.nombre);
    mostrarTextoEnCaja("apellido", cliente.apellido);
    mostrarTextoEnCaja("ingresos", cliente.ingresos);
    mostrarTextoEnCaja("egresos",  cliente.egresos);
}

function limpiar(){
    mostrarTextoEnCaja("cedula",   "");
    mostrarTextoEnCaja("nombre",   "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos",  "");
}