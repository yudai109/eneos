import { firestore } from "../plugins/firebase"
import { auth } from "../plugins/firebase"

export const state = () => ({
    isSignedIn: false,
    uid: null,
    faqList: [],
    cateList: [],
});

export const mutations = {
    setSignInState(state, isSignedIn, uid) {
        state.isSignedIn = isSignedIn;
        state.uid = uid;
    },
    setItems(state, faq_blank) {
        faq_blank.forEach(item => {
            state.faqList.push(item)
        })
    },
    setCates(state, cate_blank_uni) {
        cate_blank_uni.forEach(item => {
            state.cateList.push(item)
        })
    },
    resetArry(state) {
        state.cateList.splice(0)
        state.faqList.splice(0)
    },
}

export const getters = {
    getItems(state) {
      return state.faqList;
    },
    getCates(state) {
      return state.cateList;
    },
  };

export const actions = {
    login({ commit }, { email, password }) {
        auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            commit("setSignInState", true, user.uid);
            this.$router.push('/')
        }).catch(error => {
            console.log(error)
        })
    },
    logout({ commit, state }) {
        auth().signOut()
        .then(() => {
            commit("setSignInState", false);
            this.$router.push('/login')
        })
    },
    getItems({ commit }) {
        var faq_blank = []
        var cate_blank = []
        
        firestore().collection("faq").orderBy("timestamp", "asc").get().then((qs) => {
            qs.forEach((doc) => {
                var doc_item = {}
                doc_item.id = doc.id
                doc_item.item = doc.data()
                faq_blank.unshift(doc_item)
                cate_blank.push(doc.data().category)
            })
        }).then(() => {
            // カテゴリの重複削除
            var cate_blank_uni = [...new Set(cate_blank)]
            commit("setItems", faq_blank)
            commit("setCates", cate_blank_uni)
        }).then(() => {
            console.log(this.state.faqList)
            console.log(this.state.cateList)
        })
    },
    addCountent({commit}, {addData}) {
        var yn = confirm('登録してOKですか？')
        if(yn) {
            firestore().collection("faq").add({
                timestamp: firestore.FieldValue.serverTimestamp(),
                title: addData.title,
                category: addData.category,
                answer: addData.answer,
            }).then(() => {
                this.$store.commit('resetArry')
            }).then(() => {
                this.$store.dispatch('getItems')
            }).then(() => {
                setTimeout(() => {
                    this.$router.push('/')
                },1000)
            });
        }
    },
    async RecordCsv({commit}, {csvData}) {
        var yn = confirm("本当に登録してよいですか？")
        if(yn) {
            await csvData.shift();
            await csvData.pop();
            await csvData.forEach(data => {
                firestore().collection('faq').add({
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    title: data[1],
                    category: data[0],
                    answer: data[2],
                })
            })
            await alert('登録しました！')
            await setTimeout(() => {
                this.$router.push('/')
            }, 1500);
        }
        
    },
    async RecordEditCsvData({commit}, {EditCsvData}) {
        var yn = confirm("本当に登録してよいですか？")
        if(yn) {
            await EditCsvData.shift();
            await EditCsvData.pop();
            await EditCsvData.forEach(data => {
                console.log(data)
                firestore().collection('faq').doc(data[0]).update({
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    title: data[2],
                    category: data[3],
                    answer: data[4],
                })
            })
            await alert('登録しました！')
            await setTimeout(() => {
                this.$router.push('/')
            }, 1500);
        }
        
    },
    csvUpdate({commit}, {updateCsv}) {
        // var yn = confirm("本当に登録してよいですか？")
        // if(yn) {
        //     console.log(csvData)
        //     firestore().collection('faq').doc(edititems.docid).update({
        //         // timestamp: firestore.FieldValue.serverTimestamp(),
        //         title: edititems.title,
        //         category: edititems.category,
        //         answer: edititems.answer,
        //     })
        //     .then(() => {
        //         setTimeout(() => {
        //             alert("編集しました")
        //         }, 500);
        //     }).then(() => {
        //         setTimeout(() => {
        //             this.$router.push('/')
        //         }, 1000);
        //     })
        // }
    },
    editItem({commit}, {edititems}) {
        var yn = confirm("本当に編集してよいですか？")
        if(yn) {
            firestore().collection('faq').doc(edititems.docid).update({
                // timestamp: firestore.FieldValue.serverTimestamp(),
                title: edititems.title,
                category: edititems.category,
                answer: edititems.answer,
            })
            .then(() => {
                setTimeout(() => {
                    alert("編集しました")
                }, 500);
            }).then(() => {
                setTimeout(() => {
                    this.$router.push('/')
                }, 1000);
            })
        }
    },
    deleteItem({commit}, {docid}) {
        var yn = confirm("本当に削除してよいですか？")
        if(yn) {
            firestore().collection('faq').doc(docid).delete()
            .then(() => {
                alert("削除しました")
            })
        }
    }
}