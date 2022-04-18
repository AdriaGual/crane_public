# Crane 🐦

Crane es un proyecto creado para <strong>facilitar</strong> a la gente el encontrar <strong>planes</strong> interesantes que tengan cerca.

## Contenido

- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Claves](#claves)
- [Instalación](#instalación)
- [Estructura](#estructura)
- [Puntos clave del proyecto](#puntos-clave-del-proyecto)
- [Página escaparate](#página-escaparate)

## Tecnologías

Para el desarrollo de esta app se ha usado el siguiente stack tecnológico:

- [Expo 42 (React Native)](https://expo.dev/)
- [NativeBase](https://nativebase.io/)
- [TomTom API](https://developer.tomtom.com/)
- [Firebase](https://firebase.google.com/)
- [Redux](https://es.redux.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://github.com/axios/axios)

## Requisitos

Para desarrollar en este stack, es necesario tener:

- [Node](https://nodejs.org/es/)
- [Expo-cli](https://docs.expo.dev/workflow/expo-cli/)
- [TomTomAPI-key](https://developer.tomtom.com/)
- [Firebase-key](https://firebase.google.com/)
- [Maps-SDK-Android-key](https://docs.expo.dev/versions/latest/sdk/map-view/)

## Claves

Las claves de API no están incluidas en el proyecto por motivos de seguridad, a continuación se detallan los puntos dónde deben añadirse estas.

### TomTom API

Las claves de TomTomAPI se pueden añadir al fichero [TomTomAPI.js](https://github.com/AdriaGual/crane/blob/master/src/routes/TomTomAPI.js) (se habla en plural porqué el código acepta múltiples, pero con una clave sirve).

```javascript
import axios from "axios";
import { planAdded, planReseted } from "../redux/plans/PlansSlice";
import { CapitalizeWord } from "../utils/GeneralUtils";

const TomTomAPIKey = ["Añadir aquí"];
```

### Firebase API

Para poder compartir planes con amigos, se ha usado el servicio de Firebase, [Cloud Firestore](https://firebase.google.com/products/firestore?gclid=EAIaIQobChMIk6L8wdqV9wIVB5BoCR1jDQdGEAAYASAAEgKOXfD_BwE&gclsrc=aw.ds), la configuración se añade [aquí](https://github.com/AdriaGual/crane/blob/master/src/routes/FirebaseConfig.js):

```javascript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
```

### Maps SDK Android

Esta clave sólo es necesaria para cuando se cree el bundle de android, se añade en el [app.json](https://github.com/AdriaGual/crane/blob/master/app.json).

```json
"android": {
      "config": {
        "googleMaps": {
          "apiKey": ""
        }
      }
   }
```

## Instalación

Para instalar los módulos necesitas primero ejecutar lo siguiente:

```bash
yarn install
```

Puedes usar [yarn](https://yarnpkg.com/) o [npm](https://www.npmjs.com/) para levantar un servidor en [localhost:19002](http://localhost:19002/) con:

```bash
yarn start
```

## Estructura

Para la estructura del proyecto se ha usado una organización basada en [tipo de fichero](https://reboot.studio/blog/es/estructuras-organizar-proyecto-react/).

```
.
├── App.js
├── Navigation.js
├── app.json
├── src
	├── components
	│	├── ...
	└── constants
	│	├── Styles.js
	└── redux
	│	├── plans
	│	├── user
	│	├── Store.js
	└── routes
	│	├── TomTomAPI.js
	└── utils
	│	├── ColorModeManager.js
	│	├── GeneralUtils.js
	└── views
		├── MainScreen.js
		├── MapScreen.js
		├── MatchesScreen.js
		├── ShareScreen.js

```

Para las necesidades de Crane, se ha dividido el proyecto en los siguientes módulos:

<ul>
   <li>App.js:
      Principal componente que se encarga de cargar los estilos de <a href="https://nativebase.io/">NativeBase</a> y preparar el redux store con persistencia de datos.
   </li>
   <li>Navigation.js:
      Se encarga de preparar la navegación entre pantallas.
   </li>
   <li>app.json:
      Archivo de configuración para la exportación a android o ios.
       <ul>
         <li>android.config.googleMaps.apiKey:
            Aquí se tiene que poner la apiKey de Google para habilitar el <a href="https://docs.expo.dev/versions/latest/sdk/map-view/">SDK de maps de android</a>.
         </li>
      </ul>
   </li>
   <li>components:
      Contiene los diferentes componentes que se usan en las vistas de la aplicación.
   </li>
   <li>
      constants:
      <ul>
         <li>Styles.js:
            Contiene la paleta de colores centralizada para toda la aplicación.
         </li>
      </ul>
   </li>
   <li>
      redux:
      <ul>
         <li>plans:
            Contiene toda la gestión de los slice para los planes.
         </li>
         <li>user:
            Contiene toda la gestión de los slice para el usuario.
         </li>
         <li>Store.js:
            Contiene todos los slices combinados en un reducer y usa el <a    href="https://www.npmjs.com/package/redux-persist-expo-filesystem">ExpoFileSystemStorage</a> para persistir los datos.  
         </li>
      </ul>  
   </li>
   <li>
      routes:
      <ul>
         <li>TomTomAPI.js:
            Se encarga de gestionar todas las llamadas a la API de <a    href="https://developer.tomtom.com/">TomTom</a> para obtener los puntos de interés.
         </li>
      </ul>
   </li>
   <li>
      utils:
      <ul>
         <li>ColorModeManager.js:
            Se encarga de gestionar el cambio entre el modo claro y el modo oscuro.
         </li>
         <li>GeneralUtils.js:
            Contiene un conjunto de utilidades generales que se usan a lo largo del proyecto (ejemplos: urlParser, substringLastIndex, reverseArr...).
         </li>
      </ul>
   </li>
   <li>
      views:
      <ul>
         <li>MainScreen.js:
            Pantalla de inicio dónde se pueden ver los planes y puntos de interés más cercanos.
         </li>
         <li>MapScreen.js:
            Pantalla que permite al usuario cambiar su ubicación, usa el módulo de <a href="https://www.npmjs.com/package/react-native-maps">react-native-maps</a>.
         </li>
         <li>MatchesScreen.js:
            Pantalla que muestra los planes que tienen en común dos usuarios.
         </li>
         <li>ShareScreen.js:
            Pantalla que permite ver los planes que le han gustado al usuario y copiar el "código amigo" para poder compartirlo.
         </li>
      </ul>
   </li>
</ul>

## Puntos clave del proyecto

### FetchPlans

Esta función se encuentra en la clase **TomTomAPI**, se encarga de buscar y cargar todos los puntos de interés con las coordenadas (longitude, latitude), el radio (radius) y las diferentes categorías (categorySet).

```javascript
import axios from "axios";
import { planAdded, planReseted } from "../redux/plans/PlansSlice";

export const fetchPlans = async (
  keyIndex,
  dispatch,
  categorySet,
  reloadedCards,
  swipedPlans,
  longitude,
  latitude,
  radius
) => {};
```

### NavigationContainer

Para poder cargar una pantalla u otra dependiendo de los parámetros del link, se ha usado el NavigationContainer que ofrece react-navigation junto al deep linking de expo.

```xml
<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
    <Stack.Navigator screenOptions={({ route }) => screenOptions(route)}>
        <Stack.Screen name="Main" component={Main}></Stack.Screen>
        <Stack.Screen name="Matches" component={MatchesScreen}></Stack.Screen>
        <Stack.Screen name="Map" component={MapScreen}></Stack.Screen>
    </Stack.Navigator>
</NavigationContainer>
```

## Página escaparate

Para poder mostrar las funcionalidades de la aplicación sin la necesidad que el usuario se descargue la app, se ha creado una página web dónde se explica el como y el porqué se ha creado.

[Crane web](https://craneapp.netlify.app/)

## Contribución

Los pull requests siempre son bienvenidos. Para mayores cambios, por favor abrir una incidencia primero para discutir lo que te gustaría cambiar.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
