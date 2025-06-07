document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const rowsPerPageSelect = document.getElementById('rowsPerPage');
  const table = document.getElementById('dataTable');
  const tbody = table.querySelector('tbody');
  const allRows = Array.from(tbody.querySelectorAll('tr'));
  let currentPage = 1;
  let filteredRows = [...allRows];

  function renderTable() {
    const rowsPerPage = parseInt(rowsPerPageSelect.value);
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedRows = filteredRows.slice(start, end);

    tbody.innerHTML = '';
    paginatedRows.forEach((row, index) => {
      row.querySelector('td').textContent = start + index + 1; // Update row number
      tbody.appendChild(row);
    });

    renderPagination();
  }

  function renderPagination() {
    let pagination = document.getElementById('pagination');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.id = 'pagination';
      pagination.style.marginTop = '10px';
      table.parentNode.appendChild(pagination);
    }
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredRows.length / parseInt(rowsPerPageSelect.value));
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.style.margin = '0 2px';
      btn.className = (i === currentPage ? 'active' : '');
      btn.addEventListener('click', () => {
        currentPage = i;
        renderTable();
      });
      pagination.appendChild(btn);
    }
  }

  function applyFilter() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredRows = allRows.filter(row =>
      Array.from(row.cells).some(cell =>
        cell.textContent.toLowerCase().includes(searchTerm)
      )
    );
    currentPage = 1; // Reset to first page after filter
    renderTable();
  }

  searchInput.addEventListener('input', applyFilter);
  rowsPerPageSelect.addEventListener('change', () => {
    currentPage = 1;
    renderTable();
  });

  // Initial load
  applyFilter();
});