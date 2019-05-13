<template>
    <div class="analyse-card">
        <div class="left-container">
            <h4>{{title}}</h4>
            <h3>{{percentage}}%</h3>
        </div>
        <div class="right-container">
            <doughnut class="doughnut"/>
        </div>
    </div>
</template>

<script>
import doughnut from '@/components/charts/AboDoughnut.vue'

export default {
	components: {
		doughnut
	},
	props: {
		percentage: Number,
		title: String
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
						data: [15, 100],
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
	}
}
</script>

<style lang="scss" scoped>
.analyse-card{
    background-color: $white;
    display: flex;
    padding: 25px;
    width: calc(30% - 40px);
}
h4{
    color: $purple;
    font-size: 14px;
}
h3{
    color: black;
    font-size: 26px;
}
.left-container{
    width: 50%;
	text-align: center;
}
.right-container{
    width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.doughnut{
    width: 90px;
	margin-left: auto;
	margin-right: auto;
}
</style>
