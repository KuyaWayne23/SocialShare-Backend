module.exports.clock = (request, response, next) => {
    const TimeObject = new Date();
    const Month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const Week = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
  
    let hours = TimeObject.getHours();
    let median = 'AM';

    const minutes = TimeObject.getMinutes();
    const seconds = TimeObject.getSeconds();
    
    const date = TimeObject.getDate();
    const day = Week[TimeObject.getDay()];
    const month = Month[TimeObject.getMonth()];
    const year = TimeObject.getFullYear();
  
    if (hours > 12) {
      hours = hours - 12;
      median = 'PM';
    }
  
    response.send({ time: { day, month, date, year, hours, minutes, seconds, median }});
};