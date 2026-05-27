export const normalizeYouTubeEmbedUrl = (url) => {
  if (!url) {
    return '';
  }

  if (url.includes('/embed/')) {
    return url;
  }

  if (url.includes('/shorts/')) {
    const videoId = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
};