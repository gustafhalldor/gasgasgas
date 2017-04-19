import React, { Component } from 'react';
import styles from './about.css';

class General extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <p>
          Þessi síða var unnin sem lokaverkefni (B.Sc.) í almennri tölvunarfræði við Háskóla Íslands, vorið 2017,
          af Gústafi Halldóri Gústafssyni.
        </p>
        <p>
          Leiðbeinandi var Ólafur Sverrir Kjartansson.
        </p>
        <h2 className={styles.alignSelfCenter}>Hugmynd</h2>
        <p>
          Það sem mig langaði að athuga var hvort bensíntaka á sérstökum afsláttardögum olíufélaganna borgi sig.
          Maður eyðir tíma í að gera sér sérstaka ferð á bensínstöðina og að sjálfsögðu eyðir maður bensíni í það um leið.
          Með reiknivélinni er hægt að sjá niðurstöðuna á einfaldan hátt. Mig langaði einnig til að safna upplýsingum um
          verðþróun bensínverðs og sjá þær grafískt.
        </p>
        {/* <p>
          Bensínverðið sem notast er við til að reikna út eyðsluna er núverandi bensínverð.
        </p> */}
      </div>
    )
  }
}

module.exports = General;
