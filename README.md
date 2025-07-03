# BA_Vega_Lite
Eine Web App zur intuitiven und benutzerfreundlichen Erstellung von Graphen mit Hilfe von CSV Dateien und der Bibliothek Vega Lite

Cloning und Dependencies:

`git clone https://github.com/JGraenitz/BA_Vega_Lite` <br>
`cd ba_vega_lite` <br>
`npm install` <br>
`npm install react-vega vega vega-lite` <br> <br>
React-vega unterstützt React nur bis Version 18 und es wird automatisch bei der Erstellung eines normalen React Projektes die Version 19 genommen, welches zu einem "Peer Dependency Conflict" führt: <br>
`npm install react-vega vega vega-lite --legacy-peer-deps` oder `npm install react-vega vega vega-lite --force`<br>

`npm install react-router-dom --legacy-peer-deps` <br>

`npm install papaparse --legacy-peer-deps` <br>
