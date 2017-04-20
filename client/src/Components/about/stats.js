import React, { Component } from 'react';
import styles from './about.css';

class Stats extends Component {
  render() {
    return (
      <div className={styles.paragraphText}>
        <h2 className={styles.alignSelfCenter}>Verðþróun</h2>
        <p>
          Gott er að hafa eftirfarandi punkta bakvið eyrað þegar maður skoðar efra línuritið:
        </p>
        <ul>
          <li><b>Skeljungur</b> rekur Orkuna og OrkanX.</li>
          <li><b>Olís</b> rekur ÓB.</li>
          <li><b>N1</b> rekur Dæluna.</li>
          <li><b>Atlantsolía</b> er sér á báti (svo best sem ég veit)</li>
        </ul>
        <p>
          Bensínverðin fæ ég frá <a href="https://bensinverd.is" target="_blank">bensinverd.is</a> og scrape-a ég þá
          síðu með góðfúslegu leyfi þeirra sem reka hana.
        </p>
        <p>
          Eins og sjá má á bensinverd.is þá er Atlantsolía með eina stöð sem er nokkrum krónum lægri
          en allar hinar Atlantsolíustöðvarnar. Ég tók þá ákvörðun að notast frekar við eitt verð frá þeim (þetta algengara)
          frekar en að bæta við annarri línu við grafið.
        </p>
        <p>
          Neðra grafið sýnir heimsmarkaðsverð Brent olíutunnu í USD í samanburði við meðaltalsverð af 95 oktan í Reykjavík.
          Þessar upplýsingar scrape-a ég af undirsíðu Financial Times.
        </p>
        <h3><em>Hvað er Brent olíutunna?</em></h3>
        <p>
          Góð spurning! Áður en ég byrjaði á þessu verkefni þá hélt ég að það væri bara til ein tegund af hráolíu, einfaldlega
          vegna þess ég hafði aldrei leitt hugann að því að það gætu verið til fleiri. Kemur í ljós að það eru til ansi margar, eða um
          160 sem verslað er með á hlutabréfamörkuðum. <b>"Brent Blend"</b> er olían kölluð sem er í Brent tunnunni. Hún er samansafn olíu af 15 mismunandi stöðum úr Norðursjó og er sú
          tegund sem er mest notuð í norðvestur-Evrópu.
        </p>
        <h3><em>Olíutunna vs. bensínverð</em></h3>
        <p>
          Í olíutunnu eru 42 gallon, en það gerir um 159 lítra. Úr olíunni er svo unnið allskonar eldsneyti, eins og t.d. bensín,
          dísel og þotueldsneyti. Það er ekki alveg hlaupið að því samt að skilgreina bensín því "oktan"-talan skiptir máli. Ef
          við hugsum bara um það sem á ensku heitir "gasoline", þá nást um 19 gallon (72 lítrar) af því úr einni olíutunnu.
          Þannig þegar horft er á neðra grafið, þá verður að taka upplýsingunum með smá fyrirvara, en þó ætti að vera hægt að sjá
          einhverja fylgni milli hækkunar/lækkunar olíuverðs og bensínverðs á Íslandi.
        </p>
      </div>
    )
  }
}

module.exports = Stats;
