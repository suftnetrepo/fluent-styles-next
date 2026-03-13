import 'react-native-gesture-handler'
import { useFonts } from "./app/hooks/useFonts";
import Start from './app/start';

export default function App() {
   useFonts();
  return <Start />
}
