import "@testing-library/jest-dom";
import { describe, expect, test } from 'vitest';

const regexTest = str => str.split(/[\s,-]/g).filter(word => {return word !== ' ' && word !== ''});
const nums = "100 433, 890 - 243";

describe("Regex test", () => {
    test("Regex returns array of numbers", async () => {
        expect(regexTest(nums)).toEqual(["100", "433", "890", "243"]);
    });
})