/**
 * Uppercase the character at the given index
 * @param str - The string to uppercase
 * @param index - The index of the character to uppercase
 * @returns The string with the character at the given index uppercase
 */

export const uppercaseAtIndex = (str: string, index: number) => {
  if (index < 0 || index >= str.length) {
    throw new Error('Index is out of bounds');
  }

  return (
    str.substring(0, index) +
    str.charAt(index).toUpperCase() +
    str.substring(index + 1)
  );
};
