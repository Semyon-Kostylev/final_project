<template>
  <profile-main>
    <publications-all />
  </profile-main>
</template>

<script>
import ProfileMain from '@/components/ProfileMain.vue';
import PublicationsAll from '@/components/publications/PublicationsAll.vue';

export default {
  components: {
    ProfileMain,
    PublicationsAll,
  },
};
</script>
