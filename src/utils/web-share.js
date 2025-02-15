export function shareContent({ title, text, url }) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => {
        console.log("Konten berhasil dibagikan");
      })
      .catch((error) => {
        console.error("Gagal membagikan:", error);
      });
  } else {
    console.warn("Web Share API tidak mendukung di peramban ini.");
  }
}
