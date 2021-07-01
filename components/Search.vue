<template>
  <div class="m-4">
    <!-- 検索窓 -->
    <div class="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky" style="top: 5px">
        <div @click="back()">
            <div class="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg class="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <input v-model="keyword" class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="キーワードで検索...">
        <div class="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
            <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>
    <div v-show="this.keyword != ''">
      <h2 class="text-center text-3xl font-bold text-gray-600 border-b-2 w-11/12 my-8 mx-auto pb-3">検索結果</h2>
      <ul class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <li v-for="fl_item in filteredItems" :key="fl_item.message">
          <nuxt-link :to="{ name: 'post', params: { post: fl_item.id } }">
            <div class="py-4 px-8 bg-white shadow-lg rounded-lg">
              <div class="whitespace-normal">
                <h2 class="text-blue-500 text-xl font-semibold">{{ fl_item.item.title }}</h2>
                <p class="mt-2 text-gray-500 truncate">{{ fl_item.item.answer }}</p>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data() {
    return {
      keyword:'',
      Items: [],
      Items_latest: [],
      Cates: [],
      selected: null,
    }
  },
  methods: {
    back() {
        this.$router.go(-1);
    },
  },
  computed: {
    filteredItems: function() {
      var Fld_Items = [];
      this.Items.forEach(Item => {
        if(Item.item.title.indexOf(this.keyword) != -1) {
          Fld_Items.push(Item);
        } else if (Item.item.answer.indexOf(this.keyword) != -1) {
          Fld_Items.push(Item);
        }
      })
      return Fld_Items;
    },
  },
  mounted() {
    // getItemsの初期実行
    var param_name = this.$route.name
    if(param_name == "post") {
        this.keyword = '';
    }

    if(this.Items.length == 0) {
        var i = 1
        var Items = this.$store.getters.getItems
        var Cates = this.$store.getters.getCates
    
        Items.forEach(item => {
          this.Items.push(item)
        });
    
        Cates.forEach(cate => {
          this.Cates.push(cate)
        });
    
      // リロード用
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === "setItems") {
          this.Items.splice(0)
          var Items = this.$store.getters.getItems

            Items.forEach(item => {
              this.Items.push(item)
            });
            Items.forEach(item => {
              if(i < 5) {
                console.log(item)
                this.Items_latest.push(item)
                i += 1;
              }
            });
        }
      })
    
      this.$store.subscribe((mutation, state) => {
        if (this.Cates.length == 0) {
          if (mutation.type === "setCates") {
            Cates.forEach(cate => {
              this.Cates.push(cate)
            });
          }
        }
      })
    }
  },
}
</script>

