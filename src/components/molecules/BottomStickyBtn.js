import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import BtnWithoutImage from '../atoms/BtnWithoutImage';

const BottomStickyBtn = ({title, onPress}) => {
    return(
        <View style={{position: 'absolute', bottom:0, left:0, right:0, height:scale(70), ...styles.rowCenter, marginTop: scale(20)}}>
            <View style={[{width:scale(200), backgroundColor:'#4CA9EE', height:'60%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                <BtnWithoutImage 
                    onPress = {() => {
                    }}
                    title={title}
                />
            </View>
        </View>
    )
}

export default BottomStickyBtn;