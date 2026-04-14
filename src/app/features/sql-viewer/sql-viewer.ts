import { Component, OnInit, inject, Type } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

import { SqlAliasesLab } from '../sql/aliases/sql-aliases-lab';
import { SqlAlterTableLab } from '../sql/alter-table/sql-alter-table-lab';
import { SqlAndLab } from '../sql/and/sql-and-lab';
import { SqlAnyAllLab } from '../sql/any-all/sql-any-all-lab';
import { SqlAutoIncrementLab } from '../sql/auto-increment/sql-auto-increment-lab';
import { SqlAvgLab } from '../sql/avg/sql-avg-lab';
import { SqlBetweenLab } from '../sql/between/sql-between-lab';
import { SqlCaseLab } from '../sql/case/sql-case-lab';
import { SqlCheckLab } from '../sql/check/sql-check-lab';
import { SqlCommentsLab } from '../sql/comments/sql-comments-lab';
import { SqlCountLab } from '../sql/count/sql-count-lab';
import { SqlCreateDbLab } from '../sql/create-db/sql-create-db-lab';
import { SqlCreateTableLab } from '../sql/create-table/sql-create-table-lab';
import { SqlDatesLab } from '../sql/dates/sql-dates-lab';
import { SqlDefaultLab } from '../sql/default/sql-default-lab';
import { SqlDeleteLab } from '../sql/delete/sql-delete-lab';
import { SqlDropDbLab } from '../sql/drop-db/sql-drop-db-lab';
import { SqlDropTableLab } from '../sql/drop-table/sql-drop-table-lab';
import { SqlExistsLab } from '../sql/exists/sql-exists-lab';
import { SqlForeignKeyLab } from '../sql/foreign-key/sql-foreign-key-lab';
import { SqlFullJoinLab } from '../sql/full-join/sql-full-join-lab';
import { SqlGroupByLab } from '../sql/group-by/sql-group-by-lab';
import { SqlHavingLab } from '../sql/having/sql-having-lab';
import { SqlHomeLab } from '../sql/home/sql-home-lab';
import { SqlInLab } from '../sql/in/sql-in-lab';
import { SqlIndexLab } from '../sql/index/sql-index-lab';
import { SqlInjectionLab } from '../sql/injection/sql-injection-lab';
import { SqlInnerJoinLab } from '../sql/inner-join/sql-inner-join-lab';
import { SqlInsertIntoSelectLab } from '../sql/insert-into-select/sql-insert-into-select-lab';
import { SqlInsertLab } from '../sql/insert/sql-insert-lab';
import { SqlIntroLab } from '../sql/intro/sql-intro-lab';
import { SqlLeftJoinLab } from '../sql/left-join/sql-left-join-lab';
import { SqlLikeLab } from '../sql/like/sql-like-lab';
import { SqlMinMaxLab } from '../sql/min-max/sql-min-max-lab';
import { SqlNotNullLab } from '../sql/not-null/sql-not-null-lab';
import { SqlNotLab } from '../sql/not/sql-not-lab';
import { SqlNullFunctionsLab } from '../sql/null-functions/sql-null-functions-lab';
import { SqlNullValuesLab } from '../sql/null-values/sql-null-values-lab';
import { SqlOperatorsLab } from '../sql/operators/sql-operators-lab';
import { SqlOrLab } from '../sql/or/sql-or-lab';
import { SqlOrderByLab } from '../sql/order-by/sql-order-by-lab';
import { SqlPrimaryKeyLab } from '../sql/primary-key/sql-primary-key-lab';
import { SqlRightJoinLab } from '../sql/right-join/sql-right-join-lab';
import { SqlSelectDistinctLab } from '../sql/select-distinct/sql-select-distinct-lab';
import { SqlSelectIntoLab } from '../sql/select-into/sql-select-into-lab';
import { SqlSelectTopLab } from '../sql/select-top/sql-select-top-lab';
import { SqlSelectLab } from '../sql/select/sql-select-lab';
import { SqlSelfJoinLab } from '../sql/self-join/sql-self-join-lab';
import { SqlStoredProceduresLab } from '../sql/stored-procedures/sql-stored-procedures-lab';
import { SqlSumLab } from '../sql/sum/sql-sum-lab';
import { SqlSyntaxLab } from '../sql/syntax/sql-syntax-lab';
import { SqlUnionAllLab } from '../sql/union-all/sql-union-all-lab';
import { SqlUnionLab } from '../sql/union/sql-union-lab';
import { SqlUniqueLab } from '../sql/unique/sql-unique-lab';
import { SqlUpdateLab } from '../sql/update/sql-update-lab';
import { SqlViewsLab } from '../sql/views/sql-views-lab';
import { SqlWhereLab } from '../sql/where/sql-where-lab';
import { SqlWildcardsLab } from '../sql/wildcards/sql-wildcards-lab';

