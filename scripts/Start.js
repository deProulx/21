/**
 * La classe Start récupère le formulaire de lancement de partie;
 * identifie le nombre de joueurs souhaité;
 * et instancie la classe Table
 */
class Start {
    constructor(el) {
        this._el = el;
        this._elNbPlayersInput = document.getElementById('nbPlayers');
        this._elSubmit = document.querySelector('[data-js-submit]');

        this.init();
    }

    init() {
        // Vérification du champ input pour activer le submit ou non
        this._elNbPlayersInput.addEventListener('input', () => {
            if (this.getNbPlayers() > 1 && this.getNbPlayers() <= 4) {
                this._elSubmit.disabled = false;
            } else {
                this._elSubmit.disabled = true;
            }
        });
        // Au clic sur le submit
        this._elSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (this.getNbPlayers() > 1 && this.getNbPlayers() <= 4) {
                this.startGame();
                new Table(this.getNbPlayers());
            }
        });
    }

    /**
     * Récupération du nombre de joueurs pour la partie
     */
    getNbPlayers() {
        let nbPlayers = this._elNbPlayersInput.value;

        return nbPlayers;
    }

    /**
     * Lancement de la partie
     */
    startGame() {
        this._el.classList.add('hidden');
    }
}