<template>
  <div v-if="isDataLoaded">
    <Structure/>
    <div class="container-content">
      <div class="home-headline">
        <h2>Vue générale sur la souscription à la carte jeune pour ce type de voyageur</h2>
        <div class="settings">
          <Button color="white" message="Année passée"/>
        </div>
      </div>
      <div class="global-overview">
        <analyse-card-reccomanded
          cardImageText1="carte jeune"
          cardImageText2="carte abo frequence"
          :cardImage1="require('@/assets/icons/carte_jeune.svg')"
          :cardImage2="require('@/assets/icons/abo_frequence.svg')"
        />
        <analyse-card title="part dans le nombre total de voyageurs" :percentage="12"/>
        <analyse-card
          title="part de cette catégorie ayant un abonement ou une carte"
          :percentage="53"
        />
      </div>
      <h2 class="slight-margin">Date de souscription à la carte({{profilename}})</h2>
      <div class="time-evolution">
        <div v-if="data.TimeSubcriptionEvolution" class="left">
          <div class="graph">
            <bar-chart-evolution :chart-data="datacollection" :options="this.options"></bar-chart-evolution>
          </div>
        </div>
      </div>
      <div class="time-evolution">
        <div v-if="data.TimeSubcriptionEvolution" class="left">
          <div class="graph">
            <bar-chart-evolution :chart-data="datacollectionSecondGraph" :options="this.optionsSecondGraph"></bar-chart-evolution>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import Button from '@/components/reusable/button.vue'
import analyseCard from '@/components/reusable/analyseCardPercentage.vue'
import analyseCardReccomanded from '@/components/reusable/analyseCardReccomanded.vue'
import BarChartEvolution from '@/components/charts/BarChart.js'
import gql from 'graphql-tag'

export default {
	name: 'dashboard',
	components: {
		Structure,
		analyseCard,
		Button,
		analyseCardReccomanded,
		BarChartEvolution
	},
	apollo: {
		data: {
			query: gql`
        query {
          TimeSubcriptionEvolution {
            date
            count
          }
          AmountOfTravelsPerNumberOfTravel{
              count
              AmountNonSubscribers
              AmountSubscribers
          }
        }
      `,
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
                        this.datacollectionSecondGraph.datasets[0].data.push(item.AmountNonSubscribers)
						this.datacollectionSecondGraph.datasets[1].data.push(item.AmountSubscribers)
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
			isDataLoaded: false,
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

			options: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						right: 30
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
								labelString: 'Semaine',
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
            },

            datacollectionSecondGraph: {
				labels: [],
				datasets: [
					{
						label: 'Abonnés',
						backgroundColor: '#80ccff',
						data: []
                    },
                    {
						label: 'Non Abonnés',
						backgroundColor: '#0066ff',
						data: []
					}
				]
            },

            optionsSecondGraph: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						right: 30
					}
				},
				scales: {
					xAxes: [
						{
                            stacked:true,
							ticks: {
								fontSize: 11,
								beginAtZero: true
							},
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Nombres de voyages effectué',
								fontColor: '#4710A3',
								fontSize: 20
							}
						}
					],
					yAxes: [
						{
                            stacked:true,
							ticks: {
								fontColor: 'black',
								fontSize: 12,
								beginAtZero: true
							},
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Nombre de voyageurs ayant effectué X voyages ',
								fontColor: '#4710A3',
								fontSize: 20
							}
						}
					]
				}
            },
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
.global-overview {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.slight-margin {
  margin-top: 50px;
  margin-bottom: 50px;
}

.time-evolution {
  background-color: $white;
  padding: 25px;
  margin-bottom: 50px;
  .left {
    width: 60%;
    border-right: $border;
  }
}
.graph {
  width: 100%;
}
</style>
