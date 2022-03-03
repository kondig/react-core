import { Action } from 'libraries/model';

// const PLAY = 'PLAY';
// const play = (payload) => ({
//     type: PLAY,
//     payload,
// });
const play = Action('PLAY');

// const JUMP_TO = 'JUMP_TO';
// const jumpTo = (payload) => ({
//     type: JUMP_TO,
//     payload,
// });
const jumpTo = Action('JUMP_TO');

// export {
//     PLAY,
//     JUMP_TO,
//     play,
//     jumpTo,
// };
export {
    play,
    jumpTo,
};
