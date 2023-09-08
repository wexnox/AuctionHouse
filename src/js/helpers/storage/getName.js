import * as storage from '../../services/storage.mjs';

export function getName() {
  return storage.get('name');
}
