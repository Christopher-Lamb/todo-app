function generateUID(): string {
  // Get the current time in milliseconds since the epoch
  const timePart: string = Date.now().toString(36);

  // Generate a random part to append to the timestamp
  // Using Math.random() here for simplicity. For more uniqueness, you could use a more complex method.
  const randomPart: string = Math.random().toString(36).substring(2, 8);

  // Combine the time part and the random part
  const uniqueId: string = `${timePart}-${randomPart}`;

  return uniqueId;
}

export default generateUID