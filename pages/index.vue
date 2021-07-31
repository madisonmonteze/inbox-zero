<template>
  <main>
    <div class="animated-border w-full h-full">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div class="px-8 800:px-16 1000:px-32">
          <Heading />
          <div class="flex items-center justify-center mt-8"> 
            <button 
              @click="startGame"
              class="px-6 py-2 rounded-full font-display uppercase bg-purple bg-opacity-75 hover:text-purple hover:bg-yellow transition-colors duration-300 text-16"
            >
              Start
            </button>
          </div>
        </div>
      </div>
      <div class="fixed top-0 left-0 right-0">
        <p class="px-8 py-10 font-display font-light text-16 800:text-20 leading-tight w-full text-center">
          Put your productivity to the test and try to reach the infamous <span class="font-bold uppercase">&ldquo;inbox zero&rdquo;</span> before the timer ends.
        </p>
      </div>

      
      <div class="fixed bottom-0 left-0 right-0 font-display font-light"> 
        <div class="px-8 py-10">
          <div class="flex flex-col 800:flex-row items-center w-full 800:justify-between border border-black rounded-full px-6 py-2"> 
            <div> 
              <span>Unread emails: {{ emails }}</span>
            </div>
            <div> 
              <span>Seconds: {{ seconds }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Email from "../components/email.vue"
import Heading from "../components/heading.vue"

export default {
  components: {
    Email,
    Heading,
  },
  data() {
    return {
      index: 0,
      seconds: 20,
      emails: 10,
    };
  },
  methods: {
    generateIndex() {
      this.index = Math.floor(Math.random() * 6);
    },
    startGame() {
      if(this.seconds > 0) {
          setTimeout(() => {
              this.seconds -= 1
          }, 1000)
      }
    },
    endGame() {
      clearInterval(this.seconds);
      this.emails = 0;
      this.index = 0;
    },
    onClick(n) {
      if (this.index === n) {
        this.emails++;
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.seconds);
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

main {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

.animated-border {
  animation: shadow 4s infinite alternate;
}
</style>