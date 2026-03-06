// ============ CONFIG ============
const QUESTIONS_PER_GAME = 10;
const FEEDBACK_DELAY = 1200;
const LETTERS = ['A', 'B', 'C'];

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// ============ ADMOB CONFIG ============
const ADMOB_BANNER_ID = 'ca-app-pub-7943132276586341/3207733057';       // Test banner
// const ADMOB_INTERSTITIAL_ID = 'ca-app-pub-7943132276586341/3618796597'; // Test interstitial

// ============ DICTIONARY MERGE ============
// Base words from dictionary.js + user-added words from localStorage
function getAllWords() {
  const userWords = JSON.parse(localStorage.getItem('englishQuiz_userWords') || '[]');
  return [...DICTIONARY, ...userWords];
}

function getUserWords() {
  return JSON.parse(localStorage.getItem('englishQuiz_userWords') || '[]');
}

function saveUserWords(words) {
  localStorage.setItem('englishQuiz_userWords', JSON.stringify(words));
}

function getNextId() {
  const all = getAllWords();
  return all.length > 0 ? Math.max(...all.map(w => w.id)) + 1 : 1;
}



// ============ STATE ============
let gameState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false,
  totalQuestions: 0,
};

let bestScore = parseInt(localStorage.getItem('englishQuiz_bestScore') || '0');
let currentDirection = 'en-es'; // translation direction
let phoneticCache = {}; // cache IPA lookups

// ============ DOM ELEMENTS ============
const screens = {
  home: document.getElementById('screen-home'),
  game: document.getElementById('screen-game'),
  results: document.getElementById('screen-results'),
  dictionary: document.getElementById('screen-dictionary'),
  login: document.getElementById('screen-login'),
  admin: document.getElementById('screen-admin'),
};

const els = {
  totalWords: document.getElementById('total-words'),
  bestScoreHome: document.getElementById('best-score-home'),
  btnPlay: document.getElementById('btn-play'),
  btnDictionary: document.getElementById('btn-dictionary'),
  btnSettings: document.getElementById('btn-settings'),
  btnBackGame: document.getElementById('btn-back-game'),
  btnBackDict: document.getElementById('btn-back-dict'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  btnHome: document.getElementById('btn-home'),
  questionCounter: document.getElementById('question-counter'),
  currentScore: document.getElementById('current-score'),
  progressBar: document.getElementById('progress-bar'),
  wordCard: document.getElementById('word-card'),
  wordEnglish: document.getElementById('word-english'),
  wordPhonetic: document.getElementById('word-phonetic'),
  btnSpeak: document.getElementById('btn-speak'),
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
  // Login
  btnBackLogin: document.getElementById('btn-back-login'),
  loginPassword: document.getElementById('login-password'),
  loginError: document.getElementById('login-error'),
  btnLogin: document.getElementById('btn-login'),
  // Admin
  btnBackAdmin: document.getElementById('btn-back-admin'),
  btnChangePwd: document.getElementById('btn-change-pwd'),
  dirEnEs: document.getElementById('dir-en-es'),
  dirEsEn: document.getElementById('dir-es-en'),
  inputLabel: document.getElementById('input-label'),
  outputLabel: document.getElementById('output-label'),
  adminWordInput: document.getElementById('admin-word-input'),
  btnTranslate: document.getElementById('btn-translate'),
  adminTranslationInput: document.getElementById('admin-translation-input'),
  btnSaveWord: document.getElementById('btn-save-word'),
  adminStatus: document.getElementById('admin-status'),
  adminCount: document.getElementById('admin-count'),
  adminWordList: document.getElementById('admin-word-list'),
  // Password modal
  modalPwd: document.getElementById('modal-pwd'),
  pwdCurrent: document.getElementById('pwd-current'),
  pwdNew: document.getElementById('pwd-new'),
  pwdConfirm: document.getElementById('pwd-confirm'),
  pwdError: document.getElementById('pwd-error'),
  btnPwdCancel: document.getElementById('btn-pwd-cancel'),
  btnPwdSave: document.getElementById('btn-pwd-save'),
};

// ============ SVG GRADIENT ============
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
  els.scoreCircle.style.stroke = 'url(#score-gradient)';
})();

