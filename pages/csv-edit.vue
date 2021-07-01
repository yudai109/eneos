<template>
<div>
  <div class="flex justify-center items-center mt-8">
    <div class="flex-1">
        <div class="mt-8 flex flex-col w-full content-center items-center justify-center bg-grey-lighter">
            <!-- <VueJsonToCsv :json-data="csvData" :csv-title="csvファイルのタイトル" :labels="labels"> -->
            <p class="text-center text-gray-500 text-xl my-4">編集用ファイルダウンロード</p>
                <VueJsonToCsv :json-data="json_data" :labels="labels" :csv-title="'【※編集用】eneosでんきFAQ'">
                    <button @click="editCsvDownload()" class="text-center w-64 bg-yellow-500 rounded text-white font-semibold py-4 px-2 hover:bg-blue-500">ダウンロード</button>
                </VueJsonToCsv>
        </div>
    </div>
    <div class="flex-1 border-l-4">
        <p class="text-center text-gray-500 text-xl my-4">{{ message }}</p>
        <div class="mt-12 flex flex-col w-full content-center items-center justify-center bg-grey-lighter">
                <label class="mt-6 w-64 flex flex-col items-center bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg class="w-8 h-8 mt-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">ファイルを選択</span>
                    <input type='file' class="invisible" @change="loadCsvFile"/>
                </label>
            <button @click="RecordEditCsvData()" class="-mt-4 w-64 bg-blue-500 rounded text-white font-semibold py-4 px-2 hover:bg-yellow-500">編集する</button>
        </div>
    </div>
  </div>
    <div class="mt-10 w-11/12 h-96 mx-auto overflow-x-scroll border-4 shadow-md">
        <table class="table-auto overflow-scroll">
            <thead>
                <tr v-for="(title_data, index) in ImportEditCsvTitles" :key="index" class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th v-for="(title, index) in title_data" :key="index" class="py-3 px-6 text-left">{{ title }}</th>
                </tr>
            </thead>
            <!-- <tbody class="text-gray-600 text-sm font-light"> -->
            <tbody>
                <tr class="border-b border-gray-200 hover:bg-gray-100 truncate" v-for="(imItem, index) in ImportEditCsvItems" :key="index">
                    <td class="py-3 px-6 text-left truncate" v-for="(column, index) in imItem" :key="index">{{ column }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
 
<script>
import VueJsonToCsv from "vue-json-to-csv";

export default {
    layout: 'add',
    components: {
        VueJsonToCsv
    },
  data() {
    return {
        message: "編集データ(.csv)のアップロード",
        ImportEditCsvTitles: [],
        ImportEditCsvItems: [],
        json_data: [],
        labels: {},
    };
  },
  mounted() {
    var faqList = this.$store.state.faqList;

    faqList.forEach(item => {
        var item_blank = {}
        item_blank.docid = item.id
        item_blank.timeStamp = item.item.timestamp
        item_blank.title = item.item.title
        item_blank.category = item.item.category
        item_blank.answer = item.item.answer
        this.json_data.push(item_blank)
        console.log(item_blank)
    });
    console.log(this.json_data)
  },
  methods: {
    loadCsvFile(e) {
        let vm = this;
        vm.ImportEditCsvItems = [];
        vm.message = "";
        let file = e.target.files[0];

    //   if (!file.type.match("text/csv")) {
    //     vm.message = "CSVファイルを選択してください";
    //     return;
    //   }

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            let lines = reader.result.split("\r\n");
            // lines.shift();
            console.log(lines)

        var DataList =   replaceElement(lines, '\"', '')
        // var DataList =   replaceElement(lines, /\r?\n/g, '<br>')
        console.log(DataList);


        let TitleArr = [];
        let linesArr = [];
        
        // タイトル格納
        for (let i = 0; i < 1; i++) {
            TitleArr[i] = DataList[i].split(",");
        }
        // データ格納
        for (let i = 1; i < DataList.length; i++) {
          linesArr[i] = DataList[i].split(",");
        }
        console.log(linesArr)
        vm.ImportEditCsvTitles = TitleArr;
        vm.ImportEditCsvItems = linesArr;
      };

      this.message = "ファイルの再アップロード"
    },
    RecordEditCsvData() {
        this.$store.dispatch("RecordEditCsvData", { EditCsvData: this.ImportEditCsvItems})
    },
    editCsvDownload() {
        // ラベル
        this.labels = {
            docid: { title: "id" },
            timeStamp: { title: "作成日時" },
            title: { title: "タイトル" },
            category: { title: "カテゴリ" },
            answer: { title: "回答" },
        };
    }
  }
};

function replaceElement(array, before, after) {
    for(var i=0; i<array.length; i++){
        array[i] = array[i].replace(before, after);
}
    return array;
}
</script>

<style scoped>
</style>