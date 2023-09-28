import { Page } from "./page";

describe("Page object test", () => {
    it("should start with size of 6 and page 1", () => {
        const page = new Page();

        expect(page.size).toBe(6);
        expect(page.value).toBe(1);
    })
})
