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
        <div class="cards-container">
          <EvolutionCard title="Abonement Week-end" :image="require('@/assets/logo.png')" number="6"/>
          <EvolutionCard title="Abonnement Senior+" :image="require('@/assets/logo.png')" number="6"/>
          <EvolutionCard title="Abonnement Enfant +" :image="require('@/assets/logo.png')" number="6"/>
          <EvolutionCard title="Carte jeune" :image="require('@/assets/logo.png')" number="6"/>
          <EvolutionCard title="Evolution du nombre d'abonnés" :image="require('@/assets/logo.png')" number="6"/>
        </div>
        <Button color="purple" message="hello"/>
      </div>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Button from '@/components/reusable/button.vue'
import EvolutionCard from '@/components/reusable/evolutionCard.vue'


export default {
	name: 'dashboard',
	components: {
		Structure,
    Button,
    EvolutionCard
	}
}
</script>

<style lang="scss" scoped>
.cards-container{
  justify-content: space-between;
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%
}
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
</style>
