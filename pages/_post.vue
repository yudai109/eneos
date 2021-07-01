<template>
    <div class="m-4">
        <h1 class="text-center text-3xl font-bold text-gray-600 border-b-2 w-11/12 my-8 pb-3">{{ $route.params.category }}</h1>
        <div class="py-4 px-8 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between mt-4 mb-2">
            <a :class="isedit ? 'hidden' : 'inline'" href="#" class="text-xl font-medium text-indigo-500">{{ category }}</a>
            <a :class="isedit ? 'inline' : 'hidden'" href="#" class="text-xl font-medium text-gray-500">編集中</a>
            <div class="flex justify-between">
                <button @click="edit_btn()" class="btn px-4 py-2 mr-2 bg-green-400 rounded text-white">編集</button>
                <button @click="deleteItem()" class="btn px-4 py-2 mr-2 bg-red-400 rounded text-white">削除</button>
            </div>
        </div>
        <div class="whitespace-normal" :class="isedit ? 'hidden' : 'block'">
            <h2 class="text-gray-800 text-ls font-semibold border-b-2 border-gray-300 pb-2 mb-3">{{ title }}</h2>
            <p class="mt-2 text-gray-600 whitespace-pre-wrap">{{ answer }}</p>
        </div>
        
        <!-- 編集用 -->
        <div :class="isedit ? 'block' : 'hidden'">
            <div class="relative h-10 input-component mb-5">
                <label
                    for="category"
                    class="absolute left-2 transition-all bg-white px-1"
                >
                    カテゴリ
                </label>
                <select v-model="category" class="w-full h-10 pl-3 pr-6 text-base bg-white border border-gray-300 rounded appearance-none focus:shadow-outline" placeholder="選択してください">
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

            <div class="whitespace-normal">
                <div class="mb-2 bprder-b-2 border-gray-300">
                    <label for="title">タイトル</label>
                    <input id="title" v-model="title" class=" w-full text-xl p-2 border border-gray-300 border-b-2 rounded-sm focus:outline-none focus:border-blue-500 focus:shadow-sm">
                </div>
                <div class="">
                    <label>回答</label>
                    <textarea
                    v-model="answer"
                    rows="6"
                    class="
                        w-full
                        border border-gray-300
                        p-2
                        transition-all
                        focus:border-blue-500
                        focus:outline-none
                        rounded-sm
                    ">
                    </textarea>
                </div>
                <button @click="editItem()" class="btn px-4 py-2 mr-2 bg-green-600 rounded text-white">編集確定</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "post",
    data() {
        return {
            title: "",
            timeStamp: "",
            category: "",
            answer: "",
            docid: this.$route.params.post,
            isedit: false,
        }
    },
    mounted() {
        var id = this.$route.params.post
        var itemList =  this.$store.getters.getItems

        var fillteItem = itemList.filter(function( item ) {
            return item.id == id;
        })

        console.log(fillteItem)
        fillteItem.forEach( el => {
            this.title = el.item.title
            this.timeStamp = el.item.timeStamp
            this.category = el.item.category
            this.answer = el.item.answer.replaceAll('<br>', '\n\r')
        });
    },
    methods: {
        edit_btn: function() {
            this.isedit = !this.isedit
        },
        editItem: function() {
            var edititems = {}
            edititems.docid = this.$route.params.post;
            edititems.title = this.title;
            edititems.timeStamp = this.timeStamp;
            edititems.category = this.category;
            edititems.answer = this.answer;
            this.$store.dispatch("editItem", {edititems: edititems})
            .then(() => {
                this.$store.commit('resetArry')
            }).then(() => {
                this.$store.dispatch('getItems')
            }).then(() => {
            // setTimeout(() => {
            //     this.$router.push({ path:'/', query: this.docid })
            // },1500)
            });
        },
        deleteItem: function() {
            this.$store.dispatch("deleteItem", {docid: this.$route.params.post})
            .then(() => {
            this.$store.commit('resetArry')
            }).then(() => {
            this.$store.dispatch('getItems')
            }).then(() => {
            setTimeout(() => {
                this.$router.push('/')
            },1500)
            });
        }
    }
}
</script>