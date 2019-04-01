<template>
    <div class="container-without-left-bar">
        <canvas width="500" height="500" id="myChart" ref="myChart">

        </canvas>
    </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
	extends: Line,
	mixins: [reactiveProp],
	props: ['options', 'chartData'],
	mounted () {
		// this.chartData is created in the mixin.
		// If you want to pass options please create a local options object
		this.renderChart(this.chartData, this.options)
	}
}

</script>

<style lang="scss">
.container-without-left-bar{
	position: absolute;
	top: 65px;
	left: 200px;
	width: calc(100% - 200px);
	overflow-x: hidden;
}
</style>
