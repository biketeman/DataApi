<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './charts/LineChart.js'

export default {
	components: {
		LineChart
	},
	data () {
		return {
			datacollection: {
				labels: ['Janvier', 'Mars', 'Mai', 'Juillet', 'Septembre', 'Novembre'],
				datasets: [
					{
						label: 'Abonnement fréquence',
						backgroundColor: 'white',
						data: [15, 35, 25, 25, 15, 18],
						fill: false,
						borderColor: '#EF3434'
					}, {
						label: 'Abo séniors',
						backgroundColor: 'white',
						data: [25, 30, 18, 12, 15, 18],
						fill: false,
						borderColor: '#2E5CFF'
					}, {
						label: 'Abo jeunes',
						backgroundColor: 'white',
						data: [14, 18, 25, 31, 41, 18],
						fill: false,
						borderColor: '#EBFF00'
					},
					{
						label: 'eza',
						backgroundColor: 'white',
						data: [6, 18, 11, 24, 15, 32],
						fill: false,
						borderColor: '#22BD44'
					}
				]
			},
			options: {
				title: {
					display: true,
					position: 'bottom',
					text: 'Évolution de la souscription d abonements'
				}
			}
		}
	},
	mounted () {
		this.fillData()
	},
	methods: {
		fillData () {
			console.log(this.options)
		}
	}
}
</script>

<style scoped>
  .small {
    max-width: 800px;
    margin:  75px auto;
  }
</style>
