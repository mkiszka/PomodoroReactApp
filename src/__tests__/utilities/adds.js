import { fib, fizzBuzz , xxx} from "../../utilities/adds";
//1a. najmniejsza liczba testów to 4, tak aby każde możliwe przejście w kodzie było pokryte

describe('fizzBuzz', () => {
    describe('return string', () => {
        it('"FizzBuzz" for 0', () => {
            expect(fizzBuzz(0)).toBe('FizzBuzz');
        });    
        it('"FizzBuzz" for 15', () => {
            expect(fizzBuzz(0)).toBe('FizzBuzz');
        }); 
        it('"Fizz" for 3', () => {
            expect(fizzBuzz(3)).toBe('Fizz');
        });
        it('"Buzz" for 5', () => {
            expect(fizzBuzz(5)).toBe('Buzz');
        });    
    });
    describe('return number', () => {
        it('1 for 1', () => {
            expect(fizzBuzz(1)).toBe(1);
        });
        it('2 for 2', () => {
            expect(fizzBuzz(2)).toBe(2);
        });
        it('4 for 4', () => {
            expect(fizzBuzz(4)).toBe(4);
        });
        
    });
    
});

//2 a. najmniejsza liczba testów to 2 dla pokrycia każdej ścięzki w kodzie.

describe('fib function', () => {
    it('for 0 return 0', () => {
        expect(fib(0)).toEqual(0);
    });
    it(' for 1 return 1', () => {
        expect(fib(1)).toEqual(1);
    });
    it('for 1  return 1', () => {
        expect(fib(2)).toEqual(1);
    });
    it('for 10 return 55', () => {
        expect(fib(10)).toEqual(55);
    });
});

//3. funkcja wypisuje string od tyłu
describe('xxx function should reverse string', () => {
    it('for ala ma kota return atok am ala', () => {
        expect(xxx("ala ma kota")).toEqual("atok am ala");
    });
   it('for c return c', () => {
        expect(xxx("c")).toEqual("c");
    });
    it('for ak return ka', () => {
        expect(xxx("ak")).toEqual("ka");
    });
});