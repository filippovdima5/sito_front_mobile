import React from 'react';
import {Pages} from "./5.pages/index";
import styles from './css/App.module.scss';
import './css/reset.module.scss';

import { Header } from "./4.templates/Header/Header";
import { Footer } from "./4.templates/Footer/Footer";


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