<template>
    <div class="container-without-left-bar">
			<AboBarChart v-show="$route.path === '/dashboard'"></AboBarChart>
			<AboLineChart v-show="$route.path === '/line'"></AboLineChart>
    </div>
</template>

<script>
import AboBarChart from '@/components/AboBarChart.vue'
import AboLineChart from '@/components/AboLineChart.vue'

export default {
	name: 'container',
	components: {
		AboBarChart,
		AboLineChart
	}
}
</script>

<style lang="scss">
.container-without-left-bar{
	position: absolute;
	top: 65px;
	left: 100px;
	width: calc(100% - 100px);
	overflow-x: hidden;
}
</style>
