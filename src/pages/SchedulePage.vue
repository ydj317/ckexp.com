<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const freightTypes = ['FCL', 'LCL', 'AIR', 'EXPRESS']
const freightType = ref(route.query.freightType || 'FCL')
const pol = ref(route.query.pol || 'BUSAN, KR (KRPUS)')
const pod = ref(route.query.pod || 'LOS ANGELES, US (USLAX)')
const etd = ref(route.query.etd?.slice(0, 10) || '2026-05-01')
const containerType = ref('40FT HC')

const sortKey = ref('etd')
const sortOptions = [
  { key: 'etd', label: '출항일 빠른 순' },
  { key: 'eta', label: '도착일 빠른 순' },
  { key: 'transit', label: '운송 기간 짧은 순' },
  { key: 'price', label: '운임 낮은 순' }
]

const filterDirect = ref(false)
const filterCarriers = ref(new Set())

const carriers = [
  { id: 'maersk', name: 'Maersk', color: '#42b0d5' },
  { id: 'cma', name: 'CMA CGM', color: '#dc2626' },
  { id: 'msc', name: 'MSC', color: '#f59e0b' },
  { id: 'one', name: 'ONE', color: '#ec4899' },
  { id: 'evergreen', name: 'Evergreen', color: '#10b981' },
  { id: 'hmm', name: 'HMM', color: '#0b5ed7' },
  { id: 'cosco', name: 'COSCO', color: '#7c3aed' },
  { id: 'yangming', name: 'Yang Ming', color: '#0891b2' }
]

const transitMax = ref(40)

const schedules = [
  { id: 1, carrierId: 'hmm', vessel: 'HMM ALGECIRAS', voyage: '0125W', etd: '2026-05-03', eta: '2026-05-17', transit: 14, direct: true,  ts: null,        price: 1850, currency: 'USD', cutoff: '2026-04-30 17:00', remaining: 8 },
  { id: 2, carrierId: 'maersk', vessel: 'MAERSK EDISON', voyage: '512N', etd: '2026-05-04', eta: '2026-05-21', transit: 17, direct: false, ts: 'SHANGHAI',  price: 1620, currency: 'USD', cutoff: '2026-05-01 12:00', remaining: 12 },
  { id: 3, carrierId: 'one', vessel: 'ONE COMPETENCE', voyage: 'A038W', etd: '2026-05-05', eta: '2026-05-19', transit: 14, direct: true,  ts: null,        price: 1950, currency: 'USD', cutoff: '2026-05-02 17:00', remaining: 4 },
  { id: 4, carrierId: 'evergreen', vessel: 'EVER GIVEN',  voyage: '0815E', etd: '2026-05-06', eta: '2026-05-22', transit: 16, direct: false, ts: 'KAOHSIUNG', price: 1580, currency: 'USD', cutoff: '2026-05-03 17:00', remaining: 22 },
  { id: 5, carrierId: 'cma', vessel: 'CMA CGM MARCO POLO', voyage: '0FX9MN', etd: '2026-05-07', eta: '2026-05-23', transit: 16, direct: false, ts: 'NINGBO', price: 1690, currency: 'USD', cutoff: '2026-05-04 17:00', remaining: 6 },
  { id: 6, carrierId: 'msc', vessel: 'MSC GULSUN', voyage: 'IU518A', etd: '2026-05-08', eta: '2026-05-25', transit: 17, direct: false, ts: 'HONG KONG',  price: 1540, currency: 'USD', cutoff: '2026-05-05 12:00', remaining: 18 },
  { id: 7, carrierId: 'cosco', vessel: 'COSCO SHIPPING UNIVERSE', voyage: '042W', etd: '2026-05-09', eta: '2026-05-22', transit: 13, direct: true, ts: null, price: 2050, currency: 'USD', cutoff: '2026-05-06 17:00', remaining: 3 },
  { id: 8, carrierId: 'yangming', vessel: 'YM WELLNESS', voyage: '116W', etd: '2026-05-10', eta: '2026-05-27', transit: 17, direct: false, ts: 'SHANGHAI', price: 1490, currency: 'USD', cutoff: '2026-05-07 17:00', remaining: 10 },
  { id: 9, carrierId: 'hmm', vessel: 'HMM HAMBURG', voyage: '0126W', etd: '2026-05-11', eta: '2026-05-25', transit: 14, direct: true, ts: null,            price: 1880, currency: 'USD', cutoff: '2026-05-08 17:00', remaining: 14 }
]

