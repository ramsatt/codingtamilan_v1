import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface ComparisonItem {
  title: string;
  color: string;
  icon: string;
  text: string;
}

export interface FlowStep {
  label: string;
  icon: string;
}

export interface QuizOption {
  text: string;
}

export interface Block {
  type: 'paragraph' | 'header' | 'list' | 'note' | 'example' | 'intro' | 'image' | 'code' | 'playground' | 'table' | 'highlight' | 'comparison' | 'flow' | 'quiz' | 'callout' | 'interactive';
  variant?: 'info' | 'warning' | 'danger';
  demo?: string;
  level?: number;
  text?: string;
  items?: any[];
  ordered?: boolean;
  code?: string;
  title?: string;
  src?: string;
  alt?: string;
  language?: string;
  subtype?: string;
  config?: any;
  headers?: string[];
  rows?: string[][];
  steps?: FlowStep[];
  options?: QuizOption[];
  answer?: number;
  question?: string;
  explanation?: string;
}

export interface Slide {
  blocks: Block[];
}

export interface Lesson {
  id: string;
  title: string;
  blocks: Block[];
  slides: Slide[];
}

export interface CourseMeta {
  id: string;
  title: string;
}

// Human-readable titles for the sidebar navigation
const LESSON_TITLES: Record<string, Record<string, string>> = {
  java: {
    'intro': '1. Java Introduction',
    'get-started': '2. Getting Started',
    'syntax': '3. Java Syntax',
    'output': '4. Output & Print',
    'comments': '5. Comments',
    'variables': '6. Variables',
    'data-types': '7. Data Types',
    'type-casting': '8. Type Casting',
    'operators': '9. Operators',
    'strings': '10. Strings',
    'math': '11. Math',
    'booleans': '12. Booleans',
    'if-else': '13. If...Else',
    'switch': '14. Switch',
    'while-loop': '15. While Loop',
    'for-loop': '16. For Loop',
    'break-continue': '17. Break & Continue',
    'arrays': '18. Arrays',
    'methods': '19. Methods',
    'method-parameters': '20. Method Parameters',
    'method-overloading': '21. Overloading',
    'scope': '22. Scope',
    'recursion': '23. Recursion',
    'oop': '24. OOP Intro',
    'classes-objects': '25. Classes & Objects',
    'class-attributes': '26. Class Attributes',
    'class-methods': '27. Class Methods',
    'constructors': '28. Constructors',
    'modifiers': '29. Modifiers',
    'encapsulation': '30. Encapsulation',
    'packages': '31. Packages',
    'inheritance': '32. Inheritance',
    'polymorphism': '33. Polymorphism',
    'inner-classes': '34. Inner Classes',
    'abstraction': '35. Abstraction',
    'interface': '36. Interfaces',
    'enums': '37. Enums',
    'user-input': '38. User Input',
    'date': '39. Dates',
    'arraylist': '40. ArrayList',
    'linkedlist': '41. LinkedList',
    'hashmap': '42. HashMap',
    'hashset': '43. HashSet',
    'iterator': '44. Iterator',
    'wrapper-classes': '45. Wrapper Classes',
    'exceptions': '46. Exceptions',
    'regex': '47. RegEx',
    'threads': '48. Threads',
    'lambda': '49. Lambda',
    'files': '50. Files',
  },
  ai: {
    'intro': '1. What is AI?',
    'history': '2. History of AI',
    'types-of-ai': '3. Types of AI',
    'machine-learning': '4. Machine Learning',
    'deep-learning': '5. Deep Learning',
    'supervised-learning': '6. Supervised Learning',
    'unsupervised-learning': '7. Unsupervised Learning',
    'reinforcement-learning': '8. Reinforcement Learning',
    'neural-networks': '9. Neural Networks',
    'training-models': '10. Training Models',
    'overfitting': '11. Overfitting',
    'transformers': '12. Transformers',
    'llms': '13. LLMs',
    'computer-vision': '14. Computer Vision',
    'nlp': '15. NLP',
    'generative-ai': '16. Generative AI',
    'ai-agents': '17. AI Agents',
    'ai-tools': '18. AI Tools',
    'rag': '19. RAG',
    'fine-tuning': '20. Fine-Tuning',
    'ai-in-production': '21. AI in Production',
    'ai-evaluation': '22. AI Evaluation',
    'ai-ethics': '23. AI Ethics',
    'ai-safety': '24. AI Safety',
    'future-of-ai': '25. Future of AI',
  },
  'prompt-engineering': {
    'intro': '1. What is Prompt Engineering?',
    'how-llms-work': '2. How LLMs Work',
    'anatomy-of-a-prompt': '3. Anatomy of a Prompt',
    'zero-shot': '4. Zero-Shot Prompting',
    'few-shot': '5. Few-Shot Prompting',
    'chain-of-thought': '6. Chain of Thought',
    'role-prompting': '7. Role Prompting',
    'instruction-prompting': '8. Instruction Prompting',
    'self-consistency': '9. Self-Consistency',
    'tree-of-thought': '10. Tree of Thought',
    'react': '11. ReAct',
    'prompt-chaining': '12. Prompt Chaining',
    'code-generation': '13. Code Generation',
    'summarization': '14. Summarization',
    'creative-writing': '15. Creative Writing',
    'reasoning-math': '16. Reasoning & Math',
    'data-formatting': '17. Data Formatting',
    'prompt-injection': '18. Prompt Injection',
    'hallucination': '19. Hallucination',
    'best-practices': '20. Best Practices',
  },
  python: {
    'intro': '1. Python Introduction',
    'get-started': '2. Getting Started',
    'syntax': '3. Python Syntax',
    'comments': '4. Comments',
    'variables': '5. Variables',
    'data-types': '6. Data Types',
    'numbers': '7. Numbers',
    'casting': '8. Casting',
    'strings': '9. Strings',
    'booleans': '10. Booleans',
    'operators': '11. Operators',
    'lists': '12. Lists',
    'tuples': '13. Tuples',
    'sets': '14. Sets',
    'dictionaries': '15. Dictionaries',
    'if-else': '16. If...Else',
    'while-loops': '17. While Loops',
    'for-loops': '18. For Loops',
    'functions': '19. Functions',
    'lambda': '20. Lambda',
    'arrays': '21. Arrays',
    'classes': '22. Classes',
    'inheritance': '23. Inheritance',
    'iterators': '24. Iterators',
    'polymorphism': '25. Polymorphism',
    'scope': '26. Scope',
    'modules': '27. Modules',
    'dates': '28. Dates',
    'math': '29. Math',
    'json': '30. JSON',
    'regex': '31. RegEx',
    'pip': '32. PIP',
    'try-except': '33. Try...Except',
    'user-input': '34. User Input',
    'string-formatting': '35. String Formatting',
    'file-handling': '36. File Handling',
  },
  typescript: {
    'intro': '1. Introduction to TypeScript',
    'setup': '2. Setup & Installation',
    'basic-types': '3. Basic Types',
    'type-inference': '4. Type Inference',
    'interfaces': '5. Interfaces',
    'type-aliases': '6. Type Aliases',
    'union-intersection': '7. Union & Intersection',
    'functions': '8. Functions',
    'classes': '9. Classes',
    'generics': '10. Generics',
    'enums': '11. Enums',
    'tuples': '12. Tuples',
    'type-assertions': '13. Type Assertions',
    'type-guards': '14. Type Guards',
    'utility-types': '15. Utility Types',
    'mapped-types': '16. Mapped Types',
    'conditional-types': '17. Conditional Types',
    'modules': '18. Modules',
    'decorators': '19. Decorators',
    'strict-mode': '20. Strict Mode',
    'dom-types': '21. DOM Types',
    'generics-advanced': '22. Advanced Generics',
    'declaration-files': '23. Declaration Files',
    'ts-frameworks': '24. TS with Frameworks',
    'migration': '25. Migrating JS to TS',
  },
  llm: {
    'intro': '1. What are LLMs?',
    'tokenization': '2. Tokenization',
    'embeddings': '3. Embeddings',
    'transformer-deep-dive': '4. Transformer Architecture',
    'attention': '5. Attention Mechanism',
    'llm-apis': '6. LLM APIs',
    'api-basics': '7. API Basics',
    'chat-completions': '8. Chat Completions',
    'model-parameters': '9. Model Parameters',
    'streaming': '10. Streaming',
    'prompt-templates': '11. Prompt Templates',
    'rag': '12. RAG',
    'vector-databases': '13. Vector Databases',
    'langchain': '14. LangChain',
    'agents-tools': '15. Agents & Tools',
    'memory-context': '16. Memory & Context',
    'fine-tuning': '17. Fine-Tuning',
    'lora-qlora': '18. LoRA & QLoRA',
    'quantization': '19. Quantization',
    'evaluation': '20. Evaluation',
    'production': '21. Production',
    'cost-optimization': '22. Cost Optimization',
    'safety-guardrails': '23. Safety & Guardrails',
    'multimodal': '24. Multimodal LLMs',
    'future-llms': '25. Future of LLMs',
  },
  'node-js': {
    'intro': '1. Introduction to Node.js',
    'setup': '2. Setup & Installation',
    'modules': '3. Modules',
    'npm': '4. NPM',
    'file-system': '5. File System',
    'path': '6. Path Module',
    'events': '7. Events',
    'streams': '8. Streams',
    'http': '9. HTTP Module',
    'express-intro': '10. Express Intro',
    'routing': '11. Routing',
    'middleware': '12. Middleware',
    'rest-api': '13. REST API',
    'request-response': '14. Request & Response',
    'error-handling': '15. Error Handling',
    'async': '16. Async & Promises',
    'environment': '17. Environment Variables',
    'mongodb': '18. MongoDB',
    'authentication': '19. Authentication',
    'file-upload': '20. File Upload',
    'websockets': '21. WebSockets',
    'testing': '22. Testing',
    'security': '23. Security',
    'deployment': '24. Deployment',
    'next-steps': '25. Next Steps & Ecosystem',
  },
  react: {
    'intro': '1. Introduction to React',
    'setup': '2. Setup & Installation',
    'jsx': '3. JSX',
    'components': '4. Components',
    'props': '5. Props',
    'state': '6. State',
    'events': '7. Events',
    'conditional-rendering': '8. Conditional Rendering',
    'lists-keys': '9. Lists & Keys',
    'forms': '10. Forms',
    'useEffect': '11. useEffect',
    'useRef': '12. useRef',
    'custom-hooks': '13. Custom Hooks',
    'context-api': '14. Context API',
    'useReducer': '15. useReducer',
    'useMemo-useCallback': '16. useMemo & useCallback',
    'react-router': '17. React Router',
    'fetch-api': '18. Fetch & APIs',
    'error-boundaries': '19. Error Boundaries',
    'portals': '20. Portals',
    'performance': '21. Performance',
    'typescript-react': '22. TypeScript with React',
    'testing': '23. Testing',
    'patterns': '24. React Patterns',
    'next-steps': '25. Next Steps & Ecosystem',
  },
  'context-engineering': {
    'intro': '1. What is Context Engineering?',
    'context-window': '2. Context Window',
    'context-anatomy': '3. Anatomy of Context',
    'mental-models': '4. Mental Models',
    'system-prompts': '5. System Prompts',
    'conversation-history': '6. Conversation History',
    'retrieval-context': '7. Retrieval Context',
    'tool-outputs': '8. Tool Outputs',
    'structured-output': '9. Structured Output',
    'few-shot-examples': '10. Few-Shot Examples',
    'multimodal-context': '11. Multimodal Context',
    'dynamic-assembly': '12. Dynamic Assembly',
    'memory-architecture': '13. Memory Architecture',
    'context-routing': '14. Context Routing',
    'agentic-context': '15. Agentic Context',
    'multi-turn-management': '16. Multi-Turn Management',
    'compression': '17. Compression',
    'caching': '18. Caching',
    'token-budgeting': '19. Token Budgeting',
    'evaluation': '20. Evaluation',
    'security': '21. Security',
    'production-patterns': '22. Production Patterns',
  },
  html: {
    'intro': '1. HTML Introduction',
    'basic': '2. HTML Basic',
    'elements': '3. HTML Elements',
    'attributes': '4. HTML Attributes',
    'headings': '5. HTML Headings',
    'paragraphs': '6. HTML Paragraphs',
    'styles': '7. HTML Styles',
    'formatting': '8. HTML Formatting',
    'quotations': '9. HTML Quotations',
    'comments': '10. HTML Comments',
    'colors': '11. HTML Colors',
    'css': '12. HTML CSS',
    'links': '13. HTML Links',
    'images': '14. HTML Images',
    'tables': '15. HTML Tables',
    'lists': '16. HTML Lists',
    'blocks': '17. HTML Block & Inline',
    'classes': '18. HTML Classes',
    'id': '19. HTML Id',
    'iframe': '20. HTML Iframes',
    'scripts': '21. HTML JavaScript',
    'filepaths': '22. HTML File Paths',
    'head': '23. HTML Head',
    'layout': '24. HTML Layout',
    'responsive': '25. HTML Responsive',
    'computercode': '26. HTML Computer Code',
    'semantic': '27. HTML Semantics',
    'entities': '28. HTML Entities',
    'symbols': '29. HTML Symbols',
    'emojis': '30. HTML Emojis',
    'charset': '31. HTML Charset',
    'urlencode': '32. HTML URL Encode',
    'xhtml': '33. XHTML',
    'forms': '34. HTML Forms',
    'form-elements': '35. Form Elements',
    'input-types': '36. Input Types',
    'input-attributes': '37. Input Attributes',
    'media': '38. HTML Media',
    'video': '39. HTML Video',
    'audio': '40. HTML Audio',
    'youtube': '41. HTML YouTube',
  },
};

