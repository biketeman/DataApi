<template>
  <div>
    <ul class="cards-container">
      <li v-for="card in cards" :key="card.title">
        <EvolutionCard :title="card.title" :image="card.img" :number="card.number"/>
      </li>
    </ul>
  </div>
</template>

<script>
import EvolutionCard from '@/components/reusable/evolutionCard.vue'
import gql from 'graphql-tag'

export default {
	name: 'dashboard',
	components: {
		EvolutionCard
	},
	data () {
		return {
			dataLoaded: false,
			cards: [
				{
					title: 'Abonnement Week-END',
					number: 0,
					img: require('@/assets/logo.png')
				},
				{
					title: 'Abonnement Senior+',
					number: 0,
					img: require('@/assets/logo.png')
				},
				{
					title: 'Abonnement Enfant +',
					number: 0,
					img: require('@/assets/logo.png')
				},
				{
					title: 'Carte jeune',
					number: 0,
					img: require('@/assets/logo.png')
				},
				{
					title: 'Evolution du nombre d abonnés',
					number: 0,
					img: require('@/assets/logo.png')
				}
			]
		}
	},
	apollo: {
		data: {
			query: gql`
        query {
  				aboEvolution{ cr_type_cr percentage}
        }
      `,
			update (data) {
				return data
			},
			error (err) {
				console.log('Erreur Apollo', err)
			}
		}
	},
	mounted () {
	}
}
</script>
<style lang="scss" scoped>
.cards-container{
  justify-content: space-between;
  display: flex;
  width: 100%;
  margin-top: 50px;
}	
</style>



