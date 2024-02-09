class LineChart {
    constructor( config, data ){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || { top:10, right:10, bottom:10, left:10 },
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
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
            .range( [ 0, self.inner_height ] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks( 12 )
            .tickSizeOuter( 0 );

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks( 10 )
            .tickSizeOuter( 0 );

        self.xaxis_group = self.chart.append( 'g' )
            .attr( 'transform', `translate(0, ${self.inner_height})` );

        self.yaxis_group = self.chart.append( 'g' )
            .attr( 'transform', `translate(0, 0)` );

        self.line = d3.line()
            .x( d => self.xscale( d.month ) )
            .y( d => self.yscale( d.temperature ) );
    }

    update() {
        let self = this;

        self.xscale.domain( [ 1, d3.max( self.data, d => d.month ) ] );
        self.yscale.domain( [ d3.max( self.data, d => d.temperature ), 0 ] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll( "circle" )
            .data( self.data )
            .enter()
            .append( "circle" )
            .attr( "cx", d => self.xscale( d.month ) )
            .attr( "cy", d => self.yscale( d.temperature ) )
            .attr( "r", 5 );

        self.svg.append( 'path' )
            .attr( 'transform', `translate(${self.config.margin.left}, ${self.config.margin.top})` )
            .attr( 'd', self.line( self.data ) )
            .attr( 'stroke', 'black' )
            .attr( 'fill', 'none' );

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}