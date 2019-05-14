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
            <analyse-card-reccomanded cardImageText1="carte jeune" cardImageText2="carte abo frequence" :cardImage1="require('@/assets/icons/carte_jeune.svg')" :cardImage2="require('@/assets/icons/abo_frequence.svg')"/>
            <analyse-card title="part dans le nombre total de voyageurs" :percentage="12"/>
            <analyse-card title="part de cette catégorie ayant un abonement ou une carte" :percentage="53"/>
        </div>
      </div>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Button from '@/components/reusable/button.vue'
import analyseCard from '@/components/reusable/analyseCardPercentage.vue'
import analyseCardReccomanded from '@/components/reusable/analyseCardReccomanded.vue'

export default {
	name: 'dashboard',
	components: {
		Structure,
		analyseCard,
		Button,
		analyseCardReccomanded
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
}
.global-overview{
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
}
</style>