const carrierOf = id => carriers.find(c => c.id === id)

const filtered = computed(() => {
  let list = [...schedules]
  if (filterDirect.value) list = list.filter(s => s.direct)
  if (filterCarriers.value.size > 0) list = list.filter(s => filterCarriers.value.has(s.carrierId))
  list = list.filter(s => s.transit <= transitMax.value)
  list.sort((a, b) => {
    if (sortKey.value === 'etd') return a.etd.localeCompare(b.etd)
    if (sortKey.value === 'eta') return a.eta.localeCompare(b.eta)
    if (sortKey.value === 'transit') return a.transit - b.transit
    if (sortKey.value === 'price') return a.price - b.price
    return 0
  })
  return list
})

const page = ref(0)
const pageSize = 5
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => filtered.value.slice(page.value * pageSize, (page.value + 1) * pageSize))

const activeFilterCount = computed(() => {
  let n = 0
  if (filterDirect.value) n++
  n += filterCarriers.value.size
  if (transitMax.value < 40) n++
  return n
})

const toggleCarrier = id => {
  const next = new Set(filterCarriers.value)
  next.has(id) ? next.delete(id) : next.add(id)
  filterCarriers.value = next
  page.value = 0
}

const resetFilters = () => {
  filterDirect.value = false
  filterCarriers.value = new Set()
  transitMax.value = 40
  page.value = 0
}

const search = () => {
  router.replace({
    path: '/forwarding/schedule',
    query: { freightType: freightType.value, pol: pol.value, pod: pod.value, etd: etd.value }
  })
  page.value = 0
  mobileSearchOpen.value = false
}

const swap = () => {
  const tmp = pol.value
  pol.value = pod.value
  pod.value = tmp
}

