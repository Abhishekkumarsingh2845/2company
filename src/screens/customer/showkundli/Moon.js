import {View, Text} from 'react-native';
import React from 'react';
import ChartComponent1 from './ChartComponent1';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {api2_get_chart, api_url} from '../../../config/Constants';
import MyLoader from '../../../components/MyLoader';
import { fetchKundliData } from '../../../config/ApiServiceKundli';

const Moon = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  
  const dob = props?.route?.params?.data?.dob;
  const tob = props?.route?.params?.data?.tob;
  const birthDate = new Date(dob);

// Extract day, month, and year
  const day = birthDate.getDate(); // 29
  const month = birthDate.getMonth() + 1; // Months are zero-based, so add 1
  const year = birthDate.getFullYear();

  
  const [hours, minutes, seconds] = tob.split(":").map(Number);

  useEffect(() => {
    const getKundliData = async () => {
      const kundliRequestData = {
        day: day,
        month: month,
        year: year,
        hour: hours,
        min: minutes,
        lat: props?.route?.params?.data?.latitude,
        lon: props?.route?.params?.data?.longitude,
        tzone: 5.5,
      };

      try {
        const data = await fetchKundliData('horo_chart_image/Moon', kundliRequestData);
        const modifiedChartData = data.svg.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
        const chartData1 = modifiedChartData.replace('<text font-size="15" x="158.5" y="179.95" style="fill: black;">','<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
        const newchart = chartData1.replace('</g>','<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');
        console.log(newchart);
        setChartData(newchart);
      } catch (error) {
        console.error('Error fetching Kundli data in Kundli component:', error);
      }
    };

    getKundliData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MyLoader isVisible={isLoading} />
      {chartData && (
        <ChartComponent1
          svg={chartData}
          title="Moon"
          planetData={props.route.params.planetData}
        />
      )}
    </View>
  );
};

export default Moon;
