'use strict';

self.onmessage = msg => {
    const imgData = msg.data;

    // Array fpr die Helligkeiten der drei Farbkanäle
    let rgb = [0, 0, 0];

    for (let i = 0; i < imgData.length; i += 4) {
        // die Kanäle enthalten Zahlen zwischen 0 und 255
        rgb[0] += imgData[i];
        rgb[1] += imgData[i + 1];
        rgb[2] += imgData[i + 2];
    }

    // Helligkeit der einzelnen Farbkanäle
    rgb = rgb.map(value => value / (imgData.length / 4));

    // Gesamthelligkeit
    let brightness = rgb.reduce((sum, val) => sum + val, 0) / 3;

    self.postMessage({
        status: 'done',
        rgb: rgb.map(val => Math.round(val)),
        brightness: Math.round(brightness)
    });
}