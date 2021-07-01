<template>
  <div class="m-4">
    <h2 class="text-center text-2xl font-bold text-gray-600 border-b-2 w-11/12 my-8 mx-auto pb-3">{{ $route.params.category }}</h2>
    <ul class="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="item in items" :key="item.title">
        <nuxt-link :to="{ name: 'post', params: { post: item.id } }">

        <div class="py-4 px-6 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
          <div class="whitespace-normal">
            <h2 class="text-gray-800 text-lg font-semibold">{{ item.item.title }}</h2>
            <p class="mt-2 text-gray-600 truncate">{{ item.item.answer }}</p>
          </div>
          <div class="flex justify-end mt-4">
            <a href="#" class="text-sm font-medium text-indigo-500">{{ item.item.category }}</a>
          </div>
        </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      items: [],
      selected_cate: "",
    }
  },
  mounted() {
    var selected_cate = this.$route.params.category
    var itemList =  this.$store.getters.getItems

    var fillteItem = itemList.filter(function( item ) {
        return item.item.category == selected_cate;
    })

    fillteItem.forEach( el => {
      this.items.push(el)
    });

    // リロード用
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setItems") {
        var selected_cate = this.$route.params.category
        var itemList =  this.$store.getters.getItems

        var fillteItem = itemList.filter(function( item ) {
            return item.item.category == selected_cate;
        })

        fillteItem.forEach( el => {
          this.items.push(el)
        });
      }
    })

  },
}
</script>