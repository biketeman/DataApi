<template>
  <div class="cards-container">
    <EvolutionCard title="Abonement Week-end" :image="require('@/assets/logo.png')" number="6"/>
    <EvolutionCard title="Abonnement Senior+" :image="require('@/assets/logo.png')" number="6"/>
    <EvolutionCard title="Abonnement Enfant +" :image="require('@/assets/logo.png')" number="6"/>
    <EvolutionCard title="Carte jeune" :image="require('@/assets/logo.png')" number="6"/>
    <EvolutionCard title="Evolution du nombre d'abonnés" :image="require('@/assets/logo.png')" number="6"/>
  </div>
</template>

<script>
import EvolutionCard from '@/components/reusable/evolutionCard.vue'
export default {
	name: 'dashboard',
	components: {
		EvolutionCard
	}
}
</script>
<style>
.cards-container{
  justify-content: space-between;
  display: flex;
  width: 100%;
  margin-top: 50px;
}
</style>
