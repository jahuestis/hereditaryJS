
export default class Daisy {
    constructor(dna = null) {
        // dna represnted as 16 bit integer. first 8 bits are genes inherited from parents, second 8 bits are dominance/recessiveness
        if (dna === null || dna < 0 || dna >= 0x10000) {
            this.dna = (Math.random() * 0x10000) >>> 0;
        } else {
            this.dna = dna
        }
        this.expressed = this.getExpressed();
    }

    breed(otherDna) {
        // decode parent DNA to binary form
        const dnaDecoded = this.dna.toString(2).padStart(16, '0');
        const otherDnaDecoded = otherDna.toString(2).padStart(16, '0');

        // determine inheritance pattern. 0 = parent 1, 1 = parent 2
        const inheritance = ((Math.random() * 0x100) >>> 0).toString(2).padStart(8, '0');

        const childDnaDecoded = "";
        // pass genes to child
        for (let i = 0; i < 8; i++) {
            if (inheritance[i] === '0') {
                childDnaDecoded += dnaDecoded[i];
            } else {
                childDnaDecoded += otherDnaDecoded[i];
            }
        }

        // pass dominance/recessiveness to child
        for (let i = 0; i < 8; i++) {
            if (inheritance[i] === '0') {
                childDnaDecoded += otherDnaDecoded[i + 8];
            } else {
                childDnaDecoded += dnaDecoded[i + 8];
            }
        }

        const childDna = parseInt(childDnaDecoded, 2);
        return childDna
        
    }

    getExpressed() {

    }
}