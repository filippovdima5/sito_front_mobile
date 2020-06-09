import React  from 'react'
import { Scope } from 'effector/fork'
import { Provider } from 'effector-react/ssr'
import { AppTemplate } from './features/app-template'
import { ListenLocation } from './features/listen-location'


export function App({ root }: { root: Scope }) {
  return(
    <Provider value={root}>
      <ListenLocation/>
      <AppTemplate/>
    </Provider>
  )
}




// function Main() {
//   const { pathname, search } = useLocation()
//   const { title, description } = useStore($seo)
//   const fetchUser = useEvent($fetchUser)
//   const setUrlInfo = useEvent($setUrlInfo)
//  
//  
//   useEffectSafe(() => {
//     if (config.local) {
//       fetchUser()
//     }
//   }, [])
//  
//   useEffectSafe(() => {
//     setUrlInfo({ path: pathname, search })
//   }, [ pathname, search ])
//  
//  
//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//         <meta
//           name="description"
//           content={description}
//         />
//       </Helmet>
//  
//  
//       <div className={styles.app}>
//         <header className={styles.header}>
//           <Header/>
//         </header>
//    
//         <main className={styles.main}>
//           <Pages/>
//         </main>
//    
//         <footer className={styles.footer}>
//           <Footer/>
//         </footer>
//    
//
//       </div>
//     </>
//   )
// }
