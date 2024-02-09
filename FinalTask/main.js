let input_data;
let bar_chart;
let line_chart;

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
            margin: { top:10, right:30, bottom:30, left:70 },
            cscale: color_scale,
            year: 2022
        }, input_data );
        bar_chart.update();

        line_chart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 600,
            height: 600,
            margin: { top:10, right:10, bottom:30, left:70 },
            xlabel: 'year',
            cscale: color_scale,
            region: ""
        }, input_data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });
