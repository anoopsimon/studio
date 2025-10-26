'use server';

export async function getAiSuggestions(occasion: string): Promise<{ suggestions?: string[]; error?: string }> {
  // This is a mock implementation as per project guidelines.
  // In a real application, this would call a Genkit flow from '@ai/flows'.
  console.log(`Generating AI suggestions for: ${occasion}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (occasion === 'Birthday') {
    return {
      suggestions: [
        "Wishing you a day filled with joy, laughter, and everything you wished for. Happy Birthday!",
        "May your birthday be as amazing as you are. Cheers to another year of success and happiness!",
        "Happy Birthday! Hope your special day brings you all that your heart desires."
      ]
    };
  }
  if (occasion === 'Holidays') {
    return {
      suggestions: [
        "Wishing you a season of gladness, a season of cheer, and to top it all off, a wonderful year. Happy Holidays!",
        "May the magic and wonder of the holiday season stay with you throughout the coming year.",
        "Warmest thoughts and best wishes for a wonderful Holiday and a Happy New Year."
      ]
    };
  }
  if (occasion === 'Christmas') {
    return {
      suggestions: [
        "Merry Christmas! Wishing you all the happiness your holiday can hold.",
        "May your Christmas sparkle with moments of love, laughter, and goodwill.",
        "Wishing you a very Merry Christmas and a wonderful New Year."
      ]
    };
  }
  if (occasion === 'Diwali') {
    return {
      suggestions: [
        "May the divine light of Diwali spread into your life peace, prosperity, happiness, and good health.",
        "Wishing you a sparkling festival of lights! Happy Diwali!",
        "May the beauty of Diwali fill your home with happiness, and may the coming year provide you with all that brings you joy."
      ]
    };
  }
  return { error: "Could not generate suggestions for this occasion." };
}
