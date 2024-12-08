export function isImageUrl(url: string) {
    return /\.(jpeg|jpg|gif|png|svg)$/.test(url) || url.startsWith('data:image/');
  }