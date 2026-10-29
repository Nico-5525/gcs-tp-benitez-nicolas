"use strict";

// Clave utilizada para guardar los clientes en el navegador.
const CLAVE_CLIENTES = "gestorClientes";

const ETIQUETAS_ESTADO = {
    activo: "Activo",
    prospecto: "Prospecto",
    inactivo: "Inactivo"
};

// ---------------------------------------------------------------
// FUNCIONES PURAS
// No usan el DOM ni localStorage, por eso se pueden probar con Node.js.
// ---------------------------------------------------------------

function validarTelefono(tel) {
    return /^[0-9]+$/.test(tel);
}

function estadoDe(cliente) {
    return ETIQUETAS_ESTADO[cliente.estado] ? cliente.estado : "prospecto";
}

function normalizar(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtrarClientes(lista, texto, estado) {
    const busqueda = normalizar(String(texto || "").trim());

    return lista.filter(function (cliente) {
        if (estado && estadoDe(cliente) !== estado) {
            return false;
        }

        if (!busqueda) {
            return true;
        }

        const contenido = normalizar(
            [
                cliente.nombre,
                cliente.apellido,
                cliente.empresa,
                cliente.correo,
                cliente.telefono
            ].join(" ")
        );

        return contenido.includes(busqueda);
    });
}

function contarPorEstado(lista) {
    const cantidades = {
        total: lista.length,
        activo: 0,
        prospecto: 0,
        inactivo: 0
    };

    lista.forEach(function (cliente) {
        cantidades[estadoDe(cliente)]++;
    });

    return cantidades;
}

// ---------------------------------------------------------------
// CÓDIGO DEL NAVEGADOR
// Solo se ejecuta si existe "document". En Node.js (tests) se omite.
// ---------------------------------------------------------------
if (typeof document !== "undefined") {

    // Recuperamos los clientes guardados o comenzamos con una lista vacía.
    let clientes = JSON.parse(localStorage.getItem(CLAVE_CLIENTES) || "[]");

    // Elementos del formulario y de la página.
    const formulario = document.getElementById("formulario-cliente");
    const campoId = document.getElementById("cliente-id");
    const campoNombre = document.getElementById("nombre");
    const campoApellido = document.getElementById("apellido");
    const campoCorreo = document.getElementById("correo");
    const campoTelefono = document.getElementById("telefono");

    const campoEmpresa = document.getElementById("empresa");
    const campoEstado = document.getElementById("estado");
    const campoNotas = document.getElementById("notas");
    const campoBusqueda = document.getElementById("busqueda");
    const filtroEstado = document.getElementById("filtro-estado");

    const resumen = {
        total: document.getElementById("resumen-total"),
        activo: document.getElementById("resumen-activo"),
        prospecto: document.getElementById("resumen-prospecto"),
        inactivo: document.getElementById("resumen-inactivo")
    };

    const tituloFormulario = document.getElementById("titulo-formulario");
    const botonGuardar = document.getElementById("boton-guardar");
    const botonCancelar = document.getElementById("boton-cancelar");
    const listaClientes = document.getElementById("lista-clientes");
    const totalClientes = document.getElementById("total-clientes");
    const mensajeVacio = document.getElementById("mensaje-vacio");
    const mensaje = document.getElementById("mensaje");

    // Guardamos los cambios en el almacenamiento local del navegador.
    function guardarClientes() {
        localStorage.setItem(CLAVE_CLIENTES, JSON.stringify(clientes));
    }

    // Mostramos un mensaje al usuario.
    function mostrarMensaje(texto) {
        mensaje.textContent = texto;
    }

    // Creamos una celda de tabla utilizando textContent
    // para mostrar los datos como texto y no como código HTML.
    function crearCelda(texto) {
        const celda = document.createElement("td");
        celda.textContent = texto;
        return celda;
    }

    // Actualizamos las tarjetas de resumen.
    function actualizarResumen() {
        const cantidades = contarPorEstado(clientes);

        resumen.total.textContent = cantidades.total;
        resumen.activo.textContent = cantidades.activo;
        resumen.prospecto.textContent = cantidades.prospecto;
        resumen.inactivo.textContent = cantidades.inactivo;
    }

    // Dibujamos nuevamente la tabla de clientes.
    function mostrarClientes() {
        listaClientes.replaceChildren();
        const visibles = filtrarClientes(
            clientes,
            campoBusqueda.value,
            filtroEstado.value
        );

        visibles.forEach(function (cliente) {
            const fila = document.createElement("tr");

            fila.appendChild(
                crearCelda(cliente.nombre + " " + cliente.apellido)
            );
            fila.appendChild(crearCelda(cliente.empresa || "—"));
            fila.appendChild(crearCelda(cliente.correo));
            fila.appendChild(crearCelda(cliente.telefono));

            const estado = estadoDe(cliente);
            const celdaEstado = document.createElement("td");
            const insignia = document.createElement("span");
            insignia.className = "insignia insignia-" + estado;
            insignia.textContent = ETIQUETAS_ESTADO[estado];
            celdaEstado.appendChild(insignia);
            fila.appendChild(celdaEstado);

            const celdaNotas = crearCelda(cliente.notas || "—");
            celdaNotas.className = "celda-notas";
            fila.appendChild(celdaNotas);

            const celdaAcciones = document.createElement("td");
            const acciones = document.createElement("div");
            acciones.className = "acciones-tabla";

            const botonEditar = document.createElement("button");
            botonEditar.type = "button";
            botonEditar.className = "boton-editar";
            botonEditar.textContent = "Editar";
            botonEditar.addEventListener("click", function () {
                editarCliente(cliente.id);
            });

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = "boton-eliminar";
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", function () {
                eliminarCliente(cliente.id);
            });

            acciones.append(botonEditar, botonEliminar);
            celdaAcciones.appendChild(acciones);
            fila.appendChild(celdaAcciones);
            listaClientes.appendChild(fila);
        });

        if (visibles.length === clientes.length) {
            totalClientes.textContent =
                clientes.length === 1
                    ? "1 cliente"
                    : clientes.length + " clientes";
        } else {
            totalClientes.textContent =
                visibles.length + " de " + clientes.length + " clientes";
        }

        mensajeVacio.textContent =
            clientes.length === 0
                ? "Todavía no hay clientes registrados."
                : "Ningún cliente coincide con la búsqueda.";
        mensajeVacio.classList.toggle("oculto", visibles.length > 0);

        actualizarResumen();
    }

    // Limpiamos el formulario y volvemos al modo de registro.
    function limpiarFormulario() {
        formulario.reset();
        campoId.value = "";
        tituloFormulario.textContent = "Registrar cliente";
        botonGuardar.textContent = "Registrar cliente";
        botonCancelar.classList.add("oculto");
    }

    // Registramos un cliente o actualizamos uno existente.
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = campoNombre.value.trim();
        const apellido = campoApellido.value.trim();
        const correo = campoCorreo.value.trim();
        const telefono = campoTelefono.value.trim();

        const empresa = campoEmpresa.value.trim();
        const estado = campoEstado.value;
        const notas = campoNotas.value.trim();

        if (!nombre || !apellido || !correo || !telefono) {
            mostrarMensaje("Completá todos los campos obligatorios.");
            return;
        }

        if (!validarTelefono(telefono)) {
            mostrarMensaje("Ingresá un teléfono válido.");
            return;
        }

        if (campoId.value) {
            const indice = clientes.findIndex(function (cliente) {
                return cliente.id === campoId.value;
            });

            if (indice === -1) {
                mostrarMensaje("No se encontró el cliente seleccionado.");
                return;
            }

            clientes[indice] = {
                ...clientes[indice],
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono,
                empresa: empresa,
                estado: estado,
                notas: notas
            };

            mostrarMensaje("Cliente actualizado correctamente.");
        } else {
            const cliente = {
                id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                telefono: telefono,
                empresa: empresa,
                estado: estado,
                notas: notas
            };

            clientes.push(cliente);
            mostrarMensaje("Cliente registrado correctamente.");
        }

        guardarClientes();
        mostrarClientes();
        limpiarFormulario();
    });

    // Cargamos los datos de un cliente en el formulario.
    function editarCliente(id) {
        const cliente = clientes.find(function (item) {
            return item.id === id;
        });

        if (!cliente) {
            mostrarMensaje("No se encontró el cliente seleccionado.");
            return;
        }

        campoId.value = cliente.id;
        campoNombre.value = cliente.nombre;
        campoApellido.value = cliente.apellido;
        campoCorreo.value = cliente.correo;
        campoTelefono.value = cliente.telefono;

        campoEmpresa.value = cliente.empresa || "";
        campoEstado.value = estadoDe(cliente);
        campoNotas.value = cliente.notas || "";

        tituloFormulario.textContent = "Modificar cliente";
        botonGuardar.textContent = "Guardar cambios";
        botonCancelar.classList.remove("oculto");

        mostrarMensaje("Modificá los datos y guardá los cambios.");
        campoNombre.focus();
    }

    // Eliminamos un cliente después de pedir confirmación.
    function eliminarCliente(id) {
        const cliente = clientes.find(function (item) {
            return item.id === id;
        });

        if (!cliente) {
            mostrarMensaje("No se encontró el cliente seleccionado.");
            return;
        }

        const confirmado = confirm(
            "¿Querés eliminar a " + cliente.nombre + " " + cliente.apellido + "?"
        );

        if (!confirmado) {
            return;
        }

        clientes = clientes.filter(function (item) {
            return item.id !== id;
        });

        guardarClientes();
        mostrarClientes();

        if (campoId.value === id) {
            limpiarFormulario();
        }

        mostrarMensaje("Cliente eliminado correctamente.");
    }

    // Cancelamos una modificación.
    botonCancelar.addEventListener("click", function () {
        limpiarFormulario();
        mostrarMensaje("Edición cancelada.");
    });

    // Eventos del buscador y filtro.
    campoBusqueda.addEventListener("input", mostrarClientes);
    filtroEstado.addEventListener("change", mostrarClientes);

    // Al iniciar la página, mostramos los datos guardados.
    mostrarClientes();
}

// Exportación para las pruebas automatizadas con Node.js.
// En el navegador, "module" no está definido y este bloque se omite.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        validarTelefono,
        estadoDe,
        normalizar,
        filtrarClientes,
        contarPorEstado
    };
}