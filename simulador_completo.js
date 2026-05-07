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

    let cliente = {
        cedula:   cedula,
        nombre:   nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos:  egresos
    };

    clientes.push(cliente);
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