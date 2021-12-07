<template>
  <div class="wrapper">
    <div class="noLog" v-if="!gamer">Зарегайся</div>
    <div class="container" v-else>
      <div class="game-history" v-if="gameStarted">
        <div class="top">Текущая игра</div>
        <div class="table">
          <div class="row">
            <div class="block thead">Кол-во вопросов</div>
            <div class="block thead">Верных ответов</div>
            <div class="block thead">Неверных ответов</div>
            <div class="block thead">Сумма баллов</div>
            <div class="block thead">Создано</div>
            <div class="block thead">Завершено</div>
          </div>
          <div class="row">
            <div class="block">{{currentGame.questionCount}}</div>
            <div class="block">{{currentGame.rightAnswer}}</div>
            <div class="block">{{currentGame.wrongAnswer}}</div>
            <div class="block">{{currentGame.score}}</div>
            <div class="block">{{currentGame.startDate}}</div>
            <div class="block choice">
              <button class="continue" @click="$router.push('/game')">Продолжить</button>
              <button class="end" @click="this.completeTheGame">Завершить</button>
            </div>
          </div>
        </div>

      </div>
      <div class="game-history">
        <div class="top">
          История игр
          <button @click="openConfirmWindow">Очистить историю</button>
        </div>
        <div class="table">
          <div class="row">
            <div class="block thead">Кол-во вопросов</div>
            <div class="block thead">Верных ответов</div>
            <div class="block thead">Неверных ответов</div>
            <div class="block thead">Сумма баллов</div>
            <div class="block thead">Создано</div>
            <div class="block thead">Завершено</div>
          </div>
          <div class="row" v-for="(gameStatistic, index) in history" :key="index">
            <div class="block">{{gameStatistic.questionCount}}</div>
            <div class="block">{{gameStatistic.rightAnswer}}</div>
            <div class="block">{{gameStatistic.wrongAnswer}}</div>
            <div class="block">{{gameStatistic.score}}</div>
            <div class="block">{{gameStatistic.startDate}}</div>
            <div class="block">{{gameStatistic.endDate}}</div>
          </div>
        </div>
      </div>
      <div class="goBack" @click="$router.push('/')">На главную</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  computed: {
    ...mapGetters(['history', 'currentGame', 'gamer', 'gameStarted'])
  },
  methods: {
    ...mapActions(['completeTheGame', 'clearHistory']),

    openConfirmWindow() {
      let confirm = window.confirm('Вы действительно хотите очистить всю историю?');
      if(confirm) {
        this.clearHistory();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #E4E5E5;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.noLog {
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  background-color: #19AD70;
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 0 auto;
}

//table
.game-history {
  background-color: #19AD70;
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;

  button {
    padding: 10px 15px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    background-color: #DB3646;
  }
}

.table {
  display: flex;
  flex-direction: column;

}

.row {
  display: flex;
  border-radius: 5px;
  overflow: hidden;
}

.thead {
  background-color: #0A7953;
  border-bottom: 1px solid silver;
}

.block {
  width: 16.6666666667%;
  padding: 20px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-right: 1px solid silver;

  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-right: none;
  }
}

.choice {
  display: flex;
  flex-direction: column;

  button {
    padding: 5px 10px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: 0.3s background-color;
  }
}
.continue {
  background-color: #27A745;
  &:hover {
    background-color: chartreuse;
  }
}
.end {
  background-color: red;
  &:hover {
    background-color: #DB3646;
  }
}

.goBack {
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 30px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
}
</style>