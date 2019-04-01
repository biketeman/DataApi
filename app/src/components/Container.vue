<template>
    <div class="container-without-left-bar">
		<lineChart/>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
export default {
	name: 'container',
	components: {
		LineChart
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
