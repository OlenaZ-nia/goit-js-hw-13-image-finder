import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

setDefaultOption()
function setDefaultOption() {
    defaults.text = "";
    defaults.styling = 'brighttheme';
    defaults.icon = true;
    defaults.animation = 'fade';
    defaults.shadow = true;
    defaults.hide = true;
    defaults.delay = 1500;
    defaults.sticker = false;
    defaults.closer = false;
}
