var timeLine = function (json) {

  this.json = json;
  this.datesAndLabelsObj = null;
  this.months = null;
  this.monthsDivWidth = null;

  this.inicialitze = function () {
    this.datesAndLabelsObj = new DatesAndLabels(this.json);
    this.months = this.datesAndLabelsObj.months;
    this.monthsDivWidth = 100 / (this.months + 1);

    for (var i = 0; i < this.json.length ; i++)
      this.addRow(this.json[i].label, new monthYearType(this.json[i].begin), new monthYearType(this.json[i].end));

  }

  this.addRow = function (labelName, startDate, endDate) {

    if (labelName == null || labelName.length < 1)
      throw ("You have to specify a labelName in function addRow");

    var rowElement = document.createElement("div");
    var labelElement = document.createElement("div");

    rowElement.className     = "row";
    labelElement.className   = "label";
    labelElement.textContent = labelName;
    labelElement.style.width = (this.monthsDivWidth * 1) + "%";

    rowElement.appendChild(labelElement);

    var dateIterator = new monthYearType(this.datesAndLabelsObj.min);
    var lastDate     = new monthYearType(this.datesAndLabelsObj.max);
  

    while (dateIterator.lessOrEqualTo(lastDate)) {

      var monthElement = document.createElement("div");
      monthElement.className = "month";
      monthElement.style.width = this.monthsDivWidth + "%";
      
      if (dateIterator.equalTo(startDate)) {
        monthElement.className += " start-month"; 
      }

      if (dateIterator.equalTo(endDate)) {
        monthElement.className += " end-month"; 
      }

      if(dateIterator.insideRange(startDate,endDate)) {
        monthElement.className += " middle-month"; 
      }

      rowElement.appendChild(monthElement);
      dateIterator.next();

    }
    
    document.querySelector("#timeline").appendChild(rowElement);
  }

  this.inicialitze();
  
}

timeLineObj = new timeLine(jsonString);

