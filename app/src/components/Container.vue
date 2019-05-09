<template>
    <div class="container-test">
			<AboBarChart v-show="$route.path === '/dashboard'"></AboBarChart>
			<AboLineChart v-show="$route.path === '/line'"></AboLineChart>
			<doughnut v-show="$route.path === '/line'"></doughnut>

    </div>
</template>

<script>
import AboBarChart from '@/components/AboBarChart.vue'
import AboLineChart from '@/components/AboLineChart.vue'
import doughnut from '@/components/charts/AboDoughnut.vue'


export default {
	name: 'container',
	components: {
		AboBarChart,
		AboLineChart,
		doughnut
	}
}
</script>

<style lang="scss" scoped>
.container-test{
	position: absolute;
	top: 65px;
	left: 100px;
	width: calc(100% - 100px);
	overflow-x: hidden;
}
</style>
