<template>
  <div class="bg-white mx-auto">

    <div class="py-20 mb-10 bg-yellow-400">
        <div class="w-full text-center">
            <p class="text-sm tracking-widest text-white uppercase">ENEOSでんき</p>
            <h1 class="font-bold text-5xl text-white uppercase">
                FAQまとめ
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
      <div v-for="(Cate, index) in Cates" :key="Cate.title">
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
    }
  },
  mounted() {
    console.log(this.Cates.length)

      var Cates = this.$store.getters.getCates
      Cates.forEach(cate => {
        this.Cates.push(cate)
      });
      var category_para = this.$route.params.category;
      this.isActive = this.Cates.indexOf(category_para) + 1;

    console.log('実行')
    // リロード用
    this.$store.subscribe((mutation, state) => {
      if(this.Cates.length == 0) {
        if (mutation.type === "setCates") {
          var Cates = this.$store.getters.getCates
          Cates.forEach(cate => {
            this.Cates.push(cate)
          });
          var category_para = this.$route.params.category;
          this.isActive = this.Cates.indexOf(category_para) + 1;
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
