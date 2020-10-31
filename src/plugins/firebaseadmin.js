var admin = require('firebase-admin')

var serviceAccount = require('C:/Users/USER/Documents/vueFiles/Maleficent_V2/maleficentdatabase-firebase-adminsdk-service-credential.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maleficentdatabase.firebaseio.com"
});

export default admin