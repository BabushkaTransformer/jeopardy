<template>
  <div class="row">
    <div class="category-title">
      {{category.title}}
    </div>
    <div class="category-questions">
      <Clue v-for="clue in category.clues" :clue="clue" :key="clue.id" />
    </div>
  </div>
</template>

<script>
import Clue from "./Clue";

export default {
  props: {
    category: Object
  },
  components: {
    Clue
  },
}
</script>

<style scoped>
.row {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  border: 1px solid #fff;
  border-radius: 10px;
  margin-bottom: 5px;
}
.category-questions {
  display: flex;
  width: 75%;
}
.category-title {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}
</style>