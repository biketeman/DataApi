<template>
    <div class="structure">
        <div id="top-bar"></div>
    </div>
</template>

<script>
export default {
	name: 'structure'
}
</script>

<style lang="scss" >
#top-bar {
	left: 0px;
	position: fixed;
	top: 0;
	z-index: 150;
	width: 100vw;
	background-color: white;
	height: 65px;
	-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .05);
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .05);
}
</style>
