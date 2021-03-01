/**
 * La classe Card permet de créer une carte au hasard à partir de scripts/deck.js
 */
class Card {
    /**
     * Création d'une carte au hasard à partir de scripts/deck.js
     * 
     * inspiration/référence : https://codepen.io/sirjessthebrave/pen/EwaZzj?editors=1111
     */
    createCard() {
        let random = Math.floor(Math.random() * (deck.length - 1)),
            cardSuit = deck[random].suit,
            cardRank = deck[random].rank,
            cardValue;

        if (cardRank == 'A') {
            cardValue = 11;
        } else if (isNaN(cardRank)) {
            cardValue = 10;
        } else {
            cardValue = cardRank;
        }

        let card = {
            suit: cardSuit,
            rank: cardRank,
            value: cardValue
        }

        return card;
    }
}