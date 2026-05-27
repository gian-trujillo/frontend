export const getOptimizedImageUrl = (
  url,
  {
    width = 1200,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = {},
) => {
  if (!url) {
    return '';
  }

  const transformations = [
    `c_${crop}`,
    `w_${width}`,
    height ? `h_${height}` : null,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(',');

  return url.replace('/upload/', `/upload/${transformations}/`);
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
    `w_${width}`,
    'c_limit',
    `q_${quality}`,
    `f_${format}`,
  ].join(',');

  return url.replace('/upload/', `/upload/${transformations}/`);
};