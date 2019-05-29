<template>
  <!-- if data is loaded get the content -->
  <div v-if="isDataLoaded">
    <Structure/>
    <div class="container-content">
      <div class="home-headline">
        <h2>Vue générale sur la souscription à la carte jeune pour ce type de voyageur</h2>
      </div>
      <div class="global-overview">
        <analyse-card-reccomanded
          :cardImageText1="data.getProfileAndData[0].cardImageText1"
          :cardImageText2="data.getProfileAndData[0].cardImageText2"
          :card1="data.getProfileAndData[0].card1"
          :card2="data.getProfileAndData[0].card2"
        />
        <analyse-card
          title="Part dans le nombre total de voyageurs"
          :percentage="data.getProfileAndData[0].percentageInTotal"
        />
        <analyse-card
          title="Part de cette catégorie ayant un abonnement ou une carte"
          :percentage="data.getProfileAndData[0].percentageCardOwner"
        />
      </div>
      <h2 class="slight-margin">Date de souscription à la carte({{profilename}})</h2>
      <div class="time-evolution">
        <div v-if="data.TimeSubcriptionEvolution" class="left">
          <div class="graph">
            <bar-chart-evolution :chart-data="datacollection" :options="this.options"></bar-chart-evolution>
          </div>
        </div>
        <div class="right centered" v-if="isFirstGraphClicked">
          <h4>Sélectionner les valeurs souhaité pour avoir les détails</h4>
        </div>
        <div class="right-clicked" v-else>
          <div class="top">
            <h4>Nombre de personnes cibléees</h4>
            <h3>{{summUsers}}</h3>
          </div>
          <div class="bottom">
            <h4>Pourcentage par rapport au profil</h4>
            <h3>{{ (summUsers/ SummTotal * 100).toFixed(1) }}%</h3>
            <Button class="button-offer" color="purple" message="faire une offre commerciale"/>
          </div>
        </div>
      </div>

      <div class="time-evolution">
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
            <h4>Nombre de personnes ciblés</h4>
            <h3>{{summUsersSecondGraph}}</h3>
          </div>
          <div class="bottom">
            <h4>Pourcentage par rapport au profil</h4>
            <h3>{{ (summUsersSecondGraph/ SummTotalSecondGraph * 100).toFixed(1) }}%</h3>
            <Button class="button-offer" color="purple" message="faire une offre commerciale"/>
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
import analyseCardReccomanded from '@/components/reusable/analyseCardReccomanded.vue'
import BarChartEvolution from '@/components/charts/BarChart.js'
import Button from '@/components/reusable/button.vue'

import gql from 'graphql-tag'

export default {
	name: 'dashboard',
	components: {
		Structure,
		analyseCard,
		analyseCardReccomanded,
		BarChartEvolution,
		Button
	},

	apollo: {
		data: {
			query: gql`
        query($profilename: String!) {
          TimeSubcriptionEvolution(slug: $profilename) {
            date
            count
          }
          AmountOfTravelsPerNumberOfTravel(slug: $profilename) {
            count
            AmountNonSubscribers
            AmountSubscribers
          }
          getProfileAndData(slug: $profilename) {
            title
            card1
            card2
            cardImageText1
            cardImageText2
            description
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            image
          }
        }
      `,
			variables () {
				return {
					profilename: this.profilename
				}
			},
			update (data) {
				return data
			},
			result ({ loading, data }) {
				if (data) {
					data.TimeSubcriptionEvolution.forEach(item => {
						this.datacollection.labels.push(item.date)
						this.datacollection.datasets[0].data.push(item.count)
					})
					data.AmountOfTravelsPerNumberOfTravel.forEach(item => {
						this.datacollectionSecondGraph.labels.push(item.count)
						this.datacollectionSecondGraph.datasets[0].data.push(
							item.AmountNonSubscribers
						)
						this.datacollectionSecondGraph.datasets[1].data.push(
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
			profilename: this.$route.params.profilename,

			// Chart manipulation variables to display the graphs and the data
			isDataLoaded: false,
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
						label: 'Abonnés',
						backgroundColor: '#80ccff',
						data: []
					}
				]
			},
			options: {},
			datacollectionSecondGraph: {
				labels: [],
				datasets: [
					{
						label: 'Non Abonnés',
						backgroundColor: '#80ccff',
						data: []
					},
					{
						label: 'Abonnés',
						backgroundColor: '#0066ff',
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
				display: false
			},
			maintainAspectRatio: false,
			layout: {
				padding: {
					right: 30,
					top: 50
				}
			},
			scales: {
				xAxes: [
					{
						ticks: {
							fontSize: 11,
							beginAtZero: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Mois',
							fontColor: '#4710A3',
							fontSize: 20
						}
					}
				],
				yAxes: [
					{
						ticks: {
							fontColor: 'black',
							fontSize: 12,
							beginAtZero: true
						},
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Nombre de souscription à la carte ',
							fontColor: '#4710A3',
							fontSize: 20
						}
					}
				]
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
  justify-content: space-between;
  margin-top: 50px;
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
    position: relative;
    h3 {
      font-size: 30px;
    }
    h4 {
      font-size: 18px;
      color: $purple;
    }
  }
}
.button-offer{
    position: absolute;
    right: -80px;
    bottom: -20px;
    cursor: pointer;
}
</style>
