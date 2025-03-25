import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type MenuButtonProps = {
    navigation: DrawerNavigationProp<any>;
};

export default function MenuButton({ navigation }: MenuButtonProps) {
    return (
        <Pressable style={styles.button} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 48,
        left: 16,
        zIndex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: "50%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});