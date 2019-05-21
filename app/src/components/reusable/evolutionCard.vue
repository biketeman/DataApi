<template>
  <div class="card flex">
    <div class="card-container">
      <img v-if="number > 0" src="@/assets/icons/arrow_green.svg" alt="evolution-image">
      <img v-else src="@/assets/icons/arrow_red.svg" alt="evolution-image">
      <h5>{{number}}%</h5>
      <h4>{{title}}</h4>
    </div>
  </div>
</template>

<script>
export default {
	name: 'evolution-card',
	props: {
		number: String,
		title: String
	}
}
</script>

<style lang="scss" scoped>
.card {
  background-color: $white;
  width: 200px;
  min-height: 200px;
  word-wrap: break-word;
  h5 {
    color: $purple;
    margin: 0;
    width: unset;
  }
  h4 {
    font-size: 14px;
    margin: 0;
    width: unset;
  }
}
.card-container {
  padding: 25px;
  text-align: center;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  img {
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
  }
}
h5 {
  font-size: 28px !important;
}
</style>
