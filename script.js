document.addEventListener('DOMContentLoaded', function() {
  // --- Menu Mobile ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('active');
    });
  }

  // --- Lógica do Quiz ---
  const quizIntroSection = document.querySelector('.quiz-intro');
  const quizSlideshowSection = document.getElementById('quiz-slideshow');
  const startQuizBtn = document.querySelector('.quiz-start-btn');

  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', function() {
      quizIntroSection.style.display = 'none';
      quizSlideshowSection.style.display = 'block';
    });
  }

  const slides = document.querySelectorAll('.quiz-slide');
  let currentSlideIndex = 0;
  const answers = {};

  if (slides.length > 0) {
    slides[currentSlideIndex].classList.add('active');
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        const question = this.getAttribute('data-question');
        const value = this.getAttribute('data-value');
        answers[question] = value;

        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex++;

        if (currentSlideIndex < slides.length) {
          slides[currentSlideIndex].classList.add('active');

          // Se estivermos na última tela (resultado) do quiz, mostramos o resultado.
          if (currentSlideIndex === slides.length - 1) {
            const quizResultSlide = document.getElementById('quiz-result-slide');
            let resultHTML = '';

            if (answers['estilo'] === 'vibratorio' && answers['uso'] === 'solo') {
              resultHTML = `
                <div class="result-item">
                  <img src="Produto.webp" alt="Seahorse Vibrator">
                  <h3>Seahorse Vibrator</h3>
                  <p>Recomendamos o Vibrador Seahorse! Experimente para um prazer solo inesquecível.</p>
                  <button class="btn">Comprar Agora</button>
                </div>
              `;
            } else if (answers['estilo'] === 'vibratorio' && answers['uso'] === 'casal') {
              resultHTML = `
                <div class="result-item">
                  <img src="Produto.webp" alt="G-spot Vibrator">
                  <h3>G-spot Vibrator</h3>
                  <p>Recomendamos o Vibrador G-spot! Ideal para apimentar a relação a dois.</p>
                  <button class="btn">Comprar Agora</button>
                </div>
              `;
            } else if (answers['estilo'] === 'manual' && answers['uso'] === 'solo') {
              resultHTML = `
                <div class="result-item">
                  <img src="Produto.webp" alt="Kegel Balls">
                  <h3>Kegel Balls</h3>
                  <p>Talvez você se identifique com os Kegel Balls, ótimos para uso solo e fortalecimento do assoalho pélvico.</p>
                  <button class="btn">Comprar Agora</button>
                </div>
              `;
            } else if (answers['estilo'] === 'manual' && answers['uso'] === 'casal') {
              resultHTML = `
                <div class="result-item">
                  <img src="Produto.webp" alt="Love Kit">
                  <h3>Love Kit</h3>
                  <p>Os Love Kits são perfeitos para momentos íntimos em casal. Confira!</p>
                  <button class="btn">Comprar Agora</button>
                </div>
              `;
            } else {
              resultHTML = `<p>Confira nossos produtos e escolha o que mais combina com você!</p>`;
            }
            quizResultSlide.innerHTML = resultHTML;
          }
        }
      });
    });
  }

  // --- Lógica para Busca e Filtros na Página de Produtos ---
  const productSearch = document.getElementById('product-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.featured-product-grid .product-card');

  if (productSearch) {
    productSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      productCards.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = name.indexOf(query) > -1 ? '' : 'none';
      });
    });
  }

  if (filterButtons) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterButtons.forEach(b => b.classList.remove('active-filter'));
        this.classList.add('active-filter');
        productCards.forEach(card => {
          card.style.display = (category === 'todos' || card.getAttribute('data-category') === category) ? '' : 'none';
        });
      });
    });
  }
});
