const en: { [key: string]: string } = {
  name: 'Identifier for the item in the UI.',
  version: 'Version where this feature first appears.',
  major:
    'When the product is modified in a way that breaks backwards compatibility, the major version is updated.',
  minor:
    'When features are added or modified in a way that does not affect backwards compatibility, the minor version is updated.',
  codename: 'Makes it easier to remember the meaning of the version.',
  products: 'The feature is related to the selected products.',
  tags: 'Highlight the special features of the feature with tags.',
  weight:
    'You can increase the importance of an item with the weight of the tag.',
  assignments: 'Mark who is responsible for taking the feature forward.',
  requirements:
    'The feature requirement specification describes the feature in its entirety.',
  workHoursEstimate:
    'Estimate how many hours it will take to complete the assignment. ' +
    'The value can be updated later as needed. ' +
    'The price of the assignment is calculated based on the value.',
  hourPrice:
    'How much does the developer work in the assignment cost per hour. Integer in euros.',
  done: 'The assignment is completed and no more time is spent on it in the name of this assignment.',
  archived:
    'Archived items are not visible in listings or searches. Archive the item when the version is no longer relevant',
  value:
    'Describe the requirement concisely. What goal does the feature achieve with this requirement?',
  fulfilled: 'This requirement has been met in its entirety.',
  functional: 'A requirement can be either functional or non-functional.',
  balance:
    'Does the importance of the feature lean towards keeping current customers or getting new ones?',
  assignee: 'Who is responsible for implementing this assignment.',
  feature: 'Feature associated with the item.',
  roadmapUsers:
    'Only marked users appear in the drop-down lists and other information of the Roadmap.',
  defaultRoadmapId:
    'The interface opens automatically to this roadmap when the user logs in.',
  roadmapIds: 'Show only the roadmaps you have signed up for here.',
};

const fi: typeof en = {
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
  fulfilled: 'Tämä vaatimus on kokonaisuudessaan täytetty.',
  functional: 'Vaatimus voi olla joko funktionaalinen tai ei-funktionaalinen.',
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

export default { en, fi };
