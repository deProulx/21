document.addEventListener('DOMContentLoaded', () => {
    // Création du compteur de parties jouées (si ce dernier n'existe pas déjà) en stockage local
    if (!localStorage.getItem('gamesPlayed')) {
        localStorage.setItem('gamesPlayed', 0);
    }

    let elStart = document.querySelector('form');

    if (elStart) {
        new Start(elStart);
    }
})