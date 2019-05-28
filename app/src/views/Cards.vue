<template>
  <!-- if data is loaded get the content -->
  <div v-if="isDataLoaded">
    <Structure/>
    <div class="container-content">
      <div class="home-headline">
        <h2
          v-if="data"
        >Vue générale sur la souscription à la carte jeune pour ce type de voyageur</h2>
      </div>
      <div v-if="data" class="global-overview">
        <analyse-card
          title="part dans le nombre total de voyageurs"
          :percentage="CardpercentageInTotal"
        />
        <analyse-card
          title="pourcentage de cette carte dans les détenteurs de carte comm"
          :percentage="CardpercentageInTotalcardOwner"
        />
      </div>
      <h2 class="slight-margin">Date de souscription à la carte ({{cardname}})</h2>
      <div class="time-evolution" v-if="data">
        <div v-if="data" class="left">
          <div class="graph">
            <radar-chart-evolution v-if="data" :chart-data="datacollection" :options="this.options"></radar-chart-evolution>
          </div>
        </div>
        <div class="right centered" v-if="isFirstGraphClicked">
          <h4>Sélectionner les valeurs souhaité pour avoir les détails</h4>
        </div>
        <div class="right-clicked" v-else>
          <div class="top">
            <h4>Nombre de personnes ciblées</h4>
            <h3>{{summUsers}}</h3>
          </div>
          <div class="bottom">
            <h4>Pourcentage par rapport au profil</h4>
            <h3>{{ (summUsers/ SummTotal * 100).toFixed(1) }}%</h3>
          </div>
        </div>
      </div>
      <div class="time-evolution" v-if="data">
        <div v-if="data.AmountOfTravelsPerNumberOfTravel" class="left">
          <div class="graph">
            <bar-chart-evolution
              :chart-data="datacollectionSecondGraph"
              :options="this.optionsSecondGraph"
            ></bar-chart-evolution>
          </div>
        </div>
        <div class="right centered" v-if="isSecondGraphClicked">
          <h4>Sélectionner les valeurs souhaité pour avoir les détails</h4>
        </div>
				<div class="right-clicked" v-else>
          <div class="top">
            <h4>Nombre de personnes ciblées</h4>
            <h3>{{summUsersSecondGraph}}</h3>
          </div>
          <div class="bottom">
            <h4>Pourcentage par rapport au profil</h4>
            <h3>{{ (summUsersSecondGraph/ SummTotalSecondGraph * 100).toFixed(1) }}%</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- while data is loading get the loader -->
  <div v-else class="loader">
    <div class="LoaderBalls">
      <div class="LoaderBalls__item"></div>
      <div class="LoaderBalls__item"></div>
      <div class="LoaderBalls__item"></div>
    </div>
  </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import analyseCard from '@/components/reusable/analyseCardPercentage.vue'
import BarChartEvolution from '@/components/charts/BarChart.js'
import RadarChartEvolution from '@/components/charts/Radar.js'
import gql from 'graphql-tag'

