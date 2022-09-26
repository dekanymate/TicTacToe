const JELEK = {
    x: "x",
    o: "o"
}
const CELL_SELECTOR = "#cell";

class Elem {
    constructor(index, jel) {
        this.index = index;
        this.setErtek(jel);
        const kivalasztEvent = new CustomEvent('kivalaszt', { detail: { getAllapot: () => this } })
        $(CELL_SELECTOR + index).click(function () {
            document.dispatchEvent(kivalasztEvent)
        });
    }

    setErtek(jel) {
        const elem = $(CELL_SELECTOR + this.index);
        if (!elem.text() && jel && JELEK[jel]) {
            this.jel = jel;
            elem.append(`<span class="${jel}">${jel}</span>`)
        } else {
            this.jel = ""
        }
    }

    szinez() {
        $(CELL_SELECTOR + this.index).addClass("nyertes")
    }

}


export default Elem;