function Mostrar_Modal(parametro) {

    switch(parametro) {
        case "Agregar_SolicitudDeReserva":
            let Ventana_AgregarSolicitudDeReserva = document.getElementById("Ventana_AgregarReserva");
            Ventana_AgregarSolicitudDeReserva.style.display = "block";
            break;
        case "Agregar_Soporte":
            let Ventana_AgregarSoporte = document.getElementById("Ventana_AgregarSoporte");
            Ventana_AgregarSoporte.style.display = "block";
            break;
        case "Agregar_Materia":
            let Ventana_AgregarMateria = document.getElementById("Ventana_AgregarMateria");
            Ventana_AgregarMateria.style.display = "block";
            break;
        case "Agregar_Docente":
            let Ventana_AgregarDocente = document.getElementById("Ventana_Agregar_Docente");
            Ventana_AgregarDocente.style.display = "block";
            break;
        case "Asignar_Tarea":
            let Ventana_Asignar_Tarea = document.getElementById("Ventana_Asignar_Tarea");
            Ventana_Asignar_Tarea.style.display = "block";
            break;
        default:
            console.log("No se ha encontrado el parametro: " + parametro);
            break;
    }
}

function accionDeBoton(accion) {
  document.getElementById("accion").value = accion;
}
  /*
  
    Elementos de la Ventana de Agregar Solicitud de Reserva

  */
  const select_Materias = document.getElementById("select_Materias");
  const select_Modalidad = document.getElementById("select_Modalidad");
  const div_tituloDeReserva = document.getElementById("div_tituloDeReserva");
  const div_DocentesExtraidos = document.getElementById("div_DocentesExtraidos");
  const div_selectModalidadDeReserva = document.getElementById("div_selectModalidadDeReserva");
  const div_Cont_semestre = document.getElementById("div_Cont_semestre");
  const div_Cont_modulo = document.getElementById("div_Cont_modulo");
  const div_Cont_gestion = document.getElementById("div_Cont_gestion");
  const inputFechaInicio = document.getElementById("inputFechaInicio");
  const inputFechaFinal = document.getElementById("inputFechaFinal");
  const div_cont_horaInicio = document.getElementById("div_cont_horaInicio");
  const div_cont_horaFinal = document.getElementById("div_cont_horaFinal");
  const div_horario = document.getElementById("div_horario");
  const div_cont_cantDeAsistentes = document.getElementById("div_cont_cantDeAsistentes");
  const div_cont_requerimientos = document.getElementById("div_cont_requerimientos");
// Evento change del select para recibir la eleccion
select_Materias.addEventListener("change", function () {
  // Si se selecciona la opción 2, mostrar el div, de lo contrario ocultarlo
  if (select_Materias.value === "NO_ES_MATERIA") {
    
    div_tituloDeReserva.style.display = "block";
    inputFechaInicio.style.display = "block";
    inputFechaFinal.style.display = "block";
    div_cont_horaInicio.style.display = "block";
    div_cont_horaFinal.style.display = "block";
    div_cont_cantDeAsistentes.style.display = "block";
    div_cont_requerimientos.style.display = "block";
    div_DocentesExtraidos.style.display = "block";

    div_selectModalidadDeReserva.style.display = "none";
    div_Cont_semestre.style.display = "none";
    div_Cont_modulo.style.display = "none";
    div_Cont_gestion.style.display = "none";
    div_horario.style.display = "none";

  } else if (select_Materias.value != "Seleccione") {

    div_DocentesExtraidos.style.display = "block";
    div_selectModalidadDeReserva.style.display = "block";
    div_DocentesExtraidos.style.display ="block";

    div_tituloDeReserva.style.display = "none";
    inputFechaInicio.style.display = "none";
    inputFechaFinal.style.display = "none";
    div_cont_horaInicio.style.display = "none";
    div_cont_horaFinal.style.display = "none";
    div_cont_cantDeAsistentes.style.display = "none";
    div_cont_requerimientos.style.display = "none";
  }
});
select_Modalidad.addEventListener("change", function () {
  // Si se selecciona la opción 2, mostrar el div, de lo contrario ocultarlo
  if (select_Modalidad.value === "Fecha_Especifica") {
    inputFechaInicio.style.display    = "block";
    inputFechaFinal.style.display     = "block";
    div_cont_horaInicio.style.display = "block";
    div_cont_horaFinal.style.display  = "block";
    inputFechaFinal.style.display     = "block";

    div_cont_cantDeAsistentes.style.display = "block";
    div_cont_requerimientos.style.display   = "block";
    

    div_Cont_semestre.style.display = "none";
    div_Cont_modulo.style.display   = "none";
    div_Cont_gestion.style.display  = "none";
    div_horario.style.display = "none";
  } else if (select_Modalidad.value != "Seleccione") {
    div_Cont_semestre.style.display = "block";
    div_Cont_modulo.style.display   = "block";
    div_Cont_gestion.style.display  = "block";
    div_horario.style.display       = "block";

    div_cont_cantDeAsistentes.style.display = "block";
    div_cont_requerimientos.style.display   = "block";
    

    inputFechaInicio.style.display    = "none";
    inputFechaFinal.style.display     = "none";
    div_cont_horaInicio.style.display = "none";
    div_cont_horaFinal.style.display  = "none";
    inputFechaFinal.style.display     = "none";
  }
});

