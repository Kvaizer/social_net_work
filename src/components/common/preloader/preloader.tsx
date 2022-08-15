import React from 'react';
import preloader from '../../../assets/images/preloader.gif';

const Preloader = () => {
    return (
        <div>
            <img  width={200} height={'auto'} src={preloader}/>
        </div>
    );
};

export default Preloader;