import { AppRegistry } from 'react-native';
import App from './App';
global.serverUrl = 'https://www.credenc.com';
AppRegistry.registerComponent('credencApp', () => App);
