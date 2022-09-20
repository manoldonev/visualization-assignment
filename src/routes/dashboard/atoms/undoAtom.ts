import { applyPatches } from 'immer';
import { atom } from 'jotai';
import { undoHistoryAtom } from './undoHistoryAtom';
import { selectedItemsAtom } from './selectedItemsAtom';

// write-only action atom
export const undoAtom = atom(null, (get, set) => {
  set(undoHistoryAtom, (draft) => {
    const undoableEntry = draft.undos.pop();
    if (undoableEntry != null) {
      set(selectedItemsAtom, applyPatches(get(selectedItemsAtom), undoableEntry.inversePatches));
      draft.redos.push(undoableEntry);
    }
  });
});
