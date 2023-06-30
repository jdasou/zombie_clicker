// Variables pour les compteurs
let zombie = 0;


let items = [
    {
        name: 'infanterie',
        last_name: 'infanterie_prix',
        nb: 0,
        cost: 5,
        dps: 1
    },
    {
        name: 'chien',
        last_name: 'chien_prix',
        nb: 0,
        cost: 100,
        dps: 5
    },
    {
        name: 'predator',
        last_name: 'predator_prix',
        nb: 0,
        cost: 500,
        dps: 10
    },
    {
        name: 'char',
        last_name: 'char_prix',
        nb: 0,
        cost: 1000,
        dps: 15
    },
    {
        name: 'annihilateur',
        last_name: 'annihilateur_prix',
        nb: 0,
        cost: 10000,
        dps: 20
    },
    {
        name: 'motherBombe',
        last_name: 'motherBombe_prix',
        nb: 0,
        cost: 1000000,
        dps: 30
    }
];

function utile(index) {
    let o = items[index]
    if (zombie >= o.cost) {
        zombie -= o.cost;
        o.nb++;
        o.cost *=5

    }
    prix()
    compte();


}
function prix() {
    for (let j = 0; j < items.length; j++) {
        const item = items[j];
        document.getElementById(item.last_name ).textContent = item.cost;
    }
}
function updateZombie(){
    for(let util of items) {
        zombie += util.nb * util.dps;
    }
}


function mortZombie() {

    zombie++;
    updateZombie()
    compte();
    prix()

}




function compte() {
    document.getElementById('zombiecompte').textContent = zombie;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        document.getElementById(item.name + 'compte').textContent = item.nb;
    }


}



var autoclickInterval = 900;




function autoclick() {

    var infanterieElement = document.getElementById("zombie");


    if (infanterieElement) {

        infanterieElement.click();


        zombie++;
        console.log("Morts de zombies : " + zombie);
    }
}

//setInterval(autoclick, autoclickInterval);




