<template>
  <div class="m-4">
    <!-- 最新の投稿 -->
    <div>
      <h2 class="text-center text-2xl font-bold text-gray-600 border-b-2 w-11/12 my-8 mx-auto pb-3">最新のFAQ</h2>
      <!-- <ul class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> -->
      <ul class="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="item_lt in Items_latest" :key="item_lt.message">
          <nuxt-link :to="{ name: 'post', params: { post: item_lt.id } }">
            <div class="py-4 px-6 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
              <div class="whitespace-normal">
                <h2 class="text-lg text-gray-800 font-semibold">{{ item_lt.item.title }}</h2>
                <p class="text-sm sm:text-md mt-2 text-gray-600 truncate">{{ item_lt.item.answer }}</p>
              </div>
              <div class="flex justify-between mt-4 flex-col sm:flex-row">
                <p class="text-xs font-medium text-gray-300 ">
                  {{ item_lt.item.timestamp.toDate().getFullYear() }}年
                  {{ item_lt.item.timestamp.toDate().getMonth()+1 }}月
                  {{ item_lt.item.timestamp.toDate().getDay() }}日
                  <br>
                  {{ item_lt.item.timestamp.toDate().getHours() }}時
                  {{ item_lt.item.timestamp.toDate().getMinutes() }}分
                  {{ item_lt.item.timestamp.toDate().getSeconds() }}秒
                  </p>
                  <a href="#" class="mt-2 sm:mt-4 text-xs font-medium text-indigo-500">{{ item_lt.item.category }}</a>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!-- カテゴリ別投稿 -->
    <div>
      <h2 class="text-center text-2xl font-bold text-gray-600 border-b-2 w-11/12 my-8 mx-auto pb-3">カテゴリ別投稿</h2>
      <ul class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <li v-for="(Cate) in Cates" :key="Cate">
          <nuxt-link :to="{ name: 'category', params: { category: Cate } }">
            <div class="py-4 px-6 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
              <div class="whitespace-normal">
                <h2 class="text-gray-800 text-2xl font-semibold pb-2 mb-2 border-b-4">{{ Cate }}</h2>
                <ul>
                  <li v-for="item in Items" :key="item.message">
                    <p v-if="item.item.category === Cate">
                      <nuxt-link :to="{ name: 'post', params: { post: item.id } }">
                        <p class="border-b px-2 py-3 text-left font-medium text-blue-500 hover:text-yellow-400">{{ item.item.title }}</p>
                      </nuxt-link>
                    </p>
                  </li>
                </ul>
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
    // this.$store.dispatch("getItems")

    var i = 1
    var Items = this.$store.getters.getItems
    var Cates = this.$store.getters.getCates

    Items.forEach(item => {
      this.Items.push(item)
    });
    Items.forEach(item => {
      if(i < 5) {
        this.Items_latest.push(item)
        i += 1;
      }
    });

    Cates.forEach(cate => {
      this.Cates.push(cate)
    });

    // リロード用
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setItems") {
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
      if (mutation.type === "setCates") {
        Cates.forEach(cate => {
          this.Cates.push(cate)
        });
      }
    })
  },
}
</script>