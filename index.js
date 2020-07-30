let go = document.querySelector("button"); 
let gains = 100;
let pertes = 0;
let hasard;

//fonction qui génère un nombre au hasard
function nombreAuHasard (){
    return Math.floor(Math.random() * 36);
}

//fonction qui verifie si le nombre est pair ou impair et si l'utilisateur a trouvé
function VerificationParite(x, choix){
    if(x % 2 == 0 && choix == "pair")
        return 1;
    else if (x % 2 == 1 && choix == "impair")
        return 1;
    else
        return 0;
}
//fonction qui vérifie les entrées et affiche les resulats
function VerificationEtAffichage(){
    let parite = VerificationParite(hasard, document.querySelector("select").value);
    let mise = parseInt(document.querySelector("input[name=mise]").value);
    let chiffre = parseInt(document.querySelector("input[name=chiffre]"));
    //message qui s'affichera apres un pari
    let message = ["Le nombre à deviner était : "+hasard+". \nDommage, vous avez perdu la mise", 
    "Bravo vous avez reussi a trouver la parité du nombre  💪💪.\nVous recevrez donc le double de votre mise.", 
    "Jackpot !!! Vous avez trouvé le nombre exact :"+hasard+".🎉🎉🎉!!!\nVous recevez donc votre mise multipliée par 36!"];

    if(hasard == 0){
        //perte de la mise
        gains -= mise;
        pertes +=mise;
        alert(message[0]);
    }
    else if(chiffre == hasard){
        gains += mise * 36;
        alert(message[2]);
    }
    else if(parite == 1){
        //parité trouvée
        gains += mise * 2;
        alert(message[1]);
    }
    else if(parite == 0){
        gains -= mise;
        pertes += mise;
        alert(message[0]);
    }
    document.getElementById("gains").innerHTML = ("Vos gains sont de : "+gains+" milles francs.");
    document.getElementById("pertes").innerHTML = ("Vos avez perdu : "+pertes+" milles francs.");
}
//fonction qui se déclence apres le clic sur le bouton go 
//et qui effectue les calculs en appelant les autres fonctions
go.onclick = function(){
    // verifier s'il a choisi un nombre
    if(document.querySelector("input[name=chiffre]").value == ""){
        alert ("Veuillez choisir un nombre.");
        return 0;
    }
    // verifier s'il n'a pas saisi au clavier un nombre > 36 ou < 1
    if(document.querySelector("input[name=chiffre]").value > 36 || document.querySelector("input[type=number]").value < 1){
        alert ("Veuillez choisir un nombre compris entre 1 et 36.");
        return 0;
    }
    // verifier s'il a parié
    if(document.querySelector("input[name=mise]").value == ""){
        alert("Veuillez déposer une somme à parier.");
        return 0;
    }

    let repetitionCounter = 0;
    let myvar = setInterval(numberAnimation, 100);
        
    // fonction qui affiche des nombres au hasard 10 fois puis le dernier nombre represente le mot a deviner
    function numberAnimation(){        
        if(repetitionCounter > 10){
        clearInterval(myvar);
        }
        hasard = nombreAuHasard();
        document.getElementById("animation").innerHTML ='Le nombre à deviner était : '+hasard;
        repetitionCounter++;
    }
    setTimeout(VerificationEtAffichage, 100*20);
    
}