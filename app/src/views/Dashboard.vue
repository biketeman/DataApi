<template>
    <div>
        <structure/>
        <container/>
    </div>
</template>

<script>
import Structure from '@/components/Structure.vue'
import Container from '@/components/Container.vue'

export default {
	name: 'dashboard',
	components: {
		Structure,
		Container
	}
}
</script>
