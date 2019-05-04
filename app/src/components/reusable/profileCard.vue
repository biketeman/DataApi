<template>
  <div class="card-container flex">
    <div class="card-left flex">
      <img v-bind:src="image" alt="picture-profile">
      <h3>{{title}}</h3>
      <h4>{{definition}}</h4>
    </div>
    <div class="card-right">
        <div class="flex">
            <div class="">
                <h3>{{numberleft}}%</h3>
                <p>part dans le nombre total de voyageurs</p>
            </div>
            <div class="">
                <h3>{{numberright}}%</h3>
                <p>part dans cette catégorie ayant un abonement ou une carte</p>
            </div>
        </div>
        <h5>Abonement et cartes conseillées</h5>
        <div class="flex cards-images">
            <div v-if="cardImage1 != 'empty'">
                <img v-bind:src="cardImage1" alt="card-image">
                <p>{{cardImageText1}}</p>
            </div>
            <div>
                <img v-bind:src="cardImage2" alt="card-image">
                <p>{{cardImageText2}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'evolution-card',
	props: {
		image: String,
		title: String,
		definition: String,
		numberleft: Number,
		numberright: Number,
		cardImage1: String,
		cardImage2: String,
		cardImageText1: String,
		cardImageText2: String
	}
}
</script>

<style lang="scss" scoped>
.card-container {
  background-color: $white;
  padding: 10px;
  margin-bottom: 50px;
}
.card-left{
  width: 33.33333%;
  border-right: 1px solid $grey;
  img{
      height:125px;
      width: 125px;
      margin-left: auto;
      margin-right: auto;
  }
  h3{
      margin: 0;
      text-transform: uppercase;
  }
  h4{
      color: $purple;
      font-weight: 600;
      margin: 0;
      font-size: 18px;
  }
}
.card-left, .card-right{
    padding: 20px;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
}
.card-right{
    h5{
        color: $purple
    }
    img{
        height: 50px;
        width: 50px;
    }
    h3{
        font-size: 30px;
        color: $purple
    }
    p{
      font-size: 13px;
      font-weight: 600;
    }
    .flex{
        div{
            width: 50%;
            padding-left: 20px;
            padding-right: 20px
        }
    }
    .cards-images{
        justify-content: space-around;
        .cards-images{
            margin-left: auto;
            margin-right: auto;
        }
    }
}
</style>
