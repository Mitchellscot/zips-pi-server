const getFileName = () => {
    let day = new Date();
    let dd = day.getDate()
    let mm = day.getMonth()+1;
    let yyyy = day.getFullYear();
    let hh = day.getHours();
    let mn = day.getMinutes();
    let ss = day.getSeconds();
    if(dd<10) {
        dd = '0'+ dd
    } 
    if(mm<10) {
        mm = '0'+ mm
    }
    if(mn<10) {
        mn = '0'+ mn
    }
    if(ss<10) {
        ss = '0'+ ss
    }
    if(hh<10) {
        hh = '0'+ hh
    }
    return yyyy + mm + dd + hh + mn + ss;
}
module.exports = getFileName;