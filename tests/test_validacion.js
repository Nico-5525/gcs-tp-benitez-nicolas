const test = require("node:test");
const assert = require("node:assert/strict");
const {
    validarTelefono,
    estadoDe,
    normalizar,
    filtrarClientes,
    contarPorEstado
} = require("../src/script.js");


test("v1.1: acepta un teléfono compuesto por dígitos", function () {
    assert.equal(validarTelefono("2801234567"), true);
});

test("v1.1: rechaza letras en el teléfono", function () {
    assert.equal(validarTelefono("ABC123"), false);
});


test("v1.1: rechaza guiones y espacios en el teléfono", function () {
    assert.equal(validarTelefono("280-123-4567"), false);
    assert.equal(validarTelefono("280 123 4567"), false);
});


// ---------------------------------------------------------------
// Pruebas adicionales
// ---------------------------------------------------------------

// Datos de ejemplo compartidos por las pruebas.
// El cliente 4 simula un registro guardado antes de existir el campo "estado".
const clientesEjemplo = [
    {
        id: "1",
        nombre: "Lucía",
        apellido: "Fernández",
        empresa: "Estudio Norte",
        correo: "lucia@estudionorte.com",
        telefono: "2804102233",
        estado: "activo",
        notas: "Prefiere WhatsApp"
    },
    {
        id: "2",
        nombre: "Martín",
        apellido: "Sosa",
        empresa: "Sosa e Hijos",
        correo: "martin@sosa.com",
        telefono: "2804558890",
        estado: "prospecto",
        notas: ""
    },
    {
        id: "3",
        nombre: "Camila",
        apellido: "Ríos",
        empresa: "Patagonia Tours",
        correo: "camila@patagoniatours.com",
        telefono: "2804001122",
        estado: "inactivo",
        notas: ""
    },
    {
        id: "4",
        nombre: "Nicolás",
        apellido: "Benítez",
        correo: "nico@ejemplo.com",
        telefono: "2801234567"
    }
];

function idsDe(lista) {
    return lista.map(function (cliente) {
        return cliente.id;
    });
}

// --- validarTelefono (bordes de la v1.0) ---

test("v1.0: rechaza un teléfono vacío", function () {
    assert.equal(validarTelefono(""), false);
});

test("v1.0: rechaza un teléfono formado solo por espacios", function () {
    assert.equal(validarTelefono("   "), false);
});

test("v1.0: acepta un teléfono recibido como número", function () {
    assert.equal(validarTelefono(2801234567), true);
});

// --- estadoDe ---

test("estadoDe: devuelve el estado cuando es válido", function () {
    assert.equal(estadoDe({ estado: "activo" }), "activo");
    assert.equal(estadoDe({ estado: "prospecto" }), "prospecto");
    assert.equal(estadoDe({ estado: "inactivo" }), "inactivo");
});

test("estadoDe: un cliente sin estado se toma como prospecto", function () {
    assert.equal(estadoDe({ nombre: "Ana" }), "prospecto");
});

test("estadoDe: un estado desconocido se toma como prospecto", function () {
    assert.equal(estadoDe({ estado: "vip" }), "prospecto");
});

// --- normalizar ---

test("normalizar: pasa a minúsculas y quita tildes", function () {
    assert.equal(normalizar("Benítez"), "benitez");
    assert.equal(normalizar("NICOLÁS"), "nicolas");
});

test("normalizar: devuelve texto vacío si no hay valor", function () {
    assert.equal(normalizar(undefined), "");
    assert.equal(normalizar(null), "");
});

// --- filtrarClientes ---

test("filtrarClientes: sin filtros devuelve todos los clientes", function () {
    const resultado = filtrarClientes(clientesEjemplo, "", "");
    assert.deepEqual(idsDe(resultado), ["1", "2", "3", "4"]);
});

test("filtrarClientes: filtra por estado activo", function () {
    const resultado = filtrarClientes(clientesEjemplo, "", "activo");
    assert.deepEqual(idsDe(resultado), ["1"]);
});

test("filtrarClientes: filtra por estado inactivo", function () {
    const resultado = filtrarClientes(clientesEjemplo, "", "inactivo");
    assert.deepEqual(idsDe(resultado), ["3"]);
});

test("filtrarClientes: el cliente sin estado aparece entre los prospectos", function () {
    const resultado = filtrarClientes(clientesEjemplo, "", "prospecto");
    assert.deepEqual(idsDe(resultado), ["2", "4"]);
});

test("filtrarClientes: busca por nombre sin importar las tildes", function () {
    const resultado = filtrarClientes(clientesEjemplo, "lucia", "");
    assert.deepEqual(idsDe(resultado), ["1"]);
});

test("filtrarClientes: busca por apellido", function () {
    const resultado = filtrarClientes(clientesEjemplo, "rios", "");
    assert.deepEqual(idsDe(resultado), ["3"]);
});

test("filtrarClientes: busca por nombre y apellido juntos", function () {
    const resultado = filtrarClientes(clientesEjemplo, "camila rios", "");
    assert.deepEqual(idsDe(resultado), ["3"]);
});

test("filtrarClientes: busca por empresa", function () {
    const resultado = filtrarClientes(clientesEjemplo, "tours", "");
    assert.deepEqual(idsDe(resultado), ["3"]);
});

test("filtrarClientes: busca por correo electrónico", function () {
    const resultado = filtrarClientes(clientesEjemplo, "sosa.com", "");
    assert.deepEqual(idsDe(resultado), ["2"]);
});

test("filtrarClientes: busca por teléfono", function () {
    const resultado = filtrarClientes(clientesEjemplo, "4558", "");
    assert.deepEqual(idsDe(resultado), ["2"]);
});

test("filtrarClientes: ignora mayúsculas y espacios alrededor", function () {
    const resultado = filtrarClientes(clientesEjemplo, "  NICOLAS  ", "");
    assert.deepEqual(idsDe(resultado), ["4"]);
});

test("filtrarClientes: combina búsqueda y estado", function () {
    const coincide = filtrarClientes(clientesEjemplo, "sosa", "prospecto");
    const noCoincide = filtrarClientes(clientesEjemplo, "sosa", "activo");

    assert.deepEqual(idsDe(coincide), ["2"]);
    assert.deepEqual(noCoincide, []);
});

test("filtrarClientes: devuelve una lista vacía si nada coincide", function () {
    const resultado = filtrarClientes(clientesEjemplo, "zzz", "");
    assert.deepEqual(resultado, []);
});

test("filtrarClientes: no modifica la lista original", function () {
    const resultado = filtrarClientes(clientesEjemplo, "sosa", "");

    assert.equal(clientesEjemplo.length, 4);
    assert.notEqual(resultado, clientesEjemplo);
});

// --- contarPorEstado ---

test("contarPorEstado: cuenta el total y cada estado", function () {
    assert.deepEqual(contarPorEstado(clientesEjemplo), {
        total: 4,
        activo: 1,
        prospecto: 2,
        inactivo: 1
    });
});

test("contarPorEstado: con una lista vacía devuelve todo en cero", function () {
    assert.deepEqual(contarPorEstado([]), {
        total: 0,
        activo: 0,
        prospecto: 0,
        inactivo: 0
    });
});
