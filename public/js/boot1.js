window.onload = generateNoise

function generateNoise(opacity) {
    if ( !document.createElement('canvas').getContext ) {
        return true;
    }
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        x,y,
        r,g,b,
        opacity = opacity || 1;

    canvas.width = 155;
    canvas.height = 155;

    for ( x = 0; x < canvas.width; x++ ) {
        for ( y = 0; y < canvas.height; y++ ) {
            //r = Math.floor( Math.random() * 155 );
            g = Math.floor( Math.random() * 155 );
            b = Math.floor( Math.random() * 155 );
            r = 222;
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            ctx.fillRect(x,y,1,1);
        }
    }
    //document.body.style.backgroundImage = 'url(' + canvas.toDataURL("image/png") + ')';
    document.getElementById("crimg").setAttribute("src",canvas.toDataURL("image/png"))
}
