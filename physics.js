// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====
const gameState = {
    // Общее состояние игры
    currentScreen: 'mainMenu',
    isPaused: false,
    isSoundOn: true,
    gameActive: false,
    gameTime: 0,
    gameTimer: null,
    level: 1,
    questionsAnswered: 0,
    meteorsDestroyed: 0,
    
    // Массивы для отслеживания использованных вопросов
    usedQuestions: {
        teamA: { easy: [], medium: [], hard: [] },
        teamB: { easy: [], medium: [], hard: [] }
    },
    
    // Состояние команд
    teams: {
        teamA: {
            name: 'Команда Альфа',
            color: '#3a86ff',
            score: 0,
            planets: ['mercury', 'venus', 'earth'],
            planetHealth: {
                mercury: 100,
                venus: 100,
                earth: 100
            },
            currentQuestion: null,
            questionTimer: 30,
            questionTimerId: null,
            correctAnswers: 0,
            isAnswering: false
        },
        teamB: {
            name: 'Команда Бета',
            color: '#ffbe0b',
            score: 0,
            planets: ['mars', 'jupiter', 'saturn', 'uranus', 'neptune'],
            planetHealth: {
                mars: 100,
                jupiter: 100,
                saturn: 100,
                uranus: 100,
                neptune: 100
            },
            currentQuestion: null,
            questionTimer: 30,
            questionTimerId: null,
            correctAnswers: 0,
            isAnswering: false
        }
    },
    
    // Вопросы по физике (увеличиваем количество и добавляем больше вариативности)
    questions: {
        easy: [
            {
                id: 1,
                text: "С какой скоростью падает тело с высоты 20 метров, если сопротивление воздуха не учитывать? (g≈10 м/с²)",
                answers: ["10 м/с", "20 м/с", "30 м/с", "40 м/с"],
                correct: 1,
                topic: "Механика",
                formula: "v = √(2gh)"
            },
            {
                id: 2,
                text: "Какова сила тяжести, действующая на тело массой 5 кг? (g≈10 Н/кг)",
                answers: ["5 Н", "10 Н", "50 Н", "100 Н"],
                correct: 2,
                topic: "Механика",
                formula: "F = mg"
            },
            {
                id: 3,
                text: "Чему равно напряжение на резисторе 10 Ом при силе тока 2 А?",
                answers: ["5 В", "10 В", "20 В", "40 В"],
                correct: 2,
                topic: "Электричество",
                formula: "U = I·R"
            },
            {
                id: 4,
                text: "Какое давление оказывает сила 100 Н на площадь 0.5 м²?",
                answers: ["50 Па", "100 Па", "200 Па", "500 Па"],
                correct: 2,
                topic: "Давление",
                formula: "p = F/S"
            },
            {
                id: 5,
                text: "Какова масса 0.5 м³ воды? (плотность воды 1000 кг/м³)",
                answers: ["50 кг", "100 кг", "500 кг", "1000 кг"],
                correct: 2,
                topic: "Давление",
                formula: "m = ρ·V"
            },
            {
                id: 6,
                text: "Какая мощность выделяется на резисторе 5 Ом при силе тока 2 А?",
                answers: ["10 Вт", "20 Вт", "30 Вт", "40 Вт"],
                correct: 1,
                topic: "Электричество",
                formula: "P = I²R"
            },
            {
                id: 7,
                text: "Какой путь пройдет тело за 3 секунды при скорости 4 м/с?",
                answers: ["8 м", "12 м", "16 м", "20 м"],
                correct: 1,
                topic: "Механика",
                formula: "S = vt"
            },
            {
                id: 8,
                text: "Чему равен период колебаний маятника длиной 1 м? (g≈10 м/с²)",
                answers: ["1 с", "2 с", "3 с", "4 с"],
                correct: 1,
                topic: "Механика",
                formula: "T = 2π√(L/g)"
            },
            {
                id: 9,
                text: "Какой заряд протекает через проводник за 2 секунды при силе тока 3 А?",
                answers: ["1 Кл", "3 Кл", "6 Кл", "9 Кл"],
                correct: 2,
                topic: "Электричество",
                formula: "q = It"
            },
            {
                id: 10,
                text: "Какая работа совершается силой 5 Н на пути 2 м?",
                answers: ["5 Дж", "10 Дж", "15 Дж", "20 Дж"],
                correct: 1,
                topic: "Механика",
                formula: "A = F·S"
            },
            {
                id: 11,
                text: "Какова плотность тела массой 2 кг и объемом 0.5 м³?",
                answers: ["0.25 кг/м³", "1 кг/м³", "4 кг/м³", "10 кг/м³"],
                correct: 2,
                topic: "Давление",
                formula: "ρ = m/V"
            },
            {
                id: 12,
                text: "Чему равна сила тока при напряжении 12 В и сопротивлении 3 Ом?",
                answers: ["2 А", "4 А", "6 А", "8 А"],
                correct: 1,
                topic: "Электричество",
                formula: "I = U/R"
            }
        ],
        medium: [
            {
                id: 13,
                text: "Тело движется равноускоренно из состояния покоя. Какой путь оно пройдет за 4 секунды, если ускорение 2 м/с²?",
                answers: ["4 м", "8 м", "16 м", "32 м"],
                correct: 2,
                topic: "Механика",
                formula: "S = at²/2"
            },
            {
                id: 14,
                text: "Какая сила действует на заряд 4 Кл в электрическом поле напряженностью 5 Н/Кл?",
                answers: ["0.8 Н", "1.25 Н", "9 Н", "20 Н"],
                correct: 3,
                topic: "Электричество",
                formula: "F = E·q"
            },
            {
                id: 15,
                text: "Определите энергию фотона с частотой 5·10¹⁴ Гц (h = 6.63·10⁻³⁴ Дж·с)",
                answers: ["1.33·10⁻¹⁹ Дж", "3.32·10⁻¹⁹ Дж", "6.63·10⁻¹⁹ Дж", "13.26·10⁻¹⁹ Дж"],
                correct: 1,
                topic: "Квантовая физика",
                formula: "E = hν"
            },
            {
                id: 16,
                text: "Чему равно сопротивление цепи из двух последовательно соединенных резисторов 3 Ом и 6 Ом?",
                answers: ["2 Ом", "3 Ом", "6 Ом", "9 Ом"],
                correct: 3,
                topic: "Электричество",
                formula: "R = R₁ + R₂"
            },
            {
                id: 17,
                text: "Какова кинетическая энергия тела массой 2 кг, движущегося со скоростью 3 м/с?",
                answers: ["3 Дж", "6 Дж", "9 Дж", "18 Дж"],
                correct: 2,
                topic: "Механика",
                formula: "E = mv²/2"
            },
            {
                id: 18,
                text: "Чему равен КПД тепловой машины, если полезная работа 200 Дж, а полученное количество теплоты 800 Дж?",
                answers: ["20%", "25%", "30%", "40%"],
                correct: 1,
                topic: "Термодинамика",
                formula: "η = A/Q₁"
            },
            {
                id: 19,
                text: "Определите силу Архимеда, действующую на тело объемом 0.1 м³ в воде (ρ=1000 кг/м³)",
                answers: ["100 Н", "500 Н", "1000 Н", "2000 Н"],
                correct: 2,
                topic: "Давление",
                formula: "Fₐ = ρgV"
            },
            {
                id: 20,
                text: "Какова напряженность электрического поля на расстоянии 2 м от заряда 8·10⁻⁹ Кл?",
                answers: ["9 Н/Кл", "18 Н/Кл", "27 Н/Кл", "36 Н/Кл"],
                correct: 1,
                topic: "Электричество",
                formula: "E = kq/r²"
            },
            {
                id: 21,
                text: "Определите импульс тела массой 4 кг, движущегося со скоростью 5 м/с",
                answers: ["10 кг·м/с", "15 кг·м/с", "20 кг·м/с", "25 кг·м/с"],
                correct: 2,
                topic: "Механика",
                formula: "p = mv"
            },
            {
                id: 22,
                text: "Чему равна частота колебаний, если период равен 0.02 с?",
                answers: ["20 Гц", "40 Гц", "50 Гц", "100 Гц"],
                correct: 2,
                topic: "Механика",
                formula: "ν = 1/T"
            },
            {
                id: 23,
                text: "Какова потенциальная энергия тела массой 2 кг на высоте 3 м? (g≈10 м/с²)",
                answers: ["15 Дж", "30 Дж", "60 Дж", "90 Дж"],
                correct: 2,
                topic: "Механика",
                formula: "E = mgh"
            },
            {
                id: 24,
                text: "Чему равно сопротивление параллельно соединенных резисторов 4 Ом и 6 Ом?",
                answers: ["1.5 Ом", "2.4 Ом", "3 Ом", "5 Ом"],
                correct: 1,
                topic: "Электричество",
                formula: "1/R = 1/R₁ + 1/R₂"
            }
        ],
        hard: [
            {
                id: 25,
                text: "Шарик массой 0.1 кг падает с высоты 1.8 м на стальную плиту и отскакивает на высоту 0.8 м. Найдите среднюю силу удара, если время соударения 0.01 с.",
                answers: ["10 Н", "30 Н", "50 Н", "100 Н"],
                correct: 2,
                topic: "Механика",
                formula: "F = mΔv/Δt"
            },
            {
                id: 26,
                text: "В цепи переменного тока с активным сопротивлением 10 Ом и индуктивностью 0.1 Гн протекает ток I = 5sin(100t). Найдите полное сопротивление цепи.",
                answers: ["10 Ом", "14 Ом", "20 Ом", "24 Ом"],
                correct: 1,
                topic: "Электричество",
                formula: "Z = √(R² + (ωL)²)"
            },
            {
                id: 27,
                text: "Определить напряженность гравитационного поля на высоте 2R над поверхностью Земли (R = 6400 км, g₀ = 9.8 м/с²)",
                answers: ["1.09 м/с²", "2.45 м/с²", "4.9 м/с²", "9.8 м/с²"],
                correct: 0,
                topic: "Астрономия",
                formula: "g = g₀·(R/(R+h))²"
            },
            {
                id: 28,
                text: "Ядро урана-235 поглощает нейтрон и делится на два осколка с выделением 200 МэВ энергии. Какая энергия выделится при делении 1 г урана-235?",
                answers: ["8.2·10¹⁰ Дж", "5.1·10¹⁰ Дж", "3.2·10¹⁰ Дж", "1.6·10¹⁰ Дж"],
                correct: 0,
                topic: "Ядерная физика",
                formula: "E = N·E₁, где N = m·N_A/M"
            },
            {
                id: 29,
                text: "Линза с фокусным расстоянием 20 см дает изображение предмета, увеличенное в 3 раза. На каком расстоянии от линзы находится предмет?",
                answers: ["10 см", "15 см", "20 см", "27 см"],
                correct: 3,
                topic: "Оптика",
                formula: "1/F = 1/d + 1/f, Γ = f/d"
            },
            {
                id: 30,
                text: "Определите массу покоя частицы, если ее полная энергия 5·10⁻¹⁶ Дж, а скорость 0.8с (с=3·10⁸ м/с)",
                answers: ["1.11·10⁻³² кг", "2.22·10⁻³² кг", "3.33·10⁻³² кг", "4.44·10⁻³² кг"],
                correct: 0,
                topic: "Релятивистская физика",
                formula: "E = mc²/√(1-v²/c²)"
            },
            {
                id: 31,
                text: "В колебательном контуре индуктивность катушки 0.01 Гн, емкость конденсатора 10⁻⁶ Ф. Найдите период колебаний.",
                answers: ["2π·10⁻⁴ с", "2π·10⁻³ с", "2π·10⁻² с", "2π·10⁻¹ с"],
                correct: 0,
                topic: "Электричество",
                formula: "T = 2π√(LC)"
            },
            {
                id: 32,
                text: "Определите красную границу фотоэффекта для металла с работой выхода 2 эВ.",
                answers: ["310 нм", "620 нм", "930 нм", "1240 нм"],
                correct: 1,
                topic: "Квантовая физика",
                formula: "λ = hc/A"
            },
            {
                id: 33,
                text: "Чему равно давление газа при концентрации молекул 2.5·10²⁵ м⁻³ и температуре 300 К?",
                answers: ["10⁵ Па", "2·10⁵ Па", "3·10⁵ Па", "4·10⁵ Па"],
                correct: 0,
                topic: "МКТ",
                formula: "p = nkT"
            },
            {
                id: 34,
                text: "Определите длину волны де Бройля для электрона с кинетической энергией 100 эВ.",
                answers: ["0.123 нм", "0.246 нм", "0.369 нм", "0.492 нм"],
                correct: 0,
                topic: "Квантовая физика",
                formula: "λ = h/p, p = √(2mE)"
            },
            {
                id: 35,
                text: "Найдите скорость тела в верхней точке траектории, если оно брошено под углом 45° со скоростью 20 м/с.",
                answers: ["0 м/с", "10 м/с", "14.14 м/с", "20 м/с"],
                correct: 2,
                topic: "Механика",
                formula: "v_x = v₀·cosα, v_y = 0"
            },
            {
                id: 36,
                text: "Чему равен магнитный поток через контур площадью 0.1 м² в магнитном поле 0.5 Тл, если нормаль к контуру составляет 60° с направлением поля?",
                answers: ["0.025 Вб", "0.05 Вб", "0.075 Вб", "0.1 Вб"],
                correct: 0,
                topic: "Магнетизм",
                formula: "Φ = BS·cosα"
            }
        ]
    },
    
    // Активные метеориты
    activeMeteors: [],
    
    // Анимация и визуальные эффекты
    animationFrameId: null,
    lastAnimationTime: 0,
    
    // Система рандомизации вопросов
    questionRandomizer: {
        getRandomQuestion: function(difficulty, usedQuestions) {
            const questions = gameState.questions[difficulty];
            
            // Создаем копию массива вопросов, чтобы не изменять оригинал
            const availableQuestions = [...questions];
            
            // Фильтруем вопросы, которые уже использовались
            const unusedQuestions = availableQuestions.filter(q => !usedQuestions.includes(q.id));
            
            // Если есть неиспользованные вопросы, выбираем случайный из них
            if (unusedQuestions.length > 0) {
                const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
                return unusedQuestions[randomIndex];
            }
            
            // Если все вопросы использованы, перемешиваем массив и начинаем заново
            this.shuffleArray(availableQuestions);
            return availableQuestions[0];
        },
        
        shuffleArray: function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        
        shuffleAnswers: function(answers, correctIndex) {
            // Создаем массив объектов с ответами и их индексами
            const answersWithIndex = answers.map((answer, index) => ({
                answer,
                originalIndex: index,
                isCorrect: index === correctIndex
            }));
            
            // Перемешиваем ответы
            const shuffled = this.shuffleArray([...answersWithIndex]);
            
            // Находим новый индекс правильного ответа
            const newCorrectIndex = shuffled.findIndex(item => item.isCorrect);
            
            return {
                answers: shuffled.map(item => item.answer),
                originalIndices: shuffled.map(item => item.originalIndex),
                correctIndex: newCorrectIndex
            };
        }
    }
};

