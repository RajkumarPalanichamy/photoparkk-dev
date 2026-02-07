// Polyfill for SlowBuffer (removed in Node.js v21+)
// This fixes compatibility issues with older packages like buffer-equal-constant-time
import { Buffer } from "buffer";

if (typeof globalThis.SlowBuffer === "undefined") {
  globalThis.SlowBuffer = Buffer;
}

// Also set it on global for CommonJS compatibility
if (typeof global.SlowBuffer === "undefined") {
  global.SlowBuffer = Buffer;
}
