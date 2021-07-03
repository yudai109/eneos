<template>
  <div class="bg-white mx-auto">

    <div class="py-20 mb-10 bg-yellow-400">
        <div class="w-full text-center">
            <p class="text-sm tracking-widest text-white uppercase">ドコモショップスタッフ様専用</p>
            <h1 class="font-bold text-5xl text-white uppercase">
                ENEOSでんき FAQ
            </h1>
        </div>
    </div>

  <div class="block sm:hidden" @click="OpenMenu()">
    <button class="flex items-center px-3 py-2 ml-auto mr-8 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
      <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>

    <nav class="sm:flex flex-col sm:flex-row justify-center" :class="isOpen ? 'block' : 'hidden'">
      <nuxt-link to="/">
        <button
            @click="tabChange(0)"
            :class="{ active: isActive === 0 }"
            class="
            contailer
            text-gray-600
            py-4
            px-6
            block
            hover:text-blue-500
            focus:outline-none
            "
        >
          ホーム
        </button>
      </nuxt-link>

      <!-- カテゴリ一覧 -->
      <!-- <div v-for="(Cate, index) in Cates" :key="Cate.title">
        <nuxt-link :to="{ name: 'category', params: { category: Cate } }">
          <button
              @click="tabChange(index + 1)"
              :class="{ active: isActive === index +1 }"
              class="
              text-gray-600
              py-4
              px-6
              block
              hover:text-blue-500
              focus:outline-none
              "
          >
              {{ Cate }}
          </button>
        </nuxt-link>
      </div> -->


      <!-- カテゴリ一覧 -->
      <div v-for="(Cate, index) in Cates" :key="Cate.title" class="sm:hidden">
        <nuxt-link :to="{ name: 'category', params: { category: Cate } }">
          <button
              @click="tabChange(index + 1)"
              :class="{ active: isActive === index +1 }"
              class="
              text-gray-600
              py-4
              px-6
              block
              hover:text-blue-500
              focus:outline-none
              "
          >
              {{ Cate }}
          </button>
        </nuxt-link>
      </div>

      <div class="relative inline-block hidden sm:block my-auto">
          <button @click="cateOpen()" :class="{ active: isActive === 2 }" class="px-6 py-4 text-gray-600 dark:text-gray-200 hover:text-gray-800 flex items-center space-x-1 focus:outline-none">
            <span>カテゴリー</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div :class="isCateOpen ? 'block' : 'hidden'" class="absolute left-0 z-20 py-1 mt-2 bg-white border border-gray-100 rounded-md shadow-xl dark:border-gray-700 lg:left-auto dark:bg-gray-800">
            <div @click="cateOpen()" class="w-60" v-for="(Cate, index) in Cates" :key="index" >
                <nuxt-link :to="{ name: 'category', params: { category: Cate } }">
                  <button class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      {{ Cate }}
                  </button>
                </nuxt-link>
            </div>
          </div>
      </div>

      <nuxt-link to="/add">
        <button
            @click="tabChange(99)"
            :class="{ active: isActive === 99 }"
            class="
            contailer
            text-gray-600
            py-4
            px-6
            block
            hover:text-blue-500
            focus:outline-none
            "
        >
        新規登録
        </button>
      </nuxt-link>
        <button
            @click="logout()"
            class="
            contailer
            text-gray-600
            py-4
            px-6
            block
            hover:text-blue-500
            focus:outline-none
            "
        >
        ログアウト
        </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
      isOpen: false,
      isCateOpen: false,
      Cates: [],
    };
  },
  methods: {
    tabChange(num) {
      this.isActive = num;
      this.isOpen = !this.isOpen
    },
    logout() {
        this.$store.dispatch('logout')
    },
    OpenMenu() {
      this.isOpen = !this.isOpen
    },
    cateOpen() {
      this.isCateOpen = !this.isCateOpen
      this.isActive = 2;
    }
  },
  mounted() {
    var Cates = this.$store.getters.getCates
    Cates.forEach(cate => {
      this.Cates.push(cate)
    });

    if(this.$route.name == "add") {
      this.isActive = 99;
    }

    // リロード用
    this.$store.subscribe((mutation, state) => {

      if(this.Cates.length == 0) {
        if (mutation.type === "setCates") {
          var Cates = this.$store.getters.getCates
          Cates.forEach(cate => {
            this.Cates.push(cate)
          });
        }
      }
    })

  },
  beforeMount() {
    // カテゴリ空にする
    this.Cates.splice(0)
    console.log('空にしました')
  }
};
</script>

<style scoped>
.active {
  color: #4299e1;
  font-weight: bold;
  border-bottom: 2px solid #4299e1;
}

.isOpen {
  display: none;
}
</style>
