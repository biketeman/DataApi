<template>
  <div class="card-container flex">
    <div class="card-left flex">
      <div class="top">
        <img v-bind:src="image" alt="picture-profile">
        <h3>Carte {{title}}</h3>
      </div>
    </div>
    <div class="card-right">
      <div class="flex">
        <div class>
          <h3>{{percentageInTotal}}%</h3>
          <p>part dans le nombre total de voyageurs</p>
        </div>
        <div class>
          <h3>{{percentageInTotalcardOwner}}%</h3>
          <p>pourcentage d'abonements non renouvellés</p>
        </div>
      </div>
      <Button @click.native="gotoAnalyse(title)" class="button-out" color="purple" message="Voir plus >"/>
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
		percentageInTotalcardOwner: Number,
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
