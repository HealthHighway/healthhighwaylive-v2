import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered';
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage';
import ProblemCheckBox from '../../../components/atoms/ProblemCheckBox';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';
import { addPrivateInfo } from '../../../store/actions/privateSession.action'
import { connect } from 'react-redux';

class AYCategory extends React.Component {

    state = {
        problems : new Set()
    }

    handleSetUnsetProblem = (myProblem) => {
        if(this.state.problems.has(myProblem)){
            let temp = this.state.problems;
            temp.delete(myProblem)
            this.setState({ problems: temp})
        }else{
            let temp = new Set(this.state.problems).add(myProblem)
            this.setState({ problems: temp})
        }
    }

    handleSubCategoriesSelect = () => {
        this.props.addPrivateInfo({ subCategories : Array.from(this.state.problems)})
        this.props.navigation.navigate("SessionInformation")
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'#fff'}} >

                <ScrollView style={{flex:1}}>
                    <View style={{height:scale(60),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                        <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Advanced Yoga"  />
                    </View>
                    <View style={{height:scale(5)}} />
                    <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft:scale(20), marginTop:scale(20)}}>Get Started by <Text style={{color:"#4ca9ee"}} >Choosing <Text style={{color:"#29E7CD"}} >Categories</Text></Text></Text>

                    <View style={{height:scale(20)}} />
                    <ProblemCheckBox 
                        problems={this.state.problems}
                        myProblem={"Ashtanga Yoga"}
                        onPress={(myProblem) => this.handleSetUnsetProblem(myProblem)}
                    />

                    <ProblemCheckBox 
                        problems={this.state.problems}
                        myProblem={"Hatha Yoga"}
                        onPress={(myProblem) => this.handleSetUnsetProblem(myProblem)}
                    />

                    <ProblemCheckBox 
                        problems={this.state.problems}
                        myProblem={"Vinyasa Yoga"}
                        onPress={(myProblem) => this.handleSetUnsetProblem(myProblem)}
                    />

                    <ProblemCheckBox 
                        problems={this.state.problems}
                        myProblem={"Iyengar Yoga"}
                        onPress={(myProblem) => this.handleSetUnsetProblem(myProblem)}
                    />

                    <ProblemCheckBox 
                        problems={this.state.problems}
                        myProblem={"Power Yoga"}
                        onPress={(myProblem) => this.handleSetUnsetProblem(myProblem)}
                    />

                    <View style={{height:scale(70)}} />
                </ScrollView>
               
                <View style={{height:scale(70), position: 'absolute', left: 0, bottom: 0, right:0, backgroundColor:'#fff'}} >
                    <View style={{height:scale(40), ...styles.rowCenter, width:'100%', marginTop:scale(10)}}>
                        <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                onPress = {() => this.handleSubCategoriesSelect()}
                                title="Continue"
                            />
                        </View>
                    </View> 
                </View>
                          

            </View>
        )
    }
}

export default connect(null, { addPrivateInfo })(AYCategory)