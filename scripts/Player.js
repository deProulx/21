/**
 * La classe Player regroupe les propriétés et les composantes pour chaque joueur
 */
class Player {
    constructor(el, id) {
        this._el = el;
        this._id = id;
        this._hand = document.querySelectorAll('[data-js-component="hand"]')[id];
        this._scoreDisplay = document.querySelectorAll('[data-js-component="score"]')[id];
        this._score = 0;
        this._hitBtn = document.querySelectorAll('[data-js-input="hit"]')[id];
        this._standBtn = document.querySelectorAll('[data-js-input="stand"]')[id];
        this._win = false;

        this.init();
    }

    init() {
        this.hit();
        this.passive();

        // Activation du premier joueur
        if (this._el.dataset.jsPlayer == 1) {
            this.active();
        }
    }
    
    /**
     * État actif (tour du joueur)
     */
    active() {
        this._el.classList.remove('passive');
        this._el.classList.add('active');
        this._hitBtn.disabled = false;
        this._standBtn.disabled = false;
    }


    /**
     * État passif (tour d'un autre joueur)
     */
    passive() {
        this._el.classList.remove('active');
        this._el.classList.add('passive');
        this._hitBtn.disabled = true;
        this._standBtn.disabled = true;
    }

    /**
     * Réception d'une nouvelle carte
     */
    hit() {
        this._hitBtn.addEventListener('click', () => {
            // Pige d'une carte
            let card = new Card();
            card = card.createCard();

            // Affichage de la carte
            let elCard = document.createElement('div');
            // Identification de la couleur de la carte
            if (card.suit == 'hearts' || card.suit == 'diams') {
                elCard.classList.add('red');
            } else if (card.suit == 'clubs' || card.suit == 'spades') {
                elCard.classList.add('black');
            }
            elCard.classList.add('card');
            elCard.innerHTML = `
                <p>${card.rank}</p>
                <p>&${card.suit};</p>
                <p>${card.rank}</p>
            `
            this._hand.appendChild(elCard);
            
            // Mise à jour du score
            this._score += card.value;
            this._scoreDisplay.textContent = this._score;
            if (this._score > 21) {
                this.lose();
            }
        });
    }

    /**
     * Défaite
     */
    lose() {
        this._el.classList.remove('active');
        this._el.classList.remove('passive');
        this._el.classList.add('loser');
        this._hitBtn.disabled = true;
        this._standBtn.disabled = true;
    }

    /**
     * Victoire
     */
    win() {
        this._el.classList.remove('active');
        this._el.classList.remove('passive');
        this._el.classList.add('winner');
        this._win = true;
        this._hitBtn.disabled = true;
        this._standBtn.disabled = true;
    }
}