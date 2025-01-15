<script setup>
import { useLayout } from "~~/layouts/composables/layout.js";
import AppConfigurator from "~~/layouts/AppConfigurator.vue";
const user = useSupabaseUser();

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        @click="onMenuToggle"
      >
        <i class="pi pi-bars"></i>
      </button>
      <NuxtLink to="/" class="layout-topbar-logo">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M500.248,496.747L265.581,6.08c-0.064-0.128-0.213-0.171-0.299-0.299C263.512,2.389,260.056,0,255.96,0
			c-4.096,0-7.531,2.389-9.323,5.781c-0.064,0.128-0.235,0.171-0.299,0.299L11.672,496.747c-0.107,0.213-0.043,0.448-0.128,0.64
			c-0.491,1.195-0.725,2.453-0.747,3.755c0,0.341-0.128,0.661-0.085,1.024c0.107,1.451,0.491,2.901,1.237,4.267
			c0.064,0.107,0.171,0.128,0.213,0.235c0.064,0.107,0.043,0.256,0.107,0.363c0.683,1.088,1.728,1.792,2.709,2.56
			c0.384,0.299,0.64,0.768,1.067,1.003c1.579,0.896,3.371,1.408,5.248,1.408h469.333c3.669,0,7.083-1.877,9.024-4.971
			S501.848,500.053,500.248,496.747z M245.293,57.664v309.333L45.144,476.181L245.293,57.664z M63.128,490.667l192.725-105.109
			l183.957,105.109H63.128z M266.627,367.147V57.728l203.648,425.771L266.627,367.147z"
              />
            </g>
          </g>
        </svg>

        <span>Boloko</span>
      </NuxtLink>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          @click="toggleDarkMode"
        >
          <i
            :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"
          ></i>
        </button>
        <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette"></i>
          </button>
          <AppConfigurator />
        </div>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <div v-if="user">
            <Button label="Profile" icon="pi pi-user">
                <NuxtLink to="/auth/profile">
                    <span>{{ user.email }}</span>  
                </NuxtLink>
            </Button>
          </div>
          <div v-else>
            <NuxtLink to="/auth/login">
            <Button type="button" class="layout-topbar-action">
              <i class="pi pi-user"></i>
                <span>Login</span>
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
