function* createEntityIdGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }

  // eslint-disable-next-line no-unreachable
  return id++;
}

let _idGenerator = createEntityIdGenerator();

export const getIdGenerator = () => _idGenerator;
export const resetIdGenerator = () => {
  _idGenerator = createEntityIdGenerator();
};
