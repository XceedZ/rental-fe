export const truncateText = (text, showMore, charLimit = 100) => {
  if (showMore) {
    return text;
  }
  return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
};
