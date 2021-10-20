const startBtn = document.querySelector('.start-btn')
const nextBtn = document.querySelector('.next-btn')
const showAnsBtn = document.querySelector('.show-ans-btn')
const answerBtns = document.querySelector('.quiz-game__answer-btns')
const viewScoreBtn = document.querySelector('.view-score-btn')
const questionContainer = document.querySelector('.quiz-game__heading')
const scoreCount = document.querySelector('.quiz-game__score')
const responseMsg = document.querySelector('.quiz-game__message')
const viewScoreScreen = document.querySelector('.quiz-game__end-screen')
const scoreCloseBtn = document.querySelector('.quiz-game__score-close-btn')
let shuffledQuestionList
let currentQuestionIndex
let playerScore
let currentScore

// Question list
const questionList = [
    {
        question: 'When Jack was 9, Jenny was 3 times younger, now Jack is 30, how old is Jenny ?',
        answers: [
            {content: '27', correct: false, msg: '3 times younger, not 3 years younger'},
            {content: '24', correct: true, msg: 'Very conscious, amazing, good job'},
            {content: '48', correct: false, msg: '3 times younger, not 3 times older'},
            {content: '69', correct: false, msg: 'How can you event choose this one ...'}
        ]
    },
    {
        question: 'Is the author handsome ?',
        answers: [
            {content: 'Yes', correct: true, msg: 'Congratulation, excellent move'},
            {content: 'STILL YES, BUT IN UPPERCASE', correct: true, msg: 'Congratulation, excellent move'},
            {content: 'Of course yes !!!', correct: true, msg: 'Congratulation, excellent move'},
            {content: 'Nope', correct: false, msg: 'What happens to your aesthetic sense ?'}
        ]
    },
    {
        question: 'Test your lucky here with 25% chance',
        answers: [
            {content: 'A', correct: false, msg: 'Teacher Bien taught "anything don\'t know, just pick C"'},
            {content: 'B', correct: false, msg: 'Teacher Bien taught "anything don\'t know, just pick C"'},
            {content: 'C', correct: true, msg: 'Today is a lucky day ^.^'},
            {content: 'D', correct: false, msg: 'Teacher Bien taught "anything don\'t know, just pick C"'}
        ]
    },
    {
        question: 'Slap your girlfriend\'s face for $1.M ?',
        answers: [
            {content: 'Let\'s go bruh bruh', correct: false, msg: 'I will tell your girlfriend !!'},
            {content: 'No! I\'m a good boy, woof woof', correct: true, msg: 'You are my idol, from now'},
            {content: 'Can I do that twice for another $1.M ?', correct: false, msg: 'I will tell your girlfriend !!'},
            {content: 'I don\'t have a girlfriend :\'(', correct: true, msg: 'Me too :<<'}
        ]
    },
    {
        question: 'How many members are there in Doraemon\'s team',
        answers: [
            {content: '5', correct: false, msg: 'Doraemon\'s schoolmates, not Nobita and his team'},
            {content: '6', correct: false, msg: 'The story about Doraemon\'s schoolmates, remember ?'},
            {content: '7', correct: true, msg: 'Wow, your childhood must be really "hot"'},
            {content: '8', correct: false, msg: 'The story about Doraemon\'s schoolmates, remember ?'}
        ]
    },
    {
        question: 'What you need to do when facing a problem ?',
        answers: [
            {content: 'Call "Mom ..."', correct: true, msg: 'Yeah, mom iz da best'},
            {content: 'Search on Google', correct: true, msg: 'Google is good, but mom iz still da best'},
            {content: 'Ignore it, I have to sleep first zZz', correct: false, msg: 'Hey! don\'t be that lazy'},
            {content: 'Pray for blessing from ancestor', correct: false, msg: 'They can bless you with all problems, accept this time'}
        ]
    },
    {
        question: 'What is 1 - 1 equal to ?',
        answers: [
            {content: 'Number of lover of someone in this room, lol', correct: true, msg: 'Shh, they must be crying inside'},
            {content: 'The amount of money in your wallet', correct: true, msg: 'Me too, cryyyyy'},
            {content: '69, because I like that', correct: false, msg: 'Wronggggggg, because I like that'},
            {content: 'Let me type on my calculator first', correct: false, msg: 'It showed you "0", right ?'}
        ]
    },
    {
        question: 'Can elephants fly ?',
        answers: [
            {content: 'No', correct: true, msg: 'Nice choice !'},
            {content: 'Only if they had a first-purchase gift', correct: false, msg: 'less gaming, haha'},
            {content: 'No, because my ancestor said so', correct: true, msg: 'Follow ancestor is never a bad option'},
            {content: 'Yes, maybe they ate the Devil fruit', correct: false, msg: 'OMG, maybe they can also swim'}
        ]
    },
    {
        question: 'Do you respect the LGBT community ?',
        answers: [
            {content: 'Yes', correct: true, msg: 'Thank you <3'},
            {content: 'Yes', correct: true, msg: 'Thank you <3'},
            {content: 'Yes', correct: true, msg: 'Thank you <3'},
            {content: 'Yes', correct: true, msg: 'Thank you <3'}
        ]
    },
    {
        question: 'Physic or Chemistry ?',
        answers: [
            {content: 'Physic, let\'s goooooo', correct: true, msg: 'We are the champions'},
            {content: 'Chemistry, of course', correct: true, msg: 'We are the champions'},
            {content: 'How about Biology, I love it so much', correct: true, msg: 'How about Literature ?'},
            {content: 'Eat - Sleep - Play - Repeat', correct: false, msg: 'Where is "Taking shower" ?'}
        ]
    }
]

