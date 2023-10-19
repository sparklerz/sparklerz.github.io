import { Response, Request } from "express"
import { db } from './config/firebase'

//const dialogflow_cx = require('@google-cloud/dialogflow-cx');

type EntryType = {
  title: string,
  text: string,
}

type RequestHardcoded = {
  body: EntryType,
  params: { entryId: string }
}

const addEntry = async (req: RequestHardcoded, res: Response) => {
  const { title, text } = req.body
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      title,
      text,
    }

    await entry.set(entryObject)

    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject
    })
  } catch(error : any) {
      res.status(500).json(error.message)
  }
}

const getAllEntries = async (req: RequestHardcoded, res: Response) => {
  try {
    const allEntries: EntryType[] = []
    const querySnapshot = await db.collection('entries').get()
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error : any) { return res.status(500).json(error.message) }
}

const updateEntry = async (req: RequestHardcoded, res: Response) => {
  const { body: { text, title }, params: { entryId } } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data() || {}

    const entryObject = {
      title: title || currentData.title,
      text: text || currentData.text,
    }

    await entry.set(entryObject).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'entry updated successfully',
      data: entryObject
    })
  }
  catch(error : any) { return res.status(500).json(error.message) }
}

const deleteEntry = async (req: RequestHardcoded, res: Response) => {
  const { entryId } = req.params

  try {
    const entry = db.collection('entries').doc(entryId)

    await entry.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'entry deleted successfully',
    })
  }
  catch(error : any) { return res.status(500).json(error.message) }
}

// const helloWorld = (req, res) => {
//     let message = "Hi machi";
//     //req.body.sessionInfo.parameters.age

//     const jsonResponse = {
//         fulfillment_response: {
//             messages: [
//                 {
//                     text: {
//                         text: [message],
//                     },
//                 },
//             ],
//         },
//     };

//     res.status(200).send(jsonResponse);
// };

