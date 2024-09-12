const generatePrototype = () => {
    return {
        open: jest.fn(() => {
            return {
                document: { body: { innerHTML: '' } },
                close: jest.fn(),
            };
        }),
        location: {
            replace: jest.fn(),
        },
    };
};

let originalWindowOpen: typeof window.open;
let originalWindowLocation: Location;

export const mockNavigationAPI = (options?: any) => {
    const prototype = generatePrototype();

    originalWindowOpen = window.open;
    originalWindowLocation = window.location;

    (window as any).open = prototype.open;
    Object.defineProperty(window, 'location', {
        value: { replace: prototype.location.replace },
        writable: true,
    });
};

export const unmockNavigationAPI = () => {
    (window as any).open = originalWindowOpen;
    Object.defineProperty(window, 'location', {
        value: originalWindowLocation,
        writable: true,
    });
};
