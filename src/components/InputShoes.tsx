import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { cancelEditItem, finishEditItem } from '../store/shoesSlice'
import { shoesColection } from '../lib/firestore.colection'
import { addDoc } from 'firebase/firestore'

export default function InputShoes() {
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const dispatch = useAppDispatch()
    const editItem = useAppSelector((state) => state.shoes.editItem)

    useEffect(() => {
        if (editItem) {
            setId(editItem.id)
            setName(editItem.name)
        }
    }, [editItem])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const hanleAdd = () => {
        if (name === '') {
            return
        }
        addDoc(shoesColection, { name })
        setName('')
    }

    const handleCancel = () => {
        dispatch(cancelEditItem())
    }
    const handleOk = () => {
        if (id !== '' && name !== '') {
            dispatch(
                finishEditItem({
                    id,
                    name,
                })
            )
            setName('')
        }
    }

    return (
        <div>
            <h1 className="font-semibold text-lg">{editItem ? 'Edit mode' : 'Add mode'}</h1>
            <div className="flex gap-4 items-center justify-center">
                <label htmlFor="">Name</label>
                <input
                    defaultValue={''}
                    value={name}
                    className="border"
                    type="text"
                    title="name"
                    onChange={handleChange}
                />
                {editItem ? (
                    <>
                        <button className="border bg-green-400 p-2 rounded-lg" onClick={handleOk}>
                            Ok
                        </button>
                        <button className="border bg-red-400 p-2 rounded-lg" onClick={handleCancel}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className="border bg-purple-400 p-2 rounded-lg" onClick={hanleAdd}>
                        Add
                    </button>
                )}
            </div>
        </div>
    )
}
