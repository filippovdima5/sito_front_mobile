import React from 'react';



const InputText = React.memo(({
    placeholder,
    value,
    onChange,
    className,
    onBlur
                          }) => {



    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            type={'text'}
            onBlur={onBlur}
        />
    )
});

export {InputText}