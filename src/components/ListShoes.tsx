import { useEffect, useState } from 'react'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { ShoesType } from '../interfaces/shoes.type'
import { shoesColection } from '../lib/firestore.colection'
import { db } from '../lib/init-firebase'
import CardProduct from './CardProduct'
import { useAppDispatch } from '../store/hooks'
import { startEditItem } from '../store/shoesSlice'

export default function ListShoes() {
    const [listShoes, setListShoes] = useState<ShoesType[] | []>([])
    const dispatch = useAppDispatch()

    // Khi dung getDoc thi phai refresh trang lai moi co du lieu moi
    // useEffect(() => {
    //     getShoes()
    // }, [])
    // const getShoes = () => {
    //     getDocs(shoesColection)
    //         .then((res) => {
    //             const list = res.docs.map((doc) => ({
    //                 name: doc.data().name,
    //                 id: doc.id,
    //             }))
    //             setListShoes(list)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }

    //RealTime Data
    useEffect(() => {
        const unb = onSnapshot(shoesColection, (snapshot) => {
            setListShoes(snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name })))
        })
        return () => {
            unb
        }
    }, [])

    const handleDelete: (id: string) => void = (id: string) => {
        const docRef = doc(db, 'shoes', id)
        deleteDoc(docRef)
    }

    const handleEdit: (shoes: ShoesType) => void = (shoes: ShoesType) => {
        // console.log(id)
        dispatch(startEditItem(shoes))

        // dispatch(edit, id)
    }

    return (
        <div className="container mx-auto grid grid-cols-4 gap-6 py-6">
            {/* <button
                onClick={() => {
                    getShoes()
                }}
                className="text-[30px] p-5 rounded-lg bg-sky-500"
            >
                Refresh
            </button> */}
            {listShoes.map((shoes) => {
                return (
                    <div className="relative" key={shoes.id}>
                        <CardProduct item={shoes} />
                        <div className="absolute z-20 right-4 top-4 flex gap-2">
                            <button
                                className="bg-green-500 p-2 rounded-lg"
                                onClick={() => {
                                    handleEdit(shoes)
                                }}
                            >
                                ✏️
                            </button>
                            <button
                                className="bg-red-500 p-2 rounded-lg"
                                onClick={() => {
                                    handleDelete(shoes.id)
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
