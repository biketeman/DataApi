<template>
    <div class="profile-cards-container flex">
        <div class="left-container">
            <profileCard
                v-if="data"
                :image="require('@/assets/icons/'+ data.getProfileAndDataJeune.image + '.svg')"
                :card1="require('@/assets/icons/'+ data.getProfileAndDataJeune.card1 + '.svg')"
                :card2="require('@/assets/icons/'+ data.getProfileAndDataJeune.card2 + '.svg')"
                :cardImageText1="data.getProfileAndDataJeune.cardImageText1"
                :cardImageText2="data.getProfileAndDataJeune.cardImageText2"
                :title="data.getProfileAndDataJeune.title"
                :description="data.getProfileAndDataJeune.description"
                :percentageNoneRenewed="data.getProfileAndDataJeune.percentageNoneRenewed"
                :percentageInTotal="data.getProfileAndDataJeune.percentageInTotal"
                :percentageCardOwner="data.getProfileAndDataJeune.percentageCardOwner"
            />
            <profileCard
                v-if="data"
                :image="require('@/assets/icons/'+ data.getProfileAndDataPro.image + '.svg')"
                card1="empty"
                :card2="require('@/assets/icons/'+ data.getProfileAndDataPro.card2 + '.svg')"
                :cardImageText1="data.getProfileAndDataPro.cardImageText1"
                :cardImageText2="data.getProfileAndDataPro.cardImageText2"
                :title="data.getProfileAndDataPro.title"
                :description="data.getProfileAndDataPro.description"
                :percentageNoneRenewed="data.getProfileAndDataPro.percentageNoneRenewed"
                :percentageInTotal="data.getProfileAndDataPro.percentageInTotal"
                :percentageCardOwner="data.getProfileAndDataPro.percentageCardOwner"
            />
        </div>
        <div class="right-container">
            <profileCard
                v-if="data"
                :image="require('@/assets/icons/'+ data.getProfileAndDataSenior.image + '.svg')"
                :card1="require('@/assets/icons/'+ data.getProfileAndDataSenior.card1 + '.svg')"
                :card2="require('@/assets/icons/'+ data.getProfileAndDataSenior.card2 + '.svg')"
                :cardImageText1="data.getProfileAndDataSenior.cardImageText1"
                :cardImageText2="data.getProfileAndDataSenior.cardImageText2"
                :title="data.getProfileAndDataSenior.title"
                :description="data.getProfileAndDataSenior.description"
                :percentageNoneRenewed="data.getProfileAndDataSenior.percentageNoneRenewed"
                :percentageInTotal="data.getProfileAndDataSenior.percentageInTotal"
                :percentageCardOwner="data.getProfileAndDataSenior.percentageCardOwner"
            />
            <profileCard
                v-if="data"
                :image="require('@/assets/icons/'+ data.getProfileAndDataWeekEnd.image + '.svg')"
                card1="empty"
                :card2="require('@/assets/icons/'+ data.getProfileAndDataWeekEnd.card2 + '.svg')"
                :cardImageText1="data.getProfileAndDataWeekEnd.cardImageText1"
                :cardImageText2="data.getProfileAndDataWeekEnd.cardImageText2"
                :title="data.getProfileAndDataWeekEnd.title"
                :description="data.getProfileAndDataWeekEnd.description"
                :percentageNoneRenewed="data.getProfileAndDataWeekEnd.percentageNoneRenewed"
                :percentageInTotal="data.getProfileAndDataWeekEnd.percentageInTotal"
                :percentageCardOwner="data.getProfileAndDataWeekEnd.percentageCardOwner"
            />
        </div>
    </div>
</template>
<script>
import profileCard from '@/components/reusable/profileCard.vue'
// import axios from 'axios'
//import { mapGetters, mapActions } from 'vuex'
import gql from 'graphql-tag'

export default {
	name: 'profileCards',
	components: {
		profileCard
	},
	data () {
		return {
		}
	},
	apollo: {
		data: {
            query: gql` 
                query {
                    getProfileAndDataJeune {
                        percentageInTotal
                        percentageCardOwner
                        percentageNoneRenewed
                        description
                        title
                        image
                        card1
                        card2
                        cardImageText1
                        cardImageText2
                    }
                    getProfileAndDataSenior {
                        percentageInTotal
                        percentageCardOwner
                        percentageNoneRenewed
                        description
                        title
                        image
                        card1
                        card2
                        cardImageText1
                        cardImageText2
                    }
                    getProfileAndDataWeekEnd {
                        percentageInTotal
                        percentageCardOwner
                        percentageNoneRenewed
                        description
                        title
                        image
                        card1
                        card2
                        cardImageText1
                        cardImageText2
                    }
                    getProfileAndDataPro {
                        percentageInTotal
                        percentageCardOwner
                        percentageNoneRenewed
                        description
                        title
                        image
                        card1
                        card2
                        cardImageText1
                        cardImageText2
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
		// console.log(apollo)
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
