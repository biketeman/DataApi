<template>
  <div class="profile-cards-container flex">
    <ul class="left-container">
      <li v-for="(item, index) in data.subscriptionCards" :key="index">
        <subscription-card
          v-if="data"
          :title="item.title"
          :image="require('@/assets/icons/carte_jeune.svg')"
          :percentageInTotal="item.percentageInTotal"
          :percentageInTotalcardOwner="item.percentageInTotalcardOwner"
        />
      </li>
    </ul>
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
	apollo: {
		data: {
			query: gql`
        query {
            subscriptionCards {
              percentageInTotal
              percentageInTotalcardOwner
              title
            }
        }
      `,
			update (data) {
				return data
			},
			error (err) {
				console.log('Erreur Apollo', err)
			}
		}
	},
	mounted () {}
}
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  width: 100%;
  padding: 0%;
  flex-wrap: wrap;
  > * {
    flex: 1 1 600px;
    margin: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