// ===== УПРАВЛЕНИЕ ЭКРАНАМИ =====
function showScreen(screenId) {
    // Скрыть все экраны
    const screens = ['mainMenu', 'teamsSetup', 'rulesScreen', 'topicsScreen', 'gameScreen', 'pauseScreen', 'gameOverScreen'];
    screens.forEach(screen => {
        const element = document.getElementById(screen);
        if (element) {
            element.classList.remove('active');
        }
    });
    
    // Показать нужный экран
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    gameState.currentScreen = screenId;
    
    // Остановить или запустить игру в зависимости от экрана
    if (screenId === 'gameScreen' && !gameState.gameActive) {
        startGame();
    } else if (screenId !== 'gameScreen' && screenId !== 'pauseScreen') {
        if (gameState.gameTimer) {
            clearInterval(gameState.gameTimer);
            gameState.gameTimer = null;
        }
        gameState.gameActive = false;
    }
}

// ===== НАСТРОЙКА КОМАНД =====
function setupTeams() {
    // Назначение обработчиков для выбора цвета
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            const teamPanel = this.closest('.team-setup');
            
            // Снять выделение со всех цветов в этой команде
            teamPanel.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Выделить выбранный цвет
            this.classList.add('selected');
            
            // Обновить цвет команды
            if (teamPanel.classList.contains('team-a')) {
                gameState.teams.teamA.color = color;
            } else {
                gameState.teams.teamB.color = color;
            }
        });
    });
    
    // Установка цвета по умолчанию
    const teamAColor = document.querySelector('.team-a .color-option[data-color="#3a86ff"]');
    const teamBColor = document.querySelector('.team-b .color-option[data-color="#ffbe0b"]');
    
    if (teamAColor) teamAColor.classList.add('selected');
    if (teamBColor) teamBColor.classList.add('selected');
}

