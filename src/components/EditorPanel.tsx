'use client';

import * as React from 'react';
import Image from 'next/image';
import { Gift, Library, LoaderCircle, PartyPopper, Sparkles, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getAiSuggestions } from '@/lib/actions';
import type { Occasion } from '@/app/page';
import type { CardTemplate } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EditorPanelProps {
  occasion: Occasion;
  onOccasionChange: (occasion: Occasion) => void;
  templates: CardTemplate[];
  selectedTemplate: CardTemplate;
  onTemplateChange: (template: CardTemplate) => void;
  headline: string;
  onHeadlineChange: (headline: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onImageChange: (imageUrl: string) => void;
}

export default function EditorPanel({
  occasion,
  onOccasionChange,
  templates,
  selectedTemplate,
  onTemplateChange,
  headline,
  onHeadlineChange,
  message,
  onMessageChange,
  onImageChange,
}: EditorPanelProps) {
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "Image too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAiSuggest = async () => {
    setIsAiLoading(true);
    setAiSuggestions([]);
    const result = await getAiSuggestions(occasion);
    setIsAiLoading(false);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: result.error,
      });
    } else if (result.suggestions) {
      setAiSuggestions(result.suggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onMessageChange(suggestion);
    setAiSuggestions([]);
  }

  const imageLibrary = React.useMemo(() => {
    return occasion === 'Birthday' 
      ? PlaceHolderImages.filter(img => img.id.startsWith('birthday')) 
      : PlaceHolderImages.filter(img => img.id.startsWith('holiday'));
  }, [occasion]);


  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Choose Occasion</CardTitle>
          <CardDescription>Select the event for your card.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={occasion} onValueChange={(value) => onOccasionChange(value as Occasion)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Birthday" id="birthday" />
              <Label htmlFor="birthday" className="flex items-center gap-2 text-base cursor-pointer">
                <PartyPopper className="text-pink-500" /> Birthday
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Holidays" id="holidays" />
              <Label htmlFor="holidays" className="flex items-center gap-2 text-base cursor-pointer">
                <Gift className="text-red-500" /> Holidays
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Select Template</CardTitle>
          <CardDescription>Pick a design that you like.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template)}
              className={cn(
                "group rounded-lg border-2 p-1 transition-all",
                selectedTemplate.id === template.id ? "border-primary ring-2 ring-primary/50" : "border-transparent hover:border-accent"
              )}
            >
              <Image
                src={template.previewUrl}
                alt={template.name}
                width={200}
                height={150}
                className="rounded-md"
              />
              <p className="mt-2 text-sm font-medium text-center text-foreground group-hover:text-accent">
                {template.name}
              </p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Add Your Message</CardTitle>
          <CardDescription>Personalize the text on your card.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={headline} onChange={(e) => onHeadlineChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="relative">
              <Textarea id="message" value={message} onChange={(e) => onMessageChange(e.target.value)} rows={4} />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2 text-accent hover:bg-accent/10"
                    onClick={handleAiSuggest}
                    disabled={isAiLoading}
                  >
                    {isAiLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                    <span className="sr-only">Suggest Message</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  {isAiLoading && <div className="p-4 text-center">Generating...</div>}
                  {aiSuggestions.length > 0 && (
                     <div className="space-y-2">
                      <p className="font-medium text-sm">AI Suggestions</p>
                       {aiSuggestions.map((s, i) => (
                         <button key={i} onClick={() => handleSuggestionClick(s)} className="block w-full text-left p-2 rounded-md hover:bg-muted text-sm">
                           {s}
                         </button>
                       ))}
                     </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>4. Choose an Image</CardTitle>
          <CardDescription>Upload your own or select from our library.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="library">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library"><Library className="mr-2" /> Library</TabsTrigger>
              <TabsTrigger value="upload"><Upload className="mr-2" /> Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="library" className="mt-4">
              <ScrollArea className="h-48">
                <div className="grid grid-cols-3 gap-2 pr-4">
                  {imageLibrary.map((img) => (
                    <button key={img.id} onClick={() => onImageChange(img.imageUrl)} className="group rounded-md border-2 border-transparent hover:border-accent focus:border-accent focus:outline-none">
                       <Image
                        src={img.imageUrl}
                        alt={img.description}
                        width={150}
                        height={100}
                        data-ai-hint={img.imageHint}
                        className="rounded-md aspect-video object-cover"
                      />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="upload" className="mt-4">
              <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border">
                <Label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer text-center text-muted-foreground p-4">
                  <Upload />
                  <span>Click to upload or drag & drop</span>
                  <span className="text-xs">PNG, JPG, GIF up to 4MB</span>
                </Label>
                <Input id="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept="image/png, image/jpeg, image/gif" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