// ============ NAVIGATION ============
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ============ PRONUNCIATION (Native TTS + Web Speech API fallback) ============
function speakWord(word) {
  // Try native Capacitor TTS first (works on Android)
  if (window.Capacitor && window.Capacitor.isNativePlatform()) {
    const { TextToSpeech } = window.Capacitor.Plugins;
    if (TextToSpeech) {
      els.btnSpeak.classList.add('speaking');
      TextToSpeech.speak({
        text: word,
        lang: 'en-US',
        rate: 0.85,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      }).then(() => {
        els.btnSpeak.classList.remove('speaking');
      }).catch(() => {
        els.btnSpeak.classList.remove('speaking');
      });
      return;
    }
  }

  // Fallback: Web Speech API (browser)
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utterance.voice = enVoice;

  els.btnSpeak.classList.add('speaking');
  utterance.onend = () => els.btnSpeak.classList.remove('speaking');
  utterance.onerror = () => els.btnSpeak.classList.remove('speaking');

  window.speechSynthesis.speak(utterance);
}

// Preload voices (browser only)
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ============ PHONETICS (Free Dictionary API) ============
async function getPhonetic(word) {
  if (phoneticCache[word]) return phoneticCache[word];

  try {
    const resp = await fetch(`${DICTIONARY_API}/${encodeURIComponent(word)}`);
    if (!resp.ok) return '';
    const data = await resp.json();
    const phonetic = data[0]?.phonetic || data[0]?.phonetics?.find(p => p.text)?.text || '';
    phoneticCache[word] = phonetic;
    return phonetic;
  } catch {
    return '';
  }
}

// ============ TRANSLATION (MyMemory API) ============
async function translateWord(word, langPair) {
  try {
    const resp = await fetch(`${MYMEMORY_API}?q=${encodeURIComponent(word)}&langpair=${langPair}`);
    if (!resp.ok) throw new Error('API error');
    const data = await resp.json();
    if (data.responseStatus === 200) {
      return data.responseData.translatedText.toLowerCase();
    }
    throw new Error('Translation error');
  } catch (err) {
    throw new Error('No se pudo traducir. Comprueba tu conexión a internet.');
  }
}

// ============ HOME ============
function updateHome() {
  const all = getAllWords();
  els.totalWords.textContent = all.length;
  els.bestScoreHome.textContent = bestScore;
}

// ============ GAME LOGIC ============

function generateQuestions() {
  const all = getAllWords();
  const shuffled = shuffle(all);
  const numQuestions = Math.min(QUESTIONS_PER_GAME, all.length);
  const selected = shuffled.slice(0, numQuestions);

  return selected.map(word => {
    const wrongPool = all.filter(w => w.id !== word.id);
    const wrongAnswers = shuffle(wrongPool).slice(0, 2).map(w => w.es);
    const options = shuffle([word.es, ...wrongAnswers]);

    return {
      word: word,
      options: options,
      correctAnswer: word.es,
    };
  });
}

function startGame() {
  const all = getAllWords();
  if (all.length < 3) {
    alert('El diccionario necesita al menos 3 palabras para jugar.');
    return;
  }

  const numQuestions = Math.min(QUESTIONS_PER_GAME, all.length);
  gameState = {
    questions: generateQuestions(),
    currentIndex: 0,
    score: 0,
    answered: false,
    totalQuestions: numQuestions,
  };
  showScreen('game');
  renderQuestion();
}

async function renderQuestion() {
  const q = gameState.questions[gameState.currentIndex];
  const total = gameState.totalQuestions;
  gameState.answered = false;

  els.questionCounter.textContent = `${gameState.currentIndex + 1} / ${total}`;
  els.currentScore.textContent = gameState.score;
  els.progressBar.style.width = `${((gameState.currentIndex) / total) * 100}%`;

  els.wordCard.style.animation = 'none';
  void els.wordCard.offsetHeight;
  els.wordCard.style.animation = 'card-in 0.4s ease';

  els.wordEnglish.textContent = q.word.en;

  // Show embedded phonetic instantly, or fetch from API as fallback
  if (q.word.ph) {
    els.wordPhonetic.textContent = q.word.ph;
  } else {
    els.wordPhonetic.textContent = '';
    getPhonetic(q.word.en).then(phonetic => {
      if (phonetic) els.wordPhonetic.textContent = phonetic;
    });
  }

  // Auto-speak the word
  setTimeout(() => speakWord(q.word.en), 300);

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

  els.feedbackOverlay.classList.remove('show');
}

