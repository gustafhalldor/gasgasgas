import React, { Component } from 'react';
import styles from './about.css';

class General extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <p>
          Þessi síða var unnin sem lokaverkefni (B.Sc.) í almennri tölvunarfræði við Háskóla Íslands, vorið 2017,
          af Gústafi Halldóri Gústafssyni.<br/>
          Leiðbeinandi var Ólafur Sverrir Kjartansson.
        </p>
        <h2>Virkni</h2>
        <p>
          Hefur þig einhverntíma langað til að vita hversu mikið raunverulega þú ert að spara með því að fara
          út og taka bensín á afsláttardögum olíufélaganna? Þá er þessi síða eitthvað fyrir þig! Langar þig til að fylgjast
          með meðalverði allra olíufélaganna á Íslandi í einu grafi? Þá er þessi síða eitthvað fyrir þig! Langar þig til að sjá hvernig
          meðaleldsneytisverð á Íslandi er í samanburði við heimsmarkaðsverð olíu? Þá er þessi síða eitthvað fyrir þig!
        </p>
      </div>
    )
  }
}

module.exports = General;
