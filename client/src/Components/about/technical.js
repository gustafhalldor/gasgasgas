import React, { Component } from 'react';
import styles from './about.css';

class Technical extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <h2 className={styles.alignSelfCenter}>Tæknileg atriði</h2>
        <p>
          Ég notaðist við Node.js umhverfið fyrir bæði server og framenda og allur kóði er skrifaður í Javascript (ES6).
          Serverinn sjálfur er keyrður á Express framework-inu og ég nota Axios sem HTTP client
          til að ná í vefsíður sem ég svo scrape-a. Á framenda nota ég Fetch til að ná í
          gögn frá server. Til að stílisera síðuna þá notast ég við bæði CSS Modules og Twitter
          bootstrap. Gagnagrunnurinn sem notaður er er PostgreSQL og síðan er hýst á Heroku.
        </p>
        <p>Helstu forritasöfnin sem ég nota eru Chart.js (fyrir línuritin) og React (fyrir að birta öll gögn á framenda).</p>
        <p>Síðan er svokallað "single page app", þar sem henni er aldrei endurhlaðið, jafnvel þó ferðast sé á milli mismunandi hluta hennar.</p>
      </div>
    )
  }
}

module.exports = Technical;
