import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const InfoScreen = () => {
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [plateNumber, setPlateNumber] = useState('');

    const navigation = useNavigation();

    const handleDone = () => {
        console.log('Vehicle Name:', vehicleName);
        console.log('Vehicle Model:', vehicleModel);
        console.log('Plate Number:', plateNumber);
        // Add your form submission logic here
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.instructionText}>
                Add information of your Vehicle:
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Name"
                    value={vehicleName}
                    onChangeText={setVehicleName}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Vehicle Model"
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Plate Number"
                    value={plateNumber}
                    onChangeText={setPlateNumber}
                />
            </View>

            <TouchableOpacity onPress={handleDone} style={styles.button}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    instructionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
    button: {
        backgroundColor: '#2C7865',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default InfoScreen;
