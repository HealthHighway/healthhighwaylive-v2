import { serverConfig } from "../constants/server.constants"

export const getMyLocation = async () => {

    try{
        const response = await fetch(`https://ipinfo.io/json?token=${serverConfig.IP_INFO_TOKEN}`)
        const data = await response.json()
        return data
    }catch(err){
        console.log(err)
        return null
    }
    
}