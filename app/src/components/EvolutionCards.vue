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
import axios from 'axios'
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
	mounted () {
		let url = this.api_base_url
		let query = `
									query{
											aboEvolution{
													cle_client
													}
											}
							`
		console.log(query)
		console.log('sexe')
		axios.post(url, { query: query })
			.then((resp) => {
				console.log(resp.data)
			})
	}
}
</script>
<style>
.cards-container{
  justify-content: space-between;
  display: flex;
  width: 100%;
  margin-top: 50px;
}
</style>
