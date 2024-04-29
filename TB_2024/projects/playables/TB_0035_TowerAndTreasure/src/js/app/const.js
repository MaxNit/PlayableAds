"use strict";
let VERSION_ID = 0; // 0...9999
const GLOBAL_SETTINGS_PLAYABLE = window.GLOBAL_SETTINGS_PLAYABLE || window.GLOBAL_SETTINGS_PLAYABLE_DEV.versions[VERSION_ID];

let TITLE = GLOBAL_SETTINGS_PLAYABLE.title || '';

export const PLAYABLE_MISCLICK = GLOBAL_SETTINGS_PLAYABLE.misclick

export const VERSIONS = {
    isMisclick: TITLE.indexOf('misclick') !== -1,
    isAutoredirect: TITLE.indexOf('autoredirect') !== -1
}

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

export const MAX_NUMBER_MERGE = 4;
export const MAX_NUMBER_MERGE_MISCLICK = 2;
export const TUTOR_DELAY = 7000;
export const MAX_NUMBER_GLASS_HIT = 2;

export const TowerConfig = [
    { 
        left: [1, 9, 9],
        right: [13, 13, null]
    },
    { 
        left: [8, null, 6],
        right: [null, null, 5]
    },
    { 
        left: 'pearls',
        right: [null, 6, 1]
    },
    { 
        left: [8, null, 3],
        right: [null, 3, null]
    },
    { 
        left: [12, null, 0],
        right: [null, 12, null]
    },
    { 
        left: [0, 5, null],
        right: [0, 3, 3]
    },
    { 
        left: [2, 2, null],
        right: [4, null, null]
    },
    { 
        left: [6, null, 0],
        right: [0, 9, 9]
    },
    { 
        left: [7, null, 0],
        right: [null, 1, 6]
    },
    { 
        left: [2, 4, 2],
        right: 'pearls'
    },
    { 
        left: [4, null, 0],
        right: [2, 0, 2]
    },
    { 
        left: [9, 2, 5],
        right: [null, 5, 5]
    },
    { 
        left: [4, 3, 7],
        right: [6, null, 4]
    }
]

export const itemsTextureCenter = {
    0: {
        x: 0,
        y: 35
    },
    1: {
        x: 0,
        y: 35
    },
    2: {
        x: 0,
        y: 30
    },
    3: {
        x: 0,
        y: 30
    },
    4: {
        x: 0,
        y: 10
    },
    5: {
        x: 0,
        y: 10
    },
    6: {
        x: 0,
        y: 10
    },
    7: {
        x: 0,
        y: 10
    },
    8: {
        x: 0,
        y: 10
    },
    9: {
        x: 0,
        y: 30
    },
    10: {
        x: 0,
        y: 40
    },
    11: {
        x: 0,
        y: 40
    },
    12: {
        x: 0,
        y: 30
    },
    13: {
        x: 0,
        y: 45
    },
    14: {
        x: 0,
        y: 45
    },
}