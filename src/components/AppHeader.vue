<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

const lockBody = (lock) => {
  document.body.classList.toggle('no-scroll', lock)
}

watch(mobileOpen, (v) => lockBody(v))
watch(() => route.path, () => { mobileOpen.value = false })

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  lockBody(false)
})

const nav = [
  { label: '회사 소개', to: '/', hash: '#about' },
  { label: '서비스', to: '/', hash: '#services' },
  { label: '오픈 API', to: '/api' },
  { label: '고객 지원', to: '/support' }
]
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <img src="/logo.png" alt="탑월드" class="logo-img" />
        <span class="logo-text">TOPWORLD</span>
      </router-link>

      <nav class="nav-desktop">
        <ul>
          <li v-for="item in nav" :key="item.label">
            <router-link :to="item.hash ? { path: item.to, hash: item.hash } : item.to">{{ item.label }}</router-link>
          </li>
        </ul>
      </nav>

      <div class="actions">
        <router-link to="/login" class="login">로그인</router-link>
        <router-link to="/login" class="btn btn-primary signup">무료 가입</router-link>
        <button
          class="hamburger"
          :class="{ open: mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="menu"
          :aria-expanded="mobileOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="mobileOpen" class="overlay" @click="mobileOpen = false"></div>
    </transition>

    <transition name="slide">
      <aside v-if="mobileOpen" class="drawer">
        <div class="drawer-head">
          <router-link to="/" class="logo">
            <img src="/logo.png" alt="탑월드" class="logo-img" />
            <span class="logo-text">TOPWORLD</span>
          </router-link>
          <button class="close" @click="mobileOpen = false" aria-label="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <ul class="drawer-nav">
          <li v-for="item in nav" :key="item.label">
            <router-link
              :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
              @click="mobileOpen = false"
            >
              {{ item.label }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </router-link>
          </li>
        </ul>

        <div class="drawer-foot">
          <router-link to="/login" class="btn btn-outline drawer-btn" @click="mobileOpen = false">로그인</router-link>
          <router-link to="/login" class="btn btn-primary drawer-btn" @click="mobileOpen = false">무료 가입하기</router-link>
          <p class="drawer-contact">
            <strong>02-1234-5678</strong>
            <span>평일 09:00 - 18:00</span>
          </p>
        </div>
      </aside>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(15, 30, 58, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  padding-top: var(--safe-top);
}
.header.scrolled {
  background: rgba(15, 30, 58, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-img {
  height: 26px;
  width: auto;
}
.logo-text {
  color: #fff;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 0.06em;
}

.nav-desktop {
  flex: 1;
}
.nav-desktop ul {
  display: flex;
  gap: 36px;
  justify-content: center;
}
.nav-desktop a {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  font-weight: 500;
  transition: color var(--transition);
  position: relative;
  padding: 8px 0;
}
.nav-desktop a:hover { color: #fff; }
.nav-desktop a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition);
}
.nav-desktop a:hover::after { width: 100%; }

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.login {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
}
.login:hover { color: #fff; }
.signup {
  padding: 9px 18px;
  font-size: 14px;
  min-height: 38px;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile drawer + overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  backdrop-filter: blur(2px);
}
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 86vw;
  max-width: 360px;
  background: #fff;
  z-index: 210;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.18);
  padding-top: var(--safe-top);
  padding-bottom: var(--safe-bottom);
}
.drawer-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}
.drawer-head .logo-text {
  color: var(--color-text);
}
.drawer-head .logo-img {
  filter: brightness(0);
}
.close {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}
.close:hover { background: var(--color-bg-soft); }
.close svg { width: 22px; height: 22px; }

.drawer-nav {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}
.drawer-nav a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 22px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}
.drawer-nav a:active { background: var(--color-bg-soft); }
.drawer-nav svg {
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
}

.drawer-foot {
  padding: 20px 22px 28px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-bg-soft);
}
.drawer-btn {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
}
.drawer-contact {
  margin-top: 14px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.drawer-contact strong {
  font-size: 18px;
  color: var(--color-primary);
}
.drawer-contact span {
  font-size: 12px;
  color: var(--color-text-muted);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

@media (max-width: 1024px) {
  .nav-desktop, .login, .signup {
    display: none;
  }
  .hamburger { display: flex; }
}

@media (max-width: 480px) {
  .logo-img { height: 22px; }
  .logo-text { font-size: 15px; }
  .header-inner { height: 56px; }
}
</style>
