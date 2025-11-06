function abrirWhatsapp() {
    // Número de teléfono y mensaje (opcional)
    var telefono = "+59170918874";
    var mensaje = "Hola, estoy interesado en sus servicios, quisiera saber más sobre ellos.";

    // Construir la URL de WhatsApp
    var url = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(mensaje);

    // Abrir la ventana de chat de WhatsApp
    window.open(url);
}

// Función para calcular la edad
function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var nacimiento = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

// Actualizar edad al cargar
document.addEventListener('DOMContentLoaded', function() {
    var edad = calcularEdad('1999-03-15');
    var elementoEdad = document.getElementById('edad');
    var elementoEdadCV = document.getElementById('edad-cv');
    
    if (elementoEdad) {
        elementoEdad.textContent = edad;
    }
    if (elementoEdadCV) {
        elementoEdadCV.textContent = edad;
    }
});

  function DescargarCV(event){
    // Obtener el elemento del CV oculto y su contenedor
    const element = document.getElementById('cv-pdf');
    const container = document.getElementById('cv-pdf-container');
    
    // Obtener el botón que activó la función
    const btnOriginal = event ? event.target : window.event ? window.event.target : null;
    let textoOriginal = '';
    
    // Si hay botón, guardar texto original y mostrar mensaje de carga
    if (btnOriginal) {
      textoOriginal = btnOriginal.innerHTML;
      btnOriginal.innerHTML = '<i class="ti-reload pr-2"></i>Generando PDF...';
      btnOriginal.disabled = true;
    }
    
    // Verificar que los elementos existan
    if (!element || !container) {
      alert('Error: No se encontró el contenido del CV. Por favor, recarga la página.');
      if (btnOriginal) {
        btnOriginal.innerHTML = textoOriginal;
        btnOriginal.disabled = false;
      }
      return;
    }
    
    // Mostrar temporalmente el contenedor para que html2canvas pueda capturarlo
    // Convertir 210mm a píxeles (1mm = 3.7795275591px a 96 DPI)
    const widthInPx = 210 * 3.7795275591; // ~794px
    const heightInPx = 297 * 3.7795275591; // ~1123px
    
    // Remover todas las clases y estilos que ocultan el contenedor usando setProperty con important
    if (container) {
      container.style.setProperty('display', 'block', 'important');
      container.style.setProperty('position', 'fixed', 'important');
      container.style.setProperty('left', '50%', 'important');
      container.style.setProperty('top', '0', 'important');
      container.style.setProperty('transform', 'translateX(-50%)', 'important');
      container.style.setProperty('width', widthInPx + 'px', 'important');
      container.style.setProperty('max-width', widthInPx + 'px', 'important');
      container.style.setProperty('min-width', widthInPx + 'px', 'important');
      container.style.setProperty('visibility', 'visible', 'important');
      container.style.setProperty('opacity', '1', 'important');
      container.style.setProperty('z-index', '9999', 'important');
      container.style.setProperty('overflow', 'visible', 'important');
      container.style.setProperty('background-color', '#ffffff', 'important');
      container.style.setProperty('height', 'auto', 'important');
    }
    
    // Asegurar que el elemento del CV tenga el tamaño correcto y sea visible
    if (element) {
      const paddingInPx = 15 * 3.7795275591; // 15mm en píxeles
      
      element.style.setProperty('width', widthInPx + 'px', 'important');
      element.style.setProperty('max-width', widthInPx + 'px', 'important');
      element.style.setProperty('margin', '0', 'important');
      element.style.setProperty('padding', paddingInPx + 'px', 'important');
      element.style.setProperty('box-sizing', 'border-box', 'important');
      element.style.setProperty('overflow', 'visible', 'important');
      element.style.setProperty('position', 'relative', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
      element.style.setProperty('display', 'block', 'important');
      element.style.setProperty('visibility', 'visible', 'important');
      element.style.setProperty('opacity', '1', 'important');
    }
    
    // Opciones de configuración para el PDF
    const opt = {
      margin: 1,
      filename: 'CV_Jose_Carlo_Suarez_Brucsoni.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: true, // Activar para debug
        allowTaint: false,
        backgroundColor: '#ffffff',
        removeContainer: false,
        onclone: function(clonedDoc) {
          // Asegurar que el elemento clonado sea visible
          const clonedElement = clonedDoc.getElementById('cv-pdf');
          if (clonedElement) {
            clonedElement.style.display = 'block';
            clonedElement.style.visibility = 'visible';
            clonedElement.style.opacity = '1';
          }
        }
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Pequeño delay para asegurar que el contenido se renderice completamente
    setTimeout(() => {
      // Forzar reflow para asegurar que el contenido se renderice
      if (element) {
        element.offsetHeight; // Trigger reflow
      }
      
      // Verificar que el elemento sea visible antes de capturar
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        console.error('El elemento del CV no es visible');
        alert('Error: El contenido del CV no se está mostrando correctamente. Por favor, intenta nuevamente.');
        if (btnOriginal) {
          btnOriginal.innerHTML = textoOriginal;
          btnOriginal.disabled = false;
        }
        return;
      }
      
      console.log('Generando PDF - Dimensiones:', rect.width, 'x', rect.height);
      
      // Generar y descargar el PDF
      html2pdf().set(opt).from(element).save().then(() => {
        // Ocultar el contenedor nuevamente
        if (container) {
          container.style.display = 'none';
          container.style.position = 'absolute';
          container.style.left = '-9999px';
          container.style.top = '-9999px';
          container.style.visibility = 'hidden';
          container.style.opacity = '0';
          container.style.width = '0';
          container.style.maxWidth = 'none';
          container.style.minWidth = 'none';
          container.style.transform = 'none';
          container.style.height = '0';
        }
        
        // Restaurar estilos del elemento
        if (element) {
          element.style.width = '';
          element.style.maxWidth = '';
          element.style.margin = '';
          element.style.padding = '';
        }
      
        // Restaurar el botón si existe
        if (btnOriginal) {
          btnOriginal.innerHTML = textoOriginal;
          btnOriginal.disabled = false;
        }
      }).catch((error) => {
        console.error('Error al generar PDF:', error);
        
        // Ocultar el contenedor en caso de error
        if (container) {
          container.style.display = 'none';
          container.style.position = 'absolute';
          container.style.left = '-9999px';
          container.style.top = '-9999px';
          container.style.visibility = 'hidden';
          container.style.opacity = '0';
          container.style.width = '0';
          container.style.maxWidth = 'none';
          container.style.minWidth = 'none';
          container.style.transform = 'none';
          container.style.height = '0';
        }
        
        // Restaurar estilos del elemento
        if (element) {
          element.style.width = '';
          element.style.maxWidth = '';
          element.style.margin = '';
          element.style.padding = '';
        }
        
        alert('Error al generar el PDF. Por favor, intenta nuevamente.');
        // Restaurar el botón si existe
        if (btnOriginal) {
          btnOriginal.innerHTML = textoOriginal;
          btnOriginal.disabled = false;
        }
      });
    }, 300); // Aumentar delay a 300ms para asegurar renderizado completo
  }