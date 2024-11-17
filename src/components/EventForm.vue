<template>
  <v-alert
    class="mt-6"
    closable
    v-if="eventFormError"
    title="Oops..."
    text="You have errors in your form. Please correct them before submitting."
    type="error"
  ></v-alert>
  <v-card class="events-view mt-6">
    <div>
      <h3 class="roboto-mono-bold">EVENTS</h3>
    </div>
    <div class="pt-2">
      <v-form ref="newEventForm" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-12">
            <v-text-field
              label="Title"
              v-model="eventName"
              required
              clearable
              :rules="[requiredField]"
              variant="outlined"
            ></v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <v-date-input
              v-model="startDate"
              label="Start date"
              variant="outlined"
              :rules="[requiredField]"
              prepend-icon=""
              required
            ></v-date-input>
          </div>
          <div class="col-6">
            <v-date-input
              v-model="endDate"
              label="End date"
              variant="outlined"
              :rules="[requiredField, endDateField]"
              prepend-icon=""
              required
            ></v-date-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <v-textarea
              id="eventDescription"
              v-model="eventDescription"
              :rules="[requiredField]"
              clearable
              variant="outlined"
              label="Description"
              required
            ></v-textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <v-autocomplete
              v-model="selectedCategory"
              :rules="[requiredField]"
              label="Category"
              :items="categories"
              item-title="name"
              item-value="id"
              return-object
              variant="outlined"
            ></v-autocomplete>
          </div>
          <div class="col-6">
            <v-text-field
              v-model="image"
              clearable
              variant="outlined"
              label="Image URL"
              placeholder="Enter image URL"
            ></v-text-field>
          </div>
        </div>
        <div>
          <v-btn type="submit" class="mr-2">ADD</v-btn>
          <v-btn @click="generateRandomEvent" class="mr-2">RANDOM</v-btn>
        </div>
      </v-form>
    </div>
  </v-card>

  <!-- Events Display -->
  <div>
    <v-card
      class="events-view mt-4 d-flow"
      :color="event.category.color"
      v-for="event in enrichedEvents"
      :key="event.id"
    >
      <v-card-title class="roboto-mono-bold">{{ event.name }}</v-card-title>
      <v-card-subtitle>
        {{ event.startDate.toDateString() }} &rarr;
        {{ event.endDate.toDateString() }}
      </v-card-subtitle>
      <v-card-text>
        <p><strong>Category:</strong> {{ event.category.name }}</p>
        <p><strong>Description:</strong> {{ event.description }}</p>
        <p><strong>Image:</strong> {{ event.image ? "Yes" : "No" }}</p>
        <v-btn variant="outlined" class="mr-2" @click="editEvent(event)"
          >Edit</v-btn
        >
        <v-btn variant="outlined" class="mr-2" @click="deleteEvent(event.id)"
          >Delete</v-btn
        >
      </v-card-text>
    </v-card>
  </div>

  <!-- Event Edit Modal -->
  <v-dialog
    v-model="editDialog"
    max-width="600px"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title>
        <span class="text-h6 roboto-mono-bold">EDIT EVENT</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="updateEventForm">
          <v-text-field
            v-model="selectedEvent.name"
            :rules="[requiredField]"
            variant="outlined"
            label="Event Title"
            required
          ></v-text-field>
          <v-date-input
            label="Start date"
            variant="outlined"
            :rules="[requiredField]"
            v-model="selectedEvent.startDate"
            prepend-icon=""
            required
          ></v-date-input>
          <v-date-input
            label="End date"
            variant="outlined"
            :rules="[requiredField, endDateField]"
            v-model="selectedEvent.endDate"
            prepend-icon=""
            required
          ></v-date-input>
          <v-textarea
            v-model="selectedEvent.description"
            :rules="[requiredField]"
            variant="outlined"
            label="Description"
            required
          ></v-textarea>
          <v-autocomplete
            v-model="selectedCategory"
            :rules="[requiredField]"
            label="Category"
            :items="categories"
            item-title="name"
            item-value="id"
            return-object
            variant="outlined"
          ></v-autocomplete>
          <v-text-field
            v-model="selectedEvent.image"
            variant="outlined"
            label="Image URL"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="updateEvent">Save</v-btn>
        <v-btn @click="editDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { createRandomEvent } from "../scripts/store.js";

export default {
  data() {
    return {
      eventName: "",
      startDate: null,
      endDate: null,
      eventDescription: "",
      selectedCategory: "",
      image: "",
      editDialog: false,
      selectedEvent: {},
      eventFormError: false,
      eventUpdateFormError: false,
    };
  },
  computed: {
    ...mapGetters(["allCategories", "allEvents"]),
    categories() {
      return this.allCategories;
    },
    events() {
      return this.allEvents;
    },
    enrichedEvents() {
      const enriched = this.allEvents.map((event) => {
        const category = this.allCategories.find(
          (cat) => cat.id === event.category
        );
        return {
          ...event,
          startDate: event.startDate ? new Date(event.startDate) : null,
          endDate: event.endDate ? new Date(event.endDate) : null,
          category: category
            ? category
            : {
                name: "Unknown",
                color: "gray",
                icon: "mdi-help-circle",
              },
        };
      });

      return enriched.sort((a, b) =>
        a.startDate && b.startDate
          ? new Date(b.startDate) - new Date(a.startDate)
          : 0
      );
    },
  },
  methods: {
    ...mapActions(["addEvent", "updateEvent", "deleteEvent"]),
    requiredField(value) {
      return !!value;
    },
    endDateField() {
      return (
        this.endDate >= this.startDate || "End date must be after start date"
      );
    },
    async handleSubmit() {
      const form = this.$refs.newEventForm;
      const form_validation = await form.validate();
      if (form_validation.valid) {
        const eventData = {
          id: uuidv4(),
          name: this.eventName,
          startDate: this.startDate,
          endDate: this.endDate,
          description: this.eventDescription,
          category: this.selectedCategory.id,
          image: this.image,
        };
        this.addEvent(eventData);
        this.resetForm();
        this.eventFormError = false;
      } else {
        this.eventFormError = true;
      }
    },
    async updateEvent() {
      const form = this.$refs.updateEventForm;
      const form_validation = await form.validate();
      if (form_validation.valid) {
        this.selectedEvent.category = this.selectedCategory.id; // Set the category ID
        this.$store.dispatch("updateEvent", this.selectedEvent);
        this.editDialog = false;
      }
    },
    resetForm() {
      const form = this.$refs.newEventForm;
      form.resetValidation(); // Reset validation state
      form.reset();
    },
    generateRandomEvent() {
      const randomEvent = createRandomEvent(this.allCategories);
      // Prefill values in form
      this.eventName = randomEvent.name;
      this.startDate = randomEvent.startDate;
      this.endDate = randomEvent.endDate;
      this.eventDescription = randomEvent.description;
      this.selectedCategory = this.allCategories.find(
          (cat) => cat.id === randomEvent.category
        );
      this.image = randomEvent.image;
    },
    editEvent(enrichedEvent) {
      this.selectedEvent = { ...enrichedEvent }; // Clone to avoid direct mutation
      this.selectedCategory = this.selectedEvent.category; // Set the selected category
      this.editDialog = true;
    },
    deleteEvent(eventId) {
      this.$store.dispatch("deleteEvent", eventId);
    },
  },
};
</script>
