const T = require('../index');

describe('Vairable test suit (standard ES8)', () => {
  it('should be ok <Atomic>', () => {
    console.log(T(T.integer, 1));
    console.log(T(T(T.integer, 0)));
  });

  it('should be ok <Struct>', () => {
    const ints = T(T.Struct, { a: T.integer, b: T.integer });
    console.log(T(ints, { a: 1, b: 2 }));
  });

  it('should be ok <Array>', () => {
    const arr = T(T.Array, T.integer);
    console.log(T(arr, [1, 2, 3, 4, 5]));
  });

  it('should be ok <Function> 1', () => {
    const shape = T(T.Function, [T.integer, T.integer]);
    const f = T(shape, [T.Function.defineBody, (x, y) => x + y]);
    console.log(T.call(f, 1, 2));
  });

  it('should be ok <Function> 2', () => {
    const ints = T(T.Struct, { a: T.integer, b: T.integer });
    const shape = T(T.Function, [ints, ints]);
    const f = T(shape, [T.Function.defineBody, (x, y) => x.a + x.b + y.a + y.b]);
    console.log(T.call(f, { a: 1, b: 2 }, { a: 3, b: 4 }));
  });

  it('should be ok <Function> 3', () => {
    const shape = T(T.Function, [T.boolean, T.boolean]);
    const f = T(shape, [T.Function.defineBody, (x, y) => x && y]);
    console.log(T.call(f, true, false));
    try {
      console.log(T.call(f, 1, 2));
    } catch (e) {
      console.log(e.message);
    }
  });

  it('should be ok T', () => {
    console.log(T(1));
  });
});
