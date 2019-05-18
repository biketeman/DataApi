<template>
  <div>
    <ul class="cards-container">
      <li v-for="(item, index) in data.aboEvolution" :key="index">
        <EvolutionCard :title="item.cr_type_cr" :number="item.percentage.toFixed(1)"/>
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
			dataLoaded: false
		}
	},
	apollo: {
		data: {
			query: gql`
        query {
  				aboEvolution{
						cr_type_cr 
						percentage
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
