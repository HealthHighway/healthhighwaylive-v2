
const env = "dev";

const configMain = {
    "prod" : {
        BASE_PATH : "https://api.healthhighway.co.in/api",
        API_KEY : "Basic ZjVVanpqRzd1RXM0cjZyRGRORmM6dTY2OHJiUTM4V2pWQjVINmFZUFc=",
        RZP_KEY : "rzp_live_gXNmHts9xWKyy8",
        RZP_AUTH : "Basic cnpwX2xpdmVfZ1hObUh0czl4V0t5eTg6T3o2T0FPeWM5ZHd5eXNONVhOZTc5VHpj",
        IP_INFO_TOKEN : "d21e13335f924c"
    },
    "dev" : {
        // BASE_PATH : "http://ec2-3-108-235-67.ap-south-1.compute.amazonaws.com/api",
        BASE_PATH : "https://api.healthhighway.co.in/api",
        API_KEY : "Basic ZjVVanpqRzd1RXM0cjZyRGRORmM6dTY2OHJiUTM4V2pWQjVINmFZUFc=",
        RZP_KEY : "rzp_test_aU7zQfbeDZ2pnx",
        RZP_KEY_SECRET : "2MxqfxBEHGR7jwruFRbnJJcM",
        RZP_AUTH : "Basic cnpwX3Rlc3RfYVU3elFmYmVEWjJwbng6Mk14cWZ4QkVIR1I3andydUZSYm5KSmNN",
        IP_INFO_TOKEN : "d21e13335f924c"
    },
}

export const serverConfig = env == "prod"?configMain.prod : configMain.dev
