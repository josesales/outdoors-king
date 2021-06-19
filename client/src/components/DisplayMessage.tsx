import React, { useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import { useAppDispatch } from '../redux/hooks';
import { displayMessage } from '../redux/message/messageReducer';

const DisplayMessage = ({ type, message }: { type: string, message: string }): JSX.Element => {

    const [onDisplay, setOnDisplay] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(displayMessage({ type: null, message: null }))
            setOnDisplay(false);
        }, 5000)
    }, [dispatch])


    if (type === 'error') {
        return (
            <React.Fragment>
                {
                    onDisplay ?
                        <div role="alert" className="w-full sm:w-9/12 md:w-7/12 mb-8">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Error!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <p>{message}</p>
                            </div>
                        </div>
                        : null

                }
            </React.Fragment>
        );
    }

    if (type === 'alert') {
        return (
            <React.Fragment>
                {
                    onDisplay ?
                        <div role="alert" className="w-full sm:w-9/12 md:w-7/12 mb-8">
                            <div className="bg-yellow-500 text-white font-bold rounded-t px-4 py-2">
                                Alert!
                            </div>
                            <div className="border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700">
                                <p>{message}</p>
                            </div>
                        </div>
                        : null

                }
            </React.Fragment>
        );
    }

    if (type === 'success') {
        return (
            <React.Fragment>
                {
                    onDisplay ?
                        <div role="alert" className="w-full sm:w-9/12 md:w-7/12 mb-8">
                            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                Success!
                            </div>
                            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                <p>{message}</p>
                            </div>
                        </div>
                        : null

                }
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {
                onDisplay ?
                    <div role="alert">
                        <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                            Info
                        </div>
                        <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
                            <p>{message}</p>
                        </div>
                    </div>
                    : null

            }
        </React.Fragment>
    );
}

export default DisplayMessage;