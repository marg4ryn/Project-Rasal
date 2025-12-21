<template>
  <AppButtonClose />
  <section class="about">
    <div class="about-header">
      <h2 class="about-header-title">
        <img src="/logo.svg" class="about-header-logo" />
        <span>uasar</span>
      </h2>
    </div>

    <div class="about-content">
      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="15.75" stroke="#60A5FA" stroke-width="1.125" fill="none" />
            <circle cx="18" cy="18" r="2.25" fill="#60A5FA" />
            <path d="M18 4.5 L20.25 15.75 L18 18 L15.75 15.75 Z" fill="#60A5FA" />
            <path d="M31.5 18 L20.25 20.25 L18 18 L20.25 15.75 Z" fill="#A78BFA" />
            <path d="M18 31.5 L15.75 20.25 L18 18 L20.25 20.25 Z" fill="#C084FC" />
            <path d="M4.5 18 L15.75 15.75 L18 18 L15.75 20.25 Z" fill="#8B5CF6" />
          </svg>
          {{ t('about.description.title1') }}
        </h3>
        <p class="about-section-text">{{ t('about.description.p1') }}</p>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4.5" y="19.69" width="5.63" height="11.25" fill="#60A5FA" />
            <rect x="4.5" y="18.56" width="5.63" height="1.13" fill="#93C5FD" />
            <rect x="12.38" y="11.25" width="6.75" height="19.69" fill="#A78BFA" />
            <rect x="12.38" y="10.13" width="6.75" height="1.13" fill="#C4B5FD" />
            <rect x="21.38" y="15.75" width="4.5" height="15.19" fill="#8B5CF6" />
            <rect x="21.38" y="14.63" width="4.5" height="1.13" fill="#A78BFA" />
            <rect x="28.13" y="22.5" width="4.5" height="8.44" fill="#60A5FA" />
            <rect x="28.13" y="21.38" width="4.5" height="1.13" fill="#93C5FD" />
            <line x1="0" y1="30.94" x2="36" y2="30.94" stroke="#475569" stroke-width="1.125" />
          </svg>
          {{ t('about.description.title2') }}
        </h3>
        <p class="about-section-text">{{ t('about.description.p2') }}</p>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="4.5" fill="#FCD34D">
              <animate attributeName="r" values="4.5;5.63;4.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="18" cy="18" r="7.88" fill="#FCD34D" opacity="0.4">
              <animate
                attributeName="r"
                values="7.88;10.13;7.88"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="18" cy="18" r="11.25" fill="#FCD34D" opacity="0.2">
              <animate
                attributeName="r"
                values="11.25;13.5;11.25"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <path d="M18 2.25 L19.13 15.75 L18 18 L16.88 15.75 Z" fill="#FBBF24" />
            <path d="M33.75 18 L20.25 19.13 L18 18 L20.25 16.88 Z" fill="#FBBF24" />
            <path d="M18 33.75 L16.88 20.25 L18 18 L19.13 20.25 Z" fill="#FBBF24" />
            <path d="M2.25 18 L15.75 16.88 L18 18 L15.75 19.13 Z" fill="#FBBF24" />
          </svg>
          {{ t('about.description.title3') }}
        </h3>
        <p class="about-section-text">{{ t('about.description.p3') }}</p>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="15" r="3.94" fill="#60A5FA" />
            <path
              d="M18 15.75 C13.5 15.75 11.25 18 11.25 21.38 L24.75 21.38 C24.75 18 22.5 15.75 18 15.75 Z"
              transform="translate(0,6)"
              fill="#60A5FA"
            />
            <circle cx="9" cy="17" r="2.81" fill="#A78BFA" />
            <path
              d="M9 16.88 C6.19 16.88 4.5 18.56 4.5 20.81 L13.5 20.81 C13.5 19.69 12.38 18 10.13 17.44 Z"
              transform="translate(0,6)"
              fill="#A78BFA"
            />
            <circle cx="27" cy="17" r="2.81" fill="#A78BFA" />
            <path
              d="M27 16.88 C29.81 16.88 31.5 18.56 31.5 20.81 L22.5 20.81 C22.5 19.69 23.63 18 25.88 17.44 Z"
              transform="translate(0,6)"
              fill="#A78BFA"
            />
          </svg>
          {{ t('about.description.title4') }}
        </h3>
        <p class="about-section-text">{{ t('about.description.p4') }}</p>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 39 C24 39 9 28.5 9 18 C9 13.5 12 10.5 15.75 10.5 C18.75 10.5 21.75 12.75 24 15 C26.25 12.75 29.25 10.5 32.25 10.5 C36 10.5 39 13.5 39 18 C39 28.5 24 39 24 39 Z"
              transform="scale(0.675) translate(6,3)"
              fill="#EC4899"
            />
            <path
              d="M21 21 L22.5 25.5 L27 25.5 L23.25 28.5 L24.75 33 L21 30 L17.25 33 L18.75 28.5 L15 25.5 L19.5 25.5 Z"
              transform="scale(0.675) translate(6,3)"
              fill="#FCD34D"
            />
            <circle cx="18" cy="14.63" r="1.5" fill="#FDE68A" />
            <circle cx="24" cy="17.06" r="1.13" fill="#FDE68A" />
            <circle cx="13" cy="17.06" r="1.13" fill="#FDE68A" />
          </svg>
          {{ t('about.description.title5') }}
        </h3>
        <p class="about-section-text">{{ t('about.description.p5') }}</p>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            :style="{
              width: '28px',
              height: '28px',
              color: '#22c55e',
              flexShrink: 0,
            }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {{ t('about.technologies.title') }}
        </h3>
        <ul class="about-section-list about-section-list--tech">
          <li class="about-section-list__item about-section-list__item--tech">
            <span class="about__tech-label">{{ t('about.technologies.frontendLabel') }}:</span>
            <div class="tech-logos">
              <a
                href="https://www.typescriptlang.org/docs/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  alt="TypeScript"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://vuejs.org/guide/introduction.html"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                  alt="Vue.js"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://sass-lang.com/documentation/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
                  alt="SCSS"
                  class="tech-logo"
                />
              </a>
            </div>
          </li>
          <li class="about-section-list__item about-section-list__item--tech">
            <span class="about__tech-label"
              >{{ t('about.technologies.visualizationsLabel') }}:</span
            >
            <div class="tech-logos">
              <a
                href="https://threejs.org/docs/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"
                  alt="Three.js"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://d3js.org/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg"
                  alt="D3.js"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://www.chartjs.org/docs/latest/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://www.chartjs.org/media/logo-title.svg"
                  alt="Chart.js"
                  class="tech-logo"
                />
              </a>
            </div>
          </li>
          <li class="about-section-list__item about-section-list__item--tech">
            <span class="about__tech-label">{{ t('about.technologies.backendLabel') }}:</span>
            <div class="tech-logos">
              <a
                href="https://docs.oracle.com/en/java/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                  alt="Java"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://spring.io/projects/spring-boot"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
                  alt="Spring Boot"
                  class="tech-logo"
                />
              </a>
              <a
                href="https://www.mongodb.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                  alt="MongoDB"
                  class="tech-logo"
                />
              </a>
            </div>
          </li>
          <li class="about-section-list__item about-section-list__item--tech">
            <span class="about__tech-label">{{ t('about.technologies.analysisLabel') }}:</span>
            <div class="tech-logos">
              <a
                href="https://git-scm.com/doc"
                target="_blank"
                rel="noopener noreferrer"
                class="tech-logo-link"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                  alt="Git"
                  class="tech-logo"
                />
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div class="about-section">
        <h3 class="about-section-title">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.75"
              y="6"
              width="34.5"
              height="24"
              rx="1.5"
              stroke="#8b5cf6"
              stroke-width="1.5"
            />
            <circle cx="10.5" cy="16.5" r="2.25" fill="#60A5FA" />
            <path
              d="M10.5 19.5 L7.5 22.5 M10.5 19.5 L13.5 22.5"
              stroke="#60A5FA"
              stroke-width="1.5"
            />
            <rect x="18" y="15" width="13.5" height="2.25" rx="0.75" fill="#A78BFA" />
            <rect x="18" y="19.5" width="10.5" height="2.25" rx="0.75" fill="#A78BFA" />
          </svg>
          {{ t('about.team.title') }}
        </h3>
        <p class="about__supervisor">
          <span class="about__supervisor-label">{{ t('about.team.supervisorLabel') }}:</span>
          {{ t('about.team.supervisorDegree') }} {{ supervisor }}
        </p>
        <ul class="about-section-list about-section-list--team">
          <li
            v-for="(member, index) in teamMembers"
            :key="index"
            class="about-section-list__item about-section-list__item--member"
          >
            <a
              :href="member.link"
              target="_blank"
              rel="noopener noreferrer"
              class="about__member-link"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="15" stroke="#8b5cf6" stroke-width="2" />
                <circle cx="16" cy="12" r="4" fill="#8b5cf6" />
                <path
                  d="M32 36 C20 36 12 42 12 52 C12 56 12 58 12 58 L52 58 C52 58 52 56 52 52 C52 42 44 36 32 36 Z"
                  transform="scale(0.4) translate(8,6)"
                  fill="#8b5cf6"
                />
              </svg>

              <span class="about__member-name">
                {{ member.name }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { t } from '@/plugins/i18n'
  import AppButtonClose from '@/components/common/AppButtonClose.vue'

  const teamMembers = [
    { name: 'Wiktor Piekarski', link: 'https://github.com/Vixoner' },
    { name: 'Jan Powęski', link: 'https://github.com/marg4ryn' },
    { name: 'Michał Sosnowski', link: 'https://github.com/SosnowskiMichal' },
    { name: 'Michał Wąsiński', link: 'https://github.com/micwasi15' },
  ]
  const supervisor = 'Michał Szczepanik'
</script>

<style scoped lang="scss">
  .about {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding: 3rem 0.5rem;
    overflow-y: auto;
    max-width: 900px;
    margin: 0 auto;
    animation: fadeInUp 0.6s ease-out;

    &-header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid var(--color-border);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #fd98eb, transparent);
      }

      &-title {
        font-size: 3rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        margin: 0;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      &-logo {
        width: 50px;
        margin-right: 2px;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &-section {
      background: var(--color-bg-primary);
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid var(--color-border);
      transition: all 0.3s ease;

      &-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0 0 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      &-text {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin: 0 0 1rem;
        text-align: justify;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        &--tech {
          gap: 1rem;
        }

        &--team {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        }

        &__item {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          display: flex;
          align-items: stretch;

          &--tech {
            padding: 0.75rem;
            background: var(--color-bg-secondary);
            border-radius: 0.5rem;
            border-left: 3px solid var(--color-success);
            transition: all 0.2s ease;
          }

          &--member {
            background: var(--color-bg-secondary);
            border-radius: 0.5rem;
            border: 1px solid var(--color-border);
            transition: all 0.2s ease;
            align-items: center;

            &:hover {
              border-color: #8b5cf6;
              box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
              transform: scale(1.02);
            }
          }
        }
      }
    }

    &__member-link {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
      padding: 1rem;
      border-radius: 0.5rem;
      transition:
        background-color 0.2s ease,
        transform 0.2s ease;

      &:focus-visible {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
      }
    }

    &__tech-label {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #22c55e;
      min-width: 120px;
    }

    .tech-logos {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .tech-logo-link {
      display: inline-flex;
      align-items: center;
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
      background-color: #ffffff;
      padding: 4px;
      border-radius: 4px;

      &:hover {
        transform: translateY(-2px);
        opacity: 0.8;
      }
    }

    .tech-logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    &__supervisor {
      margin-bottom: 2rem;
      padding: 1rem;
      background: var(--color-bg-secondary);
      border-radius: 0.5rem;
      border: 2px solid #8b5cf6;
      font-size: 1rem;
      color: var(--color-text-secondary);
      text-align: center;
    }

    &__supervisor-label {
      font-weight: 600;
      color: #8b5cf6;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
