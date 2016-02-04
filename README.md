# codetabel-dropdown

v1.1.3

### Hoe het te gebruiken

```javascript
"dependencies": {
	"digipolis-codetabel-dropdown": "latest"
 }
```
```javascript
var app = angular.module('yourApp', [
	'digipolis-codetabel-dropdown'
]);
```

```html
<digipolis-codetabel-dropdown edit-mode="true"
                                      empty-description="Alle"
                                      codetablename="thema"
                                      ng-model="ctrl.evenement.filter.themaId"
                                      ng-change="ctrl.updateGrid()">
```

Opties: 
edit-mode="true" laat een dropdown zien, als deze afstaat (en from-mode staat op false) zal enkel de waarde zichtbaar zijn
form-mode="true" geeft een selecteer.. optie die default aanstaat en niet selecteerbaar is.
empty-description="string" geeft de waarde die standaard zichtbaar is en die bij selectie ng-model op 0 zal zetten
codetablename="string" de naam van de codetabel, gebruik de digipolis codetabellen nuget package voor de controllers en models
