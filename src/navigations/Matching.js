import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AstroCallList from '../screens/customer/AstroCallList';
import AstroChatList from '../screens/customer/AstroChatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants';
import MyStatusBar from '../components/MyStatusbar';
import OpenKundli from '../screens/customer/OpenKundli';
import NewKundli from '../screens/customer/NewKundli';
import MyHeader from '../components/MyHeader';
import NewMatching from '../screens/customer/NewMatching';
import OpenMatching from '../screens/customer/OpenMatching';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const Matching = props => {
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("matching")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),    });
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="openMatching" component={OpenMatching} />
      <Tab.Screen name="newMatching" component={NewMatching} />
    </Tab.Navigator>
  );
};

export default Matching;