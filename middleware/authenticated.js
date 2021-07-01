import { auth } from "../plugins/firebase"

export default function ({store, route, redirect}) {
    // ログインページでない場合
    if(route.path !== '/login') {
        auth().onAuthStateChanged(user => {
            if (!user) {
                return redirect('/login')
            }
        })
        // ログインページの場合
    } else if (route.path === '/login') {
        auth().onAuthStateChanged(user => {
            if (user) {
                setTimeout(() => {
                    return redirect('/')
                }, 2000);
            }
        })
    }
  }