<template>
    <div class="analyse-card">
        <div class="left-container">
            <h4>{{title}}</h4>
            <h3>{{percentage}}</h3>
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
        title: String,
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
}
</script>

<style lang="scss" scoped>
.analyse-card{
    background-color: $white;
    width: 33.3%;
    display: flex;
    padding: 25px;
}
h4{
    color: $purple;
    font-size: 16px;
}
h3{
    color: black;
    font-size: 22px;
}
.left-container{
    width: 40%;
}
.right-container{
    width: 40%;
}
.doughnut{
    width: 300px;
}
</style>
