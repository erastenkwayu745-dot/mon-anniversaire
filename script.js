const monNom = "Eraste"; 
// Date cible : 29 Juin 2026 à 00:00:00
const targetDate = new Date("June 29, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        // Le grand jour est arrivé !
        document.getElementById("countdown").style.display = "none";
        document.getElementById("title").innerHTML = `C'est le moment de célébrer, <span class='nom-personnalise'>${monNom}</span> !`;
        document.getElementById("celebration-zone").style.display = "block";
        
        runCelebrationEffects();
        clearInterval(interval);
        return;
    }

    // Calcul mathématique du temps restant
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Affichage dynamique dans les blocs
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
}

function runCelebrationEffects() {
    const duration = 15 * 1000; // 15 secondes d'effets intenses
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const intervalEffets = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(intervalEffets);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Explosions de feux d'artifice synchronisées à gauche et à droite
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Pluie continue de confettis/fleurs sur les côtés
    setInterval(() => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    }, 400);
}

// Mise à jour toutes les secondes
const interval = setInterval(updateCountdown, 1000);
updateCountdown();