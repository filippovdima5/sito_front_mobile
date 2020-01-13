import React, {useMemo} from 'react';
import {DoneBtn} from "../_bank/DoneBtn/DoneBtn";
import {setVisFiltersList} from "../filterListStore";
import {productsCountsStore, loadingProducts} from "../../productsStore";
import {useStore} from "effector-react";

const handleClose = () => (setVisFiltersList(false));


const createTitle = (total) => {
    const template = `Посмотреть ${total} `;
    const lastDig = +total.toString().slice(-1);

    if (total === 0) return ('Нет доступных предложений');
    if (lastDig === 1) return (template + 'предложение');
    if (lastDig > 1 && lastDig <= 4) return (template + 'предложения');
    if (lastDig > 4 || lastDig === 0) return (template + 'предложений');
};

function TotalProductsButton({visDone}) {

    const {total} = useStore(productsCountsStore);
    const loading = !useStore(loadingProducts);

    const title = useMemo(() => {
        return createTitle(total);
    }, [total]);


    return (
        <DoneBtn
            loading={loading}
            title={title}
            zIndex={1}
            visIn={visDone}
            callback={handleClose}
        />
    )
}

export {TotalProductsButton}