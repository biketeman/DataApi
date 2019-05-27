<template>
  <div class="card-container flex">
    <div class="card-left flex">
      <div class="top">
        <img v-bind:src="image" alt="picture-profile">
        <h3>{{title}}</h3>
        <h4>{{description}}</h4>
      </div>
      <div class="bottom">
        <h5>Abonnement et cartes conseillées</h5>
        <div class="flex cards-images">
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
    </div>
    <div class="card-right">
      <div class="flex">
        <div class>
          <h3>{{percentageInTotal}}%</h3>
          <p>part dans le nombre total de voyageurs</p>
        </div>
        <div class>
          <h3>{{percentageCardOwner}}%</h3>
          <p>part dans cette catégorie ayant un abonement ou une carte</p>
        </div>
      </div>
      <div class="bottom">
          <h3>{{percentageNoneRenewed}}%</h3>
          <p>des anciens abonnés qui n'ont pas renouvelé leur abonement</p>
      <Button @click.native="gotoAnalyse(slug)" class="button-out" color="purple" message="Voir plus >"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/reusable/button.vue'
export default {
	name: 'evolution-card',
	components: {
		Button
	},
	props: {
		image: String,
		title: String,
		description: String,
		percentageInTotal: Number,
		percentageCardOwner: Number,
		percentageNoneRenewed: Number,
		card1: String,
		card2: String,
		cardImageText1: String,
		cardImageText2: String,
		slug: String
	},
	methods: {
		gotoAnalyse (profilename) {
			this.$router.push({
				name: 'analyse',
				params: {
					profilename: profilename
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.card-container {
  background-color: $white;
  padding: 10px;
  margin-bottom: 50px;
}
.card-left {
  width: 33.33333%;
  border-right: $border;
  .top {
    height: 50%;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .cards-images {
    justify-content: space-around;
    .cards-images {
      margin-left: auto;
      margin-right: auto;
    }
  }
  h3 {
    margin: 0;
    text-transform: uppercase;
  }
  h4 {
    color: $purple;
    font-weight: 600;
    margin: 0;
    font-size: 18px;
  }
  h5 {
    margin-top: 0px;
    color: $purple;
  }
  .bottom{
    padding-top: 20px;
    border-top: 1px solid $grey;
  }
}
.card-left,
.card-right {
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.card-right {
  p {
    font-size: 13px;
    font-weight: 600;
  }
  .bottom{
    display: flex;
    height: 50%;
    justify-content: space-around;
    position: relative;
    *{
        margin-top: auto;
        margin-bottom: auto;
    }
  }
  img {
    height: 50px;
    width: 50px;
  }
  h3 {
    font-size: 30px;
    color: $purple;
  }
  .flex {
    height: 50%;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: $border;
    div {
      width: 50%;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around
    }
  }
}
.button-out{
  position: absolute;
  bottom: -15px;
  right: -50px;
  cursor: pointer;
}

</style>
