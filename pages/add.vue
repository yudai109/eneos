<template>
  <div class="flex justify-center items-center mt-8">
    <div class="z-50 modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50" :class="isOK ? 'block' : 'hidden'">
      <h2 class="text-white text-2xl font-semibold">登録しました！</h2>
    </div>
    <div class="h-screen w-full bg-black bg-opacity-50">
      <div
        class="
          flex
          max-w-md
          w-11/12
          justify-center
          bg-white
          shadow-md
          rounded-lg
          mx-auto
          flex flex-col
          p-5
          mt-5
        "
      >

        <h3 class="text-2xl font-bold mb-4 text-center">FAQの追加</h3>
        <!-- This is the input component -->
        <div class="relative h-10 input-component mb-5">
          <input
              v-model="addData.title"
            id="title"
            type="text"
            name="title"
            class="
              h-full
              w-full
              border-gray-300
              p-2
              transition-all
              border-blue
              rounded-sm
            "
          />
          <label for="title" class="absolute left-2 transition-all bg-white px-1">
            タイトル
          </label>
        </div>


        <!-- This is the input component -->
        <!-- <div class="relative h-10 input-component mb-5">
          <select>
            <option value="料金">料金</option>
          </select>
          <input
          v-model="category"
            id="category"
            type="text"
            name="category"
            class="
              h-full
              w-full
              border-gray-300
              p-2
              transition-all
              border-blue
              rounded-sm
            "
          />
        </div> -->

        <!-- <div class="relative inline-block w-full text-gray-700"> -->
        <div class="relative h-10 input-component mb-5">
          <label
            for="category"
            class="absolute left-2 transition-all bg-white px-1"
          >
            カテゴリ
          </label>
          <select v-model="addData.category" class="w-full h-10 pl-3 pr-6 text-base bg-white border border-gray-300 rounded appearance-none focus:shadow-outline" placeholder="選択してください">
            <option>料金</option>
            <option>支払い・請求</option>
            <option>接客・オペレーション</option>
            <option>工事</option>
            <option>申込操作</option>
            <option>キャンペーン</option>
            <option>その他</option>
          </select>

          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </div>
        </div>

        <!-- This is the input component -->
        <div class="relative input-component empty">
          <textarea
            v-model="addData.answer"
            id="answer"
            type="text"
            name="answer"
            rows="8"
            class="
              w-full
              border border-gray-300
              p-2
              transition-all
              focus:border-blue-500
              focus:outline-none
              rounded-sm
            "
          ></textarea>
          <label
            for="answer"
            class="absolute left-2 transition-all bg-white px-1"
          >
            回答
          </label>
        </div>
        <div class="relative input-component empty text-center">
          <button class="w-full bg-blue-400 text-white p-3 rounded-md" @click="addCountent()">登録</button>
        </div>
        <div class="relative input-component empty text-center mt-6">
          <nuxt-link to="/upload" ><button class="w-full bg-green-400 text-white p-3 rounded-md">CSV一括登録はこちら</button></nuxt-link>
        </div>
        <div class="relative input-component empty text-center mt-6">
          <nuxt-link to="/csv-edit" ><button class="w-full bg-gray-400 text-white p-3 rounded-md">CSV一括編集はこちら</button></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  layout: 'add',
  data() {
    return {
      addData: {
        title: "",
        category: "",
        answer: "",
      },
      isOK: false,
    };
  },
  methods: {
    addCountent: function () {
      this.isOK = !this.isOK;
      this.$store.dispatch("addCountent", {addData: this.addData})
    },
  },
};
</script>



<style>
label {
  top: 0%;
  transform: translateY(-50%);
  font-size: 11px;
  color: rgba(37, 99, 235, 1);
}
.empty input:not(:focus) + label {
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
}
input:not(:focus) + label {
  color: rgba(70, 70, 70, 1);
}
input {
  border-width: 1px;
}
input:focus {
  outline: none;
  border-color: rgba(37, 99, 235, 1);
}
</style>
