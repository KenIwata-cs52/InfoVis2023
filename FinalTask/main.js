let input_data;
let bar_chart;
let line_chart;

const input_year = document.getElementById('year');
const current_year = document.getElementById('current_year');
current_year.innerText = input_year.value;
input_year.addEventListener( 'input', function(e){
    bar_chart.config.year = e.target.value;
    current_year.innerText = e.target.value;
    bar_chart.update();
})

d3.csv( "https://KenIwata-cs52.github.io/InfoVis2023/FinalTask/Data/population_dynamics.csv" )
    .then( data => {
        input_data = data;
        data.forEach( d => {
            d.year = +d.year;
            d.population = +d.population;
            d.births = +d.births;
            d.deaths = +d.deaths;
        });

        const color_scale = d3.scaleSequential( d3.interpolateRainbow ).domain( [ 0, 46 ] );

        bar_chart = new BarChart({
            parent: '#drawing_region_barchart',
            width: 600,
            height: 600,
            margin: { top:10, right:30, bottom:50, left:70 },
            xlabel: "Population",
            cscale: color_scale,
            year: input_year.value
        }, input_data );
        bar_chart.update();

        line_chart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 600,
            height: 600,
            margin: { top:10, right:80, bottom:50, left:70 },
            xlabel: 'Year',
            ylabel: 'Population',
            region: ""
        }, input_data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function drawLine( color, region ) {
    line_chart.config.color = color;
    line_chart.config.region = region;
    line_chart.render();
}
