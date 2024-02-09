let input_data = [];
let bar_chart;
let line_chart;

// let years = [...Array(25).keys()].map( i => i + 1998 );
let years = [ 2022 ];

for( let year of years ){
    let filename = "population_dynamics_" + year + ".csv";
    d3.csv( "https://KenIwata-cs52.github.io/InfoVis2023/FinalTask/Data/" + filename )
        .then( data => {
            data.forEach( d => {
                d.population = +d.population;
                d.births = +d.births;
                d.deaths = +d.deaths;
                d.year = year;
            })
            input_data.concat( data );
        })
        .catch( error => {
            console.log( error );
        });
}

const color_scale = d3.scaleSequential( d3.interpolateRainbow ).domain( [ 0, 47 ] );

bar_chart = new BarChart( {
    parent: '#drawing_region_barchart',
    width: 256,
    height: 256,
    margin: { top:10, right:10, bottom:50, left:50 },
    xlabel: 'regions',
    cscale: color_scale
}, input_data );
bar_chart.update();

// line_chart = new LineChart( {
//     parent: '#drawing_region_barchart',
//     width: 256,
//     height: 256,
//     margin: { top:10, right:10, bottom:50, left:50 },
//     xlabel: 'year',
//     cscale: color_scale
// }, input_data );
// line_chart.update();