// ===== ИНИЦИАЛИЗАЦИЯ ИГРЫ =====
function initializeGame() {
    console.log("Инициализация игры...");
    
    // Сбрасываем использованные вопросы
    gameState.usedQuestions = {
        teamA: { easy: [], medium: [], hard: [] },
        teamB: { easy: [], medium: [], hard: [] }
    };
    
    // Загрузка настроек команд
    const teamANameInput = document.getElementById('teamAName');
    const teamBNameInput = document.getElementById('teamBName');
    
    if (teamANameInput && teamBNameInput) {
        gameState.teams.teamA.name = teamANameInput.value || 'Команда Альфа';
        gameState.teams.teamB.name = teamBNameInput.value || 'Команда Бета';
    }
    
    // Обновление отображения имен команд
    document.getElementById('teamANameDisplay').textContent = gameState.teams.teamA.name;
    document.getElementById('teamBNameDisplay').textContent = gameState.teams.teamB.name;
    
    document.getElementById('finalTeamAName').textContent = gameState.teams.teamA.name;
    document.getElementById('finalTeamBName').textContent = gameState.teams.teamB.name;
    
    // Обновление цветов команд
    const teamAPanel = document.querySelector('.team-a-panel');
    const teamBPanel = document.querySelector('.team-b-panel');
    
    if (teamAPanel) {
        teamAPanel.style.borderColor = gameState.teams.teamA.color;
        teamAPanel.querySelector('.team-header h3').style.color = gameState.teams.teamA.color;
        teamAPanel.querySelector('.team-score').style.color = gameState.teams.teamA.color;
        teamAPanel.querySelector('.team-score').style.borderColor = gameState.teams.teamA.color + '30';
    }
    
    if (teamBPanel) {
        teamBPanel.style.borderColor = gameState.teams.teamB.color;
        teamBPanel.querySelector('.team-header h3').style.color = gameState.teams.teamB.color;
        teamBPanel.querySelector('.team-score').style.color = gameState.teams.teamB.color;
        teamBPanel.querySelector('.team-score').style.borderColor = gameState.teams.teamB.color + '30';
    }
    
    // Сброс состояния игры
    gameState.level = 1;
    gameState.gameTime = 0;
    gameState.questionsAnswered = 0;
    gameState.meteorsDestroyed = 0;
    gameState.activeMeteors = [];
    
    // Сброс состояния команд
    Object.keys(gameState.teams).forEach(teamKey => {
        const team = gameState.teams[teamKey];
        team.score = 0;
        team.correctAnswers = 0;
        team.isAnswering = false;
        
        // Сброс здоровья планет
        Object.keys(team.planetHealth).forEach(planet => {
            team.planetHealth[planet] = 100;
        });
        
        // Сброс таймера
        if (team.questionTimerId) {
            clearInterval(team.questionTimerId);
            team.questionTimerId = null;
        }
        team.questionTimer = 30;
    });
    
    // Обновление интерфейса
    updateScores();
    updatePlanetHealth();
    updateGameStats();
    updateGameTime();
    
    // Очистка метеоритов
    const meteorsContainer = document.getElementById('meteorsContainer');
    if (meteorsContainer) {
        meteorsContainer.innerHTML = '';
    }
    
    // Очистка вопросов
    clearQuestion('teamA');
    clearQuestion('teamB');
    
    console.log("Игра инициализирована!");
}

// ===== ЗАПУСК ИГРЫ =====
function startGame() {
    if (gameState.gameActive) return;
    
    console.log("Запуск игры...");
    
    gameState.gameActive = true;
    gameState.isPaused = false;
    
    // Запуск игрового времени
    gameState.gameTimer = setInterval(() => {
        gameState.gameTime++;
        updateGameTime();
    }, 1000);
    
    // Запуск анимации
    gameState.lastAnimationTime = Date.now();
    animateGame();
    
    // Генерация первых вопросов
    setTimeout(() => {
        generateQuestion('teamA');
        generateQuestion('teamB');
        
        // Запуск генерации метеоритов
        startMeteorGeneration();
    }, 500);
}

