<template>
  <div>
    <nav class="navbar navbar-expand-sm fixed-top">
      <img :src="notebookImage" width="30" height="30" class="d-inline-block align-top mr-2" alt="logo" />
      <span class="navbar-text font-weight-bold">
          DEAR READER...
      </span>
    </nav>

    <!-- Page Content -->
    <div class="d-flex w-100">
      <div class="w-25 mx-2 px-3">
        <EventForm/>
      </div>
      <div class="w-50 mx-2">
        <TimelineView />
      </div>
      <div class="w-25 mx-2 px-3">
        <CategoryForm/>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-2 fixed-bottom">
      <p class="my-auto">&copy; {{ currentYear }} Dear Diary... All rights reserved</p>
    </footer>
  </div>
</template>

<script>
import notebookImage from '@/assets/pictures/diary.png';
import TimelineView from './components/TimelineView.vue'
import CategoryForm from './components/CategoryForm.vue';
import EventForm from './components/EventForm.vue';

// IMPORT CSS FILES
import './assets/scss/main.scss';
import './assets/scss/fonts.scss';

export default {
  name: 'App',
  components: {
    TimelineView,
    CategoryForm,
    EventForm
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      notebookImage, // Assign the imported image to a data property
    };
  },
};
</script>