/*

Elementos de la Ventana Agregar Soporte

*/
//Ventana Agregar Soporte
const select_SoporteA_spte = document.getElementById("select_SoporteA_spte");
const select_MedioDeAtencion_spte = document.getElementById("select_MedioDeAtencion_spte");
const div_DocentesExtraidos_spte = document.getElementById("div_DocentesExtraidos_spte");
const div_NroDeRegistro_spte = document.getElementById("div_NroDeRegistro_spte");
const div_HoraInicio_spte = document.getElementById("div_HoraInicio_spte");
const div_HoraFinal_spte = document.getElementById("div_HoraFinal_spte");
const div_Problema_spte = document.getElementById("div_Problema_spte");
const div_Solucion_spte = document.getElementById("div_Solucion_spte");
const div_Observaciones_spte = document.getElementById("div_Observaciones_spte");
const div_Motivo_spte = document.getElementById("div_Motivo_spte");
let eleccionDeSoporte;

// Evento change del select para recibir la eleccion
select_SoporteA_spte.addEventListener("change", function () {
  // Si se selecciona la opción 2, mostrar el div, de lo contrario ocultarlo
  if (select_SoporteA_spte.value === "Docente") {

    div_DocentesExtraidos_spte.style.display = "block";
    div_NroDeRegistro_spte.style.display = "none";

    eleccionDeSoporte = select_SoporteA_spte.value;

  } else if (select_SoporteA_spte.value === "Estudiante") {

    div_NroDeRegistro_spte.style.display = "block";
    div_DocentesExtraidos_spte.style.display = "none";
    eleccionDeSoporte = select_SoporteA_spte.value;

  }
});
select_MedioDeAtencion_spte.addEventListener("change", function () {

  // Si se selecciona la opción 2, mostrar el div, de lo contrario ocultarlo
  if (select_MedioDeAtencion_spte.value === "Presencial") {

    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";

    div_Motivo_spte.style.display = "none";
    div_HoraInicio_spte.style.display = "none";
    div_HoraFinal_spte.style.display = "none";


  } else if (select_MedioDeAtencion_spte.value === "Cafe Internet") {

    div_Motivo_spte.style.display = "block";
    div_HoraInicio_spte.style.display = "block";
    div_HoraFinal_spte.style.display = "block";


    div_Problema_spte.style.display = "none";
    div_Solucion_spte.style.display = "none";
    div_Observaciones_spte.style.display = "none";


  }else if (select_MedioDeAtencion_spte.value === "Whatsapp") {


    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";
    div_HoraInicio_spte.style.display = "block";
    div_HoraFinal_spte.style.display = "block";

    div_Motivo_spte.style.display = "none";


  }else if (select_MedioDeAtencion_spte.value === "Facebook") {


    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";


    div_Motivo_spte.style.display = "none";
    div_HoraInicio_spte.style.display = "none";
    div_HoraFinal_spte.style.display = "none";



  }else if (select_MedioDeAtencion_spte.value === "Facebook(TeamViewer)") {


    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";


    div_Motivo_spte.style.display = "none";
    div_HoraInicio_spte.style.display = "none";
    div_HoraFinal_spte.style.display = "none";



  }else if (select_MedioDeAtencion_spte.value === "Facebook(AnyDesk)") {


    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";


    div_Motivo_spte.style.display = "none";
    div_HoraInicio_spte.style.display = "none";
    div_HoraFinal_spte.style.display = "none";



  }else if (select_MedioDeAtencion_spte.value === "Otros Medios") {


    div_Problema_spte.style.display = "block";
    div_Solucion_spte.style.display = "block";
    div_Observaciones_spte.style.display = "block";

    div_Motivo_spte.style.display = "none";
    div_HoraInicio_spte.style.display = "none";
    div_HoraFinal_spte.style.display = "none";




  }
});
/*
function EditarReservaModular(NroDeFila){
  window.scrollTo(0, 0);
  //Extrayendo los datos de la tabla y fila seleccionada
  let  tabla = document.getElementById("tabla_ReservasModulares_contenido");
  let  fila  = tabla.getElementsByTagName("tr");
  let celdas = fila[NroDeFila].getElementsByTagName("td");

  let  MateriaTitulo = celdas[0].innerHTML;
  let  Docente = celdas[1].innerHTML;
  let  HorarioInicio = celdas[2].innerHTML;
  let  HorarioFinal = celdas[3].innerHTML;
  let  Aula = celdas[4].innerHTML;
  let  tipoDeModalidad = celdas[5].innerHTML;
  let  CantAsistentes = celdas[6].innerHTML;
  let  requerimientos = celdas[9].innerHTML;
  let  EstadoDeRequerimientos = celdas[10].innerHTML;
  let  id_de_la_reserva = celdas[11].innerHTML;


  //Ventana de Editar Reserva Modular
  const Ventana_Editar_Reserva_Modular                      = document.getElementById("Ventana_Editar_Reserva_Modular");
  Ventana_Editar_Reserva_Modular.style.display              = "block";

  //Elementos con "Value"
  let select_Modalidad_Editar_Reserva_Modular               = document.getElementById("select_Modalidad_Editar_Reserva_Modular");
  let input_horaInicioSeleccionada_Editar_Reserva_Modular   = document.getElementById("input_horaInicioSeleccionada_Editar_Reserva_Modular");
  let input_horaFinalSeleccionada_Editar_Reserva_Modular    = document.getElementById("input_horaFinalSeleccionada_Editar_Reserva_Modular");
  let select_docenteSeleccionado_Editar_Reserva_Modular     = document.getElementById("select_docenteSeleccionado_Editar_Reserva_Modular");
  let input_tituloDeLaReserva_Editar_Reserva_Modular    = document.getElementById("input_tituloDeLaReserva_Editar_Reserva_Modular");
  let input_cantidadDeAsistentes_Editar_Reserva_Modular     = document.getElementById("input_cantidadDeAsistentes_Editar_Reserva_Modular");
  let select_lugar_reservas_Modulares                       = document.getElementById("select_lugar_reservas_Modulares");
  let input_requerimientos_Editar_Reserva_Modular           = document.getElementById("input_requerimientos_Editar_Reserva_Modular");
  let input_Id_de_la_Reserva_Modular                        = document.getElementById("input_Id_de_la_Reserva_Modular");

  
  for (let i = 0; i < select_docenteSeleccionado_Editar_Reserva_Modular.options.length; i++) {
    let texto = select_docenteSeleccionado_Editar_Reserva_Modular.options[i].text;

    if (texto.includes(Docente)) {
      select_docenteSeleccionado_Editar_Reserva_Modular.value = select_docenteSeleccionado_Editar_Reserva_Modular.options[i].value;
      break;
    }
  }

  
  for (let i = 0; i < select_Modalidad_Editar_Reserva_Modular.options.length; i++) {
    let texto = select_Modalidad_Editar_Reserva_Modular.options[i].text;

    if (texto.includes(tipoDeModalidad)) {
      select_Modalidad_Editar_Reserva_Modular.value = select_Modalidad_Editar_Reserva_Modular.options[i].value;
      break;
    }
  }

  for (let i = 0; i < select_lugar_reservas_Modulares.options.length; i++) {
    let texto = select_lugar_reservas_Modulares.options[i].text;

    if (texto.includes(Aula)) {
      select_lugar_reservas_Modulares.value = select_lugar_reservas_Modulares.options[i].value;
      break;
    }
  }


  //Insertando Datos en los inputs
  input_tituloDeLaReserva_Editar_Reserva_Modular.value = MateriaTitulo;
  input_horaInicioSeleccionada_Editar_Reserva_Modular.value = HorarioInicio;
  input_horaFinalSeleccionada_Editar_Reserva_Modular.value = HorarioFinal;
  input_cantidadDeAsistentes_Editar_Reserva_Modular.value = CantAsistentes;
  input_requerimientos_Editar_Reserva_Modular.value = requerimientos;
  input_Id_de_la_Reserva_Modular.value = id_de_la_reserva;

  
  
}*/

