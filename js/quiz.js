class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.catQuestions = [];
        this.index = 0;
        this.score = 0;
    }
    getQuestion(category) {
        for (let i = 0; i < questions.length; i++) {
            const allQuestion = questions[i];
            if (allQuestion.category === category) {
                this.catQuestions.push(allQuestion);
            }
        }
        return this.catQuestions[this.index];
    }
    randomize() {
        let copyArray = [].concat(this.getQuestion().options);
        let rand = [];
        for (let i = 0; i < 4; i++) {
            let r = Math.floor(Math.random() * copyArray.length);
            rand.push(copyArray[r]);
            copyArray.splice(r, 1);
        }
        return rand;
    }
    userAnswer(answer) {
        if (answer === this.getQuestion().answer) {
            this.score += this.getQuestion().points;
        }
        this.index++;

    }
    end() {
        return this.index === this.catQuestions.length;
    }
}

const quiz = new Quiz(questions);