function handleAnswer(btn, selected, question) {
  if (gameState.answered) return;
  gameState.answered = true;

  const isCorrect = selected === question.correctAnswer;
  const allBtns = els.optionsContainer.querySelectorAll('.option-btn');

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
    if (gameState.currentIndex < gameState.totalQuestions) {
      renderQuestion();
    } else {
      showResults();
    }
  }, FEEDBACK_DELAY);
}

// ============ RESULTS ============
function showResults() {
  const score = gameState.score;
  const total = gameState.totalQuestions;
  const pct = score / total;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('englishQuiz_bestScore', bestScore.toString());
  }

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

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct * circumference);
  els.scoreCircle.style.strokeDashoffset = circumference;

  showScreen('results');

  // Show interstitial ad after quiz ends
  // showInterstitialAd();

  requestAnimationFrame(() => {
    setTimeout(() => {
      els.scoreCircle.style.strokeDashoffset = offset;
    }, 100);
  });
}

// ============ DICTIONARY ============
function renderDictionary(filter = '') {
  const all = getAllWords();
  const userWordIds = new Set(getUserWords().map(w => w.id));

  const filtered = all.filter(w =>
    w.en.toLowerCase().includes(filter.toLowerCase()) ||
    w.es.toLowerCase().includes(filter.toLowerCase())
  );

  els.dictList.innerHTML = filtered.map(w => `
    <div class="dict-item">
      <span class="dict-num ${userWordIds.has(w.id) ? 'user-added' : ''}">${w.id}</span>
      <div class="dict-words">
        <div class="dict-en">${w.en}</div>
        ${w.ph ? `<div class="dict-phonetic">${w.ph}</div>` : ''}
        <div class="dict-es">${w.es}</div>
      </div>
      <button class="dict-speak-btn" onclick="speakWord('${w.en.replace(/'/g, "\\'")}')">🔊</button>
    </div>
  `).join('');
}

// ============ LOGIN ============
function handleLogin() {
  const pwd = els.loginPassword.value;
  if (pwd === getPassword()) {
    els.loginPassword.value = '';
    els.loginError.textContent = '';
    showAdminPanel();
  } else {
    els.loginError.textContent = '❌ Contraseña incorrecta';
    els.loginPassword.value = '';
    els.loginPassword.focus();
  }
}

// ============ ADMIN PANEL ============
function showAdminPanel() {
  updateAdminWordList();
  updateDirectionLabels();
  els.adminWordInput.value = '';
  els.adminTranslationInput.value = '';
  els.adminStatus.textContent = '';
  els.adminStatus.className = 'admin-status';
  showScreen('admin');
}

function updateDirectionLabels() {
  if (currentDirection === 'en-es') {
    els.inputLabel.textContent = 'Palabra en inglés';
    els.outputLabel.textContent = 'Traducción al español';
    els.adminWordInput.placeholder = 'Escribe en inglés...';
    els.adminTranslationInput.placeholder = 'Traducción en español...';
  } else {
    els.inputLabel.textContent = 'Palabra en español';
    els.outputLabel.textContent = 'Traducción al inglés';
    els.adminWordInput.placeholder = 'Escribe en español...';
    els.adminTranslationInput.placeholder = 'Traducción en inglés...';
  }
}

async function handleTranslate() {
  const word = els.adminWordInput.value.trim();
  if (!word) {
    showAdminStatus('Escribe una palabra primero', 'error');
    return;
  }

  const langPair = currentDirection === 'en-es' ? 'en|es' : 'es|en';

  // Show loading
  els.btnTranslate.querySelector('.translate-text').style.display = 'none';
  els.btnTranslate.querySelector('.translate-icon').style.display = 'none';
  els.btnTranslate.querySelector('.translate-loading').style.display = 'inline';
  els.btnTranslate.disabled = true;

  try {
    const translation = await translateWord(word, langPair);
    els.adminTranslationInput.value = translation;
    showAdminStatus('✅ Traducción completada — puedes editarla si quieres', 'success');
    // Highlight and focus the translation field so the user knows they can edit it
    els.adminTranslationInput.focus();
    els.adminTranslationInput.select();
    els.adminTranslationInput.classList.add('highlight-editable');
    setTimeout(() => els.adminTranslationInput.classList.remove('highlight-editable'), 2000);
  } catch (err) {
    showAdminStatus(err.message, 'error');
  } finally {
    els.btnTranslate.querySelector('.translate-text').style.display = 'inline';
    els.btnTranslate.querySelector('.translate-icon').style.display = 'inline';
    els.btnTranslate.querySelector('.translate-loading').style.display = 'none';
    els.btnTranslate.disabled = false;
  }
}