const formatDate = d => {
  const date = new Date(d)
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${'일월화수목금토'[date.getDay()]})`
}

const formatDateShort = d => {
  const date = new Date(d)
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

const polShort = computed(() => pol.value.split(',')[0])
const podShort = computed(() => pod.value.split(',')[0])

/* mobile UI state */
const mobileSearchOpen = ref(false)
const mobileFilterOpen = ref(false)
const mobileSortOpen = ref(false)

const lockBody = (lock) => document.body.classList.toggle('no-scroll', lock)
watch([mobileSearchOpen, mobileFilterOpen, mobileSortOpen], (vals) => {
  lockBody(vals.some(v => v))
})

const sortLabel = computed(() => sortOptions.find(o => o.key === sortKey.value)?.label)
</script>

<template>
  <div class="schedule-page">
    <!-- Desktop search bar -->
    <section class="search-bar-wrap desktop-only">
      <div class="container">
        <div class="search-bar">
          <div class="ftype-tabs">
            <button v-for="t in freightTypes" :key="t" :class="{ active: freightType === t }" @click="freightType = t">{{ t }}</button>
          </div>
          <div class="search-fields">
            <label class="field">
              <span>출발지 (POL)</span>
              <input v-model="pol" type="text" />
            </label>
            <button class="swap" @click="swap" title="교환" aria-label="swap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 4l-4 4 4 4" /><path d="M3 8h14" />
                <path d="M17 20l4-4-4-4" /><path d="M21 16H7" />
              </svg>
            </button>
            <label class="field">
              <span>도착지 (POD)</span>
              <input v-model="pod" type="text" />
            </label>
            <label class="field">
              <span>출항 예정일 (ETD)</span>
              <input v-model="etd" type="date" />
            </label>
            <label class="field">
              <span>컨테이너</span>
              <select v-model="containerType">
                <option>20FT</option><option>40FT</option><option>40FT HC</option><option>45FT HC</option>
              </select>
            </label>
            <button class="btn btn-primary search-btn" @click="search">스케줄 검색</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile compact search summary -->
    <section class="search-bar-wrap mobile-only">
      <div class="container">
        <button class="mobile-search-summary" @click="mobileSearchOpen = true">
          <div class="ms-route">
            <strong>{{ polShort }}</strong>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            <strong>{{ podShort }}</strong>
          </div>
          <div class="ms-meta">
            <span class="chip">{{ freightType }}</span>
            <span>{{ etd }}</span>
            <span>{{ containerType }}</span>
          </div>
          <span class="ms-edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 20h4l10-10-4-4L4 16v4z" /><path d="M14 6l4 4" />
            </svg>
            수정
          </span>
        </button>
      </div>
    </section>

    <!-- Body -->
    <section class="body">
      <div class="container body-grid">
        <aside class="filters desktop-only">
          <div class="filter-head">
            <h3>필터</h3>
            <button class="reset" @click="resetFilters">초기화</button>
          </div>
          <div class="filter-group">
            <h4>운송 방식</h4>
            <label class="check"><input type="checkbox" v-model="filterDirect" /><span>직항만 보기</span></label>
          </div>
          <div class="filter-group">
            <h4>선사</h4>
            <ul class="carrier-list">
              <li v-for="c in carriers" :key="c.id">
                <label class="check">
                  <input type="checkbox" :checked="filterCarriers.has(c.id)" @change="toggleCarrier(c.id)" />
                  <span class="dot" :style="{ background: c.color }"></span>
                  <span>{{ c.name }}</span>
                </label>
              </li>
            </ul>
          </div>
          <div class="filter-group">
            <h4>운송 기간 (T/T)</h4>
            <div class="range">
              <input type="range" min="10" max="40" v-model.number="transitMax" />
              <div class="range-label">최대 <strong>{{ transitMax }}</strong>일 이내</div>
            </div>
          </div>
          <div class="filter-group">
            <h4>출항 주간</h4>
            <ul class="week-list">
              <li v-for="w in ['이번 주', '다음 주', '2주 후', '3주 후']" :key="w">
                <label class="check"><input type="checkbox" /><span>{{ w }}</span></label>
              </li>
            </ul>
          </div>
          <div class="filter-group">
            <h4>운임 범위 (USD)</h4>
            <div class="price-range">
              <input type="number" placeholder="최소" />
              <span>~</span>
              <input type="number" placeholder="최대" />
            </div>
          </div>
        </aside>

        <div class="results">
          <div class="results-head">
            <div class="route-info">
              <h2 class="route">
                <span>{{ polShort }}</span>
                <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <span>{{ podShort }}</span>
              </h2>
              <p class="meta">총 <strong>{{ filtered.length }}</strong>건 · {{ containerType }} · ETD {{ etd }}</p>
            </div>
            <div class="sort desktop-only">
              <label>정렬</label>
              <select v-model="sortKey">
                <option v-for="o in sortOptions" :key="o.key" :value="o.key">{{ o.label }}</option>
              </select>
            </div>
          </div>

          <!-- Mobile sort/filter toolbar -->
          <div class="mobile-tools mobile-only">
            <button class="tool-btn" @click="mobileSortOpen = true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h12M4 12h8M4 18h4M16 4l4 4M16 16l4 4M20 4v16"/></svg>
              <span>{{ sortLabel }}</span>
            </button>
            <button class="tool-btn" @click="mobileFilterOpen = true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>
              <span>필터</span>
              <em v-if="activeFilterCount" class="badge-count">{{ activeFilterCount }}</em>
            </button>
          </div>

          <div v-if="paged.length === 0" class="empty">
            <p>조건에 맞는 스케줄이 없습니다.</p>
            <button class="btn btn-outline" @click="resetFilters">필터 초기화</button>
          </div>

          <ul class="schedule-list">
            <li v-for="s in paged" :key="s.id" class="schedule-card">
              <div class="card-head">
                <div class="carrier">
                  <div class="carrier-mark" :style="{ background: carrierOf(s.carrierId).color }">{{ carrierOf(s.carrierId).name[0] }}</div>
                  <div>
                    <strong>{{ carrierOf(s.carrierId).name }}</strong>
                    <span>{{ s.vessel }} · {{ s.voyage }}</span>
                  </div>
                </div>
                <span class="route-badge" :class="{ direct: s.direct }">
                  <svg v-if="s.direct" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 8l3 3 7-7"/></svg>
                  {{ s.direct ? '직항' : `T/S · ${s.ts}` }}
                </span>
              </div>

              <div class="card-route">
                <div class="date-block">
                  <span class="lbl">출항 ETD</span>
                  <strong class="d-full">{{ formatDate(s.etd) }}</strong>
                  <strong class="d-short">{{ formatDateShort(s.etd) }}</strong>
                  <span class="port">{{ polShort }}</span>
                </div>
                <div class="transit">
                  <div class="transit-bar">
                    <span class="d-from"></span>
                    <span class="line"></span>
                    <span class="d-to"></span>
                  </div>
                  <div class="transit-text">{{ s.transit }}일</div>
                </div>
                <div class="date-block right">
                  <span class="lbl">도착 ETA</span>
                  <strong class="d-full">{{ formatDate(s.eta) }}</strong>
                  <strong class="d-short">{{ formatDateShort(s.eta) }}</strong>
                  <span class="port">{{ podShort }}</span>
                </div>
              </div>

              <div class="card-foot">
                <div class="price-block">
                  <div class="price">
                    <span class="curr">{{ s.currency }}</span>
                    <strong>{{ s.price.toLocaleString() }}</strong>
                    <span class="per">/ {{ containerType }}</span>
                  </div>
                  <div class="meta-line">
                    <span>마감 {{ s.cutoff.slice(5) }}</span>
                    <span>·</span>
                    <span>잔여 <em>{{ s.remaining }}</em>개</span>
                  </div>
                </div>
                <div class="actions-block">
                  <a href="#" class="detail">상세</a>
                  <button class="btn btn-primary book">예약 진행</button>
                </div>
              </div>
            </li>
          </ul>

          <nav class="pagination" v-if="totalPages > 1">
            <button :disabled="page === 0" @click="page--" aria-label="prev">‹</button>
            <button v-for="p in totalPages" :key="p" :class="{ active: page === p - 1 }" @click="page = p - 1">{{ p }}</button>
            <button :disabled="page === totalPages - 1" @click="page++" aria-label="next">›</button>
          </nav>
        </div>
      </div>
    </section>

    <!-- Mobile fullscreen search sheet -->
    <transition name="sheet">
      <div v-if="mobileSearchOpen" class="sheet-full">
        <header class="sheet-head">
          <h3>스케줄 검색</h3>
          <button class="close" @click="mobileSearchOpen = false" aria-label="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>
          </button>
        </header>
        <div class="sheet-body">
          <div class="ftype-tabs">
            <button v-for="t in freightTypes" :key="t" :class="{ active: freightType === t }" @click="freightType = t">{{ t }}</button>
          </div>
          <label class="field">
            <span>출발지 (POL)</span>
            <input v-model="pol" type="text" placeholder="예: BUSAN, KR" />
          </label>
          <button class="swap-mobile" @click="swap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 4l-4 4 4 4" /><path d="M3 8h14" />
              <path d="M17 20l4-4-4-4" /><path d="M21 16H7" />
            </svg>
            출/도착 교환
          </button>
          <label class="field">
            <span>도착지 (POD)</span>
            <input v-model="pod" type="text" placeholder="예: LOS ANGELES, US" />
          </label>
          <label class="field">
            <span>출항 예정일</span>
            <input v-model="etd" type="date" />
          </label>
          <label class="field">
            <span>컨테이너 타입</span>
            <select v-model="containerType">
              <option>20FT</option><option>40FT</option><option>40FT HC</option><option>45FT HC</option>
            </select>
          </label>
        </div>
        <footer class="sheet-foot">
          <button class="btn btn-primary full" @click="search">스케줄 검색</button>
        </footer>
      </div>
    </transition>

    <!-- Mobile filter bottom sheet -->
    <transition name="fade">
      <div v-if="mobileFilterOpen" class="overlay" @click="mobileFilterOpen = false"></div>
    </transition>
    <transition name="up">
      <div v-if="mobileFilterOpen" class="bottom-sheet">
        <div class="sheet-grab"></div>
        <header class="sheet-head">
          <h3>필터</h3>
          <button class="reset" @click="resetFilters">초기화</button>
        </header>
        <div class="sheet-body">
          <div class="filter-group">
            <h4>운송 방식</h4>
            <label class="check"><input type="checkbox" v-model="filterDirect" /><span>직항만 보기</span></label>
          </div>
          <div class="filter-group">
            <h4>선사</h4>
            <div class="carrier-chips">
              <button
                v-for="c in carriers"
                :key="c.id"
                class="chip-btn"
                :class="{ active: filterCarriers.has(c.id) }"
                @click="toggleCarrier(c.id)"
              >
                <span class="dot" :style="{ background: c.color }"></span>{{ c.name }}
              </button>
            </div>
          </div>
          <div class="filter-group">
            <h4>운송 기간 (T/T)</h4>
            <div class="range">
              <input type="range" min="10" max="40" v-model.number="transitMax" />
              <div class="range-label">최대 <strong>{{ transitMax }}</strong>일 이내</div>
            </div>
          </div>
          <div class="filter-group">
            <h4>운임 범위 (USD)</h4>
            <div class="price-range">
              <input type="number" placeholder="최소" />
              <span>~</span>
              <input type="number" placeholder="최대" />
            </div>
          </div>
        </div>
        <footer class="sheet-foot">
          <button class="btn btn-primary full" @click="mobileFilterOpen = false">
            결과 {{ filtered.length }}건 보기
          </button>
        </footer>
      </div>
    </transition>

    <!-- Mobile sort bottom sheet -->
    <transition name="fade">
      <div v-if="mobileSortOpen" class="overlay" @click="mobileSortOpen = false"></div>
    </transition>
    <transition name="up">
      <div v-if="mobileSortOpen" class="bottom-sheet sort-sheet">
        <div class="sheet-grab"></div>
        <header class="sheet-head">
          <h3>정렬</h3>
        </header>
        <ul class="sort-list">
          <li v-for="o in sortOptions" :key="o.key">
            <button :class="{ active: sortKey === o.key }" @click="sortKey = o.key; mobileSortOpen = false">
              {{ o.label }}
              <svg v-if="sortKey === o.key" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12l5 5 9-11"/></svg>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.schedule-page {
  background: var(--color-bg-soft);
  min-height: 100vh;
  padding-top: 64px;
}

.desktop-only { display: block; }
.mobile-only { display: none; }

/* Desktop search bar */
.search-bar-wrap {
  background: linear-gradient(135deg, #0a1530 0%, #102b5b 100%);
  padding: 28px 0 24px;
}
.search-bar {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-md);
}
.ftype-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--color-border);
  padding: 0 4px 12px;
  margin-bottom: 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.ftype-tabs::-webkit-scrollbar { display: none; }
.ftype-tabs button {
  padding: 10px 18px;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text-muted);
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
}
.ftype-tabs button.active { color: var(--color-primary); }
.ftype-tabs button.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -13px;
  height: 2px;
  background: var(--color-primary);
}

.search-fields {
  display: grid;
  grid-template-columns: 1fr auto 1fr 0.85fr 0.7fr auto;
  gap: 10px;
  align-items: end;
}
.field { display: flex; flex-direction: column; gap: 4px; }
.field span { font-size: 12px; font-weight: 600; color: var(--color-text-muted); padding-left: 12px; }
.field input,
.field select {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  font-size: 15px;
  font-family: inherit;
  font-weight: 500;
  min-height: 44px;
  transition: border var(--transition), box-shadow var(--transition), background var(--transition);
}
.field input:focus,
.field select:focus {
  outline: none;
  border-color: var(--color-primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(11, 94, 215, 0.1);
}
.swap {
  width: 38px;
  height: 44px;
  border-radius: 10px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), color var(--transition), transform var(--transition);
}
.swap svg { width: 18px; height: 18px; }
.swap:hover {
  background: var(--color-primary);
  color: #fff;
  transform: rotate(180deg);
}
.search-btn { height: 44px; padding: 0 22px; border-radius: 10px; }

/* Mobile compact search summary */
.mobile-search-summary {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  background: #fff;
  border-radius: var(--radius);
  padding: 14px 16px;
  box-shadow: var(--shadow-md);
  text-align: left;
  position: relative;
}
.ms-route {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: var(--color-text);
  padding-right: 40px;
}
.ms-route svg { width: 16px; height: 16px; color: var(--color-primary); }
.ms-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  flex-wrap: wrap;
}
.ms-meta .chip {
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 2px 8px;
  border-radius: 99px;
}
.ms-edit {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 700;
}
.ms-edit svg { width: 14px; height: 14px; }

/* Body */
.body { padding: 24px 0 80px; }
.body-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: flex-start;
}

.filters {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 88px;
}
.filter-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}
.filter-head h3 { font-size: 17px; font-weight: 800; }
.reset {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 6px;
}
.reset:hover { background: var(--color-primary-soft); }

.filter-group {
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
}
.filter-group:last-child { border-bottom: none; }
.filter-group h4 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
  letter-spacing: 0.02em;
}
.check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 0;
  min-height: 32px;
}
.check input { accent-color: var(--color-primary); width: 18px; height: 18px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.carrier-list, .week-list { display: flex; flex-direction: column; }
.range input[type="range"] { width: 100%; accent-color: var(--color-primary); height: 24px; }
.range-label { font-size: 13px; color: var(--color-text-muted); margin-top: 4px; }
.range-label strong { color: var(--color-primary); }
.price-range { display: flex; align-items: center; gap: 8px; }
.price-range input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  min-height: 40px;
}
.price-range span { color: var(--color-text-muted); }

/* Results */
.results-head {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}
.route {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.arrow { width: 18px; height: 18px; color: var(--color-primary); }
.meta { font-size: 13px; color: var(--color-text-muted); }
.meta strong { color: var(--color-text); }
.sort { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.sort label { font-size: 13px; color: var(--color-text-muted); font-weight: 600; }
.sort select {
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  min-height: 40px;
}

/* Mobile tools */
.mobile-tools {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  position: sticky;
  top: 64px;
  z-index: 30;
  padding: 8px 0;
  background: var(--color-bg-soft);
}
.tool-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 11px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  position: relative;
  min-height: 44px;
}
.tool-btn svg { width: 16px; height: 16px; color: var(--color-primary); }
.badge-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--color-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Schedule cards */
.schedule-list { display: flex; flex-direction: column; gap: 12px; }
.schedule-card {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 16px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
}
.schedule-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.carrier { display: flex; gap: 12px; align-items: center; min-width: 0; }
.carrier-mark {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  flex-shrink: 0;
}
.carrier > div { min-width: 0; }
.carrier strong {
  display: block;
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.carrier span {
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.route-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 99px;
  background: #fff5e6;
  color: #c87f00;
  flex-shrink: 0;
  white-space: nowrap;
}
.route-badge.direct { background: #e8fbf3; color: #009972; }
.route-badge svg { width: 12px; height: 12px; }

.card-route {
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  gap: 8px;
  align-items: center;
  padding: 14px 0;
  border-top: 1px dashed var(--color-border);
  border-bottom: 1px dashed var(--color-border);
}
.date-block { display: flex; flex-direction: column; min-width: 0; }
.date-block.right { text-align: right; align-items: flex-end; }
.lbl {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.date-block strong { font-size: 16px; font-weight: 800; }
.d-short { display: none; }
.port { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; }

.transit { text-align: center; }
.transit-bar { display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
.d-from, .d-to { width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; }
.line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  position: relative;
}
.line::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230b5ed7' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 17h18l-1.5 3H4.5L3 17z'/%3E%3Cpath d='M5 17V9h14v8'/%3E%3Cpath d='M9 9V6h6v3'/%3E%3C/svg%3E") center/14px no-repeat;
  border-radius: 50%;
  border: 1px solid var(--color-border);
}
.transit-text { font-size: 13px; font-weight: 700; color: var(--color-primary); }

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.price-block { display: flex; flex-direction: column; min-width: 0; }
.price { display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
.price .curr { font-size: 13px; font-weight: 700; color: var(--color-text-muted); }
.price strong {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}
.price .per { font-size: 12px; color: var(--color-text-muted); }
.meta-line {
  display: flex;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}
.meta-line em { color: #d97706; font-style: normal; font-weight: 700; }

.actions-block { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.detail { font-size: 13px; color: var(--color-text-muted); text-decoration: underline; }
.book {
  padding: 11px 22px;
  font-size: 14px;
  border-radius: 10px;
  min-height: 44px;
}

.empty {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 64px 24px;
  text-align: center;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.pagination { display: flex; gap: 6px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }
.pagination button {
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid var(--color-border);
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
  transition: all var(--transition);
}
.pagination button:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.pagination button.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }

/* Sheets */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 21, 48, 0.55);
  z-index: 200;
  backdrop-filter: blur(2px);
}
.sheet-full {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 220;
  display: flex;
  flex-direction: column;
  padding-top: var(--safe-top);
  padding-bottom: var(--safe-bottom);
}
.sheet-full .sheet-head, .bottom-sheet .sheet-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}
.sheet-full .sheet-head h3,
.bottom-sheet .sheet-head h3 { font-size: 17px; font-weight: 800; }
.sheet-full .close {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}
.sheet-full .close svg { width: 22px; height: 22px; }
.sheet-full .sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.sheet-full .ftype-tabs {
  display: flex;
  gap: 6px;
  background: var(--color-bg-soft);
  border-radius: 10px;
  padding: 4px;
  border: none;
  margin-bottom: 8px;
}
.sheet-full .ftype-tabs button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  color: var(--color-text-muted);
}
.sheet-full .ftype-tabs button.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.sheet-full .ftype-tabs button.active::after { display: none; }
.sheet-full .field {
  background: var(--color-bg-soft);
  padding: 12px 14px;
  border-radius: 12px;
  gap: 6px;
}
.sheet-full .field span {
  font-size: 12px;
  padding-left: 0;
}
.sheet-full .field input,
.sheet-full .field select {
  background: transparent;
  border: none;
  padding: 0;
  font-size: 17px;
  font-weight: 700;
  min-height: auto;
}
.sheet-full .field input:focus,
.sheet-full .field select:focus { box-shadow: none; }
.swap-mobile {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-radius: 99px;
  font-size: 13px;
  font-weight: 700;
  margin: -4px 0;
}
.swap-mobile svg { width: 14px; height: 14px; }
.sheet-foot {
  padding: 16px 20px calc(16px + var(--safe-bottom));
  border-top: 1px solid var(--color-border);
}
.btn.full { width: 100%; padding: 16px; font-size: 16px; border-radius: 12px; }

.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 220;
  background: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.18);
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--safe-bottom);
}
.sheet-grab {
  width: 40px;
  height: 4px;
  background: var(--color-border);
  border-radius: 99px;
  margin: 8px auto 0;
}
.bottom-sheet .sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 16px;
}
.bottom-sheet .filter-group {
  padding: 18px 0;
}
.carrier-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  min-height: 36px;
}
.chip-btn.active {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.sort-list { padding: 8px 0 16px; }
.sort-list button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  min-height: 56px;
}
.sort-list button.active { color: var(--color-primary); font-weight: 700; }
.sort-list button svg { width: 20px; height: 20px; color: var(--color-primary); }
.sort-list li:last-child button { border-bottom: none; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.up-enter-active, .up-leave-active { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.up-enter-from, .up-leave-to { transform: translateY(100%); }
.sheet-enter-active, .sheet-leave-active { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }

@media (max-width: 1024px) {
  .body-grid { grid-template-columns: 1fr; }
  .filters { display: none; }
  .desktop-only { display: none; }
  .mobile-only { display: block; }
}

@media (max-width: 768px) {
  .schedule-page { padding-top: 56px; }
  .search-bar-wrap { padding: 14px 0; }
  .body { padding: 0 0 80px; }
  .body-grid { gap: 0; }

  .results-head {
    border-radius: var(--radius);
    padding: 16px 18px;
    margin-bottom: 8px;
  }
  .route { font-size: 15px; gap: 6px; }
  .arrow { width: 14px; height: 14px; }
  .meta { font-size: 12px; }

  .mobile-tools { top: 56px; }

  .schedule-card {
    padding: 16px;
    border-radius: var(--radius);
    gap: 12px;
  }
  .carrier-mark { width: 38px; height: 38px; font-size: 15px; border-radius: 8px; }
  .carrier strong { font-size: 14px; }
  .carrier span { font-size: 11px; }
  .card-route { padding: 12px 0; gap: 4px; }
  .date-block strong { font-size: 14px; }
  .d-full { display: none; }
  .d-short { display: inline-block; font-size: 16px; font-weight: 800; }
  .lbl { font-size: 10px; }
  .port { font-size: 11px; }
  .transit-text { font-size: 12px; }
  .price strong { font-size: 22px; }
  .price .curr { font-size: 12px; }
  .price .per { font-size: 11px; display: none; }
  .meta-line { font-size: 11px; }
  .book { padding: 10px 16px; font-size: 13px; }
  .actions-block { gap: 6px; }
  .detail { font-size: 12px; }
}

@media (max-width: 420px) {
  .card-foot {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .actions-block {
    width: 100%;
    justify-content: space-between;
  }
  .actions-block .book {
    flex: 1;
    margin-left: auto;
    max-width: 60%;
  }
  .price strong { font-size: 24px; }
}
</style>
