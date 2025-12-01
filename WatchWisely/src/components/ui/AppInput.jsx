import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { useColors } from '../../hooks/useColors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useResponsiveFont, useResponsiveHeight, useResponsiveWidth } from '../../hooks/useResponsive'

/**
 * @summary It is a responsive input field component that can adjust itself based on the screen size and theme
 * @param {string} placeholder - Placeholder text for the input field
 * @param {string} value - Value of the input field
 * @param {function} onChangeText - Function to be called when the text changes
 * @param {object} styles - Style object for the input field (optional)
 * @param {boolean} isPassword - Whether the input field is a password field (optional)
 * @param {boolean} isEmail - Whether the input field is an email field (optional)
 * @returns {JSX.Element}
 */
const AppInput = ({ placeholder, value, onChangeText, isPassword = false, isEmail = false, styles = {} }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //Hooks
    const { Colors } = useColors();

    const color = Colors.core.text
    const backgroundColor = Colors.tab.tabBg
    const borderColor = Colors.core.border
    const width = useResponsiveWidth(90)
    const fontSize = useResponsiveFont(12)
    const paddingVertical = useResponsiveHeight(2)
    const paddingHorizontal = useResponsiveWidth(6)

    return (
        <View style={{
            width,
            flexDirection: "row",
            alignItems: "center",
        }}>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={Colors.ui.placeholder}
                keyboardType={isEmail ? "email-address" : "default"}
                secureTextEntry={isPassword && !isPasswordVisible}
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 50,
                    marginVertical: 5,
                    color,
                    backgroundColor,
                    borderColor,
                    width,
                    fontSize,
                    paddingVertical,
                    paddingHorizontal,
                }}
            />
            {isPassword && (
                <Pressable onPress={() => { setIsPasswordVisible(!isPasswordVisible) }}
                    style={{
                        position: "absolute",
                        right: 20,
                    }}>
                    <MaterialCommunityIcons name={isPasswordVisible ? "eye" : "eye-off"} size={fontSize * 1.5} color={color} />
                </Pressable>
            )}
        </View>
    )
}

export default AppInput 