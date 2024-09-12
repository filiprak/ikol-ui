require('jest-fetch-mock').enableMocks();

// hooks
beforeEach(() => {
    // clear document before test
    document.getElementsByTagName('html')[0].innerHTML = '';

    // clear focus
    if (document.activeElement) {
        document.activeElement = document.body;
    }
})

// requestAnimationFrame
jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());

// ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
