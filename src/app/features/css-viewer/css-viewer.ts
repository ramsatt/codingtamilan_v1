import { Component, OnInit, inject, Type } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

import { CssIntroLab } from '../css/intro/css-intro-lab/css-intro-lab';
import { SelectorsLab } from '../css/selectors/selectors-lab/selectors-lab';
import { BoxModelLab } from '../css/box-model/box-model-lab/box-model-lab';
import { CssColorsLab } from '../css/colors/css-colors-lab/css-colors-lab';
import { CssUnitsLab } from '../css/units/css-units-lab/css-units-lab';
import { CssTextLab } from '../css/text/css-text-lab/css-text-lab';
import { CssDisplayLab } from '../css/display/css-display-lab/css-display-lab';
import { CssPositionLab } from '../css/position/css-position-lab/css-position-lab';
import { CssFlexboxLab } from '../css/flexbox/css-flexbox-lab/css-flexbox-lab';
import { CssFlexItemsLab } from '../css/flex-items/css-flex-items-lab/css-flex-items-lab';
import { CssGridLab } from '../css/grid/css-grid-lab/css-grid-lab';
import { CssGridAreasLab } from '../css/grid-areas/css-grid-areas-lab/css-grid-areas-lab';
import { CssOverflowLab } from '../css/overflow/css-overflow-lab/css-overflow-lab';
import { CssShadowsLab } from '../css/shadows/css-shadows-lab/css-shadows-lab';
import { CssGradientsLab } from '../css/gradients/css-gradients-lab/css-gradients-lab';
import { CssTransitionsLab } from '../css/transitions/css-transitions-lab/css-transitions-lab';
import { CssAnimationsLab } from '../css/animations/css-animations-lab/css-animations-lab';
import { CssTransformsLab } from '../css/transforms/css-transforms-lab/css-transforms-lab';
import { CssPseudoLab } from '../css/pseudo/css-pseudo-lab/css-pseudo-lab';
import { CssVariablesLab } from '../css/variables/css-variables-lab/css-variables-lab';
import { CssMediaQueriesLab } from '../css/media-queries/css-media-queries-lab/css-media-queries-lab';
import { CssFiltersLab } from '../css/filters/css-filters-lab/css-filters-lab';
import { CssBlendModesLab } from '../css/blend-modes/css-blend-modes-lab/css-blend-modes-lab';
import { CssTablesLab } from '../css/tables/css-tables-lab/css-tables-lab';
import { CssListsLinksLab } from '../css/lists-links/css-lists-links-lab/css-lists-links-lab';
import { CssColumnsLab } from '../css/columns/css-columns-lab/css-columns-lab';
import { CssShapesLab } from '../css/shapes/css-shapes-lab/css-shapes-lab';
import { CssScrollSnappingLab } from '../css/scroll-snapping/css-scroll-snapping-lab/css-scroll-snapping-lab';
import { CssAspectRatioLab } from '../css/aspect-ratio/css-aspect-ratio-lab/css-aspect-ratio-lab';
import { CssZIndexLab } from '../css/z-index/css-z-index-lab/css-z-index-lab';
import { CssLogicalPropertiesLab } from '../css/logical-properties/css-logical-properties-lab/css-logical-properties-lab';
import { CssModernCssLab } from '../css/modern-css/css-modern-css-lab/css-modern-css-lab';

export interface CssLesson {
  id: string;
  title: string;
}

const CSS_LABS: Record<string, Type<any>> = {
  intro: CssIntroLab,
  selectors: SelectorsLab,
  'box-model': BoxModelLab,
  colors: CssColorsLab,
  units: CssUnitsLab,
  text: CssTextLab,
  display: CssDisplayLab,
  position: CssPositionLab,
  flexbox: CssFlexboxLab,
  'flex-items': CssFlexItemsLab,
  grid: CssGridLab,
  'grid-areas': CssGridAreasLab,
  overflow: CssOverflowLab,
  shadows: CssShadowsLab,
  gradients: CssGradientsLab,
  transitions: CssTransitionsLab,
  animations: CssAnimationsLab,
  transforms: CssTransformsLab,
  pseudo: CssPseudoLab,
  variables: CssVariablesLab,
  'media-queries': CssMediaQueriesLab,
  filters: CssFiltersLab,
  'blend-modes': CssBlendModesLab,
  tables: CssTablesLab,
  'lists-links': CssListsLinksLab,
  columns: CssColumnsLab,
  shapes: CssShapesLab,
  'scroll-snapping': CssScrollSnappingLab,
  'aspect-ratio': CssAspectRatioLab,
  'z-index': CssZIndexLab,
  'logical-properties': CssLogicalPropertiesLab,
  'modern-css': CssModernCssLab,
};

export const CSS_LESSON_LIST: CssLesson[] = [
  { id: 'intro', title: 'CSS Introduction' },
  { id: 'selectors', title: 'CSS Selectors' },
  { id: 'box-model', title: 'The Box Model' },
  { id: 'colors', title: 'CSS Colors' },
  { id: 'units', title: 'CSS Units' },
  { id: 'text', title: 'CSS Text' },
  { id: 'display', title: 'CSS Display' },
  { id: 'position', title: 'CSS Position' },
  { id: 'flexbox', title: 'CSS Flexbox' },
  { id: 'flex-items', title: 'Flex Items' },
  { id: 'grid', title: 'CSS Grid' },
  { id: 'grid-areas', title: 'CSS Grid Areas' },
  { id: 'overflow', title: 'CSS Overflow' },
  { id: 'shadows', title: 'CSS Shadows' },
  { id: 'gradients', title: 'CSS Gradients' },
  { id: 'transitions', title: 'CSS Transitions' },
  { id: 'animations', title: 'CSS Animations' },
  { id: 'transforms', title: 'CSS Transforms' },
  { id: 'pseudo', title: 'Pseudo-classes & Elements' },
  { id: 'variables', title: 'CSS Variables' },
  { id: 'media-queries', title: 'Media Queries' },
  { id: 'filters', title: 'CSS Filters' },
  { id: 'blend-modes', title: 'Blend Modes' },
  { id: 'tables', title: 'CSS Tables' },
  { id: 'lists-links', title: 'Lists & Links' },
  { id: 'columns', title: 'CSS Columns' },
  { id: 'shapes', title: 'CSS Shapes' },
  { id: 'scroll-snapping', title: 'Scroll Snapping' },
  { id: 'aspect-ratio', title: 'Aspect Ratio' },
  { id: 'z-index', title: 'Z-Index' },
  { id: 'logical-properties', title: 'Logical Properties' },
  { id: 'modern-css', title: 'Modern CSS' },
];

@Component({
  selector: 'app-css-viewer',
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './css-viewer.html',
})
export class CssViewer implements OnInit {
  lessons = CSS_LESSON_LIST;
  currentLessonId = 'intro';
  sidebarOpen = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('lessonId') ?? 'intro';
      this.currentLessonId = CSS_LABS[id] ? id : 'intro';
    });
  }

  get currentLab(): Type<any> | null {
    return CSS_LABS[this.currentLessonId] ?? null;
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
    this.router.navigate(['/css', id]);
    this.sidebarOpen = false;
  }

  get currentIndex(): number {
    return this.lessons.findIndex(l => l.id === this.currentLessonId);
  }

  get prevLesson(): CssLesson | null {
    const i = this.currentIndex;
    return i > 0 ? this.lessons[i - 1] : null;
  }

  get nextLesson(): CssLesson | null {
    const i = this.currentIndex;
    return i < this.lessons.length - 1 ? this.lessons[i + 1] : null;
  }
}
