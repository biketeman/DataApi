<template>
    <div class="analyse-card">
        <div class="left-container">
            <h4>{{title}}</h4>
            <h3>{{percentage}}%</h3>
        </div>
    </div>
</template>

<script>

export default {
	components: {
	},
	props: ['percentage', 'title']
}
</script>

<style lang="scss" scoped>
.analyse-card{
    background-color: $white;
    display: flex;
    padding: 25px;
    width: calc(30% - 40px);
}
h4{
    color: $purple;
    font-size: 14px;
}
h3{
    color: black;
    font-size: 30px;
}
.left-container{
    width: 100%;
	text-align: center;
}
.right-container{
    width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.doughnut{
    width: 90px;
	margin-left: auto;
	margin-right: auto;
}
</style>
