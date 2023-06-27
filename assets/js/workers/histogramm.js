'use strict';

self.onmessage = msg => {

    // Container zum Speichern der Anzahl der Helligkeitswerte der jeweiligen Farbe.
    const rot = prepareColorContainer();
    const gruen = prepareColorContainer();;
    const blau = prepareColorContainer();;

    const imgData = msg.data; // Die Bilddaten

    // Hier wird erfasst, wie oft ein Farbwert (separat für rot, grün und blau) im Bild vorkommt.
    // Z.B. 12001 mal der rote Farbwert 200.
    // Bei jedem Loop wird in den Farbverteilungs-Containern rot, gruen und blau jeweils der Wert
    // des entsprechenden Keys um 1 erhöht.
    // Der Key in den Farbverteilungs-Containern wird anhand des Farbwertes aus dem Bild bestimmt.
    // Bsp. Wenn das Pixel mit Index 10 den Rot-Farbwert 200 hat, wird im Container rot 
    // der Wert des Keys 200 um 1 erhöht.
    
    for (let i = 0; i < imgData.length; i += 4) {
        // i += 4, weil die Bilddaten in 4er Blöcken vorliegen (rot, grün, blau, alpha)
        // alpha wird nicht benötigt, deshalb wird es übersprungen

        // Den Key aus der Map nehmen und um 1 erhöhen

        rot.set(imgData[i], rot.get(imgData[i]) + 1);
        gruen.set(imgData[i + 1], gruen.get(imgData[i + 1]) + 1);
        blau.set(imgData[i + 2], blau.get(imgData[i + 2]) + 1);
    }

    // console.log(JSON.stringify([...rot]));

    self.postMessage({
        status: 'done',
        rot,
        gruen,
        blau
    })

    // Die Maps werden vorgefüllt mit den Attributen 0 - 255, die jeweils eine 0 enthalten.
    // Diese werden später als Keys verwendet. Das ist erforderlich, weil Map keinen Index hat.
    // Die Key entsprechnen den möglichen Helligkeitswerten 0  - 255.
    function prepareColorContainer() {
        return new Map([...new Array(256)].map((val, index) => [index, 0]));
    }
}