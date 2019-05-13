<template>
    <div class="analyse-card">
        <h4>Abonements et cartes conseillées</h4>
        <div class="flex">
            <div v-if="cardImage1 != 'empty'">
                <img class="small" v-bind:src="cardImage1" alt="card-image">
                <p>{{cardImageText1}}</p>
            </div>
            <div>
                <img class="small" v-bind:src="cardImage2" alt="card-image">
                <p>{{cardImageText2}}</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cardImage1: String,
        cardImage2: String,
        cardImageText1: String,
        cardImageText2: String,
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
  
</style>
