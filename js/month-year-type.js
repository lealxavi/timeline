
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
    return monthYearType.toNumber(this.month,this.year);
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

monthYearType.toNumber = function (monthInt,yearInt) {
    monthString = (monthInt<10?"0":"") + monthInt.toString();
    return parseInt(yearInt.toString() + monthString);
}