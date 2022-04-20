import React from 'react'
import {View, Text, Image, Linking} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered'
import FlexibleBtn from '../../../components/atoms/FlexibleBtn'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import { addPrivateInfo } from '../../../store/actions/privateSession.action'
import { connect } from 'react-redux'
import { MixpanelInstance } from '../../../utils/analytics.util'

class ProblemScreen extends React.Component {

    handleProblemClick = (problem, navigateTo) => {
        MixpanelInstance.track("problem_selected")
        this.props.addPrivateInfo({ problem })
        this.props.navigation.navigate(navigateTo)
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                <View style={{height:scale(70),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                    <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Private Session"  />
                </View>
                <View style={{height:scale(10)}} />
                <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft:scale(20), marginTop:scale(20)}}>Get Started by <Text style={{color:"#4ca9ee"}} >Choosing <Text style={{color:"#29E7CD"}} >Goal</Text></Text></Text>

                <View>
                    <TouchableOpacity onPress={() => this.handleProblemClick("Lose Weight", "LWCategory")} activeOpacity={0.9} style={{width:"90%", alignSelf: "center", height:scale(65), borderRadius : scale(15), backgroundColor:"white", flexDirection:'row', marginTop:scale(20), ...styles.shadowNextStyle}} > 
                        <View style={{height:"100%", width:scale(65), justifyContent:"center", alignSelf: "center", marginHorizontal:scale(20), alignItems:'center'}} >
                            <Image source={require('../../../assets/images/problem.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                        </View>
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15), height:'100%', textAlignVertical:'center'}}>Lose Weight</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleProblemClick("Mindfulness", "MCategory")} activeOpacity={0.9} style={{width:"90%", alignSelf: "center", height:scale(65), borderRadius : scale(15), backgroundColor:"white", flexDirection:'row', marginTop:scale(20), ...styles.shadowNextStyle}} > 
                        <View style={{height:"100%", width:scale(65), justifyContent:"center", alignSelf: "center", marginHorizontal:scale(20), alignItems:'center'}} >
                            <Image source={require('../../../assets/images/problem.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                        </View>
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15), height:'100%', textAlignVertical:'center'}}>Mindfulness</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => this.handleProblemClick("Heal Ailment", "HACategory")} activeOpacity={0.9} style={{width:"90%", alignSelf: "center", height:scale(65), borderRadius : scale(15), backgroundColor:"white", flexDirection:'row', marginTop:scale(20), ...styles.shadowNextStyle}} > 
                        <View style={{height:"100%", width:scale(65), justifyContent:"center", alignSelf: "center", marginHorizontal:scale(20), alignItems:'center'}} >
                            <Image source={require('../../../assets/images/problem.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                        </View>
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15), height:'100%', textAlignVertical:'center'}}>Heal Ailment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleProblemClick("Get in Shape", "GSCategory")} activeOpacity={0.9} style={{width:"90%", alignSelf: "center", height:scale(65), borderRadius : scale(15), backgroundColor:"white", flexDirection:'row', marginTop:scale(20), ...styles.shadowNextStyle}} > 
                        <View style={{height:"100%", width:scale(65), justifyContent:"center", alignSelf: "center", marginHorizontal:scale(20), alignItems:'center'}} >
                            <Image source={require('../../../assets/images/problem.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                        </View>
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15), height:'100%', textAlignVertical:'center'}}>Get in Shape</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleProblemClick("Advanced Yoga", "AYCategory")} activeOpacity={0.9} style={{width:"90%", alignSelf: "center", height:scale(65), borderRadius : scale(15), backgroundColor:"white", flexDirection:'row', marginTop:scale(20), ...styles.shadowNextStyle}} > 
                        <View style={{height:"100%", width:scale(65), justifyContent:"center", alignSelf: "center", marginHorizontal:scale(20), alignItems:'center'}} >
                            <Image source={require('../../../assets/images/problem.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                        </View>
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15), height:'100%', textAlignVertical:'center'}}>Advanced Yoga</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:"row", alignItems: 'center', justifyContent:"space-between", backgroundColor:'white', marginTop:scale(30), marginHorizontal:scale(20)}} >
                    <View>
                        <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>Need Assistance?</Text>
                        <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>Contact <Text style={{color:"#29E7CD"}} >Us</Text></Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            MixpanelInstance.track("whatsapp_support")
                            Linking.openURL("https://api.whatsapp.com/send/?phone=919520785339")
                        }}
                        activeOpacity={0.87} 
                        style={{width:scale(40), height:scale(40), borderRadius:scale(10), backgroundColor:"#4ca9ee", justifyContent:"center", alignItems:'center'}} >
                        <Image source={require('../../../assets/images/arrow_right.png')} resizeMode="contain" style={{height:'70%', width:'70%'}}  />
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

export default connect(null, { addPrivateInfo })(ProblemScreen)