function handleSaveWord() {
  const input = els.adminWordInput.value.trim();
  const translation = els.adminTranslationInput.value.trim();

  if (!input || !translation) {
    showAdminStatus('Rellena ambos campos', 'error');
    return;
  }

  let enWord, esWord;
  if (currentDirection === 'en-es') {
    enWord = input.toLowerCase();
    esWord = translation.toLowerCase();
  } else {
    enWord = translation.toLowerCase();
    esWord = input.toLowerCase();
  }

  // Check for duplicates
  const all = getAllWords();
  if (all.some(w => w.en.toLowerCase() === enWord)) {
    showAdminStatus('⚠️ Esta palabra ya existe en el diccionario', 'error');
    return;
  }

  const newWord = {
    id: getNextId(),
    en: enWord,
    es: esWord,
  };

  const userWords = getUserWords();
  userWords.push(newWord);
  saveUserWords(userWords);

  els.adminWordInput.value = '';
  els.adminTranslationInput.value = '';
  showAdminStatus(`✅ "${enWord}" añadida correctamente`, 'success');
  updateAdminWordList();
}

function deleteUserWord(id) {
  const userWords = getUserWords().filter(w => w.id !== id);
  saveUserWords(userWords);
  updateAdminWordList();
  showAdminStatus('Palabra eliminada', 'success');
}

function updateAdminWordList() {
  const userWords = getUserWords();
  els.adminCount.textContent = `(${userWords.length})`;

  if (userWords.length === 0) {
    els.adminWordList.innerHTML = '<div class="admin-empty">Todavía no has añadido palabras</div>';
    return;
  }

  els.adminWordList.innerHTML = userWords.map(w => `
    <div class="admin-word-item">
      <div class="word-info">
        <div class="word-en">${w.en}</div>
        <div class="word-es">${w.es}</div>
      </div>
      <button class="btn-delete" onclick="deleteUserWord(${w.id})" title="Eliminar">🗑️</button>
    </div>
  `).join('');
}

function showAdminStatus(message, type) {
  els.adminStatus.textContent = message;
  els.adminStatus.className = `admin-status ${type}`;
  setTimeout(() => {
    els.adminStatus.textContent = '';
    els.adminStatus.className = 'admin-status';
  }, 3000);
}

// ============ PASSWORD CHANGE MODAL ============
function showPwdModal() {
  els.modalPwd.style.display = 'flex';
  els.pwdCurrent.value = '';
  els.pwdNew.value = '';
  els.pwdConfirm.value = '';
  els.pwdError.textContent = '';
}

function hidePwdModal() {
  els.modalPwd.style.display = 'none';
}

function handlePwdChange() {
  const current = els.pwdCurrent.value;
  const newPwd = els.pwdNew.value;
  const confirm = els.pwdConfirm.value;

  if (current !== getPassword()) {
    els.pwdError.textContent = '❌ Contraseña actual incorrecta';
    return;
  }
  if (newPwd.length < 4) {
    els.pwdError.textContent = '❌ Mínimo 4 caracteres';
    return;
  }
  if (newPwd !== confirm) {
    els.pwdError.textContent = '❌ Las contraseñas no coinciden';
    return;
  }

  setPassword(newPwd);
  hidePwdModal();
  showAdminStatus('✅ Contraseña cambiada', 'success');
}

// ============ EVENT LISTENERS ============

// Home
els.btnPlay.addEventListener('click', startGame);
els.btnDictionary.addEventListener('click', () => {
  els.searchInput.value = '';
  renderDictionary();
  showScreen('dictionary');
});
els.btnSettings.addEventListener('click', () => {
  showAdminPanel();
});

