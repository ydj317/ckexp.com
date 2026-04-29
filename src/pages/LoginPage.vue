<script setup>
import { ref } from 'vue'

const mode = ref('login')
const email = ref('')
const password = ref('')
const remember = ref(true)
const showPw = ref(false)

const submit = (e) => {
  e.preventDefault()
  alert('데모 페이지입니다. 실제 로그인은 동작하지 않습니다.')
}
</script>

<template>
  <div class="login-page">
    <div class="bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid"></div>
    </div>

    <div class="frame">
      <div class="left">
        <router-link to="/" class="brand">
          <img src="/logo.png" alt="탑월드" />
          <span>TOPWORLD</span>
        </router-link>
        <h1>투명한 스케줄,<br />합리적인 운임으로<br /><span class="grad">더 빠른 무역.</span></h1>
        <p class="lead">
          1,900개 이상의 화주사가 신뢰하는<br />
          디지털 포워딩 파트너 탑월드와 함께하세요.
        </p>
        <ul class="bullets">
          <li>
            <span class="b-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>
            </span>
            견적 / 부킹 / 추적 / 송금을 한 화면에서
          </li>
          <li>
            <span class="b-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>
            </span>
            국제 인증 AEO·ISO·IATA 보유
          </li>
          <li>
            <span class="b-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>
            </span>
            첫 30일 + 월 10만 API 콜 무료
          </li>
        </ul>
        <div class="testi">
          <p>"가입 후 단 하루 만에 첫 부킹을 마쳤어요. 정말 직관적입니다."</p>
          <div class="who">
            <div class="ava">K</div>
            <div>
              <strong>김민수</strong>
              <span>물류 팀장 · ABC Korea</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="card">
          <div class="tabs">
            <button :class="{ active: mode === 'login' }" @click="mode = 'login'">로그인</button>
            <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">회원가입</button>
          </div>

          <h2 v-if="mode === 'login'">반갑습니다, 다시 만나서 기뻐요.</h2>
          <h2 v-else>지금 가입하고 30일 무료 체험.</h2>
          <p class="sub" v-if="mode === 'login'">계정 정보로 로그인 해주세요.</p>
          <p class="sub" v-else>1분 안에 가입하고 첫 견적을 받아보세요.</p>

          <div class="social">
            <button class="s-btn s-google">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"/>
                <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0 0 12 22z"/>
                <path fill="#FBBC05" d="M6.2 13.6c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.1H2.7A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.6l3.1-3z"/>
                <path fill="#EA4335" d="M12 5.7c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0 0 12 2 10 10 0 0 0 2.7 7l3.5 2.7C7 7.5 9.3 5.7 12 5.7z"/>
              </svg>
              Google로 계속하기
            </button>
            <button class="s-btn s-kakao">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#000"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7L5.5 22l4.7-3a13 13 0 0 0 1.8.1c5.5 0 10-3.6 10-8s-4.5-8.1-10-8.1z"/></svg>
              카카오 로그인
            </button>
            <button class="s-btn s-naver">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M16 4h4v16h-4l-8-8v8H4V4h4l8 8V4z"/></svg>
              네이버 로그인
            </button>
            <button class="s-btn s-apple">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M16.4 12.3c0-2.3 1.9-3.4 2-3.4-1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.5-3.8zM14 4.7c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z"/></svg>
              Apple로 로그인
            </button>
          </div>

          <div class="divider"><span>또는 이메일로 {{ mode === 'login' ? '로그인' : '가입' }}</span></div>

          <form @submit="submit" class="form">
            <label class="field">
              <span>이메일</span>
              <input type="email" v-model="email" placeholder="you@company.com" required />
            </label>
            <label class="field" v-if="mode === 'signup'">
              <span>회사명</span>
              <input type="text" placeholder="(주)탑월드" required />
            </label>
            <label class="field">
              <span>비밀번호</span>
              <div class="pw-wrap">
                <input :type="showPw ? 'text' : 'password'" v-model="password" placeholder="8자 이상, 영문 + 숫자" required />
                <button type="button" class="eye" @click="showPw = !showPw" :aria-label="showPw ? 'hide' : 'show'">
                  <svg v-if="!showPw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 3l18 18M10.6 6.1A11 11 0 0 1 22 12s-1.4 2.7-4 4.7M6.4 6.4C3.6 8.5 2 12 2 12s3.5 7 10 7c1.7 0 3.3-.5 4.6-1.2"/>
                  </svg>
                </button>
              </div>
            </label>

            <div class="row" v-if="mode === 'login'">
              <label class="check">
                <input type="checkbox" v-model="remember" />
                <span>로그인 상태 유지</span>
              </label>
              <a href="#" class="link">비밀번호를 잊으셨나요?</a>
            </div>

            <p class="agree" v-else>
              가입 시 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의하게 됩니다.
            </p>

            <button type="submit" class="btn btn-primary submit">
              {{ mode === 'login' ? '로그인' : '가입하기' }}
            </button>

            <p class="switch">
              {{ mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?' }}
              <button type="button" class="link" @click="mode = mode === 'login' ? 'signup' : 'login'">
                {{ mode === 'login' ? '회원가입' : '로그인' }}
              </button>
            </p>
          </form>
        </div>

        <p class="legal">
          © 2026 TOPWORLD Co., Ltd. ·
          <a href="#">이용약관</a> ·
          <a href="#">개인정보처리방침</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  padding-top: 64px;
  background: linear-gradient(135deg, #0a1530 0%, #102b5b 100%);
  overflow: hidden;
}
.bg { position: absolute; inset: 0; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.45; }
.orb-1 { width: 480px; height: 480px; background: #0b5ed7; top: -100px; left: -100px; }
.orb-2 { width: 420px; height: 420px; background: #00c2a8; bottom: -120px; right: -120px; }
.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}

.frame {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 60px;
  align-items: center;
  min-height: calc(100vh - 64px);
}

/* Left intro */
.left { color: #fff; }
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}
.brand img { height: 28px; }
.brand span {
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.06em;
}
.left h1 {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.grad {
  background: linear-gradient(90deg, #00c2a8 0%, #4d8ff0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 32px;
  line-height: 1.7;
}
.bullets {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
}
.bullets li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
}
.b-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 194, 168, 0.2);
  color: #6deccf;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.b-icon svg { width: 14px; height: 14px; }

.testi {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 20px 22px;
}
.testi p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.7;
  margin-bottom: 14px;
}
.who { display: flex; align-items: center; gap: 10px; }
.ava {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0b5ed7, #00c2a8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
}
.who strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}
.who span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Right card */
.right { display: flex; flex-direction: column; gap: 16px; }
.card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}
.tabs {
  display: flex;
  background: var(--color-bg-soft);
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 22px;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text-muted);
  transition: all var(--transition);
}
.tabs button.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.card h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}
.sub {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 22px;
}

