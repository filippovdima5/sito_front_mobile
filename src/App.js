import React from 'react';
import {Pages} from "./pages/index";
import styles from './css/App.module.scss';
import './css/reset.module.scss';

import { Header} from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";


function App() {
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
}

export {App}