// Logic functions
function startGame() {
    startBtn.classList.add('hide')
    viewScoreBtn.classList.add('hide')
    viewScoreScreen.classList.add('hide')
    questionContainer.classList.remove('hide')
    answerBtns.classList.remove('hide')
    document.querySelector('.quiz-game__footer').classList.remove('hide')
    shuffledQuestionList = questionList.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    playerScore = 0
    setNextQuestion()
    const gameMaxScore = questionList.length >= 10 ? questionList.length : '0' + questionList.length
    document.querySelector('.quiz-game__max-score').innerText = gameMaxScore
    document.querySelector('.quiz-game__end-max-score').innerText = gameMaxScore
    scoreCount.innerText = '00'
    document.querySelector('.quiz-game__end-score').innerText = '00'
}

function setNextQuestion() {
    resetState()
    const currentQuestion = shuffledQuestionList[currentQuestionIndex]
    loadCurrentQuestion(currentQuestion)
}

function loadCurrentQuestion(currentQuestion) {
    const questionText = currentQuestionIndex < 9 ? 
        'Question 0' + (currentQuestionIndex + 1)  + ': ' + currentQuestion.question:
        'Question ' + (currentQuestionIndex + 1)  + ': ' + currentQuestion.question
    questionContainer.innerText = questionText
    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerText = answer.content
        btn.dataset.msg = answer.msg
        if (answer.correct) {
            btn.dataset.correct = answer.correct
        }
        btn.onclick = selectAnswer
        answerBtns.appendChild(btn)
    });
}

function selectAnswer(e) {
    const selectedAnswer = e.target
    const isCorrect = selectedAnswer.dataset.correct
    responseMsg.innerText = selectedAnswer.dataset.msg
    setStatusClass(document.body, isCorrect)
    setStatusClass(selectedAnswer, isCorrect)
    if (currentQuestionIndex < questionList.length - 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.classList.remove('hide')
        startBtn.innerText = 'Restart'
        viewScoreBtn.classList.remove('hide')
    }
    Array.from(answerBtns.children).forEach(btn => {
        btn.disabled = true
    })
    renderScore(isCorrect)
}

function resetState() {
    nextBtn.classList.add('hide')
    showAnsBtn.classList.add('hide')
    answerBtns.innerHTML=''
    document.body.classList.remove('correct')
    document.body.classList.remove('incorrect')
}

function setStatusClass(el, isCorrect) {
    if(isCorrect) {
        el.classList.add('correct')
    } else {
        el.classList.add('incorrect')
        showAnsBtn.classList.remove('hide')
    }
}

function renderScore(isCorrect) {
    if (isCorrect) {
        playerScore++
        if (playerScore < 10) {
            currentScore = '0' + playerScore
        } else {
            currentScore = playerScore
        }
        scoreCount.innerText = currentScore
        document.querySelector('.quiz-game__end-score').innerText = currentScore
    }
}

// Button click events
startBtn.onclick = (startGame)

nextBtn.onclick = function() {
    currentQuestionIndex++
    responseMsg.innerText = 'Message...'
    setNextQuestion()
}

showAnsBtn.onclick = function() {
    Array.from(answerBtns.children).forEach(btn => {
        if(btn.dataset.correct) {
            btn.classList.add('correct')
        }
    })
}

viewScoreBtn.onclick = function() {
    viewScoreScreen.classList.remove('hide')
    if (!viewScoreScreen.classList.contains('hide')) {
        window.onkeyup = function(e) {
            if (e.keyCode === 27) {
                viewScoreScreen.classList.add('hide')
            }
            if (e.keyCode === 13) {
                startBtn.click()
            }
        }
    }
}

scoreCloseBtn.onclick = function() {
    viewScoreScreen.classList.add('hide')
}