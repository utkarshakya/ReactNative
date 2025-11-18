import { useWindowDimensions } from "react-native";

// Hook to determine device type based on screen width
export const useDeviceType = () => {
    const { width } = useWindowDimensions();
    if (width >= 1024) {
        return "tablet";
    } else if (width >= 768) {
        return "largePhone";
    } else {
        return "phone";
    }
}

// Function to get responsive width and height based on percentage
export const useResponsiveWidth = (percentage) => {
    const { width } = useWindowDimensions();
    return (percentage / 100) * width;
}
export const useResponsiveHeight = (percentage) => {
    const { height } = useWindowDimensions();
    return (percentage / 100) * height;
}

// Hook to get responsive font size
export const useResponsiveFont = (baseFontSize) => {
    const { width, fontScale } = useWindowDimensions();
    const baseWidth = 375; // reference device width
    const scaled = (width / baseWidth) * baseFontSize;
    return scaled / fontScale; // adjusts for user’s system font setting
};
