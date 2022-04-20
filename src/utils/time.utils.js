
export const convertTime = (time) => {
    let hr = Number(time.substring(0, 2))
    let min = (time.substring(2, 4))

    if(hr < 12){
        return String(hr).length==1?"0"+hr+":"+min+" AM":hr+":"+min+" AM"
    }else{
        return String(hr-12).length==1?"0"+(hr-12)+":"+min+" PM":hr-12+":"+min+" PM"
    }
}
