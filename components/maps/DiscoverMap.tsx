import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function DiscoverMap() {
  // The user's location and region
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  // All scooters in the area
  const [scooters, setScooters] = useState<Array<{
    id: number;
    latitude: number;
    longitude: number;
  }> | null>(null);
  
  // Get the user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  // Get all scooters in the area
  useEffect(() => {
    // TODO: Fetch scooters from the API
    setScooters([
      {
        id: 1,
        latitude: 63.41535,
        longitude: 10.40657,
      },
      {
        id: 2,
        latitude: 63.41969,
        longitude: 10.40276,
      },
    ]);
  }, []);

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle='light'
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsTraffic={false}
        showsIndoors={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {scooters && scooters.map((scooter) => (
          <Marker
            key={scooter.id}
            coordinate={{
              latitude: scooter.latitude,
              longitude: scooter.longitude,
            }}
            title="Scooter"
            description={"This is scooter: " + scooter.id}
          >
            <View style={styles.marker}>
              <Ionicons name="bicycle" size={24} color="black" />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#f2ffc4',
  },
});
