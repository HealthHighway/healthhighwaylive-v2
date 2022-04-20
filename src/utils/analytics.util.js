import {Mixpanel} from 'mixpanel-react-native';
import { MIXPANEL_PROJECT_TOKEN } from '../constants/analytics.constants';


export class MixpanelManager {
    static sharedInstance = MixpanelManager.sharedInstance || new MixpanelManager();

    constructor() {
        this.mixpanel = new Mixpanel(MIXPANEL_PROJECT_TOKEN);
        this.mixpanel.init();
        this.mixpanel.setLoggingEnabled(true);
    }
}

export const MixpanelInstance = MixpanelManager.sharedInstance.mixpanel;