// ===== ВОПРОСЫ И ОТВЕТЫ =====
function clearQuestion(teamKey) {
    const team = gameState.teams[teamKey];
    team.currentQuestion = null;
    team.isAnswering = false;
    
    if (team.questionTimerId) {
        clearInterval(team.questionTimerId);
        team.questionTimerId = null;
    }
}

function generateQuestion(teamKey) {
    if (!gameState.gameActive || gameState.isPaused) return;
    
    const team = gameState.teams[teamKey];
    
    // Если команда уже отвечает на вопрос, не генерируем новый
    if (team.isAnswering) return;
    
    // Определение сложности в зависимости от уровня
    let difficulty = 'easy';
    if (gameState.level >= 3) difficulty = 'medium';
    if (gameState.level >= 6) difficulty = 'hard';
    
    // Получаем использованные вопросы для этой команды и сложности
    const usedQuestions = gameState.usedQuestions[teamKey][difficulty];
    
    // Получаем случайный вопрос с улучшенной рандомизацией
    const originalQuestion = gameState.questionRandomizer.getRandomQuestion(difficulty, usedQuestions);
    
    // Добавляем вопрос в список использованных
    gameState.usedQuestions[teamKey][difficulty].push(originalQuestion.id);
    
    // Перемешиваем ответы
    const shuffled = gameState.questionRandomizer.shuffleAnswers(
        originalQuestion.answers, 
        originalQuestion.correct
    );
    
    // Создаем копию вопроса с перемешанными ответами
    const question = {
        ...originalQuestion,
        answers: shuffled.answers,
        displayCorrectIndex: shuffled.correctIndex,
        originalCorrectIndex: originalQuestion.correct,
        originalIndices: shuffled.originalIndices
    };
    
    team.currentQuestion = question;
    team.isAnswering = true;
    
    // Сброс таймера
    team.questionTimer = 30;
    
    // Обновление интерфейса вопроса
    const questionContainer = document.getElementById(`${teamKey}Question`);
    if (!questionContainer) return;
    
    // Текст вопроса
    const questionText = questionContainer.querySelector('.question-text');
    if (questionText) {
        questionText.textContent = question.text;
    }
    
    // Сложность
    const difficultyElement = questionContainer.querySelector('.question-difficulty');
    if (difficultyElement) {
        difficultyElement.textContent = getDifficultyText(difficulty);
        difficultyElement.className = 'question-difficulty ' + difficulty;
    }
    
    // Таймер
    const timerElement = document.getElementById(`${teamKey}Timer`);
    if (timerElement) {
        timerElement.textContent = team.questionTimer;
        timerElement.style.color = '#3a86ff';
        timerElement.style.animation = '';
    }
    
    // Варианты ответов
    const answerOptions = questionContainer.querySelectorAll('.answer-option');
    
    // Обновляем кнопки с ответами
    answerOptions.forEach((option, displayIndex) => {
        if (displayIndex < question.answers.length) {
            option.textContent = question.answers[displayIndex];
            option.dataset.originalIndex = question.originalIndices[displayIndex];
            option.dataset.displayIndex = displayIndex;
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
            option.style.display = 'block';
            
            // Удаляем старые обработчики и добавляем новые
            option.onclick = null;
            option.addEventListener('click', () => {
                // Передаем оригинальный индекс для проверки
                checkAnswer(teamKey, question.originalIndices[displayIndex], displayIndex);
            });
        } else {
            option.style.display = 'none';
        }
    });
    
    // Запуск таймера вопроса
    startQuestionTimer(teamKey);
}

function getDifficultyText(difficulty) {
    switch(difficulty) {
        case 'easy': return 'Легкий';
        case 'medium': return 'Средний';
        case 'hard': return 'Сложный';
        default: return 'Легкий';
    }
}

function startQuestionTimer(teamKey) {
    const team = gameState.teams[teamKey];
    
    if (team.questionTimerId) {
        clearInterval(team.questionTimerId);
    }
    
    team.questionTimerId = setInterval(() => {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        team.questionTimer--;
        
        // Обновление отображения таймера
        const timerElement = document.getElementById(`${teamKey}Timer`);
        if (timerElement) {
            timerElement.textContent = team.questionTimer;
            
            // Изменение цвета при малом времени
            if (team.questionTimer <= 10) {
                timerElement.style.color = '#ff4757';
                timerElement.style.animation = 'pulse 1s infinite';
            } else if (team.questionTimer <= 20) {
                timerElement.style.color = '#ffa502';
            } else {
                timerElement.style.color = '#3a86ff';
                timerElement.style.animation = '';
            }
        }
        
        // Время вышло - неправильный ответ
        if (team.questionTimer <= 0) {
            clearInterval(team.questionTimerId);
            handleWrongAnswer(teamKey);
        }
    }, 1000);
}

