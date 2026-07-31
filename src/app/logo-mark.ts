/**
 * The SK monogram as a self-contained data URI.
 *
 * The generated-icon routes render through Satori, which only reliably draws
 * SVG when it arrives as an <img> source — inline <svg> children are not fully
 * supported. Keeping the markup here means icon.tsx and apple-icon.tsx stay in
 * sync with the mark used by the Logo component.
 */
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2978.04 2531.47" fill="#FFFFFF"><polygon points="2280.38 385.36 1569.55 1197.92 1782.44 1445.14 2066.18 1775.72 2712.16 2531.25 2978.05 2530.82 2789.13 2308.02 1839.04 1197.51 2323.09 646.27 2888.41 1.46 2616.24 .92 2280.38 385.36"/><polygon points="1411.11 2531.27 1613.38 2530.76 1613.13 1463.53 1411.22 1235.75 1411.11 2531.27"/><path d="M22.45,2531.47l-1.05-200.44,605.04-.29c85.13-.57,164.43-15.16,242.21-47.02,76.13-31.73,141.17-78.81,196.43-141.49l64.2,74.63c-32.99,66.67-76.46,127.18-132.67,177.17-93.95,84.69-209.04,128.58-336.23,136.4l-637.93,1.04Z"/><path d="M1046.65,1600.99c127.76,131.25,171.15,314.5,127.36,493.54l-39.59-47.06-212.77-262.18-187.5-194.13-180.1-184.39-171.28-175.51-123.31-126.71c-47.99-49.32-96.21-94.56-140.57-147.07C3.16,820.47-23.13,641.54,18.66,467.73l51.45,55.95c39.39,42.84,73.5,86.19,102.44,137.05,33.34,58.61,68.66,113.39,115.82,161.68l121.7,124.63,131.62,135.5,111.44,114.13,121.64,124.74,116.31,119.77,155.56,159.8Z"/><path d="M597.59,201.34c-107.24,2.8-206.52,22.44-300.14,67.5-68.53,32.59-126.6,76.47-173.26,138.08-21.5-23.5-38.87-44.26-61.64-66.12C152.06,137.77,340.85,6.82,564.85.45L1312.83,0l-.21,201.39-715.04-.05Z"/></svg>`;

export const LOGO_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(LOGO_SVG)}`;

/** Intrinsic aspect ratio of the mark (wider than it is tall). */
export const LOGO_ASPECT = 2978.04 / 2531.47;
