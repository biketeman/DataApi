<template>
    <div>
      <Structure>
      </Structure>
      <div class="container-content">
        <div class="home-headline">
          <h2>Vue générale sur les abonements et les cartes</h2>
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
        <div class="settings container-switch">
          <div class="profil">
            <div class="flex">
              <h2 class="margin">Segmentation par type de carte ou d'abonement</h2>
              <div class="centered">
                <toggle id="toggle"/>
                <Button  color="purple" message="+ Ajouter un type de voyageur"/>
              </div>
            </div>
            <SubscriptionCards/>
            <ProfileCards/>
          </div>
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
import toggle from '@/components/reusable/toggle.vue'
import gql from 'graphql-tag'

export default {
	name: 'dashboard',
	components: {
		Structure,
		Button,
		EvolutionCard,
		ProfileCards,
    toggle,
    SubscriptionCards
	},
	apollo: {
		data: {
			query: gql`
        query {
  		    aboEvolution {
			      cr_type_cr
			      percentage
          }
          getProfileAndDataJeune {
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            description
            title
            image
            card1
            card2
            cardImageText1
            cardImageText2
          }
          getProfileAndDataSenior {
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            description
            title
            image
            card1
            card2
            cardImageText1
            cardImageText2
          }
          getProfileAndDataWeekEnd {
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            description
            title
            image
            card1
            card2
            cardImageText1
            cardImageText2
          }
          getProfileAndDataPro {
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            description
            title
            image
            card1
            card2
            cardImageText1
            cardImageText2
          }
        }
			`,
			// result({ data }){

			// },
			update (data) {
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
.home-headline{
  display: flex;
  .settings{
    margin-left: auto;
    margin-right: 0;
    display: flex;
    justify-content: center;

    img{
      margin-right: 20px;
      padding-top: auto;
      padding-bottom: auto
    }
}
}
.centered{
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: 0;
  display: flex;
}
.cards-container{
  justify-content: space-between;
  display: flex;
  width: 100%;
  margin-top: 50px;
}
</style>
