<template>
  <div class="wrapper">

    <div class="user">
      <span @click="switchIsOpen">{{ !this.gamer ? "Зарегайся" : "Привет, " + this.gamer }}</span>
    </div>

    <div class="buttons">
      <button class="button" v-bind:class="{hidden : !this.currentGame.startDate}" @click="$router.push('game')">
        Продолжить
      </button>
      <button class="button" @click="check">Новая игра</button>
      <button class="button" @click="$router.push('/statistic')">Статистика</button>
    </div>

  </div>
  <LoginModal :isOpen='isOpen' @switchIsOpen="switchIsOpen"/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoginModal from "../components/modals/LoginModal";

export default {
  components: {LoginModal},
  computed: {
    ...mapGetters(['gamer', 'currentGame'])
  },
  methods: {
    ...mapActions(['setGamer', 'createNewGame', 'getCategories']),

    check() {
      if (this.gamer) {
        if (this.currentGame.startDate) {
          let confirm = window.confirm('Вы действительно хотите начать новую игру? Нынешняя игра не сохранится в статистику');
          confirm && this.startGame();
        } else {
          this.startGame();
        }
      } else {
        this.switchIsOpen();
      }
    },

    startGame() {
      this.$router.push('/game');
      this.getCategories();
      this.createNewGame();
    },

    switchIsOpen() {
      this.isOpen = !this.isOpen;
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #E4E5E5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  width: 500px;
  height: 200px;

  display: flex;
  flex-direction: column;
}

.user {
  position: absolute;
  top: 20px;
  left: 20px;
  text-decoration: underline;
  color: red;
  font-weight: bold;
  cursor: pointer;
}

.button {
  background-color: #0BAB63;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 10px;

  cursor: pointer;
  transition: 0.3s background-color;

  &:hover {
    background-color: chartreuse;
  }
}

.hidden {
  display: none;
}
</style>