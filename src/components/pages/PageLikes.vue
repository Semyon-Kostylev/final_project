<template>
  <profile-main>
    <base-likes />
  </profile-main>
</template>

<script>
import ProfileMain from '@/components/ProfileMain.vue';
import BaseLikes from '@/components/BaseLikes.vue';

export default {
  components: {
    ProfileMain,
    BaseLikes,
  },
};
</script>
