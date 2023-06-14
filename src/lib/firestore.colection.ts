import { collection } from 'firebase/firestore'
import { db } from './init-firebase'

export const shoesColection = collection(db, 'shoes')
