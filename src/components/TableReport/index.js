import React, { useState } from 'react';
import './Table.css';
import Expand from '../assets/images/expand.svg';
import Collapse from '../assets/images/collapse.svg';
import Left from '../assets/images/leftArrow.svg';
import Right from '../assets/images/rightArrow.svg';

function Table({ data, itemsPerPage }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (categoryId) => {
    if (expandedRows.includes(categoryId)) {
      setExpandedRows(expandedRows.filter((id) => id !== categoryId));
    } else {
      setExpandedRows([...expandedRows, categoryId]);
    }
  };

  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <tr
          className={`table-row ${expandedRows.includes(item.id) ? 'expanded' : ''}`}
          onClick={() => handleRowClick(item.id)}
        >
          <td className="categoriesName">
            {item.subcategories && item.subcategories.length > 0 && (
              <span
                className="expand-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRowClick(item.id);
                }}
              >
                <>
                  {expandedRows.includes(item.id) ? (
                    <img src={Collapse} className="collapseIcon" alt="Collapse" />
                  ) : (
                    <img src={Expand} className="expandIcon" alt="Expand" />
                  )}
                </>
              </span>
            )}
            {item.name}
          </td>
          <td>{item.matches ? item.matches.approved : ''}</td>
          <td>{item.matches ? item.matches.pending : ''}</td>
          <td>{item.nonMatches ? item.nonMatches.competitor : ''}</td>
          <td>{item.nonMatches ? item.nonMatches.nonCompetitor : ''}</td>
        </tr>
        {expandedRows.includes(item.id) && item.subcategories && item.subcategories.length > 0 && (
          <React.Fragment>
            {renderRows(item.subcategories, level + 1)}
          </React.Fragment>
        )}
      </React.Fragment>
    ));
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const generatePaginationNumbers = () => {
    const paginationNumbers = [];
    const maxVisiblePages = 3;
    const totalVisiblePages = maxVisiblePages + 2;
  
    let startPage = currentPage - Math.floor(maxVisiblePages / 2);
    let endPage = currentPage + Math.floor(maxVisiblePages / 2);
  
    if (startPage < 1) {
      startPage = 1;
      endPage = totalVisiblePages - 1;
    }
  
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - totalVisiblePages + 2;
      if (startPage < 1) {
        startPage = 1;
      }
    }
  
    if (startPage !== 1) {
      paginationNumbers.push(
        <button key={1} onClick={() => goToPage(1)} className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}>
          1
        </button>
      );
  
      if (startPage !== 2) {
        paginationNumbers.push(<span className='pagination-dots' key="dots-start">...</span>);
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
  
    if (endPage !== totalPages) {
      if (endPage !== totalPages - 1) {
        paginationNumbers.push(<span className='pagination-dots' key="dots-end">...</span>);
      }
  
      paginationNumbers.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}
        >
          {totalPages}
        </button>
      );
    }
  
    return paginationNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table className="table">
        <thead>
            <tr>
                <th>Category</th>
                <th colSpan={2}>Matches</th>
                <th colSpan={2}>Non-Matches</th>
            </tr>
            <tr>
                <th></th>
                <th>Approved</th>
                <th>Pending</th>
                <th>Competitor</th>
                <th>Non-Competitor</th>
            </tr>
        </thead>
        <tbody>{renderRows(currentItems)}</tbody>
      </table>

      <div className="pagination">
        <div>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="leftButton"
          >
            <img src={Left} className="" alt="Left" />
            Previous
          </button>
        </div>
        <div className="pagination-numbers">{generatePaginationNumbers()}</div>
        <div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="rightButton"
          >
            Next
            <img src={Right} className="" alt="Right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
