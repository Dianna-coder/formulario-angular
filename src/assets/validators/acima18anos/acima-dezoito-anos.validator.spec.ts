// import { acimaDezoitoAnos } from './acima-dezoito-anos.validator';

// describe('VALIDATOR', () => {
//   it('acimaDezoitoAnos - Deve validar usuarios acima de 18 anos', async () => {
//     const data = new Date()

//     await expect(acimaDezoitoAnos(data)).toBe(false);
//     await expect(acimaDezoitoAnos(new Date(2018,1, 2))).toBe(false);
//     await expect(acimaDezoitoAnos(new Date(2010, 1, 2))).toBe(false);

//     await expect(acimaDezoitoAnos(new Date(2000, 1, 2))).toBe(true);
//     await expect(acimaDezoitoAnos(new Date(2001, 1, 2))).toBe(true);

//     const year = data.getFullYear() - 17
//     const dezesseteMenor = new Date (data.setFullYear(year))
    
//     await expect(acimaDezoitoAnos(dezesseteMenor)).toBe(false);

//     const dezesseteMaior = new Date (data.setFullYear(year - 1))
//     await expect(acimaDezoitoAnos(dezesseteMaior)).toBe(true);

//   });
// });
