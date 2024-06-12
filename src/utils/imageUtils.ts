export const generateImageSizeMap = (
    imageSources: string[],
    width: number,
    height: number,
): { [key: string]: { width: number; height: number } } => {
    const imageSizeMap: { [key: string]: { width: number; height: number } } =
        {}
    imageSources.forEach((source) => {
        imageSizeMap[source] = { width, height }
    })
    return imageSizeMap
}
