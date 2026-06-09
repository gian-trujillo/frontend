const BASE_URL = 'https://api.skylens.adventphoto.com';

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  const error = await res.json().catch(() => ({}));

  return Promise.reject(error.message || `Error: ${res.status}`);
};

const getToken = () => localStorage.getItem('jwt');

const makeRequest = (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  }).then(checkResponse);
};

//Auth

export const login = ({ email, password }) =>
  makeRequest('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

export const logout = () => {
  localStorage.removeItem('jwt');
};

//Gallery

export const getGallery = () =>
  makeRequest('/gallery');

export const replaceGalleryMedia = ({
  file,
  title,
  category,
  mediaType,
  layoutSlot,
}) => {
  const formData = new FormData();

  formData.append('media', file);
  formData.append('title', title);
  formData.append('category', category);
  formData.append('mediaType', mediaType);
  formData.append('layoutSlot', layoutSlot);

  return makeRequest('/gallery/replace', {
    method: 'PATCH',
    body: formData,
  });
};

export const updateGalleryMetadata = (id, data) =>
  makeRequest(`/gallery/${id}/metadata`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const deleteGalleryItem = (id) =>
  makeRequest(`/gallery/${id}`, {
    method: 'DELETE',
  });

//Packages

export const getPackages = () =>
  makeRequest('/packages');

export const updatePackage = (id, data) =>
  makeRequest(`/packages/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }, true);

  // Promotions

export const getActivePromotions = () =>
  makeRequest('/promotions/active');

export const getPromotions = () =>
  makeRequest('/promotions');

export const createPromotion = (data) =>
  makeRequest('/promotions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const updatePromotion = (id, data) =>
  makeRequest(`/promotions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const deletePromotion = (id) =>
  makeRequest(`/promotions/${id}`, {
    method: 'DELETE',
  });

export const replacePromotionImage = (id, file) => {
  const formData = new FormData();

  formData.append('image', file);

  return makeRequest(`/promotions/${id}/image`, {
    method: 'PATCH',
    body: formData,
  });
};

export const deletePromotionImage = (id) =>
  makeRequest(`/promotions/${id}/image`, {
    method: 'DELETE',
  });

//Contact

export const sendContactForm = (data) =>
  makeRequest('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  //Video

export const getFilms = () =>
  makeRequest('/films');

export const updateFilm = (id, data) =>
  makeRequest(`/films/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });