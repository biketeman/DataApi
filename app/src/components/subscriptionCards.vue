<template>
  <div class="profile-cards-container flex">
    <div class="left-container">
        <subscription-card
        :image="require('@/assets/icons/carte_jeune.svg')"
        title="hello"
        :percentageInTotal="10"
        :percentageInTotalcardOwner="10">
        </subscription-card>
        <subscription-card
        :image="require('@/assets/icons/carte_jeune.svg')"
        title="hello"
        :percentageInTotal="10"
        :percentageInTotalcardOwner="10">
        </subscription-card>
    </div>
    <div class="right-container">
        <subscription-card
        :image="require('@/assets/icons/carte_jeune.svg')"
        title="hello"
        :percentageInTotal="10"
        :percentageInTotalcardOwner="10">
        </subscription-card>
        <subscription-card
        :image="require('@/assets/icons/carte_jeune.svg')"
        title="hello"
        :percentageInTotal="10"
        :percentageInTotalcardOwner="10">
        </subscription-card>
    </div>
  </div>
</template>
<script>
import SubscriptionCard from '@/components/reusable/subscriptionCard.vue'

import gql from 'graphql-tag'

export default {
	name: 'SubscriptionCards',
	components: {
		SubscriptionCard
	},
	data () {
		return {}
	},

	mounted () {
	}
}
</script>
<style lang="scss" scoped>
.profile-cards-container {
  .left-container {
    width: 50%;
    padding-right: 25px;
  }
  .right-container {
    padding-left: 25px;
    width: 50%;
  }
}
</style>
