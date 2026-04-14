import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courses = [
    { id: 'java', title: 'Java Masterclass', description: 'Master Java programming from scratch. Covers OOP, collections, multithreading, and basic UI design.', level: 'Beginner', icon: 'fa-brands fa-java', iconBg: 'bg-red-50', iconColor: 'text-red-500', badgeClass: 'bg-slate-100 text-slate-600' },
    { id: 'javascript', title: 'JS Bootcamp', description: 'Deep dive into JavaScript ES6+, DOM manipulation, asynchronous programming, and Web APIs.', level: 'Intermediate', icon: 'fa-brands fa-js', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', badgeClass: 'bg-slate-100 text-slate-600' },
    { id: 'css', title: 'CSS Styling Pro', description: 'Master layout techniques (Flexbox, Grid), animations, and responsive design principles.', level: 'Beginner', icon: 'fa-brands fa-css3-alt', iconBg: 'bg-blue-50', iconColor: 'text-blue-500', badgeClass: 'bg-slate-100 text-slate-600', link: ['/css', 'intro'] },
    { id: 'python', title: 'Python Mastery', description: 'The complete Python developer course. Build real projects, automate tasks, and handle data.', level: 'Best Seller', icon: 'fa-brands fa-python', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'sql', title: 'SQL Complete', description: 'Master database management. Learn queries, joins, subqueries, and database architecture techniques.', level: 'All Levels', icon: 'fa-solid fa-database', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', badgeClass: 'bg-slate-100 text-slate-600', link: ['/sql', 'home'] },
    { id: 'ai', title: 'Artificial Intelligence', description: 'Dive into neural networks, machine learning models, and deep learning algorithms using TensorFlow.', level: 'Advanced', icon: 'fa-solid fa-brain', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'prompt-engineering', title: 'Prompt Engineering', description: 'Master the art of prompting LLMs. Covers zero-shot, few-shot, chain-of-thought, RAG, and production best practices.', level: 'New', icon: 'fa-solid fa-wand-magic-sparkles', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'typescript', title: 'TypeScript Essentials', description: 'Master TypeScript from scratch. Covers types, interfaces, generics, decorators, and migrating existing JS projects.', level: 'Intermediate', icon: 'fa-brands fa-js', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', badgeClass: 'bg-slate-100 text-slate-600' },
    { id: 'llm', title: 'LLM Engineering', description: 'Build real apps with large language models. Covers APIs, RAG, vector DBs, fine-tuning, agents, and production deployment.', level: 'Advanced', icon: 'fa-solid fa-microchip', iconBg: 'bg-violet-50', iconColor: 'text-violet-600', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'node-js', title: 'Node.js Masterclass', description: 'Master server-side JavaScript with Node.js. Covers modules, Express, REST APIs, MongoDB, authentication, and deployment.', level: 'Intermediate', icon: 'fa-brands fa-node-js', iconBg: 'bg-green-50', iconColor: 'text-green-600', badgeClass: 'bg-slate-100 text-slate-600' },
    { id: 'react', title: 'React Complete Guide', description: 'Master React from scratch. Covers hooks, context, routing, data fetching, performance, TypeScript, and testing.', level: 'Best Seller', icon: 'fa-brands fa-react', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-500', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'context-engineering', title: 'Context Engineering', description: 'Master the art of building context for LLMs. Covers context windows, memory, RAG, agentic systems, and production patterns.', level: 'New', icon: 'fa-solid fa-layer-group', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', badgeClass: 'bg-brand-50 text-brand-600 border border-brand-200' },
    { id: 'html', title: 'HTML Complete', description: 'Learn HTML from the ground up. Covers elements, forms, tables, semantic HTML, media, responsive design, and more.', level: 'Beginner', icon: 'fa-brands fa-html5', iconBg: 'bg-orange-50', iconColor: 'text-orange-500', badgeClass: 'bg-slate-100 text-slate-600' },
  ];
}
