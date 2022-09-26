import Elem from "./elem.js"
const JELEK = {
    X: "x",
    O: "o"
}

class Jatekter {
    constructor() {
        this.elemek = []
        this.aktualis = JELEK.X
        this.jatekosok = {};
        this.vege = false;
        this.initJatekter()
        this.initElemek();
        this.removeKivalaszt();
        this.onKivalaszt();
        this.initJatekosok();
    }

    onKivalaszt() {
        $(document).on('kivalaszt', (e) => this.kivalaszt(e));
    }

    removeKivalaszt() {
        $(document).off('kivalaszt');
    }

    kivalaszt(e) {
        if (this.vege) {
            return;
        }
        const allapot = e.detail.getAllapot();
        this.elemek[allapot.index].setErtek(this.aktualis);
        if (this.elemek[allapot.index].jel == JELEK.X) {
            this.aktualis = JELEK.O
        } else if (this.elemek[allapot.index].jel == JELEK.O) {
            this.aktualis = JELEK.X
        }
        this.setJatekos()
        this.checkSorok()
        this.checkOszlopok()
        this.checkAtlo();
    }

    setJatekos() {
        $(".eredmenyjelzo").html(`<h3>Következő játékos: ${this.jatekosok[this.aktualis]}</h3>`)
    }

    initJatekosok() {
        this.jatekosok[JELEK.X] = $("#jatekos1").val();
        this.jatekosok[JELEK.O] = $("#jatekos2").val();
        this.setJatekos();
    }

    initElemek() {
        for (let index = 0; index < this.tablaMeret; index++) {
            this.elemek.push(new Elem(index))
        }
    }

    initJatekter() {
        this.tablaMeret = $('input[name="meret"]:checked').val();
        const table = $('<table id="table_game"></table');
        const tores = Math.sqrt(this.tablaMeret)
        let index = 0;
        for (let sorIndex = 0; sorIndex < tores; sorIndex++) {
            const sor = $('<tr></tr>')
            for (let oszlopIndex = 0; oszlopIndex < tores; oszlopIndex++) {
                const oszlop = $(`<td class="td_game"><div id="cell${index}" class="fixed"></div></td>`)
                index++;
                sor.append(oszlop)
            }
            table.append(sor)
        }
        $("#jatekter").html(table)
    }

    checkSorok() {
        const tores = Math.sqrt(this.tablaMeret);
        for (let sor = 0; sor < tores; sor++) {
            const sorTomb = this.elemek.slice(sor * tores, sor * tores + tores)
            if (sorTomb.every(elem => elem.jel && elem.jel == sorTomb[0].jel)) {
                this.nyert(sorTomb);
            }
        }
    }

    checkOszlopok() {
        const tores = Math.sqrt(this.tablaMeret);
        for (let sor = 0; sor < tores; sor++) {
            const oszlopTomb = []
            for (let oszlop = 0; oszlop < tores; oszlop++) {
                oszlopTomb.push(this.elemek[oszlop * tores + sor])
            }
            if (oszlopTomb.every(elem => elem.jel && elem.jel == oszlopTomb[0].jel)) {
                this.nyert(oszlopTomb);
            }
        }
    }

    checkAtlo() {
        const tores = Math.sqrt(this.tablaMeret);
        const atloTomb = []
        for (let sor = 0; sor < tores; sor++) {
            atloTomb.push(this.elemek[sor * tores + sor])
        }
        if (atloTomb.every(elem => elem.jel && elem.jel == atloTomb[0].jel)) {
            this.nyert(atloTomb);
        }
    }

    nyert(nyertesek) {
        this.vege = true;
        nyertesek.forEach(nyertes => {
            this.elemek[nyertes.index].szinez();
        });
        const nyertes = this.aktualis == JELEK.X ? this.jatekosok[JELEK.O] : this.jatekosok[JELEK.X]
        $(".eredmenyjelzo").html(`<h1>VÉGE</h1><h2>Nyertes: ${nyertes}</h2>`);
    }


}

export default Jatekter;