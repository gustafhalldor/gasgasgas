import React, { Component } from 'react';
import styles from './about.css';

class Technical extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <h2>Tæknileg atriði</h2>
        <p>
          Ég notaðist við Node.js umhverfið fyrir bæði server og framenda.
          Serverinn sjálfur er keyrður á Express framework-inu og ég nota Axios sem HTTP client
          til að ná í heimasíður sem ég svo scrape-a. Á framenda nota ég Fetch til að ná í
          gögn frá server. Til að stílisera síðuna þá notast ég við bæði CSS Modules og Twitter
          bootstrap. Gagnagrunnurinn sem notaður er er PostgreSQL.
        </p>
        <p>Helstu forritasöfnin sem ég nota eru chart.js (fyrir línuritin) og React (fyrir að birta öll gögn á framenda).</p>
      </div>
    )
  }
}

module.exports = Technical;
