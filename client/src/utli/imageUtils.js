export async function resizeImage(file, maxFileSize) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Maintain aspect ratio
        const scale = Math.sqrt(maxFileSize / file.size);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob.size <= maxFileSize) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(
                new Error(
                  "Image could not be resized to below the target size."
                )
              );
            }
          },
          file.type,
          0.8 // Compression quality
        );
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
