<template>
    <div>
      <Structure>
      </Structure>
      <div class="container-content">
        <div class="home-headline">
          <h2>Vue générale sur les abonements et les cartes</h2>
          <div class="settings">
            <img class="small-icon" src="../assets/icons/settings-work-tool.svg">
            <Button color="white" message="30 derniers jours"/>
          </div>
        </div>
        <EvolutionCards/>
        <div class="flex settings">
          <h2 class="margin">Segmentation par type de carte ou d'abonement</h2>
          <Button class="centered" color="purple" message="+ Ajouter un type de voyageur"/>
        </div>
        <ProfileCards/>
        <!--lol-->
      </div>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Button from '@/components/reusable/button.vue'
import EvolutionCards from '@/components/EvolutionCards.vue'
import ProfileCards from '@/components/profileCards.vue'

export default {
	name: 'dashboard',
	components: {
		Structure,
		Button,
		EvolutionCards,
		ProfileCards
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
.centered{
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: 0;
}
</style>
