<template>
  <div class="timeline-view mt-6 overflow-auto">
    <h3 class="roboto-mono-bold">TIMELINE</h3>
    <v-timeline align="start">
      <v-timeline-item
        v-for="(event, index) in enrichedEvents"
        :key="index"
        :dot-color="event.category.color"
        :icon="event.category.icon"
        fill-dot
      >
        <v-card variant="elevated" hover>
          <v-card-title class="justify-content-start">
            <div class="text-h6 roboto-mono-bold">{{ event.name }}</div>
            <v-badge
              class="my-auto ml-n1 category-badge"
              inline
              :content="event.category.name"
              :color="event.category.color"
            ></v-badge>
          </v-card-title>
          <v-card-subtitle>
            {{ event.startDate.toDateString() }} &rarr;
            {{ event.endDate.toDateString() }}
          </v-card-subtitle>
          <v-card-text>
            <p>{{ event.description }}</p>
            <v-btn
              :color="event.category.color"
              variant="elevated"
              class="mr-2"
              @click="openDetails(event)"
              >More</v-btn
            >
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- Event Details Modal -->
    <v-dialog v-model="detailsDialog" max-width="800px">
      <v-card>
        <v-card-title class="justify-content-start pl-4">
          <div class="roboto-mono-bold text-h5">
            {{ selectedEvent.name }}
          </div>
          <v-badge
            class="my-auto ml-n1 mt-2 category-badge"
            inline
            :content="selectedEvent.category.name"
            :color="selectedEvent.category.color"
          ></v-badge>
        </v-card-title>
        <v-card-subtitle>
          {{ selectedEvent.startDate.toDateString() }} &rarr;
          {{ selectedEvent.endDate.toDateString() }}
        </v-card-subtitle>
        <v-card-text class="pl-4">
          <p><strong>Description</strong></p>
          <p>{{ selectedEvent.description }}</p>
          <p v-if="selectedEvent.image"><strong>Image</strong></p>
          <img v-if="selectedEvent.image" :src="selectedEvent.image" class="card-image" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="detailsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      detailsDialog: false,
      editDialog: false,
      selectedEvent: {},
    };
  },
  computed: {
    ...mapGetters(["allEvents", "allCategories"]),
    enrichedEvents() {
      // Enrich events with category details
      const enriched = this.allEvents.map((event) => {
        const category = this.allCategories.find(
          (cat) => cat.id === event.category
        );
        return {
          ...event,
          category: category
            ? category
            : {
                name: "Unknown",
                color: "gray",
                icon: "",
              },
        };
      });

      // Sort the enriched events chronologically by start date
      return enriched.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
    },
    categories() {
      return this.allCategories;
    },
  },
  methods: {
    openDetails(event) {
      this.selectedEvent = event;
      this.detailsDialog = true;
    },
  },
};
</script>
