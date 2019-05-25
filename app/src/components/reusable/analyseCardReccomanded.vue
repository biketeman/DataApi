<template>
    <div class="analyse-card">
        <h4>Abonements et cartes conseillées</h4>
        <div class="flex container-both-cards">
            <div v-if="card1 != 'empty'">
                <img class="small" v-bind:src="require('@/assets/icons/'+ card1  + '.svg')" alt="card-image">
                <p>{{cardImageText1}}</p>
            </div>
            <div v-if="card2 != 'empty'">
                <img class="small" v-bind:src="require('@/assets/icons/'+ card2  + '.svg')" alt="card-image">
                <p>{{cardImageText2}}</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		card1: String,
		card2: String,
		cardImageText1: String,
		cardImageText2: String
	}
}
</script>

<style lang="scss" scoped>
.analyse-card{
    background-color: $white;
    padding: 25px;
    width: calc(30% - 40px);
}
h4{
    color: $purple;
    font-size: 14px;
    text-align: center;
}
img {
    height: 95px;
    width: 95px;
    margin-left: auto;
    margin-right: auto;
  }
  .small {
    height: 35px;
    width: 35px;
    margin-left: auto;
    margin-right: auto;
  }
  p {
    font-size: 13px;
    font-weight: 600;
  }
  .flex div{
      width: 50%;
      text-align: center;
  }
.container-both-cards{
    justify-content: space-around;
}
</style>
