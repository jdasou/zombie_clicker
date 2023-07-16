let zombie = 0;

let items = [{
    name: 'infanterie', last_name: 'infanterie_prix', nb: 0, cost: 5, dps: 1
}, {
    name: 'chien', last_name: 'chien_prix', nb: 0, cost: 100, dps: 5
}, {
    name: 'predator', last_name: 'predator_prix', nb: 0, cost: 500, dps: 7
}, {
    name: 'char', last_name: 'char_prix', nb: 0, cost: 1000, dps: 15
}, {
    name: 'annihilateur', last_name: 'annihilateur_prix', nb: 0, cost: 10000, dps: 18
}, {
    name: 'motherBombe', last_name: 'motherBombe_prix', nb: 0, cost: 1000000, dps: 23
}];

// Variables pour les compteurs
let malusMessage = "Une horde de zombies vous attaque !";
let currentIndex = 0;
let malusActive = false;
let malusTimer;
const originalVideoSrc = "asset/media/lune.mp4"; // Remplacez par le chemin de votre vidéo d'origine

// JavaScript
function afficherMessages() {
    const messages = [
        "Restez calmes et concentrés, ne paniquons pas.",
        "Gardons nos distances, ils sont lents mais dangereux en groupe.",
        "Visez la tête, c'est leur point faible !",
        "Barricadons-nous dans un endroit sûr, vite !",
        "Coupez l'électricité pour éviter d'attirer leur attention.",
        "N'oubliez pas de recharger vos armes, restons prêts.",
        "Trouvons des provisions sans faire de bruit.",
        "Éteignons nos téléphones et évitons tout bruit inutile.",
        "Restons en hauteur, les toits peuvent être plus sûrs.",
        "Évitons les zones urbaines, les zombies s'y rassemblent souvent.",
        "Faisons équipe, restons ensemble pour assurer notre sécurité.",
        "Ne prenons aucun risque inutile, la prudence est notre meilleure alliée.",
        "Utilisons des armes silencieuses, les coups de feu attirent trop l'attention.",
        "Gardez un œil sur vos proches, ne les laissez jamais seuls.",
        "Recherchez des trousses de premiers soins au cas où quelqu'un serait blessé.",
        "Bloquent les portes avec des meubles, cela nous donnera du temps en cas d'urgence.",
        "Fuyons si nous sommes dépassés, notre survie prime sur tout le reste.",
        "Gardez vos distances, certains zombies peuvent être plus rapides que d'autres.",
        "Tout le monde doit apprendre à utiliser une arme, même les plus jeunes.",
        "Rappelons-nous que chaque zombie a été autrefois un être humain, ne prenons pas plaisir à les tuer, mais protégeons-nous."
    ];

    function afficherMessageAleatoire() {
        if (!malusActive) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            const alertDangerElement = document.getElementById("alerte_danger");
            alertDangerElement.textContent = message;
        }
    }

    afficherMessageAleatoire(); // Afficher un premier message immédiatement

    setInterval(afficherMessageAleatoire, 10000); // Afficher un message toutes les 10 secondes
}

// Appeler la fonction pour commencer l'affichage des messages
afficherMessages();

function utile(index) {
    let o = items[index];
    if (zombie >= o.cost) {
        zombie -= o.cost;
        o.nb++;
        o.cost *= 2;
    }
    prix();
    compte();
}

function prix() {
    for (let j = 0; j < items.length; j++) {
        const item = items[j];
        document.getElementById(item.last_name).textContent = item.cost;
    }
}

function updateZombie() {
    for (let util of items) {
        zombie += util.nb * util.dps;
    }
}

function mortZombie() {
    zombie++;
    updateZombie();
    compte();
    prix();
}

function compte() {
    document.getElementById('zombiecompte').textContent = zombie;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        document.getElementById(item.name + 'compte').textContent = item.nb;
    }
}

let autoclickEnabled = false;
let autoclickInterval = 1500;

// Fonction autoclick
function autoclick() {
    let infanterieElement = document.getElementById("zombie");
    if (infanterieElement) {
        infanterieElement.click();
    }
}

document.getElementById("infanterie").addEventListener("click", function (id) {
    autoclickEnabled = !autoclickEnabled;

    if (autoclickEnabled) {
        setInterval(autoclick, autoclickInterval);
    } else {
        clearInterval(id);
    }
});

// Fonction pour générer un nombre aléatoire entre 30 secondes et 3 minutes en millisecondes
function getRandomTime() {
    return Math.floor(Math.random() * (120000 - 30000) + 30000);
}

// Fonction pour cacher le message du malus
function cacherMessageMalus() {
    const messageElement = document.getElementById("alerte_danger");
    messageElement.textContent = "";
    messageElement.classList.add('message');
    messageElement.classList.remove('font');
    messageElement.style.color = ""; // Réinitialiser la couleur du texte (pour revenir au style par défaut)
}

// Fonction pour appliquer le malus
function applyMalus() {
    malusActive = true;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.nb = Math.floor(item.nb / 2); // Réinitialiser à la moitié du nombre actuel d'unités
    }

    // Changer la vidéo de fond
    let video = document.getElementById("background-video");
    video.src = "asset/media/attaque_zombie.mp4"; // Remplacez "chemin/vers/la/nouvelle_video.mp4" par le chemin de votre nouvelle vidéo de fond

    // Afficher le message de malus
    const messageElement = document.getElementById("alerte_danger");
    messageElement.textContent = malusMessage;
    messageElement.classList.add('font');
    messageElement.style.color = "red"; // Définir la couleur du texte en rouge

    setTimeout(function () {
        // Réinitialiser la vidéo de fond à la vidéo d'origine
        video.src = originalVideoSrc;

        // Cacher le message du malus
        cacherMessageMalus();

        malusActive = false; // Le malus est terminé
        scheduleMalus(); // Planifier le prochain malus
    }, 10000 ) // 10000 ms = 10 secondes

    clearInterval(malusTimer); // Arrêter le timer actuel
}

// Fonction pour planifier le prochain malus
function scheduleMalus() {
    const malusTime = getRandomTime();
    malusTimer = setTimeout(applyMalus, malusTime);
}

let video = document.getElementById("background-video");
video.playbackRate = 0.8;

// Appel initial pour planifier le premier malus
scheduleMalus();
