/**
 * La classe Table regroupe la zone de jeu;
 * la création des instances de la classe Player et un tableau qui les regroupe;
 * la mécanique d'alternance entre chaque joueur;
 * et la mécanique de fin de partie
 */
class Table {
    constructor(nbPlayers) {
        this._nbPlayers = nbPlayers;
        this._tableTop = document.querySelector('section');
        this._players = [];
        this._counter = 0;
        this._stand = 0;
        this._winnerScore = 0;

        this.init();
    }

    init() {
        this._tableTop.classList.remove('hidden');
        this.welcomePlayers();
        this.getPlayers();
        this.nextPlayer();
    }

    /**
     * Accueil des joueurs à la table
     */
    welcomePlayers() {
        for (let i = 0, l = this._nbPlayers; i < l; i++) {
            let player = 
                `<article data-js-player="${i + 1}">
                    <p class="name">Joueur&nbsp;${i + 1}</p>
                    <div class="hand" data-js-component="hand"></div>
                    <p>Score&nbsp;: <span class="score" data-js-component="score">0</span></p>
                    <div class="controls">
                        <input type="submit" value="Carte" data-js-input="hit">
                        <input type="submit" value="Passe" data-js-input="stand">
                    </div>
                </article>`;
        this._tableTop.innerHTML += player;
        }
    }

    /**
     * Récupération des joueurs (éléments) et création d'instances de classe Player
     */
    getPlayers() {
        let aPlayer = document.querySelectorAll('[data-js-player]');

        for (let i = 0, l = aPlayer.length; i < l; i++) {
            let player = new Player(aPlayer[i], i);

            // Remplissage du tableau d'instances de classe Player
            this._players.push(player);
        }
    }

    /**
     * Identification des joueurs encore en mesure de jouer
     */
    getRemainingPlayers() {
        for (let i = 0; i < this._players.length; i++) {
            // Si le joueur dépasse 21
            if (this._players[i]._score > 21) {
                // Élimination du joueur
                this._players[i].lose();
                // Retrait du joueur du tableau de joueurs encore en mesure de jouer
                this._players.splice(i, 1);
                // Ajustement pour pouvoir boucler de nouveau (puisque les éléments subséquents ont vu leur index reculer)
                i--;
            }
            // S'il reste un seul joueur encore en mesure de jouer ou que tous les joueurs sont éliminés
            if (this._players.length <= 1) {
                // Fin de la partie
                this.gameOver();
                return;
            }
        }
    }

    /**
     * Identification des joueurs ayant perdu
     */
    getLosers() {
        // Identification des joueurs ayant perdu
        let losers = document.querySelectorAll('.loser');
        return losers;
    }

    /**
     * Passage au prochain joueur (encore en mesure de jouer) à la table
     */
    nextPlayer() {
        // Ajout d'événements au clic sur les inputs Hit et Stand pour chaque joueur
        for (let i = 0; i < this._players.length; i++) {

            // Au clic sur le input Hit d'un joueur
            this._players[i]._hitBtn.addEventListener('click', () => {
                this.playerHit();
            });

            // Au clic sur le input Stand d'un joueur
            this._players[i]._standBtn.addEventListener('click', () => {
                this.playerStand();
            });
        }
    }

    /**
     * Passage au prochain joueur en mesure de jouer (ou fin de la partie)
     */
    playerHit() {
        // Réinitialisation du compteur de joueurs ayant passé
        this._stand = 0;

        // S'il reste au moins un joueur en mesure de jouer
        if (this._players.length >= 1) {
            // Si le joueur en cours n'est pas le dernier du tour de table
            if (this._counter < this._players.length - 1) {
                // Si le joueur en cours dépasse 21
                if (this._players[this._counter]._score > 21) {
                    // Défaite du joueur
                    this._players[this._counter].lose();
                } else {
                    // Mode passif
                    this._players[this._counter].passive();
                }

                // Passage au prochain joueur
                this._players[this._counter + 1].active();

                // Si tous les joueurs sont éliminés ou qu'il n'en reste qu'un en mesure de jouer
                if (this.getLosers().length >= this._nbPlayers - 1) {
                    // Fin de la partie
                    this.gameOver();
                }

                // Incrémentation du compteur
                this._counter++;
            } else {
                // Mode passif
                this._players[this._counter].passive();

                // Réinitialisation du compteur
                this._counter = 0;

                // Identification des joueurs encore en mesure de jouer
                this.getRemainingPlayers();
                
                // S'il reste au moins un joueur en mesure de jouer
                if (this._players.length >= 1) {
                    // Retour au premier joueur encore en mesure de jouer
                    this._players[0].active();
                }
            }
        }

    }

