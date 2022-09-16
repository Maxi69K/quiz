(function () {
    let mainQuiz = {
        start: document.getElementById('start-quiz'),
        quizHolder: document.getElementById('quiz-holder'),
        htmlSelect: document.getElementById('html'),
        cssSelect: document.getElementById('css'),
        jsSelect: document.getElementById('js'),
        question: document.getElementById('question'),
        allAnswers: document.querySelectorAll('.answer'),
        nextBtn: document.getElementById('next'),
        score: document.getElementById('score'),
        progress: document.getElementById('progress'),
        corectAnswer: null,
        init: function () {
            mainQuiz.start.addEventListener('click', mainQuiz.startQuiz);
            mainQuiz.htmlSelect.addEventListener('click', mainQuiz.htmlQuiz);
            mainQuiz.cssSelect.addEventListener('click', mainQuiz.cssQuiz);
            mainQuiz.jsSelect.addEventListener('click', mainQuiz.jsQuiz);
            mainQuiz.nextBtn.addEventListener('click', mainQuiz.nextQuestion);
        },
        htmlQuiz: function () {
            quiz.getQuestion('HTML');
            mainQuiz.run();
            mainQuiz.nextBtn.addEventListener('click', mainQuiz.nextQuestion);
        },
        cssQuiz: function () {
            quiz.getQuestion('CSS');
            mainQuiz.run();
            mainQuiz.nextBtn.addEventListener('click', mainQuiz.nextQuestion);
        },
        jsQuiz: function () {
            quiz.getQuestion('js');
            mainQuiz.run();
            mainQuiz.nextBtn.addEventListener('click', mainQuiz.nextQuestion);
        },
        startQuiz: function () {
            mainQuiz.start.style.display = 'none';
            mainQuiz.quizHolder.style.display = 'block';
        },
        selectAnswer: function () {
            quiz.userAnswer(this.innerHTML);
            if (this.innerHTML === quiz.catQuestions[quiz.index - 1].answer) {
                this.classList.add('correct-answer');
            } else if (this.innerHTML !== quiz.catQuestions[quiz.index - 1].answer) {
                this.classList.add('wrong-answer');
                mainQuiz.corectAnswer.classList.add('correct-answer');
            }
            for (let i = 0; i < mainQuiz.allAnswers.length; i++) {
                mainQuiz.allAnswers[i].removeEventListener('click', mainQuiz.selectAnswer);
            }
        },
        nextQuestion: function () {
            for (let i = 0; i < mainQuiz.allAnswers.length; i++) {
                mainQuiz.allAnswers[i].classList.remove('correct-answer');
                mainQuiz.allAnswers[i].classList.remove('wrong-answer');
            }
            mainQuiz.run();
        },
        run: function () {
            mainQuiz.htmlSelect.removeEventListener('click', mainQuiz.htmlQuiz);
            mainQuiz.cssSelect.removeEventListener('click', mainQuiz.cssQuiz);
            mainQuiz.jsSelect.removeEventListener('click', mainQuiz.jsQuiz);
            if (!quiz.end()) {
                mainQuiz.score.innerHTML = `Poena: ${quiz.score}/${quiz.catQuestions.length*5}`;
                mainQuiz.progress.innerHTML = `${quiz.index+1}/${quiz.catQuestions.length}`;
                let cq = quiz.getQuestion();
                mainQuiz.question.innerHTML = cq.text;
                let rand = quiz.randomize();
                for (let i = 0; i < mainQuiz.allAnswers.length; i++) {
                    mainQuiz.allAnswers[i].innerHTML = rand[i];
                    if (mainQuiz.allAnswers[i].innerHTML === quiz.catQuestions[quiz.index].answer) {
                        mainQuiz.corectAnswer = mainQuiz.allAnswers[i];
                    }
                    mainQuiz.allAnswers[i].addEventListener('click', mainQuiz.selectAnswer);
                }
            } else {
                mainQuiz.score.innerHTML = `Kraj: ${quiz.score}/${quiz.catQuestions.length*5}`;
                quiz.catQuestions = [];
                quiz.index = 0;
                mainQuiz.htmlSelect.addEventListener('click', mainQuiz.htmlQuiz);
                mainQuiz.cssSelect.addEventListener('click', mainQuiz.cssQuiz);
                mainQuiz.jsSelect.addEventListener('click', mainQuiz.jsQuiz);
                mainQuiz.nextBtn.removeEventListener('click', mainQuiz.nextQuestion);
                setTimeout(() => quiz.score = 0, 2000);
            }
        }
    }
    mainQuiz.init();
})()