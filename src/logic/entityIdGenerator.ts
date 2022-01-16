export function* entityIdGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }

  // for typescript
  return id++;
}
