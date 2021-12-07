<template>
  <div class="backdrop" v-bind:class="{active: active}">
    <div class="modalContent">
      <div class="question" v-if="!wasAnswered">
        <div class="question-category">{{ question.category }}</div>
        <div class="question-text">{{ question.question }}</div>

        <div class="question-input">
          <input type="text" v-model="answer" placeholder="Ответ"/>

          <div class="question-bottom">
            <span class="timer">Осталось {{ this.count }} секунд</span>
            <button v-on:click="checkAnswer" class="button">Ответить</button>
          </div>

        </div>
      </div>

      <div class="result" v-else>
        <div class="result-success" v-if="answerCorrect">Правильно!</div>
        <div class="result-failure" v-else>Неправильно!</div>
        <div class="result-answer">Правильный ответ: "{{ question.answer }}"</div>
        <button class="button" @click="closeHandler">Выйти</button>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {superTrim} from "../../helper";

export default {
  computed: {
    ...mapGetters(['active', 'question'])
  },
  methods: {
    ...mapActions(['closeModalPls', "answeredQuestion", 'updateScore', 'updateRightAnswer', 'updateWrongAnswer']),

    checkAnswer() {
      this.counter = false;
      const question = this.question;
      const payload = {
        id: question.id,
        category: question.category,
      }

      if (superTrim(this.answer) === superTrim(question.answer)) {
        this.wasAnswered = true;
        this.answerCorrect = true;
        this.updateScore(question.value);
        this.updateRightAnswer();
        this.answeredQuestion({...payload, correctly: true});
      } else {
        this.wasAnswered = true;
        this.answerCorrect = false;
        this.updateScore(-question.value);
        this.updateWrongAnswer();
        this.answeredQuestion({...payload, correctly: false});
      }
    },

    closeHandler() {
      this.closeModalPls();
      this.count = 5;
      this.answerCorrect = false;
      this.wasAnswered = false;
    },
  },
  watch: {
    active: function () {
      this.counter = this.active;
    },

    counter(value) {
      if (value) {
        setTimeout(() => {
          this.count--;
        }, 1000);
      }
    },
    count: {
      handler(value) {
        if (value > 0 && this.counter) {
          setTimeout(() => {
            this.count--;
          }, 1000);
        } else {
          if (!value && this.counter) {
            this.wasAnswered = true;
            this.answerCorrect = false;
            this.updateScore(-this.question.value);
            this.updateWrongAnswer();
            this.answeredQuestion({id: this.question.id, category: this.question.category, correctly: false});
            this.counter = false;
          }
        }
      },
    }
  },
  data() {
    return {
      answer: '',
      wasAnswered: false,
      answerCorrect: false,
      counter: false,
      count: 5
    }
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.backdrop.active {
  display: flex;
}

.modalContent {
  position: relative;
  width: 700px;
  height: auto;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}

.question {
  display: flex;
  flex-direction: column;
  text-align: start;

  &-category {
    padding: 0 25px 20px 25px;
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
  }

  &-text {
    padding: 20px 25px 35px;
    font-size: 22px;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
  }

  &-input {
    padding: 20px 25px 0 25px;

    input {
      width: calc(100% - 33px);
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid silver;
      font-size: 20px;
    }
  }

  &-bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.timer {
  color: red;
  font-weight: bold;
}

.button {
  background-color: deepskyblue;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.result {
  &-success,
  &-failure {
    padding: 30px;
    font-size: 50px;
  }

  &-success {
    color: #0BAB63;
  }

  &-failure {
    color: red;
  }

  &-answer {
    padding: 30px;
    border-top: 1px solid silver;
    font-size: 30px;
    color: #0BAB63;
  }
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  color: black;
  font-size: 30px;
}

.timer {
  font-size: 20px;
}
</style>