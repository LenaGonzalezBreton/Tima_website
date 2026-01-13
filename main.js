// Simple Scroll Reveal for KPI Cards
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    html.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = html.getAttribute('data-theme');
      if (theme === 'light') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
  }

  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const kpiCards = document.querySelectorAll('.kpi-card');
  kpiCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;

    observer.observe(card);
  });

  // Contact Form Handler
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.innerText;

      btn.innerText = 'Envoyé !';
      btn.style.background = '#10B981'; // Green success color

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = ''; // Reset to default CSS
        form.reset();
      }, 3000);
    });
  }

  // Chatbot Logic
  const chatWidget = document.getElementById('chatWidget');
  const openChatBtn = document.getElementById('openChat');
  const closeChatBtn = document.getElementById('closeChat');
  const chatInput = document.getElementById('chatInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const chatBody = document.getElementById('chatBody');
  const chatSuggestions = document.getElementById('chatSuggestions');

  if (openChatBtn && closeChatBtn && chatWidget) {
    openChatBtn.addEventListener('click', () => {
      chatWidget.classList.add('active');
    });

    closeChatBtn.addEventListener('click', () => {
      chatWidget.classList.remove('active');
    });
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Chatbot Responses
  const botResponses = {
    "Qu'est-ce que TIMA ?": "TIMA (Time Manager) est une solution de gestion du temps développée par Trinity. Elle combine une pointeuse intelligente et un tableau de bord pour suivre les présences et calculer les KPIs.",
    "Pour qui ?": "<strong>Employés</strong> : Pointage simple et suivi personnel.<br><strong>Managers</strong> : Gestion d'équipe et vision globale des performances.",
    "Les avantages": "Réduction des erreurs de paie, transparence totale des horaires et pilotage stratégique grâce aux indicateurs de performance.",
    "Architecture Technique": "Une solution robuste et moderne : API RESTful, conteneurisation Docker, CI/CD GitHub Actions et sécurité via tokens."
  };

  function handleUserMessage(messageText) {
    const text = messageText || chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    // Determine Response
    let responseText;
    if (botResponses[text]) {
      responseText = botResponses[text];
    } else {
      responseText = `Le support a été contacté avec votre demande : "${text}". Un expert vous répondra bientôt par email.`;
    }

    // Mock Bot Response
    setTimeout(() => {
      addMessage(responseText, 'bot');
    }, 600);
  }

  if (sendMessageBtn && chatInput) {
    sendMessageBtn.addEventListener('click', () => handleUserMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage();
    });
  }

  // Handle Suggestions
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleUserMessage(chip.innerText);
    });
  });
});
