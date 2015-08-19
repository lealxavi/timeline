var monthYearType = function(dateString) {

  this.dateString = dateString;
  this.month = parseInt(dateString.split("/")[0]);
  this.year  = parseInt(dateString.split("/")[1]);

  this.next = function () {
    var nextMonth = null;
    var nextYear  = null;

    if(this.month == 12) {
      nextMonth = 1;
      nextYear  = this.year + 1;
    } else {
      nextMonth = this.month + 1;
      nextYear = this.year;
    }

    return new monthYearType(nextMonth+"/"+nextYear);

  }

  this.toNumber = function () {
    var year  = this.dateString.split("/")[1];
    var month = this.dateString.split("/")[0];

    if (month.length == 1)
      month = "0" + month;

    return parseInt(year + month);
  }

  this.lessOrEqualTo = function (dateToCompare) {
    return this.toNumber() <= dateToCompare.toNumber();
  }

  this.equalTo = function (dateToCompare) {
    return dateToCompare.month == this.month && dateToCompare.year == this.year;
  }

  this.insideRange = function (startDate,endDate) {
    var dateToNumber = this.toNumber(); 
    return startDate.toNumber() <= dateToNumber && dateToNumber <= endDate.toNumber(); 
  }

}

var DatesAndLabels = function (json) {

  this.json   = json;
  this.min    = null;
  this.max    = null;
  this.months = null;

  this.parse = function () {
  
    var tmpMin  = Number.MAX_VALUE;
    var tmpMax  = Number.MIN_VALUE;

    for (var i = 0; i < this.json.length; i++) {

      var beginToNumber = this.dateToNumber(this.json[i].begin);
      var endToNumber   = this.dateToNumber(this.json[i].end);
      
      if (beginToNumber > endToNumber) 
        throw "There's a problem with the date ("+ i +") of the string";

      this.json[i].months = this.monthsBetweenTwoDates(this.json[i].begin,this.json[i].end);

      if (beginToNumber < tmpMin) {
        this.min = this.json[i].begin;
        tmpMin   = beginToNumber;
      }
      if (endToNumber > tmpMax) {
        this.max = this.json[i].end;
        tmpMax   = endToNumber;
      }
    }

    this.months = this.monthsBetweenTwoDates(this.min,this.max);
  }

  this.monthsBetweenTwoDates = function (beginDate, endDate) {
    var baseYear   = parseInt(beginDate.split("/")[1]);
    var lastYear   = parseInt(endDate.split("/")[1]);

    var beginMonth = parseInt(beginDate.split("/")[0]);
    var endMonth   = parseInt(endDate.split("/")[0]);


    return (((lastYear-baseYear) * 12) + endMonth)-beginMonth+1;
  }

  this.dateToNumber = function (date) {
    return parseInt(date.split("/")[1] + date.split("/")[0]);
  }

  this.parse();

};

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
      dateIterator = dateIterator.next();

    }
    
    document.querySelector("#timeline").appendChild(rowElement);
  }

  this.inicialitze();
  
}

timeLineObj = new timeLine(jsonString);

