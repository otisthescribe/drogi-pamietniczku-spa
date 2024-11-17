<template>
  <v-alert
    class="mt-6"
    closable
    v-if="categoryFormError"
    title="Oops..."
    text="You have errors in your form. Please correct them before submitting."
    type="error"
  ></v-alert>
  <v-card class="category-view mt-6">
    <div>
      <h3 class="roboto-mono-bold">CATEGORIES</h3>
    </div>
    <div class="pt-2">
      <v-form ref="newCategoryForm" @submit.prevent="submitCategory">
        <div class="row">
          <div class="col-6">
            <v-text-field
              label="Title"
              v-model="categoryName"
              required
              clearable
              :rules="[requiredField]"
              variant="outlined"
            ></v-text-field>
          </div>
          <div class="col-6">
            <v-text-field v-model="iconPath" label="Icon" variant="outlined">
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <v-color-picker
              hide-canvas
              hide-inputs
              v-model="categoryColor"
              mode="hex"
              required
              width="100%"
              :rules="[requiredField]"
            ></v-color-picker>
          </div>
        </div>
        <div class="mt-6">
          <v-btn type="submit" class="mr-2">ADD</v-btn>
          <v-btn class="mr-2" @click="generateRandomCategory"> RANDOM </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
  <!-- Categories Display -->
  <div>
    <v-card
      :color="category.color"
      class="category-view mt-4 d-flow"
      v-for="category in categories"
      :key="category.id"
    >
      <v-card-title class="roboto-mono-bold d-flex align-center">
        <span class="mr-3 my-auto">{{ category.name }}</span>
        <v-icon class="my-auto" :icon="category.icon" size="small"></v-icon>
      </v-card-title>
      <v-card-text>
        <v-btn variant="outlined" class="mr-2" @click="editCategory(category)"
          >Edit</v-btn
        >
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="deleteCategory(category.id)"
          >Delete</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
  <v-dialog
    v-model="editDialog"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <v-card :color="selectedCategory.color">
      <v-card-title>
        <span class="text-h6 roboto-mono-bold">EDIT CATEGORY</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="updateCategoryForm">
          <v-text-field
            v-model="selectedCategory.name"
            :rules="[requiredField]"
            label="Category Name"
            required
            variant="outlined"
          ></v-text-field>
          <div class="row">
            <div class="col-8">
              <v-text-field
                v-model="selectedCategory.icon"
                label="Icon URL"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="col-4">
              <v-icon
                class="mt-3"
                :icon="selectedCategory.icon"
                size="large"
              ></v-icon>
            </div>
          </div>
          <v-color-picker
            hide-inputs
            v-model="selectedCategory.color"
            :rules="[requiredField]"
            label="Category Color"
            mode="hex"
            required
          ></v-color-picker>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="updateCategory">Save</v-btn>
        <v-btn @click="editDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { generateRandomColor } from "../scripts/utils";
import { createRandomCategory } from "../scripts/store.js";

export default {
  data() {
    return {
      categoryName: "",
      categoryColor: generateRandomColor(), // Start with a random color
      iconPath: "",
      editDialog: false,
      selectedCategory: {},
    };
  },
  computed: {
    ...mapState(["categories"]), // Assuming categories are stored in Vuex
  },
  created() {
    this.categoryColor = generateRandomColor(); // Set a random color on creation
  },
  methods: {
    ...mapActions(["addCategory", "deleteCategory", "updateCategory", "randomCategory"]),
    requiredField(value) {
      return !!value;
    },
    async submitCategory() {
      const form = this.$refs.newCategoryForm;
      const form_validation = await form.validate();
      if (form_validation.valid) {
        const categoryData = {
          id: uuidv4(),
          name: this.categoryName.trim(),
          color: this.categoryColor,
          icon: this.iconPath.trim(),
        };
        this.addCategory(categoryData);
        this.resetForm();
        this.categoryFormError = false;
      } else {
        this.categoryFormError = true;
      }
    },
    async updateCategory() {
      const form = this.$refs.updateCategoryForm;
      const form_validation = await form.validate();
      if (form_validation.valid) {
        this.$store.dispatch("updateCategory", this.selectedCategory);
        this.editDialog = false;
      }
    },
    resetForm() {
      const form = this.$refs.newCategoryForm;
      form.resetValidation(); // Reset validation state
      form.reset();
      this.categoryColor = generateRandomColor(); // Generate a new random color
    },
    generateRandomCategory() {
      const randomCategory = createRandomCategory();
      // Fill up values in form
      this.categoryName = randomCategory.name;
      this.categoryColor = randomCategory.color;
      this.iconPath = randomCategory.icon;
    },
    editCategory(category) {
      this.selectedCategory = { ...category };
      this.editDialog = true;
    },
    deleteCategory(categoryId) {
      this.$store.dispatch("deleteCategory", categoryId);
    },
  },
};
</script>
