// Obtén la referencia al enlace por su ID
const Select_Tema = document.getElementById('Temas_Selector');
const Link_Estilos_Generales = document.getElementById('Link_Estilos_Generales');


// Selector de Temas Posterior Cambiar de temas al ser seleccionado
Select_Tema.addEventListener('change', function(event) {
    // Evita la navegación predeterminada (si es un enlace real)
    event.preventDefault();
    // Obtener el valor seleccionado en el select
    const valor = Select_Tema.value;
    // Concatenar el valor con el enlace de estilos
    const hrefNuevo = "./css/bootstrap-" + valor + ".css";
    // Cambiar el atributo href del enlace de estilos
    Link_Estilos_Generales.href = hrefNuevo;
    
    //CambiarFondoDeLosGraficos();
    
});
/*
function CambiarFondoDeLosGraficos(){
    // Obtén el color de fondo del Body
    setTimeout(function () {
        //Para Cambiar el color de fondo de los graficos
        const body = document.getElementById('body');
        const ColorDeFondo_Del_Body = getComputedStyle(document.body).backgroundColor;
        console.log('El color de fondo del body es:', ColorDeFondo_Del_Body);
        // Busca los elementos rect con la clase .piechart
        const rectPieChart = document.querySelector('#piechart div div div svg rect');
        console.log(rectPieChart);
        rectPieChart.style.fill = ColorDeFondo_Del_Body;
      }, 50);
    
}*/

function recargarPagina(){
    location.reload();
}
