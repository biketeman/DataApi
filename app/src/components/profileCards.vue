<template>
    <div class="profile-cards-container flex">
        <div class="left-container">
            <profileCard :image="require('@/assets/logo.png')" :cardImage1="require('@/assets/icons/carte_jeune.svg')" :cardImage2="require('@/assets/icons/abo_fréquence.svg')" cardImageText1="carte jeune" cardImageText2="Abo.fréquence" title="Jeune" definition="18- 25 ans" :numberleft=10 :numberright=20>
            </profileCard>
            <profileCard :image="require('@/assets/logo.png')" cardImage1="empty" :cardImage2="require('@/assets/icons/abo_fréquence.svg')" cardImageText2="Abo.fréquence" title="PRO" definition="2 A/R par mois" :numberleft=10 :numberright=20>
            </profileCard>
        </div>
        <div class="right-container">
            <profileCard :image="require('@/assets/logo.png')" :cardImage1="require('@/assets/icons/carte_senior.svg')" :cardImage2="require('@/assets/icons/abo_fréquence.svg')" cardImageText1="Carte Sénior" cardImageText2="Abo.fréquence" title="Séniors" definition="+ 65ans" :numberleft=10 :numberright=20>
            </profileCard>
            <profileCard :image="require('@/assets/logo.png')" cardImage1="empty" :cardImage2="require('@/assets/icons/abo_weekend.svg')" cardImageText2="Abo.Week End" title="Séniors" definition="+ 65ans" :numberleft=10 :numberright=20>
            </profileCard>
        </div>

    </div>
</template>
<script>
import profileCard from '@/components/reusable/profileCard.vue'

export default {
	name: 'dashboard',
	components: {
		profileCard
	}
}
</script>
<style lang="scss" scoped>
.profile-cards-container{
    .left-container{
        width: 50%;
        padding-right: 25px;
    }
    .right-container{
        padding-left: 25px;
        width: 50%;
    }
}
</style>
