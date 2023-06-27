'use strict';

self.onmessage = msg => {

    // Maps zum Speichern der Helligkeitswerte
    // Die Maps werden vorgefüllt mit den Attributen 0 - 255, die jeweils eine 0 enthalten
    const rot = new Map([...new Array(256)].map((val, index) => [index, 0]));
    const gruen = new Map([...new Array(256)].map((val, index) => [index, 0]));
    const blau = new Map([...new Array(256)].map((val, index) => [index, 0]));

    const imgData = msg.data;
    
    for (let i = 0; i < imgData.length; i += 4) {
        // Den Key aus der Map nehmen und um 1 erhöhen
        rot.set(imgData[i], rot.get(imgData[i]) + 1);
        gruen.set(imgData[i+1], gruen.get(imgData[i+1]) + 1);
        blau.set(imgData[i+2], blau.get(imgData[i+2]) + 1);
    }
    
    // console.log(JSON.stringify([...rot]));

    self.postMessage({
        status: 'done',
        rot,
        gruen,
        blau
    })

}