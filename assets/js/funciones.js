function abrirWhatsapp() {
    // Número de teléfono y mensaje (opcional)
    var telefono = "+59170918874";
    var mensaje = "Hola, estoy interesado en sus servicios, quisiera saber más sobre ellos.";

    // Construir la URL de WhatsApp
    var url = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(mensaje);

    // Abrir la ventana de chat de WhatsApp
    window.open(url);
  }

  function DescargarCV(){

    var url = "https://drive.google.com/drive/folders/1Idf0LullQ1Lxe9dz_yM9RAgy0OewogIK";

    window.open(url);

  }