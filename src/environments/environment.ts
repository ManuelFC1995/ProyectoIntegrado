// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 
  endpoint:'http://localhost:8100/',
  apiUsers:"Users/",
  apiPedidos:"Pedidos/",
  apiProductos:"Productos/",
  CommerceApykey:"pk_test_2595542a339ee2240c777fa8c353a93910ca8f85ce0d3",
  IsLogin : false,
  IsLoginGoogle : false,
   firebaseConfig : {
    apiKey: "AIzaSyDD2nDKh11H9qgeUy_UPc_AHWg2DRmAE20",
    authDomain: "vianco-cdb35.firebaseapp.com",
    projectId: "vianco-cdb35",
    storageBucket: "vianco-cdb35.appspot.com",
    messagingSenderId: "956149281643",
    appId: "1:956149281643:web:8249900e582754e577922e",
    measurementId: "G-5HK9XL98NK"
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