// ===== ПРОВЕРКА ОТВЕТОВ =====
function checkAnswer(teamKey, originalAnswerIndex, displayIndex) {
    if (!gameState.gameActive || gameState.isPaused) return;
    
    const team = gameState.teams[teamKey];
    const question = team.currentQuestion;
    
    if (!question || !team.isAnswering) return;
    
    // Помечаем, что команда больше не отвечает
    team.isAnswering = false;
    
    // Остановить таймер вопроса
    if (team.questionTimerId) {
        clearInterval(team.questionTimerId);
        team.questionTimerId = null;
    }
    
    // Проверить ответ - используем оригинальный индекс
    const isCorrect = originalAnswerIndex === question.originalCorrectIndex;
    
    // Получить элемент ответа
    const questionContainer = document.getElementById(`${teamKey}Question`);
    const answerOptions = questionContainer.querySelectorAll('.answer-option');
    
    // Отключить все кнопки
    answerOptions.forEach(option => {
        option.disabled = true;
    });
    
    // Подсветить правильный и неправильный ответы
    answerOptions.forEach((option) => {
        const optionOriginalIndex = parseInt(option.dataset.originalIndex);
        const optionDisplayIndex = parseInt(option.dataset.displayIndex);
        
        if (optionOriginalIndex === question.originalCorrectIndex) {
            option.classList.add('correct');
        } else if (optionOriginalIndex === originalAnswerIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Обработка результата
    if (isCorrect) {
        handleCorrectAnswer(teamKey);
    } else {
        handleWrongAnswer(teamKey);
    }
    
    // Сгенерировать новый вопрос через 2 секунды
    setTimeout(() => {
        if (gameState.gameActive && !gameState.isPaused) {
            generateQuestion(teamKey);
        }
    }, 2000);
}

function handleCorrectAnswer(teamKey) {
    const team = gameState.teams[teamKey];
    
    // Начислить очки
    let points = 0;
    if (team.questionTimer > 20) points = 100;
    else if (team.questionTimer > 10) points = 80;
    else if (team.questionTimer > 0) points = 50;
    
    team.score += points;
    team.correctAnswers++;
    gameState.questionsAnswered++;
    gameState.meteorsDestroyed++;
    
    // Уничтожить метеорит, направленный к планете этой команды
    destroyMeteorForTeam(teamKey);
    
    // Показать уведомление
    showNotification(`Правильно! +${points} очков`, 'correct');
    
    // Анимация защиты планеты
    animatePlanetProtection(teamKey);
    
    // Обновить интерфейс
    updateScores();
    updateGameStats();
    
    // Проверить увеличение уровня
    checkLevelUp();
}

function handleWrongAnswer(teamKey) {
    const team = gameState.teams[teamKey];
    
    // Нанести урон случайной планете команды
    const planets = team.planets;
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    
    // Урон зависит от уровня
    const damage = 20 + gameState.level * 5;
    team.planetHealth[randomPlanet] = Math.max(0, team.planetHealth[randomPlanet] - damage);
    
    // Создать метеорит, который попадает в планету
    createMeteorForPlanet(randomPlanet, teamKey);
    
    // Показать уведомление
    showNotification(`Неправильно! ${getPlanetName(randomPlanet)} получает урон`, 'incorrect');
    
    // Анимация удара по планете
    animatePlanetHit(randomPlanet);
    
    // Обновить интерфейс
    updatePlanetHealth();
    
    // Проверить поражение
    checkGameOver();
}

function getPlanetName(planetId) {
    const planetNames = {
        mercury: 'Меркурий',
        venus: 'Венера',
        earth: 'Земля',
        mars: 'Марс',
        jupiter: 'Юпитер',
        saturn: 'Сатурн',
        uranus: 'Уран',
        neptune: 'Нептун'
    };
    return planetNames[planetId] || planetId;
}

// ===== АНИМАЦИИ ПЛАНЕТ =====
function animatePlanetProtection(teamKey) {
    const team = gameState.teams[teamKey];
    
    // Выбираем случайную планету команды для анимации защиты
    const planets = team.planets;
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    
    const planetElement = document.getElementById(randomPlanet);
    if (planetElement) {
        planetElement.classList.add('protected');
        
        // Убираем анимацию через 2 секунды
        setTimeout(() => {
            planetElement.classList.remove('protected');
        }, 2000);
    }
}

function animatePlanetHit(planetId) {
    const planetElement = document.getElementById(planetId);
    if (planetElement) {
        planetElement.style.animation = 'planet-hit 0.5s ease';
        
        // Убираем анимацию через 0.5 секунды
        setTimeout(() => {
            planetElement.style.animation = '';
        }, 500);
    }
}

// ===== МЕТЕОРИТЫ =====
function startMeteorGeneration() {
    // Генерация метеоритов каждые 3-10 секунд
    function generateMeteor() {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        // Случайно выбираем команду для атаки
        const teams = ['teamA', 'teamB'];
        const targetTeam = teams[Math.floor(Math.random() * teams.length)];
        const team = gameState.teams[targetTeam];
        
        // Выбираем случайную планету команды
        const targetPlanet = team.planets[Math.floor(Math.random() * team.planets.length)];
        
        // Создаем метеорит
        createMeteor(targetPlanet, targetTeam);
        
        // Следующий метеорит
        const nextDelay = 3000 + Math.random() * 7000 - (gameState.level * 500);
        setTimeout(generateMeteor, Math.max(1000, nextDelay));
    }
    
    // Первый метеорит через 2 секунды
    setTimeout(generateMeteor, 2000);
}

function createMeteor(planetId, teamKey) {
    // Получаем размеры космической сцены для правильного позиционирования
    const spaceScene = document.querySelector('.space-scene');
    const sceneWidth = spaceScene ? spaceScene.clientWidth : window.innerWidth;
    const sceneHeight = spaceScene ? spaceScene.clientHeight : window.innerHeight * 0.7;
    
    const meteor = {
        id: Date.now() + Math.random(),
        planetId: planetId,
        teamKey: teamKey,
        x: sceneWidth + 100, // Начинаем за правым краем
        y: Math.random() * sceneHeight,
        size: 15 + Math.random() * 25,
        speed: 2 + gameState.level * 0.5 + Math.random() * 3,
        element: null,
        isDestroyed: false
    };
    
    // Создаем DOM-элемент метеорита
    const meteorElement = document.createElement('div');
    meteorElement.className = 'meteor';
    meteorElement.id = `meteor-${meteor.id}`;
    meteorElement.style.width = `${meteor.size}px`;
    meteorElement.style.height = `${meteor.size}px`;
    meteorElement.style.left = `${meteor.x}px`;
    meteorElement.style.top = `${meteor.y}px`;
    
    // Добавляем элемент в контейнер
    const meteorsContainer = document.getElementById('meteorsContainer');
    if (meteorsContainer) {
        meteorsContainer.appendChild(meteorElement);
    }
    meteor.element = meteorElement;
    
    // Добавляем в массив активных метеоритов
    gameState.activeMeteors.push(meteor);
    
    return meteor;
}

function createMeteorForPlanet(planetId, teamKey) {
    // Создаем метеорит с большей скоростью (наказание за неправильный ответ)
    const meteor = createMeteor(planetId, teamKey);
    meteor.speed *= 1.5;
    meteor.size *= 1.2;
    
    // Обновляем размер метеорита
    if (meteor.element) {
        meteor.element.style.width = `${meteor.size}px`;
        meteor.element.style.height = `${meteor.size}px`;
    }
}

function destroyMeteorForTeam(teamKey) {
    // Находим метеорит, направленный к планете этой команды
    const meteorIndex = gameState.activeMeteors.findIndex(m => m.teamKey === teamKey && !m.isDestroyed);
    
    if (meteorIndex !== -1) {
        const meteor = gameState.activeMeteors[meteorIndex];
        meteor.isDestroyed = true;
        
        // Анимация взрыва
        if (meteor.element) {
            meteor.element.style.transition = 'all 0.5s ease';
            meteor.element.style.transform = 'scale(2)';
            meteor.element.style.opacity = '0';
            
            // Удалить элемент после анимации
            setTimeout(() => {
                if (meteor.element && meteor.element.parentNode) {
                    meteor.element.parentNode.removeChild(meteor.element);
                }
            }, 500);
        }
        
        // Удалить из массива активных метеоритов
        gameState.activeMeteors.splice(meteorIndex, 1);
    }
}

function animateMeteors() {
    if (!gameState.gameActive || gameState.isPaused) return;
    
    const currentTime = Date.now();
    const deltaTime = Math.min(100, currentTime - gameState.lastAnimationTime);
    
    // Получаем размеры космической сцены
    const spaceScene = document.querySelector('.space-scene');
    const sceneWidth = spaceScene ? spaceScene.clientWidth : window.innerWidth;
    const sceneHeight = spaceScene ? spaceScene.clientHeight : window.innerHeight * 0.7;
    
    // Обновляем позиции всех метеоритов
    for (let i = gameState.activeMeteors.length - 1; i >= 0; i--) {
        const meteor = gameState.activeMeteors[i];
        if (meteor.isDestroyed) continue;
        
        // Находим цель (планету)
        const planetElement = document.getElementById(meteor.planetId);
        if (!planetElement) {
            // Если планета не найдена, удаляем метеорит
            meteor.isDestroyed = true;
            if (meteor.element && meteor.element.parentNode) {
                meteor.element.parentNode.removeChild(meteor.element);
            }
            gameState.activeMeteors.splice(i, 1);
            continue;
        }
        
        // Получаем координаты планеты
        const planetRect = planetElement.getBoundingClientRect();
        const targetX = planetRect.left + planetRect.width / 2;
        const targetY = planetRect.top + planetRect.height / 2;
        
        // Вычисляем вектор направления
        const dx = targetX - meteor.x;
        const dy = targetY - meteor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Если метеорит достиг цели
        if (distance < meteor.size / 2 + planetRect.width / 2) {
            // Столкновение с планетой
            meteor.isDestroyed = true;
            
            // Анимация удара
            if (meteor.element) {
                meteor.element.style.transition = 'all 0.3s ease';
                meteor.element.style.transform = 'scale(1.5)';
                meteor.element.style.opacity = '0';
                
                setTimeout(() => {
                    if (meteor.element && meteor.element.parentNode) {
                        meteor.element.parentNode.removeChild(meteor.element);
                    }
                }, 300);
            }
            
            // Нанести урон планете
            const team = gameState.teams[meteor.teamKey];
            const damage = 10 + Math.floor(meteor.size / 5);
            team.planetHealth[meteor.planetId] = Math.max(0, team.planetHealth[meteor.planetId] - damage);
            
            // Анимация повреждения планеты
            animatePlanetHit(meteor.planetId);
            
            // Обновить здоровье планеты
            updatePlanetHealth();
            
            // Проверить поражение
            checkGameOver();
            
            // Удалить метеорит из массива
            gameState.activeMeteors.splice(i, 1);
            continue;
        }
        
        // Нормализуем вектор и умножаем на скорость
        const speedFactor = deltaTime / 16;
        const moveX = (dx / distance) * meteor.speed * speedFactor;
        const moveY = (dy / distance) * meteor.speed * speedFactor;
        
        // Обновляем позицию
        meteor.x += moveX;
        meteor.y += moveY;
        
        // Обновляем положение на экране
        if (meteor.element) {
            meteor.element.style.left = `${meteor.x}px`;
            meteor.element.style.top = `${meteor.y}px`;
            
            // Вращение метеорита
            const rotation = meteor.rotation || 0;
            meteor.rotation = rotation + 5;
            meteor.element.style.transform = `rotate(${meteor.rotation}deg)`;
        }
        
        // Если метеорит улетел за пределы экрана, удаляем его
        if (meteor.x < -100 || meteor.x > sceneWidth + 100 || meteor.y < -100 || meteor.y > sceneHeight + 100) {
            meteor.isDestroyed = true;
            if (meteor.element && meteor.element.parentNode) {
                meteor.element.parentNode.removeChild(meteor.element);
            }
            gameState.activeMeteors.splice(i, 1);
        }
    }
    
    gameState.lastAnimationTime = currentTime;
}

// ===== АНИМАЦИЯ ИГРЫ =====
function animateGame() {
    if (!gameState.gameActive || gameState.isPaused) {
        gameState.animationFrameId = null;
        return;
    }
    
    animateMeteors();
    gameState.animationFrameId = requestAnimationFrame(animateGame);
}

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
function updateScores() {
    document.getElementById('teamAScore').textContent = gameState.teams.teamA.score;
    document.getElementById('teamBScore').textContent = gameState.teams.teamB.score;
}

function updatePlanetHealth() {
    // Обновить здоровье планет команды A
    gameState.teams.teamA.planets.forEach(planetId => {
        const health = gameState.teams.teamA.planetHealth[planetId];
        const healthBar = document.querySelector(`.team-a-panel .planet-status[data-planet="${planetId}"] .health-bar`);
        if (healthBar) {
            healthBar.style.width = `${health}%`;
            
            // Изменить цвет в зависимости от здоровья
            if (health < 30) {
                healthBar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
            } else if (health < 60) {
                healthBar.style.background = 'linear-gradient(90deg, #ffa502, #ffbe76)';
            } else {
                healthBar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
            }
        }
    });
    
    // Обновить здоровье планет команды B
    gameState.teams.teamB.planets.forEach(planetId => {
        const health = gameState.teams.teamB.planetHealth[planetId];
        const healthBar = document.querySelector(`.team-b-panel .planet-status[data-planet="${planetId}"] .health-bar`);
        if (healthBar) {
            healthBar.style.width = `${health}%`;
            
            // Изменить цвет в зависимости от здоровья
            if (health < 30) {
                healthBar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
            } else if (health < 60) {
                healthBar.style.background = 'linear-gradient(90deg, #ffa502, #ffbe76)';
            } else {
                healthBar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
            }
        }
    });
}

function updateGameStats() {
    // Уровень
    const levelElement = document.getElementById('currentLevel');
    if (levelElement) {
        levelElement.textContent = gameState.level;
    }
    
    // Прогресс уровня
    const levelProgress = document.getElementById('levelProgress');
    if (levelProgress) {
        const progress = (gameState.questionsAnswered % 10) * 10;
        levelProgress.style.width = `${progress}%`;
    }
    
    // Уничтожено метеоритов
    const meteorsElement = document.getElementById('meteorsDestroyed');
    if (meteorsElement) {
        meteorsElement.textContent = gameState.meteorsDestroyed;
    }
}

function updateGameTime() {
    const minutes = Math.floor(gameState.gameTime / 60);
    const seconds = gameState.gameTime % 60;
    const timeElement = document.getElementById('gameTime');
    if (timeElement) {
        timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// ===== ПРОВЕРКА УРОВНЯ =====
function checkLevelUp() {
    // Повышаем уровень каждые 10 правильных ответов
    const totalCorrectAnswers = gameState.teams.teamA.correctAnswers + gameState.teams.teamB.correctAnswers;
    const newLevel = Math.floor(totalCorrectAnswers / 10) + 1;
    
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        showNotification(`Достигнут уровень ${gameState.level}!`, 'warning');
        updateGameStats();
    }
}

// ===== ПРОВЕРКА КОНЦА ИГРЫ =====
function checkGameOver() {
    let gameOver = false;
    let victory = true;
    let message = '';
    let icon = '<i class="fas fa-trophy"></i>';
    
    // Проверяем здоровье планет
    // Если Земля (ключевая планета команды A) уничтожена
    if (gameState.teams.teamA.planetHealth.earth <= 0) {
        gameOver = true;
        victory = false;
        message = 'Земля уничтожена! Солнечная система потеряла ключевую планету.';
        icon = '<i class="fas fa-skull-crossbones"></i>';
    }
    
    // Если Юпитер (ключевая планета команды B) уничтожен
    if (gameState.teams.teamB.planetHealth.jupiter <= 0) {
        gameOver = true;
        victory = false;
        message = 'Юпитер уничтожен! Гравитационный баланс нарушен.';
        icon = '<i class="fas fa-skull-crossbones"></i>';
    }
    
    // Если все планеты одной из команд уничтожены
    const teamADestroyed = gameState.teams.teamA.planets.every(p => gameState.teams.teamA.planetHealth[p] <= 0);
    const teamBDestroyed = gameState.teams.teamB.planets.every(p => gameState.teams.teamB.planetHealth[p] <= 0);
    
    if (teamADestroyed || teamBDestroyed) {
        gameOver = true;
        victory = false;
        message = teamADestroyed ? 
            'Все внутренние планеты уничтожены!' : 
            'Все внешние планеты уничтожены!';
        icon = '<i class="fas fa-skull-crossbones"></i>';
    }
    
    // Победа после 5 уровней
    if (gameState.level >= 5 && gameState.questionsAnswered >= 25) {
        gameOver = true;
        victory = true;
        message = 'Гравитация под контролем! Солнечная система спасена.';
        icon = '<i class="fas fa-trophy"></i>';
    }
    
    if (gameOver) {
        endGame(victory, message, icon);
    }
}

function endGame(victory, message, icon) {
    gameState.gameActive = false;
    
    // Остановить таймеры
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    
    // Остановить таймеры вопросов
    Object.keys(gameState.teams).forEach(teamKey => {
        const team = gameState.teams[teamKey];
        if (team.questionTimerId) {
            clearInterval(team.questionTimerId);
            team.questionTimerId = null;
        }
    });
    
    // Остановить анимацию
    if (gameState.animationFrameId) {
        cancelAnimationFrame(gameState.animationFrameId);
        gameState.animationFrameId = null;
    }
    
    // Установить результаты
    const titleElement = document.getElementById('gameResultTitle');
    const iconElement = document.getElementById('resultIcon');
    const messageElement = document.getElementById('gameResultMessage');
    
    if (titleElement) {
        titleElement.textContent = victory ? 
            'Гравитация под контролем!' : 'Солнечная система разрушена!';
    }
    
    if (iconElement) {
        iconElement.innerHTML = icon;
    }
    
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    // Установить финальные счета
    document.getElementById('finalTeamAScore').textContent = gameState.teams.teamA.score;
    document.getElementById('finalTeamBScore').textContent = gameState.teams.teamB.score;
    
    // Обновить состояние планет на экране результатов
    updateFinalPlanets();
    
    // Показать экран окончания игры
    showScreen('gameOverScreen');
}

function updateFinalPlanets() {
    // Команда A
    gameState.teams.teamA.planets.forEach(planetId => {
        const planetElement = document.querySelector(`.team-a-final .final-planet[data-planet="${planetId}"]`);
        if (planetElement) {
            const health = gameState.teams.teamA.planetHealth[planetId];
            if (health > 0) {
                planetElement.classList.add('saved');
                planetElement.classList.remove('destroyed');
            } else {
                planetElement.classList.add('destroyed');
                planetElement.classList.remove('saved');
            }
        }
    });
    
    // Команда B
    gameState.teams.teamB.planets.forEach(planetId => {
        const planetElement = document.querySelector(`.team-b-final .final-planet[data-planet="${planetId}"]`);
        if (planetElement) {
            const health = gameState.teams.teamB.planetHealth[planetId];
            if (health > 0) {
                planetElement.classList.add('saved');
                planetElement.classList.remove('destroyed');
            } else {
                planetElement.classList.add('destroyed');
                planetElement.classList.remove('saved');
            }
        }
    });
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const content = notification.querySelector('.notification-content');
    
    if (!notification || !content) return;
    
    // Установить содержимое и тип
    notification.className = `notification ${type}`;
    
    // Иконка в зависимости от типа
    let icon = '';
    switch(type) {
        case 'correct':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'incorrect':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
    }
    
    content.innerHTML = `${icon} ${message}`;
    
    // Показать уведомление
    notification.classList.add('active');
    
    // Скрыть через 3 секунды
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// ===== ПАУЗА ИГРЫ =====
function pauseGame() {
    if (!gameState.gameActive) return;
    
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        // Остановить игровое время
        if (gameState.gameTimer) {
            clearInterval(gameState.gameTimer);
            gameState.gameTimer = null;
        }
        
        // Остановить таймеры вопросов
        Object.keys(gameState.teams).forEach(teamKey => {
            const team = gameState.teams[teamKey];
            if (team.questionTimerId) {
                clearInterval(team.questionTimerId);
                team.questionTimerId = null;
            }
        });
        
        // Остановить анимацию
        if (gameState.animationFrameId) {
            cancelAnimationFrame(gameState.animationFrameId);
            gameState.animationFrameId = null;
        }
        
        showScreen('pauseScreen');
    } else {
        // Возобновить игру
        resumeGame();
    }
}

function resumeGame() {
    gameState.isPaused = false;
    
    // Возобновить игровое время
    gameState.gameTimer = setInterval(() => {
        gameState.gameTime++;
        updateGameTime();
    }, 1000);
    
    // Возобновить таймеры вопросов
    Object.keys(gameState.teams).forEach(teamKey => {
        const team = gameState.teams[teamKey];
        if (team.currentQuestion && team.questionTimer > 0 && team.isAnswering) {
            startQuestionTimer(teamKey);
        }
    });
    
    // Возобновить анимацию
    gameState.lastAnimationTime = Date.now();
    animateGame();
    
    showScreen('gameScreen');
}

// ===== УПРАВЛЕНИЕ ЗВУКОМ =====
function toggleSound() {
    gameState.isSoundOn = !gameState.isSoundOn;
    const soundToggle = document.getElementById('soundToggle');
    
    if (soundToggle) {
        if (gameState.isSoundOn) {
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            showNotification('Звук включен', 'warning');
        } else {
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            showNotification('Звук выключен', 'warning');
        }
    }
}

// ===== КАНВАС ДЛЯ ЗВЕЗДНОГО ФОНА =====
function initStarfield() {
    const canvas = document.getElementById('spaceCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Установка размеров канваса
    function resizeCanvas() {
        const spaceScene = document.querySelector('.space-scene');
        if (spaceScene) {
            canvas.width = spaceScene.clientWidth;
            canvas.height = spaceScene.clientHeight;
        }
    }
    
    // Создание звезд
    const stars = [];
    const starCount = 200;
    
    function initStars() {
        stars.length = 0;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5,
                brightness: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    // Анимация звезд
    function animateStars() {
        if (!ctx || canvas.width === 0 || canvas.height === 0) {
            requestAnimationFrame(animateStars);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисование звезд
        stars.forEach(star => {
            // Движение звезд (параллакс-эффект)
            star.x -= star.speed;
            if (star.x < -10) {
                star.x = canvas.width + 10;
                star.y = Math.random() * canvas.height;
            }
            
            // Рисование звезды
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();
            
            // Эффект мерцания
            if (Math.random() < 0.01) {
                star.brightness = Math.random() * 0.5 + 0.5;
            }
        });
        
        // Рисование туманностей
        drawNebula(ctx, canvas);
        
        requestAnimationFrame(animateStars);
    }
    
    function drawNebula(ctx, canvas) {
        // Рисование градиентных туманностей на заднем плане
        const gradient1 = ctx.createRadialGradient(
            canvas.width * 0.2, canvas.height * 0.3, 0,
            canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.4
        );
        gradient1.addColorStop(0, 'rgba(58, 134, 255, 0.1)');
        gradient1.addColorStop(1, 'rgba(58, 134, 255, 0)');
        
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const gradient2 = ctx.createRadialGradient(
            canvas.width * 0.8, canvas.height * 0.7, 0,
            canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.3
        );
        gradient2.addColorStop(0, 'rgba(131, 56, 236, 0.1)');
        gradient2.addColorStop(1, 'rgba(131, 56, 236, 0)');
        
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Инициализация
    resizeCanvas();
    initStars();
    animateStars();
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, инициализация игры...");
    
    // Инициализация экранов
    showScreen('mainMenu');
    
    // Инициализация настроек команд
    setupTeams();
    
    // Инициализация звездного неба
    initStarfield();
    
    // Назначение обработчиков событий для кнопок главного меню
    const startGameBtn = document.getElementById('startGameBtn');
    const teamsSetupBtn = document.getElementById('teamsSetupBtn');
    const rulesBtn = document.getElementById('rulesBtn');
    const topicsBtn = document.getElementById('topicsBtn');
    
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            console.log("Кнопка 'Начать игру' нажата");
            initializeGame();
            showScreen('gameScreen');
        });
    }
    
    if (teamsSetupBtn) {
        teamsSetupBtn.addEventListener('click', () => {
            console.log("Кнопка 'Настройка команд' нажата");
            showScreen('teamsSetup');
        });
    }
    
    if (rulesBtn) {
        rulesBtn.addEventListener('click', () => {
            console.log("Кнопка 'Правила игры' нажата");
            showScreen('rulesScreen');
        });
    }
    
    if (topicsBtn) {
        topicsBtn.addEventListener('click', () => {
            console.log("Кнопка 'Темы вопросов' нажата");
            showScreen('topicsScreen');
        });
    }
    
    // Назначение обработчиков для кнопок "Назад"
    document.getElementById('backToMainBtn').addEventListener('click', () => {
        showScreen('mainMenu');
    });
    
    document.getElementById('backToMainFromRulesBtn').addEventListener('click', () => {
        showScreen('mainMenu');
    });
    
    document.getElementById('backToMainFromTopicsBtn').addEventListener('click', () => {
        showScreen('mainMenu');
    });
    
    // Назначение обработчиков для кнопок начала игры
    document.getElementById('startGameFromSetupBtn').addEventListener('click', () => {
        initializeGame();
        showScreen('gameScreen');
    });
    
    // Назначение обработчиков для игрового экрана
    const pauseBtn = document.getElementById('pauseBtn');
    const soundToggle = document.getElementById('soundToggle');
    const helpBtn = document.getElementById('helpBtn');
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseGame);
    }
    
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
    }
    
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            showNotification('Выберите правильный ответ до истечения времени! Каждый правильный ответ уничтожает метеорит.', 'warning');
        });
    }
    
    // Назначение обработчиков для экрана паузы
    document.getElementById('resumeBtn').addEventListener('click', resumeGame);
    document.getElementById('restartBtn').addEventListener('click', () => {
        initializeGame();
        showScreen('gameScreen');
    });
    document.getElementById('toMenuBtn').addEventListener('click', () => {
        showScreen('mainMenu');
    });
    
    // Назначение обработчиков для экрана окончания игры
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        initializeGame();
        showScreen('gameScreen');
    });
    document.getElementById('toMainFromGameOverBtn').addEventListener('click', () => {
        showScreen('mainMenu');
    });
    
    // Установка демонстрационных вопросов в главном меню
    const demoQuestionA = document.querySelector('#teamAQuestion .question-text');
    const demoQuestionB = document.querySelector('#teamBQuestion .question-text');
    
    if (demoQuestionA && demoQuestionB) {
        demoQuestionA.textContent = gameState.questions.easy[0].text;
        demoQuestionB.textContent = gameState.questions.medium[0].text;
    }
    
    // Установка демонстрационных ответов
    const demoAnswersA = document.querySelectorAll('#teamAQuestion .answer-option');
    const demoAnswersB = document.querySelectorAll('#teamBQuestion .answer-option');
    
    if (demoAnswersA.length > 0) {
        gameState.questions.easy[0].answers.forEach((answer, index) => {
            if (demoAnswersA[index]) {
                demoAnswersA[index].textContent = answer;
                // Удаляем старые обработчики и добавляем демонстрационные
                demoAnswersA[index].onclick = null;
                demoAnswersA[index].addEventListener('click', () => {
                    showNotification('Это демонстрационный режим. Начните игру для ответов на вопросы!', 'warning');
                });
            }
        });
    }
    
    if (demoAnswersB.length > 0) {
        gameState.questions.medium[0].answers.forEach((answer, index) => {
            if (demoAnswersB[index]) {
                demoAnswersB[index].textContent = answer;
                // Удаляем старые обработчики и добавляем демонстрационные
                demoAnswersB[index].onclick = null;
                demoAnswersB[index].addEventListener('click', () => {
                    showNotification('Это демонстрационный режим. Начните игру для ответов на вопросы!', 'warning');
                });
            }
        });
    }
    
    // Улучшение адаптивности при изменении размера окна
    window.addEventListener('resize', () => {
        if (gameState.gameActive && !gameState.isPaused) {
            // Обновить позиции метеоритов при изменении размера окна
            gameState.activeMeteors.forEach(meteor => {
                if (meteor.x > window.innerWidth) {
                    meteor.x = window.innerWidth - 50;
                }
                if (meteor.y > window.innerHeight * 0.7) {
                    meteor.y = window.innerHeight * 0.7 - 50;
                }
            });
        }
    });
    
    console.log('Игра "Физика: Защита Солнечной системы" успешно инициализирована!');
    
    // Тестовое уведомление
    setTimeout(() => {
        showNotification('Добро пожаловать в игру! Начните с настроек команд.', 'warning');
    }, 1000);
});

// Добавление CSS анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes planet-hit {
        0% { transform: scale(1); box-shadow: 0 0 20px currentColor; }
        50% { transform: scale(1.3); box-shadow: 0 0 50px #ff4757; }
        100% { transform: scale(1); box-shadow: 0 0 20px currentColor; }
    }
    
    .pulse {
        animation: pulse 1s infinite;
    }
    
    /* Анимация для правильных ответов */
    @keyframes correct-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(46, 213, 115, 0.5); }
    }
    
    /* Анимация для неправильных ответов */
    @keyframes incorrect-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255, 71, 87, 0.5); }
    }
    
    /* Анимация для новых метеоритов */
    @keyframes meteor-appear {
        0% { opacity: 0; transform: scale(0.5); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .meteor {
        animation: meteor-appear 0.3s ease-out;
    }
`;
document.head.appendChild(style);