@Injectable({ providedIn: 'root' })
export class CourseDataService {
  private http = inject(HttpClient);

  private cache = new Map<string, Observable<Record<string, { title: string; blocks: Block[] }>>>();

  // Courses whose JSON filename prefix differs from the courseId
  private static readonly FILE_PREFIX: Record<string, string> = {
    'prompt-engineering': 'prompt',
    'node-js': 'nodejs',
    'context-engineering': 'context',
  };

  private getCourseData$(courseId: string, lang: 'en' | 'ta'): Observable<Record<string, { title: string; blocks: Block[] }>> {
    const key = `${courseId}:${lang}`;
    if (!this.cache.has(key)) {
      const prefix = CourseDataService.FILE_PREFIX[courseId] ?? courseId;
      const langSuffix = lang === 'ta' ? '-ta' : '';
      const url = `/courses/${courseId}/${prefix}-course${langSuffix}.json`;
      this.cache.set(key, this.http.get<Record<string, { title: string; blocks: Block[] }>>(url).pipe(shareReplay(1)));
    }
    return this.cache.get(key)!;
  }

  getLessonList(courseId: string, lang: 'en' | 'ta' = 'en'): Observable<CourseMeta[]> {
    const titles = LESSON_TITLES[courseId] ?? {};
    return this.getCourseData$(courseId, lang).pipe(
      map(data => Object.keys(data).map(id => ({
        id,
        title: lang === 'ta' ? (data[id].title ?? titles[id]) : (titles[id] ?? data[id].title)
      })))
    );
  }

