<template>
    <div>
      <Structure/>
      <div class="container-content">
      </div>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'

export default {
	name: 'dashboard',
	components: {
		Structure
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
</style>