export interface SqlLesson {
  id: string;
  title: string;
}

const SQL_LABS: Record<string, Type<any>> = {
  aliases: SqlAliasesLab,
  'alter-table': SqlAlterTableLab,
  and: SqlAndLab,
  'any-all': SqlAnyAllLab,
  'auto-increment': SqlAutoIncrementLab,
  avg: SqlAvgLab,
  between: SqlBetweenLab,
  case: SqlCaseLab,
  check: SqlCheckLab,
  comments: SqlCommentsLab,
  count: SqlCountLab,
  'create-db': SqlCreateDbLab,
  'create-table': SqlCreateTableLab,
  dates: SqlDatesLab,
  default: SqlDefaultLab,
  delete: SqlDeleteLab,
  'drop-db': SqlDropDbLab,
  'drop-table': SqlDropTableLab,
  exists: SqlExistsLab,
  'foreign-key': SqlForeignKeyLab,
  'full-join': SqlFullJoinLab,
  'group-by': SqlGroupByLab,
  having: SqlHavingLab,
  home: SqlHomeLab,
  in: SqlInLab,
  index: SqlIndexLab,
  injection: SqlInjectionLab,
  'inner-join': SqlInnerJoinLab,
  'insert-into-select': SqlInsertIntoSelectLab,
  insert: SqlInsertLab,
  intro: SqlIntroLab,
  'left-join': SqlLeftJoinLab,
  like: SqlLikeLab,
  'min-max': SqlMinMaxLab,
  'not-null': SqlNotNullLab,
  not: SqlNotLab,
  'null-functions': SqlNullFunctionsLab,
  'null-values': SqlNullValuesLab,
  operators: SqlOperatorsLab,
  or: SqlOrLab,
  'order-by': SqlOrderByLab,
  'primary-key': SqlPrimaryKeyLab,
  'right-join': SqlRightJoinLab,
  'select-distinct': SqlSelectDistinctLab,
  'select-into': SqlSelectIntoLab,
  'select-top': SqlSelectTopLab,
  select: SqlSelectLab,
  'self-join': SqlSelfJoinLab,
  'stored-procedures': SqlStoredProceduresLab,
  sum: SqlSumLab,
  syntax: SqlSyntaxLab,
  'union-all': SqlUnionAllLab,
  union: SqlUnionLab,
  unique: SqlUniqueLab,
  update: SqlUpdateLab,
  views: SqlViewsLab,
  where: SqlWhereLab,
  wildcards: SqlWildcardsLab,
};

