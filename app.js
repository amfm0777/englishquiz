// ============ DICTIONARY DATA ============
const DICTIONARY = [
  { id: 1, en: "chortled", es: "rio entre dientes" },
  { id: 2, en: "pecked", es: "dio un beso rápido / picoteó" },
  { id: 3, en: "briefcase", es: "maletín" },
  { id: 4, en: "you'd", es: "tú harías / habías" },
  { id: 5, en: "involved", es: "involucrado" },
  { id: 6, en: "expect", es: "esperar / suponer" },
  { id: 7, en: "nonsense", es: "tonterías" },
  { id: 8, en: "drills", es: "taladros / simulacros" },
  { id: 9, en: "beefy", es: "corpulento / fornido" },
  { id: 10, en: "neck", es: "cuello" },
  { id: 11, en: "although", es: "aunque" },
  { id: 12, en: "amount", es: "cantidad" },
  { id: 13, en: "useful", es: "útil" },
  { id: 14, en: "spent", es: "gastó / pasó (tiempo)" },
  { id: 15, en: "craning", es: "estirando el cuello" },
  { id: 16, en: "fences", es: "vallas / cercas" },
  { id: 17, en: "finer", es: "más fino / mejor" },
  { id: 18, en: "greatest", es: "el más grande" },
  { id: 19, en: "fear", es: "miedo / temor" },
  { id: 20, en: "discover", es: "descubrir" },
  { id: 21, en: "tantrum", es: "rabieta / berrinche" },
  { id: 22, en: "corner", es: "esquina / rincón" },
  { id: 23, en: "tyke", es: "niño pequeño / pilluelo" },
  { id: 24, en: "bear", es: "soportar / aguantar" },
  { id: 25, en: "several", es: "varios" },
  { id: 26, en: "fact", es: "hecho / realidad" },
  { id: 27, en: "shuddered", es: "se estremeció" },
  { id: 28, en: "arrived", es: "llegó" },
  { id: 29, en: "dull", es: "aburrido / apagado" },
  { id: 30, en: "cloudy", es: "nublado" },
  { id: 31, en: "suggest", es: "sugerir" },
  { id: 32, en: "country", es: "país / campo" },
  { id: 34, en: "hummed", es: "tarareó / zumbó" },
  { id: 35, en: "most", es: "la mayoría" },
  { id: 36, en: "tie", es: "corbata / atar" },
  { id: 37, en: "gossiped", es: "chismeó / cotilleó" },
  { id: 38, en: "wrestled", es: "luchó / forcejeó" },
  { id: 39, en: "none", es: "ninguno / nada" },
  { id: 40, en: "tawny", es: "leonado / castaño" },
  { id: 41, en: "flutter", es: "revolotear / aleteo" },
  { id: 42, en: "standing", es: "de pie / parado" },
  { id: 43, en: "tabby", es: "gato atigrado" },
  { id: 44, en: "jerked", es: "dio un tirón brusco" },
];

// ============ GAME CONFIG ============
const QUESTIONS_PER_GAME = 10;
const FEEDBACK_DELAY = 1200;
const LETTERS = ['A', 'B', 'C'];

// ============ STATE ============
let gameState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false,
};

let bestScore = parseInt(localStorage.getItem('englishQuiz_bestScore') || '0');

// ============ DOM ELEMENTS ============
const screens = {
  home: document.getElementById('screen-home'),
  game: document.getElementById('screen-game'),
  results: document.getElementById('screen-results'),
  dictionary: document.getElementById('screen-dictionary'),
};

