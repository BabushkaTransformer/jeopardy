<template>
  <div class="wrapper">
    <div class="loading" v-if="this.loading">Загружается</div>

    <div class="board" v-else>
      <div class="routes">
        <button @click="$router.push('/statistic')">Статистика</button>
        <button @click="$router.push('/')">На главную</button>
      </div>

      <div class="questions">
        <CategoryRow v-for="category in allCategories" v-bind:key="category.id" v-bind:category="category"/>
      </div>

      <div class="bottom">
        <div class="score">Счет: {{ score }}</div>
        <button class="endGame" @click="theEnd">Завершить игру</button>
      </div>
    </div>

  </div>
  <QuestionModal/>
</template>

<script>
import CategoryRow from "../components/CategoryRow";
import QuestionModal from "../components/modals/QuestionModal";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    QuestionModal,
    CategoryRow
  },
  computed: {
    ...mapGetters(['score', 'allCategories', 'loading'])
  },
  methods: {
    ...mapActions(['completeTheGame']),

    theEnd() {
      this.completeTheGame();
      this.$router.push('/statistic')
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.routes {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  button {
    padding: 5px 10px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #27A745;
    color: white;
    transition: 0.2s background-color;

    &:hover {
      background-color: chartreuse;
    }
  }
}

.board {
  width: 90%;
  height: 90%;
  border-radius: 10px;
  background-color: #0BAB63;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score {
  font-size: 40px;
  font-weight: bold;
  color: #fff;
}

.endGame {
  padding: 13px 20px;
  border-radius: 5px;
  background-color: red;
  border: none;
  color: #fff;
  font-size: 20px;
  transition: 0.3s background-color;

  &:hover {
    background-color: #DB3646;
  }
}
</style>