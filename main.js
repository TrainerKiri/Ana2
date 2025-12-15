import './style.css'

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const bookCover = document.getElementById('book-cover');
const bookContent = document.getElementById('book-content');
const finalPage = document.getElementById('final-page');
const openButton = document.getElementById('open-book');
const bookText = document.querySelector('.book-text');

// ==========================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ==========================================

// Função para trocar de página com animação suave
function changePage(currentPage, nextPage) {
  currentPage.classList.remove('active');

  setTimeout(() => {
    nextPage.classList.add('active');
    window.scrollTo(0, 0);
  }, 300);
}

// Evento: Abrir o livro
openButton.addEventListener('click', () => {
  changePage(bookCover, bookContent);
});

// ==========================================
// SCROLL E PÁGINA FINAL
// ==========================================

// Detectar quando o usuário chegou ao final do texto
bookContent.addEventListener('scroll', () => {
  const scrollPosition = bookContent.scrollTop + bookContent.clientHeight;
  const totalHeight = bookContent.scrollHeight;

  // Se chegou ao final do conteúdo (com margem de 50px)
  if (scrollPosition >= totalHeight - 50) {
    setTimeout(() => {
      changePage(bookContent, finalPage);
    }, 1000);
  }
});

// ==========================================
// ANIMAÇÃO DE FADE AO ROLAR
// ==========================================

let lastScrollPosition = 0;

bookContent.addEventListener('scroll', () => {
  const currentScrollPosition = bookContent.scrollTop;

  // Efeito sutil de fade nos parágrafos ao rolar
  const paragraphs = bookText.querySelectorAll('p');
  const windowHeight = bookContent.clientHeight;

  paragraphs.forEach(p => {
    const rect = p.getBoundingClientRect();
    const pTop = rect.top;
    const pHeight = rect.height;

    // Se o parágrafo está na área visível
    if (pTop < windowHeight && pTop + pHeight > 0) {
      const opacity = Math.min(1, Math.max(0.4, 1 - Math.abs(pTop - windowHeight / 2) / (windowHeight / 2)));
      p.style.opacity = opacity;
    }
  });

  lastScrollPosition = currentScrollPosition;
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

// Garantir que apenas a capa está visível no início
window.addEventListener('load', () => {
  bookCover.classList.add('active');

  // Inicializar opacidade dos parágrafos
  const paragraphs = bookText.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.style.transition = 'opacity 0.3s ease';
  });
});
