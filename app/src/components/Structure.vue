<template>
    <div class="structure">
        <div id="left-bar"></div>
        <div id="top-bar"></div>
    </div>
</template>

<script>
export default {
	name: 'structure'
}
</script>

<style lang="scss">
body {
	-webkit-font-smoothing: antialiased;
	overflow-x: hidden;
	width: 100vw!important;
	padding: 0;
	margin: 0;
	background-color: #F7F7F7;
}

html {
	-webkit-font-smoothing: antialiased;
	overflow-x: hidden;
	width: 100vw!important;
	padding: 0;
	margin: 0;
	background-color: #F7F7F7;
}

#top-bar {
	left: 200px;
	position: fixed;
	top: 0;
	z-index: 150;
	width: 100vw;
	background-color: white;
	height: 65px;
	-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .05);
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .05);
}

#left-bar {
	z-index: 2;
	width: 200px;
	position: fixed;
	height: 100vh!important;
	background-color: #3d474f;
}
</style>
