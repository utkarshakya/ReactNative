import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useColors } from '../../hooks/useColors';
import { useResponsiveFont, useResponsiveHeight, useResponsiveWidth } from '../../hooks/useResponsive';

const GoogleSignInButton = ({ onPress, disabled = false, style = {} }) => {
    const { Colors } = useColors();

    // Google branding colors
    const backgroundColor = '#FFFFFF'; // Standard white background
    const textColor = '#1F1F1F'; // Standard dark text

    const shadowColor = Colors.shadow.shadow1;
    const fontSize = useResponsiveFont(14);
    const paddingVertical = useResponsiveHeight(1.5);
    const width = useResponsiveWidth(90);
    const iconSize = useResponsiveFont(20);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                {
                    width,
                    paddingVertical,
                    backgroundColor,
                    shadowColor,
                },
                pressed && styles.pressed,
                disabled && styles.disabled,
                style
            ]}
        >
            <View style={styles.contentContainer}>
                <Image
                    source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                    style={{ width: iconSize, height: iconSize, marginRight: 12 }}
                    contentFit="contain"
                />
                <Text style={[styles.text, { color: textColor, fontSize }]}>
                    Sign in with Google
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 12,
    },
    text: {
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    pressed: {
        opacity: 0.9,
        backgroundColor: '#F5F5F5',
    },
    disabled: {
        opacity: 0.6,
    }
});

export default GoogleSignInButton;