export default {
	name: 'cards',
	components: {
		Structure,
		analyseCard,
		BarChartEvolution,
		RadarChartEvolution
	},
	apollo: {
		data: {
			query: gql`
        query($cardname: String!) {
          TimeSubcriptionEvolution(card: $cardname, date_debut: "2017-01-01", date_fin: "2019-01-01") {
            date
            count
					}
          AmountOfTravelsPerNumberOfTravel(card: $cardname) {
            count
            AmountSubscribers
          }
        }
      `,
			variables () {
				return {
					cardname: this.cardname
				}
			},
			update (data) {
				return data
			},
			result ({ loading, data }) {
				if (data) {
					let monthCount = 0
					data.TimeSubcriptionEvolution.forEach(item => {
						if (monthCount > 11) {
							this.datacollection.labels.push(item.date)
							this.datacollection.datasets[0].data.push(item.count)
						} else {
							this.datacollection.datasets[1].data.push(item.count)
						}
						monthCount++
					})
					data.AmountOfTravelsPerNumberOfTravel.forEach(item => {
						this.datacollectionSecondGraph.labels.push(item.count)
						this.datacollectionSecondGraph.datasets[0].data.push(
							item.AmountSubscribers
						)
					})
					this.isDataLoaded = true
				}
			},
			error (err) {
				console.log('Erreur Apollo', err)
			}
		}
	},
	data () {
		return {
			cardname: this.$route.params.cardname,
			CardpercentageInTotalcardOwner: window.localStorage.getItem('percentageInTotalcardOwner'),
			CardpercentageInTotal: window.localStorage.getItem('percentageInTotal'),

			// Chart manipulation variables to display the graphs and the data
			isDataLoaded: true,
			summUsers: 0,
			SummTotal: 0,
			isFirstGraphClicked: true,
			summUsersSecondGraph: 0,
			SummTotalSecondGraph: 0,
			isSecondGraphClicked: true,

			// Options and chartData for graphs
			datacollection: {
				labels: [],
				datasets: [
					{
						label: '2018',
						backgroundColor: 'rgba(128,204,255, 0.2)',
						borderColor: 'rgba(128,204,255, 0.6)',
						data: []
					},
					{
						label: '2019',
						backgroundColor: 'rgba(0,102,255, 0.2)',
						borderColor: 'rgba(0,102,255, 0.6)',
						data: []
					}
				]
			},
			options: {},
			datacollectionSecondGraph: {
				labels: [],
				datasets: [
					{
						label: 'Abonnés',
						backgroundColor: '#80ccff',
						data: []
					}
				]
			},
			optionsSecondGraph: {}
		}
	},
	mounted () {
		const _this = this
		this.options = {
			onClick: function (evt, item) {
				// chart manipulation on click event variables

				let bgColor = item[0]['_model'].backgroundColor
				let index = item[0]['_index']
				let value = this.tooltip._data.datasets[0].data[index]
				_this.isFirstGraphClicked = false

				// Getting the sum of all chart values
				if (_this.SummTotal === 0) {
					for (var i = 0; i < this.tooltip._data.datasets[0].data.length; i++) {
						_this.SummTotal += this.tooltip._data.datasets[0].data[i]
					}
				}

				// Chnanging graph color and increasing or decreasing the sum of selected value
				if (bgColor !== '#4710A3') {
					item[0]['_model'].backgroundColor = '#4710A3'
					_this.summUsers += value
				} else {
					item[0]['_model'].backgroundColor = '#80ccff'
					_this.summUsers -= value
				}
			},
			events: ['click'],
			legend: {
				display: true
			},
			maintainAspectRatio: false,
			layout: {
				padding: {
					right: 30
				}
			}
		}

		this.optionsSecondGraph = {
			onClick: function (evt, item) {
				// chart manipulation on click event variables

				let index = item[0]['_index']
				let value = this.tooltip._data.datasets[0].data[index]
				_this.isSecondGraphClicked = false

				// Getting the sum of all chart values
				if (_this.SummTotalSecondGraph === 0) {
					for (var i = 0; i < this.tooltip._data.datasets[0].data.length; i++) {
						_this.SummTotalSecondGraph += this.tooltip._data.datasets[0].data[i]
					}
				}

				// Chnanging graph color and increasing or decreasing the sum of selected value
				if (item[0]['_model'].backgroundColor !== '#4710A3') {
					item[0]['_model'].backgroundColor = '#4710A3'
					_this.summUsersSecondGraph += value
				} else {
					item[0]['_model'].backgroundColor = '#80ccff'
					_this.summUsersSecondGraph -= value
				}
			},
			maintainAspectRatio: false,
			events: ['click'],
			layout: {
				padding: {
					right: 30
				}
			},
			scales: {
				xAxes: [
					{
						stacked: true,
						ticks: {
							fontSize: 11,
							beginAtZero: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Nombres de voyages effectué en 2018',
							fontColor: '#4710A3',
							fontSize: 20
						}
					}
				],
				yAxes: [
					{
						stacked: true,
						ticks: {
							fontColor: 'black',
							fontSize: 12,
							beginAtZero: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Nombre de voyageurs ',
							fontColor: '#4710A3',
							fontSize: 20
						}
					}
				]
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
.slight-margin {
  margin-top: 50px;
  margin-bottom: 50px;
}

.time-evolution {
  background-color: $white;
  padding: 25px;
  margin-bottom: 50px;
  display: flex;
  .left {
    width: 60%;
    border-right: $border;
  }
  .right {
    text-align: center;
    width: 40%;
    display: flex;
    h4 {
      color: $purple;
      margin: auto;
    }
  }
}
.graph {
  width: 100%;
  cursor: pointer;
}
.global-overview {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.right-clicked {
  width: 40%;
  text-align: center;
  padding: 0px 20px;
  .top {
    margin-top: auto;
    margin-bottom: auto;
    border-bottom: $border;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    h3 {
      font-size: 30px;
    }
    h4 {
      font-size: 18px;
      color: $purple;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    h3 {
      font-size: 30px;
    }
    h4 {
      font-size: 18px;
      color: $purple;
    }
  }
}
</style>
