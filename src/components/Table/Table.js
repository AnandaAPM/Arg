import React, { useState } from 'react';

import { useTable } from 'react-table';
import { useFilters, useSortBy } from 'react-table/dist/react-table.development';

export default function Table({ columns, data }) {

    const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilterInput(value);
  };

  <input
    value={filterInput}
    onChange={handleFilterChange}
    placeholder={"Search name"}
  />
  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data }, useFilters, useSortBy);

    



    return (
        <table{...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroups) => (
                    <tr {...headerGroups.getHeaderGroupProps()}>
                        {headerGroups.headers.map((column) => (
                            <th  {...column.getHeaderProps(column.getSortByToggleProps())}
                                className={
                                    column.isSorted
                                        ? column.isSortedDesc
                                            ? "sort-desc"
                                            : "sort-asc"
                                        : ""
                                }
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}