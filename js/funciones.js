// Utilidad para convertir imagen a base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Validaciones de formularios
function validarFormularioUsuario(form) {
    const usuario = form.usuario.value.trim();
    const clave = form.clave.value;
    const repetirClave = form.repetirClave ? form.repetirClave.value : clave;

    if (!usuario || !clave) {
        alert('Todos los campos son obligatorios');
        return false;
    }

    if (clave !== repetirClave) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    return true;
}

function validarFormularioMateria(form) {
    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();

    if (!codigo || !nombre) {
        alert('Código y nombre son obligatorios');
        return false;
    }

    return true;
}

function validarFormularioDocente(form) {
    const dni = form.dni.value.trim();
    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();

    if (!dni || !nombre || !apellido) {
        alert('Todos los campos son obligatorios');
        return false;
    }

    return true;
}

function validarFormularioCurso(form) {
    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();

    if (!codigo || !nombre) {
        alert('Código y nombre son obligatorios');
        return false;
    }

    return true;
}

function validarFormularioNotificacion(form) {
    const titulo = form.titulo.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!titulo || !mensaje) {
        alert('Título y mensaje son obligatorios');
        return false;
    }

    return true;
}

// Funciones de Usuarios
function registrarUsuario() {
    const form = document.getElementById('registroForm');
    if (!validarFormularioUsuario(form)) return false;

    const usuario = form.usuario.value.trim();
    const clave = form.clave.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.find(u => u.usuario === usuario)) {
        alert('Usuario ya existe');
        return false;
    }

    usuarios.push({ usuario, clave });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
}

function validarLogin() {
    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.usuario === usuario && u.clave === clave);

    return !!user;
}

// Funciones de Materias
async function altaMateria() {
    const form = document.getElementById('altaMateriaForm');
    if (!validarFormularioMateria(form)) return;

    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();
    const logoFile = form.logo.files[0];

    let logo = '';
    if (logoFile) {
        logo = await fileToBase64(logoFile);
    }

    let materias = JSON.parse(localStorage.getItem('materias')) || [];

    if (materias.find(m => m.codigo === codigo)) {
        alert('Materia con este código ya existe');
        return;
    }

    materias.push({ codigo, nombre, logo });
    localStorage.setItem('materias', JSON.stringify(materias));
    alert('Materia agregada exitosamente');
    form.reset();
}

function bajaMateria() {
    const codigo = document.getElementById('codigo').value.trim();
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    const index = materias.findIndex(m => m.codigo === codigo);

    if (index === -1) {
        alert('Materia no encontrada');
        return;
    }

    materias.splice(index, 1);
    localStorage.setItem('materias', JSON.stringify(materias));
    alert('Materia eliminada exitosamente');
    document.getElementById('materiaInfo').style.display = 'none';
}

async function modificarMateria() {
    const form = document.getElementById('modificarMateriaForm');
    if (!validarFormularioMateria(form)) return;

    const codigo = form.codigoMod.value.trim();
    const nombre = form.nombreMod.value.trim();
    const logoFile = form.logoMod.files[0];

    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    const materia = materias.find(m => m.codigo === codigo);

    if (!materia) {
        alert('Materia no encontrada');
        return;
    }

    materia.nombre = nombre;
    if (logoFile) {
        materia.logo = await fileToBase64(logoFile);
    }

    localStorage.setItem('materias', JSON.stringify(materias));
    alert('Materia modificada exitosamente');
    form.style.display = 'none';
}

function consultarMaterias() {
    return JSON.parse(localStorage.getItem('materias')) || [];
}

// Funciones de Docentes
async function altaDocente() {
    const form = document.getElementById('altaDocenteForm');
    if (!validarFormularioDocente(form)) return;

    const dni = form.dni.value.trim();
    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const fotoFile = form.foto.files[0];

    let foto = '';
    if (fotoFile) {
        foto = await fileToBase64(fotoFile);
    }

    let docentes = JSON.parse(localStorage.getItem('docentes')) || [];

    if (docentes.find(d => d.dni === dni)) {
        alert('Docente con este DNI ya existe');
        return;
    }

    docentes.push({ dni, nombre, apellido, foto });
    localStorage.setItem('docentes', JSON.stringify(docentes));
    alert('Docente agregado exitosamente');
    form.reset();
}

