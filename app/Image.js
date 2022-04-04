import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Axios from 'axios';

const Image = () => {
    
    const [imageList, setImageList] = useState([]);
    const getBackgrondImage = () => {
        let x = []
        Axios.get('https://raw.githubusercontent.com/imrul18/CountTK/main/Imagelink')
            .then((res) => {
                res.data.map(item => x.push(item.img_link))
            })
        setImageList(x)
    }
    useEffect(() => {
        getBackgrondImage()
    }, [])

    return (
        <View style={styles.background}>
            <ImageSlider images={imageList} autoPlayWithInterval={2000}/>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#46A0C2"
    },
});

export default Image