/*
function extraerFilaDeSoportes(NroDefila){

  window.scrollTo(0, 0);
  let  tabla = document.getElementById("tabla_SoportesHoy_Contenido");

  let Ventana_EditarSoporte = document.getElementById("Ventana_EditarSoporte");
  Ventana_EditarSoporte.style.display = "block";
  let select_Vna_EditarSoporte_UsuarioAtendido = document.getElementById("select_Vna_EditarSoporte_UsuarioAtendido");
  let select_Vna_EditarSoporte_Medio_de_Soporte = document.getElementById("select_Vna_EditarSoporte_Medio_de_Soporte");
  let input_Vna_EditarSoporte_Motivo = document.getElementById("input_Vna_EditarSoporte_Motivo");
  let input_Vna_EditarSoporte_HoraSolicitud = document.getElementById("input_Vna_EditarSoporte_HoraSolicitud");
  let input_Id_del_Soporte = document.getElementById("input_Id_del_Soporte");

  let  fila  = tabla.getElementsByTagName("tr");
  let celdas = fila[NroDefila].getElementsByTagName("td");

  //Extrae los contenidos de cada celda
  let  UsuarioAtendido = celdas[1].innerHTML;
  let  MedioSoporte = celdas[2].innerHTML;
  let  motivo = celdas[3].innerHTML;
  let  horaDeSolicitud = celdas[4].innerHTML;

  let  cdg_deSoporte = celdas[6].innerHTML;

  let cantidadCaracteres = UsuarioAtendido.length;
  if(cantidadCaracteres == 6){

    UsuarioAtendido = "Estudiante"

  }
 


  for (let i = 0; i < select_Vna_EditarSoporte_UsuarioAtendido.options.length; i++) {
    let texto = select_Vna_EditarSoporte_UsuarioAtendido.options[i].text;

    if (texto.includes(UsuarioAtendido)) {
      select_Vna_EditarSoporte_UsuarioAtendido.value = select_Vna_EditarSoporte_UsuarioAtendido.options[i].value;
      break;
    }
  }
  for (var i = 0; i < select_Vna_EditarSoporte_Medio_de_Soporte.options.length; i++) {
    var texto = select_Vna_EditarSoporte_Medio_de_Soporte.options[i].text;
    if (texto.includes(MedioSoporte)) {
      select_Vna_EditarSoporte_Medio_de_Soporte.value = select_Vna_EditarSoporte_Medio_de_Soporte.options[i].value;
      break;
    }
  }
 
  input_Vna_EditarSoporte_Motivo.value = motivo;
  input_Vna_EditarSoporte_HoraSolicitud.value = horaDeSolicitud;
  input_Id_del_Soporte.value = cdg_deSoporte;

}*/

