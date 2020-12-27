import { Random } from './Random';

describe('Random', () => {
  describe('when creating a Random instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new Random()).not.toThrow();
    });

    it('returns a Random instance', () => {
      expect(new Random()).toBeInstanceOf(Random);
    });
  });

  describe('arrayElement', () => {
    it('returns a random element in the default array', () => {
      const random = new Random();
      const defaultArray = ['a', 'b', 'c'];

      expect(defaultArray).toEqual(
        expect.arrayContaining([random.arrayElement()])
      );
    });

    it('returns a random element in the array', () => {
      const random = new Random();
      const testArray = ['hello', 'to', 'you', 'my', 'friend'];

      expect(testArray).toEqual(
        expect.arrayContaining([random.arrayElement(testArray)])
      );
    });

    it('returns a random element in the array when there is only 1', () => {
      const random = new Random();
      const testArray = ['hello'];

      expect(testArray).toEqual(
        expect.arrayContaining([random.arrayElement(testArray)])
      );
    });
  });

  describe('number', () => {
    it('returns a random number with default values', () => {
      const random = new Random();
      const number = random.number();

      expect(number).toBeLessThanOrEqual(99999);
      expect(number).toBeGreaterThanOrEqual(0);
    });

    it('returns a random number given a maximum value as Number', () => {
      const random = new Random();
      const max = 10;

      expect(random.number(max)).toBeLessThanOrEqual(max);
    });

    it('returns a random number given a maximum value as Object', () => {
      const random = new Random();
      const options = { max: 10 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a maximum value of 0', () => {
      const random = new Random();
      const options = { max: 0 };

      expect(random.number(options)).toBe(0);
    });

    it('returns a random number given a negative number minimum and maximum value of 0', () => {
      const random = new Random();
      const options = { min: -100, max: 0 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a negative number minimum and negative maximum value', () => {
      const random = new Random();
      const options = { min: -100, max: -10 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number between a range', () => {
      const random = new Random();
      const options = { min: 22, max: 33 };

      for (let i = 0; i < 100; i++) {
        const randomNumber = random.number(options);

        expect(randomNumber).toBeGreaterThanOrEqual(options.min);
        expect(randomNumber).toBeLessThanOrEqual(options.max);
      }
    });

    it('provides numbers with a given precision', () => {
      const random = new Random();
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = Array.from(Array(50).keys()).map(() =>
        random.number(options)
      );

      expect(results).toEqual(expect.arrayContaining([0.5]));
      expect(results).toEqual(expect.arrayContaining([1.0]));
      expect(results).toEqual(expect.arrayContaining([0.0]));
      expect(results).toEqual(expect.arrayContaining([1.5]));
    });

    it('provides numbers with a with exact precision', () => {
      const random = new Random();
      const options = { min: 0.5, max: 0.99, precision: 0.01 };

      for (let i = 0; i < 100; i++) {
        const number = random.number(options);

        expect(number).toBe(Number(number.toFixed(2)));
      }
    });

    it('should not modify the input object', () => {
      const random = new Random();
      const min = 1;
      const max = 2;
      const precision = 0.5;
      const opts = {
        min,
        max,
        precision
      };
      random.number(opts);

      expect(opts.min).toBe(min);
      expect(opts.max).toBe(max);
      expect(opts.precision).toBe(precision);
    });

    it('should return deterministic results when seeded with integer', () => {
      const random = new Random();
      random.initSeed(100);

      expect(random.number(100)).toBe(54);
    });
  });

  describe('float', () => {
    it('returns a random float with a default precision value (0.01)', () => {
      const random = new Random();
      const number = random.float();

      expect(number).toBe(Number(number.toFixed(2)));
    });

    it('returns a random float given a precision value', () => {
      const random = new Random();
      const number = random.float(0.001);

      expect(number).toBe(Number(number.toFixed(3)));
    });

    it('returns a random number given a maximum value as Object', () => {
      const random = new Random();
      const options = { max: 10 };

      expect(random.float(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a maximum value of 0', () => {
      const random = new Random();
      const options = { max: 0 };

      expect(random.float(options)).toBe(0);
    });

    it('returns a random number given a negative number minimum and maximum value of 0', () => {
      const random = new Random();
      const options = { min: -100, max: 0 };

      expect(random.float(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number between a range', () => {
      const random = new Random();
      const options = { min: 22, max: 33 };

      for (let i = 0; i < 5; i++) {
        const randomNumber = random.float(options);

        expect(randomNumber).toBeGreaterThanOrEqual(options.min);
        expect(randomNumber).toBeLessThanOrEqual(options.max);
      }
    });

    it('provides numbers with a given precision', () => {
      const random = new Random();
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = Array.from(Array(50).keys()).map(() =>
        random.float(options)
      );

      expect(results).toEqual(expect.arrayContaining([0.5]));
      expect(results).toEqual(expect.arrayContaining([1.0]));
      expect(results).toEqual(expect.arrayContaining([0.0]));
      expect(results).toEqual(expect.arrayContaining([1.5]));
    });

    it('provides numbers with a with exact precision', () => {
      const random = new Random();
      const options = { min: 0.5, max: 0.99, precision: 0.01 };

      for (let i = 0; i < 100; i++) {
        const number = random.float(options);

        expect(number).toBe(Number(number.toFixed(2)));
      }
    });

    it('should not modify the input object', () => {
      const random = new Random();
      const min = 1;
      const max = 2;
      const precision = 0.2;
      const opts = {
        min,
        max,
        precision
      };
      random.float(opts);

      expect(opts.min).toBe(min);
      expect(opts.max).toBe(max);
      expect(opts.precision).toBe(precision);
    });
  });

  describe('boolean', () => {
    it('should generate a boolean value', () => {
      const random = new Random();
      const bool = random.boolean();

      expect(typeof bool === 'boolean');
    });
  });

  describe('uuid', () => {
    it('should generate a valid UUID', () => {
      const random = new Random();
      const uuid = random.uuid();
      const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

      expect(RFC4122.test(uuid)).toEqual(true);
    });
  });
});