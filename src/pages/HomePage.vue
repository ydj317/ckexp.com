<script setup>
import HeroSection from '../components/HeroSection.vue'
import PartnersSection from '../components/PartnersSection.vue'
import CertificationSection from '../components/CertificationSection.vue'
import FeatureSplit from '../components/FeatureSplit.vue'
import ServicesSection from '../components/ServicesSection.vue'
import StatsSection from '../components/StatsSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import CTASection from '../components/CTASection.vue'
</script>

<template>
  <HeroSection />
  <PartnersSection />
  <CertificationSection />
  <FeatureSplit
    eyebrow="SUPPLY CHAIN"
    title="공급망 전체를 한 화면에서 관리하세요"
    description="선적부터 입고까지 모든 단계를 실시간으로 추적하고, 데이터를 기반으로 더 나은 의사결정을 내릴 수 있습니다."
    :items="[
      '실시간 화물 추적과 ETA 예측',
      '문서, 인보이스, B/L을 한 곳에서',
      '주간 단위 리포트와 비용 분석'
    ]"
    image-bg="linear-gradient(135deg, #0b5ed7 0%, #00c2a8 100%)"
    :reverse="false"
  />
  <FeatureSplit
    eyebrow="TEAM"
    title="팀원과 협업하고 권한을 관리하세요"
    description="역할별로 접근 권한을 세밀하게 설정하여, 필요한 사람에게 필요한 정보만 공유할 수 있습니다."
    :items="[
      '역할별 접근 권한 관리',
      '실시간 코멘트와 알림',
      '내부 메모와 외부 공유 분리'
    ]"
    image-bg="linear-gradient(135deg, #0f1e3a 0%, #0b5ed7 100%)"
    :reverse="true"
    :alt="true"
  />
  <ServicesSection />
  <StatsSection />
  <TestimonialSection />
  <CTASection />
</template>
