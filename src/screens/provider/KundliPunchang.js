import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
  } from 'react-native';
  import React from 'react';
  import {useEffect} from 'react';
  import {
    api_url,
    colors,
    fonts,
    kundli_get_panchang,
  } from '../../config/Constants';
  import {StyleSheet} from 'react-native';
  import {useState} from 'react';
  import axios from 'axios';
  import MyLoader from '../../components/MyLoader';
  import moment from 'moment';
  
  const {width, height} = Dimensions.get('screen');
  
  const KundliPunchang = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [panchangData, setPanchangData] = useState(null);
    useEffect(() => {
      props.navigation.setOptions({
        tabBarLabel: 'PANCHANG DETAIL',
      });
    }, []);
  
    useEffect(() => {
      get_panchang();
    }, []);
  
    const get_panchang = async () => {
      console.log(props.route.params.data.kundali_id);
      setIsLoading(true);
      await axios({
        method: 'post',
        url: api_url + kundli_get_panchang,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          kundli_id: props.route.params.data.kundali_id,
        },
      })
        .then(res => {
          console.log('ddd',res.data);
          if(res.data.status == false)
          {
            Alert.alert('Message', 'Your subscribed API key is Expired. Please Call by Admin Team', [
              {
                text: 'OK',
                onPress: () => {
                  props.navigation.goBack();
                },
              }
            ]); }
          setIsLoading(false);
          setPanchangData(res.data);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    };
  
    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        <MyLoader isVisible={isLoading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {panchangData && (
            <View
              style={{
                flex: 0,
                width: '95%',
                alignSelf: 'center',
                backgroundColor: colors.background_theme1,
                marginVertical: 10,
                borderRadius: 15,
                shadowColor: colors.black_color5,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}>
              <View style={styles.itmeContainer}>
                <Text style={styles.itemText}>Tithi</Text>
                <Text style={styles.itemText}>{panchangData.tithi}</Text>
              </View>
              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.background_theme2,
                }}>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  Karan
                </Text>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  {panchangData.karan}
                </Text>
              </View>
              <View style={styles.itmeContainer}>
                <Text style={styles.itemText}>Yog</Text>
                <Text style={styles.itemText}>{panchangData.yog}</Text>
              </View>
              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.background_theme2,
                }}>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  Nakshtra
                </Text>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  {panchangData.nakshatra}
                </Text>
              </View>
              <View style={styles.itmeContainer}>
                <Text style={styles.itemText}>Sunrise</Text>
                <Text style={styles.itemText}>
                  {' '}
                  {moment(panchangData.sunrise, 'hh:mm:ss').format('hh:mm:ss A')}
                </Text>
              </View>
              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.background_theme2,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  Sunset
                </Text>
                <Text
                  style={{...styles.itemText, color: colors.background_theme1}}>
                  {moment(panchangData.sunset, 'hh:mm:ss').format('hh:mm:ss A')}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };
  
  export default KundliPunchang;
  const styles = StyleSheet.create({
    itmeContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    itemText: {
      flex: 0.5,
      fontSize: 14,
      color: colors.black_color8,
      fontFamily: fonts.medium,
    },
  });
  