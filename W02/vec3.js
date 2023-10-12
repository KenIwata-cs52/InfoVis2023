class Vec3
{
    // Constructor
    constructor( x, y, z )
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    // Add method
    add( v )
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    // Sum method
    sum()
    {
        return this.x + this.y + this.z;
    }
    
    // Min method
    min()
    {
        return Math.min( this.x, this.y, this.z );
    }

    // Mid method
    mid()
    {
        var arr =[ this.x, this.y, this.z ];
        arr = arr.sort(
            function( x, y ) { return x - y; }
        );
        return arr[1];
    }

    // Max method
    max()
    {
        return Math.max( this.x, this.y, this.z );
    }
}