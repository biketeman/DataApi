<template>
  <div>
    <div v-if="isDataLoaded">
      <Structure/>
      <div class="container-content">
        <div class="home-headline">
          <h2>Vue générale sur les abonnements et les cartes</h2>
          <div class="settings">
            <img class="small-icon" src="../assets/icons/settings-work-tool.svg">
            <Button color="white" message="Anéee passée"/>
          </div>
        </div>
        <ul class="cards-container" v-if="data">
          <li v-for="(item, index) in data.aboEvolution" :key="index">
            <EvolutionCard :title="item.cr_type_cr" :number="item.percentage.toFixed(1)"/>
          </li>
        </ul>
        <div class="settings container-switch" v-if="data">
          <div class="profil">
            <div class="flex">
              <h2 class="margin">Segmentation par type de carte ou d'abonnement</h2>
              <div class="centered">
                <div class="switch-container centered">
                  <img
                    src="@/assets/icons/people_purple.svg"
                    id="people_purple"
                    alt="people-switch"
                  >
                  <label class="switch">
                    <input type="checkbox" v-model="switchProfile">
                    <span class="slider round"></span>
                  </label>
                  <img src="@/assets/icons/purple_card.svg" id="card_purple" alt="card-switch">
                </div>
                <Button color="purple" message="+ Ajouter un type de voyageur"/>
              </div>
            </div>
            <SubscriptionCards v-if="switchProfile"/>
            <ProfileCards v-else/>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loader">
        <div class="LoaderBalls">
            <div class="LoaderBalls__item"></div>
            <div class="LoaderBalls__item"></div>
            <div class="LoaderBalls__item"></div>
        </div>
    </div>
  </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Button from '@/components/reusable/button.vue'
import ProfileCards from '@/components/profileCards.vue'
import SubscriptionCards from '@/components/subscriptionCards.vue'
import EvolutionCard from '@/components/reusable/evolutionCard.vue'
import gql from 'graphql-tag'

export default {
	name: 'dashboard',
	components: {
		Structure,
		Button,
		EvolutionCard,
		ProfileCards,
		SubscriptionCards
	},
	data () {
		return {
			switchProfile: false,
			isDataLoaded: false
		}
	},
	apollo: {
		data: {
			query: gql`
        query {
          aboEvolution {
            cr_type_cr
            percentage
          }
        }
      `,
			update (data) {
				this.isDataLoaded = true
				return data
			},
			error (err) {
				console.log('Erreur Apollo', err)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container-content {
  margin-top: 65px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
  max-width: 100%;
}
.home-headline {
  display: flex;
  .settings {
    margin-left: auto;
    margin-right: 0;
    display: flex;
    justify-content: center;

    img {
      margin-right: 20px;
      padding-top: auto;
      padding-bottom: auto;
    }
  }
}
.centered {
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: 0;
  display: flex;
}
.cards-container {
  justify-content: space-between;
  display: flex;
  width: 100%;
  margin-top: 50px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $purple;
}

input:focus + .slider {
  box-shadow: 0 0 1px $purple;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

#people_purple {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
#card_purple {
  width: 40px;
  height: 40px;
  margin-right: 30px;
  margin-left: 20px;
}

</style>