const els = {
  bestScoreHome: document.getElementById('best-score-home'),
  btnPlay: document.getElementById('btn-play'),
  btnDictionary: document.getElementById('btn-dictionary'),
  btnBackGame: document.getElementById('btn-back-game'),
  btnBackDict: document.getElementById('btn-back-dict'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  btnHome: document.getElementById('btn-home'),
  questionCounter: document.getElementById('question-counter'),
  currentScore: document.getElementById('current-score'),
  progressBar: document.getElementById('progress-bar'),
  wordCard: document.getElementById('word-card'),
  wordEnglish: document.getElementById('word-english'),
  optionsContainer: document.getElementById('options-container'),
  feedbackOverlay: document.getElementById('feedback-overlay'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackText: document.getElementById('feedback-text'),
  feedbackAnswer: document.getElementById('feedback-answer'),
  resultsEmoji: document.getElementById('results-emoji'),
  resultsTitle: document.getElementById('results-title'),
  finalScore: document.getElementById('final-score'),
  finalTotal: document.getElementById('final-total'),
  resultsMessage: document.getElementById('results-message'),
  detailCorrect: document.getElementById('detail-correct'),
  detailWrong: document.getElementById('detail-wrong'),
  scoreCircle: document.getElementById('score-circle'),
  searchInput: document.getElementById('search-input'),
  dictList: document.getElementById('dict-list'),
};

// ============ SVG GRADIENT (inject for score circle) ============
(function injectSVGGradient() {
  const svg = document.querySelector('.results-score-circle svg');
  if (!svg) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad.setAttribute('id', 'score-gradient');
  grad.setAttribute('x1', '0%');
  grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%');
  grad.setAttribute('y2', '100%');
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#6366f1');
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#a78bfa');
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);
  svg.prepend(defs);

  // Fix stroke to use gradient
  els.scoreCircle.style.stroke = 'url(#score-gradient)';
})();

// ============ NAVIGATION ============
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ============ HOME ============
function updateHome() {
  els.bestScoreHome.textContent = bestScore;
}

// ============ GAME LOGIC ============
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions() {
  const shuffled = shuffle(DICTIONARY);
  const selected = shuffled.slice(0, QUESTIONS_PER_GAME);

  return selected.map(word => {
    // Get 2 wrong answers
    const wrongPool = DICTIONARY.filter(w => w.id !== word.id);
    const wrongAnswers = shuffle(wrongPool).slice(0, 2).map(w => w.es);

    // Combine and shuffle options
    const options = shuffle([word.es, ...wrongAnswers]);

    return {
      word: word,
      options: options,
      correctAnswer: word.es,
    };
  });
}

function startGame() {
  gameState = {
    questions: generateQuestions(),
    currentIndex: 0,
    score: 0,
    answered: false,
  };
  showScreen('game');
  renderQuestion();
}

function renderQuestion() {
  const q = gameState.questions[gameState.currentIndex];
  gameState.answered = false;

  // Update header
  els.questionCounter.textContent = `${gameState.currentIndex + 1} / ${QUESTIONS_PER_GAME}`;
  els.currentScore.textContent = gameState.score;
  els.progressBar.style.width = `${((gameState.currentIndex) / QUESTIONS_PER_GAME) * 100}%`;

  // Animate card
  els.wordCard.style.animation = 'none';
  void els.wordCard.offsetHeight; // force reflow
  els.wordCard.style.animation = 'card-in 0.4s ease';

  // Set word
  els.wordEnglish.textContent = q.word.en;

  // Render options
  els.optionsContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${LETTERS[i]}</span>
      <span class="option-text">${opt}</span>
    `;
    btn.addEventListener('click', () => handleAnswer(btn, opt, q));
    els.optionsContainer.appendChild(btn);
  });

  // Hide feedback
  els.feedbackOverlay.classList.remove('show');
}

function handleAnswer(btn, selected, question) {
  if (gameState.answered) return;
  gameState.answered = true;

  const isCorrect = selected === question.correctAnswer;
  const allBtns = els.optionsContainer.querySelectorAll('.option-btn');

  // Disable all buttons
  allBtns.forEach(b => b.classList.add('disabled'));

  if (isCorrect) {
    gameState.score++;
    btn.classList.add('correct');
    els.feedbackIcon.textContent = '✅';
    els.feedbackText.textContent = '¡Correcto!';
    els.feedbackText.style.color = '#22c55e';
    els.feedbackAnswer.textContent = '';
  } else {
    btn.classList.add('wrong');
    // Highlight correct one
    allBtns.forEach(b => {
      if (b.querySelector('.option-text').textContent === question.correctAnswer) {
        b.classList.add('correct');
        b.classList.remove('disabled');
      }
    });
    els.feedbackIcon.textContent = '❌';
    els.feedbackText.textContent = 'Incorrecto';
    els.feedbackText.style.color = '#ef4444';
    els.feedbackAnswer.textContent = `${question.word.en} = ${question.correctAnswer}`;
  }

  els.currentScore.textContent = gameState.score;
  els.feedbackOverlay.classList.add('show');

  setTimeout(() => {
    gameState.currentIndex++;
    if (gameState.currentIndex < QUESTIONS_PER_GAME) {
      renderQuestion();
    } else {
      showResults();
    }
  }, FEEDBACK_DELAY);
}

// ============ RESULTS ============
function showResults() {
  const score = gameState.score;
  const total = QUESTIONS_PER_GAME;
  const pct = score / total;

  // Update best score
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('englishQuiz_bestScore', bestScore.toString());
  }

  // Emoji & title
  if (pct >= 0.9) {
    els.resultsEmoji.textContent = '🏆';
    els.resultsTitle.textContent = '¡Increíble!';
    els.resultsMessage.textContent = '¡Eres un crack del vocabulario!';
  } else if (pct >= 0.7) {
    els.resultsEmoji.textContent = '🎉';
    els.resultsTitle.textContent = '¡Muy bien!';
    els.resultsMessage.textContent = '¡Casi perfecto, sigue así!';
  } else if (pct >= 0.5) {
    els.resultsEmoji.textContent = '💪';
    els.resultsTitle.textContent = '¡Buen trabajo!';
    els.resultsMessage.textContent = 'Vas por buen camino, ¡sigue practicando!';
  } else {
    els.resultsEmoji.textContent = '📚';
    els.resultsTitle.textContent = '¡A seguir aprendiendo!';
    els.resultsMessage.textContent = 'Repasa el diccionario e inténtalo de nuevo';
  }

  els.finalScore.textContent = score;
  els.finalTotal.textContent = `/ ${total}`;
  els.detailCorrect.textContent = score;
  els.detailWrong.textContent = total - score;

  // Animate score circle
  const circumference = 2 * Math.PI * 54; // r=54
  const offset = circumference - (pct * circumference);
  els.scoreCircle.style.strokeDashoffset = circumference;

  showScreen('results');

  // Animate after screen transition
  requestAnimationFrame(() => {
    setTimeout(() => {
      els.scoreCircle.style.strokeDashoffset = offset;
    }, 100);
  });
}

// ============ DICTIONARY ============
function renderDictionary(filter = '') {
  const filtered = DICTIONARY.filter(w =>
    w.en.toLowerCase().includes(filter.toLowerCase()) ||
    w.es.toLowerCase().includes(filter.toLowerCase())
  );

  els.dictList.innerHTML = filtered.map(w => `
    <div class="dict-item">
      <span class="dict-num">${w.id}</span>
      <div class="dict-words">
        <div class="dict-en">${w.en}</div>
        <div class="dict-es">${w.es}</div>
      </div>
    </div>
  `).join('');
}

// ============ EVENT LISTENERS ============
els.btnPlay.addEventListener('click', startGame);
els.btnPlayAgain.addEventListener('click', startGame);

els.btnDictionary.addEventListener('click', () => {
  els.searchInput.value = '';
  renderDictionary();
  showScreen('dictionary');
});

els.btnBackGame.addEventListener('click', () => {
  showScreen('home');
  updateHome();
});

els.btnBackDict.addEventListener('click', () => {
  showScreen('home');
});

els.btnHome.addEventListener('click', () => {
  showScreen('home');
  updateHome();
});

els.searchInput.addEventListener('input', (e) => {
  renderDictionary(e.target.value);
});

// ============ INIT ============
updateHome();
