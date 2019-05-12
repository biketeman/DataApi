<template>
  <div class="chart">
    <doughnut :chart-data="datacollection" :options="this.options"></doughnut>
  </div>
</template>

<script>
import Doughnut from './Doughnut.js'

export default {
	components: {
		Doughnut
	},
	data () {
		return {
			datacollection: {
				labels: ['percentage'],
				datasets: [
					{
						label: 'Abonnés',
						backgroundColor: ['purple', 'white'],
						borderColor: 'grey',
						data: [5, 15],
						borderWidth: 1
					}
				]
			},
			options: {
				  layout: {
					padding: {
						right: 5,
						bottom: 5
					}
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: false
				}
			}
		}
	},
	mounted () {
	}
}
</script>

<style scoped>

</style>
