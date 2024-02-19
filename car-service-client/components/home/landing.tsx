import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useAuth } from '~/app/context/AuthContext';
// import { Image } from 'expo-image';

const shape = `
<svg width="353" height="306" viewBox="0 0 353 306" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M63 105C65.4 63.4001 122.667 55.3334 151 56.5001C156.5 42.5001 173.4 12.1001 197 2.50008C226.5 -9.49992 205 25.5001 271 56.5001C337 87.5001 271.5 134 278 142C284.5 150 205 227.5 197 241.5C189 255.5 142 233.5 108.5 212.5C75 191.5 98.5 188 72.5 181.5C46.5 175 60 157 63 105Z" fill="#C9D7E0"/>
<path d="M5.5 177C1 157 13 139.5 52 134.5C52 130.5 123 122 189 122.5C255 123 207 157 242.5 177C278 197 164 223 158 252.5C152 282 97 254.5 37.5 245.5C-22 236.5 10 197 5.5 177Z" fill="#606566"/>
<path d="M180.503 302.973C151.703 318.973 144.836 238.639 145.003 196.473C160.336 180.473 197.603 145.373 224.003 132.973C257.003 117.473 310.003 151.473 344.003 163.973C378.003 176.473 298.003 231.473 307.003 268.473C316.003 305.473 216.503 282.973 180.503 302.973Z" fill="#EBBD92"/>
</svg>
 `;

const Landing = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(0);
  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours

    setCurrentDate(hours);
  }, []);
  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ position: 'absolute', zIndex: 1, left: 32, top: 64 }}>
          {currentDate < 24 && <Text style={{ fontSize: 24 }}>Good Night</Text>}
          {currentDate < 18 && <Text style={{ fontSize: 24 }}>Have a nice day</Text>}
          {currentDate < 12 && <Text style={{ fontSize: 24 }}>Good Morning</Text>}
          <Text style={{ fontSize: 24 }}>
            {(user?.first_name ?? '') + ' ' + (user?.last_name ?? '')}!
          </Text>
        </View>

        <SvgXml style={{ top: 40 }} xml={shape} />

        <Image
          style={{ position: 'absolute', width: 350, height: 350, right: -50, top: 40 }}
          resizeMode="contain"
          source={require('../../assets/cars/mercedes.png')}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          letterSpacing: 2,
          color: '#252525',
          textAlign: 'center',
          margin: 25,
          top: 40,
        }}>
        Say goodbye to endless phone calls and tedious scheduling. Our intuitive interface makes
        booking your car service a breeze.
      </Text>
    </View>
  );
};

export default Landing;
