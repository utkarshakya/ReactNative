import { useWindowDimensions } from "react-native";

/**
 * @name useDeviceType
 * @description Hook to determine device type based on screen width
 * @returns {string}
 */
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

/**
 * @name useResponsiveWidth
 * @description Hook to for responsive width
 * @param {number} percentage 
 * @returns {number}
 */
export const useResponsiveWidth = (percentage) => {
    const { width } = useWindowDimensions();
    return (percentage / 100) * width;
}

/**
 * @name useResponsiveHeight
 * @description Hook to get responsive height
 * @param {number} percentage 
 * @returns {number}
 */
export const useResponsiveHeight = (percentage) => {
    const { height } = useWindowDimensions();
    return (percentage / 100) * height;
}

/**
 * @name useResponsiveFont
 * @description Hook to get responsive font size
 * @param {number} baseFontSize 
 * @returns {number}
 */
export const useResponsiveFont = (baseFontSize) => {
    const { width, fontScale } = useWindowDimensions();
    const baseWidth = 375; // reference device width
    const scaled = (width / baseWidth) * baseFontSize;
    return scaled / fontScale; // adjusts for user’s system font setting
};
