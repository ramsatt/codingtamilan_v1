import { Component, OnInit, inject, Type } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

import { IntroLab } from '../javascript/intro/intro-lab';
import { VariablesLab } from '../javascript/variables/variables-lab';
import { OperatorsLab } from '../javascript/operators/operators-lab';
import { ControlFlowLab } from '../javascript/control-flow/control-flow-lab';
import { FunctionsLab } from '../javascript/functions/functions-lab';
import { ObjectsLab } from '../javascript/objects/objects-lab';
import { ArraysLab } from '../javascript/arrays/arrays-lab';
import { StringsLab } from '../javascript/strings/strings-lab';
import { NumbersLab } from '../javascript/numbers/numbers-lab';
import { MathLab } from '../javascript/math/math-lab';
import { DatesLab } from '../javascript/dates/dates-lab';
import { ClassesLab } from '../javascript/classes/classes-lab';
import { DomLab } from '../javascript/dom/dom-lab';
import { EventsLab } from '../javascript/events/events-lab';
import { Es6Lab } from '../javascript/es6-features/es6-lab';
import { JsonLab } from '../javascript/json/json-lab';
import { ErrorsLab } from '../javascript/errors/errors-lab';
import { RegExpLab } from '../javascript/regexp/regexp-lab';
import { MapsLab } from '../javascript/maps/maps-lab';
import { SetsLab } from '../javascript/sets/sets-lab';
import { AsyncLab } from '../javascript/async/async-lab';
import { FetchApiLab } from '../javascript/fetch-api/fetch-lab';
import { WebApiLab } from '../javascript/web-api/web-api-lab';

export interface JsLesson {
  id: string;
  title: string;
}

const JS_LABS: Record<string, Type<any>> = {
  intro: IntroLab,
  variables: VariablesLab,
  operators: OperatorsLab,
  'control-flow': ControlFlowLab,
  functions: FunctionsLab,
  objects: ObjectsLab,
  arrays: ArraysLab,
  strings: StringsLab,
  numbers: NumbersLab,
  math: MathLab,
  dates: DatesLab,
  classes: ClassesLab,
  dom: DomLab,
  events: EventsLab,
  'es6-features': Es6Lab,
  json: JsonLab,
  errors: ErrorsLab,
  regexp: RegExpLab,
  maps: MapsLab,
  sets: SetsLab,
  async: AsyncLab,
  'fetch-api': FetchApiLab,
  'web-api': WebApiLab,
};

export const JS_LESSON_LIST: JsLesson[] = [
  { id: 'intro', title: 'Introduction to JavaScript' },
  { id: 'variables', title: 'Variables' },
  { id: 'operators', title: 'Operators' },
  { id: 'control-flow', title: 'Control Flow' },
  { id: 'functions', title: 'Functions' },
  { id: 'objects', title: 'Objects' },
  { id: 'arrays', title: 'Arrays' },
  { id: 'strings', title: 'Strings' },
  { id: 'numbers', title: 'Numbers' },
  { id: 'math', title: 'Math' },
  { id: 'dates', title: 'Dates' },
  { id: 'classes', title: 'Classes' },
  { id: 'dom', title: 'DOM Manipulation' },
  { id: 'events', title: 'Events' },
  { id: 'es6-features', title: 'ES6+ Features' },
  { id: 'json', title: 'JSON' },
  { id: 'errors', title: 'Error Handling' },
  { id: 'regexp', title: 'Regular Expressions' },
  { id: 'maps', title: 'Maps' },
  { id: 'sets', title: 'Sets' },
  { id: 'async', title: 'Async / Await' },
  { id: 'fetch-api', title: 'Fetch API' },
  { id: 'web-api', title: 'Web APIs' },
];

@Component({
  selector: 'app-js-viewer',
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './js-viewer.html',
})
export class JsViewer implements OnInit {
  lessons = JS_LESSON_LIST;
  currentLessonId = 'intro';
  sidebarOpen = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('lessonId') ?? 'intro';
      this.currentLessonId = JS_LABS[id] ? id : 'intro';
    });
  }

  get currentLab(): Type<any> | null {
    return JS_LABS[this.currentLessonId] ?? null;
  }

  get currentLessonTitle(): string {
    return this.lessons.find(l => l.id === this.currentLessonId)?.title ?? '';
  }

  isCurrentLesson(id: string): boolean {
    return this.currentLessonId === id;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateTo(id: string) {
    this.router.navigate(['/js', id]);
    this.sidebarOpen = false;
  }

  get currentIndex(): number {
    return this.lessons.findIndex(l => l.id === this.currentLessonId);
  }

  get prevLesson(): JsLesson | null {
    const i = this.currentIndex;
    return i > 0 ? this.lessons[i - 1] : null;
  }

  get nextLesson(): JsLesson | null {
    const i = this.currentIndex;
    return i < this.lessons.length - 1 ? this.lessons[i + 1] : null;
  }
}
