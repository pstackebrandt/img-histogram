'use strict';

self.onmessage = msg => {
    const imgData = msg.data;

    // msg.data property, is a Uint8ClampedArray holding the pixel data. Each pixel is 
    // represented by four values in this array, indicating the red, green, blue, and 
    // alpha (transparency) values of the pixel.

    // Array fuer die Helligkeiten der drei Farbkanäle
    // Jeder der 3 Werte von rgb enthält je 1 Summe aller gleichfarbigen Werte aller Pixel,
    // z.B. die Summe aller Rotwerte. [0] = Rot, [1] = Gruen, [2] = Blau
    let rgb = [0, 0, 0]; 

    // Summen der Helligkeit aller Pixel berechnen
    for (let i = 0; i < imgData.length; i += 4) { // zu jedem Pixel gehören 4 Werte, der 4. (alpha) wird nicht benötigt.
        // die Kanäle enthalten Zahlen zwischen 0 und 255
        rgb[0] += imgData[i];
        rgb[1] += imgData[i + 1];
        rgb[2] += imgData[i + 2];
    }

    const pixelCount = imgData.length / 4;

    // Durchschnittliche Helligkeit der einzelnen Farbkanäle berechnen
    rgb = rgb.map(value => value / pixelCount);

    // Gesamthelligkeit berechnen (Durchschnitt über alle drei Farbkanäle)
    let brightness = rgb.reduce((sum, val) => sum + val, 0) / 3;

    self.postMessage({
        status: 'done',
        rgb: rgb.map(val => Math.round(val)),
        brightness: Math.round(brightness)
    });
}