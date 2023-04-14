<script setup lang="ts">
  import {useDrawerStore} from "../store/drawer";
  const store = useDrawerStore();

  function closeDrawer() {
    store.drawer = false;
  }
</script>

<template>
  <div class="drawer" :class="store.drawer ? 'drawer__open' : 'drawer__closed'">
    <div class="drawer__underlay" @click="closeDrawer">

    </div>
    <div class="drawer__wrapper">
      <div class="drawer__header">
        <div class="drawer__avatar"></div>
        <div class="drawer__header__icon">&#128269;</div>
      </div>
      <div class="drawer__navigation">
        <ul class="drawer__navigation__list">
          <li
                  class="drawer__navigation__list__item drawer__navigation__list__item--active"
                  @click="closeDrawer"
          >
              <router-link to="/daily/today">Today</router-link>
          </li>
          <li
                  class="drawer__navigation__list__item"
                  @click="closeDrawer"
          >
              <router-link to="/weekly">This Week</router-link>
          </li>
          <li
              class="drawer__navigation__list__item"
          >
            <p>Monthly</p>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .drawer {
    height: 100%;
    position: fixed;
    width: 100vw;
    z-index: 1000;
    top: 0;
    left: 0;
  }

  .drawer__open {
    visibility: visible;
  }

  .drawer__closed {
    visibility: hidden;
  }

  .drawer__open > .drawer__wrapper {
    left: 0;
  }

  .drawer__closed > .drawer__wrapper {
    left: -100%;
  }

  .drawer__underlay {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: rgba(30,30,30,0.5);
    transition: all 0.5s;
  }

  .drawer__open > .drawer__underlay {
    opacity: 1;
  }

  .drawer__closed > .drawer__underlay {
    opacity: 0;
  }

  .drawer__wrapper {
    position: absolute;
    height: 100%;
    width: 75%;
    background-color: #fbf9f6;
    transition: all 0.3s;
    max-width: 400px;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .drawer__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .drawer__avatar {
    width: 2rem;
    height: 2rem;
    background: lightblue;
    border-radius: 4px;
  }

  .drawer__header__icon {
    font-size: 1.5rem;
  }

  .drawer__navigation__list {
    list-style-type: none;
    padding: 0;
  }

  .drawer__navigation__list__item {
    text-align: left;
  }

  .drawer__navigation__list__item > p {
    font-weight: 400;
  }

  .drawer__navigation__list__item--active > p {
    font-weight: 900;
  }
</style>