// Game
els.btnBackGame.addEventListener('click', () => {
  // Stop any speech in progress
  if (window.Capacitor && window.Capacitor.isNativePlatform()) {
    const { TextToSpeech } = window.Capacitor.Plugins;
    if (TextToSpeech) TextToSpeech.stop();
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  showScreen('home');
  updateHome();
});
els.btnSpeak.addEventListener('click', () => {
  const word = els.wordEnglish.textContent;
  speakWord(word);
});

// Results
els.btnPlayAgain.addEventListener('click', startGame);
els.btnHome.addEventListener('click', () => {
  showScreen('home');
  updateHome();
});

// Dictionary
els.btnBackDict.addEventListener('click', () => {
  showScreen('home');
});
els.searchInput.addEventListener('input', (e) => {
  renderDictionary(e.target.value);
});

// Login
els.btnBackLogin.addEventListener('click', () => {
  showScreen('home');
});
els.btnLogin.addEventListener('click', handleLogin);
els.loginPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Admin
els.btnBackAdmin.addEventListener('click', () => {
  showScreen('home');
  updateHome();
});
els.btnChangePwd.addEventListener('click', showPwdModal);

els.dirEnEs.addEventListener('click', () => {
  currentDirection = 'en-es';
  els.dirEnEs.classList.add('active');
  els.dirEsEn.classList.remove('active');
  updateDirectionLabels();
  els.adminWordInput.value = '';
  els.adminTranslationInput.value = '';
});

els.dirEsEn.addEventListener('click', () => {
  currentDirection = 'es-en';
  els.dirEsEn.classList.add('active');
  els.dirEnEs.classList.remove('active');
  updateDirectionLabels();
  els.adminWordInput.value = '';
  els.adminTranslationInput.value = '';
});

els.btnTranslate.addEventListener('click', handleTranslate);
els.btnSaveWord.addEventListener('click', handleSaveWord);

els.adminWordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleTranslate();
});

// Password modal
els.btnPwdCancel.addEventListener('click', hidePwdModal);
els.btnPwdSave.addEventListener('click', handlePwdChange);
els.modalPwd.addEventListener('click', (e) => {
  if (e.target === els.modalPwd) hidePwdModal();
});

// ============ ADMOB ============
let admobReady = false;

async function initAdMob() {
  // Only initialize on native platform (not browser)
  if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
    console.log('⏭️ AdMob: no es plataforma nativa, saltando...');
    return;
  }

  try {
    const { AdMob } = window.Capacitor.Plugins;
    if (!AdMob) {
      console.log('⏭️ AdMob plugin no disponible');
      return;
    }

    // Initialize AdMob
    await AdMob.initialize({
      initializeForTesting: false,
    });

    admobReady = true;
    console.log('✅ AdMob inicializado');

    // Show banner on home
    showBannerAd();

    // Pre-load interstitial
    // prepareInterstitialAd();
  } catch (err) {
    console.error('❌ Error inicializando AdMob:', err);
  }
}

async function showBannerAd() {
  if (!admobReady) return;
  try {
    const { AdMob } = window.Capacitor.Plugins;
    await AdMob.showBanner({
      adId: ADMOB_BANNER_ID,
      adSize: 'BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0,
      isTesting: false,
    });
    console.log('✅ Banner mostrado');
  } catch (err) {
    console.error('❌ Error mostrando banner:', err);
  }
}

async function hideBannerAd() {
  if (!admobReady) return;
  try {
    const { AdMob } = window.Capacitor.Plugins;
    await AdMob.hideBanner();
  } catch (err) {
    // ignore
  }
}

/*
async function prepareInterstitialAd() {
  if (!admobReady) return;
  try {
    const { AdMob } = window.Capacitor.Plugins;
    await AdMob.prepareInterstitial({
      adId: ADMOB_INTERSTITIAL_ID,
      isTesting: false,
    });
    console.log('✅ Interstitial preparado');
  } catch (err) {
    console.error('❌ Error preparando interstitial:', err);
  }
}
*/

/*
async function showInterstitialAd() {
  if (!admobReady) return;
  try {
    const { AdMob } = window.Capacitor.Plugins;
    await AdMob.showInterstitial();
    console.log('✅ Interstitial mostrado');
    // Pre-load next one
    prepareInterstitialAd();
  } catch (err) {
    console.error('❌ Error mostrando interstitial:', err);
    // Try to prepare again
    prepareInterstitialAd();
  }
}
*/

// ============ INIT ============
updateHome();
initAdMob();
