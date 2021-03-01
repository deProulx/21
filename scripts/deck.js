let suits = [
    'hearts',
    'diams',
    'clubs',
    'spades'
];

let ranks = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    'J',
    'Q',
    'K',
    'A'
]

let deck = [];

// Pour chaque couleur/symbole
for (let i = 0, l = suits.length; i < l; i++) {
    // Pour chaque valeur
    for (let j = 0, m = ranks.length; j < m; j++) {
        let card = {};
        card.suit = suits[i];
        card.rank = ranks[j];
        deck.push(card);
    }
}