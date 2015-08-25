
var monthYearType = function(dateString) {


  this.dateString = dateString;
  this.month = parseInt(dateString.split("/")[0]);
  this.year  = parseInt(dateString.split("/")[1]);

  this.next = function () {

    if(this.month == 12) {
      this.month = 1;
      this.year +=  1;
    } else {
      this.month += 1;
    }

  }

  this.toNumber = function () {
    return parseInt(this.year.toString() + this.monthToString());
  }

  this.toString = function () {
    return this.monthToString() + "/" + this.year.toString();
  }

  this.monthToString = function () {
    return (this.month<10?"0":"") + this.month.toString();
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

monthYearType.monthsBetweenTwoDates = function (begin, end) {
    return (((end.year-begin.year) * 12) + end.month)-begin.month+1;
}