import React from 'react';

const SearchStatus = ({lenght}) => {

    if (lenght <= 4 && lenght>1) {
        return  <span className='badge bg-primary p-2 w-25'>{lenght} человека тусанет с тобой сегодня</span>

    }
    else if (lenght === 1){
       return  <span className='badge bg-primary p-2 w-25'>{lenght} человек тусанет с тобой сегодня</span>
    }
    else if (lenght === 0){
        return  <span className='badge bg-danger p-2 w-25'> никто не тусанет с тобой сегодня</span>
    }
    return  <span className='badge bg-primary p-2 w-25'>{lenght} человек тусанет с тобой сегодня</span>
};

export default SearchStatus;