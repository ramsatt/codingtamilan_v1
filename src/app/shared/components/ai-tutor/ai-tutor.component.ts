import { Component, signal, ElementRef, ViewChild, AfterViewChecked, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Slide } from '../../../core/services/course-data.service';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-tutor.component.html',
  styleUrl: './ai-tutor.component.css'
})
export class AiTutorComponent implements AfterViewChecked {
  lessonTitle = input<string>('');
  currentSlideData = input<Slide | null>(null);
  lang = input<'en' | 'ta'>('en');

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = signal('');
  messages = signal<ChatMessage[]>([]);

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor() {
    effect(() => {
      // Whenever currentSlideData or lang changes, this effect will run
      const slideData = this.currentSlideData();
      const language = this.lang();
      console.log('[AiTutorComponent] Effect triggered', { slideData, language });
      this.resetChatWithContext();
    });
  }

  private resetChatWithContext() {
    const slide = this.currentSlideData();
    const topics = this.extractTopics(slide);
    let greeting = '';
    const currentLang = this.lang();

    if (topics.length > 0) {
      const topicStr = topics.join(', ');
      if (currentLang === 'ta') {
        greeting = `வணக்கம்! நான் உங்கள் AI Tutor. இந்த பக்கத்தில் ${topicStr} போன்ற தலைப்புகள் உள்ளன. இதில் ஏதாவது சந்தேகம் உள்ளதா? நான் விளக்கட்டுமா?`;
      } else {
        greeting = `Hi! I am your AI Tutor. This slide covers: ${topicStr}. Do you have any doubts related to these topics? Shall I explain anything to you?`;
      }
    } else {
      if (currentLang === 'ta') {
        greeting = `வணக்கம்! நான் உங்கள் AI Tutor. இந்த பாடத்தில் உங்களுக்கு ஏதாவது உதவி வேண்டுமா?`;
      } else {
        greeting = `Hi! I am your AI Tutor. How can I help you with this lesson?`;
      }
    }

    this.messages.set([
      { role: 'ai', text: greeting }
    ]);
    console.log('[AiTutorComponent] resetChatWithContext:', greeting);
  }

  private extractTopics(slide: Slide | null): string[] {
    if (!slide) return [];
    const topics: string[] = [];
    for (const block of slide.blocks) {
      if (block.type === 'header' && block.text) {
        topics.push(block.text);
      }
    }
    const title = this.lessonTitle();
    if (topics.length === 0 && title) {
      topics.push(title);
    }
    return topics;
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch (err) { }
    }
  }

  async sendMessage() {
    const text = this.userInput().trim();
    if (!text) return;

    this.messages.update(m => [...m, { role: 'user', text }]);
    this.userInput.set('');
    this.isTyping.set(true);

    try {
      const apiKey = environment.groqApiKey;
      if (!apiKey) {
        throw new Error('Groq API Key is missing in environment.ts');
      }

      // Prepare context for the prompt
      const slide = this.currentSlideData();
      const slideContentText = slide
        ? JSON.stringify(slide.blocks)
        : 'No specific slide content';
        
      console.log('[AiTutorComponent] sendMessage context:', {
        lessonTitle: this.lessonTitle(),
        currentSlideData: slide,
        slideContentText
      });

      const systemPrompt = `You are an AI coding tutor for Coding Tamilan. 
Language preference: ${this.lang() === 'ta' ? 'Tamil (Tanglish or Native Tamil)' : 'English'}.
Current Lesson: ${this.lessonTitle()}.
Current Slide Content Data: ${slideContentText}.

INSTRUCTIONS: 
1. You must ONLY answer questions related to the current slide content or lesson topic. 
2. If the user asks something completely outside of this context, gently guide them back to the current topic.
3. Keep your answers concise, encouraging, and focused on programming.
4. Do not act like a generic assistant. You are deeply integrated into this specific lesson's context.`;

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...this.messages().map(m => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: m.text
        }))
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      this.messages.update(m => [...m, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error('Error fetching from Groq:', error);
      this.messages.update(m => [...m, {
        role: 'ai',
        text: 'Oops! Something went wrong connecting to my brain. Please check your API key and try again later.'
      }]);
    } finally {
      this.isTyping.set(false);
    }
  }
}
