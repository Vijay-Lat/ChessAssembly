/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/** assembly/index/IMAGE_DATA_ID */
export declare const IMAGE_DATA_ID: {
  /** @type `u32` */
  get value(): number
};
/**
 * assembly/index/processImage
 * @param data `~lib/typedarray/Uint8Array`
 * @param width `i32`
 * @param height `i32`
 */
export declare function processImage(data: Uint8Array, width: number, height: number): void;
