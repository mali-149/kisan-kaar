import { Alert, FlatList, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavourites = async () => {
            const userId = auth().currentUser ? auth().currentUser.uid : null;
            console.log("User ID:", userId);
            if (!userId) {
                Alert.alert('Error', "User not authenticated");
                setLoading(false);
                return;
            }
            try {
                const favouritesSnapshot = await firestore().collection('favourite').where('userId', '==', userId).get();
                if (!favouritesSnapshot.empty) {
                    const favouriteData = favouritesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log("Fetched Data for User:", userId, favouriteData);
                    setFavourites(favouriteData);
                } else {
                    console.log("No favourites found for user:", userId);
                }
            } catch (error) {
                console.error('Error fetching data', error);
                Alert.alert('Error', "Failed to fetch Favourites Data");
            } finally {
                setLoading(false);
            }
        };
        fetchFavourites();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Favourites</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={favourites}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        console.log("Rendering Item:", item);
                        return (
                            <View style={styles.item}>
                                <Text style={styles.txt}>Item: {item.itemName}</Text>
                                <Text style={styles.txt}>Price: {item.price}</Text>
                                <Text style={styles.txt}>Quantity: {item.quantity}</Text>
                                <Text style={styles.txt}>Seller: {item.userName}</Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default Favourites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 25,
        marginBottom: 20,
        fontFamily: 'WorkSans-Black',
        color: '#1E3D15',
        textAlign: 'center',
    },
    item: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1E3D15',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    txt: {
        color: 'black',
        fontFamily: 'WorkSans-Light',
        marginBottom: 5,
    },
});
