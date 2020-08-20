import { SessionFrame } from 'plugin/SessionFrame';
export declare class SessionFrameImpl implements SessionFrame {
    private readonly id;
    constructor(id: string);
    updateName(name: string): void;
    end(): void;
}
