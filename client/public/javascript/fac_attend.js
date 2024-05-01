const monthSelect = document.getElementById('month-select');
const numRowsInput = document.getElementById('num-rows');
const generateButton = document.getElementById('generate-button');
const tableArea = document.getElementById('table-area');

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');


const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
  const dropdownIndex = dropdown.dataset.dropdownIndex; // Get index

  dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    dropdownToggle.querySelector('.dropdown-arrow').textContent = dropdownMenu.classList.contains('show') ? '▲' : '▼'; 
     // Dynamic Arrow & Close on Reclick
     const isMenuOpen = dropdownMenu.classList.contains('show') 
     dropdownToggle.querySelector('.dropdown-arrow').textContent = isMenuOpen ? '▲' : '▼'; 
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault(); 
      dropdowns[dropdownIndex].querySelector('.dropdown-toggle').textContent = item.textContent; // Target the correct button
      dropdownMenu.classList.remove('show');
      dropdowns[dropdownIndex].querySelector('.dropdown-toggle').classList.add('selected');
    });
  });
});

function gatherSelectedOptions() {
  const dropdowns = document.querySelectorAll('.dropdown');
  const selectedOptions = {};

  dropdowns.forEach(dropdown => {
    const dropdownIndex = dropdown.dataset.dropdownIndex;
    const selectedOption = dropdown.querySelector('.dropdown-toggle').textContent.trim();
    selectedOptions[`dropdown${dropdownIndex}`] = selectedOption;
  });

  return JSON.stringify(selectedOptions);
}
const dropdownData = gatherSelectedOptions(); // data of the selected parameters




const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"  
];

// Default Values
const selectedMonth = 1;  // January
      
const daysInMonth = new Date(2024, selectedMonth, 0).getDate(); 

// Sample data for names and roll numbers
const data = [
  { name: "John", rollNo: "101" },
  { name: "Alice", rollNo: "102" },
  { name: "Bob", rollNo: "103" },
  { name: "Priya", rollNo: "104" },
  { name: "Rahul", rollNo: "105" },
  { name: "Sneha", rollNo: "106" },
  { name: "Amit", rollNo: "107" },
  { name: "Ananya", rollNo: "108" },
  { name: "Vikram", rollNo: "109" },
  { name: "Divya", rollNo: "110" },
  { name: "Arjun", rollNo: "111" },
  { name: "Pooja", rollNo: "112" },
  { name: "Rohan", rollNo: "113" },
  { name: "Ishaan", rollNo: "114" },
  { name: "Kriti", rollNo: "115" },
  { name: "Nikhil", rollNo: "116" },
  { name: "Tanvi", rollNo: "117" },
  { name: "Yash", rollNo: "118" },
  { name: "Prachi", rollNo: "119" },
  { name: "Riya", rollNo: "120" },
  { name: "Yash", rollNo: "118" },
  { name: "Prachi", rollNo: "119" },
  { name: "Riya", rollNo: "120" },
  // Add more data as needed
];
const desiredRows = data.length;

generateTable(selectedMonth, daysInMonth, desiredRows, data); 

function generateTable(month, days, rows, data) {
    tableArea.innerHTML = ''; // Clear previous table
  
    const table = document.createElement('table');

    // Create header row for Name and Roll Number
    const headerRow = table.insertRow(); 
    const nameHeaderCell = headerRow.insertCell();
    nameHeaderCell.textContent = 'Name'; 
    const rollNoHeaderCell = headerRow.insertCell();
    rollNoHeaderCell.textContent = 'Roll No.';
  
    // Create header row (optional)

    for (let i = 0; i < days; i++) {
      const headerCell = headerRow.insertCell();
      const date = moment().date(i + 1).month(month - 1); // Construct date object
    headerCell.innerHTML = `
       <div>${date.format('MMM')}</div>
       <div>${date.format('DD')}</div> 
       <div>${date.format('ddd')}</div> 
    `;
    }
  
    // Create data rows
    for (let i = 0; i < rows; i++) {
      const row = table.insertRow();
        // Name Cell
        const nameCell = row.insertCell();
        nameCell.textContent = data[i] ? data[i].name : ''; // Populate with data if available
        nameCell.contentEditable = 'false'; 
  
        // Roll No Cell
        const rollNoCell = row.insertCell();
        rollNoCell.textContent = data[i] ? data[i].rollNo : ''; // Populate with data if available
        rollNoCell.contentEditable = 'false';
  
        // Rest of the attendance cells
        for (let j = 2; j < days + 2; j++) { // Start from 3rd column
          const cell = row.insertCell();
          cell.contentEditable = 'true';
        }
    }
  
    tableArea.appendChild(table);

    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
      cell.addEventListener('keydown',(event) => handleCellInput(event, table));
    });
}

let allAttendanceData = [];

function handleCellInput(event, table) {

  const currentCell = event.target; 
  if (currentCell.textContent === 'P' || currentCell.textContent === 'A') {
    if (event.key === 'ArrowDown' || event.key === 'Enter'){
      moveFocusDown(currentCell, table);
    }
    if (event.key === 'ArrowUp') {
      moveFocusUp(currentCell, table); 
    }
  } else if (event.key === 'Enter') { // Updated condition
    currentCell.innerHTML = '<span style="color: #3cf825 ;">P</span>';
    currentCell.style.backgroundColor = '#e6f9c8';
    moveFocusDown(currentCell, table);
  } else if (event.key === 'ArrowDown' && currentCell.textContent !== 'P' && currentCell.textContent !== 'A') { // Added condition 
    currentCell.innerHTML = '<span style="color: #f72623 ;">A</span>';
    moveFocusDown(currentCell, table);
    currentCell.style.backgroundColor = '#fbbdbd';
  } else if (event.key === 'ArrowUp')  {
    moveFocusUp(currentCell, table); 
  }

    
    const currentRowIndex = currentCell.parentNode.rowIndex - 1; // Adjust for header row
    const currentColIndex = currentCell.cellIndex;

    if (currentColIndex >= 2) {
        const studentData = data[currentRowIndex];
        const status = currentCell.textContent.trim(); // Get the status entered by the user

        // Construct JSON object
        allAttendanceData[currentRowIndex]  = {
            name: studentData.name,
            rollNo: studentData.rollNo,
            status: status
        };

        console.log(allAttendanceData); // Output JSON object to console (you can further process it as needed)

        // You can return the JSON object or use it as needed
        return allAttendanceData;
    }


}

function moveFocusDown(currentCell, table) {
    const currentRowIndex = currentCell.parentNode.rowIndex;  // Get index of current row
    const currentColIndex = currentCell.cellIndex;  // Get index of current column
    const tableRows = table.rows; // Get all table rows
  
    const nextRowIndex = currentRowIndex + 1; // Calculate next row index
    if (nextRowIndex < tableRows.length) { // Check if next row is within table bounds
      const nextCell = tableRows[nextRowIndex].cells[currentColIndex];
      nextCell.focus();
    }
}

function moveFocusUp(currentCell, table) {
  const currentRowIndex = currentCell.parentNode.rowIndex;
  const currentColIndex = currentCell.cellIndex;
  const tableRows = table.rows; 

  const prevRowIndex = currentRowIndex - 1; // Calculate previous row index
  if (prevRowIndex >= 0) { // Check if the previous row is within table bounds
      const prevCell = tableRows[prevRowIndex].cells[currentColIndex];
      prevCell.focus();
  }
}
