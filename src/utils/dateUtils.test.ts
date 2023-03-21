import { getMillisecondToDateString } from './dateUtils';

// describe: test가 여러 개일때 하나로 묶기 위해 사용
describe('특정 millisecond를 받았을 때', () => {
    test('해당하는 날짜의 문자열로 변경합니다.', () => {
        expect(getMillisecondToDateString(1669136198786)).toBe('2022-11-23');
    });
    test('10이하의 월, 10이하의 일수를 가진다면 0N의 형태로 변경합니다.', () => {
        expect(getMillisecondToDateString(1667228400000)).toBe('2022-11-01');
    });
});
