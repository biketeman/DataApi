<template>
    <div class="structure">
        <div id="left-bar">
			<div class="icon-container">
				<router-link to="/"> <img class="left-icon" src="../assets/icons/bell.svg" alt="icon"></router-link>
				<router-link to="/"> <img class="left-icon" src="../assets/icons/bell.svg" alt="icon"></router-link>
				<router-link to="/"> <img class="left-icon" src="../assets/icons/bell.svg" alt="icon"></router-link>
			</div>
		</div>
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
	left: 100px;
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
	width: 100px;
	position: fixed;
	display: flex;
	height: 100vh!important;
	background-color: #3c3c3c;
}
.icon-container{
	width:100%;
	margin:auto;
	display: flex;
	flex-direction: column
}
.left-icon{
	width: 40px;
	margin-left: auto;
	margin-right:auto;
	margin-top:40px
}
</style>
