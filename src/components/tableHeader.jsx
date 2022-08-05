import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SortIcon from './sortIcon';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [directionIcon, setDirectionIcon] = useState('');
    const handleSort = (item) => {
        selectedSort.order === 'asc' ? setDirectionIcon('up') : setDirectionIcon('down');
        selectedSort.order === 'asc' ? console.log('asc') : console.log('desc');
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path, columns[column].name) : undefined}
                        {...{ role: columns[column].path && 'button' }}
                        scope='col'>
                        {columns[column].name}
                        <SortIcon direction={directionIcon} />
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
