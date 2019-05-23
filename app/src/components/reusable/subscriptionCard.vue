<template>
  <div class="card-container flex">
    <div class="card-left flex">
      <div class="top">
        <div v-if="title == 'Jeune'">
          <img :src="require('@/assets/icons/carte_jeune.svg')" alt="picture-profile">
        </div>
        <div v-else-if="title == 'Week-END'">
          <img :src="require('@/assets/icons/abo_week-end.svg')" alt="picture-profile">
        </div>
        <div v-else-if="title == 'Senior+'">
          <img :src="require('@/assets/icons/carte_senior.svg')" alt="picture-profile">
        </div>
        <div v-else-if="title == 'Enfant+' ">
          <img :src="require('@/assets/icons/carte_enfant.svg')" alt="picture-profile">
        </div>
        <h3>Carte {{title}}</h3>
      </div>
    </div>
    <div class="card-right">
      <div class="flex">
        <div class>
          <h3>{{percentageInTotal}}%</h3>
          <p>part dans le nombre total de voyageurs</p>
        </div>
        <div >
          <h3>{{percentageInTotalcardOwner}}%</h3>
          <p>pourcentage parmi les posséseurs de carte</p>
        </div>
        <Button @click.native="gotoAnalyse(title)" class="button-out" color="purple" message="Voir plus >"/>
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
		percentageInTotal: Number,
		percentageInTotalcardOwner: Number
	},
	methods: {
		gotoAnalyse (cardname) {
			this.$router.push({
				name: 'cards',
				params: {
					cardname: cardname
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
    margin-top: 20px;
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
  img {
    height: 50px;
    width: 50px;
  }
  h3 {
    font-size: 30px;
    color: $purple;
  }
  .flex {
    padding-bottom: 10px;
    padding-top: 10px;
    height: 100%;
    position: relative;
    div {
      width: 50%;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
.button-out{
  position: absolute;
  bottom: -20px;
  right: -50px;
  cursor: pointer;
}

</style>
