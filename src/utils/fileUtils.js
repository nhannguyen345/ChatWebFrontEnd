export function getFileName(file) {
  return file.name;
}

export function getFileSizeInKB(file) {
  const fileSizeInBytes = file.size;
  return (fileSizeInBytes / 1024).toFixed(2);
}
