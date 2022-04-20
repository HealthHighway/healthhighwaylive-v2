import {Dimensions} from 'react-native';

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const {width, height} = Dimensions.get('window');

export const scale = (size) => {
    if(width > height)
    {
        return (width/guidelineBaseHeight * size);
    }
    else
    {
        return (width/guidelineBaseWidth * size);
    }
}

export const w = width;
export const h = height;