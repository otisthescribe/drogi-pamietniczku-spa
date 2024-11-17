function generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`; // Ensure it's always 6 digits
}

export { generateRandomColor };