import React from 'react';
import {Pages} from "./pages/index";
import styles from './media/css/App.module.scss';
import './media/css/reset.module.scss';

import { Header} from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";


const App = React.memo(function App() {

    return (
       <div className={styles.App}>
           <header className={styles.header}>
               <Header/>
           </header>

            <main className={styles.main}>
               <Pages/>
            </main>

           <footer className={styles.footer}>
               <Footer/>
           </footer>
       </div>
    )
});

export {App}