const predictBtn = document.getElementById('download-btn');
const resultDiv = document.getElementById('result');

// Fonction pour générer un nombre aléatoire entre 1 et 90
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour générer 5 numéros aléatoires différents
function predictNumbers() {
    let numbers = [];
    for (let i = 0; i < 5; i++) {
        let num = generateRandomNumber(1, 90);
        while (numbers.includes(num)) {
            num = generateRandomNumber(1, 90);
        }
        numbers.push(num);
    }
    return numbers;
}

predictBtn.addEventListener('click', () => {
    const predictions = predictNumbers();
    resultDiv.innerHTML = ` ${predictions.join(' - ')}<br>Bonne chance à vous !`;
});