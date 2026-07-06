/**
 * Extracts the 11-character YouTube video ID from various YouTube URL formats.
 * Supports: watch?v=..., youtu.be/..., embed/..., shorts/..., etc.
 * @param {string} url - The YouTube video URL
 * @returns {string|null} The video ID or null if invalid
 */
function extractYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
}

/**
 * Returns YouTube video metadata including the ID and default thumbnail URL.
 * @param {string} url - The YouTube video URL
 * @returns {object|null} Object containing videoId and thumbnailUrl, or null if invalid
 */
function getYoutubeData(url) {
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  return {
    videoId,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`
  };
}

module.exports = {
  extractYoutubeId,
  getYoutubeData
};
