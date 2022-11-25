import React from 'react';

interface IError {
    errorText: string
}

/**
 *
 * логика компонента выскакивающего в случае ошибки
 *
 * @param errorText
 * @constructor
 */

const Error = ({errorText}: IError) => {
    return (
        <div style={{color: 'red', position: 'absolute'}}>
            {errorText}
        </div>
    );
};

export default Error;