import { Page } from "./page";

describe("Page object test", () => {
    it("should start with size of 9 and page 1", () => {
        const page = new Page();

        expect(page.size).toBe(9);
        expect(page.value).toBe(1);
    })
})
