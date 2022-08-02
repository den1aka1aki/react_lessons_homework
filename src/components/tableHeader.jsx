import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    return (
        <thead>
            <tr className=''>
                {Object.keys(columns).map((colum) => (
                    <th
                        key={colum}
                        onClick={columns[colum].path ? () => handleSort(columns[colum].path) : undefined}
                        {...{ role: columns[colum].path && 'button' }}
                        className='' scope='col'> {columns[colum].name} </th>
                ))}

                {/* <th className='' scope='col'> Качества </th> */}
                {/* <th onClick={() => handleSort('profession.name')} className='' scope='col'> Профессия </th> */}
                {/* <th onClick={() => handleSort('completedMeetings')} className='' scope='col'> Встретился, раз </th> */}
                {/* <th onClick={() => handleSort('rate')} className='' scope='col'> Оценка </th> */}
                {/* <th></th> */}
                {/* <th></th> */}
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
