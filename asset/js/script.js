let zombie = 0;

let items = [{
    name: 'infanterie', last_name: 'infanterie_prix', nb: 0, cost: 5, dps: 1,
}, {
    name: 'chien', last_name: 'chien_prix', nb: 0, cost: 100, dps: 5,
}, {
    name: 'predator', last_name: 'predator_prix', nb: 0, cost: 500, dps: 7,
}, {
    name: 'char', last_name: 'char_prix', nb: 0, cost: 1000, dps: 15,
}, {
    name: 'annihilateur', last_name: 'annihilateur_prix', nb: 0, cost: 10000, dps: 18 ,
}, {
    name: 'motherBombe', last_name: 'motherBombe_prix', nb: 0, cost: 1000000, dps: 23 ,
}];


let malusMessage = "Une horde de zombies vous attaque !";

let malusActive = false;
let malusTimer;
const originalVideoSrc = "asset/media/lune.mp4";
let autoclickEnabled = false;
let autoclickInterval = 1000;


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

    afficherMessageAleatoire();

    setInterval(afficherMessageAleatoire, 10000);
}


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
    hache()

}

function hache(){
    const imageContainer = document.getElementById('imageContainer');
    const imageItem = document.createElement('img');
    imageItem.setAttribute('src', 'asset/media/hache.png'); // Remplacez 'chemin/vers/votre/image.png' par le chemin de votre image
    imageItem.classList.add('image-item');
    imageContainer.appendChild(imageItem);

    setTimeout(() => {
        imageContainer.removeChild(imageItem);
    }, 4000);
}

function compte() {
    document.getElementById('zombiecompte').textContent = zombie;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        document.getElementById(item.name + 'compte').textContent = item.nb;
    }
}


function autoclick() {
    let Element = document.getElementById("zombie");
    if (Element) {
        Element.click();

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


function getRandomTime() {
    return Math.floor(Math.random() * (120000 - 30000) + 30000);
}


function cacherMessageMalus() {
    const messageElement = document.getElementById("alerte_danger");
    messageElement.textContent = "";
    messageElement.classList.add('message');
    messageElement.classList.remove('font');
    messageElement.style.color = "";
}


function applyMalus() {
    malusActive = true;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.nb = Math.floor(item.nb / 2);
    }

    // Changer la vidéo de fond
    let video = document.getElementById("background-video");
    video.src = "asset/media/attaque_zombie.mp4";
    let music = document.getElementById("music");
    music.src = "asset/media/attaque_zombie.mp4";


    const messageElement = document.getElementById("alerte_danger");
    messageElement.textContent = malusMessage;
    messageElement.classList.add('font');
    messageElement.style.color = "red";

    setTimeout(function () {

        video.src = originalVideoSrc;

        cacherMessageMalus();

        malusActive = false;
        scheduleMalus();
    }, 10000 )

    clearInterval(malusTimer);
}

let songs = {
    "zombie": "asset/media/zombie.mp3",
    "chien": "asset/media/chien.wav",
    "arme": "asset/media/arme.mp3",
    "predator": "asset/media/predator.wav",
    "char": "asset/media/char.mp3",
    "helico": "asset/media/helico.wav",
    "nuke": "asset/media/nuke.mp3",

    // Ajoutez les autres correspondances bouton-chanson ici
};

function song(index) {
    let audioElement = document.getElementById('music');
    audioElement.src = index;
    audioElement.play();
    setTimeout(function() {
        audioElement.pause();
         // Réinitialise la lecture au début de la chanson
    }, 10000); // Arrête la musique après 5 secondes (5000 millisecondes)
}

document.getElementById('zombie').addEventListener('click', function() {
    song(songs["zombie"]);
});

document.getElementById('infanterie').addEventListener('click', function() {
    song(songs["arme"]);
});
    document.getElementById('chien').addEventListener('click', function() {
    song(songs["chien"]);
});document.getElementById('predator').addEventListener('click', function() {
    song(songs["predator"]);
});document.getElementById('char').addEventListener('click', function() {
    song(songs["char"]);
});document.getElementById('annihilateur').addEventListener('click', function() {
    song(songs["helico"]);
});document.getElementById('mother-bombe').addEventListener('click', function() {
    song(songs["nuke"]);
});
function scheduleMalus() {
    const malusTime = getRandomTime();
    malusTimer = setTimeout(applyMalus, malusTime);
}
let video = document.getElementById("background-video");
video.playbackRate = 0.8;

scheduleMalus();
