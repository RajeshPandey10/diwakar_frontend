export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return "https://via.placeholder.com/600x400?text=Image+Not+Available";
};

export const isContentLong = (content, category) => {
  if (category === "Poem") {
    return content.split("\n").length > 10;
  }
  return content.length > 300;
};

export const isCommentValid = (comment) => {
  const prohibitedWords = ["harmful", "sexual", "violent", "abusive", "fuck"];
  return !prohibitedWords.some((word) =>
    comment.toLowerCase().includes(word)
  );
};