const wishWithNickName = async (req: Request, res: Response) => {
    try {

        const entry = db.collection('person_likes').doc('1')
        const currentData = (await entry.get()).data() || {}

        let message = "Hi " + currentData.nickName + " How are you? This is Citra calling from your hospital to enquire about your medication. Is it a good time to talk?";

        const jsonResponse = {
            fulfillment_response: {
                messages: [
                    {
                        text: {
                            text: [message],
                        },
                    },
                ],
            },
        };
  
        res.status(200).send(jsonResponse);
    } catch(error : any) {
        res.status(500).json(error.message)
    }
  }

  const setPersonalLikeParamter = async (req: Request, res: Response) => {
    try {

        const entry = db.collection('person_likes').doc('1')
        const currentData = (await entry.get()).data() || {}

        //req.body.sessionInfo.parameters.personal_like = currentData.sports;

        //dialogflow_cx.sessionInfo.params.personal_like = currentData.sports;

        //$session.params.personal_like = 

        const jsonResponse = {
            sessionInfo: {
                //session: req.body.sessionInfo.session,
                parameters: {
                    personal_like : currentData.like,
                }
            }
        };

        res.status(200).send(jsonResponse);
    } catch(error : any) {
        res.status(500).json(error.message)
    }
  }

  const setMedicineParameter = async (req: Request, res: Response) => {
    try {

        // const entry = db.collection('morning_medication').doc('1')
        // const currentData = (await entry.get()).data() || {}

        const entry = db.collection('person_criticality').doc('1')
        const personData = (await entry.get()).data() || {}

        const currentData: any = []
        const querySnapshot = await db.collection('morning_medication').get()
        querySnapshot.forEach((doc: any) => currentData.push(doc.data()))

        let medicine = '';

        for (var index in currentData) {
            if(personData.criticality === currentData[index].criticality && currentData[index].deleted === "false")
            {  medicine = medicine.concat(" medicine : " + currentData[index].medicine + " dosage : " + currentData[index].dosage);}
        }


        //let medicine = "medicine : " + currentData.medicine + " dosage : " + currentData.dosage

        const jsonResponse = {
            sessionInfo: {
                parameters: {
                    medicine : medicine,
                }
            }
        };

        res.status(200).send(jsonResponse);
    } catch(error : any) {
        res.status(500).json(error.message)
    }
  }

  const setStreakParameter = async (req: Request, res: Response) => {
    try {

        const entry = db.collection('streak').doc('1')
        const currentData = (await entry.get()).data() || {}

        let streak = currentData.days

        const jsonResponse = {
            sessionInfo: {
                parameters: {
                    streak : streak,
                }
            }
        };

        res.status(200).send(jsonResponse);
    } catch(error : any) {
        res.status(500).json(error.message)
    }
  }

  const updatePersonDetails = async (req: Request, res: Response) => {
    const { body: { nickName, personalLike, criticality, initialMedicine, intensifiedMedicine }} = req

    try {

      const entryPerson = db.collection('person_likes').doc('1')
      const currentPersonData = (await entryPerson.get()).data() || {}
  
      const entryPersonObject = {
        nickName : nickName || currentPersonData.nickName,
        personId : "1",
        like : personalLike || currentPersonData.like
      }
  
      await entryPerson.set(entryPersonObject).catch(error => {
        return res.status(400).json({
          status: 'error',
          message: error.message
        })
      })

      const entryPersonCriticality = db.collection('person_criticality').doc('1')
      const currentPersonCriticalityData = (await entryPersonCriticality.get()).data() || {}
  
      const entryPersonCriticalityObject = {
        criticality : criticality || currentPersonCriticalityData.criticality,
        personId : "1"
      }
  
      await entryPersonCriticality.set(entryPersonCriticalityObject).catch(error => {
        return res.status(400).json({
          status: 'error',
          message: error.message
        })
      })

      //for medicine we have to delete all existing entries and create new ones

      const querySnapshot = await db.collection('morning_medication').get()

      const batchSize = querySnapshot.size;

      for(let i = 1; i <= batchSize; i++ ) {
        const entryMedication = db.collection('morning_medication').doc(i.toString())
        const currentMedicationData = (await entryMedication.get()).data() || {}
  
        const entryMedicationObject = {
          criticality : currentMedicationData.criticality,
          deleted : "true",
          dosage : currentMedicationData.dosage,
          medicine : currentMedicationData.medicine,
          personId : currentMedicationData.personId
        }
  
        await entryMedication.set(entryMedicationObject).catch(error => {
          return res.status(400).json({
            status: 'error',
            message: error.message
          })
        })
      }

      let initialMedicineLength = initialMedicine.length;

      for (let i=0; i < initialMedicineLength; i++){
        let entryAddedMedication = db.collection('morning_medication').doc((batchSize + i + 1).toString())
        let entryAddedMedicationObject = {
          criticality : "initial",
          deleted : "false",
          dosage : initialMedicine[i][1],
          medicine : initialMedicine[i][0],
          personId : '1'
        }

        await entryAddedMedication.set(entryAddedMedicationObject)
      }

      let intensifiedMedicineLength = intensifiedMedicine.length;

      for (let i=0; i < intensifiedMedicineLength; i++){
        let entryAddedMedication = db.collection('morning_medication').doc((batchSize + initialMedicineLength + i + 1).toString())
        let entryAddedMedicationObject = {
          criticality : "intensified",
          deleted : "false",
          dosage : intensifiedMedicine[i][1],
          medicine : intensifiedMedicine[i][0],
          personId : '1'
        }

        await entryAddedMedication.set(entryAddedMedicationObject)
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'entry updated successfully',
        // data: entryObject
      })
    }
    catch(error : any) { return res.status(500).json(error.message) }
  }

export { addEntry, getAllEntries, updateEntry, deleteEntry, wishWithNickName, setPersonalLikeParamter, setMedicineParameter, setStreakParameter, updatePersonDetails }