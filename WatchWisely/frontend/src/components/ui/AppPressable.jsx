import { Pressable, Text } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useResponsiveFont, useResponsiveHeight, useResponsiveWidth } from '../../hooks/useResponsive';

const AppPressable = ({ title = 'Continue', onPress, disabled = false, style = {} }) => {

    const { Colors } = useColors();
    const color = Colors.ui.buttonText;
    const backgroundColor = Colors.ui.buttonBg;
    const shadowColor = Colors.shadow.shadow1;
    const fontSize = useResponsiveFont(12);
    const paddingVertical = useResponsiveHeight(2)
    const width = useResponsiveWidth(90)

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={
                ({ pressed }) => [
                    {
                        borderRadius: 999,
                        paddingVertical,
                        backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor,
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 8,
                        elevation: 4,
                        width,
                    },
                    pressed && {
                        opacity: 0.8,
                        transform: [{ scale: 0.98 }],
                    },
                    disabled && {
                        backgroundColor: Colors.core.buttonBgDisabled,
                    },
                    style
                ]
            }
        >
            <Text style={{ color, fontSize, fontWeight: '600', letterSpacing: 0.5 }}>{title}</Text>
        </Pressable>
    );
};

export default AppPressable;