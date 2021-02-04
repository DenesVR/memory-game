export default class Card {
  constructor(holder, icon) {
    this._holder = document.querySelector(holder);
    this._icon = icon;
    this._flippedEvent = new CustomEvent("flipped", {
      detail: this
    });
    this._ref = this.init();
    this._isFlipped = false;
    this.setUpEvents();
  }

  init = () => {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
      <div class="flipper">
        <div class="card-front">
          
        </div>
        <div class="card-back">
          <svg class="icon icon-${this._icon}"><use xlink:href="./icons/symbol-defs.svg#icon-${this._icon}"></use></svg>
        </div>
      </div>
    </div>
        `
    );
    return this._holder.querySelector(".card:last-child");
  }
  setUpEvents = () => {
    this._ref.onclick = this.flip;
  }
  flip = () => {
    if (this._isFlipped) {
      this._isFlipped = false;
      //_isFlipped terug false zetten
    } else {
      this._ref.classList.add('flipped');
      this._isFlipped = true;
      //flip him
      // event uitsturen
      //send event that card has been flipped
      dispatchEvent(this._flippedEvent);
    }
  }

  block = () => {
    this._ref.classList.add('block');
  }

  turn = () => {
    this._ref.classList.remove('flipped');
  }
}