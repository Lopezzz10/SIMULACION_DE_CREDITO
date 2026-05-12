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
    document.getElementById("credito").classList.remove("activa");
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
    let cedula = recuperarTexto("cedula");
    let nombre = recuperarTexto("nombre");
    let apellido = recuperarTexto("apellido");
    let ingresos = recuperarFloat("ingresos");
    let egresos = recuperarFloat("egresos");

    let existente = buscarCliente(cedula);

    if (existente === null) {
        let cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };
        clientes.push(cliente);
    } else {
        existente.nombre = nombre;
        existente.apellido = apellido;
        existente.ingresos = ingresos;
        existente.egresos = egresos;
    }

    pintarClientes();
}

function pintarClientes() {
    let tbody = document.getElementById("tablaClientes");
    tbody.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        let fila = "<tr>" +
            "<td>" + c.cedula + "</td>" +
            "<td>" + c.nombre + "</td>" +
            "<td>" + c.apellido + "</td>" +
            "<td>" + c.ingresos + "</td>" +
            "<td>" + c.egresos + "</td>" +
            "<td>" +
                "<button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button> " +
                "<button class=\"btn-eliminar\" onclick=\"eliminarCliente('" + c.cedula + "')\">Eliminar</button>" +
            "</td>" +
            "</tr>";
        tbody.innerHTML += fila;
    }
}

function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i]
        }
    }
    return null
}

function seleccionarCliente(cedula) {
    let cliente = buscarCliente(cedula);
    clienteSeleccionado = cliente;

    mostrarTextoEnCaja("cedula", cliente.cedula);
    mostrarTextoEnCaja("nombre", cliente.nombre);
    mostrarTextoEnCaja("apellido", cliente.apellido);
    mostrarTextoEnCaja("ingresos", cliente.ingresos);
    mostrarTextoEnCaja("egresos", cliente.egresos);
}

function limpiar() {
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
}
function buscarClienteCredito() {
    let cedula = recuperarTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    let datosClienteCredito = document.getElementById("datosClienteCredito");

    if (cliente === null) {
        datosClienteCredito.innerHTML = "<p>Cliente no encontrado.</p>";
        clienteSeleccionado = null;
    } else {
        clienteSeleccionado = cliente;
        datosClienteCredito.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
    }
}

function calcularCredito() {
    if (clienteSeleccionado === null) {
        alert("Primero busca un cliente.");
        return;
    }

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarInt("plazoCredito");

    let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
    let totalPagar = monto + (monto * tasaInteres / 100);
    let cuotaMensual = totalPagar / plazo;

    creditoAprobado = cuotaMensual <= capacidadPago;

    let resultadoCredito = document.getElementById("resultadoCredito");

    resultadoCredito.innerHTML = `
        Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
        Total a pagar: ${totalPagar.toFixed(2)}<br>
        Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
        RESULTADO: ${creditoAprobado ? "APROBADO" : "RECHAZADO"}
    `;

    if (creditoAprobado) {
        resultadoCredito.className = "aprobado";
    } else {
        resultadoCredito.className = "rechazado";
    }
}

function eliminarCliente(cedula) {
    let confirmacion = confirm("¿Está seguro de que desea eliminar al cliente con cédula " + cedula + "?");
    if (!confirmacion) {
        return;
    }

    let indice = -1;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            indice = i;
            break;
        }
    }

    if (indice !== -1) {
        clientes.splice(indice, 1);
        pintarClientes();
        limpiar();
    }
}