.social {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}
.s-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  min-height: 42px;
  transition: background var(--transition), transform var(--transition);
}
.s-btn:hover { background: var(--color-bg-soft); }
.s-btn:active { transform: scale(0.98); }
.s-kakao { background: #fee500; color: #191919; border-color: #fee500; }
.s-kakao:hover { background: #f5dc00; }
.s-naver { background: #03c75a; color: #fff; border-color: #03c75a; }
.s-naver:hover { background: #02b352; }
.s-apple { background: #000; color: #fff; border-color: #000; }
.s-apple:hover { background: #1a1a1a; }

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  color: var(--color-text-muted);
  font-size: 12px;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.form { display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field span {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
}
.field input {
  padding: 13px 14px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  background: var(--color-bg-soft);
  min-height: 46px;
  transition: border var(--transition), box-shadow var(--transition), background var(--transition);
}
.field input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(11, 94, 215, 0.1);
}
.pw-wrap { position: relative; }
.pw-wrap input { width: 100%; padding-right: 44px; }
.eye {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}
.eye:hover { background: var(--color-bg-soft); color: var(--color-text); }
.eye svg { width: 18px; height: 18px; }

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -2px;
}
.check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;
}
.check input { accent-color: var(--color-primary); width: 16px; height: 16px; }
.link {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 600;
  background: none;
  font-family: inherit;
}
.link:hover { text-decoration: underline; }
.agree {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-top: -4px;
}
.agree a { color: var(--color-primary); font-weight: 600; }

.submit {
  margin-top: 6px;
  padding: 15px;
  font-size: 15px;
  border-radius: 10px;
}
.switch {
  text-align: center;
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 6px;
}
.switch .link { margin-left: 6px; }

.legal {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.legal a {
  color: rgba(255, 255, 255, 0.7);
}
.legal a:hover { color: #fff; }

@media (max-width: 1024px) {
  .frame {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 20px;
  }
  .left { text-align: center; }
  .left h1 { font-size: 32px; }
  .bullets, .testi { display: none; }
  .lead { margin-bottom: 8px; }
  .right { max-width: 480px; margin: 0 auto; width: 100%; }
}

@media (max-width: 600px) {
  .login-page { padding-top: 56px; }
  .frame { padding: 24px 16px 40px; gap: 24px; }
  .left h1 { font-size: 24px; }
  .lead { font-size: 14px; }
  .card { padding: 24px 20px; }
  .card h2 { font-size: 19px; }
  .social { grid-template-columns: 1fr; }
  .field input { font-size: 16px; }
}
</style>
