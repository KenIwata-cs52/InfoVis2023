class LineChart {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || { top:10, right:10, bottom:10, left:10 },
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale,
            region: config.region || ""
        };
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

        self.yscale = d3.scaleLinear()
            .range( [ self.inner_height, 0 ] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks( 5 )
            .tickSizeOuter( 0 );

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks( 5 )
            .tickSizeOuter( 0 );

        self.xaxis_group = self.chart.append( 'g' )
            .attr( 'transform', `translate(0, ${self.inner_height})` );

        self.yaxis_group = self.chart.append( 'g' )
            .attr( 'transform', `translate(0, 0)` );

        self.line = d3.line()
            .x( d => self.xscale( d.year ) )
            .y( d => self.yscale( d.population ) );
    }

    update() {
        let self = this;

        self.xscale.domain( [ d3.min( self.data, d => d.year ), d3.max( self.data, d => d.year ) ] );
        self.yscale.domain( [ 0, d3.max( self.data, d => d.population ) ] );

        self.render();
    }

    render() {
        let self = this;
        let data = self.data.filter( d => d.region == self.config.region )

        if( data.length > 0 ){
            self.chart.selectAll( "circle" )
                .data( data )
                .enter()
                .append( "circle" )
                .attr( "cx", d => self.xscale( d.year ) )
                .attr( "cy", d => self.yscale( d.population ) )
                .attr( "r", 3 );

            self.svg.append( 'path' )
                .attr( 'transform', `translate(${self.config.margin.left}, ${self.config.margin.top})` )
                .attr( 'd', self.line( self.data ) )
                .attr( 'stroke', 'black' )
                .attr( 'fill', 'none' );
        }

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}