d3.csv( "https://KenIwata-cs52.github.io/InfoVis2023/FinalTask/Data/population_dynamics.csv" )
    .then( data => {
        data.forEach( d => {
            d.year = +d.year;
            d.population = +d.population;
            d.births = +d.births;
            d.deaths = +d.deaths;
        });

        const color_scale = d3.scaleSequential( d3.interpolateRainbow ).domain( [ 0, 47 ] );

        let bar_chart = new BarChart({
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: { top:10, right:10, bottom:50, left:50 },
            xlabel: 'regions',
            cscale: color_scale,
            year: 2022
        }, input_data );
        bar_chart.update();

        // let line_chart = new LineChart( {
        //     parent: '#drawing_region_barchart',
        //     width: 256,
        //     height: 256,
        //     margin: { top:10, right:10, bottom:50, left:50 },
        //     xlabel: 'year',
        //     cscale: color_scale
        // }, input_data );
        // line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });
