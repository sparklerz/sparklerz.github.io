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
                    personal_like : currentData.sports,
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
            if(personData.criticality === currentData[index].criticality)
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

export { addEntry, getAllEntries, updateEntry, deleteEntry, wishWithNickName, setPersonalLikeParamter, setMedicineParameter, setStreakParameter }