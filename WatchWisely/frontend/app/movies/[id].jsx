import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MovieDetails = () => {
    const { id } = useLocalSearchParams()
    console.log(id)
    return (
        <View>
            <Text>MovieDetails: {id}</Text>
        </View>
    )
}

export default MovieDetails
