import { Store } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomColor } from './utils';

// Helper function to get a random element from an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to generate a random date within a range
function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
}

// Arrays of possible event titles, descriptions, and images
const eventTitles = [
  'Concert in the Park',
  'Tech Conference 2024',
  'Art Exhibition Opening',
  'Community Sports Day',
  'Coding Bootcamp',
  'Food Festival',
  'Book Fair',
  'Yoga Retreat',
  'Film Screening Night',
  'Marathon Race',
  'Charity Gala Night',
  'Photography Workshop',
  'Wildlife Safari Tour',
  'Startup Pitch Contest',
  'Stand-Up Comedy Show',
  'Science Fair Expo',
  'Pet Adoption Day',
  'Beach Cleanup Drive',
  'Live Jazz Evening',
  'DIY Craft Workshop',
  'Holiday Lights Parade',
  'Open Mic Poetry Night',
  'Sustainable Living Expo',
  'Classic Car Show',
  'Cultural Dance Showcase',
];


const eventDescriptions = [
  'Enjoy a night of music under the stars with local bands.',
  'Join industry leaders for a day of networking and learning.',
  'Explore the latest works from emerging artists.',
  'Participate in various sports and activities for all ages.',
  'Learn to code in a week with hands-on projects.',
  'Savor dishes from around the world in this gastronomic celebration.',
  'Discover the latest books and meet your favorite authors.',
  'Relax and rejuvenate with guided yoga sessions in nature.',
  'Watch classic and indie films with fellow movie enthusiasts.',
  'Challenge yourself and support a good cause in this annual race.',
  'Dress up and join a night of giving back at the gala.',
  'Enhance your photography skills with hands-on training.',
  'Embark on an adventure to observe stunning wildlife in their habitat.',
  'Pitch your startup idea to investors and industry experts.',
  'Laugh the night away with hilarious performances from top comedians.',
  'Step into history with reenactments of pivotal moments from the past.',
  'Dive into the wonders of science with hands-on exhibits and experiments.',
  'Experience the thrill of cutting-edge VR games in a competitive setting.',
  'Meet adorable pets looking for their forever homes.',
  'Help preserve the environment with a community beach cleanup.',
  'Shop for fresh produce and handmade crafts at this local market.',
  'Sway to the soothing sounds of live jazz under a starlit sky.',
  'Take on challenging trails and breathtaking views on this mountain biking adventure.',
  'Learn about the cosmos from expert astronomers at this stargazing event.',
  'Enjoy the premiere of a gripping new play by local talent.',
  'Channel your creativity in this interactive DIY crafting session.',
  'Conquer nature’s obstacles in this outdoor adventure challenge.',
  'Marvel at colorful street art and graffiti by talented urban artists.',
  'Celebrate the season with a dazzling parade of lights and holiday cheer.',
  'Share your words and listen to others at this inspiring open mic poetry night.',
  'Achieve inner peace with a day of guided meditation and wellness activities.',
  'Cheer for your favorite teams in this high-stakes esports finale.',
  'Witness strategic brilliance at this exhibition match by a chess grandmaster.',
  'Learn practical tips for sustainable living at this community event.',
  'Taste fine wines and tour a scenic vineyard with expert sommeliers.',
  'Admire classic cars and chat with their passionate owners.',
  'Experience the rich culture of diverse communities through vibrant dance performances.',
  'Discover the secrets of the universe at this engaging astronomy night.',
  'Embark on a culinary journey with flavors from every corner of the world.',
  'Be amazed by intricate ice sculptures crafted by talented artists.',
];


const eventImages = [
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  'https://images.unsplash.com/photo-1503428593586-e225b39bddfe',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
  'https://images.unsplash.com/photo-1488229297570-58520851e868',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9', 
  'https://images.unsplash.com/photo-1464983953574-0892a716854b', 
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', 
  'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
  'https://images.unsplash.com/photo-1522199755839-a2bacb67c546',
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
];


// Arrays of possible category names and icons
const categoryNamesAndIcons = [
  { name: 'Music', icon: 'mdi-music' },
  { name: 'Sports', icon: 'mdi-basketball' },
  { name: 'Art', icon: 'mdi-palette' },
  { name: 'Technology', icon: 'mdi-laptop' },
  { name: 'Education', icon: 'mdi-school' },
  { name: 'Food', icon: 'mdi-food' },
  { name: 'Photography', icon: 'mdi-camera' },
  { name: 'Nature', icon: 'mdi-tree' },
  { name: 'Comedy', icon: 'mdi-emoticon-lol' },
  { name: 'Charity', icon: 'mdi-heart' },
  { name: 'Books', icon: 'mdi-book-open' },
  { name: 'Fitness', icon: 'mdi-weight-lifter' },
];

// Helper function to create a random category
function createRandomCategory() {
  const { name, icon } = getRandomElement(categoryNamesAndIcons);
  return {
    id: uuidv4(),
    name,
    color: generateRandomColor(),
    icon,
  };
}

// Helper function to create a random event
function createRandomEvent(categories) {
  const startDate = getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)); // Random date in 2024
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3)); // Random duration between 1-3 days

  return {
    id: uuidv4(),
    name: getRandomElement(eventTitles),
    startDate,
    endDate,
    description: getRandomElement(eventDescriptions),
    category: getRandomElement(categories).id,
    image: getRandomElement(eventImages),
  };
}

const store = new Store({
  state: {
    categories: [],
    events: []
  },
  mutations: {
    addCategory(state, category) {
      state.categories.push(category);
    },
    addEvent(state, event) {
      state.events.push(event);
    },
    assignRandomCategories(state) {
      state.events.forEach(event => {
        const randomIndex = Math.floor(Math.random() * state.categories.length);
        event.category = state.categories[randomIndex].id;
      });
    },
    updateEvent(state, updatedEvent) {
      const index = state.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events.splice(index, 1, updatedEvent);
      }
    },
    deleteEvent(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId);
    },
    updateCategory(state, updatedCategory) {
      const index = state.categories.findIndex(category => category.id === updatedCategory.id);
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
    deleteCategory(state, categoryId) {
      state.categories = state.categories.filter(category => category.id !== categoryId);
    }
  },
  actions: {
    addCategory({ commit }, category) {
      commit('addCategory', category);
    },
    addEvent({ commit }, event) {
      commit('addEvent', event);
    },
    initializeStore({ commit, state }) {
      for (let i = 0; i < 5; i++) {
        commit('addCategory', createRandomCategory());
      }
      for (let i = 0; i < 5; i++) {
        commit('addEvent', createRandomEvent(state.categories));
      }
    },
    updateEvent({ commit }, updatedEvent) {
      commit('updateEvent', updatedEvent);
    },
    deleteEvent({ commit }, eventId) {
      commit('deleteEvent', eventId);
    },
    updateCategory({ commit }, updatedCategory) {
      commit('updateCategory', updatedCategory);
    },
    deleteCategory({ commit }, categoryId) {
      commit('deleteCategory', categoryId);
    },
  },
  getters: {
    allCategories: (state) => state.categories,
    allEvents: (state) => state.events
  },
});

// Initialize the store to assign random categories to events
store.dispatch('initializeStore');

export default store;
export { store, createRandomEvent, createRandomCategory };
