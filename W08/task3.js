d3.csv( "https://KenIwata-cs52.github.io/InfoVis2023/Data/population_kinki.csv" )
    .then( data => {
        data.forEach( d => { d.population = +d.population; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: { top:10, right:50, bottom:20, left:70 }
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    } )
    .catch( error => {
        console.log( error );
    } );

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || { top:10, right:10, bottom:10, left:10 }
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.radius = Math.min( self.config.width, self.config.height ) / 2;

        self.svg = d3.select( self.config.parent )
            .attr( 'width', self.config.width )
            .attr( 'height', self.config.height )
            .append( 'g' )
            .attr( 'transform', `translate(${self.config.width/2}, ${self.config.height/2})` );

        self.pie = d3.pie()
            .value( d => d.population );

        self.arc = d3.arc()
            .innerRadius( self.radius / 2 )
            .outerRadius( self.radius );
    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll( 'pie' )
            .data( self.pie( self.data ) )
            .enter()
            .append( 'path' )
            .attr( 'd', self.arc )
            .attr( 'fill', 'black' )
            .attr( 'stroke', 'white' )
            .style( 'stroke-width', '2px' );

        self.svg.selectAll( 'label' )
            .data( self.pie( self.data ) )
            .enter()
            .append( 'text' )
            .text( d => d.data.prefecture )
            .attr( "transform", d => `translate(${self.arc.centroid(d)})` )
            .style( "text-anchor", "middle" )
            .style( "font-size", 20 )
            .attr( 'fill', 'white' );
    }
}