const T = require('../index');

describe('Vairable test suit (standard ES8)', () => {
  it('should be ok <Atomic>', () => T(1));

  it('should be ok <Struct>', () => {
    const ints = T(T.Struct, { a: T.integer, b: T.integer });
    return T(ints, { a: 1, b: 2 });
  });

  it('should be ok <Array>', () => {
    const arr = T(T.Array, T.integer);
    return T(arr, [1, 2, 3, 4, 5]);
  });

  it('should be ok <Function> 1', () => {
    const shape = T(T.Function, [T.integer, T.integer]);
    const f = T(shape, (x, y) => x + y);
    return T(f, 1, 2);
  });

  it('should be ok <Function> 2', () => {
    const ints = T(T.Struct, { a: T.integer, b: T.integer });
    const shape = T(T.Function, [ints, ints]);
    const f = T(shape, (x, y) => x.a + x.b + y.a + y.b);
    return T(f, { a: 1, b: 2 }, { a: 3, b: 4 });
  });

  it('should be ok <Function> 3', () => {
    const shape = T(T.Function, [T.integer]);
    const f = T(shape, x => x + 4);
    try {
      return T(f, 1);
    } catch (e) {
      return e;
    }
  });

  it('should be ok T.bind', () => T(1).bind(v => v + 1));
});
