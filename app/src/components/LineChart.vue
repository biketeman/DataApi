<template>
  <div class="small">
    <bar-chart :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Randomize</button>
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
			datacollection: null
		}
	},
	mounted () {
		this.fillData()
	},
	methods: {
		fillData () {
			this.datacollection = {
				labels: [this.getRandomInt(), this.getRandomInt()],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [this.getRandomInt(), this.getRandomInt()]
					}, {
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [this.getRandomInt(), this.getRandomInt()]
					}
				]
			}
		},
		getRandomInt () {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5
		}
	}
}
// import BarChart from './charts/BarChart.js'

// export default {
// 	components: {
// 		BarChart
// 	},
// 	data () {
// 		return {
// 			datacollection: null
// 		}
// 	},
// 	mounted () {
// 		// Overwriting base render method with actual data.
// 		this.renderChart({
// 			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
// 			datasets: [
// 				{
// 					label: 'GitHub Commits',
// 					backgroundColor: '#f87979',
// 					data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
// 				}
// 			]
// 		})
// 	}
// }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
