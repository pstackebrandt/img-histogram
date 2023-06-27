'use strict';

import dom from './dom.js';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.bilder = dom.$$('.bild');
}

const appendEventlisteners = () => {

}

const handleImages = () => {
    elements.bilder.forEach(bild => {
        // Img-Tag picken
        let elImg = bild.querySelector('.preview');

        // Canvas erzeugen
        let c = dom.create({
            type: 'canvas',
            parent: bild,
            attr: {
                width: elImg.naturalWidth,
                height: elImg.naturalHeight
            },
            classes: ['cPreview']
        })

        // Context erzeugen
        let ctx = c.getContext('2d');

        // Bild in Canvas übertragen
        ctx.drawImage(elImg, 0, 0);

        // Bilddaten aus dem Canvas lesen
        let imgData = ctx.getImageData(0, 0, c.width, c.height);
        // console.log(imgData);
        // Nur das Daten-Array an die Funktion übergeben
        analyzeImgData(imgData.data).then(
            result => {
                drawCurve(c, result.rot, '#f00')
                drawCurve(c, result.gruen, '#0f0')
                drawCurve(c, result.blau, '#00f')
            }
        ).catch(
            console.warn
        );

    })
}

const drawCurve = (c, data, color) => {
    let ctx = c.getContext('2d');
    let maxValue = Math.max(...[...data].map(val => val[1]));
    // let maxValue = c.width * c.height;
    // console.log(imgData);
    // Rote Linie
    ctx.strokeStyle = color;
    ctx.lineWidth = c.height / 200;
    ctx.beginPath();

    // Startpunkt
    ctx.moveTo(-1,c.height / maxValue * data.get[0]);

    // Alle Punkte zeichnen
    data.forEach((value, key) => {
        ctx.lineTo(
            c.width / 255 * key,
            c.height / maxValue * value
        )
    })
    ctx.stroke();
}

const analyzeImgData = imgData => {
    // Damit wir das Ergebnis beim Aufruf verarbeiten können, brauchen wir einen Promise
    return new Promise(resolve => {

        const worker = new Worker('assets/js/workers/histogramm.js');

        // Daten an den Worker senden
        worker.postMessage(imgData);

        // Antwort vom Worker verarbeiten
        worker.onmessage = msg => {
            resolve(msg.data);
            worker.terminate();
        }
    })
}

const init = () => {
    domMapping();
    appendEventlisteners();
    handleImages();
}

// INIT
// Da später mit den Bilddaten gearbeitet wird, müssen sie vollständig geladen sein
window.addEventListener('load', init);