const form = document.getElementById('payment-form');
    const resultDiv = document.getElementById('result');
    const countdownDiv = document.getElementById('countdown');
    const messageDiv = document.getElementById('message');

    // Ton lien PayDunya avec return_url GitHub Pages
    const returnUrl = "https://Adjarie25.github.io/LOTO-PREDICTION-/turbo.html?paid=true";
    const paymentUrl = `https://pydu.me/KXsYCX?return_url=${encodeURIComponent(returnUrl)}`;

    function generateNumbers() {
      let a = Math.floor(Math.random() * 90) + 1;
      let b;
      do {
        b = Math.floor(Math.random() * 90) + 1;
      } while (a === b);
      resultDiv.textContent = `🔢 Vos numéros sont : ${a} et ${b}`;
    }

    function startCountdown(seconds) {
      let time = seconds;
      const interval = setInterval(() => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        countdownDiv.textContent = `⏳ Prochain tirage dans : ${h}h ${m}m ${s}s`;
        if (time <= 0) {
          clearInterval(interval);
          generateNumbers();
          startCountdown(2 * 3600);
        }
        time--;
      }, 1000);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = paymentUrl;
    });

    window.addEventListener('load', () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("paid") === "true") {
        messageDiv.textContent = "✅ Paiement confirmé avec succès !";
        generateNumbers();
        startCountdown(2 * 3600);
      }
    });
    
    
function toggleMenu() {
      const menu = document.getElementById('menu');
      const button = document.querySelector('.menu-button');
      menu.classList.toggle('active');
      button.classList.toggle('active');
    }
