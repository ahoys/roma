const fi: { [key: string]: string } = {
  name: 'Kohteen tunniste käyttöliittymässä.',
  version: 'Versio jossa tämä ominaisuus esiintyy ensimmäisen kerran.',
  major:
    'Kun tuotetta muokataan tavalla joka rikkoo taaksepäinyhteensopivuuden, major-versiota päivitetään.',
  minor:
    'Kun ominaisuuksia lisätään tai niitä muokataan tavalla joka ei vaikuta taaksepäinyhteensopivuuteen, minor-versiota päivitetään.',
  codename: 'Helpottaa version merkityksen muistamista.',
  products: 'Ominaisuus liittyy valittuihin tuotteisiin.',
  tags: 'Korosta ominaisuuden erityispiirteitä tageilla.',
  weight: 'Voit tagin painoarvolla nostaa tagin omaavan kohteen merkitystä.',
  assignments: 'Merkkaa kenellä on vastuu ominaisuuden eteenpäin viemisestä.',
  requirements:
    'Ominaisuuden vaatimusmäärittely kuvailee ominaisuuden kokonaisuudessaan.',
  workHoursEstimate:
    'Arvio kuinka monta tuntia toimeksiannon suorittamiseen tarvitaan. ' +
    'Arvoa voi tarpeen mukaan päivittää myöhemmin. ' +
    'Arvon pohjalta lasketaan toimeksiannon hinta.',
  hourPrice:
    'Kuinka paljon kehittäjän työskentely toimeksiannossa maksaa tunnissa. Kokonaisluku euroina.',
  done:
    'Toimeksianto on suoritettu loppuun, ' +
    'eikä siihen käytetä tämän toimeksiannon nimissä ' +
    'enempää aikaa.',
  archived:
    'Arkistoidut kohteet eivät näy listauksissa tai hauissa. Arkistoi kohde kun versio ei ole enää relevantti',
  value:
    'Kuvaile vaatimus ytimekkäästi. Minkä tavoitteen ominaisuus saavuttaa ' +
    'tämän vaatimuksen myötä?',
  fulfilled:
    'Ominaisuus on valmis kun kaikki sille asetetut vaatimukset täyttyvät.',
  balance:
    'Kallistuuko ominaisuuden merkitys nykyisten asiakkaiden pitämiseen, vai uusien saamiseen?',
  assignee: 'Kenen tehtävänä on toteuttaa tämä toimeksianto.',
  feature: 'Kohteeseen liitetty ominaisuus.',
  roadmapUsers:
    'Vain merkatut käyttäjät näkyvät Roadmapin valintalistoissa ja muissa tiedoissa.',
  defaultRoadmapId:
    'Käyttöliittymä avautuu tähän roadmapiin automaattisesti käyttäjän kirjautuessa sisään.',
  roadmapIds:
    'Näyt ainoastaan niiden roadmappien pudotuslistoilla joille olet ilmottautunut tässä.',
};

export default { fi };
