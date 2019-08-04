 export function  formatDate(date)  {
    var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
    ];
    var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear().toString().substr(-2);
    
    return weekDays[date.getDay()] + ', ' + monthNames[monthIndex] + ' ' + day;
}


export function formatTime( timeString ) {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
            
    return timeString;
}
