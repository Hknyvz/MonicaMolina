const imageUrlBuilder = (imagePath) => {
  return `${process.env.NEXT_PUBLIC_WEPPATH_API_URL}images/${imagePath}`;
};

export { imageUrlBuilder };
