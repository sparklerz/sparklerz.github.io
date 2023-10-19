import * as functions from 'firebase-functions'
import * as express from 'express'
import { addEntry, getAllEntries, updateEntry, deleteEntry, wishWithNickName, setPersonalLikeParamter, setMedicineParameter, setStreakParameter, updatePersonDetails } from './entryController'

const app = express()

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.post('/entries', addEntry)
app.get('/entries', getAllEntries)
app.patch('/entries/:entryId', updateEntry)
app.delete('/entries/:entryId', deleteEntry)

app.post('/person', wishWithNickName)

app.post('/personal_likes', setPersonalLikeParamter)

app.post('/medicine', setMedicineParameter)

app.post('/streak', setStreakParameter)

app.use('/updatePerson', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'sparklerz.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Continue to the route handler
});

app.post('/updatePerson', updatePersonDetails)

exports.app = functions.https.onRequest(app)