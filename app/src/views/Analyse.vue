<template>
    <div>
      <Structure/>
      <div class="container-content">
        <div class="home-headline">
          <h2>Vue générale sur la souscription à la carte jeune pour ce type de voyageur</h2>
          <div class="settings">
            <Button color="white" message="30 derniers jours"/>
          </div>
        </div>
        <div class="global-overview">
        </div>
      </div>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Button from '@/components/reusable/button.vue'
import analyseCard from '@/components/reusable/analyseCard.vue'

export default {
	name: 'dashboard',
	components: {
        Structure,
        analyseCard,
	}
}
</script>

<style lang="scss" scoped>

.container-content {
  margin-top: 65px;
	padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
  max-width: 100%;
}
.home-headline{
  display: flex;
  .settings{
    margin-left: auto;
    margin-right: 0;
    display: flex;
    justify-content: center;

    img{
      margin-right: 20px;
      padding-top: auto;
      padding-bottom: auto
    }
}
.global-overview{
    display: flex;
    justify-content: space-around;
}
}
</style>
