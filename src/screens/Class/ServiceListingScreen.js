import React from 'react';
import {View, ScrollView, TouchableOpacity, Animated, LayoutAnimation, NativeModules, Text, Image} from 'react-native';
import ServiceListing from '../../components/molecules/Class/ServiceListing';
import { scale } from '../../theme/metric';
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const initialCompressedState = {
    "1" : true, "2" : true, "3" : true, "4" : true, "5" : true, "6" : true
}

class ServiceListingScreen extends React.Component{

    state = {
        compressedMarginBottom : {
            "1" : -scale(280),
            "2" : -scale(280),
            "3" : -scale(280),
            "4" : -scale(280),
            "5" : -scale(280),
            "6" : -scale(280)
        },
        expandedMarginBottom : scale(10),
        compressed : {...initialCompressedState}
    }
    
    async componentDidMount(){
    }

    componentWillUnmount(){
    }

    changeMarginBottom = (index) => {

        let temp = {...this.state.compressed}
        temp[String(index)] = !temp[String(index)]
        
        this.setState({ compressed : {...initialCompressedState, [String(index)] : !this.state.compressed[String(index)] } }, () => {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                350,
                LayoutAnimation.Types.easeOut,
                LayoutAnimation.Properties.scaleY
                )
            );
        })
        
    }

    giveMeMyMarginBottom = (index) => {
        if(index == "6"){
            return this.state.expandedMarginBottom
        }
        if(this.state.compressed[String(index)]){
            return this.state.compressedMarginBottom[index]
        }else{
            return this.state.expandedMarginBottom
        }
    }

    render(){
        return (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{flex:1, paddingVertical : 20, backgroundColor: 'white'}} >
                    
                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["1"]?3:0, borderColor : "#4ca9ee", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(1) }} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(1)} >
                            <ServiceListing 
                                title="Private Session"
                                titleColor={"#4ca9ee"}
                                analyticsTitle="Private Class Card"
                                detail="Private yoga sessions would engage you with our certified trainers at a personal level who would further guide you about the adaptation of healthy routine and would also track your postures to avoid any further injuries."
                                btnPressEvent="ProblemScreen"
                                btnTitle="Get Started"
                                flashyLine="I walk a lonely road..."
                                pointers={["Marked Attention", "Choice of instructor", "Tailored to your lifestyle", "Focus on Personal Goals & Needed", "Book whenever you are free"]}
                                navigation={this.props.navigation}
                                disabled={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["2"]?3:0, borderColor : "#29E7CD", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(2)}} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(2)} >
                            <ServiceListing 
                                title="Group Session"
                                titleColor={"#29E7CD"}
                                analyticsTitle="Group Class Card"
                                detail="Group sessions will help you in adapting a healthy lifestyle and would further help in reducing the possibility of health related issues at pocket friendly rates. "
                                btnPressEvent="GroupListing"
                                flashyLine="Ek aur Ek bane Gyarah"
                                pointers={["Make friends and 'Pose' together", "Exciting Group Activities", "Choice of instructor", "Choice of Group", "Timings as per class schedule"]}
                                btnTitle="Get Started"
                                navigation={this.props.navigation}
                                disabled={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["3"]?3:0, borderColor : "#4ca9ee", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(3)}} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(3)} >
                            <ServiceListing 
                                title="Retreat"
                                titleColor={"#4ca9ee"}
                                analyticsTitle="Retreat Card"
                                detail="Descend yourself into the serene ecosystem of divine yoga. As this Yoga retreat can be witnessed as a perfect breakthrough from your distractions as it will inculcate you with optimism and blend your routine with the essence of nature and spirituality to entrail a peaceful and healthy lifestyle."
                                btnPressEvent="PrivateIndiScreen"
                                flashyLine=" Blend yourself in the divinity of yoga "
                                pointers={["Develops a sharp focal point", "Cuts away distractions", "Breakthrough from busy routine", "Inculcates peace and essence of nature", "Nourishment to mind and body"]}
                                btnTitle="Get Started"
                                navigation={this.props.navigation}
                                disabled={true}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["4"]?3:0, borderColor : "#29E7CD", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(4)}} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(4)} >
                            <ServiceListing 
                                title="TTC Course"
                                titleColor={"#29E7CD"}
                                analyticsTitle="TTC Card"
                                detail="Yoga Teacher Training Course is a intensive certification course which would deepen your connectivity with yoga asans and would further corroborate in self growth, optimisim and spirituality."
                                btnPressEvent="PrivateIndiScreen"
                                flashyLine="Train your mind with peace and purpose everyday"
                                pointers={["Leads towards self growth", "Enhances skills to teach yoga", "Immerses yogic lifestyle", "Deepens spiritual connection with yoga", "Articulation of yoga asanas"]}
                                btnTitle="Coming Soon"
                                navigation={this.props.navigation}
                                disabled={true}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["5"]?3:0, borderColor : "#4ca9ee", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(5)}} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(5)} >
                            <ServiceListing 
                                title="Corporate Yoga"
                                titleColor={"#4ca9ee"}
                                analyticsTitle="Corporate Card"
                                detail="Practice of Corporate Yoga is highly effective inorder to boost morale and well being of the workforce and tends to inculcate your mind with peace and body with flexibility. It also enhances the productivity level of the staff and makes them much more vigilant and enthusiastic."
                                btnPressEvent="CorporateScreen"
                                flashyLine="Good stretch can make your day much healthier"
                                pointers={["Enhances mental and physical well being", "Keeps you active throughout the day", "Boosts your morale and eliminates distractions", "Eradicates mental and physical fatigue", "Builds a pleasant workplace"]}
                                btnTitle="Get Started"
                                navigation={this.props.navigation}
                                disabled={true}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width : "90%", alignSelf: 'center', borderWidth : !this.state.compressed["6"]?3:0, borderColor : "#29E7CD", borderRadius : scale(20), marginBottom : this.giveMeMyMarginBottom(6)}} >
                        <TouchableOpacity activeOpacity={1} style={{flex:1, borderRadius : scale(20)}} onPress={() => this.changeMarginBottom(6)} >
                            <ServiceListing 
                                title="Webinars"
                                titleColor={"#29E7CD"}
                                analyticsTitle="Webinars Card"
                                detail="Practice of Yoga for healthy lifestyle is requisite and centric webinars on yoga for health can be witnessed as a life saver. These webinars are to be conducted by certified trainers who would tend to inculcate you with the spirituality of yoga. "
                                btnPressEvent="PrivateIndiScreen"
                                flashyLine="Immerse yourself in the spirituality of yoga"
                                pointers={["Inculcate yourself with peace and flexibility", "Enhances the functioning of your body", "Relieves chronic stress", "Mitigates chronic health related diseases", "Gives you a healthy and happy routine"]}
                                btnTitle="Coming Soon"
                                navigation={this.props.navigation}
                                disabled={true}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{height:scale(20)}} />
                </ScrollView>

            // </View>
      )
    }
}

export default ServiceListingScreen;