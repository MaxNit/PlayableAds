import { Howl } from 'howler';
import music from '../assets/sounds/music.mp3';
import cracking from '../assets/sounds/cracking.mp3';
import boom from '../assets/sounds/boom.mp3';
import digits from '../assets/sounds/digits.mp3';

export const musicSound = new Howl({
    src: music,
    loop: true
})

export const crackingSound = new Howl({
    src: cracking,
})

export const boomSound = new Howl({
    src: boom,
})

export const digitsSound = new Howl({
    src: digits,
})