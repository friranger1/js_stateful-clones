'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
