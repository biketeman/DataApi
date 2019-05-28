<template>
    <div class="structure">
        <div id="top-bar" class="flex">
			<router-link to="/">
            <img class="logo-ouisncf" :src="require('@/assets/icons/oui-sncf.svg')" alt="logo">
            </router-link>
			<div class="flex icons-logo-container">
				<img class="icon" :src="require('@/assets/icons/notification.svg')" alt="logo">
				<img class="icon" :src="require('@/assets/icons/settings-work-tool.svg')" alt="logo">

			</div>
		</div>
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
	margin-top: auto;
	margin-bottom: auto;
}
.logo-ouisncf{
	width: 120px;
	line-height: 65px;
    height: 65px;
	margin-left: 20px;
}
.icons-logo-container{
	text-align: right;
	margin-right: 0;
	margin-left: auto;
	padding-right: 80px;
}
.icon{
	width: 35px;
	margin-right: 40px;
}

</style>
