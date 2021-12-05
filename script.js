function TableManager(selector, options) {
  options = options || {};
  var upIcon = document.createElement('i');
  var downIcon = document.createElement('i');
  upIcon.className = 'fas fa-sort-up';
  downIcon.className = 'fas fa-sort-down';
  var defaultIcons = { asc: upIcon, desc: downIcon };

  var manager = {
    table: '',
    tBodies: '',
    tHead: '',
    headings: '',
    headingNames: '',
    valueRows: '',
    currentSorting: {
      column: '',
      direction: '',
    },
    icons: options.icons || defaultIcons,
    update() {
      console.log(this.sortAscendingIcon);
      this.table = document.querySelector(selector);
      if (!this.table)
        return console.error(
          `TableManager: The selector (${
            selector || ''
          }) did not reference an element`
        );
      this.tBodies = [...this.table.tBodies];
      this.tHead = this.table.tHead;
      this.headings = [...this.tHead.rows['0'].cells];
      this.headingNames = this.headings.map((cell) =>
        cell.textContent.replace(/\s+/g, '')
      );
      this.valueRows = [...this.tBodies[0].rows];
      // Add onclick to headings for sorting, and data attributes
      this.headings.forEach((heading, index) => {
        var columnName = this.headingNames[index];
        heading.dataset.column = columnName;
        heading.onclick = () => this.toggleSortColumn(columnName);
      });
      return this;
    },
    updateValueRows() {
      this.valueRows = [...this.tBodies[0].rows];
      return this;
    },
    deleteAllValueRows() {
      this.tBodies.forEach((tBody) => {
        while (tBody.rows.length > 0) {
          tBody.deleteRow(0);
        }
      });
      this.updateValueRows();
      return this;
    },
    appendValueRows(rows, tbody) {
      if (!rows)
        return console.error(
          'TableManager: appendValueRows takes an array of row data'
        );
      var tBody = this.tBodies[tbody] || this.tBodies[0];
      rows.forEach((row) => {
        tBody.append(row);
      });
      this.updateValueRows();
      return this;
    },
    replaceValueRows(rows) {
      this.deleteAllValueRows();
      this.appendValueRows(rows);
      return this;
    },
    makeRowFromData(data) {
      var row = document.createElement('tr');
      var columnNames = Object.keys(data);
      var missingColumns = columnNames.filter(
        (insertColumn) => !this.headingNames.includes(insertColumn)
      );
      if (missingColumns.length) {
        missingColumns.forEach((missingColumn) =>
          console.error(
            `TableManager: There is no column named ${missingColumn}`
          )
        );
        return false;
      }
      this.headingNames.forEach((name) => {
        var cell = row.insertCell(-1);
        cell.innerHTML = Object.keys(data).includes(name) ? data[name] : '';
      });
      return row;
    },
    makeMultipleRowsFromData(rowsData) {
      var rows = [];
      rowsData.forEach((rowData) => rows.push(this.makeRowFromData(rowData)));
      var rejectedRows = rows.filter((row) => !row).length;
      return rows.includes(false)
        ? console.error(`TableManager: ${rejectedRows} row(s) were rejected`)
        : rows;
    },
    sortColumn(column, direction) {
      var columnIndex = this.headingNames.indexOf(column);
      this.valueRows.sort((row1, row2) => {
        var value1 = row1.cells[columnIndex].textContent.toLowerCase();
        var value2 = row2.cells[columnIndex].textContent.toLowerCase();

        var returnValue = value1 > value2 ? 1 : value1 === value2 ? 0 : -1;
        return direction ? returnValue : -returnValue;
      });
      this.replaceValueRows(this.valueRows).currentSorting = {
        column: column,
        direction: direction,
      };
      // not working yet
      this.removeIconFromHeadings().addIconToCell(
        column,
        this.icons[direction ? 'asc' : 'desc']
      );
      return this;
    },
    toggleSortColumn(column) {
      var direction =
        column === this.currentSorting.column
          ? !this.currentSorting.direction
          : true;
      this.sortColumn(column, direction);
      return this;
    },
    addIconToCell(column, icon) {
      // not working yet
      console.log(icon);
      console.log(this.headings[this.headingNames.indexOf(column)]);
      this.headings[this.headingNames.indexOf(column)].append(icon);
      return this;
    },
    removeIconFromHeadings() {
      this.headings.forEach((heading) => {
        var icon = heading.querySelector('i');
        icon ? icon.remove() : '';
      });
      return this;
    },
    removeImageFromHeadings() {
      this.headings.forEach((heading) => {
        var img = heading.querySelector('img');
        icon ? icon.remove() : '';
      });
      return this;
    },
  };

  manager.update();

  return manager;
}

var tableManager = TableManager('table');
console.log(tableManager.valueRows);
console.log();
var newRows = tableManager.deleteAllValueRows().makeMultipleRowsFromData([
  {
    Person2: 'bread',
    Person1: 'cheese',
    Person3: 'xbox',
  },
  {
    Person2: 'I did it',
    Person3: 'cool',
    Person1: 'ok',
  },
  {
    Person1: 0,
    Person2: 'Macdonald Love',
    Person3: 172,
  },
  {
    Person1: 1,
    Person2: 'Snow Keith',
    Person3: 821,
  },
  {
    Person1: 2,
    Person2: 'Nixon Middleton',
    Person3: 493,
  },
  {
    Person1: 3,
    Person2: 'Liz Perez',
    Person3: 153,
  },
  {
    Person1: 4,
    Person2: 'Woodward Frazier',
    Person3: 496,
  },
  {
    Person1: 5,
    Person2: 'Noel Shannon',
    Person3: 260,
  },
  {
    Person1: 6,
    Person2: 'Gay Luna',
    Person3: 863,
  },
  {
    Person1: 7,
    Person2: 'Hayes Logan',
    Person3: 521,
  },
  {
    Person1: 8,
    Person2: 'Briggs Espinoza',
    Person3: 861,
  },
  {
    Person1: 9,
    Person2: 'Bauer Wyatt',
    Person3: 325,
  },
  {
    Person1: 10,
    Person2: 'Drake Puckett',
    Person3: 598,
  },
  {
    Person1: 11,
    Person2: 'Liza Hull',
    Person3: 565,
  },
  {
    Person1: 12,
    Person2: 'Marian Soto',
    Person3: 286,
  },
  {
    Person1: 13,
    Person2: 'Moran Haney',
    Person3: 490,
  },
  {
    Person1: 14,
    Person2: 'Clarice Hood',
    Person3: 177,
  },
  {
    Person1: 15,
    Person2: 'Rowland Conner',
    Person3: 726,
  },
  {
    Person1: 16,
    Person2: 'Maura Cotton',
    Person3: 857,
  },
  {
    Person1: 17,
    Person2: 'May Santiago',
    Person3: 598,
  },
  {
    Person1: 18,
    Person2: 'Johnson Ward',
    Person3: 736,
  },
  {
    Person1: 19,
    Person2: 'Murray Nichols',
    Person3: 664,
  },
]);
console.log(tableManager.valueRows);

tableManager.appendValueRows(newRows);
console.log(tableManager.valueRows);
tableManager.toggleSortColumn('Person2');
tableManager.toggleSortColumn('Person2');
tableManager.toggleSortColumn('Person2');
tableManager.toggleSortColumn('Person2');
