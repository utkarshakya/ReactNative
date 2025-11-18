import { NativeModules } from "react-native";

export default function getMetroHostIp() {
    try {
        const scriptURL = NativeModules?.SourceCode?.scriptURL;
        if (!scriptURL) return null;
        const afterProtocol = scriptURL.split("://")[1];
        if (!afterProtocol) return null;
        const host = afterProtocol.split(":")[0];
        return host || null;
    } catch (e) {
        return null;
    }
}