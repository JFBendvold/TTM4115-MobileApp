import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Pressable, Text, Alert } from 'react-native';
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

  // Selected scooter
  const [selectedScooter, setSelectedScooter] = useState<{
    id: number;
    latitude: number;
    longitude: number;
  } | null>(null);

  // Loading state for unlock/lock action
  const [isLoading, setIsLoading] = useState(false);

  // Locked state for the selected scooter
  const [isLocked, setIsLocked] = useState(false);

  // Map reference
  const mapRef = useRef<MapView>(null);
  
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

  // Handle scooter selection
  const handleScooterSelect = (scooter: { id: number; latitude: number; longitude: number }) => {
    // If a scooter is already locked, prevent selecting another one
    if (isLocked && selectedScooter?.id !== scooter.id) {
      return;
    }
    
    setSelectedScooter(scooter);
    mapRef.current?.animateToRegion({
      latitude: scooter.latitude,
      longitude: scooter.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  // Handle unlock button press
  const handleUnlock = () => {
    if (selectedScooter) {
      setIsLoading(true);
      Alert.alert(
        "Unlock Scooter",
        "Are you sure you want to unlock this scooter?",
        [
          {
            text: "Cancel",
            onPress: () => setIsLoading(false),
            style: "cancel"
          },
          {
            text: "Unlock",
            onPress: () => {
              // TODO: Implement actual unlock functionality
              console.log('Unlocking scooter:', selectedScooter.id);
              setIsLocked(true);
              setIsLoading(false);
            }
          }
        ]
      );
    }
  };

  // Handle lock button press
  const handleLock = () => {
    if (selectedScooter) {
      setIsLoading(true);
      Alert.alert(
        "Lock Scooter",
        "Are you sure you want to lock this scooter?",
        [
          {
            text: "Cancel",
            onPress: () => setIsLoading(false),
            style: "cancel"
          },
          {
            text: "Lock",
            onPress: () => {
              // TODO: Implement actual lock functionality
              console.log('Locking scooter:', selectedScooter.id);
              setIsLocked(false);
              setIsLoading(false);
            }
          }
        ]
      );
    }
  };

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
        ref={mapRef}
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
        onPress={(e) => {
          // Only unselect if we're not clicking on a marker
          if (e.nativeEvent.action !== 'marker-press') {
            // Don't allow deselecting if scooter is locked
            if (!isLocked) {
              setSelectedScooter(null);
              setIsLocked(false);
            }
          }
        }}
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
            onPress={() => handleScooterSelect(scooter)}
          >
            <View style={[
              styles.marker,
              selectedScooter?.id === scooter.id && styles.selectedMarker,
              isLocked && selectedScooter?.id !== scooter.id && styles.disabledMarker
            ]}>
              <Ionicons name="bicycle" size={24} color="black" />
            </View>
          </Marker>
        ))}
      </MapView>
      {selectedScooter && (
        <View style={styles.unlockButtonContainer}>
          <Pressable 
            style={styles.unlockButton} 
            onPress={isLocked ? handleLock : handleUnlock}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#333" />
            ) : (
              <Text style={styles.unlockButtonText}>
                {isLocked ? 'Lock Scooter' : 'Unlock Scooter'}
              </Text>
            )}
          </Pressable>
        </View>
      )}
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
  selectedMarker: {
    borderColor: '#0a7ea4',
  },
  unlockButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: '#f2ffc4',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 54,
  },
  unlockButtonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  disabledMarker: {
    opacity: 0.5,
  },
});
