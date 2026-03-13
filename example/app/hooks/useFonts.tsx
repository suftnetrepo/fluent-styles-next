import { useFonts as useExpoFonts } from 'expo-font';
import { useEffect, useState } from 'react';

export function useFonts() {
    const [isReady, setIsReady] = useState(false);
    const [fontsLoaded] = useExpoFonts({        
        "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Italic": require("../../assets/fonts/Roboto-Italic.ttf"),
        "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf")        
    });   

    useEffect(() => {
        async () => {
            if (fontsLoaded) {             
                setIsReady(true);
            } 
        };
    }, [fontsLoaded]);
  
    return isReady;
}
