import React, {FC, useRef, useState} from 'react';

interface PaginationProps {
    page: number;
    setPage: (page: number) => any;
    countPages: number;
    limit: number;
    setLimit: (limit: number) => any;
}

const PaginationControl: FC<PaginationProps> = ({page, limit, setPage, countPages, setLimit}) => {

    const [inputPage, setInputPage] = useState<number>(page)


    return (
        <div className={"flex w-full justify-center items-center "}>
            <div className={"flex flex-col items-center proba-pro-light"}>
                <div className={"border-2 rounded-xl flex items-center justify-center px-3 py-1"}>
                    <button className={"proba-pro-bold text-3xl "}
                            onClick={() => {
                                if (page !== 1) {
                                    setPage(page - 1)
                                    setInputPage(inputPage - 1)
                                }
                            }}>-
                    </button>
                    <div className={"flex items-center justify-center relative"}>
                        <button onClick={() => {
                            setPage(1)
                            setInputPage(1)
                        }} className={"hover:text-blue-500 duration-100 ml-3"}>
                            1 ...
                        </button>

                        <div className={"mx-2"}>
                            {page}
                        </div>

                        <button onClick={() => {
                            setPage(countPages)
                            setInputPage(countPages)
                        }} className={"hover:text-blue-500 duration-100 mr-3"}>
                            ... {countPages}
                        </button>
                    </div>

                    <button className={"proba-pro-bold text-3xl "}
                            onClick={() => {
                                if (page !== countPages) {
                                    setPage(page + 1)
                                    setInputPage(inputPage + 1)
                                }
                            }}>+
                    </button>
                </div>
            </div>


            <div className={"flex items-center justify-center ml-4 border-2 rounded-2xl p-2"}>
                <label htmlFor="countOnPage">Кількість:</label>
                <select value={limit} onChange={(e) => {
                    setLimit(Number(e.target.value))
                    setInputPage(1)
                    setPage(1)
                }} className={"border-none focus:border-none ml-2"} name="" id="countOnPage">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>

                </select>
            </div>
        </div>
    );
};

export default PaginationControl;