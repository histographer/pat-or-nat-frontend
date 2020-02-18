import Vue from 'vue';
import { Cytomine, User, ProjectCollection } from 'cytomine-client';
import VueLayers from 'vuelayers';
import ZoomifySource from './vuelayers-suppl/zoomify-source';
import RasterSource from './vuelayers-suppl/raster-source';
import TranslateInteraction from './vuelayers-suppl/translate-interaction';
import RotateInteraction from './vuelayers-suppl/rotate-interaction'; // needs css-loader

import App from './App.vue';
import router from './router';
import store from './store';
import 'vuelayers/lib/style.css';


// Setup connection to Cytomine

Vue.config.productionTip = false;

async function connectToCytomineServer() {
  const URL = 'core.digipat.no';
  const cytomine = await new Cytomine(URL);
  // Connect using username and password for now
  const username = 'admin';
  const password = 'bc66a2cb-8f42-45b0-a30d-a2edd983effa';
  await cytomine.login(username, password);

  const user = await User.fetchCurrent();
  const projects = await ProjectCollection.fetchAll();
  return { user, projects };
}
Vue.use(VueLayers);
Vue.use(ZoomifySource);
Vue.use(RasterSource);
Vue.use(TranslateInteraction);
Vue.use(RotateInteraction);

connectToCytomineServer()
  .then(({ user, projects }) => {
    // Add current cytomine related stuff to vuex store
    store.commit('setUser', { user });
    store.commit('setProjects', { projects: projects.array });
  })
  .finally(() => {
    // Create vue instance once we have established a connection to cytomine
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  });
