import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback, ScrollView, BackHandler} from 'react-native';
import BackHeader from '../../components/atoms/BackHeader';
import { scale } from '../../theme/metric';

class FaqScreen extends React.Component {

    render() {
        return(
            <View>
                <View style={{height:scale(40),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader 
                    onBackPress={() => {
                        this.props.navigation.navigate("Profile")
                    }} 
                    showBackBtn={true} />
                </View>
                <ScrollView style={{backgroundColor:'white', paddingHorizontal:scale(20)}}>
                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Semibold',fontSize:scale(18), marginTop:scale(20), marginBottom:scale(10)}}>Q1. Why choose Health Highway?</Text>
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Regular',fontSize:scale(16)}}>Ans. We won't beat around the bush, but Health Highway is extremely cost-effective and makes it a point to help you integrate yoga into your daily life. Plus, it is completely online. Thus, you can do yoga, make new friends (we are offering group sessions) all from the comfort of your home.</Text>

                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Semibold',fontSize:scale(18), marginTop:scale(20), marginBottom:scale(10)}}>Q2. Will I be needing to buy added electronic gadgets to join online classes?</Text>
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Regular',fontSize:scale(16)}}>Ans. No, not at all. You can do yoga from the very smartphone you are using right now. Health Highway is for everyone. You do not need to buy a laptop worth 40k-50k just to do yoga!</Text>

                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Semibold',fontSize:scale(18), marginTop:scale(20), marginBottom:scale(10)}}>Q3. If I wish to change my plan, what do I need to do?</Text>
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Regular',fontSize:scale(16)}}>Ans. We have a very efficient customer care team. We, at Health Highway,  will ensure that your problems are clarified at the soonest. Option to change plans is available.</Text>

                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Semibold',fontSize:scale(18), marginTop:scale(20), marginBottom:scale(10)}}>Q4. Will I be able to change my trainer if possible?</Text>
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Regular',fontSize:scale(16)}}>Ans. At Health Highway, we ensure 100% customer satisfaction. We bring you the best and certified trainers available that too at the very comfort of your home. We prefer for you to stick to the trainer given by us as we bring personalised trainers as per your needs. But, under special situations, trainers can be changed according to the needs of the customer. </Text>

                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Semibold',fontSize:scale(18), marginTop:scale(20), marginBottom:scale(10)}}>Q5. Is a refund possible?</Text>
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Regular',fontSize:scale(16)}}>Ans. At Health Highway, a refund is possible and will be initiated immediately if you don't like the first session. A refund for the amount that has been paid for all the sessions would be initiated at the soonest from our side.</Text>

                    <View style={{height:scale(150)}} />
                </ScrollView>
            </View>
        )
    }
}

export default FaqScreen;