interface SelectionPrototype {
    rangeCount: number;
    addRange: jest.Mock;
    getRangeAt: jest.Mock;
    removeAllRanges: jest.Mock;
}

interface Self {
    _selection: SelectionPrototype;
    getSelection: jest.Mock<SelectionPrototype>;
    execCommand: jest.Mock<boolean, [string]>;
}

const generatePrototype = (): Self => {
    const self: Self = {
        _selection: {
            rangeCount: 0,
            addRange: jest.fn(),
            getRangeAt: jest.fn(),
            removeAllRanges: jest.fn(),
        },

        getSelection: jest.fn(() => {
            return self._selection;
        }),
        execCommand: jest.fn((name: string) => {
            return true;
        }),
    };
    return self;
};

export const mockSelectionAPI = (): void => {
    const prototype = generatePrototype();
    (window as any).getSelection = prototype.getSelection;
    (document as any).getSelection = prototype.getSelection;
    (document as any).execCommand = prototype.execCommand;
};

export const unmockSelectionAPI = (): void => {
    delete (window as any).getSelection;
    delete (document as any).getSelection;
    delete (document as any).execCommand;
};