export const SQL_LESSON_LIST: SqlLesson[] = [
  { id: 'home', title: 'SQL Home' },
  { id: 'intro', title: 'SQL Introduction' },
  { id: 'syntax', title: 'SQL Syntax' },
  { id: 'select', title: 'SQL SELECT' },
  { id: 'select-distinct', title: 'SQL SELECT DISTINCT' },
  { id: 'where', title: 'SQL WHERE' },
  { id: 'and', title: 'SQL AND' },
  { id: 'or', title: 'SQL OR' },
  { id: 'not', title: 'SQL NOT' },
  { id: 'order-by', title: 'SQL ORDER BY' },
  { id: 'insert', title: 'SQL INSERT INTO' },
  { id: 'null-values', title: 'SQL NULL Values' },
  { id: 'update', title: 'SQL UPDATE' },
  { id: 'delete', title: 'SQL DELETE' },
  { id: 'select-top', title: 'SQL SELECT TOP' },
  { id: 'min-max', title: 'SQL MIN and MAX' },
  { id: 'count', title: 'SQL COUNT' },
  { id: 'sum', title: 'SQL SUM' },
  { id: 'avg', title: 'SQL AVG' },
  { id: 'like', title: 'SQL LIKE' },
  { id: 'wildcards', title: 'SQL Wildcards' },
  { id: 'in', title: 'SQL IN' },
  { id: 'between', title: 'SQL BETWEEN' },
  { id: 'aliases', title: 'SQL Aliases' },
  { id: 'inner-join', title: 'SQL INNER JOIN' },
  { id: 'left-join', title: 'SQL LEFT JOIN' },
  { id: 'right-join', title: 'SQL RIGHT JOIN' },
  { id: 'full-join', title: 'SQL FULL OUTER JOIN' },
  { id: 'self-join', title: 'SQL Self Join' },
  { id: 'union', title: 'SQL UNION' },
  { id: 'union-all', title: 'SQL UNION ALL' },
  { id: 'group-by', title: 'SQL GROUP BY' },
  { id: 'having', title: 'SQL HAVING' },
  { id: 'exists', title: 'SQL EXISTS' },
  { id: 'any-all', title: 'SQL ANY and ALL' },
  { id: 'select-into', title: 'SQL SELECT INTO' },
  { id: 'insert-into-select', title: 'SQL INSERT INTO SELECT' },
  { id: 'case', title: 'SQL CASE' },
  { id: 'null-functions', title: 'SQL NULL Functions' },
  { id: 'stored-procedures', title: 'SQL Stored Procedures' },
  { id: 'comments', title: 'SQL Comments' },
  { id: 'operators', title: 'SQL Operators' },
  { id: 'create-db', title: 'SQL CREATE DATABASE' },
  { id: 'drop-db', title: 'SQL DROP DATABASE' },
  { id: 'create-table', title: 'SQL CREATE TABLE' },
  { id: 'drop-table', title: 'SQL DROP TABLE' },
  { id: 'alter-table', title: 'SQL ALTER TABLE' },
  { id: 'not-null', title: 'SQL NOT NULL' },
  { id: 'unique', title: 'SQL UNIQUE' },
  { id: 'primary-key', title: 'SQL PRIMARY KEY' },
  { id: 'foreign-key', title: 'SQL FOREIGN KEY' },
  { id: 'check', title: 'SQL CHECK' },
  { id: 'default', title: 'SQL DEFAULT' },
  { id: 'auto-increment', title: 'SQL AUTO INCREMENT' },
  { id: 'dates', title: 'SQL Dates' },
  { id: 'views', title: 'SQL Views' },
  { id: 'injection', title: 'SQL Injection' },
  { id: 'index', title: 'SQL Index' },
];

@Component({
  selector: 'app-sql-viewer',
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './sql-viewer.html',
})
export class SqlViewer implements OnInit {
  lessons = SQL_LESSON_LIST;
  currentLessonId = 'home';
  sidebarOpen = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('lessonId') ?? 'home';
      this.currentLessonId = SQL_LABS[id] ? id : 'home';
    });
  }

  get currentLab(): Type<any> | null {
    return SQL_LABS[this.currentLessonId] ?? null;
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
    this.router.navigate(['/sql', id]);
    this.sidebarOpen = false;
  }

  get currentIndex(): number {
    return this.lessons.findIndex(l => l.id === this.currentLessonId);
  }

  get prevLesson(): SqlLesson | null {
    const i = this.currentIndex;
    return i > 0 ? this.lessons[i - 1] : null;
  }

  get nextLesson(): SqlLesson | null {
    const i = this.currentIndex;
    return i < this.lessons.length - 1 ? this.lessons[i + 1] : null;
  }
}
