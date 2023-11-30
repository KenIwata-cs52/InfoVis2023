d3.csv( "../W04/population_prefecture.csv" )
    .then( data => {
        data.forEach( d => { d.population = +d.population; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: { top:10, right:10, bottom:20, left:30 }
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    } )
    .catch( error => {
        console.log( error );
    } );

class BarChart {

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

        self.svg = d3.select( self.config.parent )
            .attr( 'width', self.config.width )
            .attr( 'height', self.config.height );
            
        self.chart = self.svg.append( 'g' )
            .attr( 'transform', `translate(${self.config.margin.left}, ${self.config.margin.top})` );

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [ 0, self.inner_width ] );

        self.yscale = d3.scaleBand()
            .range( [ 0, self.inner_height ] )
            .paddingInner( 0.1 );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks( 5 )
            .tickSizeOuter( 0 );

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter( 0 );

        self.xaxis_group = chart.append( 'g' )
            .attr( 'transform', `translate(0, ${inner_height})` )

        self.yaxis_group = self.chart.append('g')
    }

    update() {
        let self = this;

        self.xscale.domain( [ 0, d3.max( self.data, d => d.population ) ] )
        self.yscale.domain( self.data.map( d => d.prefecture ) )

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll( "rect" )
            .data( self.data )
            .enter()
            .append( "rect" )
            .attr( "x", 0 )
            .attr( "y", d => self.yscale( d.prefecture ) )
            .attr( "width", d => self.xscale( d.population ) )
            .attr( "height", self.yscale.bandwidth() );

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}