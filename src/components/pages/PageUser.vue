<template>
  <profile-main>
    <edit-user />
    <router-link :to="{ name: 'profile-password' }">Изменить пароль</router-link>
  </profile-main>
</template>

<script>
import ProfileMain from '@/components/ProfileMain.vue';
import EditUser from '@/components/edit/EditUser.vue';

export default {
  components: {
    ProfileMain,
    EditUser,
  },
};
</script>
