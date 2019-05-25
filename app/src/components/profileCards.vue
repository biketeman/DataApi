<template>
  <div class="profile-cards-container flex" v-if="data">
    <profileCard
        v-for="(profile_data, index) in data.getProfileAndData"
        :key="index"
        :image="require('@/assets/icons/'+ profile_data.image + '.svg')"
        :card1="profile_data.card1"
        :card2="profile_data.card2"
        :cardImageText1="profile_data.cardImageText1"
        :cardImageText2="profile_data.cardImageText2"
        :title="profile_data.title"
        :description="profile_data.description"
        :percentageNoneRenewed="profile_data.percentageNoneRenewed"
        :percentageInTotal="profile_data.percentageInTotal"
        :percentageCardOwner="profile_data.percentageCardOwner"
      />
  </div>
</template>
<script>
import profileCard from '@/components/reusable/profileCard.vue'

import gql from 'graphql-tag'

export default {
	name: 'profileCards',
	components: {
		profileCard
	},
	data () {
		return {}
	},
	apollo: {
		data: {
			query: gql`
        query {
            getProfileAndData{
            title
            card1
            card2
            cardImageText1
            cardImageText2
            description
            percentageInTotal
            percentageCardOwner
            percentageNoneRenewed
            image
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
	mounted () {
	}
}
</script>
<style lang="scss" scoped>
.profile-cards-container {
    display: flex;
    flex-wrap: wrap;
    div{
        flex: 1 1 600px;
        margin: 20px;
        margin-top: 0px;
        margin-bottom: 40px;
    }
}
</style>
