"use client";

import * as React from "react";
import { toPng } from "html-to-image";
import { Download, LoaderCircle } from "lucide-react";

import { templates, type CardTemplate } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import EditorPanel from "@/components/EditorPanel";
import CardPreview from "@/components/CardPreview";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Occasion = "Birthday" | "Holidays" | "Christmas" | "Diwali";

export default function Home() {
  const [occasion, setOccasion] = React.useState<Occasion>("Birthday");
  const [template, setTemplate] = React.useState<CardTemplate>(
    templates.find((t) => t.occasion === "Birthday")!
  );
  const [headline, setHeadline] = React.useState("Happy Birthday!");
  const [message, setMessage] = React.useState(
    "Wishing you a day filled with love, joy, and laughter."
  );
  const [image, setImage] = React.useState<string>(PlaceHolderImages[0].imageUrl);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [headlineFont, setHeadlineFont] = React.useState('font-headline');
  const [bodyFont, setBodyFont] = React.useState('font-body');

  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleOccasionChange = (newOccasion: Occasion) => {
    setOccasion(newOccasion);
    const newTemplate = templates.find((t) => t.occasion === newOccasion)!;
    setTemplate(newTemplate);
    let defaultHeadline = "Happy Birthday!";
    let defaultMessage = "Wishing you a wonderful day!";
    let defaultImage = PlaceHolderImages[0].imageUrl;

    switch (newOccasion) {
      case "Holidays":
        defaultHeadline = "Happy Holidays!";
        defaultMessage = "May your days be merry and bright.";
        defaultImage = PlaceHolderImages[3].imageUrl;
        break;
      case "Christmas":
        defaultHeadline = "Merry Christmas!";
        defaultMessage = "Wishing you a festive and joyful holiday season.";
        defaultImage = PlaceHolderImages[6].imageUrl;
        break;
      case "Diwali":
        defaultHeadline = "Happy Diwali!";
        defaultMessage = "May the festival of lights fill your home with joy.";
        defaultImage = PlaceHolderImages[8].imageUrl;
        break;
    }
    
    setHeadline(defaultHeadline);
    setMessage(defaultMessage);
    setImage(defaultImage);
    setHeadlineFont(newTemplate.layout.headlineFont);
    setBodyFont(newTemplate.layout.bodyFont);
  };
  
  const handleTemplateChange = (newTemplate: CardTemplate) => {
    setTemplate(newTemplate);
    setHeadlineFont(newTemplate.layout.headlineFont);
    setBodyFont(newTemplate.layout.bodyFont);
  }

  const handleDownload = React.useCallback(() => {
    if (cardRef.current === null) {
      return;
    }
    setIsDownloading(true);
    toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      width: 500,
      height: 700,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `cardcraft-${occasion.toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  }, [cardRef, occasion]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto grid h-full flex-1 gap-8 px-4 py-8 md:grid-cols-2 lg:grid-cols-[1fr_550px]">
          <EditorPanel
            occasion={occasion}
            onOccasionChange={handleOccasionChange}
            templates={templates.filter(t => t.occasion === occasion)}
            selectedTemplate={template}
            onTemplateChange={handleTemplateChange}
            headline={headline}
            onHeadlineChange={setHeadline}
            message={message}
            onMessageChange={setMessage}
            onImageChange={setImage}
            headlineFont={headlineFont}
            onHeadlineFontChange={setHeadlineFont}
            bodyFont={bodyFont}
            onBodyFontChange={setBodyFont}
          />
          <div className="flex flex-col gap-6">
            <CardPreview
              ref={cardRef}
              template={template}
              headline={headline}
              message={message}
              image={image}
              headlineFont={headlineFont}
              bodyFont={bodyFont}
            />
            <Button onClick={handleDownload} disabled={isDownloading} size="lg">
              {isDownloading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Download />
              )}
              Download Card
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
