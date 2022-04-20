import RNCalendarEvents from "../nativeBridge/calendar.bridge";

const dayMapping = {
    "Mon" : "MO",
    "Tue" : "TU",
    "Wed" : "WE",
    "Thu" : "TH",
    "Fri" : "FR",
    "Sat" : "SA",
    "Sun" : "SU"
}

export function giveFirstDayLastDate(startingDate) {
    let extract = new Date(startingDate)
    let temp = new Date(extract.getFullYear(), extract.getMonth(), extract.getDate(), extract.getHours(), Number(extract.getMinutes()) + 50, extract.getSeconds())
    return temp.toISOString()
}

export async function saveEvents(noc, topLevelStartDate, topLevelEndDate, rruleEndDate, days, title) {

    try{
        // asking for calendar permissions
        let granted = true;
        const status = await RNCalendarEvents.checkPermissions()
        console.log(status)
        if(status != "authorized"){
            granted = false
            const status = await RNCalendarEvents.requestPermissions()
            console.log(status)
            if(status == "authorized"){
                granted = true
            }
        }

        console.log("Permissions granted : ", granted)

        if(granted){
            let calendarId;
            let calendars = await RNCalendarEvents.findCalendars()
            // check if calendar named HealthHighwayEvents4562 exists or not...if not then create the same calendar
            calendars.forEach(calendar => {
                if(calendar.title == "healthhighway-reminder-events"){
                    calendarId = calendar.id
                    return
                }
            })

            if(!calendarId){
                calendarId = await RNCalendarEvents.saveCalendar({
                    title: 'healthhighway-reminder-events',
                    color: 'blue',
                    entityType: "event",
                    source: {
                        isLocalAccount : true,
                        name : "healthhighway-reminder-events"
                    },
                    name: 'healthhighway-reminder-events',
                    ownerAccount: 'personal',
                    accessLevel: "owner",
                });
            }

            console.log("Calendar Id : ", calendarId)
            console.log(topLevelStartDate)
            console.log(topLevelEndDate)
            console.log(rruleEndDate)

            if(noc == 1){
                let eventId = await RNCalendarEvents.saveEvent(title, {
                    calendarId : `${calendarId}`,
                    title : title,
                    startDate : topLevelStartDate,
                    endDate : topLevelEndDate,
                    alarms : [{ date : 30 }, { date : 15 }]
                })
                console.log(eventId)
                return true
            }else{
                let mappedDays = [];
                days.forEach(day => {
                    if(dayMapping[day]){
                        mappedDays.push(dayMapping[day])
                    }
                })
                console.log(mappedDays)
                let eventId = await RNCalendarEvents.saveEvent(title, {
                    calendarId : `${calendarId}`,
                    title : title,
                    startDate : topLevelStartDate,
                    endDate : topLevelEndDate,
                    recurrenceRule : {
                        frequency : "weekly",
                        daysOfWeek : mappedDays,
                        duration : null,
                        endDate : rruleEndDate
                    },
                    alarms : [{ date : 30 }, { date : 15 }]
                })
                console.log(eventId)
                return true
            }

            
        }
        else{
            throw new Error("Not able to save to calendar")
        }

    }catch(err){
        console.log(err)
        return false
    }
    

}

