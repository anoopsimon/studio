export type CardTemplate = {
  id: string;
  name: string;
  occasion: 'Birthday' | 'Holidays';
  previewUrl: string;
  layout: {
    backgroundColor: string;
    textColor: string;
    headlineFont: string;
    bodyFont: string;
    imageContainerClass: string;
    textContainerClass: string;
  };
};

export const templates: CardTemplate[] = [
  {
    id: 'bday-elegant',
    name: 'Elegant',
    occasion: 'Birthday',
    previewUrl: 'https://picsum.photos/seed/prev-bday1/200/150',
    layout: {
      backgroundColor: '#f5f5f5',
      textColor: '#333333',
      headlineFont: 'font-headline',
      bodyFont: 'font-body',
      imageContainerClass: 'p-8',
      textContainerClass: 'p-8 text-center',
    },
  },
  {
    id: 'bday-playful',
    name: 'Playful',
    occasion: 'Birthday',
    previewUrl: 'https://picsum.photos/seed/prev-bday2/200/150',
    layout: {
      backgroundColor: '#EBF5FB',
      textColor: '#17202A',
      headlineFont: 'font-headline',
      bodyFont: 'font-body',
      imageContainerClass: 'p-4',
      textContainerClass: 'p-8 text-left',
    },
  },
  {
    id: 'holiday-classic',
    name: 'Classic',
    occasion: 'Holidays',
    previewUrl: 'https://picsum.photos/seed/prev-holi1/200/150',
    layout: {
      backgroundColor: '#FDFEFE',
      textColor: '#7B241C',
      headlineFont: 'font-headline',
      bodyFont: 'font-body',
      imageContainerClass: 'p-8',
      textContainerClass: 'p-8 text-center',
    },
  },
  {
    id: 'holiday-cozy',
    name: 'Cozy',
    occasion: 'Holidays',
    previewUrl: 'https://picsum.photos/seed/prev-holi2/200/150',
    layout: {
      backgroundColor: '#F5EEF8',
      textColor: '#4A235A',
      headlineFont: 'font-headline',
      bodyFont: 'font-body',
      imageContainerClass: 'p-4',
      textContainerClass: 'p-8 text-right',
    },
  },
];