/*
function extraerFilaDeReservaAConfirmar(NroDefila){

  window.scrollTo(0, 0);
  let  tabla = document.getElementById("tabla_ReservasPorConfirmar_Contenido");
  let Ventana_Confirmar_Reserva = document.getElementById("Ventana_Confirmar_Reserva");
  Ventana_Confirmar_Reserva.style.display = "block";


  let select_lugar_reservas_porConfirmar = document.getElementById("select_lugar_reservas_porConfirmar");
  let input_Id_de_la_Reserva = document.getElementById("input_Id_de_la_Reserva");
  
  let input_MateriaOtitulo_ConfirmarReserva =  document.getElementById("input_MateriaOtitulo_ConfirmarReserva");
  let select_Vna_Confirmar_Reserva_Docente =  document.getElementById("select_Vna_Confirmar_Reserva_Docente");
  let input_HoraInicio_ConfirmarReserva =  document.getElementById("input_HoraInicio_ConfirmarReserva");
  let input_HoraFinal_ConfirmarReserva =  document.getElementById("input_HoraFinal_ConfirmarReserva");
  let input_fechaInicio_ConfirmarReserva =  document.getElementById("input_fechaInicio_ConfirmarReserva");
  let input_cantidadAsistentes_ConfirmarReserva =  document.getElementById("input_cantidadAsistentes_ConfirmarReserva");



  let  fila  = tabla.getElementsByTagName("tr");
  let celdas = fila[NroDefila].getElementsByTagName("td");

  //Extrae los contenidos de cada celda
  let  materiaOTitulo = celdas[0].innerHTML;
  let  docente = celdas[1].innerHTML;
  let  HorarioInicio = celdas[2].innerHTML;
  let  HorarioFinal = celdas[3].innerHTML;
  let  FechaInicio = celdas[4].innerHTML;
  let  lugar = celdas[5].innerHTML;
  let  cantidadDeEstudiantes = celdas[6].innerHTML;
  let  cdg_deReserva = celdas[7].innerHTML;

  for (let i = 0; i < select_Vna_Confirmar_Reserva_Docente.options.length; i++) {
    let texto = select_Vna_Confirmar_Reserva_Docente.options[i].text;

    if (texto.includes(docente)) {
      select_Vna_Confirmar_Reserva_Docente.value = select_Vna_Confirmar_Reserva_Docente.options[i].value;
      break;
    }
  }

  for (let i = 0; i < select_lugar_reservas_porConfirmar.options.length; i++) {
    let texto = select_lugar_reservas_porConfirmar.options[i].text;

    if (texto.includes(lugar)) {
      select_lugar_reservas_porConfirmar.value = select_lugar_reservas_porConfirmar.options[i].value;
      break;
    }
  }
 
  input_Id_de_la_Reserva.value = cdg_deReserva;
  input_MateriaOtitulo_ConfirmarReserva.value = materiaOTitulo;
  input_HoraInicio_ConfirmarReserva.value = HorarioInicio;
  input_HoraFinal_ConfirmarReserva.value = HorarioFinal;
  input_fechaInicio_ConfirmarReserva.value = FechaInicio;
  input_cantidadAsistentes_ConfirmarReserva.value = cantidadDeEstudiantes;

}*/
/*
function editar_Requerimientos(NroDefila){

  window.scrollTo(0, 0);

  const Ventana_Editar_Requerimientos                      = document.getElementById("Ventana_Editar_Requerimientos");
  Ventana_Editar_Requerimientos.style.display              = "block";


  //Extrayendo los datos de la tabla y fila seleccionada
  let  tabla  = document.getElementById("tabla_ReservasModulares_contenido");
  let  fila   = tabla.getElementsByTagName("tr");
  let  celdas = fila[NroDefila].getElementsByTagName("td");
  

  let  requerimientos         = celdas[9].innerHTML;
  let  EstadoDeRequerimientos = celdas[10].innerHTML;
  let  id_de_la_reserva       = celdas[11].innerHTML;


  let select_estadoDeRequerimientos_Editar_Requerimientos_Modular = document.getElementById("select_estadoDeRequerimientos_Editar_Requerimientos_Modular");
  let input_requerimientos_Editar_Requerimientos_Modular          = document.getElementById("input_requerimientos_Editar_Requerimientos_Modular");
  let input_Id_de_los_Requerimientos_Modular                      = document.getElementById("input_Id_de_los_Requerimientos_Modular");


  if(EstadoDeRequerimientos == ""){
    EstadoDeRequerimientos = 'Incompleto';
  }



  for (let i = 0; i < select_estadoDeRequerimientos_Editar_Requerimientos_Modular.options.length; i++) {
    let texto = select_estadoDeRequerimientos_Editar_Requerimientos_Modular.options[i].text;

    if (texto.includes(EstadoDeRequerimientos)) {
      select_estadoDeRequerimientos_Editar_Requerimientos_Modular.value = select_estadoDeRequerimientos_Editar_Requerimientos_Modular.options[i].value;
      break;
    }
  }


  
  input_Id_de_los_Requerimientos_Modular.value = id_de_la_reserva;
  input_requerimientos_Editar_Requerimientos_Modular.value = requerimientos;

}*/