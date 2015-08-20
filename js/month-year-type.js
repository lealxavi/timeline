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