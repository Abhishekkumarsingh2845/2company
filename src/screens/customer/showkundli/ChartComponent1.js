import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
  } from 'react-native';
  import React from 'react';
  import {colors, fonts} from '../../../config/Constants';
  import {SvgXml,SvgWithCss } from 'react-native-svg/css';
  import {useState} from 'react';
  import MyLoader from '../../../components/MyLoader';
  import SvgSimmer from '../../../components/SvgSimmer';
  import WebView from 'react-native-webview';
  
  const {width, height} = Dimensions.get('screen');
  
  const ChartComponent1 = ({svg, title, planetData}) => {
    const [planet] = useState(planetData.planets);
    const [nakshatra] = useState(planetData.planets_details);
    const [isPlanet, setIsPlanet] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
  
  
  
    console.log('=====',planetData);
    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: '95%', alignSelf: 'center', paddingVertical: 15}}>
            <Text
              style={{
                fontSize: 16,
                color: colors.black_color8,
                fontFamily: fonts.medium,
              }}>
              {title}Chart
            </Text>
            
            <SvgWithCss xml={svg} width="350" height="350" />
            {/* {svg && (
              <WebView
          source={{ html: svg }}
          
          style={styles.webview}
        />
             )}  */}
  
          </View>
          <View style={{width: '95%', alignSelf: 'center', paddingVertical: 15}}>
            <Text
              style={{
                fontSize: 16,
                color: colors.black_color8,
                fontFamily: fonts.medium,
              }}>
              Planets
            </Text>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <TouchableOpacity
                onPress={() => setIsPlanet(true)}
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 2,
                  borderRadius: 1000,
                  backgroundColor: isPlanet
                    ? colors.background_theme2
                    : colors.background_theme1,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isPlanet
                      ? colors.background_theme1
                      : colors.black_color7,
                    fontFamily: fonts.medium,
                  }}>
                  MOON SIGN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsPlanet(false)}
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 2,
                  borderRadius: 1000,
                  backgroundColor: !isPlanet
                    ? colors.background_theme2
                    : colors.background_theme1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isPlanet
                      ? colors.black_color7
                      : colors.background_theme1,
                    fontFamily: fonts.medium,
                  }}>
                  NAKSHATRA
                </Text>
              </TouchableOpacity>
            </View>
            {isPlanet ? (
              <View
                style={{
                  flex: 0,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: colors.black_color7,
                }}>
                <View
                  style={{
                    ...styles.rowContainer,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: colors.background_theme2,
                  }}>
                  <Text style={styles.rowText1}>Planet</Text>
                  <Text style={styles.rowText1}>Degree</Text>
                </View>
                {Object.keys(planet).map((item, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.rowContainer,
                      borderBottomLeftRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                      borderBottomRightRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                    }}>
                    <Text style={styles.rowText}>{item}</Text>
                    <Text style={styles.rowText}>{`${Math.floor(
                      planet[item],
                    )}° ${Math.floor((planet[item] % 1) * 60)}° ${Math.floor(
                      (((planet[item] % 1) * 60) % 1) * 60,
                    )}°`}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  flex: 0,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: colors.black_color7,
                }}>
                <View
                  style={{
                    ...styles.rowContainer,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: colors.background_theme2,
                  }}>
                  <Text style={styles.rowText}>Planet</Text>
                  <Text style={styles.rowText}>Nakshatra</Text>
                  <Text style={styles.rowText}>Naksh Lord</Text>
                </View>
                {Object.keys(nakshatra).map((item, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.rowContainer,
                      borderBottomLeftRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                      borderBottomRightRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                    }}>
                    <Text style={styles.rowText}>{item}</Text>
                    <Text style={styles.rowText}>
                      {nakshatra[item].nakshatra}
                    </Text>
                    <Text style={styles.rowText}>
                      {nakshatra[item].nakshatralord}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default ChartComponent1;
  
  const styles = StyleSheet.create({
    rowContainer: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background_theme1,
    },
    rowText: {
      flex: 0.5,
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.black_color9,
      textTransform: 'capitalize',
    },
    rowText1: {
      flex: 0.5,
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.black_color1,
      textTransform: 'capitalize',
    },
    webview: {
      flex:1
    }
  });
  