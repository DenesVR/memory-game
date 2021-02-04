import Card from "./Card";

export default class Memory {
  constructor(lvl = 1) {
    this._allIcons = [];
    this._lvl = lvl;
    //this._username = username;
    this._htmlRef = null;
    this._first = null;
    this._second = null;
    this._selected = [];
    this._turned = [];
    this.fetchIcons();
    //setUpEvents => luisteren naar flipped eventTypes
  }

  fetchIcons() {
    fetch("./../../icons/selection.json")
      .then((response) => response.json())
      .then((data) => {
        this._allIcons = data.icons.map((el) => el.properties.name);
        console.log(this._allIcons);
        this.init();
      })
      .catch((error) => console.log(error));
  }
  init() {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
        <div id="grid"></div> 
    `
    );
    this._htmlRef = document.getElementById("grid");
    //initiele html opbouwen (<div id="grid"></div>)
    this.startLevel();
  }

  startLevel() {
    // op basis van levelnr
    //x aantal Card plaatsen in #grid
    //op basis van levelNr aantal unieke items uit array halen"
    new Card("#grid", "pencil");
    new Card("#grid", "home3");
    new Card("#grid", "pencil");
    new Card("#grid", "home3");
    const result = ["home3", "pencil"];
    const allCards = [...result, ...result];
    //how to shuffle array
    //allCards.shuffle()
    //     1 => 2unieke => 4
    // 2 => 4unieke => 8
    // 3 => 8unieke => 16
    this.setUpEvents();
  }
  setUpEvents = () => {
    window.addEventListener("flipped", (e) => {
      if (e.detail._isFlipped) {
        console.log(e.detail);
        this._turned.push(e.detail);
      } else {
        this._turned = this._turned.filter((el) => el != e.detail);
      }
      if (this._turned.length === 2) {
        if (this._turned[0]._icon === this._turned[1]._icon) {
          // match
          setInterval(() => {
            this._turned[0];
            this._turned[1];
            this._turned.length = 0;
          }, 1000);
        } else {
          // no match
          setInterval(() => {
            this._turned[0].turn();
            this._turned[1].turn();
          }, 1000);
        }
      }
    });
  }
}