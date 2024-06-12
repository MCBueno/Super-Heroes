$(document).ready(function () {
    $('#botonBuscar').on('click', function () {
        let heroId = $('#numeroBuscar').val();
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/${heroId}`,
            dataType: "json",
            success: function (searchHero) {
                if (!searchHero || !searchHero.image || !searchHero.image.url) {
                    alert("El id ingresado no pertenece a ningún Hero. \n Intentalo de nuevo")
                    return
                }
                console.log(searchHero)

                $('#imgHero').attr('src', searchHero.image.url);
                $('#imgHero').attr('alt', searchHero.image.url);
                $('#nameHero').text(searchHero.name);
                $('#conexionesHero').text(searchHero.connections['group-affiliation']);
                $('#publicacionHero').text(`Publicado por: ${searchHero.biography.publisher}`);
                $('#ocupacionHero').text(`Ocupación: ${searchHero.work.occupation}`);
                $('#aparicionHero').text(`Primera Aparición: ${searchHero.biography["first-appearance"]}`);
                $('#alturaHero').text(`Altura: ${searchHero.appearance.height[1]}`);
                $('#pesoHero').text(`Peso: ${searchHero.appearance.weight[1]}`);
                $('#aliasHero').text(`Alias: ${searchHero.biography.aliases}`);

                var graficoStats = new CanvasJS.Chart("grafico", { /* creamos una función con la que se construye el gráfico en la var graficoStats */
                    theme: "light2",
                    /*                     exportEnabled: true, lo comento, pero sirve para permitir exportar el gráfico - para recordarlo */
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder para ${searchHero.name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}", /* lo que aparece al colocar el mouse sobre la sección, se puede modificar el texto acá */
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})", /* lo que aparecerá en la etiqueta, se puede modificar acá, le quité los % porque no estoy trabajando con porcentajes */
                        dataPoints: [ /* la información a mostrar. y es el valor que muestra el gráfico. los remplacé por los valores obtenidos desde la API */
                            { y: searchHero.powerstats.combat, label: "Combat" },
                            { y: searchHero.powerstats.durability, label: "Durability" },
                            { y: searchHero.powerstats.intelligence, label: "Intelligence" },
                            { y: searchHero.powerstats.power, label: "Power" },
                            { y: searchHero.powerstats.speed, label: "Speed" },
                            { y: searchHero.powerstats.strength, label: "Strength" },
                        ]
                    }]
                });
                graficoStats.render();





                $('#section2').removeClass('ocultar');
            },
            error: function (error) {
                alert("El id ingresado no pertenece a ningún Hero. \n Intentalo de nuevo")
                console.log("error", error);
            }
        });
    });
});







