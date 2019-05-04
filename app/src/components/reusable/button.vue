<template>
	<div class="button" :class="color">
		{{message}}
	</div>
</template>

<script>
export default {
	name: 'Button',
	props: {
		message: String,
		color: String
	}
}
</script>

<style lang="scss" scoped>
.button{
    max-height: 30px;
    font-size: 14px;
    padding-top: 0.5%;
    padding-bottom: 0.5%;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    text-decoration: none;
    line-height: 30px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    width: max-content;
}
.purple {
	background-color: $purple;
	color: $white;
}
.white{
	background-color: $white;
    color: $purple;
    font-weight: 600;
}
</style>
