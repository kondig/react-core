const PLAY = 'PLAY';
const play = (payload) => ({
    type: PLAY,
    payload,
});

const JUMP_TO = 'JUMP_TO';
const jumpTo = (payload) => ({
    type: JUMP_TO,
    payload,
});

export {
    PLAY,
    JUMP_TO,
    play,
    jumpTo,
};
