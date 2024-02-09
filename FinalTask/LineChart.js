class LineChart {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || { top:10, right:10, bottom:10, left:10 },
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            color: config.color || 'black',
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
        
        const xlabel_space = 40;
        self.svg.append( 'text' )
            .style( 'font-size', '12px' )
            .attr( 'x', self.config.width / 2 )
            .attr( 'y', self.inner_height + self.config.margin.top + xlabel_space )
            .text( self.config.xlabel );

        const ylabel_space = 50;
        self.svg.append( 'text' )
            .style( 'font-size', '12px' )
            .attr( 'x', 0 )
            .attr( 'y', ylabel_space/2 )
            .text( self.config.ylabel );

        // let data = self.data.filter( d => d.region == self.config.region );
        // if( data.length > 0 ){
        //     self.svg.append( 'text' )
        //         .style( 'font-size', '12px' )
        //         .attr( 'x', self.inner_width + self.config.margin.left )
        //         .attr( 'y', self.inner_height - data.slice(-1)[0].population )
        //         .text( self.config.region );
        // }
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
                .attr( "r", 5 )
                .attr( "fill", self.config.color )
                .on( 'mouseover', (e,d) => {
                    d3.select( '#tooltip' )
                        .style( 'opacity', 1)
                        .html( `<div class="tooltip-label">${d.year}</div>${d.population}` );
                })
                .on( 'mousemove', (e) => {
                    const padding = 12;
                    d3.select( '#tooltip' )
                        .style( 'left', ( e.pageX + padding ) + 'px' )
                        .style( 'top', ( e.pageY + padding ) + 'px' );
                })
                .on( 'mouseleave', () => {
                    d3.select( '#tooltip' )
                        .style( 'opacity', 0 );
                });;

            self.svg.append( 'path' )
                .attr( 'transform', `translate(${self.config.margin.left}, ${self.config.margin.top})` )
                .attr( 'd', self.line( data ) )
                .attr( 'stroke', self.config.color )
                .attr( 'stroke-width', 5 )
                .attr( 'fill', 'none' );

            self.svg.append( 'text' )
                .style( 'font-size', '12px' )
                .attr( 'x', self.inner_width + self.config.margin.left + 10 )
                .attr( 'y', self.yscale( data.slice(-1)[0].population ) + 10 )
                .attr( 'fill', self.config.color )
                .text( self.config.region );
        }

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }

    reload() {
        let self = this;
        self.svg = null;
        self.init();
        self.update();
    }
}