"use strict";
let VERSION_ID = 0; // 0...9999
const GLOBAL_SETTINGS_PLAYABLE = window.GLOBAL_SETTINGS_PLAYABLE || window.GLOBAL_SETTINGS_PLAYABLE_DEV.versions[VERSION_ID];

let TITLE = GLOBAL_SETTINGS_PLAYABLE.title

export const PLAYABLE_MISCLICK = GLOBAL_SETTINGS_PLAYABLE.misclick

window.RATIO = {
    /* X */
    XLG: 2.15,
    /* 16/8 */
    LG:  1.99,
    /* 16/9 */
    MD:  1.76,
    /* 5/3 */
    SM:  1.65,
    /* 16/10 */
    XSM: 1.59,
    /* 3/2 */
    MN: 1.49,
    /* 4/3 */
    EMN: 1.32
};