    /**
     * Passage au prochain joueur en mesure de jouer (ou fin de la partie si tous les joueurs ont passé)
     */
    playerStand() {
        // Incrémentation du compteur de joueurs ayant passé
        this._stand++;
        
        // S'il reste au moins un joueur en mesure de jouer
        if (this._players.length >= 1) {
            // Si le joueur actif n'est pas le dernier du tour de table
            if (this._counter < this._players.length -1) {
                // Passage au prochain joueur en mesure de jouer
                this._players[this._counter].passive();
                this._players[this._counter + 1].active();
                // Incrémentation du compteur
                this._counter++;
            } else {
                this._players[this._counter].passive();
                // Réinitialisation du compteur
                this._counter = 0;
                // Identification des joueurs encore en mesure de jouer
                this.getRemainingPlayers();
                if (this._players.length >= 1) {
                    // Retour au premier joueur encore en mesure de jouer
                    this._players[0].active();
                }
            }
        }

        // Si tous les joueurs encore en mesure de jouer ont passé
        if (this._stand == this._players.length) {
            // Fin de la partie
            this.gameOver();
            return;
        }
    }

    /**
     * Fin de la partie : identification du ou des gagnant(s) et du ou des perdant(s)
     */
    gameOver() {
        // Tri du tableau d'instances de classe Player selon leur score descendant
        this._players.sort((a, b) => (a._score < b._score) ? 1 : ((b._score < a._score) ? -1 : 0));

        // Boucle dans le tableau d'instances de classe Player
        for (let i = 0, l = this._players.length; i < l; i++) {
            if (this._players[i]._score > 21 ||                 // Si le joueur a un score supérieur à 21
                this._players[i]._score < this._winnerScore ||  // Si le joueur a un score inférieur à celui du gagnant
                this._players[i]._score === 0) {                // Si le joueur a un score égal à 0
                this._players[i].lose();
            } else {
                // Identification du gagnant
                this._players[i].win();
                // Mise à jour du score gagnant
                this._winnerScore = this._players[i]._score;
            }
        }

        // Comptabilisation de la partie jouée
        let gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) + 1;
        localStorage.setItem('gamesPlayed', gamesPlayed);

        // Création d'un tableau contenant les identifiants des gagnants
        let winners = [];
        for (let i = 0, l = this._players.length; i < l; i++) {
            if (this._players[i]._win == true) {
                winners.push(this._players[i]._id);
            }
        }

        // S'il y a au moins un gagnant
        if (winners.length >= 1) {
            // Création d'un message de félicitations pour le ou les gagnant(s)
            let winnerCongrats = document.createElement('aside');
            let congrats = document.createElement('h2');
            congrats.innerText = 'Félicitations';
            winnerCongrats.appendChild(congrats);

            for (let i = 0, l = winners.length; i < l; i++) {
                let winner = document.createElement('p');
                let winnerId = winners[i] + 1;
                winner.innerText = 'Joueur ' + winnerId;
                winner.classList.add('winners');
                winnerCongrats.appendChild(winner);
            }

            // Création d'un bouton pour passer aux composantes de fin de partie
            let moveOn = document.createElement('input');
            moveOn.setAttribute('type', 'submit');
            moveOn.value = 'Continuer';
            winnerCongrats.appendChild(moveOn);

            // Affichage du message de félicitations
            this._tableTop.appendChild(winnerCongrats);

            // Ajout d'un événement au clic pour passer aux composantes de fin de partie
            moveOn.addEventListener('click', () => {
                winnerCongrats.classList.add('hidden');
                this.playAgain(gamesPlayed);
            });
        } else {
            // Affichage des composantes de fin de partie
            this.playAgain(gamesPlayed);
        }
    }

    /**
     * Lancement d'une nouvelle partie
     */
    playAgain(gameCounter) {
        //Création et affichage des composantes de fin de partie
        let nbGamesPlayed;
        if (gameCounter > 1) {
            nbGamesPlayed = `${gameCounter} parties jouées`;
        } else {
            nbGamesPlayed = `${gameCounter} partie jouée`;
        }
        let theEnd = 
            `<aside>
                <p>${nbGamesPlayed}</p>
                <input type="submit" value="Rejouer" data-js-input="replay">
            </aside>`;
        this._tableTop.innerHTML += theEnd;

        // Au clic sur le input Rejouer
        let replay = document.querySelector('[data-js-input="replay"]');
        replay.addEventListener('click', () => {
            // Retrait de la table
            this._tableTop.innerHTML = '';
            this._tableTop.classList.add('hidden');
            // Affichage du formulaire de lancement de partie
            document.querySelector('form').classList.remove('hidden');
        });
    }
}