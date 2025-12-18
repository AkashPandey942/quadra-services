import createCache from "@emotion/cache";

export default function createEmotionCache(
  insertionPoint?: HTMLElement | null
) {
  return createCache({
    key: "mui",
    insertionPoint: insertionPoint ?? undefined,
  });
}