function bajaDocente() {
    const dni = document.getElementById('dni').value.trim();
    let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
    const index = docentes.findIndex(d => d.dni === dni);

    if (index === -1) {
        alert('Docente no encontrado');
        return;
    }

    docentes.splice(index, 1);
    localStorage.setItem('docentes', JSON.stringify(docentes));
    alert('Docente eliminado exitosamente');
    document.getElementById('docenteInfo').style.display = 'none';
}

async function modificarDocente() {
    const form = document.getElementById('modificarDocenteForm');
    if (!validarFormularioDocente(form)) return;

    const dni = form.dniMod.value.trim();
    const nombre = form.nombreMod.value.trim();
    const apellido = form.apellidoMod.value.trim();
    const fotoFile = form.fotoMod.files[0];

    let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
    const docente = docentes.find(d => d.dni === dni);

    if (!docente) {
        alert('Docente no encontrado');
        return;
    }

    docente.nombre = nombre;
    docente.apellido = apellido;
    if (fotoFile) {
        docente.foto = await fileToBase64(fotoFile);
    }

    localStorage.setItem('docentes', JSON.stringify(docentes));
    alert('Docente modificado exitosamente');
    form.style.display = 'none';
}

function consultarDocentes() {
    return JSON.parse(localStorage.getItem('docentes')) || [];
}

// Funciones de Cursos
async function altaCurso() {
    const form = document.getElementById('altaCursoForm');
    if (!validarFormularioCurso(form)) return;

    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();
    const descripcion = form.descripcion.value.trim();
    const logoFile = form.logo.files[0];

    let logo = '';
    if (logoFile) {
        logo = await fileToBase64(logoFile);
    }

    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    if (cursos.find(c => c.codigo === codigo)) {
        alert('Curso con este código ya existe');
        return;
    }

    cursos.push({ codigo, nombre, descripcion, logo });
    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('Curso agregado exitosamente');
    form.reset();
}

function bajaCurso() {
    const codigo = document.getElementById('codigo').value.trim();
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const index = cursos.findIndex(c => c.codigo === codigo);

    if (index === -1) {
        alert('Curso no encontrado');
        return;
    }

    cursos.splice(index, 1);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('Curso eliminado exitosamente');
    document.getElementById('cursoInfo').style.display = 'none';
}

async function modificarCurso() {
    const form = document.getElementById('modificarCursoForm');
    if (!validarFormularioCurso(form)) return;

    const codigo = form.codigoMod.value.trim();
    const nombre = form.nombreMod.value.trim();
    const descripcion = form.descripcionMod.value.trim();
    const logoFile = form.logoMod.files[0];

    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos.find(c => c.codigo === codigo);

    if (!curso) {
        alert('Curso no encontrado');
        return;
    }

    curso.nombre = nombre;
    curso.descripcion = descripcion;
    if (logoFile) {
        curso.logo = await fileToBase64(logoFile);
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('Curso modificado exitosamente');
    form.style.display = 'none';
}

function consultarCursos() {
    return JSON.parse(localStorage.getItem('cursos')) || [];
}

// Funciones de Notificaciones
async function altaNotificacion() {
    const form = document.getElementById('altaNotificacionForm');
    if (!validarFormularioNotificacion(form)) return;

    const titulo = form.titulo.value.trim();
    const mensaje = form.mensaje.value.trim();
    const fecha = new Date().toISOString();

    let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const id = Date.now().toString(); // Simple ID

    notificaciones.push({ id, titulo, mensaje, fecha });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    alert('Notificación agregada exitosamente');
    form.reset();
}

function bajaNotificacion() {
    const id = document.getElementById('id').value.trim();
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const index = notificaciones.findIndex(n => n.id === id);

    if (index === -1) {
        alert('Notificación no encontrada');
        return;
    }

    notificaciones.splice(index, 1);
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    alert('Notificación eliminada exitosamente');
    document.getElementById('notificacionInfo').style.display = 'none';
}

async function modificarNotificacion() {
    const form = document.getElementById('modificarNotificacionForm');
    if (!validarFormularioNotificacion(form)) return;

    const id = form.idMod.value.trim();
    const titulo = form.tituloMod.value.trim();
    const mensaje = form.mensajeMod.value.trim();

    let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const notificacion = notificaciones.find(n => n.id === id);

    if (!notificacion) {
        alert('Notificación no encontrada');
        return;
    }

    notificacion.titulo = titulo;
    notificacion.mensaje = mensaje;

    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    alert('Notificación modificada exitosamente');
    form.style.display = 'none';
}

function consultarNotificaciones() {
    return JSON.parse(localStorage.getItem('notificaciones')) || [];
}