  getLesson(courseId: string, id: string, lang: 'en' | 'ta' = 'en'): Observable<Lesson> {
    const titles = LESSON_TITLES[courseId] ?? {};
    return this.getCourseData$(courseId, lang).pipe(
      map(data => {
        const raw = data[id];
        if (!raw) throw new Error(`Lesson not found: ${id}`);
        const slides = this.groupIntoSlides(raw.blocks);
        return {
          id,
          title: lang === 'ta' ? (raw.title ?? titles[id]) : (titles[id] ?? raw.title),
          blocks: raw.blocks,
          slides,
        };
      })
    );
  }

  /** Groups flat blocks into slides — each h2 header starts a new slide */
  private groupIntoSlides(blocks: Block[]): Slide[] {
    const slides: Slide[] = [];
    let current: Block[] = [];

    for (const block of blocks) {
      // Skip YouTube promo images
      if (block.type === 'image' && block.src?.includes('yt_logo')) continue;

      if (block.type === 'header' && block.level === 2 && current.length > 0) {
        slides.push({ blocks: current });
        current = [block];
      } else {
        current.push(block);
      }
    }
    if (current.length > 0) slides.push({ blocks: current });

    // If only 1 slide (no h2 headers), split into chunks of ~4 blocks
    if (slides.length <= 1 && blocks.length > 4) {
      return this.splitIntoChunks(blocks.filter(b => !(b.type === 'image' && b.src?.includes('yt_logo'))), 4);
    }

    return slides;
  }

  private splitIntoChunks(blocks: Block[], size: number): Slide[] {
    const slides: Slide[] = [];
    for (let i = 0; i < blocks.length; i += size) {
      slides.push({ blocks: blocks.slice(i, i + size) });
    }
    return slides;
  }
}
