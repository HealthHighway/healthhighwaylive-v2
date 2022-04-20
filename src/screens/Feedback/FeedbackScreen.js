import * as React from "react";
import { Dimensions, View, Text, Image, TextInput, BackHandler, ToastAndroid, ScrollView } from "react-native";
import { connect } from "react-redux";
import BackHeader from "../../components/atoms/BackHeader";
import SelectBtn from "../../components/atoms/SelectBtn";
import { scale } from "../../theme/metric";
import SplashScreen from 'react-native-splash-screen';
import { AirbnbRating } from 'react-native-ratings';
import BtnWithoutImage from "../../components/atoms/BtnWithoutImage";
import Loading from "../../components/atoms/Loading";
import BackHeaderWithTitleCentered from "../../components/atoms/BackHeaderWithTitleCentered";

const imageMap = {
    "1" : require('../../assets/images/sad_smiley.png'),
    "2" : require('../../assets/images/sad_smiley.png'),
    "3" : require('../../assets/images/normal_smiley.png'),
    "4" : require('../../assets/images/happy_smiley.png'),
    "5" : require('../../assets/images/happy_smiley.png'),
}

class FeedbackScreen extends React.Component {

    state = {
        rating : 3,
        problems : new Set(),
        appraises : new Set(),
        improveText : "",
        loading : false
    }

    componentDidMount(){
        SplashScreen.hide()
    }

    componentWillUnmount() {
    }

    handleProblems = (pressed, prob) => {
        if(pressed) {
            this.state.problems.add(prob)
        }
        else
        {
            this.state.problems.delete(prob)
        }
        console.log(this.state.problems)
    }

    handleAppraisal = (pressed, appr) => {
        if(pressed) {
            this.state.appraises.add(appr)
        }
        else
        {
            this.state.appraises.delete(appr)
        }
        console.log(this.state.appraises)
    }

    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        if(rating >= 3){
            if(this.state.rating >= 3){
                this.setState({rating})
            }
            else{
                this.setState({rating, problems : new Set(), appraises : new Set()})
            }
        }else{
            if(this.state.rating >= 3){
                this.setState({rating, problems : new Set(), appraises : new Set()})
            }
            else{
                this.setState({rating})
            }
        }
    }

    handleFeedbackSubmit = async () => {
        
    }

   render() {
     return (
        <View style={{flex:1, backgroundColor: 'white'}} >
            {this.state.loading?<Loading title="Saving Your feedback.." />:null}
            <ScrollView>
                <View style={{height:scale(40), paddingHorizontal:scale(20), marginTop:scale(20) }} >
                    <BackHeaderWithTitleCentered 
                        title="My Feedback"
                        showTitle={true}
                        onBackPress={() => {
                        }}
                        showBackBtn={true} />
                </View>
                <View style={{height:scale(20), backgroundColor: '#EEEEEE', marginTop:scale(15)}} />
                <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginTop:scale(10), alignSelf: 'flex-start', marginHorizontal:scale(15)}}>Rate Your Experience</Text>

                <View style={{marginTop:scale(20), justifyContent:'flex-start', marginHorizontal:scale(15),  flexDirection:'row', height:scale(40) }} >
                    <AirbnbRating 
                        onFinishRating={this.ratingCompleted}
                        selectedColor='#4ca9ee' 
                        unSelectedColor='#eeeeee' 
                        size={scale(30)} 
                        showRating={false} 
                        starContainerStyle={{alignSelf: 'flex-start', backgroundColor:'white'}} 
                    />
                    <View style={{flex:1}} />
                    <View style={{width:scale(50), height:'100%' }} >
                        <Image source={imageMap[this.state.rating]} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </View>
                </View>

                {this.state.rating <= 2?<View>
                    <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginTop:scale(20), alignSelf: 'flex-start', marginHorizontal:scale(15)}}>Problems you faced today ?</Text>
                    <View style={{flexDirection:'row', flexWrap:"wrap", marginHorizontal:scale(15), justifyContent:'flex-start', marginTop:scale(20)}} >
                        <SelectBtn title="Instructor did not show up" onPress={(pressed) => this.handleProblems(pressed, "Instructor did not show up")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Technical Issues with Platform" onPress={(pressed) => this.handleProblems(pressed, "Technical Issues with Platform")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Connectivity Issue with Instructor" onPress={(pressed) => this.handleProblems(pressed, "Connectivity Issue with Instructor")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Asanas were too difficult" onPress={(pressed) => this.handleProblems(pressed, "Asanas were too difficult")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Asanas were generic" onPress={(pressed) => this.handleProblems(pressed, "Asanas were generic")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Instructor was lacking attention" onPress={(pressed) => this.handleProblems(pressed, "Instructor was lacking attention")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                    </View>
                </View>:null}

                {this.state.rating > 2?<View>
                    <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginTop:scale(20), alignSelf: 'flex-start', marginHorizontal:scale(15)}}>What did you found great ?</Text>
                    <View style={{flexDirection:'row', flexWrap:"wrap", marginHorizontal:scale(15), justifyContent:'flex-start', marginTop:scale(20)}} >
                        <SelectBtn title="Instructor was pitch perfect" onPress={(pressed) => this.handleAppraisal(pressed, "Instructor was pitch perfect")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Great Asanas" onPress={(pressed) => this.handleAppraisal(pressed, "Great Asanas")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Very Relaxing Session" onPress={(pressed) => this.handleAppraisal(pressed, "Very Relaxing Session")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Interactive Environment" onPress={(pressed) => this.handleAppraisal(pressed, "Interactive Environment")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Seamless Experience" onPress={(pressed) => this.handleAppraisal(pressed, "Seamless Experience")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                        <SelectBtn title="Ease of Access of the Platform" onPress={(pressed) => this.handleAppraisal(pressed, "Ease of Access of the Platform")} paddingHorizontal="8" paddingVertical="5" fontSize={scale(11)} />
                    </View>
                </View>:null}

                <TextInput 
                    value={this.state.improveText}
                    onChangeText = {value => this.setState({ improveText : value})}
                    multiline={true}
                    textAlignVertical="top"
                    placeholder="Tell us on how can we improve ?"
                    style={{height: scale(200), marginLeft:scale(20), backgroundColor:'#fff', marginRight:scale(20), marginTop:scale(20), borderRadius:scale(7), borderWidth:scale(2), borderColor:'#EEEEEE', paddingHorizontal:scale(15), paddingVertical:scale(15), fontFamily:'Montserrat-Medium' }}
                />

                <View style={{height:scale(70)}} />
            </ScrollView>
            
            
            <View style={{position: 'absolute', bottom:0, left:0, right:0, height:scale(50), backgroundColor: '#4ca9ee', zIndex:2, justifyContent:'center', alignItems:'center'}} >
                <BtnWithoutImage 
                    title="Submit"
                    onPress={() => {
                        this.setState({ loading: true }, () => {
                            this.handleFeedbackSubmit()
                        })
                }} />
            </View> 
        </View>
     )
   }
}

const mapStateToProps = (state) => {
    return{
        _id : ""
    }
  }
  

export default connect(mapStateToProps, null)(FeedbackScreen)