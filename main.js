const predictBtn = document.getElementById('download-btn');
const resultDiv = document.getElementById('result');

// Durée d'attente : 2 heures (en ms)
const cooldownDuration = 2 * 60 * 60 * 1000;

// Vérifie s'il y a déjà une date de dernier clic stockée
let lastPredictionTime = localStorage.getItem('lastPredictionTime');
let clickCount = 0;

// Génère un nombre aléatoire entre min et max
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génère 4 numéros aléatoires uniques
function predictNumbers() {
    let numbers = [];
    for (let i = 0; i < 4; i++) {
        let num = generateRandomNumber(1, 90);
        while (numbers.includes(num)) {
            num = generateRandomNumber(1, 90);
        }
        numbers.push(num);
    }
    return numbers;
}

// Met à jour le compte à rebours toutes les secondes
function startCountdown(remainingTime) {
    predictBtn.disabled = true;
    const interval = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime <= 0) {
            clearInterval(interval);
            predictBtn.disabled = false;
            resultDiv.innerHTML = "Vous pouvez générer une nouvelle prédiction.";
            return;
        }
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        resultDiv.innerHTML = `⏳ Nouvelle prédiction possible dans : ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Écoute du bouton
predictBtn.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
        const predictions = predictNumbers();
        resultDiv.innerHTML = `🎯 ${predictions.join(' - ')}<br>Bonne chance à vous !`;
    } else if (clickCount >= 2) {
        const now = Date.now();
        lastPredictionTime = localStorage.getItem('lastPredictionTime');
        if (lastPredictionTime && now - lastPredictionTime < cooldownDuration) {
            const remainingTime = cooldownDuration - (now - lastPredictionTime);
            startCountdown(remainingTime);
        } else {
            startCountdown(cooldownDuration);
            localStorage.setItem('lastPredictionTime', now);
        }
    }
});

// Si une prédiction existe déjà, démarre le compte à rebours au rechargement de la page
if (lastPredictionTime) {
    const now = Date.now();
    const elapsed = now - lastPredictionTime;
    if (elapsed < cooldownDuration) {
        startCountdown(cooldownDuration - elapsed);
        clickCount = 2; // Pour prendre en compte le cooldown existant
    }
}

function toggleMenu() {
      const menu = document.getElementById('menu');
      const button = document.querySelector('.menu-button');
      menu.classList.toggle('active');
      button.classList.toggle('active');
    }
    
    
 