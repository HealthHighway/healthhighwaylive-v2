import React from 'react'
import {View, Text, Image, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { serverConfig } from '../../../../constants/server.constants'
import { scale } from '../../../../theme/metric'
import BeingCurated from './BeingCurated'
import ListCurated from './ListCurated'
import NoBioNoCurated from './NoBioNoCurated'

class Curated extends React.Component {

    state = {
        curated : [],
        status : 0
    }

    async componentDidMount(){
        try {

            const response = await fetch(`${serverConfig.BASE_PATH}/curate/${this.props._id}/`)
            console.log(response.status)

            if(response.status == 200){
                const {data} = await response.json()
                console.log(data)
                this.setState({ curated : data.curated, status : data.status })
            }

        }catch(err){
            console.log(err)
        }
    }

    render(){

        return (
            <View>
                {!this.state.status ? <View>
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginTop : scale(20), marginLeft : scale(15), marginBottom:scale(10)}}>Curated for You</Text>
                    <NoBioNoCurated navigation={this.props.navigation} />
                </View> : this.state.status == 2 ? <View>
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginTop : scale(20), marginLeft : scale(15), marginBottom:scale(10)}}>Curated for You</Text>
                    <ListCurated navigation={this.props.navigation} curated={this.state.curated} />
                </View> : <View>
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginTop : scale(20), marginLeft : scale(15), marginBottom:scale(10)}}>Curated for You</Text>
                    <BeingCurated navigation={this.props.navigation} />
                </View>}
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("from curated mapsttae>>", state.UserReducer.bio)
    return {
        bio : state.UserReducer.bio,
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, null)(Curated)