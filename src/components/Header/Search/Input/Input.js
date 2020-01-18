import React, {useEffect, useRef, useState} from 'react';
import styles from './Input.module.scss';
import {useStore} from "effector-react";
import {fetchResults, modSearch} from "../searchStore";


function Input() {
    const inputRef = useRef(null);
    const $modSearch = useStore(modSearch);
    const modSearchRef = useRef($modSearch);

    const sex_id = 1;

    useEffect(() => {
        if ($modSearch) inputRef.current.focus();
        else inputRef.current.blur();
        modSearchRef.current = $modSearch
    }, [$modSearch]);

    const [value, setValue] = useState('');
    const handleChange = (event) => (setValue(event.currentTarget.value));

    useEffect(() => {
        if (modSearchRef.current) fetchResults({sex_id, phrase: value})
    }, [sex_id, value]);

    return (
        <input
            value = { value }
            onChange = { handleChange }
            ref = { inputRef }
            placeholder={ 'Поиск по ключевому слову' }
            className={ styles.Input }
            type={ 'text' }
        />
    )
}

export {Input}