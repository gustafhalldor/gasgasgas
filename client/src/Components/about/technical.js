import React, { Component } from 'react';
import styles from './about.css';

class Technical extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <h2 className={styles.alignSelfCenter}>Tæknileg atriði</h2>
        <p>
          Ég notaðist við Node.js umhverfið fyrir server og React og mest allur kóði er skrifaður í Javascript.
          Serverinn sjálfur er keyrður á Express framework-inu og ég nota Axios sem HTTP client
          til að ná í vefsíður sem ég svo skrapa. Á framenda nota ég Fetch API til að ná í
          gögn frá server. Til að stílisera síðuna þá notast ég við bæði CSS Modules og Bootstrap.
          Gagnagrunnurinn sem notaður er er PostgreSQL og síðan sjálf er hýst á Heroku.
        </p>
        <p>Helstu forritasöfnin sem ég nota eru Chart.js (fyrir línuritin) og React (til að birta öll gögn á framenda).</p>
        <p>Vefsíðan er svokallað "single page app", þar sem henni er aldrei endurhlaðið jafnvel þó ferðast sé á milli mismunandi
          hluta hennar.</p>
      </div>
    )
  }
}

module.exports = Technical;
