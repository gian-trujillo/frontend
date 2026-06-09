export const getOptimizedImageUrl = (
  url,
  {
    width = 1200,
    height,
    crop,
    quality = 'auto',
    format = 'auto',
  } = {},
) => {
  if (!url) {
    return '';
  }

  const selectedCrop = crop || (height ? 'fill' : 'limit');

  const transformations = [
    `c_${selectedCrop}`,
    `w_${width}`,
    height ? `h_${height}` : null,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(',');

  return url.replace('/upload/', `/upload/${transformations}/`);
};

export const getResponsiveImageSrcSet = (
  url,
  {
    widths = [480, 768, 1024, 1400, 1800],
    height,
    crop,
    quality = 'auto',
    format = 'auto',
  } = {},
) => {
  if (!url) {
    return '';
  }

  return widths
    .map((width) => {
      const optimizedUrl = getOptimizedImageUrl(url, {
        width,
        height,
        crop,
        quality,
        format,
      });

      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

export const getOptimizedVideoUrl = (
  url,
  {
    width = 1200,
    quality = 'auto',
    format = 'auto',
  } = {},
) => {
  if (!url) {
    return '';
  }

  const transformations = [
    `c_limit`,
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
  ].join(',');

  return url.replace('/upload/', `/upload/${transformations}/`);
};