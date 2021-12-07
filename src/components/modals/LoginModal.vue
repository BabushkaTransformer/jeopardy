<template>
  <div class="backdrop" v-bind:class="{active: this.isOpen}">
    <div class="modal-content">

      <div class="close" @click="closeUserModal">x</div>

      <div class="input">
        <input type="text" v-model="name" placeholder="Введите имя"/>
        <span>{{ error ? "Имя должна быть больше 3, меньше 20 символов" : "" }}</span>
      </div>

      <button @click="getGamerName">это я</button>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    isOpen: Boolean
  },
  computed: {
    ...mapGetters(['gamer'])
  },
  methods: {
    ...mapActions(['setGamer']),

    closeUserModal() {
      this.$emit('switchIsOpen');
    },

    getGamerName() {
      if (this.superValidate(this.name)) {
        this.setGamer(this.name);
        this.closeUserModal();
      } else {
        this.error = true;
      }
    },

    superValidate(name) {
      return name.trim().length >= 3 && name.trim().length <= 20
    }
  },
  data() {
    return {
      name: '',
      error: false
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
}

.backdrop.active {
  display: flex;
}

.modal-content {
  position: relative;
  background-color: white;
  width: 500px;
  height: 100px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 20%;
    padding: 10px 20px;
    background-color: chartreuse;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }
}

.input {
  position: relative;
  width: 80%;

  input {
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid silver;
    box-sizing: border-box;
  }

  span {
    position: absolute;
    top: 100%;
    left: 0;
    color: red;
    font-size: 13px;
    margin-top: 2px;
  }
}

.close {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: red;
  cursor: pointer;
}
</style>