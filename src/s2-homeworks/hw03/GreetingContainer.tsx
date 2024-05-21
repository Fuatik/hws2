import React, {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState} from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: Dispatch<SetStateAction<string>>, setName: Dispatch<SetStateAction<string>>, addUserCallback: (name: string) => void) => {
    name = name.trim()
    if (!name) {
        setError("Ошибка! Введите имя!");
        return;
    }
    setName("");
    addUserCallback(name);
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: string, setError: Dispatch<SetStateAction<string>>) => {
    if (!name.trim()) {
        setError("Ошибка! Введите имя!");
        return;
    }// если имя пустое - показать ошибку
}

export const pureOnEnter = (e: React.KeyboardEvent<HTMLDivElement>, addUser: () => void) => {
    if (e.key === 'Enter') {addUser()}

}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length; // need to fix
    const lastUserName = totalUsers > 0 ? users[totalUsers - 1].name : ''; // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
