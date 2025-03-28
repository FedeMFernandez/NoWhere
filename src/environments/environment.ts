// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:1323/',
  firebaseConfig: {
    apiKey: 'AIzaSyBUZaW3Br51-d3P-Egn3_E9aYADKACF9hI',
    authDomain: 'home-manager-ddeed.firebaseapp.com',
    projectId: 'home-manager-ddeed',
    storageBucket: 'home-manager-ddeed.appspot.com',
    messagingSenderId: '996425857783',
    appId: '1:996425857783:web:209b14b11c6ee49611f1f2'
  },
  uiAvatars: {
    apiURL: 'https://ui-avatars.com/api'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
