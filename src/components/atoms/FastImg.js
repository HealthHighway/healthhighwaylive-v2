import React from 'react';
import FastImage from 'react-native-fast-image'

class FastImg extends React.Component {
    render(){
        return (
            <FastImage
                style={{width:"100%", height:"100%"}}
                source={{
                    uri: this.props.uri,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
            />
        )
    }
}

export default FastImg