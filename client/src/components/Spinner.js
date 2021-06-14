import React from 'react';
import { PuffLoader } from 'react-spinners';

const Spinner = () => (
    <div className="spinner">
        <PuffLoader color={'#1eaedb'} size={60} />
    </div>
)

export default Spinner;