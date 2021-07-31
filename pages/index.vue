<template>
  <main>
    <div class="animated-border w-full h-full">
      <div class="w-full h-full grid grid-cols-2 800:grid-cols-3 relative z-20">
        <div v-for="n of 12" :key="n" class="flex items-center justify-center">
          <img
            v-if="index === n"
            src="../assets/email.png"
            @click="onClick(n)"
            class="email-shake w-24 800:w-32 h-auto object-contain"
            draggable="false"
          />
        </div>
      </div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div class="px-8 800:px-16 1000:px-32">
          <Heading />
        </div>
      </div>
      <div 
        class="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 delay-75 z-40"
        :class="isStarted ? 'opacity-0' : 'opacity-100'"
      >
        <div class="flex items-center justify-center"> 
          <button 
            @click="startGame"
            class="px-6 py-2 rounded-full font-display uppercase bg-purple bg-opacity-75 hover:text-yellow transition-all duration-300 text-16 shadow-cta hover:shadow-none"
          >
            Start
          </button>
        </div>
      </div>
      
      <div class="fixed top-8 right-8 z-40"> 
        <button 
          @click="toggleModal"
          class="relative block w-8 h-8 border border-blue text-blue hover:bg-blue hover:text-white rounded-full transition-colors duration-300"
        >
          <span class="absolute left-1/2 top-px transform -translate-x-1/2 flex items-center justify-center text-24 font-display align-baseline leading-none">i</span>
        </button>
      </div>
      
      <div 
        class="fixed inset-0 w-full h-full z-50 bg-hazy transition-all duration-300"
        :class="isOpen ? 'visible opacity-100' : 'invisible opacity-0'" 
      >
        <div 
          class="absolute right-0 top-0 bottom-0 h-full w-3/4 800:w-1/4 bg-blue text-white transform transition-transform duration-300"
          :class="isOpen ? 'translate-x-0' : 'translate-x-full'"  
        >
          <div class="p-4 h-full flex flex-col">
            <div class="h-16 w-full"> 
              <button 
                @click="toggleModal"
                class="relative w-8 h-8"
              >
                <span class="block absolute h-px w-6 left-0 top-1/2 transform rotate-45 bg-white"></span>
                <span class="block absolute h-px w-6 left-0 top-1/2 transform -rotate-45 bg-white"></span>
              </button>
            </div>
            <div class="flex flex-col h-full justify-between font-display text-16 leading-tight">
              <div>
                <p class="mb-4">
                  Put your productivity to the test and try to reach the infamous <span class="font-bold uppercase">&ldquo;inbox zero&rdquo;</span> before the timer ends.
                </p>
                <p>Click the emails as they appear to remove them from your inbox.</p>
              </div>
              <div class="flex flex-col text-12 font-light uppercase"> 
                <span class="mb-1">Created by <a class="border-b border-white" href="https://madisonhardt.com/" alt="Madison Hardt" target="_blank">Madison Hardt</a></span>
                <span>Built with Vue (Nuxt) and TailwindCSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        class="fixed bottom-0 left-0 right-0 font-display font-light transition-opacity duration-300 delay-75"
        :class="isStarted ? 'opacity-100' : 'opacity-0'"
      > 
        <div class="px-8 py-10">
          <div 
            class="relative flex flex-col 800:flex-row items-center w-full 800:justify-between border border-black rounded-full px-6 py-2 transition-colors duration-300"
            :class="isOver ? 'bg-yellow' : 'bg-transparent'"
          > 
            <div class="transition-opacity" :class="isOver ? 'opacity-0' : 'opacity-100'"> 
              <span>Unread emails: {{ emails }}</span>
            </div>
            <div class="transition-opacity" :class="isOver ? 'opacity-0' : 'opacity-100'"> 
              <span>{{ formattedTimeLeft }}</span>
            </div>
            <div
              class="absolute w-full flex items-center justify-center transition-opacity duration-300 delay-100"
              :class="isOver ? 'opacity-100' : 'opacity-0'"
            >
              <span class="uppercase font-bold">Game over</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Heading from "../components/heading.vue"

const timeLimit = 30;

export default {
  components: {
    Heading,
  },
  data() {
    return {
      index: 0,
      timer: undefined,
      timePassed: 0,
      timerInterval: null,
      emails: 30,
      isStarted: false,
      isOver: false,
      isOpen: false,
    };
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
    timeLeft() {
      return timeLimit - this.timePassed;
    }
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.endGame();
      }
    }
  },
  methods: {
    generateIndex() {
      this.index = Math.floor(Math.random() * 12);
    },
    startGame() {
      this.isStarted = true;
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
      this.timer = setInterval(this.generateIndex, 900);
    },
    endGame() {
      this.isOver = true;
      clearInterval(this.timerInterval);
      clearInterval(this.timer);
      this.index = 0;
    },
    onClick(n) {
      if (this.index === n) {
        this.emails--;
      }
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  mounted () {
    // dynamic viewport height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
}
</script>

<style>
@keyframes shadow {
  0% {
    box-shadow: inset -0.9rem -0.9rem 1rem rgb(0 255 66 / 50%), inset 0.9rem 0.9rem 1rem rgb(228 255 0 / 93%), inset 0.9rem -0.9rem 1rem rgb(98 98 255 / 73%), inset -0.9rem 0.9rem 1rem rgb(255 0 247);
  }
  100% {
    box-shadow: inset 0.9rem 0.9rem 1rem rgb(228 255 0 / 93%), inset 0.9rem -0.9rem 1rem rgb(98 98 255 / 73%), inset -0.9rem 0.9rem 1rem rgb(255 0 247), inset -0.9rem -0.9rem 1rem rgb(0 255 66 / 50%);
  }
}

@keyframes shake {
  0% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(20deg);
  }
}

main {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

.animated-border {
  animation: shadow 4s infinite alternate;
}

.email-shake {
  animation: shake 600ms infinite alternate;
}
</style>