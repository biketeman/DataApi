<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="this.options"></bar-chart>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.js'

export default {
	components: {
		BarChart
	},
	data () {
		return {
			datacollection: {
				labels: ['0 - 3', '4 - 6', '7 - 9', '10 +'],
				datasets: [
					{
						label: 'Abonnés',
						backgroundColor: '#f87979',
						data: [15, 35, 25, 25]
					}, {
						label: 'Non-Abonnés',
						backgroundColor: '#41aff4',
						data: [40, 30, 18, 12]
					}
				]
			},
			options: {
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Nombre de voyages'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '% de la population'
						}
					}]
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

<style>
  .small {
    max-width: 600px;
    margin:  75px auto;
  }
</style>
