<template>
  <div class="clue" v-on:click="check()">
    <div class="output" v-if="clue.answerIsCorrect === undefined">{{clue.value}}</div>
    <div class="output" v-else>
      <span class="success" v-if="clue.answerIsCorrect">Верно</span>
      <span class="failure" v-else>Не верно</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  props: {
    clue: Object
  },
  methods: {
    ...mapActions(['getQuestion']),

    check() {
      if (this.clue.answerIsCorrect === undefined) {
        this.getQuestion(this.clue)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.clue {
  width: 25%;
  margin: 5px;
  border-radius: 10px;
  background-color: #0A7A56;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  transition: 0.3s background-color, color;

  .success,
  .failure {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    color: #9B7D74;
    font-size: 18px;
    font-weight: normal;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .success {
    background-color: #C0EFCB;
  }
  .failure {
    background-color: #F7D7DA;
  }
}
.output {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.clue:hover {
  background-color: #27A745;
}
</style>