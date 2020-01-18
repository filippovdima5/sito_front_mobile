import React from 'react';
import styles from './RangeInputs.module.scss';
import {validateInputNumber} from "../../../../../helpers/functions/validateInputNumber";
import {filtersState} from "../../../../../pages/Products/store";
import {useStore} from "effector-react";


import {setFilterRange} from "../../filterListStore";

import {InputText} from "../../../../../atoms/Input/InputText";


function RangeInputs({type, range = [0, 1]}) {

    const activeValues = useStore(filtersState)[type];

    const handleSetFilter = (e, index) => (
       setFilterRange({
           type,
           index: index,
           id: validateInputNumber(e.currentTarget.value)
       })
    );
   // const handleFocus = (e, index) => setRange();

    return (
        <div className={styles.RangeInputs}>
            <div className={styles.inputsWrap}>
                <div className={styles.wrap}>
                    <InputText
                        value={!activeValues[0] ? '' : activeValues[0]}
                        onChange={(e) => handleSetFilter(e, 0)}
                        placeholder={`от ${range[0]}`}
                        className={styles.input}
                        //onBlur = {(e) => handleSetFilter(e, 0)}

                    />
                </div>

                <div className={styles.wrap}>
                    <InputText
                        value={!activeValues[1] ? '' : activeValues[1]}
                        onChange={(e) => handleSetFilter(e, 1)}
                        placeholder={`до ${range[1]}`}
                        className={styles.input}
                        //onBlur = {(e) => handleSetFilter(e, 1)}
                    />
                </div>
            </div>
        </div>
    )
}

export {RangeInputs}